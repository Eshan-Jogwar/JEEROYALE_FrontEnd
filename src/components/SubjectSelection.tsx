import React from 'react';
import { 
  Calculator, 
  TestTube2, 
  BookOpen, 
  Globe2, 
  Code2, 
  Palette,
  History,
  Music2
} from 'lucide-react';

interface Subject {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
  comingSoon?: boolean;
}

interface SubjectSelectionProps {
  onSubjectSelect: (subjectId: string) => void;
}

const SubjectSelection: React.FC<SubjectSelectionProps> = ({ onSubjectSelect }) => {
  const subjects: Subject[] = [
    {
      id: "mathematics",
      title: "Mathematics",
      description: "Master mathematical concepts from basic arithmetic to advanced calculus",
      icon: <Calculator className="w-8 h-8" />,
      bgClass: "from-blue-500 to-blue-600"
    },
    {
      id: "science",
      title: "Science",
      description: "Explore physics, chemistry, and biology fundamentals",
      icon: <TestTube2 className="w-8 h-8" />,
      bgClass: "from-green-500 to-green-600",
      comingSoon: true
    },
    {
      id: "literature",
      title: "Literature",
      description: "Journey through classic and contemporary literature",
      icon: <BookOpen className="w-8 h-8" />,
      bgClass: "from-yellow-500 to-yellow-600",
      comingSoon: true
    },
    {
      id: "geography",
      title: "Geography",
      description: "Discover world geography and cultural studies",
      icon: <Globe2 className="w-8 h-8" />,
      bgClass: "from-purple-500 to-purple-600",
      comingSoon: true
    },
    {
      id: "programming",
      title: "Programming",
      description: "Learn coding and computer science principles",
      icon: <Code2 className="w-8 h-8" />,
      bgClass: "from-pink-500 to-pink-600",
      comingSoon: true
    },
    {
      id: "art",
      title: "Art History",
      description: "Study art movements and famous artworks",
      icon: <Palette className="w-8 h-8" />,
      bgClass: "from-red-500 to-red-600",
      comingSoon: true
    },
    {
      id: "history",
      title: "History",
      description: "Explore world history and civilizations",
      icon: <History className="w-8 h-8" />,
      bgClass: "from-indigo-500 to-indigo-600",
      comingSoon: true
    },
    {
      id: "music",
      title: "Music Theory",
      description: "Learn musical concepts and composition",
      icon: <Music2 className="w-8 h-8" />,
      bgClass: "from-teal-500 to-teal-600",
      comingSoon: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Choose Your Subject</h1>
        <p className="text-xl text-purple-200">Select a subject to begin your learning journey</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`
              relative overflow-hidden rounded-xl shadow-lg 
              transition-all duration-300 transform hover:scale-105
              ${subject.comingSoon ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
            `}
            onClick={() => !subject.comingSoon && onSubjectSelect(subject.id)}
          >
            <div className={`bg-gradient-to-br ${subject.bgClass} p-6`}>
              <div className="flex items-start justify-between">
                <div className="bg-white/20 rounded-lg p-3">
                  {subject.icon}
                </div>
                {subject.comingSoon && (
                  <span className="bg-black/30 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2">{subject.title}</h3>
                <p className="text-white/80">{subject.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectSelection;