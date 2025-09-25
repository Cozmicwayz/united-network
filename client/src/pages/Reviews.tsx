import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ReviewCard from '@/components/ReviewCard';
import SearchPagination from '@/components/SearchPagination';
import UploadModal from '@/components/UploadModal';
import LoginModal from '@/components/LoginModal';
import FullViewModal from '@/components/FullViewModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ReviewItem, ImageAsset, UploadData, FileWithMetadata } from '@shared/types';


export default function Reviews() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    const savedUser = localStorage.getItem('currentUser');
    if (savedLoginState === 'true' && savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [fullViewIndex, setFullViewIndex] = useState(0);

  const itemsPerPage = 9;
  const filteredItems = reviewItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogin = (username: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  const handleUpload = (data: UploadData) => {
    console.log('Review upload:', data);
    
    // Find primary file for profile image
    const primaryFile = data.files.find(f => f.isPrimary) || data.files[0];
    const otherFiles = data.files.filter(f => !f.isPrimary);
    
    // Create ImageAsset array from non-primary files
    const attachments: ImageAsset[] = otherFiles.map((fileData, index) => ({
      id: fileData.id,
      src: URL.createObjectURL(fileData.file),
      alt: `${data.title} - Attachment ${index + 1}`,
      isPrimary: false
    }));
    
    // Create new review item
    const newItem: ReviewItem = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      profileImageUrl: primaryFile ? URL.createObjectURL(primaryFile.file) : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      authorName: currentUser,
      rating: data.rating || 5,
      createdAt: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined
    };
    
    // Add to review items
    setReviewItems(prev => [newItem, ...prev]);
  };

  const handleItemClick = (item: ReviewItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setFullViewIndex(index);
    setIsFullViewOpen(true);
  };

  const isOwner = (item: ReviewItem) => {
    return isLoggedIn && currentUser === item.authorName;
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Reviews</h1>
            <p className="text-muted-foreground">
              Read testimonials from satisfied clients and share your own experiences
            </p>
          </div>
          
          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button 
                onClick={() => setIsUploadOpen(true)}
                data-testid="button-add-review"
                className="hover-elevate"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </motion.div>
          )}
        </motion.div>
        
        <div className="mb-8 flex justify-between items-center">
          <SearchPagination
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredItems.length}
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {paginatedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <ReviewCard
                item={item}
                isOwner={isOwner(item)}
                onClick={() => handleItemClick(item)}
                onEdit={() => console.log('Edit', item.id)}
                onDelete={() => {
                  setReviewItems(prev => prev.filter(i => i.id !== item.id));
                  console.log('Deleted', item.id);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {reviewItems.length === 0 
                ? 'No reviews yet. Add the first one!' 
                : 'No reviews found matching your search.'}
            </p>
          </div>
        )}
      </motion.main>
      
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      
      <UploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleUpload}
        type="review"
      />
      
      <FullViewModal
        isOpen={isFullViewOpen}
        onClose={() => setIsFullViewOpen(false)}
        items={filteredItems.map(item => ({
          ...item,
          profileImageUrl: item.profileImageUrl
        }))}
        currentIndex={fullViewIndex}
        type="review"
      />
    </motion.div>
  );
}