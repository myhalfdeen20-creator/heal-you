import { useState } from 'react';
import { Leaf } from 'lucide-react';

interface BrandLogoProps {
  sizeClass?: string;
  roundedClass?: string;
}

export function BrandLogo({
  sizeClass = 'w-16 h-16 sm:w-20 sm:h-20',
  roundedClass = 'rounded-2xl',
}: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`inline-flex items-center justify-center ${sizeClass} bg-white/90 ${roundedClass} shadow-sm border border-slate-200/70 overflow-hidden p-1`}
      aria-hidden="true"
    >
      {failed ? (
        <div className="w-full h-full flex items-center justify-center bg-[#6B688D]/10 text-[#5E5B80] rounded-xl">
          <Leaf className="w-1/2 h-1/2" />
        </div>
      ) : (
        <img
          src="/logo-healyou.webp"
          alt="Logo HealYou"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-xl"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
