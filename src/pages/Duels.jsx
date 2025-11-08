
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Swords, Trophy, Target, User, Crown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer'; // Added import

const mockFriends = [
  { id: 1, name: 'Sarah Chen', avatar: '👩‍💼', score: 245, level: 3 },
  { id: 2, name: 'Max Weber', avatar: '👨‍💻', score: 189, level: 2 },
  { id: 3, name: 'Luna Rodriguez', avatar: '👩‍🎨', score: 312, level: 4 },
  { id: 4, name: 'Alex Kim', avatar: '👨‍🚀', score: 156, level: 2 },
];

const duelCategories = [
  { id: 'wealth', name: 'Wealth Duel', icon: '💰', color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'power', name: 'Power Challenge', icon: '⚡', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'fame', name: 'Fame Battle', icon: '⭐', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'charm', name: 'Charm Contest', icon: '💖', color: 'text-pink-600', bg: 'bg-pink-50' },
  { id: 'gear', name: 'Gear Showdown', icon: '⚙️', color: 'text-blue-600', bg: 'bg-blue-50' },
];

export default function Duels() {
  const navigate = useNavigate();
  const [step, setStep] = useState('select-friend');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  const { data: profiles = [] } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list('-created_date'),
  });

  const profile = profiles[0];

  const handleChallenge = () => {
    setStep('result');
    // Simulate random win/loss
    const won = Math.random() > 0.5;
    setIsWinner(won);
    
    setTimeout(() => setShowResult(true), 500);
  };

  const handleNewDuel = () => {
    setStep('select-friend');
    setSelectedFriend(null);
    setSelectedCategory(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white pt-12 pb-8 px-6">
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
              <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
                <Swords className="w-8 h-8" />
                Duels
              </h1>
              <p className="text-purple-200 text-sm">Challenge friends and steal their status!</p>
            </div>
          </div>

          {profile && (
            <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-200 mb-1">Your Record</p>
                <p className="font-bold text-lg">{profile.wins || 0} Victories</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-300" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        {/* Duel Demo Video - only show on select-friend step */}
        {step === 'select-friend' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <VideoPlayer 
              videoId="1cvom3XGxmubczsWqtlCJbXfshaEfNiXN"
              className="aspect-video shadow-xl rounded-2xl"
            />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Select Friend */}
          {step === 'select-friend' && (
            <motion.div
              key="select-friend"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-white rounded-2xl shadow-xl mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Choose Your Opponent
                  </h2>
                  <div className="space-y-3">
                    {mockFriends.map((friend) => (
                      <motion.button
                        key={friend.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedFriend(friend);
                          setStep('select-category');
                        }}
                        className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 transition-all text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{friend.avatar}</div>
                            <div>
                              <p className="font-semibold text-gray-900">{friend.name}</p>
                              <p className="text-sm text-gray-500">Level {friend.level} • Score: {friend.score}</p>
                            </div>
                          </div>
                          <Swords className="w-5 h-5 text-gray-400" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Select Category */}
          {step === 'select-category' && selectedFriend && (
            <motion.div
              key="select-category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-white rounded-2xl shadow-xl mb-6">
                <CardContent className="p-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('select-friend')}
                    className="mb-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="text-3xl">{selectedFriend.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900">Challenging {selectedFriend.name}</p>
                      <p className="text-sm text-gray-500">Choose your battlefield</p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-4">Select Duel Category</h2>
                  <div className="space-y-3">
                    {duelCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCategory(category);
                          setStep('preview');
                        }}
                        className={`w-full p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 transition-all ${category.bg}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{category.icon}</div>
                            <div className="text-left">
                              <p className={`font-semibold ${category.color}`}>{category.name}</p>
                              <p className="text-xs text-gray-600">
                                {category.id === 'charm' ? "Who gets more compliments?" : "Compete in this category"}
                              </p>
                            </div>
                          </div>
                          <Target className="w-5 h-5 text-gray-400" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Preview & Challenge */}
          {step === 'preview' && selectedFriend && selectedCategory && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-white rounded-2xl shadow-xl mb-6">
                <CardContent className="p-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('select-category')}
                    className="mb-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <div className="text-center mb-6">
                    <div className="text-5xl mb-3">{selectedCategory.icon}</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory.name}</h2>
                    <p className="text-gray-600">Challenge Preview</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">You</p>
                        <div className="text-3xl mb-2">👤</div>
                        <p className="font-bold text-gray-900">{profile?.username || 'Hero'}</p>
                      </div>
                      
                      <div className="text-4xl">⚔️</div>
                      
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Opponent</p>
                        <div className="text-3xl mb-2">{selectedFriend.avatar}</div>
                        <p className="font-bold text-gray-900">{selectedFriend.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900 mb-1">The Stakes</p>
                        <p className="text-sm text-amber-800">
                          Winner steals <strong>10% of the opponent's {selectedCategory.id} score</strong>! 
                          Are you ready for this challenge?
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleChallenge}
                    className="w-full gradient-gold text-white font-bold py-6 text-lg hover:glow-gold"
                  >
                    <Swords className="w-5 h-5 mr-2" />
                    Send Challenge!
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Result */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {/* Victory/Loss Video */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <VideoPlayer 
                    videoId={isWinner ? "1spCtdouEuyGEyEK1onz2cthZ3bN1fAwp" : "1FS92f9yOwAFPKH3USMV0tALyDS9n9o9-"}
                    className="aspect-video shadow-2xl rounded-2xl"
                  />
                </motion.div>
              )}

              <Card className={`rounded-2xl shadow-2xl overflow-hidden ${isWinner ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
                <CardContent className="p-8">
                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <motion.div
                          animate={isWinner ? { 
                            rotate: [0, 10, -10, 10, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className="text-8xl mb-4"
                        >
                          {isWinner ? '🏆' : '💪'}
                        </motion.div>

                        <h2 className={`text-3xl font-bold mb-2 ${isWinner ? 'text-yellow-700' : 'text-gray-700'}`}>
                          {isWinner ? 'Victory!' : 'Close Call!'}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                          {isWinner 
                            ? `You dominated the ${selectedCategory?.name}!` 
                            : `${selectedFriend?.name} won this time...`}
                        </p>

                        <div className={`rounded-xl p-6 mb-6 ${isWinner ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-100 border border-gray-300'}`}>
                          <p className="font-semibold text-gray-900 mb-2">
                            {isWinner ? '🎉 Rewards Earned:' : '😤 Try Again:'}
                          </p>
                          <p className="text-sm text-gray-700">
                            {isWinner 
                              ? `+${Math.floor(selectedFriend?.score * 0.1)} points stolen from ${selectedFriend?.name}!`
                              : 'Every loss is a lesson. Train harder and come back stronger!'}
                          </p>
                        </div>

                        {isWinner && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-6"
                          >
                            <Badge className="gradient-gold text-white px-4 py-2">
                              <Crown className="w-4 h-4 mr-2" />
                              New Achievement Unlocked!
                            </Badge>
                          </motion.div>
                        )}

                        <div className="flex gap-3">
                          <Button
                            onClick={handleNewDuel}
                            variant="outline"
                            className="flex-1"
                          >
                            New Duel
                          </Button>
                          <Button
                            onClick={() => navigate(createPageUrl('Dashboard'))}
                            className="flex-1 gradient-primary text-white"
                          >
                            Back to Dashboard
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
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
            className="flex flex-col items-center gap-1 text-purple-600"
          >
            <Swords className="w-6 h-6" />
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
