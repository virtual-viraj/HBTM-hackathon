import React, { useState } from 'react';
import { Check, Clock, Plus, Sparkles, Edit2, Play, Flame } from 'lucide-react';

export default function TaskTracker() {
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Deep Work: Neural Networks',
      time: '09:00 AM - 11:00 AM',
      category: 'Deep Work',
      status: 'Completed',
      completed: true,
    },
    {
      id: 2,
      title: 'Morning Mindfulness',
      time: '07:30 AM - 08:00 AM',
      category: 'Wellness',
      status: 'Up Next',
      completed: false,
    },
    {
      id: 3,
      title: 'Backend System Design',
      time: '01:00 PM - 03:00 PM',
      category: 'Technical Skill',
      status: 'Pending',
      completed: false,
    },
    {
      id: 4,
      title: 'Quarterly Roadmap Review',
      time: '04:00 PM - 05:00 PM',
      category: 'Deep Work',
      status: 'Scheduled',
      completed: false,
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Technical Skill');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? 'Completed' : 'Pending' } : t
      )
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTaskTitle,
        time: '05:30 PM - 06:30 PM',
        category: newTaskCategory,
        status: 'Scheduled',
        completed: false,
      },
    ]);
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'All Tasks') return true;
    return t.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7fc] pt-4 pb-24 px-4 space-y-6">
      
      {/* Title & Date */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1e1b4b]">Today's Execution</h1>
        <p className="text-xs font-semibold text-slate-400 mt-1">August 1, 2026</p>
      </div>

      {/* Momentum Progress Card */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-600">Daily Momentum</span>
          <span className="text-[#3b2bee]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#e8ebf7] rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-[#10b981] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Pill Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {['All Tasks', 'Deep Work', 'Wellness', 'Technical'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition flex-shrink-0 ${
              activeFilter === filter
                ? 'bg-[#3b2bee] text-white shadow-md shadow-indigo-500/20'
                : 'bg-[#e8ebf7]/60 text-slate-600 hover:bg-[#e8ebf7]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              {/* Category Pill */}
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                  task.category === 'Deep Work'
                    ? 'bg-indigo-50 text-[#3b2bee]'
                    : task.category === 'Wellness'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                {task.category}
              </span>

              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-7 h-7 rounded-xl border flex items-center justify-center transition ${
                  task.completed
                    ? 'bg-[#10b981] border-[#10b981] text-white shadow-sm'
                    : 'border-slate-300 bg-white hover:border-[#3b2bee]'
                }`}
              >
                {task.completed && <Check className="w-4 h-4" />}
              </button>
            </div>

            {/* Task Title & Time */}
            <div>
              <h3 className={`font-bold text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-[#1e1b4b]'}`}>
                {task.title}
              </h3>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{task.time}</span>
              </div>
            </div>

            {/* Footer status */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px]">
              <span className={`font-semibold ${task.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
                {task.status}
              </span>
              <button className="text-[#3b2bee] font-bold hover:underline flex items-center space-x-1">
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Execution Insight Box */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto text-[#3b2bee]">
          <Sparkles className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-extrabold text-[#1e1b4b] text-base">AI Execution Insight</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Your peak performance for "Technical Skills" is typically between 1 PM and 3 PM. You've aligned today's schedule perfectly with your cognitive rhythm.
          </p>
        </div>

        <button className="px-6 py-3 bg-[#3b2bee] text-white text-xs font-bold rounded-2xl shadow-md hover:bg-[#3122d6] transition">
          View Analytics
        </button>
      </div>

      {/* Plan New Task Button */}
      <div
        onClick={() => setShowAddModal(!showAddModal)}
        className="border-2 border-dashed border-slate-200 rounded-3xl p-5 text-center cursor-pointer hover:border-[#3b2bee] transition bg-white/50"
      >
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600 mb-2">
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-slate-700">Plan New Task</span>
      </div>

      {showAddModal && (
        <form onSubmit={addTask} className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-xl space-y-3">
          <h4 className="font-bold text-xs text-[#1e1b4b]">Add New Execution Task</h4>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="e.g. Build Gemini API route..."
            className="w-full bg-[#f7f8fd] border border-[#e8ebf7] rounded-xl p-3 text-xs focus:outline-none"
          />
          <button type="submit" className="w-full py-3 bg-[#3b2bee] text-white rounded-xl font-bold text-xs">
            Save Task
          </button>
        </form>
      )}

    </div>
  );
}
