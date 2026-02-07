# 🚢 Port Access Management System

A modern, professional port logistics management system built with React, TypeScript, and Tailwind CSS. This application provides real-time tracking, appointment management, and AI-powered assistance for port operations.

## ✨ Features

### 📊 Carrier Dashboard
- **Real-time Statistics**: Track on-time rates, missed slots, and pending appointments
- **Active Appointments**: View upcoming gate entry slots with detailed information
- **Live Tracking**: Monitor truck locations and estimated arrival times
- **Recent History**: Complete audit trail of all appointments and activities
- **Gate Entry Rules**: Clear display of compliance requirements

### 📅 Appointment Management
- **Confirmed Appointments**: Manage all active gate entry slots
- **QR Code Generation**: Automatic QR codes for quick gate scanning
- **Smart Notifications**: SMS, WhatsApp, and email alerts
- **Status Tracking**: Real-time appointment status updates
- **Gate Entry Policy**: Integrated policy guidelines

### 🚛 New Pickup Request
- **Multi-step Wizard**: Intuitive container and driver information input
- **Live Summary**: Real-time processing time estimates
- **Container Validation**: Ensure manifest compliance
- **Preferred Time Windows**: Flexible scheduling options
- **Draft Saving**: Save incomplete requests for later

### 🤖 AI Assistant
- **Contextual Help**: Intelligent assistance for gate throughput analysis
- **Quick Suggestions**: Pre-populated queries for common tasks
- **Real-time Analysis**: Predict congestion and optimize operations
- **Floating Interface**: Non-intrusive, always-available assistant

### 🎨 Design Highlights
- **Modern UI**: Clean, professional interface with glassmorphism effects
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly dark mode with accent colors
- **Smooth Animations**: Polished transitions and interactions
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **React 19** - Latest React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with custom design tokens
- **Vite 7** - Lightning-fast build tool and dev server
- **React Router 7** - Client-side routing
- **Lucide React** - Beautiful, consistent icons

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The application will be available at `http://localhost:5173/`

## 📁 Project Structure

```
port-access-ui/
├── src/
│   ├── Components/
│   │   ├── Ai/                     # AI Assistant component
│   │   ├── Appointment/            # Appointment management
│   │   ├── CarrierDashboard/       # Main dashboard
│   │   ├── Layouts/                # Layout components (Topbar)
│   │   ├── NewPickupRequest/       # Pickup request wizard
│   │   ├── Trackmap/               # Live tracking map
│   │   └── common/                 # Shared components
│   ├── assets/                     # Static assets (images, icons)
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles & Tailwind imports
├── public/                         # Public static files
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.ts                  # Vite configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#0ea5e9) - Actions, highlights
- **Success**: Emerald (#10b981) - Confirmations, positive states
- **Warning**: Amber (#f59e0b) - Alerts, important notices
- **Danger**: Red (#ef4444) - Errors, cancellations
- **Dark**: Custom dark shades for backgrounds

### Typography
- **Font Family**: System UI font stack (ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto)
- **Font Weights**: Regular (400), Semibold (600), Bold (700), Extrabold (800), Black (900)

### Spacing
- Consistent 4px base unit
- Custom spacing scale for optimal layout

### Components
- Rounded corners: 8px (sm), 12px (md), 16px (lg), 20px (xl)
- Shadows: Multiple levels for depth and hierarchy
- Borders: 1-2px with varied opacity

## 🔄 Routing

- `/` - Redirects to Carrier Dashboard
- `/CarrierDashboard` - Main dashboard with statistics and tracking
- `/pending` - Confirmed appointments management
- `/control` - New pickup request wizard

## 🎯 Key Improvements Made

### 1. **Migrated to Tailwind CSS**
   - Removed all separate CSS files
   - Consistent utility-first styling
   - Better maintainability and smaller bundle size

### 2. **Enhanced Responsiveness**
   - Mobile-first approach
   - Breakpoint-based layouts
   - Touch-friendly controls

### 3. **Improved Performance**
   - Optimized component rendering
   - Lazy loading where appropriate
   - Efficient state management

### 4. **Better Code Organization**
   - TypeScript for type safety
   - Component-based architecture
   - Reusable utility components

### 5. **Professional UI/UX**
   - Consistent design language
   - Smooth animations
   - Clear visual hierarchy
   - Accessibility features

## 🎨 Customization

### Tailwind Configuration
Edit `tailwind.config.js` to customize:
- Colors and theme
- Custom animations
- Extended utilities
- Design tokens

### Environment Variables
Create a `.env` file for configuration:
```env
VITE_API_URL=your_api_url
VITE_APP_TITLE=Port Access Management
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- Design inspired by modern logistics platforms
- Icons from Lucide React
- UI patterns from best practices in dashboard design

## 📞 Support

For support, please contact the development team or open an issue.

---

**Built with ❤️ for modern port operations**
