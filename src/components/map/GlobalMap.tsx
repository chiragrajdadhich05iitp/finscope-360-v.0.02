'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Anchor, Droplets, Zap, X, ShieldAlert, TrendingUp, IndianRupee, Globe as GlobeIcon } from 'lucide-react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export interface GlobalHub {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  category: 'DOMESTIC_PORT' | 'ENERGY_HUB' | 'TECH_CORRIDOR' | 'STRATEGIC_TRANSIT' | 'WESTERN_GATEWAY';
  vesselsInTransit: number;
  inrTradeVolume: string; // e.g., '₹3,45,000 Cr'
  strategicCommodities: string[];
  indianConnection: string;
  riskStatus: 'SECURE' | 'MODERATE_SURCHARGE' | 'CRITICAL_BOTTLENECK' | 'SANCTION_MONITORED';
  turnaroundHrs: number;
}

export interface PipelineRoute {
  id: string;
  name: string;
  type: 'crude' | 'gas' | 'strategic_corridor';
  capacity: string;
  inrImpact: string;
  coords: [number, number][];
  color: string;
}

// 1. Comprehensive Global & Indian Strategic Hubs
const GLOBAL_HUBS: GlobalHub[] = [
  // --- Indian Domestic Powerhouses ---
  {
    id: 'JNPT',
    name: 'JNPT / Nhava Sheva (Mumbai)',
    country: 'India 🇮🇳',
    lat: 18.95,
    lng: 72.95,
    category: 'DOMESTIC_PORT',
    vesselsInTransit: 34,
    inrTradeVolume: '₹4,85,000 Cr / Yr',
    strategicCommodities: ['Container Cargo', 'Machinery', 'Pharma', 'Textiles'],
    indianConnection: 'Handles >50% of total containerized maritime traffic across major Indian ports. Primary Western economic gateway.',
    riskStatus: 'SECURE',
    turnaroundHrs: 22.4,
  },
  {
    id: 'MUNDRA',
    name: 'Mundra Commercial Mega-Port',
    country: 'India 🇮🇳',
    lat: 22.8395,
    lng: 69.7042,
    category: 'DOMESTIC_PORT',
    vesselsInTransit: 28,
    inrTradeVolume: '₹5,20,000 Cr / Yr',
    strategicCommodities: ['Crude Oil Intake', 'Coal', 'Agri-Exports', 'LNG'],
    indianConnection: 'Deepest draft port feeding crude directly into Salaya-Mathura-Panipat refinery corridors.',
    riskStatus: 'SECURE',
    turnaroundHrs: 18.2,
  },
  {
    id: 'PARADIP',
    name: 'Paradip Deepwater Terminal',
    country: 'India 🇮🇳',
    lat: 20.316,
    lng: 86.611,
    category: 'DOMESTIC_PORT',
    vesselsInTransit: 21,
    inrTradeVolume: '₹2,90,000 Cr / Yr',
    strategicCommodities: ['Russian Crude Transshipment', 'Coking Coal', 'Iron Ore'],
    indianConnection: 'Core Eastern oil refinery feeder connecting IOCL pipelines across Eastern and Central India.',
    riskStatus: 'SECURE',
    turnaroundHrs: 26.5,
  },

  // --- Middle East (Energy Arteries) ---
  {
    id: 'RAS_TANURA',
    name: 'Ras Tanura Terminal',
    country: 'Saudi Arabia 🇸🇦',
    lat: 26.6433,
    lng: 50.1589,
    category: 'ENERGY_HUB',
    vesselsInTransit: 42,
    inrTradeVolume: '₹3,10,000 Cr Crude to India',
    strategicCommodities: ['Arab Light Crude', 'LPG', 'Refined Fuels'],
    indianConnection: 'Origin of ~18% of India’s daily oil intake. Direct long-term supply agreements with IOCL, BPCL & Reliance.',
    riskStatus: 'SECURE',
    turnaroundHrs: 19.0,
  },
  {
    id: 'BASRA',
    name: 'Basra Oil Terminal (Al-Basrah)',
    country: 'Iraq 🇮🇶',
    lat: 29.6811,
    lng: 48.8108,
    category: 'ENERGY_HUB',
    vesselsInTransit: 38,
    inrTradeVolume: '₹3,80,000 Cr Crude to India',
    strategicCommodities: ['Basrah Medium/Heavy Crude', 'Fuel Oil'],
    indianConnection: 'India’s top single crude oil supplier in the Middle East, fueling Mangalore and Jamnagar refineries.',
    riskStatus: 'MODERATE_SURCHARGE',
    turnaroundHrs: 31.0,
  },
  {
    id: 'FUJAIRAH',
    name: 'Port of Fujairah (Bunkering Hub)',
    country: 'United Arab Emirates 🇦🇪',
    lat: 25.1844,
    lng: 56.3622,
    category: 'ENERGY_HUB',
    vesselsInTransit: 65,
    inrTradeVolume: '₹1,95,000 Cr / Yr',
    strategicCommodities: ['Bunker Fuel', 'Petroleum Condensates', 'Gold/Jewellery Transit'],
    indianConnection: 'Strategic bypass to Strait of Hormuz. Vital fueling and transshipment hub for all India-bound VLCC supertankers.',
    riskStatus: 'SECURE',
    turnaroundHrs: 14.5,
  },

  // --- Russia & Eurasia ---
  {
    id: 'NOVOROSSIYSK',
    name: 'Novorossiysk Black Sea Terminal',
    country: 'Russia 🇷🇺',
    lat: 44.7239,
    lng: 37.7686,
    category: 'ENERGY_HUB',
    vesselsInTransit: 29,
    inrTradeVolume: '₹4,10,000 Cr Discounted Oil',
    strategicCommodities: ['Urals Crude Oil', 'Fertilizers (DAP/NPK)', 'Sunflower Oil'],
    indianConnection: 'Key loading point for discounted Russian Urals crude settling via Rupee-Dirham non-dollar trade channels.',
    riskStatus: 'SANCTION_MONITORED',
    turnaroundHrs: 38.0,
  },
  {
    id: 'VLADIVOSTOK',
    name: 'Vladivostok Port (Eastern Sea Route)',
    country: 'Russia 🇷🇺',
    lat: 43.1155,
    lng: 131.8855,
    category: 'STRATEGIC_TRANSIT',
    vesselsInTransit: 16,
    inrTradeVolume: '₹95,000 Cr Emerging Trade',
    strategicCommodities: ['Coking Coal', 'Liquefied Natural Gas', 'Timber'],
    indianConnection: 'Anchor for the Eastern Maritime Corridor (Vladivostok-Chennai route), reducing transit time from 40 to 24 days.',
    riskStatus: 'SECURE',
    turnaroundHrs: 24.0,
  },

  // --- Southeast Asia & Far East (Tech & Transshipment) ---
  {
    id: 'SINGAPORE_PORT',
    name: 'Port of Singapore (PSA Mega Terminal)',
    country: 'Singapore 🇸🇬',
    lat: 1.2644,
    lng: 103.84,
    category: 'TECH_CORRIDOR',
    vesselsInTransit: 112,
    inrTradeVolume: '₹6,40,000 Cr Inbound/Outbound',
    strategicCommodities: ['Electronics', 'Refined Distillates', 'Semiconductors', 'FDI Inflows'],
    indianConnection: 'Primary transshipment hub for ASEAN-India Free Trade Agreement (AIFTA). Core routing for electronic chip supply chains.',
    riskStatus: 'SECURE',
    turnaroundHrs: 11.2,
  },
  {
    id: 'KAOHSIUNG',
    name: 'Port of Kaohsiung',
    country: 'Taiwan 🇹🇼',
    lat: 22.6163,
    lng: 120.2812,
    category: 'TECH_CORRIDOR',
    vesselsInTransit: 45,
    inrTradeVolume: '₹1,20,000 Cr Tech Hardware',
    strategicCommodities: ['Advanced Silicon Wafers (TSMC)', 'Display Panels', 'PCB Components'],
    indianConnection: 'Source of semiconductor components powering India’s smartphone assembly and automotive telematics ecosystem.',
    riskStatus: 'MODERATE_SURCHARGE',
    turnaroundHrs: 16.0,
  },
  {
    id: 'SHANGHAI_PORT',
    name: 'Port of Shanghai (Yangshan Deepwater)',
    country: 'China 🇨🇳',
    lat: 30.6277,
    lng: 122.0644,
    category: 'TECH_CORRIDOR',
    vesselsInTransit: 145,
    inrTradeVolume: '₹8,90,000 Cr Intermediate Goods',
    strategicCommodities: ['Active Pharmaceutical Ingredients (APIs)', 'Solar Panels', 'Telecom Hardware'],
    indianConnection: 'Provides raw APIs for India’s ₹4.5 Lakh Cr pharma export sector and solar photovoltaic components.',
    riskStatus: 'MODERATE_SURCHARGE',
    turnaroundHrs: 15.0,
  },

  // --- Europe & Western Gateways ---
  {
    id: 'ROTTERDAM',
    name: 'Port of Rotterdam (Europort)',
    country: 'Netherlands 🇳🇱',
    lat: 51.95,
    lng: 4.13,
    category: 'WESTERN_GATEWAY',
    vesselsInTransit: 78,
    inrTradeVolume: '₹2,60,000 Cr EU Trade',
    strategicCommodities: ['Refined Indian Diesel/Jet Fuel', 'Engineering Machinery', 'Chemicals'],
    indianConnection: 'Top European destination for Indian refined petroleum fuels (processed from Jamnagar/Vadinar refineries).',
    riskStatus: 'SECURE',
    turnaroundHrs: 17.5,
  },
  {
    id: 'PORT_HOUSTON',
    name: 'Port of Houston (Energy Port)',
    country: 'United States 🇺🇸',
    lat: 29.7499,
    lng: -95.2704,
    category: 'WESTERN_GATEWAY',
    vesselsInTransit: 52,
    inrTradeVolume: '₹2,10,000 Cr US Energy Trade',
    strategicCommodities: ['WTI Crude Oil', 'Liquefied Natural Gas (LNG)', 'Petrochemical Feedstock'],
    indianConnection: 'Export origin for US shale oil and long-term GAIL LNG contracts shipped to Dabhol & Dahej terminals.',
    riskStatus: 'SECURE',
    turnaroundHrs: 20.0,
  },

  // --- Strategic Chokepoint Terminals ---
  {
    id: 'PORT_SAID',
    name: 'Port Said (Suez Canal Entrance)',
    country: 'Egypt 🇪🇬',
    lat: 31.2653,
    lng: 32.3019,
    category: 'STRATEGIC_TRANSIT',
    vesselsInTransit: 68,
    inrTradeVolume: '₹4,50,000 Cr High-Risk Corridor',
    strategicCommodities: ['Indian Engineering Exports', 'Basmati Rice', 'Textiles', 'Automotives'],
    indianConnection: 'The Suez-Red Sea bottleneck. Surcharges and Houthi rerouting via Cape of Good Hope impact Indian export margins by +4.2%.',
    riskStatus: 'CRITICAL_BOTTLENECK',
    turnaroundHrs: 46.0,
  },
];

