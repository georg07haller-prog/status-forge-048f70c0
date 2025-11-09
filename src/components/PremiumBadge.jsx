import React from 'react';
import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function PremiumBadge({ isPremium }) {
  if (!isPremium) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Badge className="gradient-gold text-white">
        <Crown className="w-3 h-3 mr-1" />
        Premium
      </Badge>
    </motion.div>
  );
}