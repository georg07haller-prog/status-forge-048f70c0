
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Swords, User, TrendingUp, Flame, AlertCircle, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

import ScoreWheel from '../components/status/ScoreWheel';
import StatCard from '../components/status/StatCard';
import AvatarDisplay from '../components/avatar/AvatarDisplay';
import VideoPlayer from '../components/VideoPlayer';
import PremiumBadge from '../components/PremiumBadge';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDebuff, setShowDebuff] = useState(false);

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list('-created_date'),
  });

  const profile = profiles[0];

  useEffect(() => {
    // Show balance warning if any stat is too low
    if (profile) {
      const stats = [profile.wealth_score, profile.power_score, profile.fame_score, profile.charm_score, profile.gear_score];
      const hasLowStat = stats.some(stat => stat < 20);
      setShowDebuff(hasLowStat);
    }
  }, [profile]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Loading your empire...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      category: 'wealth',
      score: profile.wealth_score,
      change: 5,
      detail: '€50 coffee debuff tracked 📊'
    },
    {
      category: 'power',
      score: profile.power_score,
      change: 5,
      detail: 'Zoom call win logged! 💪'
    },
    {
      category: 'fame',
      score: profile.fame_score,
      change: -2,
      detail: '3-day engagement streak 🔥'
    },
    {
      category: 'charm',
      score: profile.charm_score,
      change: 2,
      detail: '7/10 – Add wink for +2! 😉'
    },
    {
      category: 'gear',
      score: profile.gear_score,
      change: 3,
      detail: 'Upload setup for AR boost 📸'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="gradient-primary text-white pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold">StatusForge</h1>
                <PremiumBadge isPremium={profile.is_premium} />
              </div>
              <p className="text-blue-200 text-sm">Welcome back, {profile.username}!</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate(createPageUrl('Profile'))}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Premium CTA */}
          {!profile.is_premium && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(createPageUrl('Premium'))}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-4 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-white" />
                  <div>
                    <p className="font-bold text-white">Upgrade to Premium</p>
                    <p className="text-xs text-white/90">Unlock exclusive features & 2x growth</p>
                  </div>
                </div>
                <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100">
                  Upgrade
                </Button>
              </div>
            </motion.div>
          )}

          {/* Streak counter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Flame className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-medium">{profile.daily_streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">{profile.completed_quests} Quests Done</span>
            </div>
          </div>

          {/* Warning */}
          {showDebuff && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-300/30 rounded-xl p-3 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">⚠️ Lone Wolf Alert</p>
                <p className="text-xs text-red-100">Balance your stats or lose 10% of your score!</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-6">
        {/* Hero Video Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <VideoPlayer 
            videoId="1TQy5go7RRL5LwOt5jxqn1dwRN9HRYek0"
            className="aspect-video shadow-2xl rounded-3xl"
          />
        </motion.div>

        {/* Score Wheel Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Status Score</h2>
            <p className="text-sm text-gray-500">Weighted across 5 life metrics</p>
          </div>
          <ScoreWheel
            wealth={profile.wealth_score}
            power={profile.power_score}
            fame={profile.fame_score}
            charm={profile.charm_score}
            gear={profile.gear_score}
          />
        </motion.div>

        {/* Demo Video: Metrics Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <VideoPlayer 
            videoId="1lNiKtYqNVZ8V6wKQIiv-b9GYshCLmTuP"
            className="aspect-video shadow-lg rounded-2xl"
          />
        </motion.div>

        {/* Stats Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Your Metrics</h3>
            <Badge variant="outline" className="text-xs">
              Swipe to explore →
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate(createPageUrl('Quests'))}
            className="gradient-primary text-white py-8 rounded-2xl hover:shadow-lg transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <Target className="w-8 h-8" />
              <span className="font-semibold">Daily Quests</span>
              <span className="text-xs opacity-80">Complete missions</span>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate(createPageUrl('Duels'))}
            className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-8 rounded-2xl hover:shadow-lg transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <Swords className="w-8 h-8" />
              <span className="font-semibold">Duels</span>
              <span className="text-xs opacity-80">Challenge friends</span>
            </div>
          </Button>
        </div>

        {/* Push notification mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-2xl p-4"
        >
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💬 Pro Tip:</span> Your fame drops faster than Berlin rain – post a selfie to boost your charm!
          </p>
        </motion.div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-around">
          <button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Quests'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <Target className="w-6 h-6" />
            <span className="text-xs font-medium">Quests</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Duels'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <Swords className="w-6 h-6" />
            <span className="text-xs font-medium">Duels</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Profile'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
