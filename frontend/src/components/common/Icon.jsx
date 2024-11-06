import React from 'react';
import Badge from './Badge';

function Icon({ src, alt, counts, className, height = '0', width = '0' }) {
  return (
    <>
      <img src={src} alt={alt} className={`h-${height} w-${width} ${className} relative`} />

      {counts > 0 && <Badge counts={counts} />}
    </>
  );
}
export default Icon;
