import React from 'react';
import { Crown, User, TrendingUp, Star, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const avatarData = {
  1: { 
    title: 'Startup Serf', 
    icon: User, 
    color: 'text-gray-500',
    bg: 'bg-gray-100',
    desc: 'Every empire starts somewhere...'
  },
  2: { 
    title: 'Rising Merchant', 
    icon: TrendingUp, 
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    desc: 'Making moves in the marketplace'
  },
  3: { 
    title: 'Noble Influencer', 
    icon: Star, 
    color: 'text-purple-500',
    bg: 'bg-purple-100',
    desc: 'Commanding respect and attention'
  },
  4: { 
    title: 'Royal Magnate', 
    icon: Sparkles, 
    color: 'text-orange-500',
    bg: 'bg-orange-100',
    desc: 'Wealth and power consolidated'
  },
  5: { 
    title: 'Elite Overlord', 
    icon: Crown, 
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    desc: 'Absolute domination achieved'
  }
};

export default function AvatarDisplay({ level = 1, score = 0, showProgress = true }) {
  const currentLevel = Math.min(Math.max(1, Math.floor(level)), 5);
  const nextLevel = Math.min(currentLevel + 1, 5);
  const progressToNext = ((score % 500) / 500) * 100;
  
  const current = avatarData[currentLevel];
  const next = avatarData[nextLevel];
  const Icon = current.icon;

  return (
    <div className="space-y-4">
      {/* Avatar Icon */}
      <div className="relative mx-auto w-32 h-32">
        <div className={`w-full h-full rounded-full ${current.bg} flex items-center justify-center border-4 border-white shadow-xl`}>
          <Icon className={`w-16 h-16 ${current.color}`} />
        </div>
        {currentLevel === 5 && (
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Crown className="w-10 h-10 text-yellow-500" />
          </div>
        )}
      </div>

      {/* Level Info */}
      <div className="text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          Level {currentLevel}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {current.title}
        </h2>
        <p className="text-sm text-gray-600 italic">
          {current.desc}
        </p>
      </div>

      {/* Progress to next level */}
      {showProgress && currentLevel < 5 && (
        <div className="space-y-2 px-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Next: {next.title}</span>
            <span className="font-medium text-gray-700">{Math.floor(progressToNext)}%</span>
          </div>
          <Progress value={progressToNext} className="h-2" />
          <p className="text-xs text-center text-gray-500">
            {500 - (score % 500)} points to level up
          </p>
        </div>
      )}

      {currentLevel === 5 && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-gold text-white text-sm font-medium">
            <Crown className="w-4 h-4" />
            Maximum Level Achieved!
          </div>
        </div>
      )}
    </div>
  );
}