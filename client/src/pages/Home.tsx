import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const [, setLocation] = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');
    if (savedLoginState === 'true' && savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);
    console.log('User logged in:', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  };

  const handleJoinUs = () => {
    window.open('https://discord.gg/unitednetworkmc', '_blank');
  };

  const handleViewGallery = () => {
    setLocation('/gallery');
  };

  const handleViewReviews = () => {
    setLocation('/reviews');
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Hero 
          onJoinUsClick={handleJoinUs}
          onViewGalleryClick={handleViewGallery}
          onViewReviewsClick={handleViewReviews}
        />
      </motion.div>
      
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </motion.div>
  );
}