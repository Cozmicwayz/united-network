import ReviewCard from '../ReviewCard';

export default function ReviewCardExample() {
  // Mock review item for demonstration
  const mockReview = {
    id: '1',
    title: 'Amazing Plugin Development Service',
    description: 'I hired this developer to create a custom economy plugin for my server. The work was exceptional - clean code, well documented, and delivered on time. The plugin has been running flawlessly for months!',
    profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    authorName: 'ServerOwner123',
    rating: 5,
    createdAt: new Date().toISOString()
  };

  const handleClick = () => {
    console.log('Review item clicked');
  };

  const handleEdit = () => {
    console.log('Edit review');
  };

  const handleDelete = () => {
    console.log('Delete review');
  };


  return (
    <div className="bg-background p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReviewCard 
          item={mockReview}
          isOwner={true}
          onClick={handleClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ReviewCard 
          item={{
            ...mockReview, 
            id: '2', 
            title: 'Great Thumbnail Design',
            authorName: 'ContentCreator',
            rating: 4
          }}
          isOwner={false}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}