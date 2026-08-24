'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Layers, Crosshair, Anchor, Droplets, Globe, ArrowRight, Sparkles } from 'lucide-react';

const GlobalMap = dynamic(() => import('@/components/map/GlobalMap'), { ssr: false });

export default function HomePage() {
  const [focusCoords, setFocusCoords] = useState<[number, number] | null>(null);
  const [layers, setLayers] = useState({
    exchanges: true,
    chokepoints: true,
    tradeArcs: true,
    ports: true,
    pipelines: true,
    foreignHubs: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-[#0b0c10] overflow-hidden select-none">
      {/* 3D Interactive Map Canvas (Full Screen Main Display) */}
      <div className="flex-1 relative w-full h-full">
        <GlobalMap activeLayers={layers} focusCoords={focusCoords} />

        {/* Floating Hero Badge & Description (Top Left) */}
        <div className="absolute top-6 left-8 z-10 max-w-md pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16181e]/90 border border-white/10 backdrop-blur-md mb-3 shadow-lg pointer-events-auto">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm">
              Live Nexus
            </span>
            <span className="text-xs font-medium text-slate-300">
              Indian & Global Maritime Energy Corridors
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            Gain Total <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-orange-400">
              Financial Clarity.
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Click on any foreign hub or Indian port to inspect live vessel anchorage, annual ₹ volume, and pipeline flows.
          </p>

          <div className="flex items-center gap-3 mt-4 pointer-events-auto">
            <Link
              href="/stress-test"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              <Sparkles className="h-3.5 w-3.5" /> AI Stress-Test
            </Link>
            <Link
              href="/terminal"
              className="px-4 py-2 rounded-full text-xs font-bold bg-[#16181e]/80 hover:bg-slate-800 text-slate-200 border border-white/10 backdrop-blur-md transition-all"
            >
              Market Terminal →
            </Link>
          </div>
        </div>

        {/* Minimalist Floating Layer Controls (Top Right) */}
        <div className="absolute top-6 right-8 z-10 flex flex-col gap-1.5 rounded-2xl border border-slate-800 bg-[#0e0f14]/90 p-3 backdrop-blur-xl shadow-2xl min-w-[190px]">
          <div className="flex items-center gap-2 font-bold text-slate-200 pb-2 border-b border-slate-800 text-[11px] uppercase tracking-wider font-mono">
            <Layers className="h-3.5 w-3.5 text-orange-400" /> Maritime & Flow Layers
          </div>

          <button
            onClick={() => toggleLayer('ports')}
            className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layers.ports ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><Anchor className="h-3.5 w-3.5" /> Indian Ports</span>
            <span className={`h-2 w-2 rounded-full ${layers.ports ? 'bg-orange-400 shadow-[0_0_8px_#fb923c]' : 'bg-slate-700'}`} />
          </button>

          <button
            onClick={() => toggleLayer('foreignHubs')}
            className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layers.foreignHubs ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Foreign Partners</span>
            <span className={`h-2 w-2 rounded-full ${layers.foreignHubs ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-slate-700'}`} />
          </button>

          <button
            onClick={() => toggleLayer('pipelines')}
            className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layers.pipelines ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5"><Droplets className="h-3.5 w-3.5" /> Oil Pipelines</span>
            <span className={`h-2 w-2 rounded-full ${layers.pipelines ? 'bg-orange-400 shadow-[0_0_8px_#fb923c]' : 'bg-slate-700'}`} />
          </button>

          <button
            onClick={() => toggleLayer('tradeArcs')}
            className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              layers.tradeArcs ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span>Global Inflow Arcs</span>
            <span className={`h-2 w-2 rounded-full ${layers.tradeArcs ? 'bg-white shadow-[0_0_8px_#fff]' : 'bg-slate-700'}`} />
          </button>
        </div>

        {/* Quick Fly Hub Pills (Bottom Left Over Map) */}
        <div className="absolute bottom-6 left-8 z-10 flex flex-wrap items-center gap-2 rounded-full border border-slate-800 bg-[#0e0f14]/80 px-3 py-1.5 text-xs backdrop-blur-md shadow-xl max-w-[85vw]">
          <span className="flex items-center gap-1 text-slate-400 font-mono text-[10px] uppercase font-bold pl-1">
            <Crosshair className="h-3 w-3 text-orange-400" /> Focus:
          </span>
          <button
            onClick={() => setFocusCoords([72.95, 18.95])}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all font-medium text-[11px]"
          >
            🇮🇳 JNPT Mumbai
          </button>
          <button
            onClick={() => setFocusCoords([69.7042, 22.8395])}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all font-medium text-[11px]"
          >
            🇮🇳 Mundra Port
          </button>
          <button
            onClick={() => setFocusCoords([50.1589, 26.6433])}
            className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all font-medium text-[11px]"
          >
            🇸🇦 Ras Tanura (Crude)
          </button>
          <button
            onClick={() => setFocusCoords([37.7686, 44.7239])}
            className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition-all font-medium text-[11px]"
          >
            🇷🇺 Novorossiysk (Urals)
          </button>
          <button
            onClick={() => setFocusCoords([103.84, 1.2644])}
            className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-all font-medium text-[11px]"
          >
            🇸🇬 Singapore (Tech/FDI)
          </button>
        </div>
      </div>

      {/* High-Impact Sunset Bottom Stat Ribbon */}
      <div className="w-full bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c] px-8 lg:px-16 py-4 text-white z-20 shrink-0 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_-15px_30px_rgba(234,88,12,0.25)]">
        {/* Stat 1 */}
        <div className="flex items-center gap-3">
          <div className="text-2xl lg:text-3xl font-black tracking-tight font-sans">
            +₹48.5L Cr
          </div>
          <div className="text-[11px] text-orange-100 max-w-[160px] leading-tight font-medium">
            Tracked annual maritime trade volume flowing into Indian ports.
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-white/20" />

        {/* Stat 2 */}
        <div className="flex items-center gap-3">
          <div className="text-2xl lg:text-3xl font-black tracking-tight font-sans">
            +₹3,950 Cr
          </div>
          <div className="text-[11px] text-orange-100 max-w-[160px] leading-tight font-medium">
            Daily institutional FII + DII cash flow liquidity.
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-white/20" />

        {/* Stat 3 */}
        <div className="flex items-center gap-3">
          <div className="text-2xl lg:text-3xl font-black tracking-tight font-sans">
            1.18 PCR
          </div>
          <div className="text-[11px] text-orange-100 max-w-[160px] leading-tight font-medium">
            Live Nifty derivative Put/Call support sentiment.
          </div>
        </div>

        <Link
          href="/terminal"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-bold hover:bg-slate-900 transition-all shadow-lg ml-auto shrink-0"
        >
          <span>Open Terminal</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}