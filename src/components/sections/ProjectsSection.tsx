import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import TiltCard from '../3d/TiltCard';

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with real-time inventory, AI-powered recommendations, and seamless checkout experience.',
    image: '/aa.PNG',
    tags: ['React', 'Node.js'],
    liveUrl: 'https://samadoyedemi2006-lang.github.io/FoodExpress/#/menu',
    githubUrl: '#',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    title: '3D Portfolio Experience',
    description:
      'An immersive 3D portfolio website featuring interactive animations, particle systems, and custom shaders.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
    tags: ['Three.js', 'React', 'GSAP', 'WebGL'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'AI Dashboard',
    description:
      'Real-time analytics dashboard with machine learning insights, predictive models, and beautiful data visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['TensorFlow', 'React', 'D3.js'],
    liveUrl: '#',
    githubUrl: '#',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Expense Tracker App',
    description:
      'A modern social platform with real-time messaging, content sharing, and community features.',
    image: '/IK.PNG',
    tags: ['React', 'Tailwind CSS'],
    liveUrl: 'https://samadoyedemi2006-lang.github.io/Expense-Tracker/#/form',
    githubUrl: '#',
    color: 'from-green-500/20 to-emerald-500/20',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />

      <div className="container relative mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Featured Work
          </span>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Projects That
            <span className="gradient-text"> Define Me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A selection of my best work showcasing creativity, technical expertise, and attention to detail
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-xl">
                  {/* Image */}
                  <div className="group relative h-48 overflow-hidden md:h-56">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10 opacity-60`}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-glow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
