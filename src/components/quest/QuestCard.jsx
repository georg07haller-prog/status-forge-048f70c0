import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Trophy, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryColors = {
  wealth: 'bg-green-100 text-green-700 border-green-300',
  power: 'bg-purple-100 text-purple-700 border-purple-300',
  fame: 'bg-orange-100 text-orange-700 border-orange-300',
  charm: 'bg-pink-100 text-pink-700 border-pink-300',
  gear: 'bg-blue-100 text-blue-700 border-blue-300'
};

export default function QuestCard({ quest, onComplete }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(quest.completed);

  const handleComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    onComplete(quest);
    
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <Card className={`relative overflow-hidden ${completed ? 'opacity-60' : ''}`}>
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: '50%', 
                  left: '50%',
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0,
                  scale: 0
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: ['#D4AF37', '#10B981', '#F59E0B', '#EC4899'][Math.floor(Math.random() * 4)] }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">{quest.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
            
            <div className="flex items-center gap-2">
              <Badge className={`${categoryColors[quest.category]} border`}>
                {quest.category}
              </Badge>
              <div className="flex items-center gap-1 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-gray-700">+{quest.reward_points}</span>
              </div>
              {quest.badge_name && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Sparkles className="w-3 h-3" />
                  {quest.badge_name}
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={completed}
          className={`w-full ${completed ? 'bg-gray-300' : 'gradient-gold hover:glow-gold'} transition-all`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Completed!
            </>
          ) : (
            'Complete Quest'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}