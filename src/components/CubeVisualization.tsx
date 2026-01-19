"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CubeVisualizationProps {
  className?: string;
}

// Isometric cube face component - renders one face of a tiny cube
function IsometricCubelet({ 
  x, y, z, 
  size, 
  delay,
  isHighlighted 
}: { 
  x: number; 
  y: number; 
  z: number; 
  size: number;
  delay: number;
  isHighlighted: boolean;
}) {
  // Isometric projection calculations
  const isoX = (x - z) * 0.866 * size;
  const isoY = (x + z) * 0.5 * size - y * size;
  
  // Calculate dissociation direction based on position from center
  const dissociationX = x * 8; // Move away from center in X direction
  const dissociationY = y * 4; // Move away from center in Y direction
  const dissociationZ = z * 8; // Move away from center in Z direction
  
  const baseColor = isHighlighted 
    ? "rgba(245, 158, 11, 0.4)" 
    : "rgba(148, 163, 184, 0.08)";
  const topColor = isHighlighted 
    ? "rgba(245, 158, 11, 0.6)" 
    : "rgba(148, 163, 184, 0.15)";
  const rightColor = isHighlighted 
    ? "rgba(245, 158, 11, 0.35)" 
    : "rgba(148, 163, 184, 0.05)";
  const borderColor = isHighlighted
    ? "rgba(245, 158, 11, 0.7)"
    : "rgba(148, 163, 184, 0.12)";

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, dissociationX, 0],
        y: [0, dissociationY, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay, ease: [0.16, 1, 0.3, 1] as const },
        scale: { duration: 0.5, delay: delay, ease: [0.16, 1, 0.3, 1] as const },
        x: { duration: 8, delay: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1] as const, repeatDelay: 2 },
        y: { duration: 8, delay: 3, repeat: Infinity, ease: [0.4, 0, 0.6, 1] as const, repeatDelay: 2 },
      }}
      style={{ transformOrigin: `${isoX}px ${isoY}px` }}
    >
      {/* Top face */}
      <polygon
        points={`
          ${isoX},${isoY - size * 0.5}
          ${isoX + size * 0.866},${isoY}
          ${isoX},${isoY + size * 0.5}
          ${isoX - size * 0.866},${isoY}
        `}
        fill={topColor}
        stroke={borderColor}
        strokeWidth="0.5"
      />
      {/* Left face */}
      <polygon
        points={`
          ${isoX - size * 0.866},${isoY}
          ${isoX},${isoY + size * 0.5}
          ${isoX},${isoY + size * 1.5}
          ${isoX - size * 0.866},${isoY + size}
        `}
        fill={baseColor}
        stroke={borderColor}
        strokeWidth="0.5"
      />
      {/* Right face */}
      <polygon
        points={`
          ${isoX + size * 0.866},${isoY}
          ${isoX + size * 0.866},${isoY + size}
          ${isoX},${isoY + size * 1.5}
          ${isoX},${isoY + size * 0.5}
        `}
        fill={rightColor}
        stroke={borderColor}
        strokeWidth="0.5"
      />
    </motion.g>
  );
}

export function CubeVisualization({ className = "" }: CubeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  // Scroll-based transformations for future slice extraction
  const sliceOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  // Generate cube grid - 10x10x10 = 1000 cubes
  const cubeData = useMemo(() => {
    const data: { x: number; y: number; z: number; delay: number; isMiddle: boolean }[] = [];
    const gridSize = 8; // 8x8x8 = 512 cubes (good balance of density and performance)
    
    // We render from back to front, bottom to top for proper occlusion
    for (let z = gridSize - 1; z >= 0; z--) {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          // Only render visible cubes (outer shell + some interior for density feel)
          const isEdge = x === 0 || x === gridSize - 1 || 
                        y === 0 || y === gridSize - 1 || 
                        z === 0 || z === gridSize - 1;
          const isMiddleSlice = y >= 3 && y <= 4; // Middle horizontal slice
          
          // Render all cubes for dense look, but mark middle slice
          data.push({
            x: x - gridSize / 2 + 0.5,
            y: y - gridSize / 2 + 0.5,
            z: z - gridSize / 2 + 0.5,
            delay: (x + y + z) * 0.008,
            isMiddle: isMiddleSlice && !isEdge,
          });
        }
      }
    }
    return data;
  }, []);

  const cubeSize = 18; // Size of each cubelet

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square flex items-center justify-center ${className}`}
    >
      {/* Ambient glow - large blur behind the cube - SLOWER & SMOOTHER */}
      <motion.div 
        className="absolute w-3/4 h-3/4 rounded-full"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }}
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Secondary glow pulse - SLOWER & SMOOTHER */}
      <motion.div 
        className="absolute w-1/2 h-1/2 rounded-full"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay: 1,
        }}
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.7) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      
      {/* Tertiary ripple effect - SLOWER & SMOOTHER */}
      <motion.div 
        className="absolute w-full h-full rounded-full"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.85, 1.25, 0.85],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Main Cube SVG - SLOWER & SMOOTHER */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.015, 1],
          rotateY: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }}
      >
        <svg 
          width="340" 
          height="380" 
          viewBox="-180 -40 360 380"
          className="overflow-visible"
        >
          {/* Subtle shadow underneath */}
          <ellipse
            cx="0"
            cy="300"
            rx="120"
            ry="30"
            fill="rgba(245, 158, 11, 0.08)"
            filter="blur(20px)"
          />
          
          {/* Render all cubelets */}
          {cubeData.map((cube, index) => (
            <IsometricCubelet
              key={index}
              x={cube.x}
              y={cube.y}
              z={cube.z}
              size={cubeSize}
              delay={cube.delay}
              isHighlighted={cube.isMiddle}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Data readout - top right */}
      <motion.div
        className="absolute top-4 right-4 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="text-[10px] text-text-tertiary font-mono tracking-wider"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          COHORTS: 1,000,000+
        </motion.div>
        <motion.div
          className="text-[10px] text-amber font-mono tracking-wider mt-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ACTIVE
        </motion.div>
      </motion.div>
      
      {/* Data readout - bottom left */}
      <motion.div
        className="absolute bottom-4 left-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="text-[10px] text-amber font-mono tracking-wider flex items-center gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-amber"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          SIMULATING
        </motion.div>
      </motion.div>
    </div>
  );
}
