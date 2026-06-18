import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { KeyRound, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fade-in" 
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '40px 0' }}
    >
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="title-medium gradient-text" style={{ marginBottom: '8px' }}>Console Login</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Access the admin dashboard panel.
          </p>
        </div>

        {error && (
          <div 
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--color-error)', 
              padding: '12px', 
              borderRadius: '6px', 
              fontSize: '0.9rem', 
              marginBottom: '20px' 
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ position: 'relative' }}>
            <Input
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              style={{ paddingLeft: '44px' }}
            />
            <Mail 
              size={16} 
              style={{ position: 'absolute', left: '16px', top: '44px', color: 'var(--color-text-dim)' }} 
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ paddingLeft: '44px' }}
            />
            <KeyRound 
              size={16} 
              style={{ position: 'absolute', left: '16px', top: '44px', color: 'var(--color-text-dim)' }} 
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            loading={loading} 
            style={{ marginTop: '16px', width: '100%' }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
