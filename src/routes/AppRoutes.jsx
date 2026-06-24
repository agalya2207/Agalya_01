import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Home from '../pages/public/Home';
import Projects from '../pages/public/Projects';
import Contact from '../pages/public/Contact';
import About from '../pages/public/About';
import Login from '../pages/public/Login';
import Skills from '../pages/public/Skills';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageMessages from '../pages/admin/ManageMessages';
import Profile from '../pages/admin/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
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
  );
};

export default AppRoutes;
