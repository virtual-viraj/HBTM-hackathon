import React from 'react';
import { Home, Rss, User, Edit3, Bell, Settings, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const bottomNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'feed', label: 'Feed', icon: Rss },
    { id: 'identity', label: 'Identity', icon: User },
    { id: 'journal', label: 'Journal', icon: Edit3 },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#f6f7fc]/90 backdrop-blur-md border-b border-slate-200/60 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('onboarding1')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#3b2bee] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#1e1b4b]">AspireFlow</span>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActiveTab('onboarding1')}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-[#3b2bee] border border-indigo-100 hover:bg-indigo-100 transition"
            >
              Onboarding
            </button>

            <button className="p-2 rounded-full text-slate-600 hover:bg-slate-200/60 transition">
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-600 p-0.5 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

        </div>
      </header>

      {/* Bottom Sticky Navigation Bar (Mobile / Responsive Figma Navigation) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-lg px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#3b2bee] font-bold'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition ${isActive ? 'bg-[#3b2bee]/10 text-[#3b2bee]' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
