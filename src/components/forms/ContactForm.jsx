import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Input from '../common/Input';
import Button from '../common/Button';
import { Send, CheckCircle2 } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            read: false
          }
        ]);

      if (insertError) throw insertError;
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div 
        className="glass-panel fade-in" 
        style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}
      >
        <CheckCircle2 size={48} color="var(--color-success)" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Message Sent!</h3>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '350px' }}>
          Thank you for reaching out. I have received your message and will get back to you shortly.
        </p>
        <Button variant="secondary" onClick={() => setSuccess(false)} style={{ marginTop: '8px' }}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass-panel fade-in" 
      style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Send a Message</h3>
      
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
        label="Name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your full name"
        required
      />

      <Input
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="name@example.com"
        required
      />

      <Input
        label="Message"
        id="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Tell me about your project..."
        required
        isTextArea
      />

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading} 
        style={{ marginTop: '16px', alignSelf: 'flex-start' }}
      >
        <Send size={16} /> Send Message
      </Button>
    </form>
  );
};

export default ContactForm;
