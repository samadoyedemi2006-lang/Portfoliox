import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = '', glowColor = 'primary' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const glowClasses = {
    primary: 'group-hover:shadow-glow-md',
    secondary: 'group-hover:shadow-glow-secondary',
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`glass-card h-full w-full transition-shadow duration-300 ${glowClasses[glowColor as keyof typeof glowClasses] || glowClasses.primary}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.1), transparent 50%)',
          }}
        />
        
        {/* Card content with 3D depth */}
        <div
          className="relative z-10 h-full"
          style={{ transform: 'translateZ(30px)' }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
