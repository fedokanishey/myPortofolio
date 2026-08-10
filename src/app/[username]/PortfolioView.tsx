"use client";

import * as React from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Download, User, Briefcase, FolderKanban, Award, ChevronUp, Mail, FileText, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { CertificationCard } from "@/components/molecules/CertificationCard";
import { AnimatedSkillsCloud } from "@/components/molecules/AnimatedSkillsCloud";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import {
  PersistentBackgroundSystem,
  HeroMeshAura,
  SkillsConstellationDeco,
  ProjectsBlueprintDeco,
  ContactFlowingRibbons,
} from "@/components/backgrounds";
import type { IPortfolio, ISocialLinks, ISectionVisibility, IHiddenItems } from "@/models/Portfolio";

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

// Clean, modern section entrances — single observer per section
const sectionEntrance: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Section with staggered children — single observer controls all cards
const staggeredSection: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Static card variant — used by all cards (no per-render object creation)
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Simple CSS-only divider (no IntersectionObserver)
function SectionDivider({ color }: { color: string }) {
  return (
    <div className="relative py-4 flex items-center justify-center overflow-hidden">
      <div
        className="h-px rounded-full w-[60%]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
      />
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 12px ${color}80` }}
      />
    </div>
  );
}

// Clean heading entrance
const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface PortfolioViewProps {
  portfolio: IPortfolio & { userId: { name: string; image?: string } };
}

export function PortfolioView({ portfolio }: PortfolioViewProps) {
  const user = portfolio.userId;
  const { content, themeConfig } = portfolio;
  const sectionVisibility: ISectionVisibility = portfolio.sectionVisibility || {
    showExperience: true,
    showProjects: true,
    showCertifications: true,
    showSkills: true,
    showSocialLinks: true,
  };
  const hiddenItems: IHiddenItems = portfolio.hiddenItems || {
    experience: [],
    projects: [],
    certifications: [],
    skills: [],
    socialLinks: [],
  };

  // Use displayName from content if set, otherwise fallback to Clerk user name
  const displayName = (content as { displayName?: string }).displayName || user.name;
  const [activeSection, setActiveSection] = React.useState("hero");
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [hoveredExpIndex, setHoveredExpIndex] = React.useState<number | null>(null);

  // Typewriter motion effect
  const [mounted, setMounted] = React.useState(false);
  const [nameCount, setNameCount] = React.useState(0);
  const [headlineCount, setHeadlineCount] = React.useState(0);

  const headlineText = content.headline || "";
  const nameLength = displayName?.length || 0;
  const nameFinished = !mounted || nameCount >= nameLength;
  const headlineFinished = !mounted || headlineCount >= headlineText.length;

  React.useEffect(() => {
    setMounted(true);
    setNameCount(0);
    setHeadlineCount(0);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    if (nameCount < nameLength) {
      const t = setTimeout(() => setNameCount((c) => c + 1), 50);
      return () => clearTimeout(t);
    }
  }, [mounted, nameCount, nameLength]);

  React.useEffect(() => {
    if (!mounted || !nameFinished) return;
    if (headlineCount < headlineText.length) {
      const t = setTimeout(() => setHeadlineCount((c) => c + 1), 35);
      return () => clearTimeout(t);
    }
  }, [mounted, nameFinished, headlineCount, headlineText]);

  const visibleName = mounted ? displayName.slice(0, nameCount) : displayName;
  const visibleHeadline = mounted ? headlineText.slice(0, headlineCount) : headlineText;

  // Track active section and scroll to top without forced reflows
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Zero-reflow section tracking with IntersectionObserver
    const sections = ["hero", "experience", "projects", "certifications", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
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

  // Filter hidden items
  const filteredExperience = (content.experience || []).filter(
    (item, idx) => !hiddenItems.experience.includes(item._id || idx.toString())
  );
  const filteredProjects = (content.projects || []).filter(
    (item, idx) => !hiddenItems.projects.includes(item._id || idx.toString())
  );
  const filteredCertifications = (content.certifications || []).filter(
    (item, idx) => !hiddenItems.certifications.includes(item._id || idx.toString())
  );
  const filteredSkills = (content.skills || []).filter(
    (skill) => !hiddenItems.skills.includes(skill)
  );
  const socialLinksArray = Object.entries(content.socialLinks || {})
    .filter(([platform, url]) => url && !hiddenItems.socialLinks.includes(platform))
    .map(([platform, url]) => ({
      platform: platform as keyof ISocialLinks,
      url: url as string,
    }));

  const primaryColor = themeConfig?.primaryColor || "#8B5CF6";
  const secondaryColor = themeConfig?.secondaryColor || "#EC4899";
  const avatarSrc = content.avatar || user.image;
  

  const hasVisibleEmail = !!(content.socialLinks?.email && !hiddenItems.socialLinks.includes("email"));
  const hasVisibleWhatsApp = !!(content.socialLinks?.whatsapp && !hiddenItems.socialLinks.includes("whatsapp") && content.socialLinks.whatsapp.replace(/[^0-9]/g, "").length > 3);
  const hasVisibleOtherSocials = socialLinksArray.filter(l => l.platform !== "email" && l.platform !== "whatsapp").length > 0;
  
  const showContactSection = sectionVisibility.showSocialLinks && (hasVisibleEmail || hasVisibleWhatsApp || hasVisibleOtherSocials);

  // Navigation items based on available sections (filtering hidden ones)
  const navItems = React.useMemo(() => {
    const items = [
      { id: "hero", icon: User, label: "About" },
    ];
    if (sectionVisibility.showExperience && filteredExperience.length > 0) {
      items.push({ id: "experience", icon: Briefcase, label: "Experience" });
    }
    if (sectionVisibility.showProjects && filteredProjects.length > 0) {
      items.push({ id: "projects", icon: FolderKanban, label: "Projects" });
    }
    if (sectionVisibility.showCertifications && filteredCertifications.length > 0) {
      items.push({ id: "certifications", icon: Award, label: "Certifications" });
    }
    if (showContactSection) {
      items.push({ id: "contact", icon: Mail, label: "Contact" });
    }
    return items;
  }, [sectionVisibility, filteredExperience, filteredProjects, filteredCertifications]);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* 5-Layer Persistent Living Background System */}
      <PersistentBackgroundSystem
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {/* Fixed Navigation Bar - Centered with Theme Toggle */}
      <motion.nav
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div 
          className="flex items-center gap-0.5 sm:gap-1 px-2 py-1.5 sm:py-2 rounded-full backdrop-blur-xl border border-border/80 dark:border-white/10 shadow-lg bg-card/95 dark:bg-[#0b0f17]/95 text-foreground"
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
          <div className="w-px h-5 sm:h-6 bg-border/80 mx-1" />
          
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

      {/* Semantic Main Content Landmark for Accessibility & Performance */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative pt-28 sm:pt-32 lg:pt-24 pb-10 overflow-hidden">
        {/* Living Ambient Mesh Ring Decoration */}
        <HeroMeshAura primaryColor={primaryColor} secondaryColor={secondaryColor} />
        
        <div className="container mx-auto px-4 w-full">
          <div
            className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 max-w-7xl mx-auto w-full pt-2"
          >
            {/* Left Column: Text Content */}
            <div className="flex-1 min-w-0 w-full text-center lg:text-left z-10 space-y-4">
              {/* Status Pill */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 dark:border-white/[0.1] bg-card/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground dark:text-zinc-300">
                  Available for new opportunities
                </span>
              </div>

              {/* Name with Dynamic High-Contrast Gradient & Typewriter Motion */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight font-display text-foreground dark:text-white relative">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(var(--foreground)) 20%, ${primaryColor} 70%, ${secondaryColor} 100%)`,
                    }}
                  >
                    {visibleName}
                  </span>
                  {mounted && !nameFinished && (
                    <motion.span
                      className="inline-block w-[4px] h-[0.85em] align-middle ml-1 rounded-sm"
                      style={{ background: primaryColor }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                  )}
                </h1>

                {/* Headline / Role with Frosted Glass Badge */}
                {content.headline && (
                  <div className="pt-1">
                    <span
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm sm:text-base md:text-lg font-semibold border border-border/80 dark:border-white/[0.12] bg-card/90 dark:bg-[#0d121c]/80 backdrop-blur-md shadow-sm"
                      style={{ color: primaryColor }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: primaryColor }} />
                      <span>{visibleHeadline}</span>
                      {mounted && nameFinished && !headlineFinished && (
                        <motion.span
                          className="inline-block w-[2px] h-[0.8em] align-middle ml-0.5 rounded-sm"
                          style={{ background: primaryColor }}
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {content.bio && (
                <div
                  className="text-muted-foreground dark:text-zinc-400 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 pt-0.5"
                >
                  <ExpandableText 
                    text={content.bio}
                    maxLength={260}
                  />
                </div>
              )}

              {/* Social Links & Action Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                {/* Premium Resume Download with Magnetic Button */}
                {content.resume && (
                  <MagneticButton strength={25}>
                    <motion.a
                      href={`/api/download-resume?url=${encodeURIComponent(content.resume)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.45)] border border-white/20"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {/* Ambient hover glow */}
                      <div 
                        className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"
                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                      />
                      
                      {/* Inner ambient top highlight */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

                      {/* Icon badge */}
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/30">
                        <FileText className="h-3.5 w-3.5 text-white" />
                      </span>

                      <span className="tracking-wide font-medium">Download Resume</span>

                      {/* Action indicator */}
                      <ArrowUpRight className="h-4 w-4 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </motion.a>
                  </MagneticButton>
                )}

                {/* Social Links */}
                {sectionVisibility.showSocialLinks && socialLinksArray.length > 0 && (
                  <div className="flex items-center">
                    <SocialLinks links={socialLinksArray} iconSize="lg" className="justify-center lg:justify-start" />
                  </div>
                )}
              </div>

              {/* Animated Floating Skills Cloud */}
              {sectionVisibility.showSkills && filteredSkills.length > 0 && (
                <div className="pt-3 w-full max-w-full overflow-hidden">
                  <AnimatedSkillsCloud
                    skills={filteredSkills}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Floating Avatar - Elevated & Enlarged */}
            <div className="flex-none z-10 mt-6 sm:mt-8 lg:mt-0 lg:self-start lg:pt-1">
              <div className="relative">
                {/* Static outer glow */}
                <div
                  className="absolute -inset-10 rounded-full"
                  style={{ background: `radial-gradient(circle at center, ${primaryColor}25 0%, transparent 65%)` }}
                />
                
                {/* Static gradient ring */}
                <div
                  className="absolute -inset-2 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                />
                
                {/* Avatar container */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] rounded-full overflow-hidden border-4 sm:border-8 border-background shadow-2xl bg-card">
                  {avatarSrc ? (
                    <Image
                      src={avatarSrc}
                      alt={user.name || displayName}
                      fill
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 420px"
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-7xl md:text-9xl font-bold text-white content-center"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                    >
                      <span>{displayName.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider: Hero → Experience */}
      {sectionVisibility.showExperience && filteredExperience.length > 0 && (
        <SectionDivider color={primaryColor} />
      )}

      {/* Experience Section */}
      {sectionVisibility.showExperience && filteredExperience.length > 0 && (
        <motion.section
          id="experience"
          className="py-20 relative z-10 content-auto"
          variants={staggeredSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              variants={cardVariant}
            >
              <span style={{ color: primaryColor }}>Experience</span>
            </motion.h2>
            <div className="space-y-2">
              {filteredExperience.map((exp, index) => (
                <motion.div
                  key={exp._id || index}
                  variants={cardVariant}
                >
                  <ExperienceItem
                    title={exp.title}
                    company={exp.company}
                    location={exp.location}
                    startDate={exp.startDate}
                    endDate={exp.endDate}
                    current={exp.current}
                    description={exp.description}
                    primaryColor={primaryColor}
                    isHovered={hoveredExpIndex === index}
                    isAnyHovered={hoveredExpIndex !== null}
                    onHoverStart={() => setHoveredExpIndex(index)}
                    onHoverEnd={() => setHoveredExpIndex(null)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Divider: Experience → Projects */}
      {sectionVisibility.showProjects && filteredProjects.length > 0 && (
        <SectionDivider color={secondaryColor} />
      )}

      {/* Projects Section */}
      {sectionVisibility.showProjects && filteredProjects.length > 0 && (
        <motion.section
          id="projects"
          className="py-20 relative z-10 overflow-hidden content-auto"
          variants={sectionEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Blueprint Engineering Background Decor */}
          <ProjectsBlueprintDeco primaryColor={primaryColor} />

          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span style={{ color: primaryColor }}>Projects</span>
            </h2>
            <ProjectsGrid
              projects={filteredProjects}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        </motion.section>
      )}

      {/* Divider: Projects → Certifications */}
      {sectionVisibility.showCertifications && filteredCertifications.length > 0 && (
        <SectionDivider color={primaryColor} />
      )}

      {/* Certifications Section */}
      {sectionVisibility.showCertifications && filteredCertifications.length > 0 && (
        <motion.section
          id="certifications"
          className="py-20 relative z-10 overflow-hidden content-auto"
          variants={staggeredSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              variants={cardVariant}
            >
              <span style={{ color: primaryColor }}>Certifications</span>
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {filteredCertifications.map((cert, index) => (
                <motion.div
                  key={cert._id || index}
                  variants={cardVariant}
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

      {/* Divider: Certifications → Contact */}
      {showContactSection && (
        <SectionDivider color={secondaryColor} />
      )}

      {/* Contact Section */}
      {showContactSection && (
        <motion.section
          id="contact"
          className="py-20 relative overflow-hidden content-auto"
          variants={sectionEntrance}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Living Flowing Ribbon Curves in Background */}
          <ContactFlowingRibbons primaryColor={primaryColor} secondaryColor={secondaryColor} />

          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span style={{ color: primaryColor }}>Contact Me</span>
            </motion.h2>
            
            <div className="max-w-lg mx-auto text-center space-y-8">
              {/* Email */}
              {hasVisibleEmail && (
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
            {content.socialLinks?.whatsapp && !hiddenItems.socialLinks.includes("whatsapp") && content.socialLinks.whatsapp.replace(/[^0-9]/g, "").length > 3 && (
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

              {sectionVisibility.showSocialLinks && socialLinksArray.filter(l => l.platform !== "email" && l.platform !== "whatsapp").length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="pt-6 border-t border-border/50"
                >
                  <p className="text-muted-foreground text-sm mb-4">Find me on</p>
                  <SocialLinks links={socialLinksArray.filter(l => l.platform !== "email" && l.platform !== "whatsapp")} iconSize="lg" className="justify-center" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      )}
      </main>

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
