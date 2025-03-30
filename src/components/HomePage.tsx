import React, { useState } from 'react';
import { Book, ChevronRight, ChevronDown, BookOpen } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: string;
  title: string;
  questionCount: number;
}

interface SubtopicItemProps {
  subtopic: Subtopic;
  chapterId: string;
  onSelect: (chapterId: string, subtopicId: string) => void;
}

const SubtopicItem: React.FC<SubtopicItemProps> = ({ subtopic, chapterId, onSelect }) => (
  <button
    onClick={() => onSelect(chapterId, subtopic.id)}
    className="w-full text-left py-2 px-4 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between group"
  >
    <div className="flex items-center space-x-2">
      <BookOpen className="w-4 h-4 text-purple-300" />
      <span>{subtopic.title}</span>
    </div>
    <span className="text-sm text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
      {subtopic.questionCount} questions
    </span>
  </button>
);

interface ChapterItemProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onSubtopicSelect: (chapterId: string, subtopicId: string) => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({ 
  chapter, 
  isExpanded, 
  onToggle, 
  onSubtopicSelect 
}) => (
  <div className="mb-4">
    <button
      onClick={onToggle}
      className="w-full text-left p-4 bg-white/5 backdrop-blur-lg rounded-lg hover:bg-white/10 transition-all flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Book className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{chapter.title}</h3>
          <p className="text-sm text-purple-200">{chapter.description}</p>
        </div>
      </div>
      {isExpanded ? (
        <ChevronDown className="w-5 h-5 text-purple-300" />
      ) : (
        <ChevronRight className="w-5 h-5 text-purple-300" />
      )}
    </button>
    {isExpanded && (
      <div className="mt-2 ml-12 space-y-1 border-l-2 border-purple-500/20 pl-4">
        {chapter.subtopics.map((subtopic) => (
          <SubtopicItem
            key={subtopic.id}
            subtopic={subtopic}
            chapterId={chapter.id}
            onSelect={onSubtopicSelect}
          />
        ))}
      </div>
    )}
  </div>
);

interface HomePageProps {
  onTopicSelect: (chapterId: string, subtopicId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTopicSelect }) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  const chapters: Chapter[] = [
    {
      id: "chapter-1",
      title: "Foundations of Mathematics",
      description: "Basic concepts and fundamental principles",
      subtopics: [
        { id: "1-1", title: "Numbers and Operations", questionCount: 15 },
        { id: "1-2", title: "Algebraic Expressions", questionCount: 12 },
        { id: "1-3", title: "Equations and Inequalities", questionCount: 18 }
      ]
    },
    {
      id: "chapter-2",
      title: "Geometry and Measurement",
      description: "Shapes, spaces, and measurements",
      subtopics: [
        { id: "2-1", title: "Plane Geometry", questionCount: 20 },
        { id: "2-2", title: "Solid Geometry", questionCount: 15 },
        { id: "2-3", title: "Measurement Systems", questionCount: 10 }
      ]
    },
    {
      id: "chapter-3",
      title: "Data Analysis and Probability",
      description: "Statistical concepts and chance",
      subtopics: [
        { id: "3-1", title: "Data Collection", questionCount: 12 },
        { id: "3-2", title: "Statistical Measures", questionCount: 15 },
        { id: "3-3", title: "Probability Concepts", questionCount: 18 }
      ]
    },
    {
      id: "chapter-4",
      title: "Advanced Mathematics",
      description: "Complex mathematical concepts",
      subtopics: [
        { id: "4-1", title: "Calculus Basics", questionCount: 20 },
        { id: "4-2", title: "Linear Algebra", questionCount: 15 },
        { id: "4-3", title: "Number Theory", questionCount: 12 }
      ]
    }
  ];

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Mathematics Curriculum</h2>
        <p className="text-xl text-purple-200">Select a chapter and topic to begin your challenge</p>
      </div>
      <div className="space-y-4">
        {chapters.map((chapter) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            isExpanded={expandedChapters.has(chapter.id)}
            onToggle={() => toggleChapter(chapter.id)}
            onSubtopicSelect={onTopicSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;