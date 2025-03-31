import { useState } from 'react';
import { Crown, Users, Timer, Heart, Trophy, UserCircle, ArrowLeft } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import HomePage from './components/HomePage';
import SubjectSelection from './components/SubjectSelection';
import BackgroundAnimation from './components/BackgroundAnimation';
import ProfilePage from './components/ProfilePage';
import PastBattles from './components/PastBattles';
import BattleReview from './components/BattleReview';
import ConceptTree from './components/ConceptTree';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import WaitingRoom from './components/WaitingRoom';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
    correctAnswer: 1
  }
];

function App() {
  const [gameState, setGameState] = useState<'lobby' | 'subjects' | 'topics' | 'waiting' | 'playing' | 'results' | 'profile' | 'pastBattles' | 'battleReview' | 'conceptTree' | 'login' | 'signup'>('lobby');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [playersAlive, setPlayersAlive] = useState(100);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [selectedBattleId, setSelectedBattleId] = useState<string>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionIndex);
    const correct = optionIndex === sampleQuestions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(correct);

    if (correct) {
      setScore(score + 100);
    } else {
      setLives(lives - 1);
      setPlayersAlive(Math.max(playersAlive - Math.floor(Math.random() * 20), 1));
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);

      if (!correct && lives <= 1) {
        setGameState('results');
        return;
      }

      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameState('results');
      }
    }, 1000);
  };

  const startGame = () => {
    if (email != ""){
      setGameState('subjects');
    }else{
      setGameState('login')
    }
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setGameState('topics');
  };

  const handleTopicSelect = (chapterId: string, subtopicId: string) => {
    setSelectedChapter(chapterId);
    setSelectedSubtopic(subtopicId);
    setGameState('waiting');
    setCurrentQuestion(0);
    setLives(3);
    setScore(0);
    setPlayersAlive(100);
  };

  const handleBattleSelect = (battleId: string) => {
    setSelectedBattleId(battleId);
    setGameState('battleReview');
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      toast.success('Logged in successfully!');
      setGameState('lobby');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleSignup = (success: boolean) => {
    if (success) {
      toast.success('Account created successfully!');
      setGameState('login');
    } else {
      toast.error('Error creating account. Please try again.');
    }
  };

  const renderAuthButtons = () => {
    if (gameState !== 'playing' && gameState !== 'login' && gameState !== 'signup' && gameState !== 'waiting') {
      return (
        <div className="fixed top-4 right-4 flex space-x-4">
          <button
            onClick={() => setGameState('login')}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
          >
            Login
          </button>
          <button
            onClick={() => setGameState('signup')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Sign Up
          </button>
          <button
            onClick={() => setGameState('profile')}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      );
    }
    return null;
  };

  const renderBackButton = () => {
    if (gameState !== 'playing' && gameState !== 'lobby' && gameState !== 'waiting') {
      const handleBack = () => {
        switch (gameState) {
          case 'subjects':
            setGameState('lobby');
            break;
          case 'topics':
            setGameState('subjects');
            break;
          case 'results':
            setGameState('subjects');
            break;
          case 'login':
          case 'signup':
            setGameState('lobby');
            break;
          default:
            setGameState('lobby');
        }
      };

      return (
        <button 
          onClick={handleBack}
          className="fixed top-4 left-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all flex items-center"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <BackgroundAnimation />
      <Toaster position="top-center" />
      {renderAuthButtons()}
      {renderBackButton()}
      
      {gameState === 'profile' && (
        <ProfilePage onBack={() => setGameState('lobby')} email_PRE={email} name_PRE={name}/>
      )}

      {gameState === 'login' && (
        <LoginPage onBack={() => setGameState('lobby')} onLogin={handleLogin} email={email} setEmail={setEmail} setName={setName}/>
      )}

      {gameState === 'signup' && (
        <SignupPage onBack={() => setGameState('lobby')} onSignup={handleSignup} />
      )}

      {gameState === 'pastBattles' && (
        <PastBattles 
          onBack={() => setGameState('lobby')}
          onBattleSelect={handleBattleSelect}
        />
      )}

      {gameState === 'battleReview' && (
        <BattleReview
          onBack={() => setGameState('pastBattles')}
          battleId={selectedBattleId}
        />
      )}

      {gameState === 'conceptTree' && (
        <ConceptTree onBack={() => setGameState('battleReview')} />
      )}

      {gameState === 'waiting' && (
        <WaitingRoom onGameStart={() => setGameState('playing')} />
      )}

      {gameState === 'lobby' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Question Royale</h1>
            <p className="text-xl mb-8 text-purple-200">Battle against 100 players in this ultimate quiz showdown!</p>
            <div className="space-x-4">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-xl font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"
              >
                Start Battle
              </button>
              <button
                onClick={() => setGameState('pastBattles')}
                className="bg-white/10 px-8 py-4 rounded-lg text-xl font-bold hover:bg-white/20 transform hover:scale-105 transition-all"
              >
                Past Battles
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'subjects' && (
        <SubjectSelection onSubjectSelect={handleSubjectSelect} />
      )}

      {gameState === 'topics' && (
        <HomePage onTopicSelect={handleTopicSelect} />
      )}

      {gameState === 'playing' && (
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
      )}

      {gameState === 'results' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl mb-2">Final Score: {score}</p>
            <p className="text-xl mb-8">
              {lives > 0 ? 'You survived!' : 'Better luck next time!'}
            </p>
            <button
              onClick={() => setGameState('subjects')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-lg text-xl font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;