'use client';

import React, { useState, useEffect } from 'react';
import { 
  Send, CheckCircle, MessageSquare, AlertCircle, Lightbulb, 
  ChevronRight, Star, Home, Gamepad2, Lock, Unlock, 
  ClipboardList, BarChart3, UserCog, Clock, MapPin
} from 'lucide-react';

// Safe environment variable getter for browser
const getEnvVar = (name: string, fallback: string = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name] || fallback;
  }
  return fallback;
};

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://ivozbmooydyngwaxlsll.supabase.co');
const supabaseKey = getEnvVar('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_BHjvmp2MLG8dGAtu_gFoiw_HyIeGb7W');

// --- ADMIN AUTHENTICATION COMPONENT ---
const AdminLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminError, setAdminError] = useState('');

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-16 px-4 animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
        <Lock className="w-10 h-10 text-slate-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Leader Access Required</h2>
      <p className="text-gray-500 text-sm">Please enter the password to view this section.</p>
      
      <div className="w-full max-w-xs space-y-4">
        <input 
          type="password"
          value={adminPasswordInput}
          onChange={(e) => setAdminPasswordInput(e.target.value)}
          placeholder="Enter password..."
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent text-center"
        />
        {adminError && <p className="text-red-500 text-sm font-medium">{adminError}</p>}
        <button 
          onClick={() => {
            if (adminPasswordInput === 'godislove') {
              setAdminError('');
              setAdminPasswordInput('');
              onSuccess();
            } else {
              setAdminError('Incorrect password');
            }
          }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          Unlock <Unlock className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// --- YOUTH OUTLINE COMPONENT ---
const YouthOutline = () => (
  <div className="space-y-6 animate-in fade-in duration-300 pb-8">
    <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Youth Social</h1>
      <div className="flex flex-col gap-2 text-indigo-100 text-sm mt-4">
        <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> Saturday, August 29, 2026 | 7:30 PM</div>
        <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> 6 Westwyn Ct, Brampton, ON</div>
      </div>
    </div>

    <div className="space-y-4">
      {[
        { time: "7:30 PM", title: "Gather & Snacks", desc: "Arrival time! Grab some snacks, find a seat, and hang out before we kick things off." },
        { time: "7:45 PM", title: "Welcome & Vision", desc: "Kicking off the night with prayer and a quick word on why we are here." },
        { time: "7:55 PM", title: "Games & Challenges", desc: "Team Scavenger Hunts, Emoji puzzles, and TikTok acting challenges!" },
        { time: "8:30 PM", title: "Feedback Focus", desc: "Scan the QR code to fill out a quick survey on Matt's app. Tell us what you want to see!" },
        { time: "8:45 PM", title: "Food & Fellowship", desc: "Time to eat, hang out, and chill." },
        { time: "9:30 PM", title: "Wrap Up & Prizes", desc: "Final grand prizes are handed out, followed by closing remarks and prayer from Pastor Blair." },
        { time: "9:45 PM", title: "Dismissal", desc: "See you next time!" }
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
          <div className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap mt-1">
            {item.time}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- GAMES COMPONENT ---
const GamesGuide = () => (
  <div className="space-y-8 animate-in fade-in duration-300 pb-8">
    <div className="space-y-2">
      <h2 className="text-3xl font-extrabold text-gray-900">Tonight's Games</h2>
      <p className="text-gray-500 text-sm">Get ready for some friendly competition!</p>
    </div>

    {/* Game 1: Scavenger Hunt */}
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="border-b pb-3">
        <h3 className="font-bold text-xl text-indigo-600">1. Team Scavenger Hunt</h3>
        <p className="text-sm text-gray-600 mt-2"><strong>Rules:</strong> Break into teams of 4-5. Complete all the tasks below as fast as you can. Call over a leader to prove you finished!</p>
      </div>
      <ul className="space-y-4 text-sm text-gray-700">
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Take a Team Selfie</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Come up with a team Motto</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Sing 10 Seconds of a Song</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Find a bible verse containing the word "faith"</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Find something everyone on the team has in common</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Create a team handshake</span>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <div className="w-full">
            <span className="font-medium text-base">Complete the Bible Emoji game correctly:</span>
            <div className="bg-slate-50 p-4 rounded-xl mt-3 space-y-3 text-center text-2xl border border-slate-100 shadow-inner">
              <div>🍎🐍👩👨</div>
              <div>🦁🕳️🙏👨</div>
              <div>🌊🚶‍♂️⛵😲</div>
              <div>🍞🐟🐟🧺👦</div>
              <div>🐋🏃‍♂️🤢🏖️</div>
              <div>👦🌈🧥😠👦👦</div>
            </div>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-indigo-200 mt-0.5 flex-shrink-0"></div> 
          <span className="font-medium text-base">Act out a Bible Story</span>
        </li>
      </ul>
    </div>

    {/* Game 2: TikTok Challenge */}
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="border-b pb-3">
        <h3 className="font-bold text-xl text-indigo-600">2. TikTok Challenges</h3>
        <p className="text-sm text-gray-600 mt-2"><strong>Rules:</strong> In groups of 2-3, act out one of the phrases below. The BEST and most CREATIVE group wins a prize!</p>
      </div>
      <ul className="grid grid-cols-1 gap-2 mt-2 text-sm text-gray-800">
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">✨ Walk by Faith, Not by Sight</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">🏋️ Carry Each other's Heavy Load</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">✝️ Carry your Cross</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">⏳ The Joy in Waiting</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">🙏 Pray Without Ceasing</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">👥 When Two or Three are Gathered</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">💪 The Joy of the Lord is your strength</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">❤️ We love him because he loved us first</li>
        <li className="bg-amber-50 p-3 rounded-lg border border-amber-100 font-bold shadow-sm">🤝 Love your Enemies</li>
      </ul>
    </div>
  </div>
);

// --- LEADER OUTLINE COMPONENT ---
const LeaderOutline = () => (
  <div className="space-y-6 animate-in fade-in duration-300 pb-8">
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-1">Leader Agenda</h1>
        <p className="text-slate-300 text-sm">Confidential - Staff Only</p>
      </div>
      <UserCog className="w-8 h-8 text-slate-400" />
    </div>

    <div className="space-y-6 text-sm text-gray-800">
      
      {/* 7:30 */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-slate-500 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-2">7:30 PM | Gather & Snacks</h3>
        <p className="font-semibold text-indigo-600 mb-2">All Leaders</p>
        <p className="text-gray-600">Welcome students as they arrive, direct them to snacks, and mingle.</p>
      </div>

      {/* 7:45 */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-indigo-500 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-2">7:45 PM | Welcome, Vision & Prayer</h3>
        <p className="font-semibold text-indigo-600 mb-2">Leaders: Matt & Latoya</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>Action:</strong> Welcome students, set tone. Share vision (building community, faith, support).</li>
          <li><strong>Prayer:</strong> Latoya leads opening prayer to dedicate the night.</li>
        </ul>
      </div>

      {/* 7:55 */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-amber-500 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-2">7:55 PM | Ice Breakers & Games</h3>
        <p className="font-semibold text-indigo-600 mb-2">Leaders: Bethany & Jalesa</p>
        <div className="space-y-4 text-gray-600 mt-3">
          <p><strong>Game 1: Team Scavenger Hunt</strong> <br/>Break youth into teams of 4-5. Have them open the app and complete the checklist. <strong>Verify their tasks:</strong> check their team selfies, songs, and handshakes as they finish! (Emoji Answers: Adam/Eve, Daniel/Lions, Jesus/Water, Feeding 5000, Jonah, Joseph/Coat).</p>
          <p><strong>Game 2: TikTok Challenges</strong> <br/>Break into smaller groups of 2-3. Assign them one of the phrases from the app (or let them pick). They act it out, and you judge the most creative one for the prize.</p>
        </div>
      </div>

      {/* 8:30 */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-2">8:30 PM | Feedback Focus</h3>
        <p className="font-semibold text-indigo-600 mb-2">Leader: Matt</p>
        <p className="text-gray-600">Explain their voice matters. Show QR code for this app. <strong>Enforce 5-10 minutes of quiet time</strong> so everyone completes it.</p>
      </div>

      {/* 8:45 */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-2">8:45 PM | Food & Fellowship</h3>
        <p className="font-semibold text-indigo-600 mb-2">Leaders: Matt & Latoya</p>
        <p className="text-gray-600">Matt blesses food. Play background music. <strong>Leader Focus:</strong> All leaders intentionally sit with students, especially newer/quieter ones, and connect organically.</p>
      </div>

      {/* 9:30 */}
      <div className="bg-white p-4 rounded-xl border-l-4 border-rose-500 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-2">9:30 PM | Prizes & Closing</h3>
        <p className="font-semibold text-indigo-600 mb-2">Leaders: Bethany, Jalesa, & Pastor Blair</p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li><strong>9:30:</strong> Bethany/Jalesa distribute grand prizes.</li>
          <li><strong>9:35:</strong> Pastor Blair gives 2-3 min encouraging wrap-up & announces next date.</li>
          <li><strong>9:40:</strong> Pastor Blair prays blessing and dismisses by 9:45 PM.</li>
        </ul>
      </div>

    </div>
  </div>
);

// --- SURVEY FORM COMPONENT ---
const SurveyForm = () => {
  const [step, setStep] = useState('intro'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: ''
  });

  const handleInput = (e: any) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      // Using Direct REST API via fetch instead of the Supabase library
      const response = await fetch(`${supabaseUrl}/rest/v1/youth_connect_feedback`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to submit feedback.');
      }

      setStep('success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error submitting feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-16 animate-in fade-in">
      <CheckCircle className="w-16 h-16 text-green-500" />
      <h2 className="text-2xl font-bold">Feedback Sent!</h2>
      <p className="text-gray-500">Thank you for helping us make Youth Connect better.</p>
      <button onClick={() => setStep('intro')} className="text-indigo-600 font-medium mt-4">Submit another</button>
    </div>
  );

  if (step === 'intro') return (
    <div className="flex flex-col items-center text-center space-y-6 py-10 animate-in fade-in">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
        <MessageSquare className="w-10 h-10 text-indigo-600" />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900">Have Your Say!</h1>
      <p className="text-gray-600">Your honest feedback helps us make Youth Connect better, more engaging, and more relevant.</p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 text-left"><strong>100% Anonymous.</strong> Please be honest, we are listening!</p>
      </div>
      <button onClick={() => setStep('survey')} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4">
        Start Survey <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in pb-12">
      <h2 className="text-2xl font-bold text-gray-900">Your Feedback</h2>
      
      {/* Generate exactly 15 Questions to match your DB schema */}
      {[
        "1. On a scale of 1-5, how relevant do you feel the Youth Connect meetings are to your daily life?",
        "2. What is the number one thing that would make you more excited to attend youth meetings?",
        "3. Have you ever felt like this youth ministry wasn't a good fit for you? (If yes, why?)",
        "4. What real-life issues or struggles do you think teenagers face today that the church needs to address?",
        "5. What specific topics or discussions would actually help you grow closer to God right now?",
        "6. What makes it difficult for you to participate or engage when you do attend?",
        "7. Do you feel like you belong and have a community with the youth at our church?",
        "8. How comfortable do you feel sharing your honest thoughts and questions during meetings?",
        "9. Do you feel like your voice and ideas are genuinely heard in this youth ministry?",
        "10. What types of activities, events, or hangout styles would you love to see us do more of?",
        "11. Do you have any hobbies, talents, or interests that you wish we incorporated into our meetings?",
        "12. Do you feel there are enough opportunities for you to use your personal gifts at church?",
        "13. Would you be interested in helping plan future youth events or leading parts of a meeting?",
        "14. What could the youth leaders do differently to support you and connect with you better?",
        "15. If you were in charge of redesigning this youth ministry, what is the *one major thing* you would change?"
      ].map((q, i) => (
        <div key={`q${i+1}`} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-900 mb-3">{q}</label>
          <textarea 
            name={`q${i+1}`} value={(formData as any)[`q${i+1}`]} onChange={handleInput}
            placeholder="Your honest answer..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 resize-none min-h-[100px]"
          />
        </div>
      ))}
      {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">{error}</div>}
      <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
        {isSubmitting ? 'Submitting...' : 'Submit Anonymous Feedback'} <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

const ResultsDashboard = () => {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Using Direct REST API via fetch
        const response = await fetch(`${supabaseUrl}/rest/v1/youth_connect_feedback?select=*&order=created_at.desc`, {
          method: 'GET',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setResponses(data);
        }
      } catch (err) {
        console.error("Failed to fetch results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <div className="text-center py-20 animate-pulse text-gray-500">Loading results...</div>;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Survey Results</h2>
        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold border">{responses.length} Submissions</span>
      </div>
      
      {responses.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-dashed">No responses yet.</div>
      ) : (
        <div className="space-y-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={`res-q${i+1}`} className="space-y-3">
              <h3 className="font-bold text-gray-900 text-lg pb-2 border-b">Question {i + 1}</h3>
              {responses.map((resp, idx) => (
                resp[`q${i+1}`] && (
                  <div key={`r-${idx}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-gray-700 text-sm">
                    {resp[`q${i+1}`]}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('youth'); // 'youth', 'games', 'survey', 'results', 'leader'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Tab Navigation Handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  // --- RENDER CURRENT TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case 'youth': return <YouthOutline />;
      case 'games': return <GamesGuide />;
      case 'survey': return <SurveyForm />;
      case 'results': return isAdminAuthenticated ? <ResultsDashboard /> : <AdminLogin onSuccess={() => setIsAdminAuthenticated(true)} />;
      case 'leader': return isAdminAuthenticated ? <LeaderOutline /> : <AdminLogin onSuccess={() => setIsAdminAuthenticated(true)} />;
      default: return <YouthOutline />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Main Content Area */}
      <main className="max-w-md mx-auto w-full px-4 pt-6">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex justify-between items-center px-2 py-2">
          
          <button onClick={() => handleTabChange('youth')} className={`flex flex-col items-center p-2 rounded-xl min-w-[4rem] transition-colors ${activeTab === 'youth' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <Home className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Agenda</span>
          </button>
          
          <button onClick={() => handleTabChange('games')} className={`flex flex-col items-center p-2 rounded-xl min-w-[4rem] transition-colors ${activeTab === 'games' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <Gamepad2 className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Games</span>
          </button>
          
          <button onClick={() => handleTabChange('survey')} className={`flex flex-col items-center p-2 rounded-xl min-w-[4rem] transition-colors ${activeTab === 'survey' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <MessageSquare className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Survey</span>
          </button>

          <button onClick={() => handleTabChange('results')} className={`flex flex-col items-center p-2 rounded-xl min-w-[4rem] transition-colors ${activeTab === 'results' ? 'text-slate-900' : 'text-gray-400 hover:text-gray-600'}`}>
            <BarChart3 className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Results</span>
          </button>

          <button onClick={() => handleTabChange('leader')} className={`flex flex-col items-center p-2 rounded-xl min-w-[4rem] transition-colors ${activeTab === 'leader' ? 'text-slate-900' : 'text-gray-400 hover:text-gray-600'}`}>
            <ClipboardList className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Leaders</span>
          </button>

        </div>
      </nav>
    </div>
  );
}