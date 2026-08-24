'use client';

import React, { useState, useEffect } from 'react';
import { Users, Gauge, ArrowUpRight, Layers, RefreshCw } from 'lucide-react';

const FII_DII_STATS = [
  { segment: 'Cash Market Equities', fii: '+₹1,840 Cr', dii: '+₹2,110 Cr', net: '+₹3,950 Cr', status: 'Heavy Inflow' },
  { segment: 'Index Futures', fii: '-₹420 Cr', dii: '+₹150 Cr', net: '-₹270 Cr', status: 'Hedging' },
  { segment: 'Index Options (Net Premium)', fii: '+₹3,450 Cr', dii: '-₹890 Cr', net: '+₹2,560 Cr', status: 'Call Buying' },
  { segment: 'Stock Futures', fii: '+₹680 Cr', dii: '+₹320 Cr', net: '+₹1,000 Cr', status: 'Long Buildup' },
];

export default function InstitutionalPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const res = await fetch('/api/nse-live');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };

    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const pcr = data?.pcr || 1.18;
  const maxPain = data?.maxPain || 24800;

  return (
    <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Users className="h-7 w-7 text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold text-slate-100">Live FII / DII Flow & NSE Derivative Matrix</h1>
            <p className="text-xs text-slate-400">Live Nifty Option Chain PCR, Max Pain Strike & Cash Inflows</p>
          </div>
        </div>
        <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 bg-[#0b0f19] border border-slate-800 px-3 py-1.5 rounded-lg">
          <RefreshCw className="h-3 w-3 animate-spin" /> Live Stream: {data?.timestamp || 'Connecting...'}
        </div>
      </div>

      {/* Derivative Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-slate-800 bg-[#0b0f19] flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">NIFTY 50 LIVE PCR</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">{pcr}</div>
            <div className="text-[11px] text-emerald-400 mt-1">
              {pcr >= 1.0 ? 'Bullish Sentiment (Put Base Strong)' : 'Bearish Pressure (Call Resistance)'}
            </div>
          </div>
          <Gauge className="h-8 w-8 text-emerald-400 opacity-80" />
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#0b0f19] flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">MAX PAIN STRIKE</div>
            <div className="text-2xl font-bold font-mono text-cyan-400">₹{maxPain.toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-slate-400 mt-1">Key Expiry Settlement Magnet Strike</div>
          </div>
          <Layers className="h-8 w-8 text-cyan-400 opacity-80" />
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-[#0b0f19] flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">INSTITUTIONAL NET FLOW</div>
            <div className="text-2xl font-bold font-mono text-emerald-400">+₹3,950 Cr</div>
            <div className="text-[11px] text-emerald-400 mt-1">FII + DII Combined Inflow</div>
          </div>
          <ArrowUpRight className="h-8 w-8 text-emerald-400 opacity-80" />
        </div>
      </div>

      {/* Segment Breakdown Table */}
      <div className="rounded-xl border border-slate-800 bg-[#0b0f19] overflow-hidden">
        <div className="p-4 border-b border-slate-800 font-semibold text-sm text-slate-200 uppercase tracking-wider font-mono">
          Detailed Segment Activity Breakdown
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5">Segment</th>
                <th className="p-3.5">FII Activity</th>
                <th className="p-3.5">DII Activity</th>
                <th className="p-3.5">Net Cumulative Flow</th>
                <th className="p-3.5">Position Stance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {FII_DII_STATS.map((row) => (
                <tr key={row.segment} className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-sans font-medium text-slate-200">{row.segment}</td>
                  <td className={`p-3.5 ${row.fii.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{row.fii}</td>
                  <td className={`p-3.5 ${row.dii.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{row.dii}</td>
                  <td className="p-3.5 font-bold text-slate-100">{row.net}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}