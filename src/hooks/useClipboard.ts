import { useState } from 'react';

export default function useClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    } catch (err) {
      console.error('Falha ao copiar para o clipboard:', err);
      setIsCopied(false);
    }
  };

  return { isCopied, copy };
}
