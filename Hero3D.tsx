import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const angle = i * 0.4;
      const x = Math.cos(angle) * 1.5;
      const z = Math.sin(angle) * 1.5;
      const y = i * 0.3 - 3;
      arr.push({ x, y, z, color: i % 2 === 0 ? '#1769E0' : '#0FB5A0' });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={i}>
          <mesh position={[node.x, node.y, node.z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={node.color} metalness={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[-node.x, node.y, -node.z]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={node.color === '#1769E0' ? '#0FB5A0' : '#1769E0'} metalness={0.5} roughness={0.2} />
          </mesh>
          <Line points={[new THREE.Vector3(node.x, node.y, node.z), new THREE.Vector3(-node.x, node.y, -node.z)]} color="#FFFFFF" lineWidth={2} />
        </group>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <DNAHelix />
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}
