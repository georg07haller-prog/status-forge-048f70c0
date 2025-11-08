import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Zap, Users, Heart, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const icons = {
  wealth: DollarSign,
  power: Zap,
  fame: Users,
  charm: Heart,
  gear: Package
};

const colors = {
  wealth: 'text-green-500',
  power: 'text-purple-500',
  fame: 'text-orange-500',
  charm: 'text-pink-500',
  gear: 'text-blue-500'
};

const bgColors = {
  wealth: 'bg-green-50',
  power: 'bg-purple-50',
  fame: 'bg-orange-50',
  charm: 'bg-pink-50',
  gear: 'bg-blue-50'
};

export default function StatCard({ category, score, change, detail, onClick }) {
  const Icon = icons[category];
  const isPositive = change >= 0;
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-200"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-xl ${bgColors[category]}`}>
            <Icon className={`w-6 h-6 ${colors[category]}`} />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{score}</div>
            <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? '+' : ''}{change}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
            <span className="text-xs text-gray-500">{score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
          <p className="text-xs text-gray-500 mt-2">{detail}</p>
        </div>
      </CardContent>
    </Card>
  );
}