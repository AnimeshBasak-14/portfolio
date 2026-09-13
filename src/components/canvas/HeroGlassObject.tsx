"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * High-Fidelity 3D Autonomous Vehicle & Multi-Modal Perception Simulator
 * 
 * Specifically representing Animesh Basak's doctoral research:
 * - Continuous actor-critic reinforcement learning (TD3 vs. DDPG) in CARLA
 * - Autonomous lane-changing decision making, trajectory generation & collision avoidance
 * - Multi-sensor fusion: 360° roof LiDAR puck, forward long-range radar, and camera perception
 * 
 * Styled for the light white/warm-cream background with warm olive & forest green palette:
 * - #243320 (Deep Forest)
 * - #5c724a (Warm Olive / Moss)
 * - #a3b68a (Soft Sage)
 * - #c7b793 (Champagne Sand)
 * - #f5f5d5 (Warm Ivory Cream)
 */

interface VehicleSceneProps {
  mode: "drive" | "lidar" | "inspect";
}

/**
 * Detailed Autonomous Vehicle Model (Chassis, Cabin, Wheels, Lights, Sensors)
 */
function AutonomousVehicle({
  mode,
  steeringAngle,
  wheelRotation,
  isBlinkingLeft,
}: {
  mode: "drive" | "lidar" | "inspect";
  steeringAngle: number;
  wheelRotation: number;
  isBlinkingLeft: boolean;
}) {
  const lidarRotor = useRef<THREE.Mesh>(null);
  const radarBeam = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (lidarRotor.current) {
      lidarRotor.current.rotation.y += delta * 12.0; // 10-15 Hz LiDAR spin
    }
    if (radarBeam.current) {
      radarBeam.current.rotation.z -= delta * 3.0;
    }
  });

  return (
    <group>
      {/* 1. Main Aerodynamic Chassis (Metallic Olive-Forest Clearcoat) */}
      <group position={[0, 0.16, 0]}>
        {/* Lower Main Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.56, 0.16, 1.25]} />
          <meshStandardMaterial
            color="#2f4227"
            roughness={0.22}
            metalness={0.78}
          />
        </mesh>

        {/* Sculpted Aerodynamic Hood / Bonnet */}
        <mesh position={[0, 0.04, 0.38]} rotation={[-0.12, 0, 0]}>
          <boxGeometry args={[0.52, 0.1, 0.46]} />
          <meshStandardMaterial
            color="#3a5231"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Front Bumper Air Dam & Splitter */}
        <mesh position={[0, -0.06, 0.61]}>
          <boxGeometry args={[0.55, 0.04, 0.08]} />
          <meshStandardMaterial color="#1a2517" roughness={0.6} metalness={0.3} />
        </mesh>

        {/* Rear Aerodynamic Trunk & Integrated Lip Spoiler */}
        <mesh position={[0, 0.04, -0.44]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[0.52, 0.1, 0.36]} />
          <meshStandardMaterial color="#3a5231" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, -0.6]}>
          <boxGeometry args={[0.5, 0.02, 0.06]} />
          <meshStandardMaterial color="#1a2517" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Rear Aerodynamic Diffuser */}
        <mesh position={[0, -0.06, -0.6]}>
          <boxGeometry args={[0.54, 0.05, 0.06]} />
          <meshStandardMaterial color="#111710" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Side Skirts */}
        <mesh position={[-0.285, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.04, 0.9]} />
          <meshStandardMaterial color="#1a2517" roughness={0.5} />
        </mesh>
        <mesh position={[0.285, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.04, 0.9]} />
          <meshStandardMaterial color="#1a2517" roughness={0.5} />
        </mesh>
      </group>

      {/* 2. Glasshouse / Greenhouse Cabin (Windshield, Panoramic Glass Roof, Side Windows) */}
      <group position={[0, 0.31, -0.04]}>
        {/* Front Slanted Windshield */}
        <mesh position={[0, 0.04, 0.22]} rotation={[-0.55, 0, 0]}>
          <boxGeometry args={[0.46, 0.02, 0.32]} />
          <meshStandardMaterial
            color="#e2ded2"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Panoramic Roof Glass */}
        <mesh position={[0, 0.12, -0.02]}>
          <boxGeometry args={[0.44, 0.02, 0.38]} />
          <meshStandardMaterial
            color="#2d3b27"
            roughness={0.08}
            metalness={0.85}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Rear Window (Fastback Slant) */}
        <mesh position={[0, 0.04, -0.24]} rotation={[0.48, 0, 0]}>
          <boxGeometry args={[0.44, 0.02, 0.28]} />
          <meshStandardMaterial
            color="#e2ded2"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Cabin Side Windows */}
        <mesh position={[-0.225, 0.04, -0.02]}>
          <boxGeometry args={[0.02, 0.14, 0.44]} />
          <meshStandardMaterial
            color="#e2ded2"
            roughness={0.06}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0.225, 0.04, -0.02]}>
          <boxGeometry args={[0.02, 0.14, 0.44]} />
          <meshStandardMaterial
            color="#e2ded2"
            roughness={0.06}
            metalness={0.9}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Side Mirrors */}
        <mesh position={[-0.31, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshStandardMaterial color="#2f4227" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.31, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.04, 0.05]} />
          <meshStandardMaterial color="#2f4227" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* 3. Automotive Lighting System */}
      {/* Front Dual-Cluster LED Headlights */}
      <group position={[0, 0.17, 0.62]}>
        {/* Left Headlight */}
        <mesh position={[-0.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#f5f5d5"
            emissiveIntensity={3.2}
          />
        </mesh>
        {/* Right Headlight */}
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.02]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#f5f5d5"
            emissiveIntensity={3.2}
          />
        </mesh>

        {/* Left Blinker Indicator (Flashes when changing lane to the left) */}
        <mesh position={[-0.26, 0, 0]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={isBlinkingLeft ? 3.5 : 0.2}
          />
        </mesh>

        {/* Forward Projected Headlight Light Beam Cone */}
        <mesh position={[0, -0.06, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.55, 1.6, 24, 1, true]} />
          <meshBasicMaterial
            color="#f5f5d5"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Rear Full-Width LED Tail Light Bar */}
      <group position={[0, 0.17, -0.63]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.48, 0.03, 0.02]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={2.5}
          />
        </mesh>
        {/* Rear Left Indicator */}
        <mesh position={[-0.25, 0, 0]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={isBlinkingLeft ? 3.5 : 0.2}
          />
        </mesh>
      </group>

      {/* 4. Roof-Mounted Multi-Modal Sensor Suite */}
      <group position={[0, 0.44, -0.06]}>
        {/* Sensor Mount Baseplate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.22, 0.02, 0.24]} />
          <meshStandardMaterial color="#1a2517" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Velodyne / Hesai 360° LiDAR Puck */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 24]} />
          <meshStandardMaterial color="#2d3a29" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* High-Speed Rotating LiDAR Turret */}
        <mesh ref={lidarRotor} position={[0, 0.085, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.03, 24]} />
          <meshStandardMaterial
            color="#5c724a"
            emissive="#a3b68a"
            emissiveIntensity={1.4}
          />
        </mesh>

        {/* Status Indicator LED */}
        <mesh position={[0, 0.11, 0]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color="#a3b68a" emissive="#a3b68a" emissiveIntensity={2.8} />
        </mesh>

        {/* Forward Camera Pod Housing */}
        <mesh position={[0, -0.02, 0.18]}>
          <boxGeometry args={[0.08, 0.03, 0.06]} />
          <meshStandardMaterial color="#111710" />
        </mesh>
        <mesh position={[0, -0.02, 0.215]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.01, 16]} />
          <meshStandardMaterial color="#a3b68a" emissive="#a3b68a" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* 5. Four Detailed Alloy Wheels & Rubber Tires with Braking Discs */}
      <group>
        {/* Front-Left Wheel (Steers during lane-change) */}
        <group position={[-0.29, 0.11, 0.38]} rotation={[0, steeringAngle, 0]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>

        {/* Front-Right Wheel (Steers during lane-change) */}
        <group position={[0.29, 0.11, 0.38]} rotation={[0, steeringAngle, 0]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>

        {/* Rear-Left Wheel */}
        <group position={[-0.29, 0.11, -0.38]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>

        {/* Rear-Right Wheel */}
        <group position={[0.29, 0.11, -0.38]}>
          <WheelAssembly rotationX={wheelRotation} />
        </group>
      </group>

      {/* 6. Active Multi-Modal Sensor Visualizations */}
      {/* Forward Long-Range Radar Scanning Cone */}
      <mesh position={[0, 0.15, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[mode === "lidar" ? 1.4 : 0.95, 2.2, 32, 1, true]} />
        <meshBasicMaterial
          color="#5c724a"
          transparent
          opacity={mode === "lidar" ? 0.24 : 0.12}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>

      {/* 360° LiDAR Point-Cloud Detection Perimeter */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[mode === "lidar" ? 2.4 : 1.7, mode === "lidar" ? 2.44 : 1.73, 64]} />
        <meshBasicMaterial
          color="#a3b68a"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ground Contact Shadow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.7, 1.5]} />
        <meshBasicMaterial color="#1a2517" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/**
 * Detailed 5-Spoke Alloy Wheel with Rubber Tire & Brake Caliper
 */
function WheelAssembly({ rotationX }: { rotationX: number }) {
  return (
    <group rotation={[rotationX, 0, 0]}>
      {/* Outer Black Rubber Tire with Tread */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.135, 0.135, 0.08, 24]} />
        <meshStandardMaterial color="#121711" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Metallic Silver-Champagne Alloy Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.095, 0.095, 0.082, 16]} />
        <meshStandardMaterial color="#c7b793" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* 5-Spoke Rim Geometry */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <mesh
          key={i}
          rotation={[0, 0, (deg * Math.PI) / 180]}
          position={[0, 0, 0]}
        >
          <boxGeometry args={[0.018, 0.09, 0.084]} />
          <meshStandardMaterial color="#e5ded0" roughness={0.15} metalness={0.9} />
        </mesh>
      ))}

      {/* Central Wheel Hub Cap */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.086, 12]} />
        <meshStandardMaterial color="#354a2f" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

/**
 * Traffic Vehicle (Obstacle in neighboring lanes)
 */
function TrafficCar({
  position,
  color,
  label,
}: {
  position: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <group position={position}>
      {/* Chassis */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.52, 0.15, 1.1]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Cabin Glass */}
      <mesh position={[0, 0.27, -0.04]}>
        <boxGeometry args={[0.42, 0.12, 0.55]} />
        <meshStandardMaterial
          color="#eae6dd"
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.18, 0.14, 0.56]}>
        <boxGeometry args={[0.08, 0.04, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[0.18, 0.14, 0.56]}>
        <boxGeometry args={[0.08, 0.04, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
      </mesh>

      {/* Taillights */}
      <mesh position={[0, 0.14, -0.56]}>
        <boxGeometry args={[0.42, 0.03, 0.02]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.0} />
      </mesh>

      {/* 4 Wheels */}
      <mesh position={[-0.27, 0.1, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.07, 16]} />
        <meshStandardMaterial color="#1a2019" />
      </mesh>
      <mesh position={[0.27, 0.1, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.07, 16]} />
        <meshStandardMaterial color="#1a2019" />
      </mesh>
      <mesh position={[-0.27, 0.1, -0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.07, 16]} />
        <meshStandardMaterial color="#1a2019" />
      </mesh>
      <mesh position={[0.27, 0.1, -0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.07, 16]} />
        <meshStandardMaterial color="#1a2019" />
      </mesh>

      {/* Radar Bounding Box Indicator */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.58, 24]} />
        <meshBasicMaterial color="#5c724a" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Autonomous Highway Scene
 */
function AutonomousVehicleScene({ mode }: VehicleSceneProps) {
  const sceneGroup = useRef<THREE.Group>(null);
  const egoVehicleGroup = useRef<THREE.Group>(null);

  const [steeringAngle, setSteeringAngle] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isBlinkingLeft, setIsBlinkingLeft] = useState(false);

  // Generate lane spline coordinates for left lane change: S-curve trajectory
  const trajectoryPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let z = -4.5; z <= 4.5; z += 0.2) {
      // Normalized progress 0 to 1 along road segment
      const norm = (z + 4.5) / 9.0;
      // S-curve lateral offset from right lane (+1.0) to left lane (-1.0)
      const x = 0.95 - Math.sin(norm * Math.PI) * 1.9;
      pts.push(new THREE.Vector3(x, 0.04, z));
    }
    return pts;
  }, []);

  const trajectoryGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(trajectoryPoints),
    [trajectoryPoints]
  );

  // Highway Lane Markings (3-lane corridor)
  const highwayMarkings = useMemo(() => {
    const leftEdge: THREE.Vector3[] = [];
    const rightEdge: THREE.Vector3[] = [];
    const laneDivider1: THREE.Vector3[] = [];
    const laneDivider2: THREE.Vector3[] = [];

    for (let z = -5.5; z <= 5.5; z += 0.5) {
      leftEdge.push(new THREE.Vector3(-2.2, 0.01, z));
      rightEdge.push(new THREE.Vector3(2.2, 0.01, z));
      laneDivider1.push(new THREE.Vector3(-0.75, 0.01, z));
      laneDivider2.push(new THREE.Vector3(0.75, 0.01, z));
    }

    return {
      leftEdge: new THREE.BufferGeometry().setFromPoints(leftEdge),
      rightEdge: new THREE.BufferGeometry().setFromPoints(rightEdge),
      divider1: new THREE.BufferGeometry().setFromPoints(laneDivider1),
      divider2: new THREE.BufferGeometry().setFromPoints(laneDivider2),
    };
  }, []);

  // Road cat's-eye reflective studs
  const roadStuds = useMemo(() => {
    const studs: [number, number, number][] = [];
    for (let z = -5.0; z <= 5.0; z += 1.0) {
      studs.push([-0.75, 0.02, z]);
      studs.push([0.75, 0.02, z]);
    }
    return studs;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Scene orientation & mouse parallax
    if (sceneGroup.current) {
      if (mode === "inspect") {
        sceneGroup.current.rotation.y = t * 0.25;
      } else {
        sceneGroup.current.rotation.y = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.y,
          (state.pointer.x * Math.PI) / 10,
          0.04
        );
        sceneGroup.current.rotation.x = THREE.MathUtils.lerp(
          sceneGroup.current.rotation.x,
          (-state.pointer.y * Math.PI) / 12,
          0.04
        );
      }
    }

    // Vehicle Dynamic Motion along Continuous RL Trajectory
    if (egoVehicleGroup.current) {
      if (mode === "drive") {
        // Loop time along spline
        const loop = (t * 0.35) % 1;
        const totalPts = trajectoryPoints.length - 1;
        const idx = Math.floor(loop * totalPts);
        const nextIdx = Math.min(idx + 1, totalPts);
        const alpha = (loop * totalPts) % 1;

        const p1 = trajectoryPoints[idx];
        const p2 = trajectoryPoints[nextIdx];

        if (p1 && p2) {
          egoVehicleGroup.current.position.lerpVectors(p1, p2, alpha);

          // Calculate heading angle
          const heading = Math.atan2(p2.x - p1.x, p2.z - p1.z);
          egoVehicleGroup.current.rotation.y = heading;

          // Steering angle proportional to heading curvature
          const steer = Math.sin(loop * Math.PI * 2) * 0.28;
          setSteeringAngle(steer);

          // Blink left turn signal during transition
          const isMidManeuver = loop > 0.15 && loop < 0.65;
          setIsBlinkingLeft(isMidManeuver && Math.sin(t * 10) > 0);
        }

        // Wheel continuous rolling rotation
        setWheelRotation((prev) => prev + delta * 9.0);
      } else {
        // Return smoothly to center resting position
        egoVehicleGroup.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        egoVehicleGroup.current.rotation.y = THREE.MathUtils.lerp(
          egoVehicleGroup.current.rotation.y,
          0,
          0.05
        );
        setSteeringAngle(0);
        setIsBlinkingLeft(false);
      }
    }
  });

  return (
    <group ref={sceneGroup}>
      {/* 1. Highway Road Surface Corridor */}
      <group position={[0, -0.01, 0]}>
        {/* Dark Asphalt Highway Ribbon */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[4.8, 12]} />
          <meshStandardMaterial
            color="#222a20"
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Road Outer Solid Shoulder Lines in Warm Champagne Sand */}
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.leftEdge}>
          <lineBasicMaterial color="#c7b793" linewidth={2} />
        </line>
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.rightEdge}>
          <lineBasicMaterial color="#c7b793" linewidth={2} />
        </line>

        {/* Dashed Lane Divider 1 */}
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.divider1}>
          <lineDashedMaterial color="#f5f5d5" dashSize={0.3} gapSize={0.25} />
        </line>

        {/* Dashed Lane Divider 2 */}
        {/* @ts-ignore */}
        <line geometry={highwayMarkings.divider2}>
          <lineDashedMaterial color="#f5f5d5" dashSize={0.3} gapSize={0.25} />
        </line>

        {/* Reflective Cat's-Eye Road Studs */}
        {roadStuds.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.03, 0.015, 0.03]} />
            <meshStandardMaterial
              color="#f5f5d5"
              emissive="#f5f5d5"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}

        {/* Highway Side Guardrails */}
        <mesh position={[-2.35, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.16, 12]} />
          <meshStandardMaterial color="#8a9984" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[2.35, 0.12, 0]}>
          <boxGeometry args={[0.04, 0.16, 12]} />
          <meshStandardMaterial color="#8a9984" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Autonomous Planned S-Curve Trajectory Path Line */}
        {/* @ts-ignore */}
        <line geometry={trajectoryGeometry}>
          <lineBasicMaterial color="#5c724a" linewidth={3} />
        </line>

        {/* Dynamic Waypoint Particles along the Trajectory */}
        {trajectoryPoints
          .filter((_, i) => i % 3 === 0)
          .map((pt, i) => (
            <mesh key={`wp-${i}`} position={[pt.x, 0.05, pt.z]}>
              <sphereGeometry args={[0.04, 14, 14]} />
              <meshStandardMaterial
                color="#5c724a"
                emissive="#a3b68a"
                emissiveIntensity={2.0}
              />
            </mesh>
          ))}
      </group>

      {/* 2. Traffic Vehicles (Obstacles for Autonomous Overtake Scenario) */}
      {/* Lead Slower Vehicle in Right Lane (Reason for Left Lane-Change) */}
      <TrafficCar
        position={[0.95, 0, 2.2]}
        color="#8c7e65"
        label="Target Obstacle"
      />

      {/* Following Vehicle in Far Left Lane */}
      <TrafficCar
        position={[-1.4, 0, -2.6]}
        color="#354a2f"
        label="Traffic Vehicle"
      />

      {/* 3. Ego Autonomous Vehicle Rig (The Core Research Model) */}
      <group ref={egoVehicleGroup} position={[0, 0, 0]}>
        <AutonomousVehicle
          mode={mode}
          steeringAngle={steeringAngle}
          wheelRotation={wheelRotation}
          isBlinkingLeft={isBlinkingLeft}
        />
      </group>
    </group>
  );
}

/**
 * Main Hero Glass Canvas with Expanded Zoom & Camera Controls
 */
export const HeroGlassCanvas: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"drive" | "lidar" | "inspect">("drive");

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center">
      {/* 3D WebGL Canvas with Spacious Framing & Enabled Zoom */}
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 3.8, 6.8], fov: 40 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          {/* Natural Sun & Ambient Sky Lighting for White/Light Theme */}
          <ambientLight intensity={1.2} color="#fafaf7" />
          <directionalLight
            position={[8, 12, 6]}
            intensity={2.2}
            color="#ffffff"
            castShadow
          />
          <directionalLight
            position={[-8, 6, -4]}
            intensity={0.9}
            color="#e8e6dc"
          />
          <pointLight position={[0, 4, 2]} intensity={1.5} color="#c7b793" />
          <pointLight position={[0, 1, -3]} intensity={1.2} color="#a3b68a" />

          {/* Gentle Floating Motion */}
          <Float
            speed={activeMode === "inspect" ? 0 : 1.2}
            rotationIntensity={0.15}
            floatIntensity={0.3}
            floatingRange={[-0.05, 0.05]}
          >
            <AutonomousVehicleScene mode={activeMode} />
          </Float>

          {/* User-Controlled Smooth Orbit & Zoom */}
          <OrbitControls
            enableZoom={true}
            minDistance={2.5}
            maxDistance={12}
            enablePan={false}
            dampingFactor={0.05}
            enableDamping={true}
            maxPolarAngle={Math.PI / 2.05}
            minPolarAngle={Math.PI / 7}
          />
        </Canvas>
      </div>

      {/* Interactive Mode Switcher & Zoom Guidance */}
      <div className="absolute bottom-2 z-30 flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 rounded-full border border-palette-moss/25 bg-white/90 px-3 py-1.5 backdrop-blur-md shadow-glass">
          <button
            type="button"
            onClick={() => setActiveMode("drive")}
            className={`rounded-full px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
              activeMode === "drive"
                ? "bg-palette-moss text-white border border-palette-moss shadow-glow-moss font-bold"
                : "text-palette-forest hover:text-palette-moss"
            }`}
          >
            ● CARLA Lane Change
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("lidar")}
            className={`rounded-full px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
              activeMode === "lidar"
                ? "bg-palette-moss text-white border border-palette-moss shadow-glow-moss font-bold"
                : "text-palette-forest hover:text-palette-moss"
            }`}
          >
            ● 360° LiDAR Perception
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("inspect")}
            className={`rounded-full px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-all ${
              activeMode === "inspect"
                ? "bg-palette-moss text-white border border-palette-moss shadow-glow-moss font-bold"
                : "text-palette-forest hover:text-palette-moss"
            }`}
          >
            ● 3D Orbit View
          </button>
        </div>

        <span className="font-mono text-[9px] text-palette-forest/60 tracking-wider">
          🔍 Scroll mouse wheel to zoom in / out · Drag to rotate 360°
        </span>
      </div>
    </div>
  );
};

export default HeroGlassCanvas;
