"use client"

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, Text, Float } from '@react-three/drei';
import { Model as Shiba } from './models/shiba';
import { useTheme } from 'next-themes';
import { Suspense } from 'react';

function TamagotchiStats({ position, happiness, energy }: { position: [number, number, number], happiness: number, energy: number }) {
  const textColor = '#00ff00';
  return (
    <group position={position}>
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {`Happiness: ${happiness}%`}
      </Text>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.2}
        color={textColor}
        anchorX="center"
        anchorY="middle"
      >
        {`Energy: ${energy}%`}
      </Text>
    </group>
  );
}

function FloatingIcons({ onFeed, onPlay }: { onFeed: () => void, onPlay: () => void }) {
  const [feedHovered, setFeedHovered] = useState(false);
  const [playHovered, setPlayHovered] = useState(false);

  return (
    <group position={[0, -1, 2]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group 
          position={[-1, 0, 0]} 
          onClick={onFeed}
          onPointerOver={() => setFeedHovered(true)}
          onPointerOut={() => setFeedHovered(false)}
        >
          <Text
            position={[0, 0, 0]}
            fontSize={feedHovered ? 0.4 : 0.3}
            color="#00ff00"
            anchorX="center"
            anchorY="middle"
          >
            🦴
          </Text>
        </group>
      </Float>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group 
          position={[1, 0, 0]} 
          onClick={onPlay}
          onPointerOver={() => setPlayHovered(true)}
          onPointerOut={() => setPlayHovered(false)}
        >
          <Text
            position={[0, 0, 0]}
            fontSize={playHovered ? 0.4 : 0.3}
            color="#00ff00"
            anchorX="center"
            anchorY="middle"
          >
            🎾
          </Text>
        </group>
      </Float>
    </group>
  );
}

export default function TechCube() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [happiness, setHappiness] = useState(85);
  const [energy, setEnergy] = useState(92);
  const [isJumping, setIsJumping] = useState(false);
  const modelRef = useRef();

  // Decay stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness(prev => Math.max(prev - 1, 0));
      setEnergy(prev => Math.max(prev - 1, 0));
    }, 10000); // Decay every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleFeed = () => {
    setEnergy(prev => Math.min(prev + 20, 100));
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  };

  const handlePlay = () => {
    if (energy > 10) {
      setHappiness(prev => Math.min(prev + 20, 100));
      setEnergy(prev => Math.max(prev - 10, 0));
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-300">Happiness</span>
          <div className="w-20 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${happiness}%` }}
            />
          </div>
          <span className="text-xs text-neutral-300">{happiness}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-300">Energy</span>
          <div className="w-20 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${energy}%` }}
            />
          </div>
          <span className="text-xs text-neutral-300">{energy}%</span>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 10 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000000']} />
        
        {/* Reduced lighting intensity */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.1} />

        <Suspense fallback={null}>
          <Shiba 
            ref={modelRef}
            rotation={[0, 0, 0]} 
            position={[0, -1, 0]}
          />
        </Suspense>
        <FloatingIcons onFeed={handleFeed} onPlay={handlePlay} />

        <OrbitControls 
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
} 