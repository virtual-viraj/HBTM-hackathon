import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Award, Zap, Bell, Sparkles } from 'lucide-react';

export default function WeeklyReview({ tabMode = 'review' }) {
  const [activeTab, setActiveTab] = useState('review'); // 'review' or 'alerts'

  const notifications = [
    {
      title: 'Daily Smart Nudge',
      time: '10 mins ago',
      desc: 'Focus on PyTorch tensor operations today to complete your active milestone!',
      type: 'nudge',
    },
    {
      title: 'Milestone Completed 🎉',
      time: '2 hours ago',
      desc: '+150 XP earned for Mastered SQL & Databases.',
      type: 'achievement',
    },
    {
      title: 'Cognitive Rhythm Alert',
      time: 'Yesterday',
      desc: 'Peak performance period approaching (1:00 PM - 3:00 PM).',
      type: 'system',
    },
  ];

  const gapAnalysis = [
    {
      skill: 'PyTorch Neural Networks',
      target: '80%',
      current: '60%',
      status: 'In Progress',
      action: 'Complete 2 hands-on vision modules next week',
    },
    {
      skill: 'FastAPI Backend API Design',
      target: '90%',
      current: '85%',
      status: 'Near Mastery',
      action: 'Deploy containerized server on Cloud Run',
    },
    {
      skill: 'Transformers & Attention',
      target: '70%',
      current: '35%',
      status: 'Attention Needed',
      action: 'Read Jay Alammar blog post & code self-attention from scratch',
    },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7fc] pt-4 pb-24 px-4 space-y-6">
      
      {/* Sub Header Tabs */}
      <div className="flex bg-[#e8ebf7]/60 p-1 rounded-2xl">
        <button
          onClick={() => setActiveTab('review')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'review'
              ? 'bg-white text-[#3b2bee] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Weekly Analytics
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'alerts'
              ? 'bg-white text-[#3b2bee] shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Notifications & Alerts
        </button>
      </div>

      {activeTab === 'review' ? (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-[#1e1b4b]">Weekly Review</h1>
            <p className="text-xs text-slate-500 mt-1">
              Performance metrics & AI Gap Analysis for Week 4.
            </p>
          </div>

          {/* Performance Overview Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Hours Invested</span>
              <div className="text-xl font-black text-[#1e1b4b]">14.5 hrs</div>
              <div className="text-[10px] font-bold text-emerald-600">+2.5 hrs vs last week</div>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks Completed</span>
              <div className="text-xl font-black text-[#3b2bee]">18 / 20</div>
              <div className="text-[10px] font-bold text-emerald-600">90% Completion Rate</div>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Aspire Score</span>
              <div className="text-xl font-black text-purple-600">78 / 100</div>
              <div className="text-[10px] font-bold text-purple-600">+5 points gained</div>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Streak Days</span>
              <div className="text-xl font-black text-amber-500">5 Days 🔥</div>
              <div className="text-[10px] font-bold text-amber-600">Personal best!</div>
            </div>
          </div>

          {/* Gap Analysis Section */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center space-x-2 text-[#1e1b4b]">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-extrabold">Skill Gap Analysis</h2>
            </div>

            <div className="space-y-4">
              {gapAnalysis.map((gap, idx) => (
                <div key={idx} className="bg-[#f7f8fd] rounded-2xl p-4 border border-[#e8ebf7] space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1e1b4b]">{gap.skill}</span>
                    <span className="text-[#3b2bee] font-bold">{gap.current} / {gap.target}</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#3b2bee] h-2 rounded-full"
                      style={{ width: gap.current }}
                    ></div>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                    <strong className="text-[#3b2bee]">Action:</strong> {gap.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Notifications & Alerts Tab */
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1e1b4b]">Notification Center</h1>
            <p className="text-xs text-slate-500 mt-1">Smart nudges and goal updates from AspireFlow.</p>
          </div>

          <div className="space-y-3">
            {notifications.map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#3b2bee] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1e1b4b]">
                    <span>{item.title}</span>
                    <span className="text-[10px] font-medium text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
