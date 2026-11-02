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
  RefreshCw,
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
 * Error boundary for WebGL / Canvas failures.
 * Prevents client-side exceptions from bubbling up and crashing the page.
 */
class WebGLBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.warn("[WebGL Perception Simulator Warning]:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 text-center select-none">
            <div className="h-12 w-12 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Zap className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-1">
              Autonomous Vehicle Telemetry & Perception
            </h4>
            <p className="text-xs text-neutral-400 max-w-sm mb-4 leading-relaxed font-mono">
              CARLA 60 FPS • Continuous TD3 Agent • 360° LiDAR & Radar Telemetry Active
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-mono text-white hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset 3D Canvas</span>
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

/**
 * Detailed 5-Spoke Alloy Wheel with Rubber Tire & Brembo Crimson Brake Caliper
 */
const WheelAssembly = React.memo(
  React.forwardRef<THREE.Group, {}>((_, ref) => {
    return (
      <group ref={ref}>
        {/* Outer Rubber Tire */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.135, 0.135, 0.08, 20]} />
          <meshStandardMaterial color="#11161F" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Ventilated Drilled Steel Brake Disc */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.085, 0.085, 0.076, 16]} />
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
  })
);
WheelAssembly.displayName = "WheelAssembly";

/**
 * Detailed Autonomous Vehicle Model (Chassis, Cabin, Wheels, Lights, Sensors)
 * Ego vehicle outlined in crisp thin green (#10B981).
 * High-performance direct Three.js ref animations (zero setState in useFrame).
 */
function AutonomousVehicle({
  sensorMode,
  driveMode,
}: {
  sensorMode: SensorMode;
  driveMode: DriveMode;
}) {
  const lidarRotor = useRef<THREE.Mesh>(null);
  const lidarScanBeam = useRef<THREE.Group>(null);
  const radarSweep = useRef<THREE.Group>(null);
  const radarWave1 = useRef<THREE.Mesh>(null);
  const radarWave2 = useRef<THREE.Mesh>(null);

  // Direct wheel animation refs (no React state updates in render loop)
  const frontLeftWheelGroup = useRef<THREE.Group>(null);
  const frontRightWheelGroup = useRef<THREE.Group>(null);
  const flWheel = useRef<THREE.Group>(null);
  const frWheel = useRef<THREE.Group>(null);
  const rlWheel = useRef<THREE.Group>(null);
  const rrWheel = useRef<THREE.Group>(null);
  const wheelRotationAngle = useRef(0);

  // Blinker materials
  const frontBlinkerMat = useRef<THREE.MeshStandardMaterial>(null);
  const rearBlinkerMat = useRef<THREE.MeshStandardMaterial>(null);

  // Memoized geometries to eliminate garbage collection & re-allocations
  const headingLineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.24, 0.71),
      new THREE.Vector3(0, 0.24, 1.15),
    ]);
  }, []);

  const boundingBoxEdgesGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(0.68, 0.44, 1.42));
  }, []);

  const radarAxisGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 3.6),
    ]);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // 1. 10-15 Hz LiDAR turret rotation
    if (lidarRotor.current) {
      lidarRotor.current.rotation.y += delta * 14.0;
    }
    if (lidarScanBeam.current) {
      lidarScanBeam.current.rotation.y += delta * 14.0;
    }

    // 2. Radar cone horizontal azimuth sweep (±25 degrees)
    if (radarSweep.current) {
      radarSweep.current.rotation.y = Math.sin(t * 3.5) * 0.42;
    }

    // 3. Pulsing radar millimeter-wave arcs expanding forward
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

    // 4. Wheels rotation & steering animation directly on meshes
    if (driveMode === "drive") {
      const loop = (t * 0.32) % 1;
      const steer = Math.sin(loop * Math.PI * 2) * 0.28;
      if (frontLeftWheelGroup.current) frontLeftWheelGroup.current.rotation.y = steer;
      if (frontRightWheelGroup.current) frontRightWheelGroup.current.rotation.y = steer;

      wheelRotationAngle.current += delta * 9.0;
      const rot = wheelRotationAngle.current;
      if (flWheel.current) flWheel.current.rotation.x = rot;
      if (frWheel.current) frWheel.current.rotation.x = rot;
      if (rlWheel.current) rlWheel.current.rotation.x = rot;
      if (rrWheel.current) rrWheel.current.rotation.x = rot;

      const isMidManeuver = loop > 0.15 && loop < 0.65;
      const blinkIntensity = isMidManeuver && Math.sin(t * 10) > 0 ? 5.0 : 0.3;
      if (frontBlinkerMat.current) frontBlinkerMat.current.emissiveIntensity = blinkIntensity;
      if (rearBlinkerMat.current) rearBlinkerMat.current.emissiveIntensity = blinkIntensity;
    } else {
      if (frontLeftWheelGroup.current) frontLeftWheelGroup.current.rotation.y = 0;
      if (frontRightWheelGroup.current) frontRightWheelGroup.current.rotation.y = 0;
      if (frontBlinkerMat.current) frontBlinkerMat.current.emissiveIntensity = 0.3;
      if (rearBlinkerMat.current) rearBlinkerMat.current.emissiveIntensity = 0.3;
    }
  });

  return (
    <group>
      {/* 1. Main Aerodynamic Chassis */}
      <group position={[0, 0.16, 0]}>
        {/* Lower Main Body with Crisp Thin Green Outline */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.58, 0.16, 1.28]} />
          <meshStandardMaterial
            color="#252D3A"
            roughness={0.25}
            metalness={0.65}
          />
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

      {/* 2. Glasshouse / Greenhouse Cabin */}
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
        <lineSegments geometry={boundingBoxEdgesGeo}>
          <lineBasicMaterial color="#10B981" linewidth={2} />
        </lineSegments>
        {/* Forward Orientation Heading Pointer */}
        <lineSegments geometry={headingLineGeo}>
          <lineBasicMaterial color="#10B981" linewidth={2} />
        </lineSegments>
      </group>

      {/* 4. Automotive Lighting System */}
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
            ref={frontBlinkerMat}
            color="#F59E0B"
            emissive="#FFA000"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Forward Projected Road Illumination Cone */}
        <mesh position={[0, -0.06, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.65, 1.8, 20, 1, true]} />
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
            ref={rearBlinkerMat}
            color="#F59E0B"
            emissive="#FFA000"
            emissiveIntensity={0.3}
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
          <cylinderGeometry args={[0.07, 0.07, 0.06, 20]} />
          <meshStandardMaterial color="#2B3648" roughness={0.3} metalness={0.8} />
          <Edges threshold={20} color="#10B981" />
        </mesh>

        {/* High-Speed Rotating LiDAR Turret with Electric Cyan Laser Band */}
        <mesh ref={lidarRotor} position={[0, 0.085, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.03, 20]} />
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
          <cylinderGeometry args={[0.012, 0.012, 0.01, 12]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* 6. Four Detailed Wheels with Crimson Calipers */}
      <group>
        <group ref={frontLeftWheelGroup} position={[-0.3, 0.11, 0.38]}>
          <WheelAssembly ref={flWheel} />
        </group>
        <group ref={frontRightWheelGroup} position={[0.3, 0.11, 0.38]}>
          <WheelAssembly ref={frWheel} />
        </group>
        <group position={[-0.3, 0.11, -0.38]}>
          <WheelAssembly ref={rlWheel} />
        </group>
        <group position={[0.3, 0.11, -0.38]}>
          <WheelAssembly ref={rrWheel} />
        </group>
      </group>

      {/* 7. DEDICATED SENSOR VISUALIZATION 1: 360° LiDAR POINT CLOUD */}
      {(sensorMode === "lidar" || sensorMode === "fusion") && (
        <group>
          {/* Concentric Distance Range Rings (1.4m, 2.5m, 3.8m) */}
          {[1.4, 2.5, 3.8].map((radius, idx) => (
            <mesh key={`lidar-ring-${idx}`} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius, radius + 0.03, 48]} />
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

          {/* Dense 3D LiDAR Point Cloud */}
          <LiDARPointCloud />
        </group>
      )}

      {/* 8. DEDICATED SENSOR VISUALIZATION 2: 77 GHz FMCW LONG-RANGE RADAR */}
      {(sensorMode === "radar" || sensorMode === "fusion") && (
        <group>
          {/* Forward Sweeping Radar Cone in Electric Cyan Wireframe */}
          <group ref={radarSweep} position={[0, 0.14, 0.65]}>
            <mesh position={[0, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[1.4, 3.6, 24, 2, true]} />
              <meshBasicMaterial
                color="#00E5FF"
                transparent
                opacity={0.35}
                side={THREE.DoubleSide}
                wireframe
              />
            </mesh>

            {/* Central Radar Axis Line */}
            <lineSegments geometry={radarAxisGeo}>
              <lineBasicMaterial color="#00F0FF" linewidth={2} />
            </lineSegments>
          </group>

          {/* Pulsing Radar Millimeter-Wave Wavefront Arcs */}
          <group position={[0, 0.14, 0.65]}>
            <mesh ref={radarWave1} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.3, 0.35, 24]} />
              <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
            <mesh ref={radarWave2} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.3, 0.35, 24]} />
              <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Rear Blind-Spot Radar Warning Arc */}
          <mesh position={[0, 0.12, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.9, 1.4, 20, 1, true]} />
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
 * High performance point particle cloud (1 single draw call instead of hundreds of separate meshes).
 */
function LiDARPointCloud() {
  const pointsGeometry = useMemo(() => {
    const coords: number[] = [];
    const colors: number[] = [];
    const cRed = new THREE.Color("#FF4D4D");
    const cGreen = new THREE.Color("#00FFC8");
    const cCyan = new THREE.Color("#00F0FF");

    // 1. Concentric ground reflection rings
    for (let r = 0.8; r <= 3.8; r += 0.35) {
      const numPoints = Math.floor(r * 22);
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        const jitterX = (Math.random() - 0.5) * 0.06;
        const jitterZ = (Math.random() - 0.5) * 0.06;
        coords.push(
          Math.cos(theta) * r + jitterX,
          0.02 + Math.random() * 0.02,
          Math.sin(theta) * r + jitterZ
        );
        const col = i % 2 === 0 ? cGreen : cCyan;
        colors.push(col.r, col.g, col.b);
      }
    }

    // 2. Road curb / barrier laser reflections
    for (let z = -4.5; z <= 4.5; z += 0.25) {
      coords.push(-2.2 + (Math.random() - 0.5) * 0.05, 0.12 + Math.random() * 0.04, z);
      colors.push(cCyan.r, cCyan.g, cCyan.b);

      coords.push(2.2 + (Math.random() - 0.5) * 0.05, 0.12 + Math.random() * 0.04, z);
      colors.push(cGreen.r, cGreen.g, cGreen.b);
    }

    // 3. Dense points outlining the lead obstacle car at [0.95, 0, 2.2]
    for (let i = 0; i < 65; i++) {
      const ox = 0.95 + (Math.random() - 0.5) * 0.55;
      const oy = 0.06 + Math.random() * 0.35;
      const oz = 2.2 + (Math.random() - 0.5) * 1.15;
      coords.push(ox, oy, oz);
      colors.push(cRed.r, cRed.g, cRed.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <points geometry={pointsGeometry}>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Stationary / Traffic Vehicle (Obstacle in Highway Lane)
 * Outlined with thin red (#EF4444).
 */
function TrafficCar({
  position,
  color,
  showRadarLock,
}: {
  position: [number, number, number];
  color: string;
  label?: string;
  distance?: string;
  ttc?: string;
  showRadarLock: boolean;
}) {
  const obstacleBoxEdgesGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(0.64, 0.42, 1.28));
  }, []);

  const dopplerLineGeo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -0.65),
    ]);
  }, []);

  return (
    <group position={position}>
      {/* 1. Chassis with Thin Red Outline */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.54, 0.15, 1.15]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.65} />
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
        <lineSegments geometry={obstacleBoxEdgesGeo}>
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

      {/* 6. Radar Tracking Lock-On Bracket & Doppler Vector */}
      {showRadarLock && (
        <group position={[0, 0.5, 0]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.22, 0.25, 4]} />
            <meshBasicMaterial color="#EF4444" side={THREE.DoubleSide} />
          </mesh>
          <lineSegments geometry={dopplerLineGeo}>
            <lineBasicMaterial color="#EF4444" linewidth={2} />
          </lineSegments>
        </group>
      )}

      {/* Ground Warning Proximity Ring */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.66, 24]} />
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

  // Highway Lane Markings (Dashed divider segments via LineSegments)
  const highwayMarkings = useMemo(() => {
    const leftEdge: THREE.Vector3[] = [
      new THREE.Vector3(-2.2, 0.015, -5.5),
      new THREE.Vector3(-2.2, 0.015, 5.5),
    ];
    const rightEdge: THREE.Vector3[] = [
      new THREE.Vector3(2.2, 0.015, -5.5),
      new THREE.Vector3(2.2, 0.015, 5.5),
    ];
    const divider1: THREE.Vector3[] = [];
    const divider2: THREE.Vector3[] = [];

    // Dashed divider segment pairs (start -> end)
    for (let z = -5.5; z <= 5.5; z += 0.7) {
      divider1.push(new THREE.Vector3(-0.75, 0.015, z));
      divider1.push(new THREE.Vector3(-0.75, 0.015, Math.min(z + 0.35, 5.5)));

      divider2.push(new THREE.Vector3(0.75, 0.015, z));
      divider2.push(new THREE.Vector3(0.75, 0.015, Math.min(z + 0.35, 5.5)));
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

  const roadStudGeo = useMemo(() => new THREE.BoxGeometry(0.035, 0.02, 0.035), []);
  const roadStudMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFFFFF",
        emissive: "#FFFFFF",
        emissiveIntensity: 3.5,
      }),
    []
  );

  const waypointSphereGeo = useMemo(() => new THREE.SphereGeometry(0.045, 10, 10), []);
  const waypointCyanMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#00F5FF",
        emissive: "#00F5FF",
        emissiveIntensity: 3.8,
      }),
    []
  );
  const waypointEmeraldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#10B981",
        emissive: "#10B981",
        emissiveIntensity: 3.8,
      }),
    []
  );

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

    // Vehicle Dynamic Motion along S-Curve Trajectory (direct transform mutation)
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
        }
      } else {
        egoVehicleGroup.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.06);
        egoVehicleGroup.current.rotation.y = THREE.MathUtils.lerp(
          egoVehicleGroup.current.rotation.y,
          0,
          0.06
        );
      }
    }
  });

  return (
    <group ref={sceneGroup}>
      {/* 1. Highway Road Surface */}
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
        <lineSegments geometry={highwayMarkings.leftEdge}>
          <lineBasicMaterial color="#E2E8F0" linewidth={2} />
        </lineSegments>
        <lineSegments geometry={highwayMarkings.rightEdge}>
          <lineBasicMaterial color="#E2E8F0" linewidth={2} />
        </lineSegments>

        {/* Dashed Lane Dividers in Amber and Platinum */}
        <lineSegments geometry={highwayMarkings.divider1}>
          <lineBasicMaterial color="#F59E0B" linewidth={2} />
        </lineSegments>
        <lineSegments geometry={highwayMarkings.divider2}>
          <lineBasicMaterial color="#94A3B8" linewidth={2} />
        </lineSegments>

        {/* Reflective Road Studs */}
        {roadStuds.map((pos, i) => (
          <mesh key={i} position={pos} geometry={roadStudGeo} material={roadStudMat} />
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
        <lineSegments geometry={trajectoryGeometry}>
          <lineBasicMaterial color="#00F0FF" linewidth={2} />
        </lineSegments>

        {/* Dynamic Waypoint Particles along Trajectory */}
        {trajectoryPoints
          .filter((_, i) => i % 3 === 0)
          .map((pt, i) => (
            <mesh
              key={`wp-${i}`}
              position={[pt.x, 0.055, pt.z]}
              geometry={waypointSphereGeo}
              material={i % 2 === 0 ? waypointCyanMat : waypointEmeraldMat}
            />
          ))}
      </group>

      {/* 2. Stationary Traffic Vehicles (Outlined in Red) */}
      <TrafficCar
        position={[0.95, 0, 2.2]}
        color="#3B1D22"
        showRadarLock={sensorMode === "radar" || sensorMode === "fusion"}
      />

      <TrafficCar
        position={[-1.4, 0, -2.6]}
        color="#2D1519"
        showRadarLock={sensorMode === "radar" || sensorMode === "fusion"}
      />

      {/* 3. Ego Autonomous Vehicle (Outlined in Green) */}
      <group ref={egoVehicleGroup} position={[0, 0, 0]}>
        <AutonomousVehicle
          sensorMode={sensorMode}
          driveMode={driveMode}
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

      {/* 3D WebGL Canvas with WebGLBoundary protection */}
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
        <WebGLBoundary>
          <Canvas
            camera={{ position: [0, 3.8, 6.8], fov: 40 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
          >
            {/* HIGH-VISIBILITY STUDIO LIGHTING SUITE */}
            <ambientLight intensity={1.8} color="#FFFFFF" />

            <directionalLight
              position={[0, 15, 2]}
              intensity={3.2}
              color="#FFFFFF"
              castShadow
            />

            <directionalLight
              position={[6, 9, 7]}
              intensity={2.8}
              color="#FFFFFF"
            />

            <directionalLight
              position={[-6, 7, -6]}
              intensity={2.0}
              color="#CBD5E1"
            />

            <pointLight position={[-4, 3, 2]} intensity={3.5} color="#00E5FF" distance={14} />
            <pointLight position={[4, 2, -3]} intensity={2.5} color="#F43F5E" distance={12} />
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
        </WebGLBoundary>
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

          {/* SENSOR VISUALIZATION DROPDOWN */}
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
