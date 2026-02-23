import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Zap, Coffee } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, value: '1+', label: 'Years Backend Experience' },
  { icon: Palette, value: '10+', label: 'APIs & Systems Built' },
  { icon: Zap, value: '99.9%', label: 'System Reliability' },
  { icon: Coffee, value: '∞', label: 'Debug Sessions' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
      }
    );
  }, []);

  const splitText = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block">
        {word}&nbsp;
      </span>
    ));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container relative mx-auto">
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary"
          >
            About Me
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl font-bold md:text-5xl"
          >
            Powering Systems Behind
            <span className="gradient-text"> The Scenes</span>
          </motion.h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="glass-card p-8">
              <h3 className="mb-4 font-display text-xl font-semibold text-foreground">
                Who I Am
              </h3>
              <div ref={textRef} className="text-muted-foreground leading-relaxed">
                {splitText(
                  "I'm a backend-focused developer with over 1+ years of experience building reliable server-side systems. I enjoy designing APIs, managing databases, and ensuring that applications run securely, efficiently, and at scale."
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-8">
              <h3 className="mb-4 font-display text-xl font-semibold text-foreground">
                What I Do
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in developing backend logic for modern applications,
                including RESTful APIs, authentication systems, database architecture,
                and performance optimization. My focus is building stable foundations
                that frontend experiences can rely on.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="glass-card group p-6 text-center transition-all hover:shadow-glow-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <stat.icon size={28} />
                </div>
                <div className="gradient-text mb-2 font-display text-3xl font-bold md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}