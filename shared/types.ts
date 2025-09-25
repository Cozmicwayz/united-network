// Shared type definitions for United Network

export interface ImageAsset {
  id: string;
  src: string;
  alt?: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  images: ImageAsset[];
  author: string;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  title: string;
  description: string;
  profileImageUrl: string; // Keep separate for user identity
  authorName: string;
  rating: number;
  createdAt: string;
  attachments?: ImageAsset[]; // Optional additional images
}

export interface FileWithMetadata {
  file: File;
  isPrimary: boolean;
  id: string;
}

export interface UploadData {
  title: string;
  description: string;
  files: FileWithMetadata[];
  rating?: number; // For reviews
}