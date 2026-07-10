import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import ProjectForm from '../../components/forms/ProjectForm';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { Plus, Edit2, Trash2, FolderGit, Sparkles } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      alert(err.message || 'Failed to delete project.');
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="title-medium gradient-text">Manage Projects</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Create, update, or remove portfolio showcase items.
          </p>
        </div>
        <Button variant="primary" onClick={handleCreateClick}>
          <Plus size={18} /> Add Project
        </Button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner"></div></div>
      ) : projects.length > 0 ? (
        <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr 
                style={{ 
                  borderBottom: '1px solid var(--color-border)', 
                  color: 'var(--color-text-muted)', 
                  fontSize: '0.85rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                <th style={{ padding: '16px 24px' }}>Project</th>
                <th style={{ padding: '16px' }}>Tags</th>
                <th style={{ padding: '16px', textAlign: 'center' }}>Featured</th>
                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr 
                  key={project.id} 
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
                        <img 
                          src={project.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=150&auto=format&fit=crop'} 
                          alt="" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{project.title}</p>
                        <p 
                          style={{ 
                            color: 'var(--color-text-muted)', 
                            fontSize: '0.8rem', 
                            display: '-webkit-box', 
                            WebkitLineClamp: 1, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden', 
                            maxWidth: '200px' 
                          }}
                        >
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.tags?.slice(0, 3).map(t => (
                        <span 
                          key={t} 
                          style={{ 
                            background: 'rgba(20, 184, 166, 0.08)', 
                            color: 'var(--color-primary)', 
                            fontSize: '0.7rem', 
                            fontWeight: 600, 
                            padding: '2px 6px', 
                            borderRadius: '4px' 
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tags?.length > 3 && (
                        <span style={{ color: 'var(--color-text-dim)', fontSize: '0.7rem' }}>
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    {project.featured ? (
                      <span style={{ color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Sparkles size={14} /> Yes
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem' }}>No</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleEditClick(project)} 
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-dim)', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <FolderGit size={40} style={{ marginBottom: '16px', color: 'var(--color-text-dim)' }} />
          <p>No projects found. Create your first project by clicking the button above!</p>
        </div>
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <ProjectForm
          project={editingProject}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManageProjects;
