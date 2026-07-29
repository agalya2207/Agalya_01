import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('../pages/public/Home'));
const Projects = lazy(() => import('../pages/public/Projects'));
const Contact = lazy(() => import('../pages/public/Contact'));
const About = lazy(() => import('../pages/public/About'));
const Login = lazy(() => import('../pages/public/Login'));

// Admin Pages (Lazy Loaded)
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const ManageProjects = lazy(() => import('../pages/admin/ManageProjects'));
const ManageMessages = lazy(() => import('../pages/admin/ManageMessages'));
const Profile = lazy(() => import('../pages/admin/Profile'));

const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    color: '#2dd4bf'
  }}>
    <div>Loading...</div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Pages (Guarded) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/projects" element={<ManageProjects />} />
            <Route path="/admin/messages" element={<ManageMessages />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
