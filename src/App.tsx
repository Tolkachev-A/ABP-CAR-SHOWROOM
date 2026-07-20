import { Routes, Route } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Home } from './modules/Home.tsx';
import { ErrorView } from '@components/UI/Error/ErrorView.tsx';
import { useAppContext } from '@/hooks/useAppContext.ts';

function App() {
  const { state } = useAppContext();
  const { error } = state;

  return (
    <>
      <Header />

      <main className={'container'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>

        {error && <ErrorView message={`Error: ${error}`} />}
      </main>
    </>
  );
}

export default App;
