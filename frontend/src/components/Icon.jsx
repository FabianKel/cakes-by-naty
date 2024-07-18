import React from 'react'

function Icon({ src, alt, className, height = '0', width = '0' }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`h-${height} w-${width} ${className}`}
        />
    )
}
export default Icon 