"use client";

import * as React from "react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Terminal,
  Cpu,
  Code2,
  GitBranch,
  ExternalLink,
  Github,
  Mail,
  Download,
  ShieldCheck,
  Zap,
  CornerDownRight,
  Folder,
} from "lucide-react";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";
import { AnimatedSkillsCloud } from "@/components/molecules/AnimatedSkillsCloud";
import { ProjectPreviewFrame } from "@/components/molecules/ProjectPreviewFrame";
import { CertificationCard } from "@/components/molecules/CertificationCard";
import type { TemplateProps } from "./types";

export function CyberTemplate({
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

  // GSAP Cyber Console Animations — safe fromTo
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".cyber-terminal-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, clearProps: "all" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-[#07090e] dark:text-[#d1d5db] font-mono selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 overflow-hidden pb-24"
    >
      {/* Cyber Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-15 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${primaryColor}20 1px, transparent 1px),
            linear-gradient(to bottom, ${primaryColor}20 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Cyber Radial Glows */}
      <div
        className="fixed top-1/4 -left-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 dark:opacity-30"
        style={{ background: primaryColor }}
      />
      <div
        className="fixed bottom-1/4 -right-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-15 dark:opacity-25"
        style={{ background: secondaryColor }}
      />

      {/* Top Cyber HUD Bar */}
      <div className="pt-28 sm:pt-32 pb-4 container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-200 dark:border-white/10 pb-3 font-mono text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">[NODE ONLINE]</span>
            <span className="hidden sm:inline text-slate-400 dark:text-zinc-500">|</span>
            <span className="hidden sm:inline">SYS: PROD_v4.2</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">LATENCY: 14ms</span>
            <span className="text-slate-300 dark:text-zinc-600">/</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">ENC: TLS_AES_256</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Hero */}
      <section id="hero" className="relative py-6 sm:py-10 z-10 scroll-mt-28">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="cyber-terminal-card relative rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-[#161b22] border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-slate-600 dark:text-zinc-400 font-mono hidden sm:inline">
                  bash: user@{displayName.toLowerCase().replace(/\s+/g, "_")}: ~
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400">
                <Terminal className="h-3.5 w-3.5" style={{ color: primaryColor }} />
                <span>TERMINAL_SESSION</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-10 relative">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-center">
                {/* Left Terminal Output */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">$</span>
                    <span className="text-cyan-700 dark:text-cyan-300">whoami --verbose</span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-mono">
                      <span
                        className="bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
                        }}
                      >
                        {displayName}
                      </span>
                    </h1>

                    {content.headline && (
                      <div className="flex items-center gap-2 text-sm sm:text-lg font-medium text-emerald-600 dark:text-emerald-400">
                        <CornerDownRight className="h-4 w-4 flex-shrink-0" />
                        <span>{content.headline}</span>
                      </div>
                    )}
                  </div>

                  {content.bio && (
                    <div className="border-l-2 border-primary/40 pl-4 py-1 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-sans leading-relaxed">
                      <ExpandableText text={content.bio} maxLength={220} />
                    </div>
                  )}

                  {/* Actions & Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    {content.resume && (
                      <a
                        href={content.resume}
                        download
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase font-bold text-white shadow-lg transition-all hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        }}
                      >
                        <Download className="h-4 w-4" />
                        GET_RESUME.sh
                      </a>
                    )}

                    {showContactSection && (
                      <button
                        onClick={() => {
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs uppercase font-bold border border-cyan-500/50 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 transition-all hover:scale-105"
                      >
                        <Mail className="h-4 w-4" />
                        INIT_CONTACT
                      </button>
                    )}
                  </div>

                  {/* Social links */}
                  {sectionVisibility.showSocialLinks && socialLinksArray.length > 0 && (
                    <div className="pt-2">
                      <SocialLinks links={socialLinksArray} />
                    </div>
                  )}
                </div>

                {/* Right: Cyber Avatar Frame */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative p-1.5 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-slate-100 dark:bg-black/50 group">
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden bg-slate-200 dark:bg-[#161b22]">
                      {avatarSrc ? (
                        <Image
                          src={avatarSrc}
                          alt={displayName}
                          fill
                          priority
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          sizes="208px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-mono font-bold text-cyan-600 dark:text-cyan-400">
                          &lt;{displayName.slice(0, 2).toUpperCase()}/&gt;
                        </div>
                      )}
                    </div>
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Animated Moving Marquee, Pause-on-Hover, and See All / See Less */}
      {sectionVisibility.showSkills && filteredSkills.length > 0 && (
        <section id="skills" className="py-12 relative z-10 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0d1117]/80 p-6 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-sm text-cyan-700 dark:text-cyan-400 font-mono font-bold">
                <Cpu className="h-4 w-4" />
                <span>// RUNTIME_STACK &amp; MODULES ({filteredSkills.length})</span>
              </div>

              <AnimatedSkillsCloud
                skills={filteredSkills}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            </div>
          </div>
        </section>
      )}

      {/* Experience Log */}
      {sectionVisibility.showExperience && filteredExperience.length > 0 && (
        <section id="experience" className="py-14 border-t border-slate-200 dark:border-white/10 relative z-10 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-2 mb-8 text-sm text-purple-700 dark:text-purple-400 font-mono font-bold">
              <GitBranch className="h-5 w-5" />
              <span>// CAREER_TIMELINE.log</span>
            </div>

            <div className="space-y-4">
              {filteredExperience.map((exp, idx) => (
                <div
                  key={exp._id || idx}
                  className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1117] hover:border-purple-500/50 transition-all font-mono shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-purple-600 dark:text-purple-400">commit #{idx + 1}:</span>
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{exp.title}</span>
                      <span className="text-xs text-slate-600 dark:text-zinc-400">@ {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-zinc-500">
                      {exp.startDate} - {exp.current ? "HEAD (Present)" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Repository */}
      {sectionVisibility.showProjects && filteredProjects.length > 0 && (
        <section id="projects" className="py-14 border-t border-slate-200 dark:border-white/10 relative z-10 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-sm sm:text-base text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                <Code2 className="h-5 w-5" />
                <span>// REPOSITORIES &amp; DEPLOYMENTS</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-zinc-500 font-mono">TOTAL: {filteredProjects.length}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1117] hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-lg"
                >
                  <div>
                    {/* Top Live Iframe or Image Thumbnail */}
                    <ProjectPreviewFrame
                      title={project.title}
                      image={project.image}
                      liveUrl={project.liveUrl}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                    />

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Folder className="h-4 w-4" style={{ color: primaryColor }} />
                          <span className="text-slate-900 dark:text-zinc-200 font-bold">{project.title}</span>
                        </div>
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                            FEATURED
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-zinc-400 font-sans line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies tags with SkillIcon */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 flex items-center gap-1.5"
                          >
                            <SkillIcon name={tech} size={12} color="currentColor" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 flex items-center gap-3 border-t border-slate-100 dark:border-white/5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        LIVE_PREVIEW
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Github className="h-3.5 w-3.5" />
                        SOURCE
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Credentials */}
      {sectionVisibility.showCertifications && filteredCertifications.length > 0 && (
        <section id="certifications" className="py-14 border-t border-slate-200 dark:border-white/10 relative z-10 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-2 mb-8 text-sm text-amber-600 dark:text-amber-400 font-mono font-bold">
              <ShieldCheck className="h-5 w-5" />
              <span>// AUTHENTICATED_CREDENTIALS</span>
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
          </div>
        </section>
      )}

      {/* Contact Terminal Endpoint */}
      {showContactSection && (
        <section id="contact" className="py-16 border-t border-slate-200 dark:border-white/15 relative z-10 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="p-8 sm:p-12 rounded-2xl border border-cyan-500/40 bg-white dark:bg-[#0d1117] relative shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 dark:text-cyan-400 mb-4 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                ENDPOINT: open_socket()
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono uppercase mb-3">
                Establish Direct Connection
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-sans max-w-md mx-auto mb-6">
                Ping my network for job opportunities, contracts, or engineering collaborations.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {hasVisibleEmail && (
                  <a
                    href={`mailto:${content.socialLinks?.email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs uppercase font-bold text-white shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    SEND_PACKET(Email)
                  </a>
                )}

                {hasVisibleWhatsApp && (
                  <a
                    href={`https://wa.me/${content.socialLinks?.whatsapp?.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs uppercase font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
                  >
                    WHATSAPP_SOCKET
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
