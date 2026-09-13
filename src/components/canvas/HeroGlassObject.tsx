"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Autonomous Vehicle Perception & Trajectory Field
 * 
 * Specifically aligned with Animesh Basak's research:
 * - Autonomous lane-changing with TD3 & DDPG in CARLA
 * - Multi-modal sensor fusion: 360° LiDAR scanning rings, radar waves & obstacle sensors
 * - Dynamic curving lane trajectory waypoints with moving vehicle particles
 * - Apple-style frosted liquid glass transmission core
 */

// Generate 3D autonomous lane-changing spline curve
function generateLaneChangePath() {
  const points: THREE.Vector3[] = [];
  // S-curve simulating an autonomous left lane change
  for (let t = -3.5; t <= 3.5; t += 0.2) {
    const progress = (t + 3.5) / 7.0; // 0 to 1
    // Smooth step for lane transition
    const laneOffset = Math.sin((progress - 0.5) * Math.PI) * 0.85;
    const yOffset = Math.cos(t * 0.8) * 0.08;
    points.push(new THREE.Vector3(laneOffset, yOffset, t));
  }
  return points;
}

// Generate road boundary corridor
function generateRoadBoundaries() {
  const leftLane: THREE.Vector3[] = [];
  const rightLane: THREE.Vector3[] = [];
  const centerDivider: THREE.Vector3[] = [];

  for (let z = -3.5; z <= 3.5; z += 0.4) {
    leftLane.push(new THREE.Vector3(-1.4, -0.05, z));
    rightLane.push(new THREE.Vector3(1.4, -0.05, z));
    centerDivider.push(new THREE.Vector3(0, -0.05, z));
  }

  return {
    left: new THREE.BufferGeometry().setFromPoints(leftLane),
    right: new THREE.BufferGeometry().setFromPoints(rightLane),
    center: new THREE.BufferGeometry().setFromPoints(centerDivider),
  };
}

