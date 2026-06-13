import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Briefcase, Calendar } from 'lucide-react';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        setProfile(data || null);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const defaultProfile = {
    full_name: 'Agalya',
    title: 'Lead Software Engineer',
    bio: 'I am a creative full stack web developer focused on building interactive, high-fidelity user experiences. With over 5 years of industry experience, I specialize in architecting React applications, crafting responsive layout templates, Node.js backend pipelines, and relational database systems.',
    skills: ['React', 'JavaScript', 'HTML5 & CSS3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Git & CI/CD', 'REST APIs', 'UI/UX Prototyping']
  };

  const activeProfile = profile || defaultProfile;

  const timeline = [
    {
      year: '2024 - Present',
      role: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      desc: 'Architecting scalable web applications using React, Next.js, and Node.js. Directing a team of front-end developers to ship enterprise software assets.'
    },
    {
      year: '2021 - 2024',
      role: 'Full Stack Engineer',
      company: 'Innovate Studio',
      desc: 'Engineered web applications utilizing React and PostgreSQL. Implemented key features resulting in a 40% loading speed optimization.'
    },
    {
      year: '2019 - 2021',
      role: 'Associate Developer',
      company: 'Digital Agency',
      desc: 'Developed responsive user interfaces and single page apps. Coordinated with design teams to translate Figma mockups into code.'
    }
  ];

  return (
    <div className="fade-in" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Intro section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium gradient-text" style={{ marginBottom: '8px' }}>About Me</h1>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '20px' }}>
            {activeProfile.title}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: '24px', lineHeight: 1.7 }}>
            {activeProfile.bio}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            Core Skills
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {activeProfile.skills?.map(skill => (
              <span
                key={skill}
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  color: 'var(--color-primary)',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: '6px'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h2 className="title-medium" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Briefcase color="var(--color-primary)" /> Career Timeline
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '2px solid var(--color-border)', paddingLeft: '24px', marginLeft: '12px', gap: '40px' }}>
          {timeline.map((item, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {/* timeline point dot */}
              <div style={{
                position: 'absolute',
                left: '-33px',
                top: '6px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                border: '4px solid var(--color-bg)',
                boxShadow: '0 0 0 2px var(--color-primary-glow)'
              }}></div>
              
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Calendar size={14} /> {item.year}
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.role}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                {item.company}
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
