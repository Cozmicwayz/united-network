import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';

interface HeroProps {
  onJoinUsClick?: () => void;
  onViewGalleryClick?: () => void;
  onViewReviewsClick?: () => void;
}

export default function Hero({ onJoinUsClick, onViewGalleryClick, onViewReviewsClick }: HeroProps) {
  const creatorRoles = [
    "Animators",
    "Editors", 
    "Developers",
    "Thumbnailers",
    "Modelers",
    "Builders",
    "Skin Makers",
    "Artists",
    "Musicians",
    "Bosses Creators",
    "Logo Makers"
  ];

  return (
    <section className="bg-background py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Hero Title with Typewriter */}
        <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="text-foreground">We've got the best</span>
          <br />
          <TypewriterText 
            texts={creatorRoles}
            speed={120}
            delay={2000}
            className="text-primary"
          />
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          From eye-catching thumbnails to powerful custom plugins, United Network connects you with skilled creators ready to elevate your vision. Whether you're building a server, launching content, or refining your brand, we've got you covered.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={onJoinUsClick}
            data-testid="button-join-us"
            className="bg-discord text-background font-semibold px-8 py-3 text-lg hover-elevate"
            style={{ backgroundColor: 'hsl(var(--discord))' }}
          >
            Join Us Now
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={onViewGalleryClick}
            data-testid="button-view-gallery"
            className="px-8 py-3 text-lg hover-elevate"
          >
            View Our Gallery
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={onViewReviewsClick}
            data-testid="button-view-reviews"
            className="px-8 py-3 text-lg hover-elevate"
          >
            View Reviews
          </Button>
        </div>

      </div>
    </section>
  );
}