import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Target, Flame, Share2, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

import AvatarDisplay from '../components/avatar/AvatarDisplay';

const achievements = [
  { id: 1, name: 'First Quest', icon: '🎯', earned: true },
  { id: 2, name: 'Social Butterfly', icon: '🦋', earned: true },
  { id: 3, name: 'Boss Mode', icon: '💼', earned: false },
  { id: 4, name: 'Photogenic', icon: '📸', earned: true },
  { id: 5, name: 'Money Manager', icon: '💰', earned: false },
  { id: 6, name: 'Tech Wizard', icon: '⚙️', earned: false },
  { id: 7, name: 'Duel Master', icon: '⚔️', earned: false },
  { id: 8, name: 'Empire Builder', icon: '🏰', earned: false },
];

export default function Profile() {
  const navigate = useNavigate();

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list('-created_date'),
  });

  const profile = profiles[0];

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalScore = (
    (profile.wealth_score * 0.3) + 
    (profile.power_score * 0.2) + 
    (profile.fame_score * 0.25) + 
    (profile.charm_score * 0.15) + 
    (profile.gear_score * 0.1)
  ).toFixed(0);

  const avatarLevel = Math.min(5, Math.floor(parseInt(totalScore) / 100) + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="gradient-primary text-white pt-12 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate(createPageUrl('Dashboard'))}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Profile</h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-12">
        {/* Avatar Card */}
        <Card className="bg-white rounded-3xl shadow-2xl mb-6 overflow-hidden">
          <CardContent className="p-8">
            <AvatarDisplay 
              level={avatarLevel} 
              score={parseInt(totalScore)} 
              showProgress={true} 
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900">{profile.wins || 0}</span>
                </div>
                <p className="text-xs text-gray-500">Victories</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-2xl font-bold text-gray-900">{profile.completed_quests}</span>
                </div>
                <p className="text-xs text-gray-500">Quests</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-2xl font-bold text-gray-900">{profile.daily_streak}</span>
                </div>
                <p className="text-xs text-gray-500">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="bg-white rounded-2xl shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Status Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Wealth', score: profile.wealth_score, color: 'bg-green-500' },
                { label: 'Power', score: profile.power_score, color: 'bg-purple-500' },
                { label: 'Fame', score: profile.fame_score, color: 'bg-orange-500' },
                { label: 'Charm', score: profile.charm_score, color: 'bg-pink-500' },
                { label: 'Gear', score: profile.gear_score, color: 'bg-blue-500' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    <span className="text-sm font-bold text-gray-900">{stat.score}/100</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.score}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${stat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Gallery */}
        <Card className="bg-white rounded-2xl shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Achievements
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  whileHover={{ scale: 1.1 }}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center p-3 ${
                    achievement.earned 
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300' 
                      : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-1">{achievement.icon}</div>
                  <p className="text-xs font-medium text-gray-700 text-center">{achievement.name}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                {achievements.filter(a => a.earned).length} of {achievements.length} unlocked
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Share Card */}
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Empire Eclipse</h3>
                <p className="text-sm text-purple-100">Share your victory with the world!</p>
              </div>
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-xs text-blue-800 text-center">
            🔒 <strong>GDPR-Compliant:</strong> Your data is encrypted and never shared without consent. 
            Manage your privacy settings in the app menu.
          </p>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600"
          >
            📊
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
            ⚔️
            <span className="text-xs font-medium">Duels</span>
          </button>
          <button
            onClick={() => navigate(createPageUrl('Profile'))}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            👤
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}