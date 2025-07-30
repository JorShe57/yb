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
- **Provider**: SendGrid with API key authentication
- **Notification Flow**: Automatic email alerts to business owner when quotes are submitted
- **Configuration**: Environment-based email addresses (sender and recipient)
- **Template**: HTML-formatted emails with customer details and submission timestamp

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
- **SendGrid**: Email delivery service (SENDGRID_API_KEY required)

### Optional Configurations
- **NOTIFICATION_EMAIL**: Business owner email for quote notifications
- **SENDER_EMAIL**: From address for outgoing emails (must be verified in SendGrid)

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
SENDGRID_API_KEY=SG.xxx       # Required: SendGrid API key
NOTIFICATION_EMAIL=business@example.com  # Optional: Quote notification recipient
SENDER_EMAIL=noreply@example.com        # Optional: Email sender address
```

### Production Considerations
- Static file serving with caching headers
- Session persistence with PostgreSQL storage
- Email verification required for sender addresses
- CORS and security headers configured
- Error logging and monitoring recommended

### Development Workflow
- `npm run dev`: Start development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Run production server
- `npm run db:push`: Apply database schema changes

The application is designed for easy deployment on platforms like Replit, Heroku, or Vercel with minimal configuration requirements.