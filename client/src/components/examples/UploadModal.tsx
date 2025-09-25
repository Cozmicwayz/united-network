import { useState } from 'react';
import UploadModal from '../UploadModal';
import { Button } from '@/components/ui/button';

export default function UploadModalExample() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleSubmit = (data: any) => {
    console.log('Upload submitted:', data);
  };

  return (
    <div className="bg-background p-8 space-y-4">
      <div className="space-x-4">
        <Button onClick={() => setIsGalleryOpen(true)} data-testid="button-open-gallery-upload">
          Open Gallery Upload
        </Button>
        <Button onClick={() => setIsReviewOpen(true)} data-testid="button-open-review-upload">
          Open Review Upload
        </Button>
      </div>
      
      <UploadModal 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSubmit={handleSubmit}
        type="gallery"
      />
      
      <UploadModal 
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleSubmit}
        type="review"
      />
    </div>
  );
}