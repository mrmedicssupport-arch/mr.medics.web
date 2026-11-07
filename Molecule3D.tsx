import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Capsule, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

function MoleculeModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Capsule */}
      <Capsule args={[0.5, 1.2, 16, 32]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#1769E0" roughness={0.3} metalness={0.4} />
      </Capsule>
      {/* Orbiting spheres representing molecules */}
      <Sphere args={[0.3, 16, 16]} position={[2, 1, 1]}>
        <meshStandardMaterial color="#0FB5A0" roughness={0.2} />
      </Sphere>
      <Sphere args={[0.25, 16, 16]} position={[-2, -1, -1]}>
        <meshStandardMaterial color="#8B5CF6" roughness={0.2} />
      </Sphere>
      <Sphere args={[0.35, 16, 16]} position={[1, -2, 1]}>
        <meshStandardMaterial color="#10B981" roughness={0.2} />
      </Sphere>
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 1, 1)]} color="#0FB5A0" lineWidth={3} />
      <Line points={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(-2, -1, -1)]} color="#8B5CF6" lineWidth={3} />
    </group>
  );
}

export default function Molecule3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <MoleculeModel />
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}
