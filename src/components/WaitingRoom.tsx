import React, { useState, useEffect } from 'react';
import { Users, Timer } from 'lucide-react';

interface WaitingRoomProps {
  onGameStart: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ onGameStart }) => {
  const [countdown, setCountdown] = useState(5);
  const [players, setPlayers] = useState(1);

  useEffect(() => {
    // Simulate players joining
    const playerInterval = setInterval(() => {
      setPlayers(prev => Math.min(prev + Math.floor(Math.random() * 3), 100));
    }, 800);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(playerInterval);
          onGameStart();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(playerInterval);
    };
  }, [onGameStart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-lg max-w-2xl w-full mx-4">
        <h2 className="text-4xl font-bold mb-8">Waiting for Players</h2>
        
        <div className="flex justify-center items-center space-x-8 mb-12">
          <div className="flex items-center">
            <Users className="w-8 h-8 mr-3 text-purple-300" />
            <div className="text-left">
              <p className="text-sm text-purple-300">Players</p>
              <p className="text-2xl font-bold">{players}/100</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Timer className="w-8 h-8 mr-3 text-purple-300" />
            <div className="text-left">
              <p className="text-sm text-purple-300">Starting in</p>
              <p className="text-2xl font-bold">{countdown}s</p>
            </div>
          </div>
        </div>

        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden mb-8">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${players}%` }}
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg ${
                i < players % 10 ? 'bg-purple-500/50' : 'bg-white/10'
              } transition-all duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;