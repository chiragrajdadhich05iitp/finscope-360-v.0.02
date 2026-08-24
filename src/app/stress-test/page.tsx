'use client';

import React, { useState } from 'react';
import { Cpu, Play, AlertCircle, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StressTestPage() {
  const [portfolio, setPortfolio] = useState('Reliance: ₹1,50,000, HDFC Bank: ₹1,00,000, TCS: ₹80,000, Tata Motors: ₹60,000');
  const [scenario, setScenario] = useState('Crude Oil spikes to $95/bbl & USD/INR touches ₹85.50');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const runSimulation = async () => {
    setLoading(true);
    setReport(null);
    try {
      const res = await fetch('/api/stress-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio, scenario }),
      });
      const data = await res.json();
      setReport(data.result);
    } catch {
      setReport('Failed to simulate stress scenario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-full overflow-y-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <Cpu className="h-7 w-7 text-cyan-400" />
        <div>
          <h1 className="text-xl font-bold text-slate-100">AI Macro Portfolio Stress-Tester</h1>
          <p className="text-xs text-slate-400">Simulate geopolitical, oil shock, and interest rate risks on your Indian portfolio</p>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-800 bg-[#0b0f19] p-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
            Your Indian Holdings (Stocks / MFs in ₹)
          </label>
          <textarea
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 font-mono focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">
            Select Macro Risk Shock Scenario
          </label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:border-cyan-400 focus:outline-none"
          >
            <option value="Crude Oil spikes to $95/bbl & USD/INR touches ₹85.50">Crude Oil Spikes to $95/bbl & USD/INR weakens to ₹85.50</option>
            <option value="RBI surprises with a 25 bps rate hike amid sticky food inflation">RBI surprises with an emergency 25 bps rate hike</option>
            <option value="Global Tech Sell-off & US Recessionary panic">Global Tech Sell-off & US Recessionary selloff (-4% Nasdaq)</option>
            <option value="Red Sea Chokepoint completely blocked for 30 days">Red Sea maritime channel blocked for 30 days (+8% Freight costs)</option>
          </select>
        </div>

        <button
          onClick={runSimulation}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {loading ? 'Running AI Monte-Carlo Stress Test...' : 'Run Macro Stress Simulation'}
        </button>
      </div>

      {/* Result Report */}
      {report && (
        <div className="rounded-xl border border-cyan-500/40 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase">
            <Sparkles className="h-4 w-4" /> AI Quantitative Stress Report
          </div>
          <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans bg-black/40 p-4 rounded-lg border border-slate-800">
            {report}
          </div>
        </div>
      )}
    </div>
  );
}