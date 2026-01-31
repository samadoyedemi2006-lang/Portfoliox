import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import ParticleField from '../3d/ParticleField';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        titleRef.current.children,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <ParticleField />

      {/* Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-14 md:flex-row md:justify-between">
          
          {/* LEFT — Image Placeholder */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex-shrink-0"
          >
            <div className="relative h-56 w-56 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md md:h-72 md:w-72 lg:h-80 lg:w-80">
              <img
                src="/Portfoliox/IMG_4598.png"
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* RIGHT — Text Content */}
          <div className="text-center md:max-w-xl md:text-left lg:max-w-2xl">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-medium text-primary">
                Available for work
              </span>
            </motion.div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-6 overflow-hidden font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            >
              <span className="inline-block">Hi, I'm </span>
              <span className="gradient-text inline-block"> Abdul Samad</span>
              <br />
              <span className="inline-block text-muted-foreground">
                Creative Developer
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              I craft immersive digital experiences with cutting-edge technologies.
              Specializing in 3D web applications, interactive animations, and modern UI/UX design.
            </p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-12 flex flex-col gap-4 sm:flex-row"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground hover:shadow-glow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-secondary to-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full border border-border px-8 py-3 font-medium transition-all hover:border-primary hover:bg-primary/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex gap-6"
            >
              {[ 
                { icon: Github, href: 'https://github.com/samadoyedemi2006-lang', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/abdulsamad-oyedemi-01761a393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://x.com/programmer_19', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-3 text-muted-foreground hover:bg-muted hover:text-primary"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={28} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
