"use client";

import * as React from "react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Download, Briefcase, FolderKanban, Award, Mail, FileText, ArrowUpRight } from "lucide-react";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { ExperienceItem } from "@/components/molecules/ExperienceItem";
import { ProjectsGrid } from "@/components/organisms/ProjectsGrid";
import { CertificationCard } from "@/components/molecules/CertificationCard";
import { AnimatedSkillsCloud } from "@/components/molecules/AnimatedSkillsCloud";
import {
  PersistentBackgroundSystem,
  HeroMeshAura,
  SkillsConstellationDeco,
  ProjectsBlueprintDeco,
  ContactFlowingRibbons,
} from "@/components/backgrounds";
import type { TemplateProps } from "./types";

export function ModernTemplate({
  portfolio,
  displayName,
  primaryColor,
  secondaryColor,
  avatarSrc,
  filteredExperience,
  filteredProjects,
  filteredCertifications,
  filteredSkills,
  socialLinksArray,
  sectionVisibility,
  showContactSection,
  hasVisibleEmail,
  hasVisibleWhatsApp,
}: TemplateProps) {
  const { content } = portfolio;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredExpIndex, setHoveredExpIndex] = React.useState<number | null>(null);

  // GSAP Entrance & Micro-animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate Status Pill
      tl.from(".modern-status-pill", {
        opacity: 0,
        y: -15,
        duration: 0.6,
        scale: 0.9,
      });

      // Animate Title & Headline
      tl.from(
        ".modern-hero-title",
        {
          opacity: 0,
          y: 25,
          duration: 0.8,
        },
        "-=0.3"
      );

      tl.from(
        ".modern-hero-headline",
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
        },
        "-=0.5"
      );

      tl.from(
        ".modern-hero-bio",
        {
          opacity: 0,
          y: 15,
          duration: 0.6,
        },
        "-=0.4"
      );

      // Hero Avatar Floating GSAP Pulse
      tl.from(
        ".modern-hero-avatar-wrapper",
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.9,
          ease: "back.out(1.5)",
        },
        "-=0.6"
      );

      // Continuous subtle breathing animation on avatar aura
      gsap.to(".modern-avatar-glow", {
        scale: 1.1,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Stagger in Action Buttons
      tl.from(
        ".modern-cta-btn",
        {
          opacity: 0,
          y: 15,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 5-Layer Persistent Living Background System */}
      <PersistentBackgroundSystem
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 overflow-hidden scroll-mt-28">
        <HeroMeshAura primaryColor={primaryColor} secondaryColor={secondaryColor} />

        <div className="container mx-auto px-4 w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14 max-w-7xl mx-auto w-full">
            {/* Left Column: Text Content */}
            <div className="flex-1 min-w-0 w-full text-center lg:text-left z-10 space-y-5">
              {/* Status Pill */}
              <div className="modern-status-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground dark:text-zinc-300">
                  Available for new opportunities
                </span>
              </div>

              {/* Name with Gradient */}
              <div className="space-y-2">
                <h1 className="modern-hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight font-display text-foreground dark:text-white">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, hsl(var(--foreground)) 20%, ${primaryColor} 70%, ${secondaryColor} 100%)`,
                    }}
                  >
                    {displayName}
                  </span>
                </h1>

                {/* Headline */}
                {content.headline && (
                  <p
                    className="modern-hero-headline text-lg sm:text-xl lg:text-2xl font-medium tracking-tight"
                    style={{ color: primaryColor }}
                  >
                    {content.headline}
                  </p>
                )}
              </div>

              {/* Bio */}
              {content.bio && (
                <div className="modern-hero-bio text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                  <ExpandableText text={content.bio} maxLength={220} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
                {content.resume && (
                  <a
                    href={content.resume}
                    download
                    className="modern-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                )}

                {showContactSection && (
                  <button
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="modern-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.04] backdrop-blur-md text-foreground hover:bg-muted/80 transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                    Contact Me
                  </button>
                )}
              </div>

              {/* Social Links under CTA */}
              {sectionVisibility.showSocialLinks && socialLinksArray.length > 0 && (
                <div className="pt-2 flex justify-center lg:justify-start">
                  <SocialLinks links={socialLinksArray} />
                </div>
              )}
            </div>

            {/* Right Column: Avatar */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end z-10 flex-shrink-0">
              <div className="modern-hero-avatar-wrapper relative group">
                {/* Glow ring behind avatar */}
                <div
                  className="modern-avatar-glow absolute -inset-3 rounded-3xl blur-xl opacity-60 pointer-events-none transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                />

                <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-2 border-white/20 dark:border-white/10 shadow-2xl bg-card">
                  {avatarSrc ? (
                    <Image
                      src={avatarSrc}
                      alt={displayName}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 176px, (max-width: 1024px) 224px, 256px"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    >
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {sectionVisibility.showSkills && filteredSkills.length > 0 && (
        <section id="skills" className="relative py-14 overflow-hidden scroll-mt-28">
          <SkillsConstellationDeco primaryColor={primaryColor} secondaryColor={secondaryColor} />
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
                Technical Expertise
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Technologies & tools I work with</p>
            </div>
            <AnimatedSkillsCloud
              skills={filteredSkills}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        </section>
      )}

      {/* Experience Section */}
      {sectionVisibility.showExperience && filteredExperience.length > 0 && (
        <section id="experience" className="relative py-16 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="p-2.5 rounded-xl border border-border/80 dark:border-white/10 shadow-sm"
                style={{ background: `${primaryColor}15` }}
              >
                <Briefcase className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
                  Work Experience
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">My career journey and achievements</p>
              </div>
            </div>

            <div className="relative border-l-2 border-border/70 dark:border-white/10 pl-6 sm:pl-8 ml-3 space-y-8">
              {filteredExperience.map((exp, index) => (
                <div
                  key={exp._id || index}
                  onMouseEnter={() => setHoveredExpIndex(index)}
                  onMouseLeave={() => setHoveredExpIndex(null)}
                  className="relative transition-transform duration-300 hover:translate-x-1"
                >
                  {/* Timeline Node */}
                  <div
                    className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-background shadow-md transition-all duration-300"
                    style={{
                      backgroundColor: hoveredExpIndex === index ? primaryColor : secondaryColor,
                      boxShadow: hoveredExpIndex === index ? `0 0 12px ${primaryColor}` : undefined,
                    }}
                  />
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
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {sectionVisibility.showProjects && filteredProjects.length > 0 && (
        <section id="projects" className="relative py-16 scroll-mt-28">
          <ProjectsBlueprintDeco primaryColor={primaryColor} secondaryColor={secondaryColor} />
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="p-2.5 rounded-xl border border-border/80 dark:border-white/10 shadow-sm"
                style={{ background: `${primaryColor}15` }}
              >
                <FolderKanban className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
                  Featured Projects
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Showcase of my best work & experiments</p>
              </div>
            </div>

            <ProjectsGrid
              projects={filteredProjects}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {sectionVisibility.showCertifications && filteredCertifications.length > 0 && (
        <section id="certifications" className="relative py-16 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-3 mb-10">
              <div
                className="p-2.5 rounded-xl border border-border/80 dark:border-white/10 shadow-sm"
                style={{ background: `${primaryColor}15` }}
              >
                <Award className="h-5 w-5" style={{ color: primaryColor }} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
                  Certifications & Credentials
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Verified milestones & qualifications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertifications.map((cert, index) => (
                <CertificationCard
                  key={cert._id || index}
                  title={cert.title}
                  image={cert.image}
                  description={cert.description}
                  technologies={cert.technologies}
                  date={cert.date}
                  primaryColor={primaryColor}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {showContactSection && (
        <section id="contact" className="relative py-20 overflow-hidden scroll-mt-28">
          <ContactFlowingRibbons primaryColor={primaryColor} secondaryColor={secondaryColor} />
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-card/40 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
              <div className="inline-flex p-3.5 rounded-2xl bg-primary/10 border border-primary/20">
                <Mail className="h-7 w-7" style={{ color: primaryColor }} />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
                  Let&apos;s Build Something Amazing
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
                  Have an exciting project, opportunity, or just want to connect? Reach out!
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                {hasVisibleEmail && (
                  <a
                    href={`mailto:${content.socialLinks?.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </a>
                )}

                {hasVisibleWhatsApp && (
                  <a
                    href={`https://wa.me/${content.socialLinks?.whatsapp?.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-transform hover:scale-105"
                  >
                    WhatsApp Chat
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}

                {content.resume && (
                  <a
                    href={content.resume}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border/80 bg-background/80 hover:bg-muted text-foreground shadow-sm transition-transform hover:scale-105"
                  >
                    <FileText className="h-4 w-4" />
                    Resume PDF
                  </a>
                )}
              </div>

              {/* All Social Icons */}
              {socialLinksArray.length > 0 && (
                <div className="pt-6 border-t border-border/60 flex justify-center">
                  <SocialLinks links={socialLinksArray} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
