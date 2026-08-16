"use client";

import * as React from "react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Sparkles,
  Layers,
  Code,
  Briefcase,
  Award,
  Github,
  Mail,
  Download,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";
import { AnimatedSkillsCloud } from "@/components/molecules/AnimatedSkillsCloud";
import { ProjectPreviewFrame } from "@/components/molecules/ProjectPreviewFrame";
import { CertificationCard } from "@/components/molecules/CertificationCard";
import type { TemplateProps } from "./types";

export function BentoTemplate({
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

  // GSAP Elastic Bento Grid Stagger
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".bento-card", {
        opacity: 0,
        y: 30,
        scale: 0.96,
        stagger: 0.06,
        duration: 0.6,
        clearProps: "all",
      });

      // Subtle hover float animation
      gsap.to(".bento-badge-pulse", {
        scale: 1.05,
        opacity: 0.9,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-background text-foreground dark:bg-[#090d16] dark:text-zinc-100 selection:bg-primary/30 pb-24 overflow-hidden"
    >
      {/* Dynamic Ambient Blur Orbs */}
      <div
        className="fixed -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20 dark:opacity-30"
        style={{ background: primaryColor }}
      />
      <div
        className="fixed top-1/2 -right-40 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15 dark:opacity-25"
        style={{ background: secondaryColor }}
      />

      <div className="container mx-auto px-4 max-w-7xl pt-24 sm:pt-32 space-y-14">
        {/* Section 1: Hero Profile Bento Grid */}
        <section id="hero" className="scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Bento Cell 1: Main Hero Profile (Span 2 cols on lg) */}
            <div className="bento-card md:col-span-2 lg:col-span-2 rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-foreground/30 dark:hover:border-white/20 transition-all duration-500 shadow-xl">
              <div
                className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: primaryColor }}
              />

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border dark:border-white/15 bg-muted/60 dark:bg-white/5 text-xs font-medium">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: primaryColor }} />
                  <span>Creative Engineering Studio</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground dark:text-white leading-tight">
                  {displayName}
                </h1>

                {content.headline && (
                  <p
                    className="text-base sm:text-xl font-semibold"
                    style={{
                      color: primaryColor,
                    }}
                  >
                    {content.headline}
                  </p>
                )}

                {content.bio && (
                  <div className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 font-sans leading-relaxed">
                    <ExpandableText text={content.bio} maxLength={220} />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-6 relative z-10">
                {content.resume && (
                  <a
                    href={content.resume}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm text-white shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Resume
                  </a>
                )}

                {showContactSection && (
                  <button
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm border border-border dark:border-white/15 bg-muted/60 dark:bg-white/5 hover:bg-muted dark:hover:bg-white/10 transition-transform hover:scale-105 text-foreground dark:text-white"
                  >
                    <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                    Contact
                  </button>
                )}
              </div>
            </div>

            {/* Bento Cell 2: Avatar & Quick Status (Span 1 col) */}
            <div className="bento-card md:col-span-1 lg:col-span-1 rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-foreground/30 dark:hover:border-white/20 transition-all shadow-xl">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-border dark:border-white/15 shadow-2xl mb-4 group-hover:scale-105 transition-transform duration-500">
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={displayName}
                    fill
                    priority
                    className="object-cover"
                    sizes="144px"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-4xl font-bold text-white"
                    style={{ background: primaryColor }}
                  >
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="bento-badge-pulse inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for Hire
              </div>
            </div>

            {/* Bento Cell 3: Metrics & Highlights (Span 1 col) */}
            <div className="bento-card md:col-span-3 lg:col-span-1 rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl">
              <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-zinc-400 mb-4">
                <span>STATS &amp; HIGHLIGHTS</span>
                <TrendingUp className="h-4 w-4" style={{ color: secondaryColor }} />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="p-3 rounded-2xl bg-muted/40 dark:bg-white/[0.03] border border-border/60 dark:border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-foreground dark:text-white">
                    {filteredProjects.length}+
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-zinc-400">Shipped Projects</div>
                </div>
                <div className="p-3 rounded-2xl bg-muted/40 dark:bg-white/[0.03] border border-border/60 dark:border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-foreground dark:text-white">
                    {filteredSkills.length}+
                  </div>
                  <div className="text-xs text-muted-foreground dark:text-zinc-400">Core Technologies</div>
                </div>
              </div>

              {sectionVisibility.showSocialLinks && socialLinksArray.length > 0 && (
                <div className="pt-4 border-t border-border/60 dark:border-white/5 flex justify-center">
                  <SocialLinks links={socialLinksArray} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Skills Cloud */}
        {sectionVisibility.showSkills && filteredSkills.length > 0 && (
          <section id="skills" className="scroll-mt-28">
            <div className="bento-card rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-zinc-400 mb-4">
                <Code className="h-4 w-4" style={{ color: primaryColor }} />
                <span>Tech Stack &amp; Core Tools ({filteredSkills.length})</span>
              </div>

              <AnimatedSkillsCloud
                skills={filteredSkills}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </div>
          </section>
        )}

        {/* Section 3: Career Experience Timeline */}
        {sectionVisibility.showExperience && filteredExperience.length > 0 && (
          <section id="experience" className="scroll-mt-28">
            <div className="bento-card rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                <Briefcase className="h-4 w-4" style={{ color: secondaryColor }} />
                <span>Career Journey &amp; Experience</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExperience.map((exp, idx) => (
                  <div
                    key={exp._id || idx}
                    className="p-5 rounded-2xl border border-border/60 dark:border-white/5 bg-muted/40 dark:bg-white/[0.02] hover:bg-muted/80 dark:hover:bg-white/[0.05] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-zinc-400 mb-1">
                        <span className="font-bold text-foreground dark:text-white text-sm sm:text-base">{exp.title}</span>
                      </div>
                      <div className="text-xs font-semibold mb-2" style={{ color: primaryColor }}>
                        {exp.company} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-zinc-400 line-clamp-3 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Featured Projects Bento Grid */}
        {sectionVisibility.showProjects && filteredProjects.length > 0 && (
          <section id="projects" className="scroll-mt-28">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <Layers className="h-5 w-5" style={{ color: primaryColor }} />
                <h2 className="text-2xl sm:text-3xl font-black text-foreground dark:text-white">Featured Creations</h2>
              </div>
              <span className="text-xs text-muted-foreground dark:text-zinc-400">{filteredProjects.length} Projects</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="bento-card rounded-3xl border border-border/80 dark:border-white/10 bg-card/80 dark:bg-white/[0.03] backdrop-blur-xl overflow-hidden group hover:border-foreground/30 dark:hover:border-white/20 transition-all duration-500 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Live Iframe or Image Thumbnail */}
                    <ProjectPreviewFrame
                      title={project.title}
                      image={project.image}
                      liveUrl={project.liveUrl}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                    />

                    <div className="p-6 space-y-2">
                      <h3 className="text-lg font-bold text-foreground dark:text-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech badges with SkillIcon */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-muted/60 dark:bg-white/5 text-foreground dark:text-zinc-300 border border-border/60 dark:border-white/10 font-mono"
                          >
                            <SkillIcon name={tech} size={12} color="currentColor" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                        style={{ color: primaryColor }}
                      >
                        Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-white"
                      >
                        <Github className="h-3.5 w-3.5" /> Source
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Certifications Section */}
        {sectionVisibility.showCertifications && filteredCertifications.length > 0 && (
          <section id="certifications" className="scroll-mt-28">
            <div className="flex items-center gap-2.5 mb-8">
              <Award className="h-5 w-5" style={{ color: secondaryColor }} />
              <h2 className="text-2xl sm:text-3xl font-black text-foreground dark:text-white">Certifications &amp; Credentials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertifications.map((cert, idx) => (
                <CertificationCard
                  key={cert._id || idx}
                  title={cert.title}
                  image={cert.image}
                  description={cert.description}
                  technologies={cert.technologies}
                  date={cert.date}
                  primaryColor={primaryColor}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Contact Collaboration Section */}
        {showContactSection && (
          <section id="contact" className="scroll-mt-28 pt-6">
            <div className="bento-card rounded-3xl border border-border/80 dark:border-white/15 bg-gradient-to-b from-card/80 to-card/40 dark:from-white/[0.06] dark:to-white/[0.02] backdrop-blur-2xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black text-foreground dark:text-white tracking-tight">
                Ready to collaborate?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-zinc-400 max-w-lg mx-auto">
                Let&apos;s build something extraordinary together.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                {hasVisibleEmail && (
                  <a
                    href={`mailto:${content.socialLinks?.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white shadow-xl transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    Drop an Email
                  </a>
                )}

                {hasVisibleWhatsApp && (
                  <a
                    href={`https://wa.me/${content.socialLinks?.whatsapp?.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl transition-transform hover:scale-105"
                  >
                    WhatsApp Chat
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
