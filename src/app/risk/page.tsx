'use client';

import React from 'react';
import { ShieldAlert, Anchor } from 'lucide-react';

const CHOKEPOINTS = [
  {
    name: 'Suez Canal & Red Sea Corridor',
    status: 'HIGH RISK FOR INDIAN EXPORTS',
    freightDelta: '+₹2,800/TEU Surcharge',
    details: 'Indian textile & engineering goods facing 12 extra transit days around Africa. High container freight cost.',
    severity: 'danger',
  },
  {
    name: 'Strait of Hormuz (Persian Gulf)',
    status: 'ACTIVE CRUDE CORRIDOR',
    freightDelta: 'Insurance Premium +₹180/bbl',
    details: 'Critical supply line for 60% of India’s crude oil imports from Iraq, Saudi Arabia and UAE.',
    severity: 'warning',
  },
  {
    name: 'Strait of Malacca',
    status: 'STABLE TRADE FLOW',
    freightDelta: 'Standard INR Tariff',
    details: 'Normal capacity. Direct gateway for India-ASEAN electronic goods and edible oil cargo.',
    severity: 'normal',
  },
  {
    name: 'Chabahar - INSTC Corridor',
    status: 'STRATEGIC EXPANSION',
    freightDelta: 'Transit Cost Reduction -18%',
    details: 'Direct Indian cargo connectivity to Central Asia and Europe bypassing traditional chokepoints.',
    severity: 'normal',
  },
];

export default function RiskPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
        <ShieldAlert className="h-7 w-7 text-amber-400" />
        <div>
          <h1 className="text-xl font-bold text-slate-100">India Trade & Energy Risk Matrix</h1>
          <p className="text-xs text-slate-400">Monitoring India's crude imports, export shipping corridors and freight tariffs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHOKEPOINTS.map((item) => (
          <div
            key={item.name}
            className={`rounded-xl border p-5 flex flex-col justify-between ${
              item.severity === 'danger'
                ? 'border-rose-500/40 bg-rose-500/10'
                : item.severity === 'warning'
                ? 'border-amber-500/40 bg-amber-500/10'
                : 'border-slate-800 bg-[#0b0f19]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 font-semibold text-sm text-slate-200">
                  <Anchor className="h-4 w-4 text-cyan-400" /> {item.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    item.severity === 'danger'
                      ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                      : item.severity === 'warning'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{item.details}</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800/80 font-mono">
              <span className="text-slate-400">Freight & Cost Impact:</span>
              <span className="text-slate-200 font-medium">{item.freightDelta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}