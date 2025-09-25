# United Network - Creator Marketplace

## Overview

United Network is a creator-first marketplace designed to connect Minecraft freelancers with clients. The platform showcases services like builds, plugins, thumbnails, skins, music, and more through a modern web interface. Built as a full-stack React application, it features a gallery for showcasing work, reviews system for client feedback, and secure authentication with whitelisted access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom design system featuring dark theme (#302F2F background, #A8F0E8 accent)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database interactions
- **Authentication**: Session-based authentication with whitelisted user credentials
- **File Storage**: In-memory storage interface with extensible design for future database integration
- **API Design**: RESTful endpoints with Express middleware for logging and error handling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for database schema management
- **Schema**: User authentication table with UUID primary keys
- **Migrations**: Database migrations managed through Drizzle Kit
- **Types**: Shared TypeScript interfaces for Gallery and Review items with image asset management

### Design System
- **Color Palette**: Dark-first design with #302F2F background, #FFFFFF text, #A8F0E8 accent
- **Typography**: Inter/Poppins fonts with semantic weight hierarchy
- **Components**: Modular component library with cards, modals, forms, and navigation
- **Layout**: Responsive grid system using Tailwind spacing units (2, 4, 8, 12, 16)
- **Interactions**: Hover effects, context menus, and drag-and-drop file uploads

### Authentication & Authorization
- **Access Control**: Whitelisted user system with hardcoded credentials (cozmicwayz/Apple321234, levi/cozmiclevi)
- **Session Management**: Browser localStorage for persistence across sessions
- **Route Protection**: Public viewing with authenticated user actions (upload, edit, delete)
- **User Context**: Global authentication state managed across components

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting service (@neondatabase/serverless)
- **Connection Pooling**: Built-in connection management for serverless environments

### UI Component Library
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class composition
- **Framer Motion**: Animation library for smooth transitions and interactions

### Development Tools
- **TypeScript**: Full-stack type safety with strict configuration
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **Replit Integration**: Development environment with runtime error overlay

### Third-party Integrations
- **Discord**: External link integration (https://discord.gg/unitednetworkmc)
- **Unsplash**: Placeholder images for gallery items and fallback content
- **Google Fonts**: Web font loading for Inter and JetBrains Mono

### File Handling
- **Drag & Drop**: Native HTML5 file upload with preview generation
- **Image Processing**: Client-side image preview with URL.createObjectURL
- **File Validation**: Type and size validation for uploaded assets