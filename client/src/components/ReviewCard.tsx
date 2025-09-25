import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Images } from 'lucide-react';
import ContextMenu from './ContextMenu';
import { ReviewItem } from '@shared/types';

interface ReviewCardProps {
  item: ReviewItem;
  isOwner?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewCard({ 
  item, 
  isOwner = false, 
  onClick, 
  onEdit, 
  onDelete 
}: ReviewCardProps) {
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      <Card 
        className="group hover-elevate cursor-pointer transition-all duration-200 w-[5.5cm] h-[5.5cm]"
        onClick={onClick}
        onContextMenu={handleContextMenu}
        data-testid={`card-review-${item.id}`}
      >
        <CardContent className="p-3 h-full flex flex-col">
          {/* Header */}
          <div className="mb-2">
            <h3 className="font-semibold text-sm line-clamp-1" data-testid={`text-title-${item.id}`}>
              {item.title}
            </h3>
          </div>

          {/* Profile Image Section */}
          <div className="flex justify-center mb-2 flex-1 relative">
            <Avatar className="h-12 w-12">
              <AvatarImage 
                src={item.profileImageUrl} 
                alt={item.authorName}
                onLoad={() => setImageLoaded(true)}
              />
              <AvatarFallback className="text-sm font-semibold">
                {getInitials(item.authorName)}
              </AvatarFallback>
            </Avatar>
            {item.attachments && item.attachments.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs flex items-center gap-0.5">
                <Images className="h-2.5 w-2.5" />
                {item.attachments.length}
              </div>
            )}
          </div>


          {/* Description */}
          <p className="text-muted-foreground text-xs mb-2 line-clamp-2 flex-1" data-testid={`text-description-${item.id}`}>
            {item.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            {item.rating && (
              <div className="flex items-center space-x-0">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`text-xs ${i < item.rating! ? 'text-yellow-400' : 'text-muted-foreground'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
            
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