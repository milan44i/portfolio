"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Character {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [character, setCharacter] = useState<Character>({
    x: 50,
    y: 50,
    direction: 'down',
    isMoving: false,
  });
  const [prevPosition, setPrevPosition] = useState({ x: 50, y: 50 });

  const controls = useAnimation();
  const textControls = useAnimation();

  // Animation sequence for the hero content
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          staggerChildren: 0.2,
          delayChildren: 0.3,
        }
      });
    };

    sequence();
  }, [controls, textControls]);

  // Handle mouse movement for pixel character
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Get canvas bounds
      const canvasRect = canvas.getBoundingClientRect();

      // Calculate mouse position relative to canvas
      const mouseX = e.clientX - canvasRect.left;
      const mouseY = e.clientY - canvasRect.top;

      // Determine direction based on movement
      let newDirection = character.direction;

      if (Math.abs(mouseX - prevPosition.x) > Math.abs(mouseY - prevPosition.y)) {
        // Horizontal movement is greater
        newDirection = mouseX > prevPosition.x ? 'right' : 'left';
      } else {
        // Vertical movement is greater
        newDirection = mouseY > prevPosition.y ? 'down' : 'up';
      }

      // Update previous position
      setPrevPosition({ x: mouseX, y: mouseY });

      // Update character position and direction
      setCharacter({
        x: mouseX,
        y: mouseY,
        direction: newDirection,
        isMoving: true,
      });

      // Set character to not moving after a brief delay
      setTimeout(() => {
        setCharacter(prev => ({ ...prev, isMoving: false }));
      }, 100);
    };

    // Throttle mouse move events
    let throttleTimeout: NodeJS.Timeout | null = null;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          handleMouseMove(e);
          throttleTimeout = null;
        }, 16); // roughly 60fps
      }
    };

    window.addEventListener('mousemove', throttledMouseMove);

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [character.direction, prevPosition]);

  // Bomberman grid background
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    const cellSize = 50;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw random "blocks" in Bomberman style
    ctx.fillStyle = 'rgba(100, 120, 180, 0.15)';
    for (let x = cellSize; x < canvas.width; x += cellSize * 2) {
      for (let y = cellSize; y < canvas.height; y += cellSize * 2) {
        if (Math.random() > 0.7) {
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }

    // Draw character
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(character.x, character.y, 20, 20);

    // Draw character details based on direction
    ctx.fillStyle = '#000';
    switch(character.direction) {
      case 'up':
        ctx.fillRect(character.x + 5, character.y + 5, 3, 3);
        ctx.fillRect(character.x + 12, character.y + 5, 3, 3);
        ctx.fillRect(character.x + 8, character.y + 12, 4, 2);
        break;
      case 'down':
        ctx.fillRect(character.x + 5, character.y + 8, 3, 3);
        ctx.fillRect(character.x + 12, character.y + 8, 3, 3);
        ctx.fillRect(character.x + 8, character.y + 15, 4, 2);
        break;
      case 'left':
        ctx.fillRect(character.x + 5, character.y + 8, 3, 3);
        ctx.fillRect(character.x + 8, character.y + 15, 4, 2);
        break;
      case 'right':
        ctx.fillRect(character.x + 12, character.y + 8, 3, 3);
        ctx.fillRect(character.x + 8, character.y + 15, 4, 2);
        break;
    }

    // If character is moving, add animation frame
    if (character.isMoving) {
      requestAnimationFrame(() => {
        setCharacter(prev => ({ ...prev })); // Trigger re-render
      });
    }
  }, [character]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-24 px-4">
      {/* Pixelated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Pixel dust particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-80"
            animate={{
              x: ['0%', '100%'],
              y: ['0%', '100%'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
        >
          {/* Hero content */}
          <motion.div
            animate={textControls}
            initial={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            <motion.div
              className="inline-block pixel-border bg-slate-800/60 backdrop-blur-sm px-8 py-4 mb-6 text-yellow-400 text-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h1 className="pixel-text">React Developer</h1>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Frontend Developer <br />
              <span className="text-blue-400">React & React Native</span> Specialist
            </motion.h1>

            <motion.p
              className="text-lg mt-6 text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Building modern, responsive web applications and mobile experiences with a focus on performance and user experience.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button asChild size="lg" className="pixel-text bg-blue-600 hover:bg-blue-700">
                <Link href="#projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="pixel-text border-blue-600 text-blue-400">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-slate-400 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              Move your mouse around to control the pixel character!
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
