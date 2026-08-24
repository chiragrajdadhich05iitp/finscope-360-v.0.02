import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const systemPrompt = `
      You are the FinScope 360 AI Voice Financial Copilot for Indian Financial Markets & Global Macro.
      The user will speak in Hindi, English, or Hinglish.
      
      Your goal:
      1. Provide a direct, crisp, and analytical 2-sentence response in natural Hinglish/English (conversational tone suitable for voice speech).
      2. If the user query is asking about a specific platform section, optionally specify a target navigation path in JSON:
         - Globe / Map: "/"
         - Market Terminal / Prices / Candlesticks: "/terminal"
         - Sector Heatmap / Advances: "/sectors"
         - Institutional / FII / DII / PCR: "/institutional"
         - AI Stress Test: "/stress-test"
         - Risk Matrix / Chokepoints: "/risk"
      
      Context details for Indian markets:
      - Nifty 50: ~24,850 (Bullish bias), Bank Nifty: ~51,240
      - Mumbai / JNPT & Mundra: Strategic crude & container gateways.
      - Red Sea / Suez Canal: Elevated freight risk (~+4.2% shipping premium).
      - FII/DII: Net buyers in cash equities (+₹3,950 Cr).
      - Nifty IT: Strong momentum on US tech recovery.

      Output JSON format:
      {
        "spokenText": "short conversational voice response",
        "navigatePath": "/path or null"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\nUser Query: "${query}"`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Voice Copilot Error:', error);
    return NextResponse.json({
      spokenText: 'Nifty IT sector mein achha momentum hai aur Mumbai port par crude supply lines safe hain.',
      navigatePath: null,
    });
  }
}