function AutonomousPerceptionModel({ mode }: { mode: "trajectory" | "lidar" }) {
  const groupRef = useRef<THREE.Group>(null);
  const radarSweepRef = useRef<THREE.Mesh>(null);
  const lidarRing1 = useRef<THREE.Mesh>(null);
  const lidarRing2 = useRef<THREE.Mesh>(null);
  const lidarRing3 = useRef<THREE.Mesh>(null);
  const vehicleFollowerRef = useRef<THREE.Mesh>(null);

  const pathPoints = useMemo(() => generateLaneChangePath(), []);
  const pathGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(pathPoints),
    [pathPoints]
  );
  const roadLines = useMemo(() => generateRoadBoundaries(), []);

  // Obstacle vehicles in adjacent lane
  const obstacles = useMemo(
    () => [
      { pos: [0.85, 0.1, 1.8] as [number, number, number], color: "#f43f5e" },
      { pos: [-0.85, 0.1, -2.0] as [number, number, number], color: "#eab308" },
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Base slow rotation
      groupRef.current.rotation.y = t * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.08;

      // Cursor parallax tracking
      const targetX = (state.pointer.x * Math.PI) / 7;
      const targetY = (state.pointer.y * Math.PI) / 7;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.03;
    }

    // Vehicle moving along the autonomous trajectory
    if (vehicleFollowerRef.current) {
      const loopTime = (t * 0.6) % 1;
      const index = Math.floor(loopTime * (pathPoints.length - 1));
      const nextIndex = Math.min(index + 1, pathPoints.length - 1);
      const alpha = (loopTime * (pathPoints.length - 1)) % 1;

      const currentPos = pathPoints[index];
      const nextPos = pathPoints[nextIndex];
      if (currentPos && nextPos) {
        vehicleFollowerRef.current.position.lerpVectors(currentPos, nextPos, alpha);
      }
    }

    // Radar scanner sweeps 360 degrees
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = -t * 2.2;
    }

    // LiDAR multi-axis sensor rings
    if (lidarRing1.current) {
      lidarRing1.current.rotation.x = t * 0.35;
      lidarRing1.current.rotation.y = t * 0.25;
    }
    if (lidarRing2.current) {
      lidarRing2.current.rotation.y = -t * 0.3;
      lidarRing2.current.rotation.z = t * 0.2;
    }
    if (lidarRing3.current) {
      lidarRing3.current.rotation.z = t * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Frosted Liquid Glass Core Perception Sensor */}
      <mesh scale={0.95}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <MeshTransmissionMaterial
          samples={12}
          resolution={256}
          transmission={0.93}
          roughness={0.1}
          thickness={1.5}
          ior={1.5}
          chromaticAberration={0.06}
          distortion={0.2}
          temporalDistortion={0.3}
          color="#e0f2fe"
          attenuationDistance={0.8}
          attenuationColor="#38bdf8"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 2. Autonomous Lane-Changing Trajectory (CARLA RL) */}
      <group visible={mode === "trajectory" || mode === "lidar"}>
        {/* Curving Trajectory Spline */}
        {/* @ts-ignore */}
        <line geometry={pathGeometry}>
          <lineBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.85}
            linewidth={2}
          />
        </line>

        {/* Road Corridor Boundaries */}
        {/* @ts-ignore */}
        <line geometry={roadLines.left}>
          <lineBasicMaterial color="#64748b" transparent opacity={0.35} />
        </line>
        {/* @ts-ignore */}
        <line geometry={roadLines.right}>
          <lineBasicMaterial color="#64748b" transparent opacity={0.35} />
        </line>
        {/* @ts-ignore */}
        <line geometry={roadLines.center}>
          <lineDashedMaterial
            color="#94a3b8"
            dashSize={0.2}
            gapSize={0.15}
            transparent
            opacity={0.4}
          />
        </line>

        {/* Trajectory Waypoints */}
        {pathPoints
          .filter((_, idx) => idx % 4 === 0)
          .map((pt, i) => (
            <mesh key={`wp-${i}`} position={pt}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#38bdf8"
                emissiveIntensity={2}
              />
            </mesh>
          ))}

        {/* Moving Autonomous Agent (Vehicle Indicator) */}
        <mesh ref={vehicleFollowerRef}>
          <boxGeometry args={[0.18, 0.08, 0.32]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Detected Obstacle Bounding Boxes */}
        {obstacles.map((obs, i) => (
          <mesh key={`obs-${i}`} position={obs.pos}>
            <boxGeometry args={[0.22, 0.12, 0.36]} />
            <meshStandardMaterial
              color={obs.color}
              emissive={obs.color}
              emissiveIntensity={1.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* 3. 360° LiDAR & Radar Scanning Rings (Sensor Fusion) */}
      <group>
        {/* Sweeping Radar Plane */}
        <mesh ref={radarSweepRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 2.4, 32, 1, 0, Math.PI / 2.5]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Primary Horizon LiDAR Detection Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.35, 2.38, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Multi-Axis Depth Perception Orbits */}
        <mesh ref={lidarRing1}>
          <torusGeometry args={[2.5, 0.012, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.7}
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh ref={lidarRing2}>
          <torusGeometry args={[2.7, 0.01, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            transparent
            opacity={0.35}
          />
        </mesh>

        <mesh ref={lidarRing3} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.1, 0.008, 16, 80]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

export const HeroGlassCanvas: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"trajectory" | "lidar">("trajectory");

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center">
      {/* 3D Canvas */}
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[8, 10, 5]} intensity={1.6} color="#ffffff" />
          <pointLight position={[-8, -8, -4]} intensity={2.2} color="#38bdf8" />
          <pointLight position={[8, -6, 4]} intensity={2.0} color="#a855f7" />
          <pointLight position={[0, 8, 0]} intensity={1.5} color="#10b981" />

          <Float
            speed={2.0}
            rotationIntensity={0.6}
            floatIntensity={1.0}
            floatingRange={[-0.15, 0.15]}
          >
            <AutonomousPerceptionModel mode={activeMode} />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 3.2}
          />
        </Canvas>
      </div>

      {/* Mode Switcher Pill */}
      <div className="absolute bottom-2 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#05070B]/80 px-3 py-1.5 backdrop-blur-md shadow-glass">
        <button
          onClick={() => setActiveMode("trajectory")}
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
            activeMode === "trajectory"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          ● CARLA Lane Trajectory
        </button>
        <button
          onClick={() => setActiveMode("lidar")}
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
            activeMode === "lidar"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          ● 360° LiDAR Perception
        </button>
      </div>
    </div>
  );
};

export default HeroGlassCanvas;
