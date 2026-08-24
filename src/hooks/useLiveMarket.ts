'use client';

import { useState, useEffect } from 'react';

export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  unit: string;
}

const INITIAL_DATA: Record<string, MarketItem> = {
  NIFTY50: { symbol: 'NIFTY 50', name: 'Nifty 50 (NSE)', price: 24850.25, change: 0.65, unit: '₹' },
  BANKNIFTY: { symbol: 'BANKNIFTY', name: 'Bank Nifty', price: 51240.80, change: 0.42, unit: '₹' },
  SENSEX: { symbol: 'SENSEX', name: 'BSE Sensex', price: 81380.10, change: 0.58, unit: '₹' },
  GOLD_MCX: { symbol: 'GOLD 24K', name: 'MCX Gold (10g)', price: 72450.00, change: 0.28, unit: '₹' },
  SILVER_MCX: { symbol: 'SILVER', name: 'MCX Silver (1kg)', price: 88900.00, change: -0.35, unit: '₹' },
  CRUDE_INR: { symbol: 'CRUDE OIL', name: 'Crude Oil (bbl)', price: 6890.00, change: 1.15, unit: '₹' },
  USDINR: { symbol: 'USD/INR', name: 'US Dollar / INR', price: 83.94, change: -0.04, unit: '₹' },
};

export function useLiveMarket() {
  const [data, setData] = useState<Record<string, MarketItem>>(INITIAL_DATA);

  useEffect(() => {
    // Live realistic price fluctuation simulator in INR
    const interval = setInterval(() => {
      setData((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((key) => {
          const item = updated[key];
          const delta = (Math.random() - 0.49) * (item.price * 0.0008);
          const newPrice = +(item.price + delta).toFixed(2);
          const newChange = +(((newPrice - item.price) / item.price) * 100).toFixed(2);
          updated[key] = { ...item, price: newPrice, change: newChange !== 0 ? newChange : item.change };
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return Object.values(data);
}