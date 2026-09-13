"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Autonomous Vehicle Perception & Trajectory Simulator
 * 
 * Styled with the custom botanical & earthy luxury palette:
 * - #f5f5d5 (Warm Cream)
 * - #c7b793 (Champagne Sand)
 * - #a3b68a (Soft Sage Green)
 * - #5c724a (Earthy Olive / Moss)
 * - #354a2f (Deep Forest Pine)
 * 
 * Specifically representing Animesh Basak's research:
 * - Autonomous vehicle continuous control & lane-changing in CARLA
 * - Multi-modal sensor perception: forward LiDAR cone, 360° radar sweep, and obstacle avoidance
 */

interface VehicleProps {
  mode: "drive" | "lidar" | "inspect";
}

function AutonomousVehicleScene({ mode }: VehicleProps) {
  const sceneGroup = useRef<THREE.Group>(null);
  const vehicleBody = useRef<THREE.Group>(null);
  const lidarScanner = useRef<THREE.Mesh>(null);
  const radarSweep = useRef<THREE.Mesh>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  // Generate lane spline coordinates (S-curve left lane change)
  const trajectoryPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let z = -4; z <= 4; z += 0.25) {
      const norm = (z + 4) / 8; // 0 to 1
      const x = Math.sin((norm - 0.5) * Math.PI) * 1.1;
      pts.push(new THREE.Vector3(x, 0.05, z));
    }
    return pts;
  }, []);

  const trajectoryGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(trajectoryPoints),
    [trajectoryPoints]
  );

  // Road lane markers
  const roadMarkings = useMemo(() => {
    const leftEdge: THREE.Vector3[] = [];
    const rightEdge: THREE.Vector3[] = [];
    const centerDashes: THREE.Vector3[] = [];

    for (let z = -4; z <= 4; z += 0.5) {
      leftEdge.push(new THREE.Vector3(-1.6, 0, z));
      rightEdge.push(new THREE.Vector3(1.6, 0, z));
      centerDashes.push(new THREE.Vector3(0, 0, z));
    }
    return {
      left: new THREE.BufferGeometry().setFromPoints(leftEdge),
      right: new THREE.BufferGeometry().setFromPoints(rightEdge),
      center: new THREE.BufferGeometry().setFromPoints(centerDashes),
    };
  }, []);

  // Obstacle vehicles on the road
  const obstacles = useMemo(
    () => [
      { pos: [1.1, 0.2, 1.8] as [number, number, number], color: "#c7b793" },
      { pos: [-1.1, 0.2, -2.2] as [number, number, number], color: "#5c724a" },
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (sceneGroup.current) {
      // Gentle overall scene rotation when in inspect mode
      if (mode === "inspect") {
        sceneGroup.current.rotation.y = t * 0.35;
      } else {
        sceneGroup.current.rotation.y = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.y,
          (state.pointer.x * Math.PI) / 8,
          0.05
        );
        sceneGroup.current.rotation.x = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.x,
          (-state.pointer.y * Math.PI) / 10,
          0.05
        );
      }
    }

    // Vehicle animation along the lane trajectory
    if (vehicleBody.current) {
      if (mode === "drive") {
        const loop = (t * 0.45) % 1;
        const idx = Math.floor(loop * (trajectoryPoints.length - 1));
        const nextIdx = Math.min(idx + 1, trajectoryPoints.length - 1);
        const alpha = (loop * (trajectoryPoints.length - 1)) % 1;

        const p1 = trajectoryPoints[idx];
        const p2 = trajectoryPoints[nextIdx];
        if (p1 && p2) {
          vehicleBody.current.position.lerpVectors(p1, p2, alpha);
          // Calculate heading angle
          const heading = Math.atan2(p2.x - p1.x, p2.z - p1.z);
          vehicleBody.current.rotation.y = heading;
        }
      } else {
        // Return to center
        vehicleBody.current.position.lerp(new THREE.Vector3(0, 0.2, 0), 0.05);
        vehicleBody.current.rotation.y = THREE.MathUtils.lerp(vehicleBody.current.rotation.y, 0, 0.05);
      }
    }

    // Spin wheels
    if (wheelsRef.current && mode === "drive") {
      wheelsRef.current.children.forEach((w) => {
        w.rotation.x += 0.2;
      });
    }

    // LiDAR rotation
    if (lidarScanner.current) {
      lidarScanner.current.rotation.y = t * 4.0;
    }

    // Radar sweep
    if (radarSweep.current) {
      radarSweep.current.rotation.z = -t * 2.5;
    }
  });

  return (
    <group ref={sceneGroup}>
      {/* Highway Road Surface & Corridor in Forest Acrylics */}
      <group position={[0, -0.05, 0]}>
        {/* Road Ribbon Base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 9]} />
          <meshStandardMaterial
            color="#10170e"
            roughness={0.8}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Road Boundary Lines in Champagne Sand */}
        {/* @ts-ignore */}
        <line geometry={roadMarkings.left}>
          <lineBasicMaterial color="#c7b793" transparent opacity={0.6} />
        </line>
        {/* @ts-ignore */}
        <line geometry={roadMarkings.right}>
          <lineBasicMaterial color="#c7b793" transparent opacity={0.6} />
        </line>

        {/* Center Dashed Lane Divider */}
        {/* @ts-ignore */}
        <line geometry={roadMarkings.center}>
          <lineDashedMaterial color="#a3b68a" dashSize={0.2} gapSize={0.2} />
        </line>

        {/* Autonomous S-Curve Lane Change Trajectory Path */}
        {/* @ts-ignore */}
        <line geometry={trajectoryGeometry}>
          <lineBasicMaterial color="#f5f5d5" linewidth={2} />
        </line>

        {/* Waypoint markers along trajectory */}
        {trajectoryPoints
          .filter((_, i) => i % 3 === 0)
          .map((pt, i) => (
            <mesh key={`wp-${i}`} position={[pt.x, 0.08, pt.z]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshStandardMaterial
                color="#a3b68a"
                emissive="#a3b68a"
                emissiveIntensity={1.8}
              />
            </mesh>
          ))}

        {/* Obstacle vehicles to avoid */}
        {obstacles.map((obs, i) => (
          <group key={`obs-${i}`} position={obs.pos}>
            <mesh>
              <boxGeometry args={[0.35, 0.22, 0.65]} />
              <meshStandardMaterial
                color={obs.color}
                emissive={obs.color}
                emissiveIntensity={0.5}
                roughness={0.3}
              />
            </mesh>
            {/* Safety Warning Halo */}
            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.4, 0.45, 24]} />
              <meshBasicMaterial color={obs.color} transparent opacity={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Autonomous Vehicle Body & Sensor Rig (Ego Vehicle) */}
      <group ref={vehicleBody} position={[0, 0.2, 0]}>
        {/* Main Aerodynamic Chassis in Frosted Liquid Glass */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.48, 0.24, 0.9]} />
          <MeshTransmissionMaterial
            samples={12}
            resolution={256}
            transmission={0.92}
            roughness={0.08}
            thickness={1.4}
            ior={1.48}
            color="#f5f5d5"
            attenuationColor="#a3b68a"
            attenuationDistance={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Upper Cabin Glass Bubble */}
        <mesh position={[0, 0.28, -0.05]}>
          <boxGeometry args={[0.38, 0.16, 0.52]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            roughness={0.04}
            thickness={1.0}
            ior={1.52}
            color="#f5f5d5"
            attenuationColor="#c7b793"
          />
        </mesh>

        {/* Roof-Mounted Multi-Modal LiDAR Turret */}
        <mesh ref={lidarScanner} position={[0, 0.42, -0.05]}>
          <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
          <meshStandardMaterial
            color="#354a2f"
            emissive="#a3b68a"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Headlights (Warm Cream High Beams) */}
        <mesh position={[-0.16, 0.12, 0.46]}>
          <boxGeometry args={[0.08, 0.05, 0.02]} />
          <meshStandardMaterial
            color="#f5f5d5"
            emissive="#f5f5d5"
            emissiveIntensity={3}
          />
        </mesh>
        <mesh position={[0.16, 0.12, 0.46]}>
          <boxGeometry args={[0.08, 0.05, 0.02]} />
          <meshStandardMaterial
            color="#f5f5d5"
            emissive="#f5f5d5"
            emissiveIntensity={3}
          />
        </mesh>

        {/* Taillights (Moss / Sage) */}
        <mesh position={[-0.16, 0.12, -0.46]}>
          <boxGeometry args={[0.08, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#a3b68a"
            emissive="#a3b68a"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh position={[0.16, 0.12, -0.46]}>
          <boxGeometry args={[0.08, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#a3b68a"
            emissive="#a3b68a"
            emissiveIntensity={2}
          />
        </mesh>

        {/* 4 Wheels */}
        <group ref={wheelsRef}>
          <mesh position={[-0.26, 0.02, 0.28]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            <meshStandardMaterial color="#090d08" roughness={0.9} />
          </mesh>
          <mesh position={[0.26, 0.02, 0.28]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            <meshStandardMaterial color="#090d08" roughness={0.9} />
          </mesh>
          <mesh position={[-0.26, 0.02, -0.28]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            <meshStandardMaterial color="#090d08" roughness={0.9} />
          </mesh>
          <mesh position={[0.26, 0.02, -0.28]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            <meshStandardMaterial color="#090d08" roughness={0.9} />
          </mesh>
        </group>

        {/* Forward LiDAR Sensing Cone */}
        <mesh position={[0, 0.15, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.8, 2.2, 16, 1, true]} />
          <meshBasicMaterial
            color="#a3b68a"
            wireframe
            transparent
            opacity={mode === "lidar" ? 0.35 : 0.15}
          />
        </mesh>

        {/* 360° Rotating Radar Sweep Ring */}
        <mesh ref={radarSweep} position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, mode === "lidar" ? 2.5 : 1.8, 32, 1, 0, Math.PI / 3]} />
          <meshBasicMaterial
            color="#c7b793"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Safety Boundary Ring */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[mode === "lidar" ? 2.45 : 1.75, mode === "lidar" ? 2.48 : 1.78, 48]} />
          <meshBasicMaterial
            color="#a3b68a"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export const HeroGlassCanvas: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"drive" | "lidar" | "inspect">("drive");

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center">
      {/* 3D WebGL Canvas */}
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 2.5, 4.5], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          {/* Lighting in warm cream & soft forest tones */}
          <ambientLight intensity={0.9} color="#f5f5d5" />
          <directionalLight position={[6, 8, 4]} intensity={1.5} color="#f5f5d5" />
          <pointLight position={[-5, -4, -3]} intensity={2.0} color="#a3b68a" />
          <pointLight position={[5, -3, 3]} intensity={1.8} color="#c7b793" />
          <pointLight position={[0, 6, 0]} intensity={1.2} color="#5c724a" />

          <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.6}
            floatingRange={[-0.1, 0.1]}
          >
            <AutonomousVehicleScene mode={activeMode} />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 4.5}
          />
        </Canvas>
      </div>

      {/* Interactive Mode Switcher Buttons */}
      <div className="absolute bottom-2 z-30 flex items-center gap-1.5 rounded-full border border-palette-sand/25 bg-background-secondary/90 px-3 py-1.5 backdrop-blur-md shadow-glass">
        <button
          type="button"
          onClick={() => setActiveMode("drive")}
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
            activeMode === "drive"
              ? "bg-palette-moss/40 text-palette-cream border border-palette-sage shadow-glow-sage font-bold"
              : "text-palette-sand hover:text-palette-cream"
          }`}
        >
          ● CARLA Lane Change
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("lidar")}
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
            activeMode === "lidar"
              ? "bg-palette-moss/40 text-palette-cream border border-palette-sage shadow-glow-sage font-bold"
              : "text-palette-sand hover:text-palette-cream"
          }`}
        >
          ● 360° LiDAR Perception
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("inspect")}
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all ${
            activeMode === "inspect"
              ? "bg-palette-moss/40 text-palette-cream border border-palette-sage shadow-glow-sage font-bold"
              : "text-palette-sand hover:text-palette-cream"
          }`}
        >
          ● 3D Orbit
        </button>
      </div>
    </div>
  );
};

export default HeroGlassCanvas;
