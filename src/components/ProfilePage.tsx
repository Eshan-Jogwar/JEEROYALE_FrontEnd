import React from 'react';
import { ArrowLeft, Trophy, Target, Skull, Brain, Timer } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack }) => {
  // Mock data - in a real app, this would come from your backend
  const profile = {
    name: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
    stats: {
      gamesPlayed: 124,
      wins: 45,
      losses: 79,
      averageScore: 780,
      averageTime: "2m 34s",
      highestStreak: 12
    }
  };

  return (
    <div className="min-h-screen p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-purple-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <img
              src={profile.imageUrl}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg mb-4"
            />
            <div className="absolute bottom-2 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
          <p className="text-purple-300">Quiz Master</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{profile.stats.wins}</div>
            <div className="text-purple-300 text-sm">Victories</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{profile.stats.gamesPlayed}</div>
            <div className="text-purple-300 text-sm">Games Played</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Skull className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{profile.stats.losses}</div>
            <div className="text-purple-300 text-sm">Defeats</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{profile.stats.averageScore}</div>
            <div className="text-purple-300 text-sm">Average Score</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Timer className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{profile.stats.averageTime}</div>
            <div className="text-purple-300 text-sm">Average Time</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">{profile.stats.highestStreak}</div>
            <div className="text-purple-300 text-sm">Highest Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;