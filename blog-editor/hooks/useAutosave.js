import { useEffect, useRef, useState } from 'react';
import { buildMarkdown } from '../lib/postTypes';

const LS_PREFIX = 'editor:autosave:';

const lsKey = (formData) =>
  `${LS_PREFIX}${formData.currentDraftFile || 'new-post'}`;

export function readAutosave(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function listAutosaveKeys() {
  if (typeof window === 'undefined') return [];
  const out = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(LS_PREFIX)) out.push(k);
  }
  return out;
}

export function clearAutosave(formData) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(lsKey(formData));
}

export default function useAutosave(formData, { serverSaveIntervalMs = 30_000, debounceMs = 1500 } = {}) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'dirty' | 'saving' | 'saved' | 'error'
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const lastServerSerialRef = useRef('');
  const lastLocalSerialRef = useRef(JSON.stringify(formData));
  const debounceTimerRef = useRef(null);

  // Debounced localStorage write on every formData change
  useEffect(() => {
    const serial = JSON.stringify(formData);
    if (serial === lastLocalSerialRef.current) return;
    lastLocalSerialRef.current = serial;
    setStatus((s) => (s === 'saving' ? s : 'dirty'));

    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(
          lsKey(formData),
          JSON.stringify({ formData, savedAt: Date.now() }),
        );
      } catch {
        // ignore quota errors
      }
    }, debounceMs);

    return () => clearTimeout(debounceTimerRef.current);
  }, [formData, debounceMs]);

  // Periodic server save
  useEffect(() => {
    const tick = async () => {
      if (!formData.title || !formData.title.trim()) return;
      const serial = JSON.stringify({
        title: formData.title,
        date: formData.date,
        content: formData.content,
        tags: formData.tags,
        featuredImage: formData.featuredImage,
      });
      if (serial === lastServerSerialRef.current) return;

      setStatus('saving');
      try {
        const body = buildMarkdown({ ...formData, isDraft: true });
        const res = await fetch('/api/save-draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: body, title: formData.title, date: formData.date }),
        });
        if (!res.ok) throw new Error(`save-draft ${res.status}`);

        lastServerSerialRef.current = serial;
        setLastSavedAt(Date.now());
        setStatus('saved');
      } catch {
        setStatus('error');
      }
    };

    const id = setInterval(tick, serverSaveIntervalMs);
    return () => clearInterval(id);
  }, [formData, serverSaveIntervalMs]);

  return { status, lastSavedAt };
}
