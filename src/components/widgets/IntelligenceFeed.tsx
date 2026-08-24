'use client';

import React from 'react';
import { Newspaper, Zap, Sparkles } from 'lucide-react';

export interface FeedItem {
  id: string;
  source: string;
  time: string;
  headline: string;
  impact: 'BULLISH' | 'BEARISH' | 'HIGH_VOLATILITY';
}

const FEEDS: FeedItem[] = [
  {
    id: '1',
    source: 'RBI BULLETIN / PTI',
    time: '4m ago',
    headline: 'RBI Governor indicates stable repo rate stance amid strong domestic GDP growth.',
    impact: 'BULLISH',
  },
  {
    id: '2',
    source: 'ECONOMIC TIMES',
    time: '14m ago',
    headline: 'Crude import costs decline 2.1% as Indian refiners diversify maritime logistics.',
    impact: 'BULLISH',
  },
  {
    id: '3',
    source: 'MINT / MONEYCONTROL',
    time: '32m ago',
    headline: 'Red Sea freight surcharges impact Indian textile and engineering export margins.',
    impact: 'BEARISH',
  },
  {
    id: '4',
    source: 'NSE DATAWIRE',
    time: '45m ago',
    headline: 'FIIs pump ₹1,840 Crore into Indian Equities; Banking & Capital Goods lead inflows.',
    impact: 'HIGH_VOLATILITY',
  },
];

interface Props {
  onSelectNews: (item: FeedItem) => void;
}

export default function IntelligenceFeed({ onSelectNews }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase">
          <Newspaper className="h-4 w-4 text-cyan-400" /> Indian Market AI Wire
        </span>
        <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
          <Zap className="h-3 w-3" /> LIVE AI TAGS
        </span>
      </div>

      <div className="space-y-2">
        {FEEDS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectNews(item)}
            className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 hover:border-cyan-500/40 cursor-pointer transition-colors group"
          >
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1 font-mono">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
            <p className="text-xs text-slate-200 leading-snug mb-2 group-hover:text-cyan-200 transition-colors">
              {item.headline}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                  item.impact === 'BULLISH'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    : item.impact === 'BEARISH'
                    ? 'border-rose-500/40 bg-rose-500/10 text-rose-400'
                    : 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                }`}
              >
                {item.impact}
              </span>
              <span className="text-[10px] text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="h-2.5 w-2.5" /> AI Impact
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}