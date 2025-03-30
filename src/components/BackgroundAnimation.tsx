import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Dot properties
    const dots: { x: number; y: number; speed: number }[] = [];
    const dotCount = Math.floor((window.innerWidth * window.innerHeight) / 20000); // Adjust density
    const dotSize = 2;

    // Initialize dots
    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 0.5, // Random speed between 0.5 and 1
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.forEach(dot => {
        // Move dot upward
        dot.y -= dot.speed;

        // Reset position if dot moves off screen
        if (dot.y < -dotSize) {
          dot.y = canvas.height + dotSize;
          dot.x = Math.random() * canvas.width;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default BackgroundAnimation;