import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function HeartModel() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08;
      groupRef.current.scale.set(scale, scale, scale);
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central heart sphere representation */}
      <Sphere args={[1.2, 32, 32]}>
        <meshStandardMaterial color="#1769E0" roughness={0.2} metalness={0.6} />
      </Sphere>
      {/* Orbiting pulse rings */}
      <Torus args={[2, 0.08, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#0FB5A0" roughness={0.1} metalness={0.8} />
      </Torus>
      <Torus args={[2.5, 0.06, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#1769E0" roughness={0.1} metalness={0.8} />
      </Torus>
    </group>
  );
}

export default function HeartPulse3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
        <HeartModel />
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}
