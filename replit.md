# Algotrom Corporate Website

## Overview

This is a full-stack corporate website for Algotrom, a Turkish software company specializing in digital transformation, business process management (BPM), and enterprise solutions. The application features a modern React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration using Drizzle ORM. The website supports multi-language functionality (Turkish, English, French, Arabic, Russian, German) and includes comprehensive business features like demo requests, contact forms, job applications, and a blog system.

**Important Update (January 2025)**: The website is now fully dynamic using React with admin panel functionality. All content is managed through the PostgreSQL database and admin interface.

**Latest Updates (January 2025)**:
- Implemented comprehensive CV upload system on career page with file restrictions (PDF, DOCX, DOC, TXT under 15MB)
- Added LinkedIn integration to blog page for automatic post sharing
- Updated management team: Yıldırım Özyakışır (Proje Yöneticisi), İsmet Çetin (Proje Yöneticisi), Sedef Nihal (Finans Yöneticisi)
- **COMPLETED**: Corrected all product names to "E-Flow BPM" and "E-Flow DMS" (replacing "Döküman Yönetim Sistemi")
- **COMPLETED**: Updated efficiency rates to 86% across all industry solutions
- **COMPLETED**: Standardized product naming across the dynamic React application
- Removed newsletter section from blog page and simplified references page structure
- Removed Ahmet Yılmaz from management team and replaced all team member photos with placeholder icons
- Added English position titles under Turkish titles for management team
- Removed company timeline/history section from about page
- Removed blog haberler and güvenilen çözüm ortağınız sections from homepage
- **NEW**: Added comprehensive admin panel with authentication and content management capabilities
- **NEW**: Admin panel includes dashboard, contact messages, demo requests, job applications management
- **NEW**: PostgreSQL database integration with admin authentication using JWT tokens

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **Routing**: Wouter for client-side routing with clean URL structure
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: Custom i18n implementation supporting 6 languages

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for request/response validation
- **Email**: Nodemailer for transactional email functionality
- **Storage Strategy**: Flexible storage interface with in-memory implementation for development

### Database Design
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Schema Structure**: 
  - Users table for basic authentication
  - Demo requests for sales lead capture
  - Contact messages for customer inquiries
  - Blog posts with JSON fields for multi-language content
  - Job applications for HR processes
- **Data Validation**: Shared Zod schemas between frontend and backend

### Development Workflow
- **Build System**: Vite for frontend bundling and development server
- **Type Safety**: Full TypeScript implementation across frontend, backend, and shared schemas
- **Code Quality**: ESLint configuration with TypeScript support
- **Path Aliases**: Configured for clean imports (@/ for client, @shared for shared code)

### Key Features
- **Multi-language Support**: Complete internationalization system with language persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Form Handling**: Comprehensive forms with validation for demo requests, contact, and job applications
- **Email Integration**: Automated email notifications for business inquiries
- **Blog System**: Multi-language blog with categorization and search functionality
- **Corporate Pages**: About, solutions, sectors, references, and career pages

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Build Tools**: Vite, TypeScript, ESBuild for production builds
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI Components**: Radix UI primitives, Lucide React icons, Class Variance Authority

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL
- **Validation**: Zod for schema validation
- **Email Service**: Nodemailer for SMTP email delivery
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Development Dependencies
- **Replit Integration**: Vite plugins for Replit development environment
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel for image/content carousels
- **Command Palette**: CMDK for search and command interfaces

### Dynamic Content Management
- **Admin Panel**: React-based admin interface for content management
- **Database Storage**: PostgreSQL for dynamic content and team information
- **Real-time Updates**: Changes reflect immediately across the application

### Third-party Services (Configuration Required)
- **SMTP Email Provider**: Gmail or custom SMTP server for email delivery
- **Database Hosting**: Neon Database or PostgreSQL hosting service
- **Image Hosting**: Unsplash for placeholder images (production should use CDN)
- **Dynamic Hosting**: Replit Deployments or similar Node.js hosting service

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_HOST`: Email server hostname
- `SMTP_PORT`: Email server port
- `SMTP_USER`: Email authentication username
- `SMTP_PASS`: Email authentication password

### Dynamic Architecture
The application is fully dynamic with real-time content management:
- React-based frontend with server-side rendering capabilities
- PostgreSQL database for all content and configuration
- Admin panel for real-time content updates
- API-driven architecture for seamless data management
- SEO-optimized dynamic meta tags and content structure