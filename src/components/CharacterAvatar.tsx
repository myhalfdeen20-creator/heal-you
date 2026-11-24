import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { ArchetypeId } from '../types';

interface CharacterAvatarProps {
  id: ArchetypeId;
  name?: string;
  colorHex: string;
  size?: 'xs' | 'small' | 'medium' | 'large';
  eager?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<CharacterAvatarProps['size']>, string> = {
  xs: 'w-12 h-12',
  small: 'w-16 h-16 sm:w-20 sm:h-20',
  medium: 'w-28 h-28 sm:w-36 sm:h-36',
  large: 'w-40 h-40 sm:w-52 sm:h-52',
};

export function CharacterAvatar({
  id,
  name,
  colorHex,
  size = 'large',
  eager = false,
}: CharacterAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const dims = SIZE_CLASSES[size];

  return (
    <div
      className={`${dims} shrink-0 rounded-full overflow-hidden shadow-lg mx-auto flex items-center justify-center relative bg-white`}
      style={{
        backgroundColor: `${colorHex}14`,
        border: `3px solid ${colorHex}38`,
      }}
    >
      {hasError ? (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-2 text-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colorHex}26, ${colorHex}08)`,
            color: colorHex,
          }}
          aria-label={name ? `Ilustrasi ${name}` : `Ilustrasi ${id}`}
        >
          <Sparkles className="w-1/3 h-1/3 opacity-75" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={`/avatars/${id}.webp`}
          alt={name ? `Ilustrasi ${name}` : `Ilustrasi ${id}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
