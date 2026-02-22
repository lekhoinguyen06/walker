import { createRoot } from 'react-dom/client';
import './style.css';
import '@repo/ui/styles.css';
import { Header } from '@repo/ui/header';

const App = () => (
  <div className='w-screen h-screen p-0'>
    <Header />
  </div>
);

createRoot(document.getElementById('app')!).render(<App />);
