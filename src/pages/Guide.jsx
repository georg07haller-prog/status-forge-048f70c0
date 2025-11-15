import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Target, Swords, Crown, TrendingUp, Zap, Star, DollarSign, Heart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Guide() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Getting Started',
      icon: Star,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      items: [
        {
          title: 'Create Your Profile',
          desc: 'Choose your hero name and start your journey from Startup Serf to Elite Overlord.'
        },
        {
          title: 'Track Your Status',
          desc: 'Monitor 5 key metrics: Wealth, Power, Fame, Charm, and Gear. Each contributes to your overall status score.'
        },
        {
          title: 'Complete Daily Quests',
          desc: 'Turn everyday tasks into epic missions. Each quest rewards points in specific categories.'
        }
      ]
    },
    {
      title: 'The 5 Status Metrics',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      items: [
        {
          title: '💰 Wealth (30% weight)',
          desc: 'Track your finances, savings, and investments. Coffee debuffs count!'
        },
        {
          title: '⚡ Power (20% weight)',
          desc: 'Professional achievements, leadership moments, closed deals.'
        },
        {
          title: '⭐ Fame (25% weight)',
          desc: 'Social media engagement, networking, public recognition.'
        },
        {
          title: '💖 Charm (15% weight)',
          desc: 'Social interactions, compliments received, relationship building.'
        },
        {
          title: '⚙️ Gear (10% weight)',
          desc: 'Your setup, tools, workspace quality. Even a rusty Lada counts!'
        }
      ]
    },
    {
      title: 'Quests System',
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-50',
      items: [
        {
          title: 'Daily Missions',
          desc: 'Complete quests to earn points in specific categories. Each quest has a deadline and reward.'
        },
        {
          title: 'Category-Based Rewards',
          desc: 'Quests are tagged with categories (Wealth, Power, etc.) and boost those specific metrics.'
        },
        {
          title: 'Streak Building',
          desc: 'Maintain daily activity to build your streak. Longer streaks mean bigger multipliers!'
        }
      ]
    },
    {
      title: 'Duels & Competition',
      icon: Swords,
      color: 'text-red-600',
      bg: 'bg-red-50',
      items: [
        {
          title: 'Challenge Friends',
          desc: 'Select an opponent and choose a category to compete in (Wealth, Power, Fame, etc.).'
        },
        {
          title: 'Win & Steal Points',
          desc: 'Winners steal 10% of the opponent\'s score in the selected category. High stakes!'
        },
        {
          title: 'Build Your Record',
          desc: 'Track your victories and climb the rankings. Each win adds to your legend.'
        }
      ]
    },
    {
      title: 'Level Progression',
      icon: Zap,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      items: [
        {
          title: 'Level 1: Startup Serf',
          desc: '0-499 points. Every empire starts somewhere.'
        },
        {
          title: 'Level 2: Rising Merchant',
          desc: '500-999 points. Making moves in the marketplace.'
        },
        {
          title: 'Level 3: Noble Influencer',
          desc: '1000-1499 points. Commanding respect and attention.'
        },
        {
          title: 'Level 4: Royal Magnate',
          desc: '1500-1999 points. Wealth and power consolidated.'
        },
        {
          title: 'Level 5: Elite Overlord',
          desc: '2000+ points. Absolute domination achieved.'
        }
      ]
    },
    {
      title: 'Premium Features',
      icon: Crown,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      items: [
        {
          title: '2x Point Multiplier',
          desc: 'All quest rewards and duel winnings are doubled for premium members.'
        },
        {
          title: 'Advanced Analytics',
          desc: 'Detailed breakdowns of your progress, trends, and optimization suggestions.'
        },
        {
          title: 'Exclusive Quests',
          desc: 'Access premium-only missions with higher rewards and unique challenges.'
        },
        {
          title: 'Priority Support',
          desc: 'Get help faster and access beta features before anyone else.'
        },
        {
          title: 'Custom Avatar Badges',
          desc: 'Unlock exclusive visual upgrades and show off your premium status.'
        }
      ]
    },
    {
      title: 'Pro Tips',
      icon: Heart,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      items: [
        {
          title: 'Balance Your Stats',
          desc: 'Don\'t ignore any category! If one stat drops below 20, you\'ll lose 10% of your total score.'
        },
        {
          title: 'Daily Streaks Matter',
          desc: 'Log in every day and complete at least one quest to maintain your streak multiplier.'
        },
        {
          title: 'Strategic Dueling',
          desc: 'Challenge opponents in categories where you have a strong advantage to maximize wins.'
        },
        {
          title: 'Share Your Progress',
          desc: 'Post your achievements on social media to boost your Fame score and inspire others.'
        }
      ]
    }
  ];

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
            <div>
              <h1 className="text-3xl font-bold">StatusForge Guide</h1>
              <p className="text-blue-200 text-sm">Master the art of status building</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-3">Welcome to StatusForge!</h2>
              <p className="text-blue-100 leading-relaxed">
                StatusForge is your gamified life tracker that transforms daily achievements into an epic journey. 
                Build your empire from Startup Serf to Elite Overlord by mastering 5 key life metrics, 
                completing quests, and competing with friends. Let's forge your status! ⚔️
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guide Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className={`${section.bg} p-4 border-b border-gray-200`}>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${section.color}`} />
                      <h3 className={`text-xl font-bold ${section.color}`}>{section.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mb-6"
        >
          <Card className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl shadow-xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to Build Your Empire?</h3>
              <p className="text-orange-100 mb-4">Start completing quests and watch your status soar!</p>
              <Button
                onClick={() => navigate(createPageUrl('Dashboard'))}
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}