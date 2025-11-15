import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Gift, Copy, Share2, Trophy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Referrals() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { data: profiles = [] } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list('-created_date'),
  });

  const profile = profiles[0];
  const referralLink = profile?.referral_code 
    ? `${window.location.origin}${createPageUrl('Onboarding')}?ref=${profile.referral_code}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `🎯 Join me on StatusForge! Track your Wealth, Power, Fame, Charm & Gear. Use my code ${profile.referral_code} and we both get +5 bonus quests! 🚀`;
    if (navigator.share) {
      navigator.share({ title: 'StatusForge Referral', text, url: referralLink });
    } else {
      navigator.clipboard.writeText(text + '\n' + referralLink);
      alert('Link copied to clipboard!');
    }
  };

  const milestones = [
    { count: 1, reward: '🎁 +5 Bonus Quests', achieved: (profile?.referral_count || 0) >= 1 },
    { count: 5, reward: '⚡ +50 Power Points', achieved: (profile?.referral_count || 0) >= 5 },
    { count: 10, reward: '👑 Referral Master Badge', achieved: (profile?.referral_count || 0) >= 10 },
    { count: 25, reward: '🏆 1 Month Premium Free', achieved: (profile?.referral_count || 0) >= 25 },
    { count: 50, reward: '💎 Elite Referrer Title', achieved: (profile?.referral_count || 0) >= 50 },
  ];

  if (!profile) {
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
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Users className="w-8 h-8" />
                Referral Program
              </h1>
              <p className="text-blue-200 text-sm">Invite friends, earn rewards together!</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-xs text-blue-200 mb-1">Friends Invited</p>
              <p className="text-2xl font-bold">{profile.referral_count || 0}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-xs text-blue-200 mb-1">Bonus Quests Earned</p>
              <p className="text-2xl font-bold">{(profile.referral_count || 0) * 5}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        {/* Referral Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-white rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">Your Referral Code</h3>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                <p className="text-center text-3xl font-mono font-bold text-purple-600 tracking-wider mb-2">
                  {profile.referral_code}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Share this code with friends to earn rewards!
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    value={referralLink}
                    readOnly
                    className="pr-24 font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopy}
                    className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  onClick={handleShare}
                  className="w-full gradient-primary text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Referral Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">🎁 How It Works</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Share your code</p>
                    <p className="text-sm text-gray-600">Send your referral link to friends</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">They sign up</p>
                    <p className="text-sm text-gray-600">Your friend creates an account with your code</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">You both win!</p>
                    <p className="text-sm text-gray-600">Both get +5 bonus quests instantly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-white rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-gray-900">Referral Milestones</h3>
              </div>

              <div className="space-y-3">
                {milestones.map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 ${
                      milestone.achieved
                        ? 'bg-green-50 border-green-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        milestone.achieved
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {milestone.count}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{milestone.reward}</p>
                        <p className="text-xs text-gray-500">{milestone.count} referrals</p>
                      </div>
                    </div>
                    {milestone.achieved && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-500 to-pink-500 text-white rounded-2xl shadow-xl">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Top Referrer Competition</h3>
              <p className="text-orange-100 mb-4">
                The top 3 referrers each month win exclusive rewards and Premium upgrades!
              </p>
              <Badge className="bg-white text-orange-600">
                Your Rank: Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}