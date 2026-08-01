import React, { useEffect, useState } from 'react';
import { Sparkles, Check, CheckCircle2, Circle, Lock, Zap, AlertCircle } from 'lucide-react';
import { apiService } from '../api/client';

export default function BecomingMap() {
  const [identityData, setIdentityData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await apiService.getUserIdentity('demo_user');
        if (res && res.identity) {
          setIdentityData(res.identity);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7fc] pt-4 pb-24 px-4 space-y-6">
      
      {/* Current Version & Dream Identity Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden space-y-3">
        <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Current Version</div>
        <h2 className="text-xl font-extrabold text-[#3b2bee]">Beginner Backend Developer</h2>
        
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-[#3b2bee] text-[11px] font-bold border border-indigo-100">
          <span>→ Transitioning</span>
        </div>

        <div className="pt-1">
          <div className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase">Dream Identity</div>
          <h3 className="text-2xl font-black text-[#1e1b4b]">AI Engineer</h3>
        </div>
      </div>

      {/* Evolution Score Ring */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center space-y-4">
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e8ebf7"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3b2bee"
              strokeWidth="8"
              strokeDasharray="251.2"
              strokeDashoffset="163.2" // 35% fill
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-[#3b2bee]">35%</span>
          </div>
        </div>

        <div>
          <h3 className="font-extrabold text-[#1e1b4b] text-base">Evolution Score</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
            You're making steady progress toward your AI Engineer core identity.
          </p>
        </div>
      </div>

      {/* Need to Improve Section */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-indigo-100 space-y-3">
        <div className="flex items-center space-x-2 text-[#1e1b4b]">
          <h3 className="font-bold text-sm">Need to Improve</h3>
          <AlertCircle className="w-4 h-4 text-[#3b2bee]" />
        </div>

        <div className="space-y-2">
          {['DSA', 'System Design', 'Python (Advanced)', 'AI Fundamentals'].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#f7f8fd] border border-[#e8ebf7] flex items-center space-x-3 text-xs font-semibold text-[#1e1b4b]"
            >
              <div className="w-4 h-4 rounded border border-slate-300 bg-white"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Already Strong Section */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border-2 border-emerald-100 space-y-3">
        <div className="flex items-center space-x-2 text-[#1e1b4b]">
          <h3 className="font-bold text-sm">Already Strong</h3>
          <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#1e1b4b]">Problem Solving</div>
              <div className="text-[11px] text-slate-400">Validated through 48 solved tickets.</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#1e1b4b]">Debugging</div>
              <div className="text-[11px] text-slate-400">Zero regression in recent sprints.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Evolution Roadmap Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-extrabold text-[#1e1b4b] text-base">Evolution Roadmap</h3>

        <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#e8ebf7]">
          
          {/* Node 1 */}
          <div className="relative pl-10">
            <div className="absolute left-1 top-0 w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center z-10">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[#f7f8fd] rounded-2xl p-4 border border-[#e8ebf7] space-y-1">
              <span className="text-[10px] font-bold text-emerald-600">Completed Aug 12</span>
              <h4 className="text-xs font-bold text-[#1e1b4b]">Mastered SQL & Databases</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Deep understanding of relational schemas and query optimization.
              </p>
            </div>
          </div>

          {/* Node 2 */}
          <div className="relative pl-10">
            <div className="absolute left-1 top-0 w-6 h-6 rounded-full bg-white border-2 border-[#3b2bee] flex items-center justify-center z-10">
              <div className="w-2 h-2 rounded-full bg-[#3b2bee]"></div>
            </div>
            <div className="bg-[#f0efff] rounded-2xl p-4 border border-[#3b2bee] space-y-1">
              <span className="text-[10px] font-bold text-[#3b2bee]">IN PROGRESS</span>
              <h4 className="text-xs font-bold text-[#1e1b4b]">Advanced System Design</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Learning load balancing, microservices architecture, and caching strategies.
              </p>
            </div>
          </div>

          {/* Node 3 */}
          <div className="relative pl-10">
            <div className="absolute left-1 top-0 w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center z-10">
              <Lock className="w-3 h-3" />
            </div>
            <div className="bg-[#f7f8fd] rounded-2xl p-4 border border-[#e8ebf7] space-y-1 opacity-75">
              <span className="text-[10px] font-bold text-slate-400">Next Step</span>
              <h4 className="text-xs font-bold text-slate-500">Neural Networks Module</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Foundational deep learning and backpropagation mechanics.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Commit to Next Action Button */}
      <button className="w-full py-4 bg-[#3b2bee] hover:bg-[#3122d6] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition text-sm">
        <span>Commit to Next Action</span>
        <Zap className="w-4 h-4" />
      </button>

    </div>
  );
}
