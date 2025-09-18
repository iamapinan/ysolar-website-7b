# Y Solar Website - System Architecture & Components

## Overview
Y Solar is a comprehensive corporate website for a solar energy company specializing in solar rooftop systems, EV chargers, and maintenance services. The system includes both a public-facing website and an admin CMS for content management.

## Core Features

### 🌐 Public Website
- **Bilingual Support**: Thai/English translation system with dynamic language switching
- **Responsive Design**: Mobile-first approach with modern, clean aesthetics
- **Service Showcase**: Detailed pages for Solar Rooftop, EV Charger, and Maintenance services
- **Project Portfolio**: Case studies with before/after comparisons and ROI data
- **News & Knowledge Hub**: Articles categorized by News, Knowledge, Tips, and CSR
- **Contact & Quote System**: Integrated contact forms and quote request functionality

### 🔧 Admin CMS System
- **Dashboard**: Overview of key metrics, recent activities, and pending tasks
- **Content Management**: CRUD operations for services, projects, articles, and team members
- **Contact Management**: View and manage contact form submissions and quote requests
- **User Management**: Admin user authentication and role management

## Technical Architecture

### Frontend Components

#### Core Layout Components
- `components/navigation.tsx` - Main navigation with language switcher and quote modal
- `components/footer.tsx` - Site footer with company information and links
- `components/language-switcher.tsx` - Language toggle functionality
- `components/quote-modal.tsx` - Quick quote request modal

#### Admin Components
- `components/admin/sidebar.tsx` - Admin navigation sidebar
- `components/admin/header.tsx` - Admin header with user controls
- Admin pages for managing all content types

#### Page Structure
\`\`\`
app/
├── page.tsx                 # Homepage with hero, services, and CTA
├── about/page.tsx          # Company information, vision, mission, team
├── services/page.tsx       # Detailed service descriptions
├── projects/page.tsx       # Portfolio and case studies
├── news/page.tsx           # Articles and knowledge base
├── news/[slug]/page.tsx    # Individual article pages
├── contact/page.tsx        # Contact form and company details
├── quote/page.tsx          # Dedicated quote request page
└── admin/                  # Admin CMS pages
    ├── page.tsx           # Dashboard
    ├── services/page.tsx  # Service management
    ├── projects/page.tsx  # Project management
    └── contacts/page.tsx  # Contact management
\`\`\`

### Backend API Routes
- `app/api/contact/route.ts` - Handle contact form submissions
- `app/api/quote/route.ts` - Process quote requests

### Database Schema
Located in `scripts/` folder:
- `01-create-database-schema.sql` - Complete database structure
- `02-seed-initial-data.sql` - Sample data for development

#### Database Tables
- `companies` - Company information and settings
- `services` - Service offerings (Solar, EV, Maintenance)
- `projects` - Portfolio projects and case studies
- `articles` - News and knowledge base content
- `team_members` - Company team information
- `contacts` - Contact form submissions
- `quote_requests` - Quote request submissions
- `users` - Admin user accounts

### Internationalization System

#### Translation Framework
- `lib/translations.ts` - Translation dictionaries for Thai/English
- `lib/language-context.tsx` - React context for language state management
- Persistent language selection using localStorage
- Dynamic content switching without page reload

#### Translation Coverage
- Navigation menus and buttons
- Form labels and placeholders
- Service descriptions and features
- Contact information and addresses
- Admin interface labels
- Error messages and notifications

## Design System

### Color Palette
- **Primary Green**: `#28a745` - Represents clean energy and sustainability
- **Accent Blue**: `#0072B2` - Professional and trustworthy
- **Neutrals**: White, light gray, and dark gray variants
- **System Colors**: Success, warning, and error states

### Typography
- **Headings**: Inter font family with weights 400, 600, 700
- **Body Text**: Inter font family with weights 400, 500
- **Responsive Scaling**: Mobile-first with appropriate size jumps

### Layout Principles
- **Mobile-First**: Responsive design starting from mobile screens
- **Generous Whitespace**: Minimum 16px spacing between sections
- **Consistent Alignment**: Left-aligned content with centered CTAs
- **Flexbox Priority**: Primary layout method for most components

## Key Features Implementation

### Quote Request System
1. **Quick Quote Modal**: Accessible from navigation and CTA buttons
2. **Dedicated Quote Page**: Comprehensive form with service selection
3. **Admin Management**: View and respond to quote requests
4. **Email Integration**: Automatic notifications for new requests

### Content Management
1. **Rich Text Editor**: For articles and service descriptions
2. **Image Upload**: Project photos and team member portraits
3. **SEO Optimization**: Meta tags and structured data
4. **Publication Control**: Draft/published status for all content

### Performance Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Caching Strategy**: Static generation where possible

## Development Workflow

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run database migrations
5. Start development server: `npm run dev`

### Database Setup
1. Execute `scripts/01-create-database-schema.sql`
2. Run `scripts/02-seed-initial-data.sql` for sample data
3. Configure database connection in environment variables

### Environment Variables
\`\`\`
DATABASE_URL=your_database_connection_string
NEXT_PUBLIC_SITE_URL=your_site_url
ADMIN_EMAIL=admin@ysolar.com
\`\`\`

## Deployment Considerations

### Production Checklist
- [ ] Database migrations executed
- [ ] Environment variables configured
- [ ] Image assets optimized
- [ ] Translation files complete
- [ ] Admin accounts created
- [ ] Contact form testing
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags implemented

### Monitoring & Analytics
- Contact form submission tracking
- Quote request conversion rates
- Page performance metrics
- User language preferences
- Admin activity logging

## Future Enhancements

### Planned Features
- **Customer Portal**: Client login for project tracking
- **Payment Integration**: Online payment for services
- **Live Chat**: Real-time customer support
- **Blog Comments**: User engagement on articles
- **Social Media Integration**: Content sharing and feeds
- **Advanced Analytics**: Detailed user behavior tracking

### Technical Improvements
- **API Rate Limiting**: Prevent abuse of contact forms
- **Image CDN**: Faster image delivery
- **Search Functionality**: Site-wide content search
- **PWA Features**: Offline functionality and app-like experience
- **Automated Testing**: Unit and integration tests
- **CI/CD Pipeline**: Automated deployment workflow

## Support & Maintenance

### Regular Tasks
- Content updates through admin CMS
- Database backups and maintenance
- Security updates and patches
- Performance monitoring and optimization
- Translation updates and additions

### Contact Information
For technical support or questions about this system, contact the development team or refer to the project documentation.

### R2
เชื่อมต่อและเก็บข้อมูลใน cloudflare r2
API: @https://603cdeb5c9b9c8faedcdec45863bb3b1.r2.cloudflarestorage.com/ysolar-data 
Public URL: @https://pub-4315e933e6e445138c2fb694e184c15a.r2.dev 
R2 Token: mjCBe0Q7bwZbL6lJo06P9sODQrPjAVaVpzcA7XEl
Access Key ID: 5682a17b2985c0d93486071efaefa330
Secret Access Key: 813ad423d799ef35ec9dd729926848c3de9c3507f8df50375c30b58a8f407c70
