import axios from 'axios';
import {  Users, Timer, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
type Question = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
}

interface GameScreenProps{
    playersAlive: number
    lives: number
    selectedChapter: string
    selectedSubtopic: string
    currentQuestion: number
    sampleQuestions: Question[]
    handleAnswer: (optionIndex: number) => void
    isAnswerCorrect: boolean | null
    selectedAnswer: number | null
    setSampleQuestions: React.Dispatch<React.SetStateAction<{
      id: number;
      text: string;
      options: string[];
      correctAnswer: number;
  }[]>>
}

type QuestionData = {
  id: string;
  sessionId: string;
  questions: string[];
  options: string[];
  current_answers: number[];
};

const GameScreen: React.FC<GameScreenProps> = (
    { playersAlive, lives, selectedChapter, selectedSubtopic, currentQuestion, sampleQuestions, handleAnswer, isAnswerCorrect, selectedAnswer, setSampleQuestions }
) => {
  
  type InputFormat = {
    id: string;
    sessionId: string;
    questions: string[];
    options: string[];
    current_answers: number[];
  };
  
  type OutputFormat = {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
  
  function transformData(input: InputFormat): OutputFormat {
    const questions = input.questions;
    const options = input.options;
    const answers = input.current_answers;
    
    const optionsPerQuestion = options.length / questions.length;
    
    return questions.map((question, index) => {
      const start = index * optionsPerQuestion;
      const end = start + optionsPerQuestion;
      return {
        id: index + 1,
        text: question,
        options: options.slice(start, end),
        correctAnswer: answers[index],
      };
    });
  }

  const UPDATE_QUESTIONS_END_POINT = "http://localhost:142/updateQuestions";
    useEffect(() => {
      axios.post(UPDATE_QUESTIONS_END_POINT, {
        sessionId: document.cookie.split("=")[1].split(" ")[0]
      }).then((dataObj) => {
        setSampleQuestions(transformData(dataObj.data.addedQuestions))
      })
    }, [])

    return (
        <div className="container mx-auto p-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8 pt-4">
            <div className="flex items-center">
              <Users className="mr-2" />
              <span className="font-bold">{playersAlive} Solving People</span>
            </div>
            <div className="flex items-center">
              <Timer className="mr-2" />
              <span className="font-bold">30s</span>
            </div>
            <div className="flex items-center">
              <Heart className="mr-2 text-red-500" />
              <span className="font-bold">{lives}</span>
            </div>
          </div>
    
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6">
            <div className="mb-4">
              <span className="text-sm font-semibold text-purple-300">
                Chapter {selectedChapter} • Topic {selectedSubtopic}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-6">
              Question {currentQuestion + 1}/{sampleQuestions.length}
            </h2>
            <p className="text-xl mb-8">{sampleQuestions[currentQuestion].text}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-4 rounded-lg text-left transition-all transform hover:shadow-lg
                    ${
                      selectedAnswer === index
                        ? isAnswerCorrect
                          ? 'bg-green-500 scale-105 rotate-1'
                          : 'bg-red-500 scale-95 -rotate-1'
                        : 'bg-purple-700 hover:bg-purple-600 hover:scale-102 hover:rotate-[0.5deg]'
                    }
                    ${selectedAnswer !== null && selectedAnswer !== index ? 'opacity-50' : ''}
                    ${
                      selectedAnswer !== null && 
                      index === sampleQuestions[currentQuestion].correctAnswer
                        ? 'bg-green-500'
                        : ''
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
    )
}
export default GameScreen;