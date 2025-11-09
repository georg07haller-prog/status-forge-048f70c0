import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, Check, Zap, Star, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const premiumFeatures = [
  { icon: Crown, text: 'Exclusive Elite Overlord avatar', color: 'text-yellow-500' },
  { icon: Zap, text: 'Unlimited daily quests', color: 'text-purple-500' },
  { icon: Star, text: 'Priority in duels leaderboard', color: 'text-orange-500' },
  { icon: Shield, text: 'Custom profile badge', color: 'text-blue-500' },
  { icon: TrendingUp, text: 'Advanced analytics dashboard', color: 'text-green-500' },
  { icon: Crown, text: '2x faster status growth', color: 'text-pink-500' },
];

export default function Premium() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { data: profiles = [] } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list('-created_date'),
  });

  const profile = profiles[0];
  const isPremium = profile?.is_premium || false;

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // В production здесь будет интеграция с Stripe Checkout
      // Для демо просто активируем Premium
      if (profile) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        
        await base44.entities.UserProfile.update(profile.id, {
          is_premium: true,
          premium_expires_at: expiresAt.toISOString()
        });

        // Показываем успех
        setTimeout(() => {
          navigate(createPageUrl('Dashboard'));
        }, 1500);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 mb-6"
            onClick={() => navigate(createPageUrl('Dashboard'))}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              👑
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Upgrade to Premium
            </h1>
            <p className="text-xl text-purple-200">
              Become an Elite Overlord
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {isPremium ? (
          // Already Premium
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  You're Already Premium!
                </h2>
                <p className="text-gray-600 mb-6">
                  Enjoy all the exclusive benefits of Elite Overlord status
                </p>
                <Badge className="gradient-gold text-white px-4 py-2 mb-6">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Active
                </Badge>
                <Button
                  onClick={() => navigate(createPageUrl('Dashboard'))}
                  className="w-full gradient-primary text-white"
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          // Subscribe to Premium
          <>
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="bg-white border-4 border-purple-500 shadow-2xl overflow-hidden">
                <div className="gradient-gold p-6 text-center">
                  <Crown className="w-12 h-12 text-white mx-auto mb-3" />
                  <h3 className="text-2xl font-bold text-white mb-2">Premium Plan</h3>
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-5xl font-bold text-white">€9.99</span>
                    <span className="text-white text-lg mb-2">/month</span>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="space-y-4 mb-8">
                    {premiumFeatures.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`p-2 rounded-lg bg-gray-100 ${feature.color}`}>
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700 font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="w-full gradient-gold text-white font-bold py-6 text-lg hover:glow-gold"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Subscribe Now
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Cancel anytime • 30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-bold mb-4 text-center">Free vs Premium</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🆓</div>
                      <p className="text-white text-sm font-medium mb-2">Free</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>5 quests/day</li>
                        <li>Basic avatar</li>
                        <li>Standard growth</li>
                      </ul>
                    </div>
                    <div className="text-center border-l border-white/20">
                      <div className="text-2xl mb-2">👑</div>
                      <p className="text-yellow-400 text-sm font-medium mb-2">Premium</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>Unlimited quests</li>
                        <li>Exclusive avatars</li>
                        <li>2x faster growth</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* GDPR Notice */}
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
              <p className="text-xs text-blue-100 text-center">
                🔒 <strong>Secure Payment:</strong> Powered by Stripe. Your payment data is encrypted and never stored on our servers. GDPR compliant.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}