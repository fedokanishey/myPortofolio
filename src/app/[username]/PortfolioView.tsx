"use client";

import * as React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
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

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

const pulseAnimation = {
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

      {/* Header */}
      <motion.header
        className="fixed top-0 right-0 z-50 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ThemeToggle variant="icon" />
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-40 overflow-hidden">
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
                <motion.p
                  variants={itemVariants}
                  className="text-muted-foreground mb-10 leading-relaxed text-lg md:text-xl max-w-2xl mx-auto md:mx-0"
                >
                  {content.bio}
                </motion.p>
              )}

              {/* Social Links */}
              {socialLinksArray.length > 0 && (
                <motion.div variants={itemVariants} className="mb-12">
                  <SocialLinks links={socialLinksArray} iconSize="lg" className="justify-center md:justify-start" />
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
