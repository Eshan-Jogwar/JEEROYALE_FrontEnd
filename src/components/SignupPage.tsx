import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
interface SignupPageProps {
  onBack: () => void;
  onSignup: (success: boolean) => void;
}

const SIGNUP_POST_END_POINT = "http://localhost:142/signupuser"

const SignupPage: React.FC<SignupPageProps> = ({ onBack, onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(SIGNUP_POST_END_POINT, {
      name: name,
      email: email,
      password: password
    }).then((dataOBJ) => {
      if (dataOBJ.data.createdUser) {
        onSignup(true);
      }
    }).catch(() => {
      onSignup(false);
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
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-purple-300">Join our community of learners</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-purple-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-purple-500/20 rounded-lg py-3 px-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

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
                placeholder="Choose a password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;