import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import Button from '../../components/common/Button';
import { Mail, Check, Trash2, Eye } from 'lucide-react';
import Modal from '../../components/common/Modal';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id, currentRead) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: !currentRead })
        .eq('id', id);
      if (error) throw error;
      fetchMessages();
    } catch (err) {
      console.error('Error updating read status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleViewMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      try {
        await supabase
          .from('messages')
          .update({ read: true })
          .eq('id', msg.id);
        fetchMessages();
      } catch (err) {
        console.error('Error auto-marking read status:', err);
      }
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 className="title-medium gradient-text">Inbox Messages</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Read and manage inquiries sent through the contact form.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><div className="spinner"></div></div>
      ) : messages.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="glass-panel"
              style={{
                padding: '24px',
                borderLeft: msg.read ? '1px solid var(--color-border)' : '4px solid var(--color-accent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ flex: 1, minWidth: '250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{msg.name}</span>
                  <span className={`badge ${msg.read ? 'badge-read' : 'badge-unread'}`}>
                    {msg.read ? 'Read' : 'New'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                  {msg.email}
                </p>
                <p 
                  style={{ 
                    color: 'var(--color-text-muted)', 
                    fontSize: '0.95rem', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 1, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}
                >
                  {msg.message}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="secondary" onClick={() => handleViewMessage(msg)}>
                  <Eye size={16} /> View
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => toggleReadStatus(msg.id, msg.read)}
                  title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                >
                  {msg.read ? <Mail size={16} /> : <Check size={16} />}
                </Button>
                <Button variant="danger" onClick={() => handleDelete(msg.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <Mail size={40} style={{ marginBottom: '16px', color: 'var(--color-text-dim)' }} />
          <p>Your inbox is empty.</p>
        </div>
      )}

      {/* Message Reader Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={`Message from ${selectedMessage?.name || ''}`}
      >
        {selectedMessage && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
                From
              </p>
              <p style={{ fontWeight: 600, fontSize: '1rem' }}>
                {selectedMessage.name} &lt;{selectedMessage.email}&gt;
              </p>
            </div>
            
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', fontWeight: 600, textTransform: 'uppercase' }}>
                Received
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
                Message
              </p>
              <p style={{ whiteSpace: 'pre-wrap', color: 'var(--color-text)', lineHeight: 1.6 }}>
                {selectedMessage.message}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button 
                variant="secondary" 
                onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.read)}
              >
                Mark as {selectedMessage.read ? 'Unread' : 'Read'}
              </Button>
              <Button variant="danger" onClick={() => handleDelete(selectedMessage.id)}>
                Delete Message
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageMessages;
