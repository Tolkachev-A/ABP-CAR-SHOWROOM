import { Routes, Route, Navigate } from 'react-router';
import './App.css';
import { Header } from './components/Header/Header.tsx';
import { Home } from './modules/Home.tsx';
import { VehicleDetail } from './modules/VehicleDetail.tsx';
import { ErrorView } from '@components/UI/Error/ErrorView.tsx';
import { useAppContext } from '@/hooks/useAppContext.ts';
import { ROUTES } from '@/enums/routes.ts';

function App() {
  const { state } = useAppContext();
  const { error } = state;

  return (
    <>
      <Header />

      <main className={'container'}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.VEHICLE_DETAIL} element={<VehicleDetail />} />
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>

        {error && <ErrorView message={`Error: ${error}`} />}
      </main>
    </>
  );
}

export default App;
