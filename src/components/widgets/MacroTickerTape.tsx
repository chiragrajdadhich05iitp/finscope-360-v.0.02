'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MACRO_DATA = [
  { label: 'INDIA 10Y G-SEC', value: '6.86%', change: '-0.02%', up: false },
  { label: 'RBI REPO RATE', value: '6.50%', change: '0.00%', up: true },
  { label: 'INDIA CPI INFLATION', value: '3.60%', change: '-0.15%', up: false },
  { label: 'USD / INR', value: '₹83.94', change: '-0.04%', up: false },
  { label: 'FII NET FLOW (TODAY)', value: '+₹1,840 Cr', change: '+₹420 Cr', up: true },
  { label: 'DII NET FLOW (TODAY)', value: '+₹2,110 Cr', change: '+₹650 Cr', up: true },
  { label: 'BRENT CRUDE (INR)', value: '₹6,890/bbl', change: '+1.15%', up: true },
];

export default function MacroTickerTape() {
  return (
    <div className="flex w-full items-center overflow-x-auto whitespace-nowrap bg-[#060911] border-b border-slate-800/80 px-4 py-1.5 text-[11px] font-mono scrollbar-none">
      <span className="text-cyan-400 font-bold mr-4 shrink-0 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" /> INDIAN MACRO PULSE:
      </span>
      <div className="flex items-center gap-6">
        {MACRO_DATA.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 shrink-0">
            <span className="text-slate-400">{item.label}</span>
            <span className="text-slate-200 font-medium">{item.value}</span>
            <span
              className={`flex items-center text-[10px] ${
                item.up ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {item.up ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : <TrendingDown className="h-2.5 w-2.5 mr-0.5" />}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}