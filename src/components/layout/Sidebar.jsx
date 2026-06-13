import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderGit, Mail, UserCog, Globe, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="admin-sidebar">
      <div>
        <div className="navbar-logo" style={{ marginBottom: '10px' }}>
          CONSOLE
        </div>
        <ul className="admin-sidebar-menu">
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "admin-sidebar-link active" : "admin-sidebar-link"}>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/projects" className={({ isActive }) => isActive ? "admin-sidebar-link active" : "admin-sidebar-link"}>
              <FolderGit size={18} /> Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/messages" className={({ isActive }) => isActive ? "admin-sidebar-link active" : "admin-sidebar-link"}>
              <Mail size={18} /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/profile" className={({ isActive }) => isActive ? "admin-sidebar-link active" : "admin-sidebar-link"}>
              <UserCog size={18} /> Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/" className="admin-sidebar-link">
          <Globe size={18} /> View Site
        </Link>
        <button 
          onClick={handleLogout} 
          className="admin-sidebar-link" 
          style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