// 2. Trans-Continental Energy & Trade Arcs (Inbound to Indian Ports)
const STRATEGIC_TRADE_ARCS = [
  { startLat: 26.6433, startLng: 50.1589, endLat: 22.8395, endLng: 69.7042, name: 'Crude: Ras Tanura -> Mundra (₹3.1L Cr)', color: ['#f59e0b', '#22d3ee'] },
  { startLat: 29.6811, startLng: 48.8108, endLat: 18.95, endLng: 72.95, name: 'Crude: Basra -> JNPT Mumbai (₹3.8L Cr)', color: ['#f59e0b', '#22d3ee'] },
  { startLat: 44.7239, startLng: 37.7686, endLat: 20.316, endLng: 86.611, name: 'Urals Crude: Novorossiysk -> Paradip (₹4.1L Cr)', color: ['#ec4899', '#f59e0b'] },
  { startLat: 43.1155, startLng: 131.8855, endLat: 13.0844, endLng: 80.2917, name: 'Eastern Corridor: Vladivostok -> Chennai (₹95K Cr)', color: ['#a855f7', '#22d3ee'] },
  { startLat: 1.2644, startLng: 103.84, endLat: 13.0844, endLng: 80.2917, name: 'Tech & Electronics: Singapore -> Chennai (₹6.4L Cr)', color: ['#10b981', '#22d3ee'] },
  { startLat: 22.6163, startLng: 120.2812, endLat: 18.95, endLng: 72.95, name: 'Semiconductors: Kaohsiung -> Mumbai (₹1.2L Cr)', color: ['#38bdf8', '#10b981'] },
  { startLat: 30.6277, startLng: 122.0644, endLat: 22.8395, endLng: 69.7042, name: 'Pharma APIs: Shanghai -> Mundra (₹8.9L Cr)', color: ['#f43f5e', '#f59e0b'] },
  { startLat: 18.95, startLng: 72.95, endLat: 51.95, endLng: 4.13, name: 'Diesel Exports: Jamnagar/Mumbai -> Rotterdam (₹2.6L Cr)', color: ['#22d3ee', '#10b981'] },
  { startLat: 29.7499, startLng: -95.2704, endLat: 22.8395, endLng: 69.7042, name: 'LNG & Shale: Houston -> Dahej/Mundra (₹2.1L Cr)', color: ['#3b82f6', '#22d3ee'] },
  { startLat: 31.2653, startLng: 32.3019, endLat: 18.95, endLng: 72.95, name: 'Red Sea Corridor: Suez -> JNPT Mumbai (₹4.5L Cr)', color: ['#ef4444', '#22d3ee'] },
];

