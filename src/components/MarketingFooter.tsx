import React from 'react';
import { motion } from 'framer-motion';

export const MarketingFooter: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={footerVariants}
      className="bg-black text-white p-8 mt-16 shadow-inner border-t border-gray-800"
    >
      <div className="container mx-auto text-center text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-8">
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Solutions</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Application Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Security Servers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Security FireWalls</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Cloud Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Partners</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Amazon</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Figma</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">CloudRail-IIOT</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Resources</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Academy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Themes</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Hosting</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Developers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Teams</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Hunterpedia. All rights reserved.</p>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-github"></i></a>
            <a href="#" className="hover:text-blue-400 transition duration-300"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}; 