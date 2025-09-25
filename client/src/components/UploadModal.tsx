import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Star, MoveUp, MoveDown } from 'lucide-react';
import { UploadData, FileWithMetadata } from '@shared/types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UploadData) => void;
  type: 'gallery' | 'review';
}

interface FilePreview {
  file: File;
  previewUrl: string;
  id: string;
  isPrimary: boolean;
}

export default function UploadModal({ isOpen, onClose, onSubmit, type }: UploadModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [dragOver, setDragOver] = useState(false);

  // Cleanup URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.previewUrl));
    };
  }, [files]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || files.length === 0) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      files: files.map(f => ({
        file: f.file,
        isPrimary: f.isPrimary,
        id: f.id
      })),
      rating: type === 'review' ? rating : undefined
    });

    // Cleanup and reset
    files.forEach(f => URL.revokeObjectURL(f.previewUrl));
    setTitle('');
    setDescription('');
    setRating(5);
    setFiles([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const newPreviews: FilePreview[] = newFiles
      .filter(file => file.type.startsWith('image/'))
      .map((file, index) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        id: Date.now().toString() + index,
        isPrimary: files.length === 0 && index === 0 // First image is primary
      }));
    
    setFiles(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // If we removed the primary image, make the first one primary
      if (updated.length > 0 && !updated.some(f => f.isPrimary)) {
        updated[0].isPrimary = true;
      }
      return updated;
    });
  };

  const setPrimary = (id: string) => {
    setFiles(prev => prev.map(f => ({
      ...f,
      isPrimary: f.id === id
    })));
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    setFiles(prev => {
      const index = prev.findIndex(f => f.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newFiles = [...prev];
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const isReviewType = type === 'review';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Upload {isReviewType ? 'Review' : 'Gallery Item'}
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Box (5x5 units as specified) */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`Enter ${type} title`}
                  data-testid="input-title"
                  required
                  maxLength={100}
                />
              </div>
              
              {/* Upload Box with drag and drop */}
              <div className="space-y-2">
                <Label htmlFor="files">
                  {isReviewType ? 'Images (Profile + Optional Attachments)' : 'Images'}
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    id="files"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    data-testid="input-files"
                  />
                  
                  {files.length > 0 ? (
                    <div className="space-y-4">
                      {/* File Preview Grid */}
                      <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                        {files.map((filePreview, index) => (
                          <div key={filePreview.id} className="relative group">
                            <div className="relative w-full h-20">
                              <img
                                src={filePreview.previewUrl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded border"
                              />
                              {filePreview.isPrimary && (
                                <Star className="absolute top-1 left-1 h-3 w-3 text-yellow-500 fill-current" />
                              )}
                            </div>
                            
                            {/* Controls */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center gap-1">
                              {!filePreview.isPrimary && (
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => setPrimary(filePreview.id)}
                                  title="Set as primary"
                                >
                                  <Star className="h-3 w-3" />
                                </Button>
                              )}
                              
                              {index > 0 && (
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => moveFile(filePreview.id, 'up')}
                                  title="Move up"
                                >
                                  <MoveUp className="h-3 w-3" />
                                </Button>
                              )}
                              
                              {index < files.length - 1 && (
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  className="h-6 w-6"
                                  onClick={() => moveFile(filePreview.id, 'down')}
                                  title="Move down"
                                >
                                  <MoveDown className="h-3 w-3" />
                                </Button>
                              )}
                              
                              <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="h-6 w-6"
                                onClick={() => removeFile(filePreview.id)}
                                title="Remove"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <p className="text-xs text-center mt-1 truncate">
                              {filePreview.file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('files')?.click()}
                      >
                        Add More Images
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop images, or{' '}
                        <button
                          type="button"
                          className="text-primary underline"
                          onClick={() => document.getElementById('files')?.click()}
                        >
                          browse files
                        </button>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        You can select multiple images at once
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Rating for Reviews */}
              {isReviewType && (
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl transition-colors ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {rating} star{rating !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Description Box */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`Describe your ${type}...`}
                  data-testid="textarea-description"
                  required
                  rows={4}
                  maxLength={500}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 hover-elevate"
                  data-testid="button-submit-upload"
                  disabled={!title.trim() || !description.trim() || files.length === 0}
                >
                  Upload {files.length > 0 ? `(${files.length} image${files.length !== 1 ? 's' : ''})` : ''}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}