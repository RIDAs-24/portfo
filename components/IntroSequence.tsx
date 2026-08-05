'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text, Sparkles, Environment, Float, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

function GlassDoors({ isOpened, isMobile }: { isOpened: boolean, isMobile: boolean }) {
  const leftDoor = useRef<THREE.Mesh>(null);
  const rightDoor = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    // Cinematic Parallax mouse effect (doors tilt slightly based on mouse position)
    if (!isOpened && group.current) {
      const targetX = mouse.x * 0.5;
      const targetY = mouse.y * 0.5;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX * 0.15, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY * 0.05, 0.05);
    }

    // Door opening physics animation
    if (isOpened) {
      if (leftDoor.current) {
        leftDoor.current.position.x = THREE.MathUtils.lerp(leftDoor.current.position.x, -4, 0.015);
        leftDoor.current.rotation.y = THREE.MathUtils.lerp(leftDoor.current.rotation.y, 0.2, 0.015);
      }
      if (rightDoor.current) {
        rightDoor.current.position.x = THREE.MathUtils.lerp(rightDoor.current.position.x, 4, 0.015);
        rightDoor.current.rotation.y = THREE.MathUtils.lerp(rightDoor.current.rotation.y, -0.2, 0.015);
      }
    }
  });

  // Extremely realistic physical glass properties
  const glassProps = {
    thickness: 2,
    roughness: 0.1,
    transmission: 1, // Full glass transmission
    ior: 1.5, // Index of refraction
    chromaticAberration: 0.08, // Disperses light into colors at the edges
    backside: true,
    color: '#e0e7ff' // Very slight blue tint so it's not totally invisible
  };

  return (
    <group ref={group}>
      {/* Left Glass Panel */}
      <mesh ref={leftDoor} position={[-1.02, 0, 0]}>
        <boxGeometry args={[2, 4.5, 0.1]} />
        {!isMobile ? (
          <MeshTransmissionMaterial {...glassProps} />
        ) : (
          <meshPhysicalMaterial transmission={0.9} opacity={1} transparent roughness={0.1} color="#e0e7ff" />
        )}
        
        {/* Solid visible frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.05, 4.55, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" wireframe={true} emissive="#3b82f6" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
      </mesh>
      
      {/* Right Glass Panel */}
      <mesh ref={rightDoor} position={[1.02, 0, 0]}>
        <boxGeometry args={[2, 4.5, 0.1]} />
        {!isMobile ? (
          <MeshTransmissionMaterial {...glassProps} />
        ) : (
          <meshPhysicalMaterial transmission={0.9} opacity={1} transparent roughness={0.1} color="#e0e7ff" />
        )}

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.05, 4.55, 0.15]} />
          <meshStandardMaterial color="#1e3a8a" wireframe={true} emissive="#3b82f6" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
      </mesh>
    </group>
  );
}

function FloatingText({ isOpened }: { isOpened: boolean }) {
  const textRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      if (isOpened) {
        textRef.current.position.z = THREE.MathUtils.lerp(textRef.current.position.z, -3, 0.02);
      } else {
        // Floating animation for the text to make refraction dynamic
        const t = state.clock.getElapsedTime();
        textRef.current.position.y = -0.5 + Math.sin(t) * 0.1;
      }
    }
  });

  return (
    // Positioned BEHIND the glass doors (Z = -2) so it gets distorted by the glass refraction
    <group ref={textRef} position={[0, -0.5, -2]}>
      {/* Welcome text */}
      <Text
        fontSize={0.2}
        letterSpacing={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
        position={[0, 1.3, 0]}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        WELCOME
      </Text>

      <Text
        fontSize={1}
        letterSpacing={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
        position={[0, 0.1, 0]}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        RIDA SBAI
      </Text>
      
      <Text
        fontSize={0.25}
        letterSpacing={0.3}
        color="#60a5fa"
        anchorX="center"
        anchorY="top"
        position={[0, -0.2, 0]}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        FULL STACK DEVELOPER
      </Text>
    </group>
  );
}

function IntroCamera({ isOpened, onFinish }: { isOpened: boolean, onFinish: () => void }) {
  useFrame((state) => {
    if (isOpened) {
      // Cinematic Camera Move: Smoothly fly forward through the open doors (slower)
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, -4, 0.015);
      
      // Once the camera passes through the glass and past the text, trigger the next section
      if (state.camera.position.z < -1.5) {
        onFinish();
      }
    } else {
      // Gentle floating before opening (ambient camera motion)
      const t = state.clock.getElapsedTime();
      state.camera.position.y = Math.sin(t * 0.5) * 0.05;
      state.camera.position.x = Math.cos(t * 0.3) * 0.05;
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
}

export default function IntroSequence({ onFinish }: { onFinish: () => void }) {
  const [isOpened, setIsOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Use Drei's cursor hook to show pointer when hovering the 3D scene
  useCursor(hovered, 'pointer', 'auto');

  const handleClick = () => {
    if (!isOpened) setIsOpened(true);
  };

  return (
    <div 
      className="relative w-full h-screen bg-[#020617] overflow-hidden select-none"
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Canvas dpr={isMobile ? 1 : [1, 2]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ powerPreference: "high-performance" }}>
        <color attach="background" args={['#020617']} />
        
        {/* Luxury Lighting Setup */}
        <ambientLight intensity={0.2} />
        {/* Main reflection light */}
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        {/* Blue neon fill light */}
        <pointLight position={[-5, -5, -5]} intensity={3} color="#3b82f6" />
        {/* Spotlight on the doors */}
        <spotLight position={[0, 5, 2]} angle={0.5} penumbra={1} intensity={4} color="#60a5fa" />
        
        {/* Required for realistic glass reflections */}
        <Environment preset="city" />

        {/* Floating dust particles behind and in front of the door */}
        <Sparkles count={isMobile ? 100 : 250} scale={10} size={1.5} speed={0.4} opacity={0.3} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.05} floatIntensity={0.05}>
            <GlassDoors isOpened={isOpened} isMobile={isMobile} />
          </Float>
          
          <FloatingText isOpened={isOpened} />
        </Suspense>

        <IntroCamera isOpened={isOpened} onFinish={onFinish} />
      </Canvas>

      {/* HTML Overlay prompt (Fades out immediately when clicked) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-white/60 tracking-[0.4em] text-[10px] uppercase font-bold drop-shadow-md">
                Click to Initialize
              </span>
              <motion.div 
                className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
                animate={{ scaleY: [0, 1, 0], translateY: [0, 15, 30] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
