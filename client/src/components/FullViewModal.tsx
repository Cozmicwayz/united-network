import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem, ReviewItem } from '@shared/types';

type FullViewItem = GalleryItem | ReviewItem;

interface FullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: FullViewItem[];
  currentIndex: number;
  type: 'gallery' | 'review';
}

export default function FullViewModal({ 
  isOpen, 
  onClose, 
  items, 
  currentIndex, 
  type 
}: FullViewModalProps) {
  const [index, setIndex] = useState(currentIndex);
  const [imageIndex, setImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'profile' | 'attachments'>('profile');

  // Reset image index when item changes
  useEffect(() => {
    setImageIndex(0);
    setViewMode('profile');
  }, [index]);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setIndex(currentIndex);
      setImageIndex(0);
      setViewMode('profile');
    }
  }, [isOpen, currentIndex]);
  
  if (!items.length || index < 0 || index >= items.length) {
    return null;
  }

  const currentItem = items[index];
  const isReview = type === 'review';
  
  // Get images for current item
  const galleryImages = !isReview ? (currentItem as GalleryItem).images || [] : [];
  const reviewAttachments = isReview ? (currentItem as ReviewItem).attachments || [] : [];
  
  // For reviews, determine what to show based on view mode
  const currentImages = isReview ? 
    (viewMode === 'attachments' ? reviewAttachments : []) : 
    galleryImages;
  
  const currentImage = currentImages[imageIndex];
  const hasMultipleAttachments = isReview && reviewAttachments.length > 1;

  const goToPrevious = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const goToNext = () => {
    setIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const goToPreviousImage = () => {
    setImageIndex((prev) => (prev > 0 ? prev - 1 : currentImages.length - 1));
  };

  const goToNextImage = () => {
    setImageIndex((prev) => (prev < currentImages.length - 1 ? prev + 1 : 0));
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '';
  };

  const getDisplayImage = () => {
    if (isReview) {
      if (viewMode === 'attachments' && currentImage) {
        return currentImage.src;
      }
      return (currentItem as ReviewItem).profileImageUrl;
    } else {
      const galleryItem = currentItem as GalleryItem;
      return currentImage?.src || galleryItem.images.find(img => img.isPrimary)?.src || galleryItem.images[0]?.src;
    }
  };

  const getDisplayImageAlt = () => {
    if (isReview) {
      if (viewMode === 'attachments' && currentImage) {
        return currentImage.alt;
      }
      return (currentItem as ReviewItem).authorName;
    } else {
      return currentImage?.alt || currentItem.title;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] p-0 overflow-hidden">
        <div className="relative h-full flex flex-col">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
            data-testid="button-close-modal"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                data-testid="button-previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                data-testid="button-next"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Content */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Image section */}
            <div className="flex-1 bg-muted flex items-center justify-center p-4 relative">
              {isReview ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {viewMode === 'profile' ? (
                    <Avatar className="h-48 w-48">
                      <AvatarImage 
                        src={(currentItem as ReviewItem).profileImageUrl} 
                        alt={(currentItem as ReviewItem).authorName}
                      />
                      <AvatarFallback className="text-4xl">
                        {getInitials((currentItem as ReviewItem).authorName || '')}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <img
                      src={getDisplayImage()}
                      alt={getDisplayImageAlt()}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                  
                  {/* Switch between profile and attachments */}
                  {reviewAttachments.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Button
                        variant={viewMode === 'profile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {setViewMode('profile'); setImageIndex(0);}}
                      >
                        Profile
                      </Button>
                      <Button
                        variant={viewMode === 'attachments' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {setViewMode('attachments'); setImageIndex(0);}}
                      >
                        Attachments ({reviewAttachments.length})
                      </Button>
                    </div>
                  )}
                  
                  {/* Navigation arrows for review attachments */}
                  {viewMode === 'attachments' && hasMultipleAttachments && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPreviousImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        data-testid="button-previous-image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        data-testid="button-next-image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      {/* Image counter for attachments */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                        {imageIndex + 1} / {reviewAttachments.length}
                      </div>
                    </>
                  )}
                  
                  {/* Single attachment indicator */}
                  {viewMode === 'attachments' && reviewAttachments.length === 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                      1 attachment
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={getDisplayImage()}
                    alt={getDisplayImageAlt()}
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  {/* Image navigation arrows for gallery items with multiple images */}
                  {currentImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToPreviousImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        data-testid="button-previous-image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={goToNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        data-testid="button-next-image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      
                      {/* Image counter */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                        {imageIndex + 1} / {currentImages.length}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Details section */}
            <div className="w-full md:w-96 p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-4" data-testid="text-modal-title">
                {currentItem.title}
              </h2>
              
              {/* Rating info for reviews */}
              {isReview && (currentItem as ReviewItem).rating && (
                <div className="mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`text-lg ${
                          i < (currentItem as ReviewItem).rating! ? 'text-yellow-400' : 'text-muted-foreground'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="flex-1 mb-4">
                <p className="text-muted-foreground leading-relaxed" data-testid="text-modal-description">
                  {currentItem.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {currentItem.createdAt && (
                  <span>{new Date(currentItem.createdAt).toLocaleDateString()}</span>
                )}
                {items.length > 1 && (
                  <span>{index + 1} of {items.length}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}