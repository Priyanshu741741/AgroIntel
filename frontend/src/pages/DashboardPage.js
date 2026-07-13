import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ImageUpload from '../components/ImageUpload';
import AnalysisResults from '../components/AnalysisResults';
import { getModelInfo } from '../services/api';

const DashboardPage = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzedImage, setAnalyzedImage] = useState(null);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    getModelInfo().catch(() =>
      setModelError('Backend model unavailable — ensure Flask server is running with a trained model.')
    );
  }, []);

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h2 style={{
          fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #f0fdf4, #22c55e)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 6,
        }}>
          Crop Analysis Dashboard
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 0 }}>
          Upload a crop photo to detect diseases or nutrient deficiencies and get personalised care advice.
        </p>
      </div>

      {modelError && (
        <Alert className="mb-4" style={{
          background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.3)',
          color: '#fde68a', borderRadius: '12px',
        }}>
          <i className="bi bi-exclamation-triangle-fill me-2" />
          {modelError}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={5}>
          <ImageUpload onAnalysisComplete={(result, img) => { setAnalysisResult(result); setAnalyzedImage(img); }} />
        </Col>
        <Col lg={7}>
          {analysisResult ? (
            <AnalysisResults results={analysisResult} imageUrl={analyzedImage} />
          ) : (
            <div style={{
              minHeight: 320, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: 'rgba(13,31,45,0.45)',
              border: '1px dashed rgba(34,197,94,0.2)',
              borderRadius: '18px', padding: '40px', textAlign: 'center',
            }}>
              <i className="bi bi-image" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: 14 }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
                Analysis results will appear here after uploading a crop image.
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;