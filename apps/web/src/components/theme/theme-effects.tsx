'use client';

import React, { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';

export type ThemeEffectType = 'none' | 'snow' | 'sakura';

interface ThemeEffectsProps {
  effect: ThemeEffectType;
}

const sakuraImage = typeof document !== 'undefined' ? new Image() : null;
if (sakuraImage) {
  sakuraImage.src =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iI2ZmYjZWMSI+PHBhdGggZD0iTTEwIDBDNiA4IDIgMTAgMiAxNmMwIDMuMyAyLjcgNiA2IDZzNi0yLjcgNi02YzAtNi00LTgtNi0xNnoiIG9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==';
}

export function ThemeEffects({ effect }: ThemeEffectsProps) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    if (effect === 'sakura' && sakuraImage) {
      setImages([sakuraImage]);
    } else {
      setImages([]);
    }
  }, [effect]);

  if (effect === 'none') return null;

  if (effect === 'snow') {
    return (
      <Snowfall
        snowflakeCount={150}
        radius={[0.5, 3.0]}
        speed={[0.5, 3.0]}
        wind={[-0.5, 2.0]}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      />
    );
  }

  if (effect === 'sakura') {
    return (
      <Snowfall
        snowflakeCount={50}
        radius={[5, 12]}
        speed={[0.5, 2.5]}
        wind={[-1, 3.0]}
        images={images}
        color="#ffb7b2"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      />
    );
  }

  return null;
}
