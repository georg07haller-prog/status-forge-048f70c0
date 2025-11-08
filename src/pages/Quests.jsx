import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

import QuestCard from '../components/quest/QuestCard';

export default function Quests() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: quests = [], isLoading } = useQuery({
    queryKey: ['quests'],
    queryFn: () => base44.entities.Quest.list('-created_date'),
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list('-created_date'),
  });

  const profile = profiles[0];

  const updateQuestMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Quest.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.UserProfile.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    }
  });

  const handleCompleteQuest = async (quest) => {
    // Mark quest as completed
    await updateQuestMutation.mutateAsync({
      id: quest.id,
      data: { ...quest, completed: true }
    });

    // Update profile scores
    if (profile) {
      const scoreKey = `${quest.category}_score`;
      const newScore = Math.min(100, profile[scoreKey] + quest.reward_points);
      const newTotalScore = profile.total_score + quest.reward_points;
      
      await updateProfileMutation.mutateAsync({
        id: profile.id,
        data: {
          ...profile,
          [scoreKey]: newScore,
          total_score: newTotalScore,
          completed_quests: profile.completed_quests + 1,
          daily_streak: profile.daily_streak + 1
        }
      });
    }
  };

  const activeQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="gradient-primary text-white pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate(createPageUrl('Dashboard'))}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">Daily Quests</h1>
              <p className="text-blue-200 text-sm">Complete missions, earn rewards, level up!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">{activeQuests.length} Active</span>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{completedQuests.length} Completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        {/* Narrative banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 mb-6 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🎯</div>
            <div>
              <h3 className="font-bold text-lg mb-1">Your Hero's Arc Begins</h3>
              <p className="text-sm opacity-90">
                Save the world from status inequality – one quest at a time! Every task brings you closer to Empire Eclipse. 🌟
              </p>
            </div>
          </div>
        </motion.div>

        {/* Active Quests */}
        {activeQuests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Active Quests
            </h2>
            <div className="space-y-4">
              {activeQuests.map((quest, idx) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <QuestCard quest={quest} onComplete={handleCompleteQuest} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-500 mb-4">Completed Quests</h2>
            <div className="space-y-3">
              {completedQuests.map((quest) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <QuestCard quest={quest} onComplete={handleCompleteQuest} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {activeQuests.length === 0 && completedQuests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Quests Yet</h3>
            <p className="text-gray-600 mb-6">
              Your adventure awaits! New quests will appear soon.
            </p>
            <Button
              onClick={() => navigate(createPageUrl('Dashboard'))}
              className="gradient-gold"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Quests'))}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <Target className="w-6 h-6" />
            <span className="text-xs font-medium">Quests</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Duels'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <motion.div
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚔️
            </motion.div>
            <span className="text-xs font-medium">Duels</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Profile'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            👤
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}