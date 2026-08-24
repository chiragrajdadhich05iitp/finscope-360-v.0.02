'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface Props {
  news: {
    headline: string;
    source: string;
    time: string;
  } | null;
  onClose: () => void;
}

export default function AiImpactModal({ news, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');

  useEffect(() => {
    if (!news) return;

    setLoading(true);
    setAnalysis('');

    fetch('/api/ai-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ headline: news.headline, source: news.source }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAnalysis(data.summary || 'No analysis available.');
      })
      .catch(() => {
        setAnalysis('Unable to load AI analysis right now.');
      })
      .finally(() => setLoading(false));
  }, [news]);

  if (!news) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: '12px',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          backgroundColor: '#0b0f19',
          padding: '20px',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: '#94a3b8',
            background: '#1e293b',
            border: 'none',
            borderRadius: '6px',
            padding: '4px',
            cursor: 'pointer',
          }}
        >
          <X className="h-4 w-4" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22d3ee', fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sparkles className="h-4 w-4" /> FinScope AI Intelligence Breakdown
        </div>

        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', margin: '0 0 8px 0', paddingRight: '24px' }}>
          {news.headline}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', fontFamily: 'monospace', paddingBottom: '12px', borderBottom: '1px solid #1e293b', marginBottom: '16px' }}>
          <span>Source: {news.source}</span>
          <span>•</span>
          <span>Time: {news.time}</span>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '24px', color: '#22d3ee', fontSize: '12px' }}>
            <Loader2 className="h-5 w-5 animate-spin" /> Generating Macro Breakdown...
          </div>
        ) : (
          <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6', whiteSpace: 'pre-line', marginBottom: '16px' }}>
            {analysis}
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: 'rgba(34, 211, 238, 0.15)',
            color: '#67e8f9',
            border: '1px solid rgba(34, 211, 238, 0.4)',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Dismiss Briefing
        </button>
      </div>
    </div>
  );
}