import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SignInSignUpFormProps {
  onLoginSuccess: () => void;
}

export const SignInSignUpForm: React.FC<SignInSignUpFormProps> = ({ onLoginSuccess }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle authentication (e.g., call an API)
    console.log(isSignIn ? 'Signing In:' : 'Signing Up:', { email, password });
    // For demonstration, directly log in on submit
    onLoginSuccess();
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="bg-gray-900 p-10 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md mx-auto relative"
    >
      <motion.h2 variants={itemVariants} className="text-4xl font-extrabold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
        {isSignIn ? 'Welcome Back!' : 'Join Hunterpedia!'}
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 transition duration-300"
            placeholder="your@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="shadow-inner appearance-none border border-gray-600 rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 transition duration-300"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </motion.div>
        <motion.button
          variants={itemVariants}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-lg"
        >
          {isSignIn ? 'Sign In Securely' : 'Sign Up Now'}
        </motion.button>
      </form>
      <motion.p variants={itemVariants} className="text-center text-gray-400 text-sm mt-8">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-teal-400 hover:text-teal-300 font-bold ml-1 focus:outline-none transition duration-300"
        >
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </button>
      </motion.p>
    </motion.div>
  );
}; 