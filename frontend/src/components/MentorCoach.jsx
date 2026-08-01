import React, { useState } from 'react';
import { Sparkles, Send, Plus, CheckCircle2, History, Settings, Bot, User } from 'lucide-react';
import { apiService } from '../api/client';

export default function MentorCoach() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      time: '09:12 AM',
      text: "Good morning, Alex. I've been reviewing your recent focus sessions. Your cognitive stamina is improving, but I noticed a slight dip in creative flow during the afternoon. How are you feeling about your energy levels today?",
    },
    {
      sender: 'user',
      time: '09:14 AM',
      text: "I've been feeling a bit drained by 3 PM. I think my deep work blocks might be too long.",
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', time: '09:15 AM', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await apiService.submitJournal(currentInput);
      const aiReply = res?.analysis?.reflection || res?.analysis?.sentiment || "That's a very observant reflection! I suggest scheduling 10-minute cognitive restoration breaks after every deep work block.";
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          time: '09:16 AM',
          text: typeof aiReply === 'string' ? aiReply : JSON.stringify(aiReply),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          time: '09:16 AM',
          text: "I hear you! Shifting to 50/10 intervals will help maintain your peak cognitive stamina throughout the afternoon.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7fc] pt-4 pb-24 px-4 space-y-6">
      
      {/* Sub Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-500">Mentor Active</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-500">
          <button className="p-1.5 hover:bg-slate-200 rounded-full transition">
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="space-y-5">
        
        {/* AI Message 1 */}
        <div className="space-y-1">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#3b2bee] flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-xs text-slate-700 leading-relaxed max-w-[85%] space-y-2">
              <p>{messages[0].text}</p>
            </div>
          </div>
          <div className="text-[10px] font-semibold text-slate-400 pl-11">{messages[0].time}</div>
        </div>

        {/* User Message 1 */}
        <div className="space-y-1 text-right">
          <div className="flex items-start justify-end space-x-3">
            <div className="bg-[#3b2bee] text-white rounded-3xl p-5 shadow-md text-xs leading-relaxed max-w-[85%] text-left">
              <p>{messages[1].text}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[10px] font-semibold text-slate-400 pr-11">{messages[1].time}</div>
        </div>

        {/* GROWTH OPPORTUNITY CARD */}
        <div className="bg-[#e6f4f1] border border-emerald-200 rounded-3xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto text-[#3b2bee]">
            <Sparkles className="w-6 h-6" />
          </div>

          <span className="text-[10px] font-extrabold tracking-wider text-[#3b2bee] uppercase">
            Growth Opportunity
          </span>

          <p className="text-xs text-slate-700 leading-relaxed">
            Based on your "drained" feedback, let's try Intermittent Recovery. Instead of 90-minute blocks, we'll shift to 50/10 intervals today.
          </p>

          <div className="flex gap-2 pt-1 justify-center">
            <button className="px-5 py-2.5 bg-[#3b2bee] text-white text-xs font-bold rounded-2xl shadow-sm hover:bg-[#3122d6] transition">
              Update Schedule
            </button>
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-2xl hover:bg-slate-50 transition">
              Tell me more
            </button>
          </div>
        </div>

        {/* AI Message 2 */}
        <div className="space-y-1">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#3b2bee] flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-xs text-slate-700 leading-relaxed max-w-[85%] space-y-3">
              <p>
                That's a very observant reflection. Your data confirms that heart rate variability drops after the 70-minute mark. To support this shift, I suggest we focus on 'Cognitive Restoration' during your breaks.
              </p>

              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-[#10b981] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No screens for 10 minutes.</span>
                </div>
                <div className="flex items-center space-x-2 text-[#10b981] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Light stretching or movement.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-semibold text-slate-400 pl-11">09:16 AM</div>
        </div>

        {/* Dynamic New Messages */}
        {messages.slice(2).map((msg, i) => (
          <div key={i} className={`space-y-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
            <div className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[#3b2bee] flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`rounded-3xl p-4 text-xs leading-relaxed max-w-[85%] ${
                  msg.sender === 'user'
                    ? 'bg-[#3b2bee] text-white shadow-md text-left'
                    : 'bg-white border border-slate-100 text-slate-700 shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Suggested Quick Action Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {['Explore Deep Work', 'Meditation Tip', 'Review Goals'].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => setInput(`Tell me more about ${chip}`)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 hover:border-[#3b2bee] hover:text-[#3b2bee] transition flex-shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Reflection Input Bar */}
      <form onSubmit={sendMessage} className="flex gap-2 items-center">
        <div className="flex-1 bg-white border border-[#e8ebf7] rounded-3xl px-4 py-3 flex items-center space-x-2 shadow-sm focus-within:border-[#3b2bee]">
          <Plus className="w-4 h-4 text-slate-400 cursor-pointer" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your reflections..."
            className="w-full bg-transparent text-xs text-[#1e1b4b] placeholder-slate-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-11 h-11 bg-[#3b2bee] hover:bg-[#3122d6] text-white rounded-full flex items-center justify-center shadow-md transition flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
