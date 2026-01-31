import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/samadoyedemi2006-lang', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/abdulsamad-oyedemi-01761a393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/programmer_19', label: 'Twitter' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent" />

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#hero"
              className="gradient-text mb-2 inline-block font-display text-xl font-bold"
            >
              Portfolio
            </a>
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground md:justify-start">
              © {currentYear} Made with{' '}
              <Heart size={14} className="fill-accent text-accent" /> by Abdul Samad
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(`#${item.toLowerCase()}`)
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
