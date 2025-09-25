import Hero from '../Hero';

export default function HeroExample() {
  const handleJoinUs = () => {
    console.log('Join Us clicked - redirecting to Discord');
    window.open('https://discord.gg/unitednetworkmc', '_blank');
  };

  const handleViewGallery = () => {
    console.log('View Gallery clicked');
  };

  const handleViewReviews = () => {
    console.log('View Reviews clicked');
  };

  return (
    <div className="bg-background min-h-screen">
      <Hero 
        onJoinUsClick={handleJoinUs}
        onViewGalleryClick={handleViewGallery}
        onViewReviewsClick={handleViewReviews}
      />
    </div>
  );
}