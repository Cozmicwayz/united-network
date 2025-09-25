import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  visible: boolean;
}

export default function ContextMenu({ 
  x, 
  y, 
  onEdit, 
  onDelete, 
  onClose, 
  visible 
}: ContextMenuProps) {
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const handleClickOutside = () => {
      onClose();
    };

    const handleScroll = () => {
      onClose();
    };

    if (visible) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
      
      // Adjust position if menu would go off screen
      const menuWidth = 150;
      const menuHeight = 100;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = x;
      let adjustedY = y;
      
      if (x + menuWidth > viewportWidth) {
        adjustedX = x - menuWidth;
      }
      
      if (y + menuHeight > viewportHeight) {
        adjustedY = y - menuHeight;
      }
      
      setPosition({ x: adjustedX, y: adjustedY });
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [visible, x, y, onClose]);

  if (!visible) return null;

  return (
    <div 
      className="fixed z-50"
      style={{ 
        left: position.x, 
        top: position.y,
        pointerEvents: 'auto'
      }}
    >
      <Card className="shadow-lg border-2">
        <CardContent className="p-2">
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-2 hover-elevate"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
                onClose();
              }}
              data-testid="button-context-edit"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start h-8 px-2 hover-elevate text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
                onClose();
              }}
              data-testid="button-context-delete"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}