'use client';

import React, { useState } from 'react';
import { Sparkles, Newspaper, Zap } from 'lucide-react';
import IntelligenceFeed, { FeedItem } from '@/components/widgets/IntelligenceFeed';
import AiImpactModal from '@/components/widgets/AiImpactModal';

export default function AiIntelPage() {
  const [selectedNews, setSelectedNews] = useState<FeedItem | null>(null);

  return (
    <div className="p-6 max-w-5xl mx-auto h-full overflow-y-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold text-slate-100">AI Macro Intelligence Center</h1>
            <p className="text-xs text-slate-400">Click any news event to run a live Gemini macro breakdown</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-5">
        <IntelligenceFeed onSelectNews={(item) => setSelectedNews(item)} />
      </div>

      <AiImpactModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
}