import { useState } from 'react';
import LoginModal from '../LoginModal';
import { Button } from '@/components/ui/button';

export default function LoginModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = (username: string, password: string) => {
    console.log('Login successful:', username);
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
        Open Login Modal
      </Button>
      
      <LoginModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}