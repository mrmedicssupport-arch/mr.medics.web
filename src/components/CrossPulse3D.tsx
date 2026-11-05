import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

function CrossModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Medical Cross 3D */}
      <group>
        <Box args={[0.8, 2.4, 0.6]}>
          <meshStandardMaterial color="#0FB5A0" roughness={0.2} metalness={0.5} />
        </Box>
        <Box args={[2.4, 0.8, 0.6]}>
          <meshStandardMaterial color="#0FB5A0" roughness={0.2} metalness={0.5} />
        </Box>
      </group>
      {/* Rotating Shield Ring */}
      <Torus args={[2.2, 0.08, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1769E0" roughness={0.1} metalness={0.8} />
      </Torus>
    </group>
  );
}

export default function CrossPulse3D() {
  return (
    <Canvas camera={{ position: [0, 0, 7] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
        <CrossModel />
      </Float>
      <Environment preset="city" />
    </Canvas>
  );
}
