import React, { useState, useEffect } from 'react';
import { PlayCircle, BookOpen, Search, Sparkles, RefreshCw } from 'lucide-react';
import { apiService } from '../api/client';

export default function GrowthFeed({ userProfile }) {
  const [loading, setLoading] = useState(false);

  const mediaResources = [
    {
      author: 'Fireship',
      title: 'Advanced Backend Patterns',
      why: "You're learning Backend and struggled with Auth in your last session.",
      query: 'Search for Advanced Backend',
    },
    {
      author: 'Ali Abdaal',
      title: 'System Design for Productivity',
      why: 'Optimizing your learning efficiency for System Design.',
      query: 'Search for System Design',
    },
    {
      author: 'Sentdex',
      title: 'Neural Networks from Scratch',
      why: 'Directly supports your goal of moving into AI Engineering.',
      query: 'Search for Neural Networks',
    },
  ];

  const bookResources = [
    {
      category: 'CHAPTER 4',
      title: 'The Pyramid Principle',
      why: 'Improves communication – your current weakness.',
      query: 'Search for System Design',
    },
    {
      category: 'BESTSELLER',
      title: 'Atomic Habits',
      why: 'To help build the consistent routines needed for your transition to AI Engineer.',
      query: 'Search for System Design',
    },
    {
      category: 'PRODUCTIVITY',
      title: 'Deep Work',
      why: 'Essential for mastering the complex technical skills in your roadmap.',
      query: 'Search for System Design',
    },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7fc] pt-4 pb-24 px-4 space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1e1b4b]">Today's Curated Feed</h1>
        <p className="text-xs text-slate-500 mt-1">
          AI-powered growth resources based on your Identity Profile.
        </p>
      </div>

      {/* MEDIA FOCUS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <PlayCircle className="w-4 h-4 text-[#3b2bee]" />
          <span>Media Focus</span>
        </div>

        {mediaResources.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#3b2bee]">{item.author}</h3>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{item.title}</p>
              </div>
              <PlayCircle className="w-5 h-5 text-slate-300" />
            </div>

            {/* Why Box */}
            <div className="bg-[#f7f8fd] rounded-2xl p-3.5 border border-[#e8ebf7] flex items-start space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#3b2bee] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-[#3b2bee]">Why:</strong> {item.why}
              </p>
            </div>

            {/* Search Button */}
            <button className="w-full py-3 bg-white border border-[#e8ebf7] rounded-2xl text-xs font-bold text-slate-700 hover:border-[#3b2bee] hover:text-[#3b2bee] transition flex items-center justify-center space-x-2">
              <Search className="w-3.5 h-3.5" />
              <span>{item.query}</span>
            </button>
          </div>
        ))}
      </div>

      {/* KNOWLEDGE DEEP-DIVE SECTION */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-[#3b2bee]" />
          <span>Knowledge Deep-Dive</span>
        </div>

        {bookResources.map((book, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-start space-x-4">
              {/* Book Cover Placeholder */}
              <div className="w-16 h-20 bg-indigo-100 rounded-xl flex items-center justify-center text-[#3b2bee] flex-shrink-0">
                <BookOpen className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold tracking-wider text-emerald-600 uppercase">
                  {book.category}
                </span>
                <h3 className="text-base font-extrabold text-[#1e1b4b]">{book.title}</h3>
                
                <div className="flex items-start space-x-1.5 pt-1">
                  <Sparkles className="w-3 h-3 text-[#3b2bee] flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 leading-tight">
                    <strong className="text-[#3b2bee]">Why:</strong> {book.why}
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-white border border-[#e8ebf7] rounded-2xl text-xs font-bold text-slate-700 hover:border-[#3b2bee] hover:text-[#3b2bee] transition flex items-center justify-center space-x-2">
              <Search className="w-3.5 h-3.5" />
              <span>{book.query}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
