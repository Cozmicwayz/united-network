import { useState } from 'react';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function About() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  const handleLogin = (username: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
  };

  const handleJoinUs = () => {
    window.open('https://discord.gg/unitednetworkmc', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6">About United Network</h1>
          <p className="text-xl text-muted-foreground">
            Empowering creators, connecting communities
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg leading-relaxed mb-6">
                United Network is a creator-first marketplace built to connect Minecraft freelancers 
                with clients who value quality, clarity, and creative precision. Whether you're 
                commissioning a build, requesting a plugin, or searching for the perfect thumbnail, 
                our platform makes it easy to find the right talent for your project.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                We believe every commission should be clean, transparent, and tailored to your vision. 
                That's why we've designed United Network to be modular, scalable, ready for everything!
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Our community includes builders, developers, editors, artists, musicians, and more—all 
                committed to delivering work that's polished, purposeful, and future-proof. We don't 
                just showcase creators—we empower them.
              </p>
              
              <p className="text-lg leading-relaxed font-semibold text-primary">
                United Network was made by freelancers, for freelancers.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Custom Minecraft builds and structures</li>
                <li>• Plugin development and customization</li>
                <li>• Thumbnail and graphic design</li>
                <li>• Custom skin creation</li>
                <li>• Music production and sound design</li>
                <li>• Video editing and motion graphics</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-primary">Why Choose Us</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Vetted, high-quality creators</li>
                <li>• Transparent pricing and timelines</li>
                <li>• Direct communication with freelancers</li>
                <li>• Quality guarantee on all projects</li>
                <li>• Community-driven platform</li>
                <li>• Creator-first approach</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Join Now Button at Bottom */}
        <div className="mt-16 flex justify-center pb-12">
          <Button 
            size="lg"
            onClick={handleJoinUs}
            data-testid="button-join-now"
            className="bg-discord text-background font-semibold px-8 py-3 text-lg hover-elevate"
            style={{ backgroundColor: 'hsl(var(--discord))' }}
          >
            Join now!
          </Button>
        </div>
      </main>
      
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}