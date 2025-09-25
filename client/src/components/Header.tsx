import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

export default function Header({ isLoggedIn = false, onLoginClick, onLogoutClick }: HeaderProps) {
  const [location] = useLocation();

  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/discord', label: 'Discord' },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" data-testid="link-home">
          <div className="flex items-center space-x-3 hover-elevate rounded-md px-3 py-2 transition-colors cursor-pointer">
            <ShoppingCart className="h-10 w-10 text-accent" />
            <span className="text-xl font-bold text-foreground">United Network</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-${item.label.toLowerCase()}`}>
              <Button 
                variant={location === item.href ? "secondary" : "ghost"}
                className="hover-elevate"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              onClick={onLogoutClick}
              data-testid="button-logout"
              className="hover-elevate"
            >
              Logout
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={onLoginClick}
              data-testid="button-login"
              className="hover-elevate"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
