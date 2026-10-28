import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Auto-register service worker for silent background updates and full offline capabilities
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('New TSF Coaching update available, updating cache...');
  },
  onOfflineReady() {
    console.log('TSF Coaching is ready to work offline.');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
