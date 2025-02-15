"use client"

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, Text, Float } from '@react-three/drei';
import { Model as Shiba } from './models/shiba';
import { useTheme } from 'next-themes';

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
  const [happiness, setHappiness] = useState(80);
  const [energy, setEnergy] = useState(70);
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
    <div className="h-full w-full rounded-[2rem] overflow-hidden bg-white dark:bg-neutral-900">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={isDark ? 0.6 : 0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={isDark ? 0.8 : 1} 
          color={isDark ? "#ffffff" : "#ffffff"}
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={isDark ? 0.4 : 0.6} 
          color={isDark ? "#b6ceff" : "#f8f8f8"}
        />
        
        {/* Environment */}
        <Environment preset={isDark ? "night" : "dawn"} />
        
        {/* Interactive elements */}
        <PresentationControls
          global
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <group position={[0, -1, 0]}>
            <Shiba 
              ref={modelRef}
              rotation={[0, Math.PI / 4, 0]} 
              position={[0, isJumping ? 0.5 : 0, 0]}
            />
            <TamagotchiStats 
              position={[0, 3, 0]}
              happiness={happiness}
              energy={energy}
            />
          </group>
        </PresentationControls>

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