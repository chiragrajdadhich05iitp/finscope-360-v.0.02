'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, MicOff, Sparkles, Volume2, VolumeX, X, Loader2 } from 'lucide-react';

export default function VoiceCopilot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          setTranscript(spoken);
          handleVoiceQuery(spoken);
        };

        // Graceful error handler (prevents Next.js dev overlay trigger)
        recognition.onerror = (err: any) => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'hi-IN';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please use Chrome/Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setReply('');
      stopSpeaking();
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Ignore if already active
      }
    }
  };

  const handleVoiceQuery = async (queryText: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/voice-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });
      const data = await res.json();
      const spokenResponse = data.spokenText || 'Main aapki query process kar raha hoon.';
      setReply(spokenResponse);

      speakText(spokenResponse);

      if (data.navigatePath) {
        setTimeout(() => {
          router.push(data.navigatePath);
        }, 800);
      }
    } catch (e) {
      setReply('Voice command process karne mein dikkat aayi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-xs shadow-2xl transition-all ${
            isOpen || isListening
              ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/30 shadow-cyan-500/50'
              : 'bg-[#0b0f19] border border-cyan-500/40 text-cyan-300 hover:bg-slate-900'
          }`}
        >
          <Mic className={`h-4 w-4 ${isListening ? 'animate-bounce text-slate-950' : 'text-cyan-400'}`} />
          <span>{isListening ? 'Listening...' : 'AI Voice Copilot'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 rounded-2xl border border-cyan-500/40 bg-[#0b0f19]/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
              <Sparkles className="h-4 w-4" /> FinScope Voice Assistant
            </div>
            <button
              onClick={() => {
                stopSpeaking();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg bg-slate-800/40"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="my-4 space-y-3">
            <div className="flex items-center justify-center py-4">
              <button
                onClick={toggleListening}
                className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-500/20'
                    : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40'
                }`}
              >
                {isListening ? <Mic className="h-7 w-7" /> : <MicOff className="h-7 w-7" />}
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-400 font-mono">
              {isListening ? '🎙️ Listening... Bol sakte hain' : 'Click mic to speak in Hindi or English'}
            </div>

            {transcript && (
              <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-2.5 text-xs text-slate-300">
                <span className="text-[10px] text-slate-500 font-mono block mb-0.5">Aapne pucha:</span>
                "{transcript}"
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center gap-2 py-2 text-xs text-cyan-400 font-mono">
                <Loader2 className="h-4 w-4 animate-spin" /> Analysing market pulse...
              </div>
            )}

            {reply && (
              <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3 text-xs text-cyan-200 leading-relaxed relative">
                <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono mb-1">
                  <span>AI Copilot:</span>
                  {isSpeaking ? (
                    <button onClick={stopSpeaking} className="flex items-center gap-1 hover:underline">
                      <Volume2 className="h-3 w-3 animate-pulse" /> Speaking...
                    </button>
                  ) : (
                    <button onClick={() => speakText(reply)} className="flex items-center gap-1 hover:underline">
                      <VolumeX className="h-3 w-3" /> Replay Voice
                    </button>
                  )}
                </div>
                {reply}
              </div>
            )}

            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] text-slate-500 font-mono mb-1.5">Try saying:</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    const text = 'Nifty IT sector ka mood kaisa hai?';
                    setTranscript(text);
                    handleVoiceQuery(text);
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 hover:border-cyan-500/40"
                >
                  "Nifty IT sector ka mood kaisa hai?"
                </button>
                <button
                  onClick={() => {
                    const text = 'Mumbai port aur Red sea risk kya hai?';
                    setTranscript(text);
                    handleVoiceQuery(text);
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 hover:border-cyan-500/40"
                >
                  "Mumbai port risk kya hai?"
                </button>
                <button
                  onClick={() => {
                    const text = 'Show me FII DII numbers';
                    setTranscript(text);
                    handleVoiceQuery(text);
                  }}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 hover:border-cyan-500/40"
                >
                  "Show FII DII numbers"
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}