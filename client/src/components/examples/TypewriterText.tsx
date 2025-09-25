import TypewriterText from '../TypewriterText';

export default function TypewriterTextExample() {
  const creatorRoles = [
    "Builders",
    "Plugin Developers", 
    "Thumbnail Artists",
    "Skin Creators",
    "Music Producers",
    "Video Editors"
  ];

  return (
    <div className="bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-4">
        Connecting Minecraft{' '}
        <TypewriterText 
          texts={creatorRoles}
          speed={120}
          delay={2000}
          className="text-primary"
        />
      </h1>
    </div>
  );
}