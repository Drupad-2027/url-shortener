import React, { useState, useEffect, useRef } from 'react';
import { 
  Link2, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Sparkles, 
  AlertCircle, 
  X, 
  Zap,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import './App.css';

const BACKEND_URL = 'http://localhost:8080';

export default function App() {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [backendOnline, setBackendOnline] = useState(null);

  const qrCanvasRef = useRef(null);

  // Health check to local backend
  useEffect(() => {
    let isMounted = true;
    async function checkHealth() {
      try {
        const res = await fetch(`${BACKEND_URL}/test`, { method: 'GET' });
        if (isMounted) {
          setBackendOnline(res.ok);
        }
      } catch {
        if (isMounted) {
          setBackendOnline(false);
        }
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Generate QR code on toggle
  useEffect(() => {
    if (showQR && result && qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, result.shortUrl, {
        width: 180,
        margin: 2,
        color: {
          dark: '#080c17',
          light: '#ffffff'
        }
      });
    }
  }, [showQR, result]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setShowQR(false);

    let trimmed = longUrl.trim();
    if (!trimmed) {
      setError('Please enter a valid URL.');
      return;
    }

    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: trimmed }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const shortCode = await res.text();
      const shortUrl = `${BACKEND_URL}/${shortCode}`;

      setResult({
        shortCode,
        shortUrl,
        longUrl: trimmed
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      setError(
        backendOnline === false
          ? 'Cannot connect to backend. Please ensure Spring Boot is running on port 8080.'
          : 'Failed to shorten URL. Please check the URL and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    if (!qrCanvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qrcode-${result?.shortCode || 'link'}.png`;
    link.href = qrCanvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="mnc-app-wrapper">
      {/* MNC TOP NAVIGATION */}
      <header className="mnc-navbar">
        <div className="mnc-nav-brand">
          <div className="mnc-brand-icon">
            <Zap size={20} color="#ffffff" />
          </div>
          <span className="mnc-brand-title">URL Shortener</span>
        </div>

        <div className="mnc-nav-right">
          {/* BACKEND STATUS BADGE */}
          <div className={`mnc-status-pill ${backendOnline ? 'online' : 'offline'}`}>
            <span className="mnc-status-dot" />
            <span>{backendOnline ? 'Backend Online' : 'Backend Offline'}</span>
          </div>

          {/* GITHUB LINK */}
          <a 
            href="https://github.com/Drupad-2027" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mnc-nav-link"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>

          {/* LINKEDIN LINK */}
          <a 
            href="https://www.linkedin.com/in/drupad-dhamdhere" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mnc-nav-link"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </header>

      {/* MNC MAIN CONTENT */}
      <main className="mnc-main">
        {/* HERO SECTION */}
        <section className="mnc-hero">
          <div className="mnc-hero-chip">
            <Sparkles size={14} />
            <span>Spring Boot + PostgreSQL + Redis</span>
          </div>

          <h1 className="mnc-hero-title">Shorten Your Links</h1>
          
          <p className="mnc-hero-subtitle">
            Fast. Reliable. Cloud-powered URL shortening service with sub-millisecond Redis caching.
          </p>
        </section>

        {/* MNC GLASS CARD */}
        <section className="mnc-card">
          <form onSubmit={handleShorten} className="mnc-form">
            <div className="mnc-input-wrapper">
              <span className="mnc-input-icon">
                <Link2 size={19} />
              </span>
              <input
                id="url-input"
                type="text"
                placeholder="Paste your long URL here... (e.g. https://example.com/very-long-url)"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="mnc-input"
                autoComplete="off"
              />
              {longUrl && (
                <button
                  type="button"
                  onClick={() => setLongUrl('')}
                  className="mnc-clear-btn"
                  title="Clear input"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              id="shorten-btn"
              type="submit"
              disabled={loading || !longUrl.trim()}
              className="mnc-submit-btn"
            >
              {loading ? (
                <>
                  <div className="mnc-spinner" />
                  <span>Shortening URL...</span>
                </>
              ) : (
                <>
                  <Sparkles size={17} />
                  <span>Shorten URL</span>
                </>
              )}
            </button>
          </form>

          <p className="mnc-card-hint">
            Directly connected to your local backend at <code>http://localhost:8080</code>
          </p>

          {/* ERROR ALERT */}
          {error && (
            <div className="mnc-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* RESULT CARD */}
          {result && (
            <div className="mnc-result-box">
              <div className="mnc-result-header">
                <span className="mnc-result-tag">
                  <Check size={16} /> Short URL Generated
                </span>
              </div>

              <div className="mnc-result-content">
                <a
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mnc-short-link"
                  title="Click to visit"
                >
                  {result.shortUrl}
                </a>

                <div className="mnc-action-group">
                  <button
                    onClick={() => copyToClipboard(result.shortUrl)}
                    className={`mnc-action-btn ${copied ? 'copied' : ''}`}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <a
                    href={result.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mnc-action-btn"
                    title="Open destination URL"
                  >
                    <ExternalLink size={15} />
                  </a>

                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="mnc-action-btn"
                    title="Toggle QR Code"
                  >
                    <QrCode size={15} />
                  </button>
                </div>
              </div>

              {/* QR CODE DRAWER */}
              {showQR && (
                <div className="mnc-qr-wrapper">
                  <div className="mnc-qr-canvas-box">
                    <canvas ref={qrCanvasRef} />
                  </div>
                  <button onClick={downloadQR} className="mnc-download-btn">
                    <Download size={14} />
                    <span>Download QR</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* MNC FOOTER */}
      <footer className="mnc-footer">
        <p className="mnc-footer-text">
          Built by <span className="mnc-author-name">Drupad Dhamdhere</span> • Spring Boot • React • PostgreSQL • Redis • Docker
        </p>
        <div className="mnc-footer-pills">
          <span className="mnc-pill">Java 17+</span>
          <span className="mnc-pill">Base62 Encoding</span>
          <span className="mnc-pill">Cache-Aside Pattern</span>
          <span className="mnc-pill">Vite</span>
        </div>
      </footer>
    </div>
  );
}
