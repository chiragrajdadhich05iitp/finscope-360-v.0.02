'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Activity, TrendingUp, TrendingDown, BarChart3, IndianRupee } from 'lucide-react';
import { useLiveMarket } from '@/hooks/useLiveMarket';

const TradingChart = dynamic(() => import('@/components/widgets/TradingChart'), { ssr: false });

export default function TerminalPage() {
  const market = useLiveMarket();
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY 50');

  return (
    <div className="flex h-full w-full p-4 gap-4 overflow-hidden">
      {/* Left: Indian Asset Watchlist */}
      <div className="w-96 rounded-xl border border-slate-800 bg-[#0b0f19] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase pb-2 border-b border-slate-800">
          <span className="flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-emerald-400" /> Indian Market Watch
          </span>
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-0.5">
            <IndianRupee className="h-2.5 w-2.5" /> INR FEED
          </span>
        </div>

        <div className="space-y-2 overflow-y-auto">
          {market.map((item) => (
            <div
              key={item.symbol}
              onClick={() => setSelectedSymbol(item.symbol)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                selectedSymbol === item.symbol
                  ? 'bg-cyan-500/10 border border-cyan-500/40'
                  : 'bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800/80'
              }`}
            >
              <div>
                <div className="font-semibold text-sm text-slate-200">{item.name}</div>
                <div className="text-[11px] text-slate-500 font-mono">{item.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium text-sm text-slate-100">
                  ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className={`text-xs flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {item.change.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Candlestick Chart */}
      <div className="flex-1 rounded-xl border border-slate-800 bg-[#0b0f19] p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <h2 className="font-bold text-base text-slate-100">{selectedSymbol} Price Chart (INR ₹)</h2>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            NSE / BSE Live Tick Timeframe
          </div>
        </div>
        <div className="flex-1">
          <TradingChart symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  );
}