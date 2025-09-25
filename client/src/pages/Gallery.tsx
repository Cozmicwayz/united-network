import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import GalleryCard from '@/components/GalleryCard';
import SearchPagination from '@/components/SearchPagination';
import UploadModal from '@/components/UploadModal';
import LoginModal from '@/components/LoginModal';
import FullViewModal from '@/components/FullViewModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GalleryItem, ImageAsset, UploadData, FileWithMetadata } from '@shared/types';


export default function Gallery() {
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
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [fullViewIndex, setFullViewIndex] = useState(0);

  const itemsPerPage = 9;
  const filteredItems = galleryItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
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
    console.log('Gallery upload:', data);
    
    // Create ImageAsset array from uploaded files
    const images: ImageAsset[] = data.files.map((fileData, index) => ({
      id: fileData.id,
      src: URL.createObjectURL(fileData.file),
      alt: `${data.title} - Image ${index + 1}`,
      isPrimary: fileData.isPrimary
    }));
    
    // Create new gallery item
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      images,
      author: currentUser,
      createdAt: new Date().toISOString()
    };
    
    // Add to gallery items
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setFullViewIndex(index);
    setIsFullViewOpen(true);
  };

  const isOwner = (item: GalleryItem) => {
    return isLoggedIn && currentUser === item.author;
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
            <h1 className="text-4xl font-bold mb-2">Gallery</h1>
            <p className="text-muted-foreground">
              Discover amazing builds, skins, and creative works from our community
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
                data-testid="button-add-gallery-item"
                className="hover-elevate"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
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
              <GalleryCard
                item={item}
                isOwner={isOwner(item)}
                onClick={() => handleItemClick(item)}
                onEdit={() => console.log('Edit', item.id)}
                onDelete={() => {
                  setGalleryItems(prev => prev.filter(i => i.id !== item.id));
                  console.log('Deleted', item.id);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {galleryItems.length === 0 
                ? 'No gallery items yet. Upload the first one!' 
                : 'No gallery items found matching your search.'}
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
        type="gallery"
      />
      
      <FullViewModal
        isOpen={isFullViewOpen}
        onClose={() => setIsFullViewOpen(false)}
        items={filteredItems}
        currentIndex={fullViewIndex}
        type="gallery"
      />
    </motion.div>
  );
}