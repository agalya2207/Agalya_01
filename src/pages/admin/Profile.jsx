import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Lock, Save } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    bio: '',
    skills: ''
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setFormData({
            fullName: data.full_name || '',
            title: data.title || '',
            bio: data.bio || '',
            skills: data.skills ? data.skills.join(', ') : ''
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          title: formData.title,
          bio: formData.bio,
          skills: skillsArray,
          updated_at: new Date()
        });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Profile details updated successfully!' });
    } catch (err) {
      console.error('Profile update error:', err);
      setMessage({ type: 'error', text: err.message || 'Error updating profile.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.password
      });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ password: '', confirmPassword: '' });
    } catch (err) {
      console.error('Password update error:', err);
      setMessage({ type: 'error', text: err.message || 'Error updating password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 className="title-medium gradient-text">Profile Settings</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Customize your professional metadata and account credentials.
        </p>
      </div>

      {message.text && (
        <div 
          style={{
            background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: message.type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.95rem'
          }}
        >
          {message.text}
        </div>
      )}

      {profileLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner"></div></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {/* Bio Form */}
          <form 
            onSubmit={handleProfileSubmit} 
            className="glass-panel" 
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={18} color="var(--color-primary)" /> Biographical Info
            </h3>
            
            <Input
              label="Full Name"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
              placeholder="Your professional name"
              required
            />

            <Input
              label="Professional Title"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
              placeholder="E.g., Senior Full Stack Developer"
              required
            />

            <Input
              label="Biography"
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(p => ({ ...p, bio: e.target.value }))}
              placeholder="Short bio about your experience and skills..."
              required
              isTextArea
            />

            <Input
              label="Skills (comma separated)"
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData(p => ({ ...p, skills: e.target.value }))}
              placeholder="React, TypeScript, CSS, Node.js"
            />

            <Button 
              type="submit" 
              variant="primary" 
              loading={loading} 
              style={{ marginTop: '16px', alignSelf: 'flex-start' }}
            >
              <Save size={16} /> Save Changes
            </Button>
          </form>

          {/* Password Form */}
          <form 
            onSubmit={handlePasswordSubmit} 
            className="glass-panel" 
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '8px', height: 'fit-content' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={18} color="var(--color-secondary)" /> Change Password
            </h3>

            <Input
              label="New Password"
              id="password"
              type="password"
              value={passwordData.password}
              onChange={(e) => setPasswordData(p => ({ ...p, password: e.target.value }))}
              placeholder="Min 6 characters"
              required
            />

            <Input
              label="Confirm New Password"
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(p => ({ ...p, confirmPassword: e.target.value }))}
              placeholder="Confirm new password"
              required
            />

            <Button 
              type="submit" 
              variant="secondary" 
              loading={loading} 
              style={{ marginTop: '16px', alignSelf: 'flex-start' }}
            >
              Update Password
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
