import { useEffect } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import './error-view.scss';

type ErrorProps = {
  message: string;
};

export const ErrorView = ({ message }: ErrorProps) => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'LOAD_ERROR', payload: null });
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="error-snackbar">
      <div className="error-snackbar__content">{message}</div>
    </div>
  );
};
