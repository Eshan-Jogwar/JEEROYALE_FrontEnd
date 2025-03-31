import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import axios from 'axios';

const LOGIN_POST_END_POINT = "http://localhost:142/loginuser";

interface LoginPageProps {
  onBack: () => void;
  onLogin: (success: boolean) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setName: React.Dispatch<React.SetStateAction<string>>
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLogin, email, setEmail, setName}) => {
  const [password, setPassword] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(LOGIN_POST_END_POINT, {
      email: email,
      password: password
    }).then((dataOBJ) => {
      if (dataOBJ.data.authentication) {
        onLogin(true);
        setName(dataOBJ.data.name);
      }
    }).catch(() => {
      onLogin(false);
    })
    
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

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-purple-300">Login to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;