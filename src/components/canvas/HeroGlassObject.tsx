"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Edges } from "@react-three/drei";
import * as THREE from "three";
import {
  ChevronDown,
  Layers,
  Eye,
  Radio,
  Zap,
  Check,
} from "lucide-react";

/**
 * High-Fidelity 3D Autonomous Vehicle & Multi-Modal Perception Simulator
 * 
 * Specifically representing Animesh Basak's doctoral research at IIT Roorkee:
 * - Continuous actor-critic reinforcement learning (TD3 vs. DDPG) in CARLA
 * - Autonomous lane-changing decision making, trajectory generation & collision avoidance
 * - Multi-sensor perception: 360° roof LiDAR puck, forward 77GHz long-range radar, and sensor fusion
 */

export type SensorMode = "lidar" | "radar" | "fusion";
export type DriveMode = "drive" | "inspect";

/**
 * Detailed Autonomous Vehicle Model (Chassis, Cabin, Wheels, Lights, Sensors)
 * Ego vehicle outlined in crisp thin green (#10B981) per user specification.
 */
function AutonomousVehicle({
  sensorMode,
  steeringAngle,
  wheelRotation,
  isBlinkingLeft,
}: {
  sensorMode: SensorMode;
  steeringAngle: number;
  wheelRotation: number;
  isBlinkingLeft: boolean;
}) {
  const lidarRotor = useRef<THREE.Mesh>(null);
  const lidarScanBeam = useRef<THREE.Group>(null);
  const radarSweep = useRef<THREE.Group>(null);
  const radarWave1 = useRef<THREE.Mesh>(null);
  const radarWave2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // 10-15 Hz LiDAR turret rotation
    if (lidarRotor.current) {
      lidarRotor.current.rotation.y += delta * 14.0;
    }
    if (lidarScanBeam.current) {
      lidarScanBeam.current.rotation.y += delta * 14.0;
    }

    // Radar cone horizontal azimuth sweep (±25 degrees)
    if (radarSweep.current) {
      radarSweep.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 3.5) * 0.42;
    }

    // Pulsing radar millimeter-wave arcs expanding forward
    const t = state.clock.getElapsedTime();
    if (radarWave1.current) {
      const scale1 = 0.5 + ((t * 1.5) % 1) * 2.8;
      radarWave1.current.scale.set(scale1, scale1, scale1);
      (radarWave1.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        0.7 - ((t * 1.5) % 1) * 0.7
      );
    }
    if (radarWave2.current) {
      const scale2 = 0.5 + (((t * 1.5) + 0.5) % 1) * 2.8;
      radarWave2.current.scale.set(scale2, scale2, scale2);
      (radarWave2.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        0.7 - (((t * 1.5) + 0.5) % 1) * 0.7
      );
    }
  });

  return (
    <group>
      {/* 1. Main Aerodynamic Chassis (Visible Metallic Obsidian Titanium) */}
      <group position={[0, 0.16, 0]}>
        {/* Lower Main Body with Crisp Thin Green Outline */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.58, 0.16, 1.28]} />
          <meshStandardMaterial
            color="#252D3A"
            roughness={0.25}
            metalness={0.65}
          />
          {/* Thin Green Outline on Main Ego Vehicle Body */}
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Sculpted Aerodynamic Hood / Bonnet with Green Outline */}
        <mesh position={[0, 0.04, 0.38]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.54, 0.1, 0.48]} />
          <meshStandardMaterial
            color="#2E3747"
            roughness={0.22}
            metalness={0.68}
          />
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Front Bumper Air Dam & Splitter */}
        <mesh position={[0, -0.06, 0.62]}>
          <boxGeometry args={[0.56, 0.04, 0.08]} />
          <meshStandardMaterial color="#181E29" roughness={0.4} metalness={0.6} />
          <Edges threshold={20} color="#10B981" />
        </mesh>

        {/* Rear Aerodynamic Trunk & Integrated Lip Spoiler */}
        <mesh position={[0, 0.04, -0.44]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.54, 0.1, 0.38]} />
          <meshStandardMaterial color="#2E3747" roughness={0.22} metalness={0.68} />
          <Edges threshold={15} color="#10B981" />
        </mesh>
        <mesh position={[0, 0.1, -0.61]}>
          <boxGeometry args={[0.52, 0.02, 0.06]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
          <Edges threshold={20} color="#10B981" />
        </mesh>

        {/* Rear Aerodynamic Diffuser */}
        <mesh position={[0, -0.06, -0.61]}>
          <boxGeometry args={[0.56, 0.05, 0.06]} />
          <meshStandardMaterial color="#11161F" roughness={0.5} metalness={0.5} />
          <Edges threshold={20} color="#10B981" />
        </mesh>

        {/* Side Skirts with Green Accent Edge */}
        <mesh position={[-0.295, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.04, 0.92]} />
          <meshStandardMaterial color="#1A202C" roughness={0.3} metalness={0.7} />
          <Edges threshold={20} color="#10B981" />
        </mesh>
        <mesh position={[0.295, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.04, 0.92]} />
          <meshStandardMaterial color="#1A202C" roughness={0.3} metalness={0.7} />
          <Edges threshold={20} color="#10B981" />
        </mesh>
      </group>

      {/* 2. Glasshouse / Greenhouse Cabin with Green Outlines */}
      <group position={[0, 0.31, -0.04]}>
        {/* Front Slanted Windshield */}
        <mesh position={[0, 0.04, 0.22]} rotation={[-0.55, 0, 0]}>
          <boxGeometry args={[0.48, 0.02, 0.33]} />
          <meshStandardMaterial
            color="#223042"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.88}
          />
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Panoramic Roof Glass */}
        <mesh position={[0, 0.12, -0.02]}>
          <boxGeometry args={[0.46, 0.02, 0.4]} />
          <meshStandardMaterial
            color="#1B2433"
            roughness={0.06}
            metalness={0.9}
            transparent
            opacity={0.9}
          />
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Rear Fastback Window */}
        <mesh position={[0, 0.04, -0.25]} rotation={[0.48, 0, 0]}>
          <boxGeometry args={[0.46, 0.02, 0.29]} />
          <meshStandardMaterial
            color="#223042"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.88}
          />
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Cabin Side Windows */}
        <mesh position={[-0.235, 0.04, -0.02]}>
          <boxGeometry args={[0.02, 0.14, 0.46]} />
          <meshStandardMaterial
            color="#223042"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
          <Edges threshold={15} color="#10B981" />
        </mesh>
        <mesh position={[0.235, 0.04, -0.02]}>
          <boxGeometry args={[0.02, 0.14, 0.46]} />
          <meshStandardMaterial
            color="#223042"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Side Mirrors */}
        <mesh position={[-0.32, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshStandardMaterial color="#1E2530" roughness={0.2} metalness={0.85} />
          <Edges threshold={15} color="#10B981" />
        </mesh>
        <mesh position={[0.32, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshStandardMaterial color="#1E2530" roughness={0.2} metalness={0.85} />
          <Edges threshold={15} color="#10B981" />
        </mesh>
      </group>

      {/* 3. Automotive 3D Bounding Perception Wireframe in Neon Green */}
      <group position={[0, 0.23, 0]}>
        {/* @ts-ignore */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.68, 0.44, 1.42)]} />
          <lineBasicMaterial color="#10B981" linewidth={2} />
        </lineSegments>
        {/* Forward Orientation Heading Pointer */}
        {/* @ts-ignore */}
        <line>
          <bufferGeometry
            attach="geometry"
            {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, 0.24, 0.71),
              new THREE.Vector3(0, 0.24, 1.15),
            ])}
          />
          <lineBasicMaterial color="#10B981" linewidth={2} />
        </line>
      </group>

      {/* 4. Automotive Lighting System */}
      {/* Front Dual-Cluster LED Headlights */}
      <group position={[0, 0.17, 0.63]}>
        <mesh position={[-0.21, 0, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.02]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={3.5} />
        </mesh>
        <mesh position={[0.21, 0, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.02]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={3.5} />
        </mesh>

        {/* Turn Signal Indicator in High-Intensity Automotive Amber */}
        <mesh position={[-0.27, 0, 0]}>
          <sphereGeometry args={[0.024, 12, 12]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#FFA000"
            emissiveIntensity={isBlinkingLeft ? 5.0 : 0.3}
          />
        </mesh>

        {/* Forward Projected Road Illumination Cone */}
        <mesh position={[0, -0.06, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.65, 1.8, 24, 1, true]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Rear LED Tail Light Bar */}
      <group position={[0, 0.17, -0.64]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.035, 0.02]} />
          <meshStandardMaterial color="#EF4444" emissive="#FF1E27" emissiveIntensity={3.0} />
        </mesh>
        <mesh position={[-0.26, 0, 0]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#FFA000"
            emissiveIntensity={isBlinkingLeft ? 5.0 : 0.3}
          />
        </mesh>
      </group>

      {/* 5. Roof-Mounted Multi-Modal Sensor Suite */}
      <group position={[0, 0.44, -0.06]}>
        {/* Sensor Mount Baseplate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.22, 0.02, 0.24]} />
          <meshStandardMaterial color="#1E2633" roughness={0.4} metalness={0.8} />
          <Edges threshold={15} color="#10B981" />
        </mesh>

        {/* Velodyne / Hesai 360° LiDAR Puck */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
          <meshStandardMaterial color="#2B3648" roughness={0.3} metalness={0.8} />
          <Edges threshold={20} color="#10B981" />
        </mesh>

        {/* High-Speed Rotating LiDAR Turret with Electric Cyan Laser Band */}
        <mesh ref={lidarRotor} position={[0, 0.085, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.03, 24]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={3.2}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Active Status LED in Electric Emerald */}
        <mesh position={[0, 0.11, 0]}>
          <sphereGeometry args={[0.016, 12, 12]} />
          <meshStandardMaterial color="#10B981" emissive="#00FF9D" emissiveIntensity={4.0} />
        </mesh>

        {/* Forward Camera Housing */}
        <mesh position={[0, -0.02, 0.18]}>
          <boxGeometry args={[0.08, 0.03, 0.06]} />
          <meshStandardMaterial color="#1E2633" />
        </mesh>
        <mesh position={[0, -0.02, 0.215]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.01, 16]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* 6. Four Detailed Wheels with Crimson Calipers */}
      <group>
        <group position={[-0.3, 0.11, 0.38]} rotation={[0, steeringAngle, 0]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>
        <group position={[0.3, 0.11, 0.38]} rotation={[0, steeringAngle, 0]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>
        <group position={[-0.3, 0.11, -0.38]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>
        <group position={[0.3, 0.11, -0.38]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>
      </group>

      {/* 7. DEDICATED SENSOR VISUALIZATION 1: 360° LiDAR POINT CLOUD */}
      {(sensorMode === "lidar" || sensorMode === "fusion") && (
        <group>
          {/* Concentric Distance Range Rings (1.5m, 2.5m, 3.8m) */}
          {[1.4, 2.5, 3.8].map((radius, idx) => (
            <mesh key={`lidar-ring-${idx}`} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius, radius + 0.03, 64]} />
              <meshBasicMaterial
                color="#00FFC8"
                transparent
                opacity={0.65 - idx * 0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}

          {/* 360° Rotating Laser Scan Wedge */}
          <group ref={lidarScanBeam} position={[0, 0.52, -0.06]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.8]}>
              <planeGeometry args={[0.04, 3.6]} />
              <meshBasicMaterial color="#00FFC8" transparent opacity={0.7} />
            </mesh>
          </group>

          {/* Dense 3D LiDAR Point Cloud Matrix */}
          <LiDARPointCloud />
        </group>
      )}

      {/* 8. DEDICATED SENSOR VISUALIZATION 2: 77 GHz FMCW LONG-RANGE RADAR */}
      {(sensorMode === "radar" || sensorMode === "fusion") && (
        <group>
          {/* Forward Sweeping Radar Cone in Electric Cyan Wireframe */}
          <group ref={radarSweep} position={[0, 0.14, 0.65]}>
            <mesh position={[0, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[1.4, 3.6, 32, 2, true]} />
              <meshBasicMaterial
                color="#00E5FF"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
                wireframe
              />
            </mesh>

            {/* Central Radar Axis Line */}
            {/* @ts-ignore */}
            <line>
              <bufferGeometry
                attach="geometry"
                {...new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(0, 0, 3.6),
                ])}
              />
              <lineBasicMaterial color="#00F0FF" linewidth={3} />
            </line>
          </group>

          {/* Pulsing Radar Millimeter-Wave Wavefront Arcs */}
          <group position={[0, 0.14, 0.65]}>
            <mesh ref={radarWave1} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.3, 0.35, 32]} />
              <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={radarWave2} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.3, 0.35, 32]} />
              <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Rear Blind-Spot Radar Warning Arc */}
          <mesh position={[0, 0.12, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.9, 1.4, 24, 1, true]} />
            <meshBasicMaterial
              color="#F59E0B"
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              wireframe
            />
          </mesh>
        </group>
      )}

      {/* Ground Contact Shadow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.75, 1.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/**
 * 3D LiDAR Point Cloud Simulation
 * Generates hundreds of laser returns reflecting off the ground, curbs, and surrounding vehicles.
 */
function LiDARPointCloud() {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];

    // 1. Concentric ground reflection rings
    for (let r = 0.8; r <= 3.8; r += 0.35) {
      const numPoints = Math.floor(r * 22);
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        const jitterX = (Math.random() - 0.5) * 0.06;
        const jitterZ = (Math.random() - 0.5) * 0.06;
        pts.push([
          Math.cos(theta) * r + jitterX,
          0.02 + Math.random() * 0.02,
          Math.sin(theta) * r + jitterZ,
        ]);
      }
    }

    // 2. Road curb / barrier laser reflections
    for (let z = -4.5; z <= 4.5; z += 0.25) {
      pts.push([-2.2 + (Math.random() - 0.5) * 0.05, 0.12 + Math.random() * 0.04, z]);
      pts.push([2.2 + (Math.random() - 0.5) * 0.05, 0.12 + Math.random() * 0.04, z]);
    }

    // 3. Dense points outlining the lead obstacle car at [0.95, 0, 2.2]
    for (let i = 0; i < 65; i++) {
      const ox = 0.95 + (Math.random() - 0.5) * 0.55;
      const oy = 0.06 + Math.random() * 0.35;
      const oz = 2.2 + (Math.random() - 0.5) * 1.15;
      pts.push([ox, oy, oz]);
    }

    return pts;
  }, []);

  return (
    <group>
      {points.map((pt, idx) => (
        <mesh key={`p-${idx}`} position={pt}>
          <sphereGeometry args={[0.016, 6, 6]} />
          <meshBasicMaterial
            color={pt[2] > 1.6 && pt[0] > 0.6 ? "#FF4D4D" : idx % 2 === 0 ? "#00FFC8" : "#00F0FF"}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Detailed 5-Spoke Alloy Wheel with Rubber Tire & Brembo Crimson Brake Caliper
 */
function WheelAssembly({ rotationX }: { rotationX: number }) {
  return (
    <group rotation={[rotationX, 0, 0]}>
      {/* Outer Rubber Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.135, 0.135, 0.08, 24]} />
        <meshStandardMaterial color="#11161F" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Ventilated Drilled Steel Brake Disc */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.085, 0.085, 0.076, 20]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Brembo Crimson Racing Brake Caliper */}
      <mesh position={[0.045, 0.045, 0]}>
        <boxGeometry args={[0.024, 0.048, 0.076]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive="#DC2626"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Silver Alloy Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.098, 0.098, 0.082, 16]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* 5-Spoke Rim Geometry */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <mesh key={i} rotation={[0, 0, (deg * Math.PI) / 180]}>
          <boxGeometry args={[0.018, 0.092, 0.084]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.1} metalness={0.95} />
        </mesh>
      ))}

      {/* Center Wheel Hub */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.086, 12]} />
        <meshStandardMaterial color="#000000" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Stationary / Traffic Vehicle (Obstacle in Highway Lane)
 * Outlined with thin red (#EF4444) color per user request.
 */
function TrafficCar({
  position,
  color,
  label,
  distance,
  ttc,
  showRadarLock,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  distance: string;
  ttc: string;
  showRadarLock: boolean;
}) {
  return (
    <group position={position}>
      {/* 1. Chassis with Thin Red Outline */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.54, 0.15, 1.15]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.65} />
        {/* User Request: Thin Red Outline for Stationary/Obstacle Cars */}
        <Edges threshold={15} color="#EF4444" />
      </mesh>

      {/* 2. Cabin Glass with Red Outline */}
      <mesh position={[0, 0.27, -0.04]}>
        <boxGeometry args={[0.44, 0.13, 0.58]} />
        <meshStandardMaterial
          color="#1E293B"
          roughness={0.08}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
        <Edges threshold={15} color="#EF4444" />
      </mesh>

      {/* 3. 3D Obstacle Warning Bounding Box in Thin Red */}
      <group position={[0, 0.21, 0]}>
        {/* @ts-ignore */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.64, 0.42, 1.28)]} />
          <lineBasicMaterial color="#EF4444" linewidth={2} />
        </lineSegments>
      </group>

      {/* 4. Headlights & Taillights */}
      <mesh position={[-0.19, 0.14, 0.58]}>
        <boxGeometry args={[0.08, 0.04, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[0.19, 0.14, 0.58]}>
        <boxGeometry args={[0.08, 0.04, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[0, 0.14, -0.58]}>
        <boxGeometry args={[0.44, 0.035, 0.02]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={2.5} />
      </mesh>

      {/* 5. Four Wheels */}
      {[-0.28, 0.28].map((x) =>
        [-0.32, 0.32].map((z, idx) => (
          <mesh key={`tw-${x}-${z}-${idx}`} position={[x, 0.1, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.07, 16]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        ))
      )}

      {/* 6. Radar Tracking Lock-On Bracket & Doppler Vector (Active when Radar or Fusion selected) */}
      {showRadarLock && (
        <group position={[0, 0.5, 0]}>
          {/* Target Tracking Diamond Bracket in Red / Amber */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.22, 0.25, 4]} />
            <meshBasicMaterial color="#EF4444" side={THREE.DoubleSide} />
          </mesh>
          {/* Doppler Relative Velocity Vector pointing rearward */}
          {/* @ts-ignore */}
          <line>
            <bufferGeometry
              attach="geometry"
              {...new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -0.65),
              ])}
            />
            <lineBasicMaterial color="#EF4444" linewidth={3} />
          </line>
        </group>
      )}

      {/* Ground Warning Proximity Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.66, 32]} />
        <meshBasicMaterial color="#EF4444" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Autonomous Highway Scene
 */
function AutonomousVehicleScene({
  driveMode,
  sensorMode,
}: {
  driveMode: DriveMode;
  sensorMode: SensorMode;
}) {
  const sceneGroup = useRef<THREE.Group>(null);
  const egoVehicleGroup = useRef<THREE.Group>(null);

  const [steeringAngle, setSteeringAngle] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);

  // S-Curve Continuous RL Trajectory Points
  const trajectoryPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let z = -4.5; z <= 4.5; z += 0.2) {
      const norm = (z + 4.5) / 9.0;
      const x = 0.95 - Math.sin(norm * Math.PI) * 1.9;
      pts.push(new THREE.Vector3(x, 0.04, z));
    }
    return pts;
  }, []);

  const trajectoryGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(trajectoryPoints),
    [trajectoryPoints]
  );

  // Highway Lane Markings (3-Lane Highway Corridor)
  const highwayMarkings = useMemo(() => {
    const leftEdge: THREE.Vector3[] = [];
    const rightEdge: THREE.Vector3[] = [];
    const divider1: THREE.Vector3[] = [];
    const divider2: THREE.Vector3[] = [];

    for (let z = -5.5; z <= 5.5; z += 0.4) {
      leftEdge.push(new THREE.Vector3(-2.2, 0.015, z));
      rightEdge.push(new THREE.Vector3(2.2, 0.015, z));
      divider1.push(new THREE.Vector3(-0.75, 0.015, z));
      divider2.push(new THREE.Vector3(0.75, 0.015, z));
    }

    return {
      leftEdge: new THREE.BufferGeometry().setFromPoints(leftEdge),
      rightEdge: new THREE.BufferGeometry().setFromPoints(rightEdge),
      divider1: new THREE.BufferGeometry().setFromPoints(divider1),
      divider2: new THREE.BufferGeometry().setFromPoints(divider2),
    };
  }, []);

  // Road cat's-eye reflective studs
  const roadStuds = useMemo(() => {
    const studs: [number, number, number][] = [];
    for (let z = -5.0; z <= 5.0; z += 1.0) {
      studs.push([-0.75, 0.025, z]);
      studs.push([0.75, 0.025, z]);
    }
    return studs;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Scene orientation & gentle mouse parallax
    if (sceneGroup.current) {
      if (driveMode === "inspect") {
        sceneGroup.current.rotation.y = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.y,
          0,
          0.05
        );
      } else {
        sceneGroup.current.rotation.y = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.y,
          (state.pointer.x * Math.PI) / 14,
          0.04
        );
        sceneGroup.current.rotation.x = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.x,
          (-state.pointer.y * Math.PI) / 16,
          0.04
        );
      }
    }

    // Vehicle Dynamic Motion along S-Curve Trajectory
    if (egoVehicleGroup.current) {
      if (driveMode === "drive") {
        const loop = (t * 0.32) % 1;
        const totalPts = trajectoryPoints.length - 1;
        const idx = Math.floor(loop * totalPts);
        const nextIdx = Math.min(idx + 1, totalPts);
        const alpha = (loop * totalPts) % 1;

        const p1 = trajectoryPoints[idx];
        const p2 = trajectoryPoints[nextIdx];

        if (p1 && p2) {
          egoVehicleGroup.current.position.lerpVectors(p1, p2, alpha);

          const heading = Math.atan2(p2.x - p1.x, p2.z - p1.z);
          egoVehicleGroup.current.rotation.y = heading;

          const steer = Math.sin(loop * Math.PI * 2) * 0.28;
          setSteeringAngle(steer);

          const isMidManeuver = loop > 0.15 && loop < 0.65;
          setIsBlinkingLeft(isMidManeuver && Math.sin(t * 10) > 0);
        }

        setWheelRotation((prev) => prev + delta * 9.0);
      } else {
        // Stationary Inspection: Ego vehicle parked in center lane for detailed sensor examination
        egoVehicleGroup.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.06);
        egoVehicleGroup.current.rotation.y = THREE.MathUtils.lerp(
          egoVehicleGroup.current.rotation.y,
          0,
          0.06
        );
        setSteeringAngle(0);
        setIsBlinkingLeft(false);
      }
    }
  });

  return (
    <group ref={sceneGroup}>
      {/* 1. Visible Highway Road Surface (Brightened Asphalt Charcoal #181F2C) */}
      <group position={[0, -0.01, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[5.0, 12.5]} />
          <meshStandardMaterial
            color="#181F2C"
            roughness={0.65}
            metalness={0.25}
          />
        </mesh>

        {/* Road Outer Solid Shoulder Lines in High-Contrast White */}
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.leftEdge}>
          <lineBasicMaterial color="#E2E8F0" linewidth={3} />
        </line>
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.rightEdge}>
          <lineBasicMaterial color="#E2E8F0" linewidth={3} />
        </line>

        {/* Dashed Lane Dividers in Amber and Platinum */}
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.divider1}>
          <lineDashedMaterial color="#F59E0B" dashSize={0.4} gapSize={0.3} />
        </line>
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.divider2}>
          <lineDashedMaterial color="#94A3B8" dashSize={0.4} gapSize={0.3} />
        </line>

        {/* Reflective Road Studs with High-Intensity Sheen */}
        {roadStuds.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.035, 0.02, 0.035]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#FFFFFF"
              emissiveIntensity={3.5}
            />
          </mesh>
        ))}

        {/* Highway Side Guardrails */}
        <mesh position={[-2.4, 0.14, 0]}>
          <boxGeometry args={[0.06, 0.18, 12.5]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
          <Edges threshold={20} color="#475569" />
        </mesh>
        <mesh position={[2.4, 0.14, 0]}>
          <boxGeometry args={[0.06, 0.18, 12.5]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
          <Edges threshold={20} color="#475569" />
        </mesh>

        {/* Planned Continuous RL Trajectory Path Line in Electric Cyan */}
        {/* @ts-ignore */}
        <line geometry={trajectoryGeometry}>
          <lineBasicMaterial color="#00F0FF" linewidth={3} />
        </line>

        {/* Dynamic Waypoint Particles along Trajectory with Glowing Cyan & Emerald Pulses */}
        {trajectoryPoints
          .filter((_, i) => i % 3 === 0)
          .map((pt, i) => (
            <mesh key={`wp-${i}`} position={[pt.x, 0.055, pt.z]}>
              <sphereGeometry args={[0.045, 14, 14]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00F5FF" : "#10B981"}
                emissive={i % 2 === 0 ? "#00F5FF" : "#10B981"}
                emissiveIntensity={3.8}
              />
            </mesh>
          ))}
      </group>

      {/* 2. Stationary Traffic Vehicles (Outlined in Red per User Request) */}
      {/* Lead Stationary Obstacle Vehicle in Right Lane */}
      <TrafficCar
        position={[0.95, 0, 2.2]}
        color="#3B1D22"
        label="Target Obstacle"
        distance="14.8m"
        ttc="2.45s"
        showRadarLock={sensorMode === "radar" || sensorMode === "fusion"}
      />

      {/* Following Stationary Vehicle in Left Lane */}
      <TrafficCar
        position={[-1.4, 0, -2.6]}
        color="#2D1519"
        label="Secondary Vehicle"
        distance="22.1m"
        ttc="4.10s"
        showRadarLock={sensorMode === "radar" || sensorMode === "fusion"}
      />

      {/* 3. Ego Autonomous Vehicle (Outlined in Green per User Request) */}
      <group ref={egoVehicleGroup} position={[0, 0, 0]}>
        <AutonomousVehicle
          sensorMode={sensorMode}
          steeringAngle={steeringAngle}
          wheelRotation={wheelRotation}
          isBlinkingLeft={isBlinkingLeft}
        />
      </group>
    </group>
  );
}

/**
 * Main Hero Glass Canvas Component
 * Fully elevated brightness, green ego outline, red stationary obstacle outlines,
 * sensor dropdown (LiDAR vs. Radar vs. Fusion), and fixed scroll/zoom interactions.
 */
export const HeroGlassObject: React.FC = () => {
  const [driveMode, setDriveMode] = useState<DriveMode>("drive");
  const [sensorMode, setSensorMode] = useState<SensorMode>("lidar");
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [sensorDropdownOpen, setSensorDropdownOpen] = useState<boolean>(false);

  const controlsRef = useRef<any>(null);

  const sensorDescriptions: Record<SensorMode, { label: string; icon: any; desc: string }> = {
    lidar: {
      label: "360° LiDAR Point Cloud",
      icon: Eye,
      desc: "128-channel 360° laser sweep, range rings & 3D obstacle point cloud",
    },
    radar: {
      label: "77 GHz FMCW Radar",
      icon: Radio,
      desc: "Long-range forward scanning cone, Doppler relative velocity & TTC lock",
    },
    fusion: {
      label: "Multi-Sensor Fusion (Both)",
      icon: Layers,
      desc: "Simultaneous LiDAR 3D point cloud & Radar target tracking pipeline",
    },
  };

  return (
    <div
      className="relative h-full w-full flex flex-col items-center justify-center select-none"
      style={{ touchAction: isInteractive ? "none" : "pan-y" }}
    >
      {/* HUD Telemetry Banner in Top Right */}
      <div className="absolute top-2 right-2 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-black/85 px-3 py-1.5 font-mono text-[11px] backdrop-blur-md shadow-lg text-neutral-200">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-white font-bold">
          {sensorMode === "lidar"
            ? "LiDAR: 360° Active (128 Channels)"
            : sensorMode === "radar"
            ? "Radar: 77GHz FMCW (±25° Azimuth)"
            : "Sensor Fusion: EKF (LiDAR + Radar)"}
        </span>
        <span className="text-neutral-400">| CARLA 60 FPS</span>
      </div>

      {/* Top Left: Legend for Outlines */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-black/85 px-3 py-1.5 font-mono text-[10px] backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <span className="h-2 w-2 rounded-full border border-emerald-400 bg-emerald-500/40" />
          <span>Ego Vehicle (Green)</span>
        </div>
        <span className="text-neutral-500">•</span>
        <div className="flex items-center gap-1.5 text-rose-400 font-bold">
          <span className="h-2 w-2 rounded-full border border-rose-400 bg-rose-500/40" />
          <span>Obstacle (Red)</span>
        </div>
      </div>


      {/* 3D WebGL Canvas with data-lenis-prevent and wheel propagation fix */}
      <div
        className="h-full w-full cursor-grab active:cursor-grabbing"
        data-lenis-prevent={isInteractive ? true : undefined}
        onWheel={(e) => {
          if (isInteractive) {
            e.stopPropagation();
          }
        }}
        onClick={() => setIsInteractive(true)}
      >
        <Canvas
          camera={{ position: [0, 3.8, 6.8], fov: 40 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          {/* HIGH-VISIBILITY STUDIO LIGHTING SUITE */}
          {/* 1. Rich Ambient Lighting so materials are never blacked out */}
          <ambientLight intensity={1.8} color="#FFFFFF" />

          {/* 2. Top Down Softbox Directional Light for Clear Vehicle Contours */}
          <directionalLight
            position={[0, 15, 2]}
            intensity={3.2}
            color="#FFFFFF"
            castShadow
          />

          {/* 3. Front-Right Key Light for Crisp Reflections on Hood & Windshield */}
          <directionalLight
            position={[6, 9, 7]}
            intensity={2.8}
            color="#FFFFFF"
          />

          {/* 4. Rear-Left Fill Light */}
          <directionalLight
            position={[-6, 7, -6]}
            intensity={2.0}
            color="#CBD5E1"
          />

          {/* 5. Electric Cyan Studio Rim Light */}
          <pointLight position={[-4, 3, 2]} intensity={3.5} color="#00E5FF" distance={14} />

          {/* 6. Ruby Specular Rim Light */}
          <pointLight position={[4, 2, -3]} intensity={2.5} color="#F43F5E" distance={12} />

          {/* 7. Center Road Overhead Spotlight */}
          <pointLight position={[0, 5, 1]} intensity={2.5} color="#FFFFFF" distance={12} />

          {/* Gentle Floating Motion */}
          <Float
            speed={driveMode === "inspect" ? 0 : 1.0}
            rotationIntensity={0.12}
            floatIntensity={0.25}
            floatingRange={[-0.04, 0.04]}
          >
            <AutonomousVehicleScene driveMode={driveMode} sensorMode={sensorMode} />
          </Float>

          {/* OrbitControls with Zoom and Pan Settings */}
          <OrbitControls
            ref={controlsRef}
            enabled={isInteractive}
            enableZoom={isInteractive}
            enableRotate={isInteractive}
            minDistance={1.8}
            maxDistance={14.0}
            enablePan={false}
            dampingFactor={0.08}
            enableDamping={true}
            maxPolarAngle={Math.PI / 2.02}
            minPolarAngle={Math.PI / 8}
          />
        </Canvas>
      </div>

      {/* INTERACTIVE CONTROLS BAR (BOTTOM) */}
      <div className="absolute bottom-2 z-30 flex flex-col items-center gap-2 max-w-full px-2">
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/15 bg-black/90 p-1.5 backdrop-blur-xl shadow-2xl">
          {/* Navigation / Scenario Mode: CARLA Lane Change vs. Stationary Inspection */}
          <div className="flex items-center gap-1 rounded-xl bg-white/[0.06] p-1 border border-white/10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDriveMode("drive");
              }}
              className={`rounded-lg px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                driveMode === "drive"
                  ? "bg-white text-black font-extrabold shadow-sm"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              <Zap className="h-3 w-3 text-cyan-500 fill-current" />
              <span>CARLA Lane Change</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDriveMode("inspect");
                setIsInteractive(true);
              }}
              className={`rounded-lg px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                driveMode === "inspect"
                  ? "bg-white text-black font-extrabold shadow-sm"
                  : "text-neutral-300 hover:text-white"
              }`}
            >
              <Eye className="h-3 w-3 text-emerald-500" />
              <span>Stationary Inspect</span>
            </button>
          </div>

          {/* SENSOR VISUALIZATION DROPDOWN (USER REQUEST) */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSensorDropdownOpen((prev) => !prev);
              }}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all shadow-sm"
            >
              <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Sensor: {sensorDescriptions[sensorMode].label}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-cyan-400 transition-transform ${
                  sensorDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu Modal */}
            {sensorDropdownOpen && (
              <div
                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 rounded-2xl border border-white/20 bg-[#0A0E17]/98 p-2 shadow-2xl backdrop-blur-2xl z-40 space-y-1"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-wider border-b border-white/10 font-bold mb-1">
                  Select Sensor Visualization
                </div>

                {(["lidar", "radar", "fusion"] as SensorMode[]).map((mode) => {
                  const meta = sensorDescriptions[mode];
                  const Icon = meta.icon;
                  const isActive = sensorMode === mode;

                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => {
                        setSensorMode(mode);
                        setSensorDropdownOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all ${
                        isActive
                          ? "bg-white/15 border border-cyan-400/40 text-white"
                          : "hover:bg-white/5 text-neutral-300"
                      }`}
                    >
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${isActive ? "text-cyan-400" : "text-neutral-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs font-bold text-white">
                          <span>{meta.label}</span>
                          {isActive && <Check className="h-3 w-3 text-cyan-400" />}
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                          {meta.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Protection & 3D Interactive Toggle Button */}
        <button
          type="button"
          onClick={() => setIsInteractive((prev) => !prev)}
          className={`rounded-full px-4 py-1 font-mono text-[10px] tracking-wider transition-all border ${
            isInteractive
              ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              : "border-white/15 bg-black/80 text-neutral-300 hover:text-white hover:border-white/30"
          }`}
        >
          {isInteractive
            ? "✓ 3D Orbit & Zoom Active (Scroll zooms • Drag rotates • Click to Lock)"
            : "🖱️ Click to Interact / Zoom in 3D (Page scroll protected)"}
        </button>
      </div>
    </div>
  );
};

export default HeroGlassObject;
