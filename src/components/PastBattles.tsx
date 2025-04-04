import React from 'react';
import { ArrowLeft, Calendar, Users, Brain, Timer, Trophy } from 'lucide-react';

interface Battle {
  id: string;
  date: string;
  subject: string;
  chapter: string;
  score: number;
  questionsCount: number;
  timeSpent: string;
  position: number;
}

interface PastBattlesProps {
  onBack: () => void;
  onBattleSelect: (battleId: string) => void;
}

const PastBattles: React.FC<PastBattlesProps> = ({ onBack, onBattleSelect }) => {
  const battles: Battle[] = [
    {
      id: "battle-1",
      date: "March 15, 2024",
      subject: "Mathematics",
      chapter: "Algebra Fundamentals",
      score: 850,
      questionsCount: 10,
      timeSpent: "8m 30s",
      position: 12
    },
    {
      id: "battle-2",
      date: "March 14, 2024",
      subject: "Mathematics",
      chapter: "Geometry Basics",
      score: 920,
      questionsCount: 10,
      timeSpent: "7m 45s",
      position: 5
    },
    {
      id: "battle-3",
      date: "March 13, 2024",
      subject: "Mathematics",
      chapter: "Calculus Introduction",
      score: 780,
      questionsCount: 10,
      timeSpent: "9m 15s",
      position: 25
    }
  ];

  return (
    
    <div className="min-h-screen p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-purple-300 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Past Battles</h1>
        <div className="space-y-4">
          <h1 className="italic" style={{color: "red"}} >****This Feature is Under Development only the front end of the feature is ready</h1>
          {battles.map((battle) => (
            <div
              key={battle.id}
              onClick={() => onBattleSelect(battle.id)}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer hover:bg-white/15 transition-all transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{battle.subject}</h3>
                    <p className="text-purple-300">{battle.chapter}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-purple-300 mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    {battle.date}
                  </div>
                  <div className="text-sm text-purple-400">
                    Position #{battle.position}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-400" />
                  <span>{battle.score} points</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-400" />
                  <span>{battle.questionsCount} questions</span>
                </div>
                <div className="flex items-center">
                  <Timer className="w-5 h-5 mr-2 text-orange-400" />
                  <span>{battle.timeSpent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastBattles;