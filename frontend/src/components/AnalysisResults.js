import React from 'react';

const categoryMeta = {
  healthy:           { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.3)',   icon: 'bi-check-circle-fill',    label: 'Healthy' },
  diseased:          { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   icon: 'bi-virus2',               label: 'Diseased' },
  nutrient_deficient:{ color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', icon: 'bi-exclamation-triangle-fill', label: 'Nutrient Deficient' },
};

const AnalysisResults = ({ results }) => {
  if (!results) return null;

  const meta = categoryMeta[results.health_category] || categoryMeta.healthy;
  const confidence = results.confidence ? Math.round(results.confidence * 100) : null;

  return (
    <div style={{
      background: 'rgba(13,31,45,0.7)',
      border: '1px solid rgba(34,197,94,0.15)',
      borderRadius: '18px',
      padding: '28px',
      backdropFilter: 'blur(12px)',
    }}>
      <div className="d-flex align-items-center gap-2 mb-4">
        <i className="bi bi-bar-chart-fill" style={{ color: 'var(--green-primary)', fontSize: '1.2rem' }} />
        <h5 style={{ margin: 0, fontWeight: 700 }}>Analysis Results</h5>
      </div>

      {/* Health Status Banner */}
      <div style={{
        background: meta.bg,
        border: `1px solid ${meta.border}`,
        borderRadius: '14px',
        padding: '20px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <i className={`bi ${meta.icon}`} style={{ fontSize: '2.2rem', color: meta.color, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 2 }}>
            Health Status
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: meta.color, lineHeight: 1 }}>
            {meta.label}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            Identified as: <strong style={{ color: 'var(--text-primary)' }}>{results.class.replace(/_/g, ' ')}</strong>
          </div>
        </div>
      </div>

      {/* Confidence */}
      {confidence !== null && (
        <div style={{ marginBottom: '24px' }}>
          <div className="d-flex justify-content-between mb-1">
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Model Confidence</span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: meta.color }}>{confidence}%</span>
          </div>
          <div className="confidence-bar-wrap">
            <div className="confidence-bar-fill" style={{ width: `${confidence}%`, background: `linear-gradient(90deg, ${meta.color}aa, ${meta.color})` }} />
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '14px', fontWeight: 600 }}>
          Recommendations
        </p>
        {[
          { icon: 'bi-hand-index-thumb-fill', label: 'Care',     value: results.recommendations.care },
          { icon: 'bi-droplet-fill',          label: 'Watering', value: results.recommendations.watering },
          { icon: 'bi-bug-fill',              label: 'Issues',   value: results.recommendations.issues },
        ].map(({ icon, label, value }) => (
          <div key={label} style={{
            display: 'flex', gap: '14px', alignItems: 'flex-start',
            padding: '14px 0',
            borderBottom: '1px solid rgba(34,197,94,0.08)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className={`bi ${icon}`} style={{ color: 'var(--green-primary)', fontSize: '0.9rem' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>
                {label}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisResults;