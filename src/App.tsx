import { useState } from 'react';
import { Crown, Trophy, UserCircle, ArrowLeft } from 'lucide-react';
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
import axios from 'axios';
import GameScreen from './components/GameScreen';
import { GENERATE_SESSION_URL_END_POINT, END_SESSION_END_POINT } from './links';

function App() {
  const [gameState, setGameState] = useState<'lobby' | 'subjects' | 'topics' | 'waiting' | 'playing' | 'results' | 'profile' | 'pastBattles' | 'battleReview' | 'conceptTree' | 'login' | 'signup'>('lobby');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [playersAlive, setPlayersAlive] = useState(100);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [selectedBattleId, setSelectedBattleId] = useState<string>('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [sampleQuestions, setSampleQuestions] = useState([
    {
      id: 1,
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 3
    },
    {
      id: 3,
      text: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
      correctAnswer: 2
    }
  ])
  //{"id":"890a11cf-f2b1-4b8c-bb3c-700abdb9488e","sessionId":"e22eef73-9d78-4279-a3c6-04c1162b051c","questions":["Which of the following is a prime number?","What is the LCM of 4 and 6?","Solve: (5 × 4) - (6 ÷ 2) ","What is 144 divided by 12?","What is the GCF of 36 and 48?","What is 3 + 6 × 2?","What is a factor of 24?","What is 2^5?","What is the square root of 81?","What is 8 multiplied by 6?"],"options":["21","33","37","39","10","12","14","16","16","17","18","20","10","12","14","16","6","8","12","18","12","15","18","21","5","7","6","11","16","32","64","128","7","8","9","10","42","46","48","52"]}
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
        axios.post(END_SESSION_END_POINT, {
          sessionId: document.cookie.split("=")[1].split(" ")[0]
        }).then((elem) => {
          console.log(elem.data);
          document.cookie = "";
          setGameState('results');
        }).catch(() => {
          document.cookie = "";
          setGameState('results');
        });
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
    axios.post(GENERATE_SESSION_URL_END_POINT, {
      subject: selectedSubject,
      topic: subtopicId
    }).then((dataObj) => {
      document.cookie = `sessionId=${dataObj.data.sessionId} path=/`
    }).then((respon) => {
      console.log(respon);
      setGameState('waiting');
      setCurrentQuestion(0);
      setLives(3);
      setScore(0);
      setPlayersAlive(100);
    })
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

      {gameState == 'playing' && (
        <GameScreen 
        playersAlive={playersAlive} 
        lives={lives} 
        selectedChapter={selectedChapter} 
        selectedSubtopic={selectedSubtopic} 
        currentQuestion={currentQuestion} 
        sampleQuestions={sampleQuestions} 
        handleAnswer={handleAnswer} 
        isAnswerCorrect={isAnswerCorrect} 
        selectedAnswer={selectedAnswer} 
        setSampleQuestions={setSampleQuestions}
      />
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