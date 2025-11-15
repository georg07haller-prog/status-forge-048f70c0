import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Swords, TrendingUp, Crown, Zap, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: '5 Life Metrics',
      desc: 'Track Wealth, Power, Fame, Charm, and Gear with a gamified system.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Target,
      title: 'Daily Quests',
      desc: 'Transform everyday tasks into epic missions with rewards.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Swords,
      title: 'Competitive Duels',
      desc: 'Challenge friends and steal status points in 1v1 battles.',
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      icon: Crown,
      title: 'Level Progression',
      desc: 'Rise from Startup Serf to Elite Overlord as you build your empire.',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    }
  ];

  const questExamples = [
    { title: 'Track €50 coffee debuff', category: 'Wealth', points: '+15 pts', icon: '💰' },
    { title: 'Win a Zoom meeting', category: 'Power', points: '+20 pts', icon: '⚡' },
    { title: 'Post a selfie & get 10+ likes', category: 'Fame', points: '+25 pts', icon: '⭐' },
    { title: 'Compliment 3 people today', category: 'Charm', points: '+10 pts', icon: '💖' },
    { title: 'Upgrade your workspace', category: 'Gear', points: '+30 pts', icon: '⚙️' }
  ];

  const premiumBenefits = [
    '2x Point Multiplier on all quests',
    'Exclusive premium-only missions',
    'Advanced analytics & insights',
    'Priority support & beta features',
    'Custom avatar badges'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="gradient-primary text-white pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">⚔️</div>
          <div className="absolute top-32 right-20 text-5xl">👑</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">🎯</div>
          <div className="absolute bottom-32 right-1/4 text-6xl">⚡</div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              🚀 Transform Your Life Into An Epic Game
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build Your Empire.<br />Track Your Status.
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              StatusForge gamifies your life with daily quests, competitive duels, and 5 key metrics. 
              Rise from Startup Serf to Elite Overlord. 🏆
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => navigate(createPageUrl('Onboarding'))}
              >
                Start Your Journey →
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate(createPageUrl('FAQ'))}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 pb-24">
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quest Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Quest Examples</h2>
            <p className="text-lg text-gray-600">Turn daily life into an adventure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questExamples.map((quest, idx) => (
              <motion.div
                key={quest.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{quest.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{quest.title}</h4>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{quest.category}</Badge>
                          <span className="text-sm font-bold text-green-600">{quest.points}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center text-white">
              <Crown className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">Unlock Premium Power</h2>
              <p className="text-xl mb-8 text-orange-100">2x faster progress + exclusive features</p>
              
              <div className="max-w-md mx-auto mb-8">
                {premiumBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 mb-3 text-left">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="text-3xl font-bold mb-2">€9.99/month</div>
              <p className="text-sm text-orange-100 mb-6">Cancel anytime • GDPR compliant</p>
              
              <Button 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => navigate(createPageUrl('Premium'))}
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold text-gray-900">500+</div>
              <p className="text-gray-600">Active Heroes</p>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <div className="text-4xl font-bold text-gray-900">10K+</div>
              <p className="text-gray-600">Quests Completed</p>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <div className="text-4xl font-bold text-gray-900">2K+</div>
              <p className="text-gray-600">Duels Fought</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Card className="gradient-primary text-white rounded-3xl shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Build Your Empire?</h2>
              <p className="text-xl text-blue-100 mb-8">Join hundreds of heroes tracking their status</p>
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
                onClick={() => navigate(createPageUrl('Onboarding'))}
              >
                Start Free Now →
              </Button>
              <p className="text-sm text-blue-200 mt-4">No credit card required • GDPR compliant</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="text-white font-bold text-xl">StatusForge</div>
          <div className="flex gap-6">
            <button onClick={() => navigate(createPageUrl('Privacy'))} className="hover:text-white">Privacy</button>
            <button onClick={() => navigate(createPageUrl('Terms'))} className="hover:text-white">Terms</button>
            <button onClick={() => navigate(createPageUrl('FAQ'))} className="hover:text-white">FAQ</button>
            <button onClick={() => navigate(createPageUrl('Guide'))} className="hover:text-white">Guide</button>
          </div>
        </div>
      </div>
    </div>
  );
}