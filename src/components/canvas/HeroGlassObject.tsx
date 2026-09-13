"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Glass Crystal Geometry
 * 
 * Uses MeshTransmissionMaterial for real-time optical glass refraction,
 * chromatic aberration, and specular reflections.
 * Reacts smoothly to pointer movements.
 */
function FloatingGlass() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow organic rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.25;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;

    // Subtle pointer parallax tracking
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetX,
      0.05
    );
  });

  return (
    <Float
      speed={2.5}
      rotationIntensity={1.2}
      floatIntensity={1.8}
      floatingRange={[-0.2, 0.2]}
    >
      {/* 3D Icosahedron Crystal with Glass Transmission */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.94}
          roughness={0.06}
          thickness={1.5}
          ior={1.52}
          chromaticAberration={0.08}
          anisotropy={0.1}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color="#e0f2fe"
          attenuationDistance={0.5}
          attenuationColor="#38bdf8"
        />
      </mesh>

      {/* Orbiting Glass Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]} scale={2.5}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]} scale={2.9}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export const HeroGlassCanvas: React.FC = () => {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        {/* Ambient & Point Lighting for glass illumination */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={2.0} color="#38bdf8" />
        <pointLight position={[10, -5, 5]} intensity={1.8} color="#a855f7" />

        <FloatingGlass />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;
