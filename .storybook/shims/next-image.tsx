import React from 'react';

export default function Image({
  src,
  alt = '',
  fill,
  priority,
  sizes,
  className = '',
  style,
  ...props
}: any) {
  const imageSrc = typeof src === 'object' ? src?.src || '' : src;
  const normalizedSrc = imageSrc?.startsWith('//') ? `https:${imageSrc}` : imageSrc;

  return (
    <img
      src={normalizedSrc}
      alt={alt}
      className={className}
      style={{
        ...(fill ? { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 } : {}),
        ...style,
      }}
      {...props}
    />
  );
}
