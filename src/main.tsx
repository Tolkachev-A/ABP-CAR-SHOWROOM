import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/global.scss';
import App from './App.tsx';
import { AppProvider } from './contexts/AppProvider';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>
);
