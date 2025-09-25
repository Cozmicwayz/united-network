import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Images } from 'lucide-react';
import ContextMenu from './ContextMenu';
import { GalleryItem } from '@shared/types';

interface GalleryCardProps {
  item: GalleryItem;
  isOwner?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function GalleryCard({ 
  item, 
  isOwner = false, 
  onClick, 
  onEdit, 
  onDelete 
}: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isOwner) return;
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <>
      <Card 
        className="group hover-elevate cursor-pointer transition-all duration-200 overflow-hidden w-[5.5cm] h-[5.5cm]"
        onClick={onClick}
        onContextMenu={handleContextMenu}
        data-testid={`card-gallery-${item.id}`}
      >
        <div className="relative h-3/5 bg-muted">
        <img
          src={item.images.find(img => img.isPrimary)?.src || item.images[0]?.src || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop'}
          alt={item.images.find(img => img.isPrimary)?.alt || item.title}
          className={`w-full h-full object-cover transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        {item.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Images className="h-3 w-3" />
            {item.images.length}
          </div>
        )}
        </div>
        
        <CardContent className="p-2 h-2/5">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1" data-testid={`text-title-${item.id}`}>
            {item.title}
          </h3>
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2" data-testid={`text-description-${item.id}`}>
            {item.description}
          </p>
          
          <div className="flex items-center justify-end">
            {item.createdAt && (
              <span className="text-xs text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
      
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        visible={contextMenu.visible}
        onEdit={() => onEdit?.()}
        onDelete={() => onDelete?.()}
        onClose={closeContextMenu}
      />
    </>
  );
}