'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere, Torus, Sparkles, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Code2, Terminal, Database, Globe, Hexagon, Box } from 'lucide-react';

const ICONS = [
  { name: 'React', icon: <Code2 size={40} color="#61DAFB" /> },
  { name: 'Next.js', icon: <Box size={40} color="#ffffff" /> },
  { name: 'TypeScript', icon: <Terminal size={40} color="#3178C6" /> },
  { name: 'Node.js', icon: <Hexagon size={40} color="#339933" /> },
  { name: 'MongoDB', icon: <Database size={40} color="#47A248" /> },
  { name: 'Git', icon: <Globe size={40} color="#F05032" /> },
];

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  const colorMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  const normalMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <Sphere ref={earthRef} args={[1.9, 128, 128]}>
      <meshStandardMaterial 
        map={colorMap} 
        normalMap={normalMap} 
        normalScale={new THREE.Vector2(0.5, 0.5)}
        metalness={0.6}
        roughness={0.4}
      />
    </Sphere>
  );
}

function OrbitingSystem() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbit Rings */}
      <Torus args={[2.8, 0.005, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </Torus>
      <Torus args={[3.5, 0.005, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </Torus>

      {/* Orbiting Icons */}
      {ICONS.map((item, i) => {
        const angle = (i / ICONS.length) * Math.PI * 2;
        const radius = 3.1;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <group key={i} position={[x, 0, z]}>
             <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Html center transform distanceFactor={3.5}>
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#0F172A]/80 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] group hover:scale-110 transition-transform cursor-pointer">
                     {item.icon}
                     {/* Tooltip */}
                     <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold tracking-widest uppercase text-white whitespace-nowrap">
                       {item.name}
                     </span>
                  </div>
                </Html>
             </Float>
          </group>
        );
      })}
    </group>
  );
}

export default function PlanetScene() {
  return (
    <div className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={3} color="#3b82f6" />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#06b6d4" distance={8} />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        
        <Sparkles count={400} scale={12} size={1.5} speed={0.4} opacity={0.4} color="#60a5fa" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Suspense fallback={null}>
             <Earth />
          </Suspense>
          <OrbitingSystem />
        </Float>
      </Canvas>
    </div>
  );
}
