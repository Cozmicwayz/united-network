import GalleryCard from '../GalleryCard';

export default function GalleryCardExample() {
  // Mock gallery item for demonstration
  const mockItem = {
    id: '1',
    title: 'Medieval Castle Build',
    description: 'A stunning medieval castle complete with towers, walls, and detailed interior spaces. Perfect for adventure maps and roleplay servers.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop',
    author: 'BuilderPro',
    createdAt: new Date().toISOString()
  };

  const handleClick = () => {
    console.log('Gallery item clicked');
  };

  const handleEdit = () => {
    console.log('Edit item');
  };

  const handleDelete = () => {
    console.log('Delete item');
  };


  return (
    <div className="bg-background p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GalleryCard 
          item={mockItem}
          isOwner={true}
          onClick={handleClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <GalleryCard 
          item={{...mockItem, id: '2', title: 'Pixel Art Skin', author: 'SkinArtist'}}
          isOwner={false}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}