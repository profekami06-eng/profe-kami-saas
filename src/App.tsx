import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedAdminRoute } from './components/auth/ProtectedAdminRoute';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta pública principal: Landing Page con admisiones y cumplimiento SIC */}
          <Route path="/" element={<LandingPage />} />

          {/* Ruta de autenticación: Acceso exclusivo para el Super Administrador */}
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta protegida: Panel de Super Administrador con estricta regla de email */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* Fallback de redirección */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
