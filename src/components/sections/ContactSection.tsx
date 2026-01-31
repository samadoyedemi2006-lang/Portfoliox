import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email is too long'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(200, 'Subject is too long'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      const fieldSchema = contactSchema.shape[name];
      fieldSchema.parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validate all fields
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormErrors;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call (will be replaced with actual backend)
    try {
      // For now, simulate success after delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: 'Something went wrong',
        description: 'Please try again or email me directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (error?: string) =>
    `w-full rounded-lg border bg-muted/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
    ${error ? 'border-destructive focus:ring-destructive/50' : 'border-border hover:border-primary/50'}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container relative mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-primary">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Let's Work
            <span className="gradient-text"> Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-6 lg:col-span-2"
          >
            <motion.div variants={itemVariants} className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <a
                    href="mailto:hello@johndoe.com"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    oyedemisamad@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">Osun State</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-accent/10 p-3 text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    09156320616
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemVariants} className="glass-card p-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">
                  Currently available for freelance work
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="space-y-6">
                {/* Name & Email row */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={inputClasses(errors.fullName)}
                      disabled={isSubmitting}
                    />
                    {errors.fullName && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle size={14} />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={inputClasses(errors.email)}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-destructive">
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                    className={inputClasses(errors.subject)}
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle size={14} />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={inputClasses(errors.message)}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-lg bg-primary px-6 py-4 font-medium text-primary-foreground transition-all hover:shadow-glow-md disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-secondary to-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
