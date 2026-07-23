# Car Showroom Application

Modern React application for browsing and managing vehicle listings in a car showroom.

## 🛠 Technologies

- **React 19** - Latest React version
- **TypeScript** - Type-safe development
- **Vite** - Build tool with HMR
- **SCSS/SASS** - Styling with BEM methodology
- **React Router v8** - Client-side routing
- **Context API + useReducer** - State management

## 🏗️ Project Structure

The application follows a modular architecture with clear separation of concerns:

- **API Layer** - Vehicle data fetching and external API integration
- **Context Management** - Global state for loading, error handling, and vehicle data
- **Routing** - Page navigation and URL management
- **Constants & Types** - Shared definitions and TypeScript interfaces
- **User Interface** - Reusable components for vehicle display, forms, and navigation
- **Styling System** - Consistent design tokens with responsive layouts
- **Utilities** - Validation, formatting, and helper functions

## 🔧 Development

### Prerequisites
- Node.js 22+
- npm or yarn package manager

### Installation
```bash
npm install
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linters
npm run lint
npm run lint:styles

# Format code
npm run format

# Preview production build
npm run preview
```

## 🚀 Deployment

### GitHub Pages Deployment
This project is configured for automatic deployment to GitHub Pages.

1. **Push to GitHub** - Ensure your code is pushed to a GitHub repository
2. **Enable GitHub Pages** - Go to repository Settings → Pages → Select GitHub Actions
3. **Automatic Deployment** - Push to main/master branch triggers automatic deployment

### Configuration
- **Base Path**: `/ABP-CAR-SHOWROOM/` configured in `vite.config.ts`
- **GitHub Actions**: Workflow defined in `.github/workflows/deploy.yml`
- **Router**: Uses HashRouter for GitHub Pages compatibility

### Deployment URL
After deployment, the application will be available at:
```
https://your-username.github.io/ABP-CAR-SHOWROOM/
```

## 📄 License

This project is for demonstration purposes.
