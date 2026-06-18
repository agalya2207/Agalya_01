import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import Input from '../common/Input';
import Button from '../common/Button';
import { Upload } from 'lucide-react';

const ProjectForm = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    live_url: '',
    github_url: '',
    tags: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        content: project.content || '',
        live_url: project.live_url || '',
        github_url: project.github_url || '',
        tags: project.tags ? project.tags.join(', ') : '',
        featured: project.featured || false
      });
      setImagePreview(project.image_url || '');
    }
  }, [project]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return imagePreview;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `screenshots/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const imageUrl = await uploadImage();
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t !== '');

      const projectData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        live_url: formData.live_url,
        github_url: formData.github_url,
        tags: tagsArray,
        featured: formData.featured,
        image_url: imageUrl
      };

      if (project) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectData]);
        if (insertError) throw insertError;
      }

      onSuccess();
    } catch (err) {
      console.error('Project form error:', err);
      setError(err.message || 'Error saving project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {error && (
        <div 
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--color-error)', 
            padding: '12px', 
            borderRadius: '6px', 
            fontSize: '0.9rem', 
            marginBottom: '16px' 
          }}
        >
          {error}
        </div>
      )}

      <Input
        label="Project Title"
        id="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="E.g., My Portfolio App"
        required
      />

      <Input
        label="Short Description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Brief highlight description"
        required
      />

      <Input
        label="Detailed Content (Markdown support)"
        id="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Describe the application features, tech, and challenges..."
        isTextArea
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input
          label="Live URL"
          id="live_url"
          value={formData.live_url}
          onChange={handleChange}
          placeholder="https://example.com"
        />
        <Input
          label="GitHub Repository"
          id="github_url"
          value={formData.github_url}
          onChange={handleChange}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <Input
        label="Tags (Comma separated)"
        id="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="React, Supabase, CSS"
      />

      {/* Image Upload Area */}
      <div className="form-group">
        <label className="form-label">Project Image</label>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {imagePreview && (
            <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
            <Upload size={16} /> Choose Image
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Featured Checkbox */}
      <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={handleChange}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <label htmlFor="featured" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
          Feature this project on the homepage
        </label>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" loading={loading}>Save Project</Button>
      </div>
    </form>
  );
};

export default ProjectForm;
