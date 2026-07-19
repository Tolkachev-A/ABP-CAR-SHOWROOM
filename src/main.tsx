import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles/global.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
