import React, { useState, useRef } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { analyzeImage } from '../services/api';

const ImageUpload = ({ onAnalysisComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const loadFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setSelectedFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    loadFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) { setError('Please select an image first.'); return; }
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeImage(selectedFile);
      onAnalysisComplete(result, previewUrl);
    } catch {
      setError('Analysis failed — ensure the backend is running and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="d-flex align-items-center gap-2 mb-3">
        <i className="bi bi-cpu-fill" style={{ color: 'var(--green-primary)', fontSize: '1.2rem' }} />
        <h5 style={{ margin: 0, fontWeight: 700 }}>Upload Crop Image</h5>
      </div>

      {error && (
        <Alert className="mb-3" style={{
          background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
          color: '#fca5a5', borderRadius: '10px', fontSize: '0.88rem',
        }}>
          <i className="bi bi-exclamation-circle-fill me-2" />{error}
        </Alert>
      )}

      {/* Drop zone */}
      <div
        className={`upload-dropzone mb-3${dragOver ? ' drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{ cursor: 'pointer' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => loadFile(e.target.files[0])}
        />
        <i className="bi bi-cloud-arrow-up-fill upload-icon" />
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
          {selectedFile ? selectedFile.name : 'Drag & drop or click to browse'}
        </p>
        <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.78rem' }}>
          PNG, JPG, WebP · Max 10 MB
        </p>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="image-preview mb-3">
          <img src={previewUrl} alt="Preview" style={{ maxHeight: 260, width: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isLoading}
        style={{
          width: '100%',
          padding: '13px',
          background: !selectedFile || isLoading
            ? 'rgba(34,197,94,0.25)'
            : 'linear-gradient(135deg, #16a34a, #22c55e)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.95rem',
          cursor: !selectedFile || isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          boxShadow: !selectedFile || isLoading ? 'none' : '0 6px 20px rgba(34,197,94,0.3)',
          transition: 'all 0.3s ease',
        }}
      >
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" />
            Analysing…
          </>
        ) : (
          <>
            <i className="bi bi-search" />
            Analyse Crop
          </>
        )}
      </button>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>
        <i className="bi bi-info-circle me-1" />
        For best results, ensure leaves are clearly visible and well-lit.
      </p>
    </div>
  );
};

export default ImageUpload;