// 3. Indian Domestic Strategic Pipelines
const DOMESTIC_PIPELINES: PipelineRoute[] = [
  {
    id: 'SMPL',
    name: 'Salaya-Mathura-Panipat Crude Pipeline',
    type: 'crude',
    capacity: '25.0 MMTPA',
    inrImpact: '₹1,25,000 Cr Fuel Security',
    color: '#f59e0b',
    coords: [
      [22.3167, 69.6],
      [24.5854, 73.7125],
      [27.1767, 78.0081],
      [29.3909, 76.9635],
    ],
  },
  {
    id: 'PHBPL',
    name: 'Paradip-Haldia-Barauni Crude Line',
    type: 'crude',
    capacity: '15.2 MMTPA',
    inrImpact: '₹84,000 Cr Eastern Refineries',
    color: '#f97316',
    coords: [
      [20.316, 86.611],
      [22.0624, 88.086],
      [25.4358, 85.9818],
    ],
  },
  {
    id: 'KBPL',
    name: 'Kandla-Bhatinda Product Pipeline',
    type: 'gas',
    capacity: '8.8 MMTPA',
    inrImpact: '₹42,000 Cr Agri/North Fuel',
    color: '#22d3ee',
    coords: [
      [23.0117, 70.2185],
      [26.2389, 73.0243],
      [30.211, 74.9455],
    ],
  },
];

