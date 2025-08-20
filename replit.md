# Yard Bros Landscaping Website

## Overview

This is a modern, responsive single-page website for Yard Bros Landscaping built with React, TypeScript, and Node.js. The application serves as a professional landscaping business website featuring quote requests, service showcases, and customer engagement tools. It uses a full-stack architecture with email notifications and database storage for quote management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Animation Library**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)
- **Email Service**: SendGrid for transactional emails
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions

### Key Components

#### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Quote Requests Table**: Customer quote submissions with contact details, service type, and timestamps
- **Migration System**: Drizzle Kit for database schema management

#### Email System
- **Provider**: EmailJS for client-side email sending
- **Notification Flow**: Direct email alerts to business owner when quotes are submitted
- **Configuration**: Environment variables for EmailJS service, template, and public key
- **Template**: Customizable EmailJS template with customer details and submission timestamp
- **Benefits**: No server-side configuration, reliable delivery, free tier available

#### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Service flip cards, smooth scrolling, animated sections
- **Quote Form**: Multi-field form with validation and success feedback
- **Calculator Tools**: Topsoil calculation utilities
- **Chat Integration**: External chat widget integration
- **Service Showcase**: Interactive service cards with hover effects

## Data Flow

1. **Quote Submission Flow**:
   - User fills out quote form on frontend
   - Form validation using Zod schema
   - Data sent to `/api/quotes` endpoint
   - Server validates and stores in PostgreSQL
   - Email notification sent to business owner via SendGrid
   - Success response returned to user

2. **Content Display Flow**:
   - Static assets served from public directory
   - React components render with server-side data
   - TanStack Query manages API state and caching
   - Animations trigger based on scroll position

## External Dependencies

### Required Services
- **Neon Database**: PostgreSQL hosting (DATABASE_URL required)
- **EmailJS**: Email delivery service (VITE_EMAILJS_* variables required)

### EmailJS Configuration
- **VITE_EMAILJS_SERVICE_ID**: EmailJS service identifier
- **VITE_EMAILJS_TEMPLATE_ID**: EmailJS email template identifier  
- **VITE_EMAILJS_PUBLIC_KEY**: EmailJS public key for authentication

### Development Dependencies
- **Replit Integration**: Banner and cartographer plugins for development
- **Font Loading**: Google Fonts (Cinzel and Open Sans)
- **Icon Library**: Font Awesome and Lucide React icons

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations run with `db:push` command

### Environment Variables
```
DATABASE_URL=postgresql://...  # Required: Neon database connection
VITE_EMAILJS_SERVICE_ID=service_xxx     # Required: EmailJS service ID
VITE_EMAILJS_TEMPLATE_ID=template_xxx   # Required: EmailJS template ID
VITE_EMAILJS_PUBLIC_KEY=user_xxx        # Required: EmailJS public key
PORT=5000                     # Optional: Server port (defaults to 5000)
NODE_ENV=production           # Set automatically if not defined in production
```

### Production Considerations
- Static file serving with caching headers
- Session persistence with PostgreSQL storage
- Email verification required for sender addresses
- CORS and security headers configured
- Enhanced error logging and monitoring with detailed startup error handling
- Graceful shutdown handling for SIGTERM and SIGINT signals
- Server listens explicitly on 0.0.0.0 for containerized deployments
- Comprehensive error handling for common deployment issues (DATABASE_URL, SENDGRID_API_KEY)

### Recent Deployment Fixes (August 2025)
Applied the following deployment improvements:
- Enhanced server startup error handling with try-catch blocks
- Automatic NODE_ENV=production setting if not defined
- Improved error logging with stack traces and common issue detection  
- Added graceful shutdown handlers for production environments
- Enhanced server listen configuration with explicit host binding
- Added startup success confirmation logging

### Development Workflow
- `npm run dev`: Start development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Run production server
- `npm run db:push`: Apply database schema changes

The application is designed for easy deployment on platforms like Replit, Heroku, or Vercel with minimal configuration requirements.