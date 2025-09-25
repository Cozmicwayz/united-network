import Header from '../Header';

export default function HeaderExample() {
  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="bg-background min-h-screen">
      <Header 
        isLoggedIn={false}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
      />
      <div className="p-8">
        <p className="text-muted-foreground">Header component with navigation and login functionality</p>
      </div>
    </div>
  );
}