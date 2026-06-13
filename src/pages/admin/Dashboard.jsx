import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { FolderGit, Mail, ArrowRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact', head: true }),
          supabase.from('messages').select('*').order('created_at', { ascending: false })
        ]);

        const totalProjects = projectsRes.count || 0;
        const messagesList = messagesRes.data || [];
        const totalMessages = messagesList.length;
        const unreadMessages = messagesList.filter(m => !m.read).length;

        setStats({
          projects: totalProjects,
          messages: totalMessages,
          unread: unreadMessages
        });

        setRecentMessages(messagesList.slice(0, 3));
      } catch (err) {
        console.error('Error loading dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 className="title-medium gradient-text">Dashboard</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Welcome to your portfolio control center.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner"></div></div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="glass-panel stat-card">
              <div className="stat-card-info">
                <h3>Projects</h3>
                <p>{stats.projects}</p>
              </div>
              <div className="stat-card-icon">
                <FolderGit size={24} />
              </div>
            </div>

            <div className="glass-panel stat-card">
              <div className="stat-card-info">
                <h3>Total Messages</h3>
                <p>{stats.messages}</p>
              </div>
              <div className="stat-card-icon">
                <Mail size={24} />
              </div>
            </div>

            <div 
              className="glass-panel stat-card" 
              style={{ borderLeft: stats.unread > 0 ? '3px solid var(--color-accent)' : undefined }}
            >
              <div className="stat-card-info">
                <h3>Unread Messages</h3>
                <p style={{ color: stats.unread > 0 ? 'var(--color-accent)' : 'inherit' }}>{stats.unread}</p>
              </div>
              <div 
                className="stat-card-icon" 
                style={{ 
                  color: stats.unread > 0 ? 'var(--color-accent)' : undefined, 
                  background: stats.unread > 0 ? 'rgba(236, 72, 153, 0.1)' : undefined 
                }}
              >
                <Mail size={24} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {/* Recent Messages */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Messages</h3>
                <Link 
                  to="/admin/messages" 
                  style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  View All <ArrowRight size={14} />
                </Link>
              </div>

              {recentMessages.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {recentMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start', 
                        padding: '16px', 
                        background: 'rgba(0, 0, 0, 0.2)', 
                        borderRadius: '8px', 
                        border: '1px solid var(--color-border)' 
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{msg.name}</span>
                          {!msg.read && <span className="badge badge-unread">Unread</span>}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                          {msg.email}
                        </p>
                        <p 
                          style={{ 
                            fontSize: '0.9rem', 
                            color: 'var(--color-text-muted)', 
                            display: '-webkit-box', 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden' 
                          }}
                        >
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '24px' }}>
                  No messages received yet.
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link 
                  to="/admin/projects" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                >
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FolderGit size={18} color="var(--color-primary)" /> Manage Projects
                  </span>
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/admin/profile" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                >
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Settings size={18} color="var(--color-secondary)" /> Edit Bio & Profile
                  </span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
