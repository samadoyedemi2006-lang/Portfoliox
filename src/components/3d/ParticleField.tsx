import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
function FloatingShape({ position, scale, color, speed = 1 }: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// Glowing orb
function GlowingOrb({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Particle system
function Particles({ count = 500 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main 3D scene for hero background
function Scene() {
  return (
    <>
      {/* Ambient and point lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.3} />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

      {/* Floating geometric shapes */}
      <FloatingShape position={[-4, 2, -3]} scale={0.8} color="#00d4ff" speed={0.8} />
      <FloatingShape position={[4, -1, -4]} scale={0.6} color="#8b5cf6" speed={1.2} />
      <FloatingShape position={[2, 3, -5]} scale={0.5} color="#ec4899" speed={1} />
      <FloatingShape position={[-3, -2, -3]} scale={0.7} color="#00d4ff" speed={0.9} />

      {/* Glowing orbs */}
      <GlowingOrb position={[3, 2, -2]} color="#00d4ff" />
      <GlowingOrb position={[-2, -1, -3]} color="#8b5cf6" />

      {/* Particle system */}
      <Particles count={300} />
    </>
  );
}

// Exported component with Canvas wrapper
export default function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
