import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ScoreWheel({ wealth, power, fame, charm, gear }) {
  const totalScore = (
    (wealth * 0.3) + 
    (power * 0.2) + 
    (fame * 0.25) + 
    (charm * 0.15) + 
    (gear * 0.1)
  ).toFixed(0);

  const data = [
    { name: 'Wealth', value: wealth, multiplier: '30%', color: '#10B981' },
    { name: 'Power', value: power, multiplier: '20%', color: '#8B5CF6' },
    { name: 'Fame', value: fame, multiplier: '25%', color: '#F59E0B' },
    { name: 'Charm', value: charm, multiplier: '15%', color: '#EC4899' },
    { name: 'Gear', value: gear, multiplier: '10%', color: '#3B82F6' },
  ];

  return (
    <div className="relative">
      <div className="relative h-56 w-56 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold gradient-gold bg-clip-text text-transparent">
            {totalScore}
          </div>
          <div className="text-xs text-gray-500 mt-1">STATUS SCORE</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-6 px-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700">{item.name}</span>
            <span className="text-gray-400 ml-auto">{item.multiplier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}