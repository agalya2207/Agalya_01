import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Lightbulb, Rocket, Settings } from 'lucide-react';
import placeholderImg from '../../assets/react.svg'; // temporary placeholder image

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Scroll to hash after data loads
  useEffect(() => {
    if (!loading && location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location, loading]);

  // Fetch profile (fallback to default)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();
        if (error && error.code !== 'PGRST116') throw error;
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const defaultProfile = {
    bio: 'I am a creative full stack web developer focused on building interactive, high‑fidelity user experiences. With over 5 years of industry experience, I specialize in architecting React applications, crafting responsive layout templates, Node.js backend pipelines, and relational database systems.',
  };

  const activeProfile = profile || defaultProfile;

  return (
    <div className="fade-in" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Intro – Two‑column layout */}
      <section className="about-two-column">
        <style>{`
          .about-two-column {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 40px;
            flex-wrap: wrap;
            min-height: 60vh;
          }
          .about-left { flex: 0 0 40%; }
          .about-right { flex: 0 0 60%; }
          .about-heading {
            font-size: 2rem;
            font-weight: 700;
            color: var(--color-primary);
            margin: 0;
            position: relative;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .about-heading::after {
            content: '';
            display: block;
            width: 60px;
            height: 2px;
            background: var(--color-primary);
            margin-top: 4px;
          }
          .icon-text-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-top: 16px;
          }
          .icon-text-row svg { flex-shrink: 0; color: var(--color-primary); }
          .icon-text-row p { margin: 0; color: var(--color-text-muted); }
          .about-photo-frame {
            position: relative;
            width: 260px;
            height: 340px;
            border: 2px solid var(--color-primary);
          }
          .about-photo-frame::before,
          .about-photo-frame::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            border: 2px solid var(--color-primary);
          }
          .about-photo-frame::before { top: -6px; left: -6px; border-right: none; border-bottom: none; }
          .about-photo-frame::after { bottom: -6px; right: -6px; border-left: none; border-top: none; }
          .about-photo { width: 100%; height: 100%; object-fit: cover; }
          .spin { animation: spin 4s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        {/* LEFT – Photo */}
        <div className="about-left">
          <div className="about-photo-frame">
            <img src={placeholderImg} alt="Profile" className="about-photo" />
          {/* If you add a real photo, replace placeholderImg import with the correct path */}
          </div>
        </div>
        {/* RIGHT – Text */}
        <div className="about-right">
          <h1 className="about-heading">
            <Settings size={20} className="spin" />
            ABOUT ME
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '24px' }}>
            {activeProfile.bio}
          </p>
          <div className="icon-text-row">
            <Lightbulb size={20} />
            <p>I love turning ideas into interactive experiences.</p>
          </div>
          <div className="icon-text-row">
            <Rocket size={20} />
            <p>Passionate about launching performant web applications.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
