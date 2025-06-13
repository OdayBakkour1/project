import React from 'react';
import { motion } from 'framer-motion';

interface MarketingHeaderProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export const MarketingHeader: React.FC<MarketingHeaderProps> = ({ onSignInClick, onSignUpClick }) => {
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="bg-black text-white p-4 shadow-lg relative z-20"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1 variants={itemVariants} className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          Hunterpedia
        </motion.h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <motion.li variants={itemVariants}><a href="#" className="hover:text-blue-300 transition duration-300">Home</a></motion.li>
            <motion.li variants={itemVariants}><a href="#features" className="hover:text-blue-300 transition duration-300">Features</a></motion.li>
            <motion.li variants={itemVariants}><a href="#what-we-cover" className="hover:text-blue-300 transition duration-300">What We Cover</a></motion.li>
            <motion.li variants={itemVariants}><a href="#why-hunterpedia" className="hover:text-blue-300 transition duration-300">Why Hunterpedia</a></motion.li>
            <motion.li variants={itemVariants}><a href="#contact" className="hover:text-blue-300 transition duration-300">Contact</a></motion.li>
            <motion.li variants={itemVariants}><button onClick={onSignInClick} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full shadow-md hover:from-blue-700 hover:to-blue-900 transition duration-300">Sign In</button></motion.li>
            <motion.li variants={itemVariants}><button onClick={onSignUpClick} className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow-md hover:from-green-600 hover:to-green-800 transition duration-300">Sign Up</button></motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}; 