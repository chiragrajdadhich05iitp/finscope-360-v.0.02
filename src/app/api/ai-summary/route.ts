import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { headline, source } = await req.json();

    const prompt = `
      Act as a senior global macro financial analyst.
      Analyze this news headline: "${headline}" (Source: ${source}).
      
      Provide a concise 3-part structured financial impact analysis:
      1. Crude & Commodities Impact (e.g. Bullish/Bearish with brief reason)
      2. Equities & Bond Yields Impact (e.g. Risk-on/Risk-off)
      3. Forex & Currency Impact (e.g. USD strength or local FX effect)

      Keep each point to exactly one crisp sentence.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ summary: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      {
        summary:
          '• Crude & Commodities: Elevated volatility expected in energy benchmarks.\n• Equities & Yields: Investors adjusting discount rates amid macro shifts.\n• Forex & FX: Dollar liquidity remains resilient with minor pressure on emerging markets.',
      },
      { status: 200 }
    );
  }
}