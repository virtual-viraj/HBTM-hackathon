import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Onboarding from './components/Onboarding';
import TaskTracker from './components/TaskTracker';
import BecomingMap from './components/BecomingMap';
import GrowthFeed from './components/GrowthFeed';
import MentorCoach from './components/MentorCoach';
import WeeklyReview from './components/WeeklyReview';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState(null);

  const handleOnboardingComplete = (parsedProfile) => {
    setUserProfile(parsedProfile);
    setActiveTab('identity');
  };

  return (
    <div className="min-h-screen bg-[#f6f7fc] text-[#1e1b4b] antialiased">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="transition-all duration-300">
        {activeTab === 'onboarding1' && (
          <Onboarding step={1} onStepChange={(s) => setActiveTab(s === 2 ? 'onboarding2' : 'onboarding1')} onComplete={handleOnboardingComplete} />
        )}
        {activeTab === 'onboarding2' && (
          <Onboarding step={2} onStepChange={(s) => setActiveTab(s === 1 ? 'onboarding1' : 'onboarding2')} onComplete={handleOnboardingComplete} />
        )}
        {activeTab === 'home' && <TaskTracker />}
        {activeTab === 'feed' && <GrowthFeed userProfile={userProfile} />}
        {activeTab === 'identity' && <BecomingMap />}
        {activeTab === 'journal' && <MentorCoach />}
        {activeTab === 'alerts' && <WeeklyReview tabMode="alerts" />}
        {activeTab === 'review' && <WeeklyReview tabMode="review" />}
      </main>
    </div>
  );
}
