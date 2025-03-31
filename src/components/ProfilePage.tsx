import React, { useEffect, useState } from 'react';
import { ArrowLeft, Trophy, Target, Skull, Brain, Timer } from 'lucide-react';
import axios from 'axios';

const PROFILE_POST_END_POINT = "http://localhost:142/getprofile";

interface ProfilePageProps {
  onBack: () => void;
  email_PRE: string;
  name_PRE: string
}

type PlayerStats = {
  gamesPlayed: number,
  wins: number,
  losses: number,
  averageScore: number,
  averageTime: string,
  highestStreak: number
  rr: string
}

type Player = {
  name: string,
  imageUrl: string,
  stats: PlayerStats
  
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, email_PRE, name_PRE }) => {
  const [profile, setProfile] = useState<Player>(
    {
      name: "",
      imageUrl: "",
      stats: {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        averageScore: 0,
        averageTime: "",
        highestStreak: 0,
        rr: ""
      }
    }
  )

  useEffect(() => {
    axios.post(PROFILE_POST_END_POINT, {
      email: email_PRE,
      name: name_PRE
    }).then((dataOBJ) => {
      setProfile({
        name: dataOBJ.data.data_body.name,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        stats: {
          gamesPlayed: dataOBJ.data.data_body.games_played,
          wins: dataOBJ.data.data_body.victories,
          losses: dataOBJ.data.data_body.games_played - dataOBJ.data.data_body.victories,
          averageScore: dataOBJ.data.data_body.average_score,
          averageTime: dataOBJ.data.data_body.average_time,
          highestStreak: dataOBJ.data.data_body.highest_streak,
          rr: dataOBJ.data.data_body.rr
        }
      });
      console.log(dataOBJ.data)
    });
  }, []);

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
          <p className="text-purple-300">{profile.stats.rr}</p>
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