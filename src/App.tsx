import { Routes, Route, Link } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Home } from './modules/Home.tsx';

function App() {
  return (
    <>
      <Header />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className={'container'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
