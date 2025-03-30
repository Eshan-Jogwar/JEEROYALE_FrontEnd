import React, { useState } from 'react';
import { ArrowLeft, Bot, CheckCircle, XCircle, GitBranch } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number;
  explanation: string;
}

interface BattleReviewProps {
  onBack: () => void;
  battleId: string;
}

const BattleReview: React.FC<BattleReviewProps> = ({ onBack, battleId }) => {
  const [expandedAI, setExpandedAI] = useState<number | null>(null);

  // Mock data - in a real app, this would be fetched based on battleId
  const questions: Question[] = [
    {
      id: 1,
      text: "If a triangle has angles measuring 45°, 45°, and 90°, what is the ratio of its shortest to its longest side?",
      options: ["1:1", "1:√2", "1:2", "2:√3"],
      correctAnswer: 1,
      selectedAnswer: 1,
      explanation: "In a 45-45-90 triangle, the two legs are equal, and the hypotenuse is √2 times the length of a leg. Therefore, the ratio of the shortest side (leg) to the longest side (hypotenuse) is 1:√2."
    },
    {
      id: 2,
      text: "What is the derivative of x²sin(x)?",
      options: ["2xsin(x)", "x²cos(x)", "2xsin(x) + x²cos(x)", "sin(x) + xcos(x)"],
      correctAnswer: 2,
      selectedAnswer: 1,
      explanation: "Using the product rule, d/dx[x²sin(x)] = x² · d/dx[sin(x)] + sin(x) · d/dx[x²] = x²cos(x) + sin(x)(2x) = 2xsin(x) + x²cos(x)"
    }
  ];

  const handleAIClick = (questionId: number) => {
    setExpandedAI(expandedAI === questionId ? null : questionId);
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

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Battle Review</h1>
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Question {question.id}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAIClick(question.id)}
                    className="bg-purple-500/20 p-2 rounded-lg hover:bg-purple-500/30 transition-all transform hover:scale-105"
                  >
                    <Bot className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => window.location.href = '#/concept-tree'}
                    className="bg-purple-500/20 p-2 rounded-lg hover:bg-purple-500/30 transition-all transform hover:scale-105"
                  >
                    <GitBranch className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-lg mb-6">{question.text}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg flex items-center justify-between
                      ${index === question.correctAnswer ? 'bg-green-500/20' : ''}
                      ${index === question.selectedAnswer && index !== question.correctAnswer ? 'bg-red-500/20' : ''}
                      ${index !== question.selectedAnswer && index !== question.correctAnswer ? 'bg-white/5' : ''}
                    `}
                  >
                    <span>{option}</span>
                    {index === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : index === question.selectedAnswer ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="bg-purple-500/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Solution:</h4>
                <p>{question.explanation}</p>
              </div>

              {expandedAI === question.id && (
                <div className="mt-4 bg-indigo-500/10 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Bot className="w-5 h-5 mr-2" />
                    <h4 className="font-semibold">AI Assistant</h4>
                  </div>
                  <p>Need help understanding this concept? Ask me anything about this question!</p>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Type your question here..."
                      className="w-full bg-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleReview;