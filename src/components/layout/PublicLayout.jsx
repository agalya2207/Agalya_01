
import { Outlet, useLocation } from 'react-router-dom';
import CustomCursor from '../common/CustomCursor';
import FloatingNav from './FloatingNav';
import SpaceBackground from './SpaceBackground';
import SocialStack from './SocialStack';

const PublicLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Home page renders its own background, nav, and socials inside Home.jsx
  if (isHome) {
    return (
      <>
        <Outlet />
        <CustomCursor />
      </>
    );
  }

  // All other public pages get the shared space background, floating nav, and social stack
  return (
    <>
      <SpaceBackground />
      <FloatingNav />
      <SocialStack />
      <div className="space-page-content">
        <style>{`
          .space-page-content {
            position: relative;
            z-index: 10;
            min-height: 100vh;
            padding: ${(location.pathname === '/projects' || location.pathname === '/contact') ? '0' : '100px 60px 60px 60px'};
            color: #ffffff;
            font-family: 'Poppins', 'Inter', sans-serif;
            box-sizing: border-box;
            overflow-y: auto;
          }
          @media (max-width: 768px) {
            .space-page-content {
              padding: ${(location.pathname === '/projects' || location.pathname === '/contact') ? '0' : '100px 24px 60px 24px'};
            }
          }
          @media (max-width: 480px) {
            .space-page-content {
              padding: ${(location.pathname === '/projects' || location.pathname === '/contact') ? '0' : '80px 16px 60px 16px'};
            }
          }
        `}</style>
        <Outlet />
      </div>
      <CustomCursor />
    </>
  );
};

export default PublicLayout;
