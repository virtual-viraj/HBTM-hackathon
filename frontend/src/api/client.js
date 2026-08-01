import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000,
});

export const apiService = {
  // Post user aspiration to parse goal with Gemini AI
  postAspiration: async (userInput, userId = 'demo_user') => {
    const res = await api.post('/api/aspirations', {
      user_id: userId,
      user_input: userInput,
    });
    return res.data;
  },

  // Get curated learning resources from Gemini AI
  getCuratedResources: async (userProfile = null, userId = 'demo_user') => {
    const res = await api.post('/api/curate', {
      user_id: userId,
      user_profile: userProfile,
    });
    return res.data;
  },

  // Generate milestone roadmap
  generateRoadmap: async (userProfile = null, userId = 'demo_user') => {
    const res = await api.post('/api/roadmap', {
      user_id: userId,
      user_profile: userProfile,
    });
    return res.data;
  },

  // Get AI daily nudge
  getDailyNudge: async (context = null, userId = 'demo_user') => {
    const res = await api.post('/api/nudge', {
      user_id: userId,
      context: context,
    });
    return res.data;
  },

  // Submit journal entry for AI sentiment analysis
  submitJournal: async (journalEntry, userId = 'demo_user') => {
    const res = await api.post('/api/journal', {
      user_id: userId,
      journal_entry: journalEntry,
    });
    return res.data;
  },

  // Get user identity map & leveling metrics
  getUserIdentity: async (userId = 'demo_user') => {
    const res = await api.get(`/api/identity/${userId}`);
    return res.data;
  },
};

export default api;
