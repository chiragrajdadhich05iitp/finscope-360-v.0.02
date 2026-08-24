'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, IChartApi } from 'lightweight-charts';

interface Props {
  symbol: string;
}

export default function TradingChart({ symbol }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(30, 41, 59, 0.4)' },
        horzLines: { color: 'rgba(30, 41, 59, 0.4)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 220,
      timeScale: {
        borderColor: '#1e293b',
        timeVisible: true,
      },
      localization: {
        priceFormatter: (price: number) => '₹' + price.toLocaleString('en-IN', { maximumFractionDigits: 2 }),
      },
    });

    let series: any;
    if (typeof (chart as any).addCandlestickSeries === 'function') {
      series = (chart as any).addCandlestickSeries({
        upColor: '#10b981',
        downColor: '#f43f5e',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#f43f5e',
      });
    } else {
      series = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#f43f5e',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#f43f5e',
      });
    }

    const basePrice =
      symbol === 'NIFTY 50'
        ? 24800
        : symbol === 'BANKNIFTY'
        ? 51200
        : symbol === 'GOLD 24K'
        ? 72400
        : symbol === 'SILVER'
        ? 88800
        : 6800;

    const data = [];
    const now = Math.floor(Date.now() / 1000) - 3600 * 24;

    let current = basePrice;
    for (let i = 0; i < 30; i++) {
      const open = current;
      const change = (Math.random() - 0.48) * (basePrice * 0.008);
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.003);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.003);
      data.push({
        time: (now + i * 3600) as any,
        open: +open.toFixed(2),
        high: +high.toFixed(2),
        low: +low.toFixed(2),
        close: +close.toFixed(2),
      });
      current = close;
    }

    series.setData(data);
    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol]);

  return <div ref={chartContainerRef} className="w-full h-[220px]" />;
}