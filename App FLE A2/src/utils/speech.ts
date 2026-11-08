/**
 * Speech synthesis utility for FLE French pronunciation
 */

let speechRate = 0.9; // Slightly slower than 1.0 by default for A2 comprehension

export function setGlobalSpeechRate(rate: number) {
  speechRate = rate;
}

export function getGlobalSpeechRate(): number {
  return speechRate;
}

export function speakFrench(
  text: string,
  options?: {
    rate?: number;
    onEnd?: () => void;
    onError?: () => void;
  }
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterance

    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = options?.rate ?? speechRate;
    utterance.pitch = 1.0;

    // Try finding the best available French voice
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find(
      (v) => v.lang.startsWith('fr') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Thomas') || v.name.includes('Audrey') || v.name.includes('Amelie') || !v.localService)
    ) || voices.find((v) => v.lang.startsWith('fr'));

    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    if (options?.onEnd) {
      utterance.onend = () => options.onEnd?.();
    }
    if (options?.onError) {
      utterance.onerror = () => options.onError?.();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    return false;
  }
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
