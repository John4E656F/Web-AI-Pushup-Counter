'use client';
import React, { useRef, useEffect } from 'react';
import { usePoseDetection } from '@/hooks/usePoseDetection';

const CounterPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log('Stream:', stream); // For debugging
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(console.error); // Log any error
  }, []);

  usePoseDetection(videoRef, canvasRef);

  return (
    <div style={{ position: 'relative', width: '640px', height: '480px', margin: 'auto' }}>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default CounterPage;
