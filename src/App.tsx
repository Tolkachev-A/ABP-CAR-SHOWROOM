import { Routes, Route, Link } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header.tsx';

function App() {
  return (
    <>
      <Header />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </>
  );
}

export default App;
