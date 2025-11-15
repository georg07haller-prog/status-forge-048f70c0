import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Crown, Sparkles, Instagram, Calendar, Wallet, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import VideoPlayer from '../components/VideoPlayer';

const avatarLevels = [
  { level: 1, title: 'Peasant', desc: 'Ragged clothes, big dreams', emoji: '👤' },
  { level: 2, title: 'Merchant', desc: 'Trading up in the world', emoji: '💼' },
  { level: 3, title: 'Noble', desc: 'Refined and influential', emoji: '⭐' },
  { level: 4, title: 'Magnate', desc: 'Wealth accumulating', emoji: '💎' },
  { level: 5, title: 'Overlord', desc: 'Crowned in glory', emoji: '👑' }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [avatarLevel, setAvatarLevel] = useState([1]);
  const [syncing, setSyncing] = useState(false);

  const currentAvatar = avatarLevels[avatarLevel[0] - 1];

  const handleStartQuest = async () => {
    setSyncing(true);
    
    try {
      // Create user profile
      await base44.entities.UserProfile.create({
        username: username || 'Hero',
        avatar_level: 1,
        total_score: 0,
        wealth_score: 15,
        power_score: 10,
        fame_score: 5,
        charm_score: 12,
        gear_score: 8,
        daily_streak: 0,
        completed_quests: 0,
        wins: 0,
        avatar_title: 'Startup Serf'
      });

      // Create some demo quests
      await base44.entities.Quest.bulkCreate([
        {
          title: 'Network 5 calls',
          description: 'Connect with 5 people today and expand your empire',
          category: 'fame',
          reward_points: 25,
          badge_name: 'Social Butterfly',
          completed: false,
          due_date: new Date().toISOString().split('T')[0]
        },
        {
          title: 'Close a deal',
          description: 'Seal the deal and boost your power status',
          category: 'power',
          reward_points: 30,
          badge_name: 'Boss Mode',
          completed: false,
          due_date: new Date().toISOString().split('T')[0]
        },
        {
          title: 'Post a victory selfie',
          description: 'Show the world your winning smile',
          category: 'charm',
          reward_points: 20,
          badge_name: 'Photogenic',
          completed: false,
          due_date: new Date().toISOString().split('T')[0]
        },
        {
          title: 'Track your expenses',
          description: 'Document your wealth flow for the day',
          category: 'wealth',
          reward_points: 15,
          badge_name: 'Money Manager',
          completed: false,
          due_date: new Date().toISOString().split('T')[0]
        },
        {
          title: 'Upgrade your setup',
          description: 'Snap a photo of your battle station',
          category: 'gear',
          reward_points: 10,
          badge_name: 'Tech Wizard',
          completed: false,
          due_date: new Date().toISOString().split('T')[0]
        }
      ]);

      setTimeout(() => {
        // Send welcome email
    await base44.functions.invoke('sendWelcomeEmail', {
      userId: newProfile.id,
      username: username,
      isPremium: false
    }).catch(err => console.log('Email send failed:', err));

    navigate(createPageUrl('Dashboard'));
      }, 1000);
    } catch (error) {
      console.error('Error creating profile:', error);
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ⚔️
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Forge Your Empire
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                From Peasant to Overlord!
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-900">Track Your Status</div>
                    <div className="text-sm text-gray-600">Wealth, Power, Fame, Charm & Gear</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <Crown className="w-6 h-6 text-purple-500" />
                  <div className="text-left flex-1">
                    <div className="font-medium text-gray-900">Complete Quests</div>
                    <div className="text-sm text-gray-600">Turn daily routines into epic wins</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full gradient-gold text-white font-semibold py-6 text-lg hover:glow-gold"
              >
                Begin Your Journey
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Choose Your Hero
              </h2>
              <p className="text-gray-600 mb-6 text-center text-sm">
                Select your starting avatar (don't worry, you'll level up!)
              </p>

              <div className="mb-8">
                <Input
                  placeholder="Enter your hero name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-center text-lg py-6"
                />
              </div>

              {/* Avatar selector */}
              <div className="mb-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-3">{currentAvatar.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900">{currentAvatar.title}</h3>
                  <p className="text-sm text-gray-600">{currentAvatar.desc}</p>
                </div>

                <Slider
                  value={avatarLevel}
                  onValueChange={setAvatarLevel}
                  min={1}
                  max={5}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Peasant</span>
                  <span>Overlord</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-xs text-gray-500 text-center mb-3">
                  Connect your accounts (demo mode):
                </p>
                <Button variant="outline" className="w-full" disabled>
                  <Instagram className="w-4 h-4 mr-2" />
                  Connect Instagram
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  <Calendar className="w-4 h-4 mr-2" />
                  Sync Calendar
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  <Wallet className="w-4 h-4 mr-2" />
                  Link Wallet
                </Button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
                <p className="text-xs text-amber-800 text-center">
                  💡 <strong>Pro tip:</strong> Sync your rusty Lada? +3 Gear Level – no shame!
                </p>
              </div>

              <Button
                onClick={() => setStep(3)}
                className="w-full gradient-gold text-white font-semibold py-6 text-lg hover:glow-gold"
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 text-center"
            >
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Your Quest?
              </h2>
              <p className="text-gray-600 mb-6">
                Your journey from Startup Serf to Elite Overlord begins now. 
                Track your status, complete quests, and dominate the leaderboard!
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Mission:</strong> Save the world from status inequality – one quest at a time!
                </p>
              </div>

              <Button
                onClick={handleStartQuest}
                disabled={syncing}
                className="w-full gradient-gold text-white font-semibold py-6 text-lg hover:glow-gold"
              >
                {syncing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Forging Your Empire...
                  </>
                ) : (
                  <>
                    Start Quest
                    <Sparkles className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}