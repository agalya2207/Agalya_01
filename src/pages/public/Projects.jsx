import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { ExternalLink, Github, Search } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const allTags = ['All', ...new Set(projects.flatMap(p => p.tags || []))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                          project.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === 'All' || (project.tags && project.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="fade-in" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h1 className="title-medium gradient-text">My Projects</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          A curation of web applications, design templates, and technical experiments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                background: selectedTag === tag ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedTag === tag ? '#fff' : 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'var(--transition-smooth)'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ width: '100%', paddingLeft: '40px' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-dim)' }} />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><div className="spinner"></div></div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'}
              tags={project.tags}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <p>No projects match your current filters.</p>
        </div>
      )}

      {/* Project Details Modal */}
      <Modal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title || ''}
      >
        {activeProject && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <img
              src={activeProject.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'}
              alt={activeProject.title}
              style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <p style={{ color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}>
              {activeProject.content || activeProject.description}
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {activeProject.tags?.map(t => (
                <span 
                  key={t} 
                  style={{ 
                    background: 'rgba(139, 92, 246, 0.1)', 
                    color: 'var(--color-primary)', 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    padding: '4px 8px', 
                    borderRadius: '4px' 
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              {activeProject.live_url && (
                <a href={activeProject.live_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">
                    <ExternalLink size={16} /> Live Demo
                  </Button>
                </a>
              )}
              {activeProject.github_url && (
                <a href={activeProject.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">
                    <Github size={16} /> Repository
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Projects;
