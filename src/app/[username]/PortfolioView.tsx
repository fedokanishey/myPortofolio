"use client";

import * as React from "react";
import Image from "next/image";
import { motion, Variants, TargetAndTransition, AnimatePresence } from "framer-motion";
import { Download, User, Briefcase, FolderKanban, Award, ChevronUp, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { CertificationCard } from "@/components/molecules/CertificationCard";
import type { IPortfolio, ISocialLinks } from "@/models/Portfolio";

// Helper to convert hex to HSL
function hexToHSL(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "262.1 83.3% 57.8%";
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

const floatAnimation: TargetAndTransition = {
  y: [-8, 8, -8],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

const pulseAnimation: TargetAndTransition = {
  scale: [1, 1.05, 1],
  opacity: [0.6, 0.9, 0.6],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
};

interface PortfolioViewProps {
  portfolio: IPortfolio & { userId: { name: string; image?: string } };
}

export function PortfolioView({ portfolio }: PortfolioViewProps) {
  const user = portfolio.userId;
  const { content, themeConfig } = portfolio;
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("hero");
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Track scroll position for active section and scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setShowScrollTop(scrollY > 400);

      // Check if we're at the bottom of the page
      if (scrollY + windowHeight >= documentHeight - 100) {
        setActiveSection("contact");
        return;
      }

      // Find active section
      const sections = ["hero", "experience", "projects", "certifications", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop - 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (themeConfig) {
      const root = document.documentElement;
      if (themeConfig.primaryColor) {
        root.style.setProperty("--primary", hexToHSL(themeConfig.primaryColor));
      }
      if (themeConfig.fontFamily) {
        document.body.style.fontFamily = `${themeConfig.fontFamily}, system-ui, sans-serif`;
      }
    }
    return () => {
      document.documentElement.style.removeProperty("--primary");
      document.body.style.fontFamily = "";
    };
  }, [themeConfig]);

  const socialLinksArray = Object.entries(content.socialLinks || {})
    .filter(([, url]) => url)
    .map(([platform, url]) => ({
      platform: platform as keyof ISocialLinks,
      url: url as string,
    }));

  const primaryColor = themeConfig?.primaryColor || "#8B5CF6";
  const secondaryColor = themeConfig?.secondaryColor || "#EC4899";
  const avatarSrc = content.avatar || user.image;
  
  // Use displayName from content if set, otherwise fallback to Clerk user name
  const displayName = (content as { displayName?: string }).displayName || user.name;

  // Navigation items based on available sections
  const navItems = React.useMemo(() => {
    const items = [
      { id: "hero", icon: User, label: "About" },
    ];
    if (content.experience && content.experience.length > 0) {
      items.push({ id: "experience", icon: Briefcase, label: "Experience" });
    }
    if (content.projects && content.projects.length > 0) {
      items.push({ id: "projects", icon: FolderKanban, label: "Projects" });
    }
    if (content.certifications && content.certifications.length > 0) {
      items.push({ id: "certifications", icon: Award, label: "Certifications" });
    }
    // Always show contact
    items.push({ id: "contact", icon: Mail, label: "Contact" });
    return items;
  }, [content.experience, content.projects, content.certifications]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${i % 2 === 0 ? primaryColor : secondaryColor}15, transparent)`,
              width: `${350 + i * 120}px`,
              height: `${350 + i * 120}px`,
              left: `${15 + i * 25}%`,
              top: `${5 + i * 15}%`,
            }}
            animate={{
              x: [0, 40, 0, -40, 0],
              y: [0, -30, 40, -20, 0],
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Fixed Navigation Bar - Centered with Theme Toggle */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div 
          className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-full backdrop-blur-md border border-border/50 shadow-lg"
          style={{ background: "rgba(var(--background), 0.8)" }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative p-2 sm:p-3 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full"
                    style={{ background: primaryColor }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon 
                  className={`h-4 w-4 sm:h-5 sm:w-5 relative z-10 transition-colors ${
                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                />
              </motion.button>
            );
          })}
          
          {/* Divider */}
          <div className="w-px h-5 sm:h-6 bg-border/50 mx-0.5 sm:mx-1" />
          
          {/* Theme Toggle */}
          <ThemeToggle variant="icon" />
        </div>
      </motion.nav>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg border border-border/50 backdrop-blur-md transition-colors hover:bg-muted"
            style={{ background: `${primaryColor}20` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="h-6 w-6" style={{ color: primaryColor }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-20 md:pt-40 md:pb-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24 max-w-7xl mx-auto"
          >
            {/* Left Column: Text Content */}
            <div className="flex-1 text-center md:text-left z-10 w-full">
              {/* Name with Gradient */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-7xl font-bold mb-6 tracking-tight"
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  {displayName}
                </span>
              </motion.h1>

              {/* Headline */}
              {content.headline && (
                <motion.p
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-medium mb-8"
                  style={{ color: primaryColor }}
                >
                  {content.headline}
                </motion.p>
              )}

              {/* Bio */}
              {content.bio && (
                <motion.div
                  variants={itemVariants}
                  className="text-muted-foreground mb-10 leading-relaxed text-lg md:text-xl max-w-2xl mx-auto md:mx-0"
                >
                  <ExpandableText 
                    text={content.bio}
                    maxLength={300}
                  />
                </motion.div>
              )}

              {/* Social Links */}
              {socialLinksArray.length > 0 && (
                <motion.div variants={itemVariants} className="mb-8">
                  <SocialLinks links={socialLinksArray} iconSize="lg" className="justify-center md:justify-start" />
                </motion.div>
              )}

              {/* Resume Download */}
              {content.resume && (
                <motion.div variants={itemVariants} className="mb-12">
                  <motion.a
                    href={`/api/download-resume?url=${encodeURIComponent(content.resume)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="h-5 w-5" />
                    Download Resume
                  </motion.a>
                </motion.div>
              )}

              {/* Skills with Stagger */}
              {content.skills && content.skills.length > 0 && (
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-3">
                  {content.skills.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.08, type: "spring", stiffness: 150 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="px-5 py-2.5 rounded-full text-sm font-medium text-white cursor-default shadow-lg backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        boxShadow: `0 4px 20px ${primaryColor}40`,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right Column: Floating Avatar */}
            <motion.div variants={itemVariants} className="flex-none z-10">
              <motion.div animate={floatAnimation} className="relative">
                {/* Outer glow */}
                <motion.div
                  animate={pulseAnimation}
                  className="absolute -inset-8 rounded-full blur-3xl"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}40)` }}
                />
                
                {/* Rotating gradient ring */}
                <motion.div
                  className="absolute -inset-2 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Avatar container - INCREASED SIZE */}
                <div className="relative w-64 h-64 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-background shadow-2xl">
                  {avatarSrc ? (
                    <>
                      <Image
                        src={avatarSrc}
                        alt={user.name}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          imageLoaded ? "scale-100 blur-0 opacity-100" : "scale-110 blur-md opacity-0"
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        priority
                      />
                      {!imageLoaded && (
                        <div 
                          className="absolute inset-0 animate-pulse"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}30, ${secondaryColor}30)` }}
                        />
                      )}
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-7xl md:text-9xl font-bold text-white content-center"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                    >
                      <span>{displayName.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      {content.experience && content.experience.length > 0 && (
        <motion.section
          id="experience"
          className="py-20 bg-muted/30"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span style={{ color: primaryColor }}>Experience</span>
            </motion.h2>
            <div className="space-y-0">
              {content.experience.map((exp, index) => (
                <motion.div
                  key={exp._id || index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, type: "spring", stiffness: 80 }}
                >
                  <ExperienceItem
                    title={exp.title}
                    company={exp.company}
                    location={exp.location}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    current={exp.current}
                    description={exp.description}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Projects Section */}
      {content.projects && content.projects.length > 0 && (
        <motion.section
          id="projects"
          className="py-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span style={{ color: primaryColor }}>Projects</span>
            </motion.h2>
            <ProjectsGrid projects={content.projects} />
          </div>
        </motion.section>
      )}

      {/* Certifications Section */}
      {content.certifications && content.certifications.length > 0 && (
        <motion.section
          id="certifications"
          className="py-20 bg-muted/30"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span style={{ color: primaryColor }}>Certifications</span>
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {content.certifications.map((cert, index) => (
                <motion.div
                  key={cert._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CertificationCard
                    title={cert.title}
                    image={cert.image}
                    description={cert.description}
                    technologies={cert.technologies || []}
                    date={cert.date}
                    primaryColor={primaryColor}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span style={{ color: primaryColor }}>Contact Me</span>
          </motion.h2>
          
          <div className="max-w-lg mx-auto text-center space-y-8">
            {/* Email */}
            {content.socialLinks?.email && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <p className="text-muted-foreground text-sm">Email me at</p>
                <motion.a
                  href={`mailto:${content.socialLinks.email}`}
                  className="text-xl md:text-2xl font-medium hover:underline"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.02 }}
                >
                  {content.socialLinks.email}
                </motion.a>
              </motion.div>
            )}

            {/* WhatsApp */}
            {content.socialLinks?.whatsapp && content.socialLinks.whatsapp.replace(/[^0-9]/g, "").length > 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <p className="text-muted-foreground text-sm">WhatsApp</p>
                <motion.a
                  href={`https://wa.me/${content.socialLinks.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium hover:underline"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.02 }}
                >
                  {content.socialLinks.whatsapp}
                </motion.a>
              </motion.div>
            )}

            {/* Social Links */}
            {socialLinksArray.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="pt-6 border-t border-border/50"
              >
                <p className="text-muted-foreground text-sm mb-4">Find me on</p>
                <SocialLinks links={socialLinksArray} iconSize="lg" className="justify-center" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-10 border-t border-border/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <motion.a
              href="/"
              className="font-medium"
              style={{ color: primaryColor }}
              whileHover={{ scale: 1.05 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              PortfolioBuilder
            </motion.a>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
