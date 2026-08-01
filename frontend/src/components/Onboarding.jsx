import React, { useState } from 'react';
import { ChevronLeft, HelpCircle, ArrowRight, Briefcase, GraduationCap, Sparkles, Loader2, Check } from 'lucide-react';
import { apiService } from '../api/client';

export default function Onboarding({ step = 1, onStepChange, onComplete }) {
  const [currentStep, setCurrentStep] = useState(step);

  // Form State
  const [fullName, setFullName] = useState('Alex Rivera');
  const [userStatus, setUserStatus] = useState('Student'); // Professional or Student
  const [fiveYearVision, setFiveYearVision] = useState('I want to become a Lead AI & ML Engineer building intelligent full-stack systems.');
  const [primaryGoal, setPrimaryGoal] = useState('Become a Lead AI Engineer');
  const [selectedSkills, setSelectedSkills] = useState(['Generative AI', 'UI/UX Design', 'Data Science']);

  const [loading, setLoading] = useState(false);

  const availableSkills = [
    'UI/UX Design',
    'Data Science',
    'Generative AI',
    'Public Speaking',
    'Strategic Thinking',
    'FinOps',
    'Python & PyTorch',
    'System Design',
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleStep1Continue = () => {
    setCurrentStep(2);
    if (onStepChange) onStepChange(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullAspirationPrompt = `
Full Name: ${fullName}
Status: ${userStatus}
5-Year Vision: ${fiveYearVision}
Primary Goal: ${primaryGoal}
Current Skills: ${selectedSkills.join(', ')}
    `.strip ? fullAspirationPrompt.strip() : fullAspirationPrompt;

    try {
      const res = await apiService.postAspiration(fullAspirationPrompt);
      if (onComplete) {
        onComplete(res.profile || { goal: primaryGoal, current_skills: selectedSkills });
      }
    } catch (err) {
      console.error('Aspiration submit error:', err);
      if (onComplete) {
        onComplete({ goal: primaryGoal, current_skills: selectedSkills });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7fc] pt-4 pb-24 px-4">
      
      {/* ---------------------------------- */}
      {/* STEP 1: WELCOME TO ASPIREFLOW      */}
      {/* (Matches User Attached Image 2)    */}
      {/* ---------------------------------- */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#64748b] tracking-wider uppercase">
              <span>Onboarding Progress</span>
              <span className="text-[#3b2bee]">Step 1 of 4</span>
            </div>
            <div className="w-full bg-[#e8ebf7] rounded-full h-2 overflow-hidden">
              <div className="bg-[#3b2bee] h-2 rounded-full w-1/4"></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-[#1e1b4b] tracking-tight leading-tight">
                Welcome to <br />
                <span className="text-[#3b2bee]">AspireFlow</span>
              </h1>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Let's begin your journey toward cognitive clarity. Who are we learning with today?
              </p>
            </div>

            {/* FULL NAME */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full bg-[#f7f8fd] border border-[#e8ebf7] rounded-2xl p-4 text-sm font-medium text-[#1e1b4b] focus:outline-none focus:border-[#3b2bee] focus:bg-white transition"
              />
            </div>

            {/* CURRENT STATUS */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Current Status
              </label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Professional */}
                <button
                  type="button"
                  onClick={() => setUserStatus('Professional')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition ${
                    userStatus === 'Professional'
                      ? 'border-[#3b2bee] bg-indigo-50/50 text-[#3b2bee] font-bold shadow-sm'
                      : 'border-[#e8ebf7] bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Briefcase className="w-6 h-6 text-[#3b2bee]" />
                  <span className="text-xs">Professional</span>
                </button>

                {/* Student */}
                <button
                  type="button"
                  onClick={() => setUserStatus('Student')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition ${
                    userStatus === 'Student'
                      ? 'border-[#3b2bee] bg-indigo-50/50 text-[#3b2bee] font-bold shadow-sm'
                      : 'border-[#e8ebf7] bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <GraduationCap className="w-6 h-6 text-[#3b2bee]" />
                  <span className="text-xs">Student</span>
                </button>

              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleStep1Continue}
              className="px-8 py-4 bg-[#3b2bee] hover:bg-[#3122d6] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center space-x-2 transition text-sm"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ---------------------------------- */}
      {/* STEP 2: BUILD YOUR GROWTH PROFILE  */}
      {/* (Matches User Attached Image 1)    */}
      {/* ---------------------------------- */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6 animate-fade-in">
          
          {/* Top Sub-Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center text-sm font-bold text-[#3b2bee] hover:text-[#3122d6]"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>AspireFlow</span>
            </button>
            <HelpCircle className="w-5 h-5 text-slate-400" />
          </div>

          {/* Title & Description */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-extrabold text-[#1e1b4b]">
              Build Your Growth Profile
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed px-2">
              Our AI uses these insights to curate a personalized learning path, identify skill gaps, and keep you aligned with your long-term vision.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span className="text-[#3b2bee] tracking-wider uppercase">Onboarding Progress</span>
              <span>3 of 10 completed</span>
            </div>
            <div className="w-full bg-[#e8ebf7] rounded-full h-2 overflow-hidden">
              <div className="bg-[#3b2bee] h-2 rounded-full w-1/3"></div>
            </div>
          </div>

          {/* Card 1: 5-Year Vision */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-[#1e1b4b]">
              What do you want to become in the next 5 years?
            </label>
            <textarea
              rows={3}
              value={fiveYearVision}
              onChange={(e) => setFiveYearVision(e.target.value)}
              placeholder="Visualize your future self. Be as descriptive as possible..."
              className="w-full bg-[#f7f8fd] border border-[#e8ebf7] rounded-2xl p-3.5 text-xs text-[#1e1b4b] placeholder-slate-400 focus:outline-none focus:border-[#3b2bee] focus:bg-white leading-relaxed"
            ></textarea>
          </div>

          {/* Card 2: Long-Term Goal */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-[#1e1b4b]">
              What is your primary long-term goal?
            </label>
            <input
              type="text"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              placeholder="e.g., Become a Lead Product Design"
              className="w-full bg-[#f7f8fd] border border-[#e8ebf7] rounded-2xl p-3.5 text-xs font-medium text-[#1e1b4b] placeholder-slate-400 focus:outline-none focus:border-[#3b2bee] focus:bg-white"
            />
          </div>

          {/* Card 3: Skills Currently Learning */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#1e1b4b]">
                What skills are you currently learning?
              </label>
              <p className="text-[11px] text-slate-400 italic mt-0.5">Select all that apply.</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {availableSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-[#3b2bee] bg-indigo-50 text-[#3b2bee] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#3b2bee] hover:bg-[#3122d6] text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 transition text-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sculpting Path with Gemini AI...</span>
                </>
              ) : (
                <>
                  <span>Sculpt My AI Path</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
