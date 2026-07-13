import React, { useState, useRef, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const SUGGESTIONS = [
  { label: 'Tomato diseases', q: 'How do I identify and treat common tomato diseases?' },
  { label: 'Watering tips',   q: 'What are the best practices for watering crops?' },
  { label: 'Soil health',     q: 'How can I improve soil fertility naturally?' },
  { label: 'Pest control',    q: 'What are organic methods to control crop pests?' },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([{
    text: "Hello! I'm your AI crop care assistant powered by Google Gemini. Ask me anything about crop diseases, soil health, watering, or farming best practices.",
    sender: 'bot',
    source: 'gemini',
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const msg = text.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { text: msg, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/chatbot`, { message: msg });
      setMessages(prev => [...prev, { text: res.data.response, sender: 'bot', source: res.data.source }]);
    } catch {
      setMessages(prev => [...prev, {
        text: "Sorry, I can't reach the server right now. Please ensure the Flask backend is running.",
        sender: 'bot',
        error: true,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div style={{
        padding: '18px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(34,197,94,0.05)',
      }}>
        <div className="d-flex align-items-center gap-2">
          <div style={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg,#16a34a,#22c55e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <i className="bi bi-robot" style={{ color: '#fff', fontSize: '1.1rem' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>Crop Care Assistant</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--green-primary)' }}>● Online · Powered by Gemini</div>
          </div>
        </div>
        <div style={{
          fontSize: '0.72rem', color: 'var(--text-muted)',
          background: 'rgba(34,197,94,0.08)', border: '1px solid var(--border)',
          borderRadius: '20px', padding: '4px 10px',
        }}>
          AI
        </div>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">
        <div className="messages-container">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.sender}${m.error ? ' error' : ''}`}>
              {m.text}
              {m.source === 'gemini' && m.sender === 'bot' && i > 0 && (
                <div className="ai-badge">Gemini</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message bot loading">
              <Spinner animation="grow" size="sm" style={{ color: 'var(--green-primary)' }} />
              <Spinner animation="grow" size="sm" style={{ color: 'var(--green-primary)' }} className="mx-1" />
              <Spinner animation="grow" size="sm" style={{ color: 'var(--green-primary)' }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestion chips */}
      <div className="suggestion-chips">
        {SUGGESTIONS.map(({ label, q }) => (
          <button key={label} className="btn" onClick={() => sendMessage(q)}>
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Ask about crop care, diseases, or growing tips…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            style={{ flex: 1, borderRadius: '12px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            style={{
              width: 42, height: 42,
              background: !input.trim() || isLoading
                ? 'rgba(34,197,94,0.2)'
                : 'linear-gradient(135deg,#16a34a,#22c55e)',
              border: 'none', borderRadius: '12px', cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'all 0.2s',
            }}
          >
            <i className="bi bi-send-fill" style={{ color: '#fff', fontSize: '0.9rem' }} />
          </button>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '6px 0 0', textAlign: 'center' }}>
          Press Enter to send · AI responses may not always be accurate
        </p>
      </div>
    </div>
  );
};

export default Chatbot;