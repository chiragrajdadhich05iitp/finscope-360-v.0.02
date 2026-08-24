'use client';

import React, { useState, useEffect } from 'react';
import { LayoutGrid, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export default function SectorPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLiveSectors = async () => {
    try {
      const res = await fetch('/api/nse-live');
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveSectors();
    const timer = setInterval(fetchLiveSectors, 4000); // Live poll every 4s
    return () => clearInterval(timer);
  }, []);

  const advances = data?.advances || 1350;
  const declines = data?.declines || 950;
  const total = advances + declines;
  const advancePercent = Math.round((advances / total) * 100);

  return (
    <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-cyan-400" /> NSE Sectoral Heatmap & Market Breadth
          </h1>
          <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
            <span>Real-Time NSE Sector Momentum</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono flex items-center gap-1">
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} /> Updated: {data?.timestamp || 'Syncing...'}
            </span>
          </p>
        </div>

        {/* Advance/Decline Meter */}
        <div className="bg-[#0b0f19] border border-slate-800 p-3 rounded-xl min-w-[280px]">
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-emerald-400 font-bold">Advances: {advances} ({advancePercent}%)</span>
            <span className="text-rose-400 font-bold">Declines: {declines}</span>
          </div>
          <div className="h-2 w-full bg-rose-500/30 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${advancePercent}%` }}
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            />
          </div>
        </div>
      </div>

      {/* Sector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.sectors?.map((sector: any) => {
          const isUp = sector.change >= 0;
          return (
            <div
              key={sector.name}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isUp
                  ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/60'
                  : 'bg-rose-500/10 border-rose-500/30 hover:border-rose-500/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-100">{sector.name}</span>
                  <span
                    className={`flex items-center text-xs font-mono font-bold ${
                      isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isUp ? <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> : <TrendingDown className="h-3.5 w-3.5 mr-0.5" />}
                    {isUp ? `+${sector.change}%` : `${sector.change}%`}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mb-1">M-Cap: {sector.mcap}</div>
                <div className="text-[11px] text-slate-300">
                  Top Mover: <span className="font-medium text-slate-100">{sector.topGainer}</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Flow Profile:</span>
                <span className={isUp ? 'text-emerald-400' : 'text-rose-400'}>{sector.strength}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}