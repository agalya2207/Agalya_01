import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import LoadingScreen from './components/LoadingScreen';

function Root() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <React.StrictMode>
      {showLoading ? (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      ) : (
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
