import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Whitelisted credentials validation
    const validCredentials = [
      { username: 'cozmicwayz', password: 'Apple321234' },
      { username: 'levi', password: 'cozmiclevi' }
    ];
    
    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password
    );
    
    if (isValid) {
      onLogin(username, password);
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid credentials. Access is whitelisted only.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Login to United Network</DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  data-testid="input-username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  data-testid="input-password"
                  required
                />
              </div>
              
              {error && (
                <div className="text-destructive text-sm text-center" data-testid="text-error">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full hover-elevate"
                data-testid="button-submit-login"
              >
                Login
              </Button>
            </form>
            
            <div className="mt-4 text-sm text-muted-foreground text-center">
              <p>Access is restricted to whitelisted users only</p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}