interface Props {
  activeLayers: {
    exchanges: boolean;
    chokepoints: boolean;
    tradeArcs: boolean;
    ports?: boolean;
    pipelines?: boolean;
    foreignHubs?: boolean;
  };
  focusCoords: [number, number] | null;
}

export default function GlobalMap({ activeLayers, focusCoords }: Props) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHub, setSelectedHub] = useState<GlobalHub | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Initial Camera centered on Indian Ocean & Eurasian Crossway
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
      globeRef.current.pointOfView({ lat: 20, lng: 75, altitude: 2.1 });
    }
  }, []);

  // Smooth Fly-to controller
  useEffect(() => {
    if (globeRef.current && focusCoords) {
      const [lng, lat] = focusCoords;
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView({ lat, lng, altitude: 1.25 }, 1800);
    }
  }, [focusCoords]);

  // Points filtering
  const visibleHubs = GLOBAL_HUBS.filter((hub) => {
    if (hub.category === 'DOMESTIC_PORT' && activeLayers.ports === false) return false;
    if (hub.category !== 'DOMESTIC_PORT' && activeLayers.foreignHubs === false) return false;
    return true;
  });

  const pipelinePaths = (activeLayers.pipelines !== false)
    ? DOMESTIC_PIPELINES.map((p) => ({
        name: p.name,
        color: p.color,
        coords: p.coords,
      }))
    : [];

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, backgroundColor: '#070a13' }}>
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        // 1. Trans-Continental Trade Arcs
        arcsData={activeLayers.tradeArcs !== false ? STRATEGIC_TRADE_ARCS : []}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.25}
        arcDashAnimateTime={2600}
        arcStroke={1.4}
        arcAltitudeAutoScale={0.35}

        // 2. Domestic Oil & Gas Pipelines
        pathsData={pipelinePaths}
        pathPoints="coords"
        pathPointLat={(p: any) => p[0]}
        pathPointLng={(p: any) => p[1]}
        pathColor="color"
        pathStroke={2.8}
        pathDashLength={0.15}
        pathDashGap={0.06}
        pathDashAnimateTime={3000}

        // 3. Global Maritime & Strategic Hubs (Click to Inspect)
        pointsData={visibleHubs}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: any) =>
          d.category === 'DOMESTIC_PORT'
            ? '#22d3ee'
            : d.category === 'ENERGY_HUB'
            ? '#f59e0b'
            : d.category === 'TECH_CORRIDOR'
            ? '#10b981'
            : d.category === 'CRITICAL_BOTTLENECK' || d.riskStatus === 'CRITICAL_BOTTLENECK'
            ? '#ef4444'
            : '#38bdf8'
        }
        pointAltitude={0.035}
        pointRadius={(d: any) => (d.category === 'DOMESTIC_PORT' ? 0.8 : 0.65)}
        onPointClick={(point: any) => {
          setSelectedHub(point as GlobalHub);
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = false;
            globeRef.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.2 }, 1500);
          }
        }}
        pointLabel={(d: any) => `
          <div style="background:#0b0f19; color:#fff; padding:6px 12px; border-radius:6px; font-family:sans-serif; font-size:12px; border:1px solid rgba(34,211,238,0.4);">
            <b style="color:#22d3ee">${d.name}</b> (${d.country})<br/>
            <span style="color:#f59e0b; font-size:11px; font-weight:bold;">${d.inrTradeVolume}</span><br/>
            <span style="color:#94a3b8; font-size:10px;">Click to view Indian Strategic Connection</span>
          </div>
        `}

        // 4. Activity Rings
        ringsData={visibleHubs}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: any) => (t: number) =>
          d.category === 'DOMESTIC_PORT'
            ? `rgba(34, 211, 238, ${1 - t})`
            : d.riskStatus === 'CRITICAL_BOTTLENECK'
            ? `rgba(239, 68, 68, ${1 - t})`
            : `rgba(245, 158, 11, ${1 - t})`
        }
        ringMaxRadius={3.0}
        ringPropagationSpeed={1.5}
        ringRepeatPeriod={1400}
      />

      {/* Extreme Deep Strategic Hub Inspection Drawer */}
      {selectedHub && (
        <div className="absolute top-6 left-6 z-20 w-96 rounded-2xl border border-cyan-500/40 bg-[#0b0f19]/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-left-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] uppercase font-bold">
                <Anchor className="h-3.5 w-3.5" /> Strategic Global Terminal
              </div>
              <h3 className="text-sm font-bold text-slate-100 mt-1">{selectedHub.name}</h3>
              <span className="text-[11px] text-slate-400 font-mono">{selectedHub.country}</span>
            </div>
            <button
              onClick={() => setSelectedHub(null)}
              className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Strategic Value in ₹ */}
          <div className="my-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
            <span className="text-xs text-slate-300 flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4 text-cyan-400" /> Annual Trade / Oil Volume:
            </span>
            <span className="font-mono font-bold text-cyan-300 text-xs">{selectedHub.inrTradeVolume}</span>
          </div>

          {/* Indian Economic Connection (Deep Breakdown) */}
          <div className="mb-3 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <GlobeIcon className="h-3.5 w-3.5 text-emerald-400" /> Strategic Indian Linkage:
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              {selectedHub.indianConnection}
            </p>
          </div>

          {/* Strategic Commodities Pills */}
          <div className="mb-3">
            <div className="text-[10px] text-slate-400 font-mono mb-1.5 uppercase">Critical Flow Commodities:</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedHub.strategicCommodities.map((item) => (
                <span key={item} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Live Port Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">Active Vessels Inflow:</div>
              <div className="text-sm font-bold font-mono text-slate-100 mt-0.5">{selectedHub.vesselsInTransit} Ships</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">Avg Turnaround:</div>
              <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{selectedHub.turnaroundHrs} Hrs</div>
            </div>
          </div>

          {/* Risk Grid Status */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono">
            <span className="text-slate-400">Maritime Risk Status:</span>
            <span
              className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                selectedHub.riskStatus === 'CRITICAL_BOTTLENECK'
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-300'
                  : selectedHub.riskStatus === 'SANCTION_MONITORED'
                  ? 'border-pink-500/50 bg-pink-500/20 text-pink-300'
                  : selectedHub.riskStatus === 'MODERATE_SURCHARGE'
                  ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                  : 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
              }`}
            >
              {selectedHub.riskStatus.replace('_', ' ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}