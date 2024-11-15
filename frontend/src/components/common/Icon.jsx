import React from 'react';
import Badge from './Badge';

function Icon({ src, alt, counts, className, height = '0', width = '0' }) {
  return (
    <div className="relative inline-flex items-center">
      <img 
        src={src} 
        alt={alt} 
        className={`h-${height} w-${width} ${className}`} 
      />
      {counts > 0 && <Badge counts={counts} />}
    </div>
  );
}

export default Icon;
