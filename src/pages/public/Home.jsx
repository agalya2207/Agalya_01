import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('featured', true)
          .limit(3);
        if (error) throw error;
        setFeaturedProjects(data || []);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '80px', padding: '40px 0' }}>
      {/* Hero Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '40px auto 0', textAlign: 'center', alignItems: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '99px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600 }}>
          <Sparkles size={14} /> Open for Work
        </div>
        <h1 className="title-large">
          Crafting Digital Experiences with <span className="gradient-text">Precision & Passion</span>
        </h1>
        <p className="subtitle" style={{ fontSize: '1.25rem' }}>
          I am a Full Stack Developer specializing in building high-performance web applications with clean, modern design architectures.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
          <Link to="/projects">
            <Button variant="primary">
              View My Work <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary">Contact Me</Button>
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 className="title-medium" style={{ marginBottom: '8px' }}>Featured Projects</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>A selection of recent design & development works.</p>
          </div>
          <Link to="/projects" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            All projects <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><div className="spinner"></div></div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid-cols-3">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'}
                tags={project.tags}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            <p>No featured projects found. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
