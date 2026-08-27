'use client'; // This is a client component in Next.js because it has state and interactivity

import React, { useState } from 'react';
import { Send, CheckCircle, MessageSquare, AlertCircle, ChevronRight, ChevronLeft, Lock, Printer, LayoutList, Users } from 'lucide-react';
// Note: You will need to install lucide-react in your Next.js project: npm install lucide-react

export default function YouthConnectSurvey() {
  const [step, setStep] = useState(0); // 0 = intro, 1-5 = survey pages, 6 = success, 99 = admin login, 100 = admin dashboard
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Admin State
  const [adminPassword, setAdminPassword] = useState('');
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [groupingMode, setGroupingMode] = useState('by_question'); // 'by_question' or 'by_respondent'

  // Initialize form data for all 15 questions
  const initialFormState = Array.from({ length: 15 }, (_, i) => `q${i + 1}`).reduce((acc: { [key: string]: string }, key) => {
    acc[key] = '';
    return acc;
  }, {});
  
  const [formData, setFormData] = useState(initialFormState);

  // Safely check for process.env to avoid errors in browser-only environments
  const getEnvVar = (key: string, fallback: string) => {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || fallback;
    }
    return fallback;
  };

  // Constants for Supabase
  const SUPABASE_URL = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://ivozbmooydyngwaxlsll.supabase.co');
  const SUPABASE_KEY = getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_BHjvmp2MLG8dGAtu_gFoiw_HyIeGb7W');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitToSupabase = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/youth_connect_feedback`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save to database');
      }
      
      setStep(6); // Success step
    } catch (err) {
      console.error('Supabase Error:', err);
      setError('Something went wrong saving your answers. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError('');
      setIsSubmitting(true);
      submitToSupabase();
    }
  };

  // --- ADMIN FUNCTIONS ---
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'godislove') {
      setStep(100);
      fetchSurveyData();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchSurveyData = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/youth_connect_feedback?select=*`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      setSurveyData(data || []);
    } catch (err) {
      console.error(err);
      setError('Could not load responses. Ensure Supabase SELECT policies are enabled.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const goBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- QUESTION DATA STRUCTURE ---
  const questionPages = [
    // PAGE 1: Vibe & Relevance
    [
      { id: 'q1', type: 'text', label: '1. On a scale of 1-5, how relevant do you feel the Youth Connect meetings are to your daily life? (Why or why not?)' },
      { id: 'q2', type: 'text', label: '2. What is the number one thing that would make you more excited to attend youth meetings?' },
      { id: 'q3', type: 'text', label: '3. Have you ever felt like this youth ministry wasn\'t a good fit for you? (If yes, what made you feel that way?)' }
    ],
    // PAGE 2: Content & Spiritual Growth
    [
      { id: 'q4', type: 'text', label: '4. What real-life issues or struggles do you think teenagers face today that the church needs to address?' },
      { id: 'q5', type: 'text', label: '5. What specific topics or discussions would actually help you grow closer to God right now?' },
      { id: 'q6', type: 'text', label: '6. What makes it difficult for you to participate or engage when you do attend?' }
    ],
    // PAGE 3: Community & Belonging
    [
      { id: 'q7', type: 'text', label: '7. Do you feel like you belong and have a community with the youth at our church?' },
      { id: 'q8', type: 'text', label: '8. How comfortable do you feel sharing your honest thoughts and questions during meetings? (What makes you feel comfortable/uncomfortable?)' },
      { id: 'q9', type: 'choice', label: '9. Do you feel like your voice and ideas are genuinely heard in this youth ministry?', options: ['Yes, definitely', 'Sometimes', 'Not really', 'No'] }
    ],
    // PAGE 4: Activities & Involvement
    [
      { id: 'q10', type: 'text', label: '10. What types of activities, events, or hangout styles would you love to see us do more of?' },
      { id: 'q11', type: 'text', label: '11. Do you have any hobbies, talents, or interests that you wish we incorporated into our meetings?' },
      { id: 'q12', type: 'choice', label: '12. Do you feel there are enough opportunities for you to use your personal gifts at church?', options: ['Yes', 'Not sure', 'No'] },
      { id: 'q13', type: 'choice', label: '13. Would you be interested in helping plan future youth events or leading parts of a meeting?', options: ['Yes, I\'d love to!', 'Maybe, depending on what it is', 'No, thanks'] }
    ],
    // PAGE 5: Leadership & The Future
    [
      { id: 'q14', type: 'text', label: '14. What could the youth leaders do differently to support you and connect with you better?' },
      { id: 'q15', type: 'text', label: '15. If you were in charge of redesigning this youth ministry, what is the ONE major thing you would change?' }
    ]
  ];

  // --- UI COMPONENTS ---

  const IntroScreen = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-10 px-4 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 shadow-sm border border-indigo-200">
        <MessageSquare className="w-10 h-10 text-indigo-600" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
        Youth Connect
      </h1>
      <p className="text-lg text-slate-600 max-w-sm">
        We want to hear from YOU! Your honest feedback helps us make our meetings better, more engaging, and more relevant.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 max-w-sm w-full text-left flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900 leading-relaxed">
          <strong>This survey is 100% anonymous.</strong> Please be open and honest. We won't know who said what, but we are listening to every word!
        </p>
      </div>
      <button 
        onClick={() => setStep(1)}
        className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-6"
      >
        Start Survey <ChevronRight className="w-5 h-5" />
      </button>

      {/* Secret Admin Button */}
      <button 
        onClick={() => { setError(''); setStep(99); }}
        className="mt-8 text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
      >
        <Lock className="w-3 h-3" /> Youth Leaders Login
      </button>
    </div>
  );

  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-sm border border-emerald-200">
        <CheckCircle className="w-12 h-12 text-emerald-600" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900">Thank You!</h2>
      <p className="text-lg text-slate-600 max-w-sm">
        Your voice has been heard. We will be reviewing all feedback to make real changes to our Youth Connect meetings.
      </p>
      <button 
        onClick={() => {
          setFormData(initialFormState);
          setStep(0);
        }}
        className="mt-8 text-indigo-600 font-semibold hover:underline bg-indigo-50 px-6 py-3 rounded-full"
      >
        Submit another response
      </button>
    </div>
  );

  const SurveyPage = () => {
    const currentQuestions = questionPages[step - 1];
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300 pb-12 pt-6">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 px-1">
            <span>Part {step} of 5</span>
            <span>{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-6">
          {currentQuestions.map((q) => (
            <div key={q.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
              <label className="block text-[15px] font-semibold text-slate-900 leading-snug">
                {q.label}
              </label>
              
              {q.type === 'text' ? (
                <textarea 
                  name={q.id}
                  value={formData[q.id]}
                  onChange={handleInputChange}
                  placeholder="Type your answer here..."
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none h-28 text-slate-700 bg-slate-50"
                ></textarea>
              ) : (
                <div className="space-y-3 pt-1">
                  {q.options?.map((option) => (
                    <label key={option} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData[q.id] === option ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50 bg-white'}`}>
                      <input 
                        type="radio" 
                        name={q.id} 
                        value={option}
                        checked={formData[q.id] === option}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-indigo-600 border-slate-300 focus:ring-indigo-600"
                      />
                      <span className="text-slate-700 font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button 
            type="button"
            onClick={goBack}
            className="w-1/3 bg-white text-slate-700 font-bold py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Saving...' : (step === 5 ? 'Submit Survey' : 'Next Part')} 
            {!isSubmitting && (step === 5 ? <Send className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />)}
          </button>
        </div>
        
      </form>
    );
  };

  // --- ADMIN COMPONENTS ---

  const AdminLoginScreen = () => (
    <form onSubmit={handleAdminLogin} className="flex flex-col items-center justify-center text-center space-y-6 py-10 px-4 animate-in fade-in">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Lock className="w-10 h-10 text-slate-600" />
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900">Leader Dashboard</h2>
      <p className="text-sm text-slate-500">Enter the password to view survey results.</p>
      
      <input 
        type="password" 
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
        placeholder="Password..."
        className="w-full max-w-xs p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 text-center"
      />

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <div className="flex gap-3 w-full max-w-xs mt-2">
        <button type="button" onClick={() => { setError(''); setStep(0); }} className="w-1/3 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Back</button>
        <button type="submit" className="w-2/3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors">Login</button>
      </div>
    </form>
  );

  const AdminDashboard = () => (
    <div className="space-y-6 animate-in fade-in pb-12 w-full max-w-4xl mx-auto px-2">
      {/* Print Header (Hidden on screen, visible on PDF) */}
      <div className="hidden print:block text-center mb-8">
        <h1 className="text-3xl font-bold">Youth Connect - Survey Results Report</h1>
        <p className="text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
        <p className="text-gray-500">Total Responses: {surveyData.length}</p>
      </div>

      {/* Screen Header (Hidden on PDF) */}
      <div className="print:hidden flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Survey Results</h2>
          <p className="text-slate-500">{surveyData.length} Total Responses</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <button 
            onClick={() => setGroupingMode('by_question')}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${groupingMode === 'by_question' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <LayoutList className="w-4 h-4" /> Group by Question
          </button>
          <button 
            onClick={() => setGroupingMode('by_respondent')}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${groupingMode === 'by_respondent' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <Users className="w-4 h-4" /> Group by Person
          </button>
          <button onClick={handlePrint} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors ml-2">
            <Printer className="w-4 h-4" /> Save as PDF
          </button>
          <button onClick={() => { setAdminPassword(''); setStep(0); }} className="text-slate-500 underline ml-2 text-sm hover:text-slate-700">Logout</button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl font-medium">{error}</div>}
      
      {isLoadingData ? (
        <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
           <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
           <p className="text-slate-500 font-medium animate-pulse">Loading responses from database...</p>
        </div>
      ) : surveyData.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p>No survey responses yet.</p>
        </div>
      ) : (
        <div className="space-y-10">
          
          {groupingMode === 'by_question' && questionPages.flat().map((q, index) => {
            // Filter out empty answers for cleaner reports
            const answeredResponses = surveyData.filter(res => res[q.id] && res[q.id].trim() !== '');
            
            return (
              <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:shadow-none print:border-b print:rounded-none print:mb-8 print:break-inside-avoid">
                <h3 className="font-bold text-lg text-indigo-900 mb-4 pb-2 border-b border-slate-100">{q.label}</h3>
                
                {answeredResponses.length === 0 ? (
                  <p className="text-slate-400 italic">No answers provided yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {answeredResponses.map((res, i) => (
                      <li key={i} className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl print:bg-transparent print:p-2 print:border-l-2 print:border-slate-300">
                        <span className="text-indigo-400 font-bold text-sm mt-0.5">#{i + 1}</span>
                        <p className="text-slate-700 leading-relaxed">{res[q.id]}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {groupingMode === 'by_respondent' && surveyData.map((res, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 print:shadow-none print:border-b print:rounded-none print:mb-8 print:break-inside-avoid">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">Anonymous Respondent #{index + 1}</h3>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {new Date(res.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-6">
                {questionPages.flat().map((q) => (
                  <div key={q.id}>
                    <p className="font-semibold text-sm text-slate-600 mb-1">{q.label}</p>
                    {res[q.id] && res[q.id].trim() !== '' ? (
                       <p className="text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 print:bg-transparent print:p-0 print:border-none">{res[q.id]}</p>
                    ) : (
                       <p className="text-slate-400 italic text-sm">Skipped</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-200 print:bg-white">
      <div className={`${step >= 100 ? 'max-w-5xl' : 'max-w-md'} mx-auto w-full px-4 py-8 print:max-w-none print:p-0`}>
        {step === 0 && IntroScreen()}
        {step >= 1 && step <= 5 && SurveyPage()}
        {step === 6 && SuccessScreen()}
        {step === 99 && AdminLoginScreen()}
        {step === 100 && AdminDashboard()}
      </div>
    </div>
  );
}