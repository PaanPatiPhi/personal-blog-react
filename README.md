# Personal Blog React Application

A modern, feature-rich personal blog application built with React, TypeScript, and Vite. This project demonstrates a complete blog platform with authentication, content management, and notification system.

## 🚀 Features

### **Core Features**
- **📝 Blog Management** - Create, read, update, delete articles
- **🔐 Authentication** - Login, signup, password reset with Supabase
- **👤 User Profiles** - Profile management with image upload
- **🔔 Notifications** - Real-time notifications for comments and likes
- **🔍 Search** - Advanced search with suggestions
- **📂 Categories** - Category-based content organization
- **💬 Comments** - Comment system with nested replies
- **❤️ Likes** - Article like/unlike functionality

### **Admin Features**
- **🎛️ Admin Dashboard** - Complete admin interface
- **📊 Content Management** - Manage posts, categories, users
- **🔔 Notification Center** - View and manage notifications
- **👥 User Management** - Profile and user administration
- **📈 Analytics Ready** - Structure for analytics integration

### **Technical Features**
- **🎨 Modern UI** - Responsive design with Tailwind CSS
- **🔒 Secure Auth** - Supabase authentication with JWT
- **📱 Mobile Responsive** - Works on all devices
- **⚡ Fast Performance** - Optimized with Vite
- **🔧 Type Safe** - Full TypeScript implementation
- **🎯 SEO Ready** - Meta tags and structured data

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library
- **React Router** - Client-side routing

### **Backend & Services**
- **Supabase** - Authentication and database
- **REST API** - Custom backend integration
- **JWT Authentication** - Secure token-based auth
- **File Upload** - Image upload to cloud storage

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality
- **Vercel** - Deployment platform

## 📁 Project Structure

```
personal-blog-react/
├── 📁 src/
│   ├── 📁 features/          # Feature-based architecture
│   │   ├── 📁 admin-page/     # Admin dashboard
│   │   ├── 📁 article/        # Blog articles
│   │   ├── 📁 auth/           # Authentication
│   │   ├── 📁 profile/        # User profiles
│   │   ├── 📁 search/         # Search functionality
│   │   └── 📁 viewpostpage/   # Single post view
│   ├── 📁 lib/               # Core libraries
│   │   ├── 📄 api.ts          # API configuration
│   │   ├── 📄 notifications.ts # Notification service
│   │   └── 📄 supabase.ts     # Supabase config
│   ├── 📁 shared/            # Shared components
│   │   └── 📁 layout/          # Layout components
│   └── 📁 types/             # TypeScript definitions
├── 📁 public/                # Static assets
├── 📄 package.json           # Dependencies
└── 📄 README.md              # This file
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account (for auth/database)

### **Installation**
```bash
# Clone the repository
git clone https://github.com/PaanPatiPhi/personal-blog-react.git
cd personal-blog-react

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_api_base_url
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

## 🔧 Development

### **Code Style**
- **Feature-based architecture** - Code organized by features
- **Custom hooks** - Reusable logic with hooks
- **TypeScript strict** - Type safety throughout
- **Consistent naming** - Clear, descriptive names
- **Component composition** - Reusable UI components

### **Key Patterns**
- **Authentication Context** - Centralized auth state
- **API Interceptors** - Automatic token management
- **Error Boundaries** - Graceful error handling
- **Loading States** - Consistent loading indicators
- **Responsive Design** - Mobile-first approach

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Other Platforms**
The build outputs to `dist/` directory and can be deployed to any static hosting platform.

## 🎯 Key Features Explained

### **Authentication System**
- **Supabase Integration** - Secure auth with email/password
- **JWT Tokens** - Automatic token management
- **Session Persistence** - Login state maintained
- **Protected Routes** - Auth-gated content
- **Password Reset** - Email-based password recovery

### **Notification System**
- **Real-time Updates** - Instant notifications
- **Multiple Types** - Comments, likes, follows
- **Read Status** - Track notification engagement
- **Navigation Links** - Direct links to content
- **Auto-refresh** - Live notification updates

### **Content Management**
- **Rich Editor** - Markdown support
- **Image Upload** - Cloud storage integration
- **Category System** - Organized content
- **Draft/Publish** - Content workflow
- **SEO Meta** - Search engine optimization

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Form validation throughout
- **XSS Protection** - Safe content rendering
- **CSRF Protection** - Secure API calls
- **Environment Variables** - Secure configuration

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Progressive Enhancement** - Enhanced on larger screens
- **Touch Friendly** - Mobile-optimized interactions
- **Flexible Layout** - Adapts to all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Supabase** - For the backend-as-a-service platform
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For the hosting platform

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
