import type { KeyboardEvent } from 'react';
import { findGlossaryEntry } from '../data/glossary';
import type { GlossaryEntry } from '../types';

interface GlossaryTextProps {
  text: string;
  accentHex: string;
  onSelectTerm: (entry: GlossaryEntry) => void;
}

/**
 * Renders prose and ONLY converts quoted or parenthesized phrases into interactive
 * glossary links when an actual glossary definition exists—eliminating dead clicks.
 */
export function GlossaryText({ text, accentHex, onSelectTerm }: GlossaryTextProps) {
  const parts = text.split(/('[^']+'|\([^)]+\))/g);

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>, entry: GlossaryEntry) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectTerm(entry);
    }
  };

  return (
    <>
      {parts.map((part, idx) => {
        const isQuoted = part.startsWith("'") && part.endsWith("'");
        const isParen = part.startsWith('(') && part.endsWith(')');

        if (!isQuoted && !isParen) {
          return <span key={idx}>{part}</span>;
        }

        const entry = findGlossaryEntry(part);
        if (!entry) {
          return <span key={idx}>{part}</span>;
        }

        const display = isQuoted ? part.slice(1, -1) : part;

        return (
          <span
            key={idx}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onSelectTerm(entry);
            }}
            onKeyDown={(e) => handleKeyDown(e, entry)}
            className="font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:opacity-75 transition-opacity"
            style={{ color: accentHex }}
            title={`Lihat penjelasan: ${entry.title}`}
          >
            {display}
          </span>
        );
      })}
    </>
  );
}
