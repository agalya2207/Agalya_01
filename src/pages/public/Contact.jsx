import React from 'react';
import ContactForm from '../../components/forms/ContactForm';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="fade-in" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h1 className="title-medium gradient-text">Get in Touch</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Have a project in mind, looking to hire, or just want to say hello? I'd love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Contact Information</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <Mail size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Email</p>
                <a href="mailto:hello@example.com" style={{ fontWeight: 500 }}>hello@example.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <MapPin size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Location</p>
                <p style={{ fontWeight: 500 }}>San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-panel" style={{ padding: '24px 30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }}>
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }}>
              <Linkedin size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-muted)' }}>
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* Contact Form Wrapper */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
