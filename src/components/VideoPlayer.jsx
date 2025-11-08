import React from 'react';

export default function VideoPlayer({ videoId, autoplay = true, loop = true, className = "" }) {
  // Convert Google Drive link to embeddable format
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview`;

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow={`autoplay; ${autoplay ? 'autoplay;' : ''} encrypted-media`}
        allowFullScreen
        style={{ border: 'none' }}
      />
    </div>
  );
}