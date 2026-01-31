import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiBootstrap,
  SiCanva,
  SiAdobephotoshop,
  SiCoreldraw,
  SiGit,
  SiThreedotjs,
} from 'react-icons/si';

const skills = [
  { name: 'React', icon: SiReact, color: '#61DAFB', level: 95 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 90 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 95 },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', level: 90 },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 85 },
  { name: 'Three.js', icon: SiThreedotjs, color: '#FFFFFF', level: 75 },
  { name: 'Canva', icon: SiCanva, color: '#00C4CC', level: 90 },
  { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF', level: 85 },
  { name: 'CorelDRAW', icon: SiCoreldraw, color: '#46A049', level: 80 },
  { name: 'Git', icon: SiGit, color: '#F05032', level: 95 },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container relative mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Skills & Expertise
          </span>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Technologies I
            <span className="gradient-text"> Master</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A balanced mix of frontend development and creative design tools
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 0 30px ${skill.color}30`,
                transition: { duration: 0.2 },
              }}
              className="glass-card group relative flex flex-col items-center justify-center p-6 transition-all"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${skill.color}12, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ color: skill.color }}
              >
                <skill.icon size={40} />
              </div>

              {/* Name */}
              <span className="relative text-sm font-medium text-foreground">
                {skill.name}
              </span>

              {/* Level Bar */}
              <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: 'easeOut',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Blending clean code with strong visual design for impactful experiences.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
