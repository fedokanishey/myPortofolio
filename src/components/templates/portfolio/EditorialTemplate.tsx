"use client";

import * as React from "react";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Download, Mail, Github } from "lucide-react";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { SkillIcon } from "@/components/molecules/SkillSearchInput";
import { AnimatedSkillsCloud } from "@/components/molecules/AnimatedSkillsCloud";
import { ProjectPreviewFrame } from "@/components/molecules/ProjectPreviewFrame";
import { CertificationCard } from "@/components/molecules/CertificationCard";
import type { TemplateProps } from "./types";

export function EditorialTemplate({
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

  // GSAP Editorial Line Drawing & Typography Reveals
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from(".editorial-label", {
        opacity: 0,
        y: -10,
        duration: 0.8,
        stagger: 0.1,
      });

      tl.from(
        ".editorial-title",
        {
          opacity: 0,
          y: 40,
          duration: 1.1,
        },
        "-=0.4"
      );

      tl.from(
        ".editorial-divider-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          stagger: 0.1,
        },
        "-=0.6"
      );

      tl.from(
        ".editorial-avatar-box",
        {
          opacity: 0,
          y: 20,
          duration: 0.9,
        },
        "-=0.7"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background"
    >
      {/* Subtle Grain & Ambient Minimal Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(${primaryColor} 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main Editorial Hero */}
      <section id="hero" className="pt-28 sm:pt-36 pb-16 border-b border-border/60 scroll-mt-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="editorial-label text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
              Portfolio &amp; Selected Works
            </span>
            <div className="editorial-label flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Available for Work</span>
            </div>
          </div>

          <div className="editorial-divider-line w-full h-px bg-border mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-12 items-end">
            <div className="space-y-6">
              <h1 className="editorial-title text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.05] text-foreground">
                {displayName}
              </h1>

              {content.headline && (
                <p className="text-xl sm:text-2xl lg:text-3xl font-light text-muted-foreground leading-snug">
                  {content.headline}
                </p>
              )}

              {content.bio && (
                <div className="max-w-2xl text-base text-muted-foreground font-sans leading-relaxed pt-2">
                  <ExpandableText text={content.bio} maxLength={220} />
                </div>
              )}

              {/* Minimal Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                {content.resume && (
                  <a
                    href={content.resume}
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download CV
                  </a>
                )}

                {showContactSection && (
                  <button
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold border border-foreground/30 hover:border-foreground transition-all"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Get In Touch
                  </button>
                )}
              </div>

              {sectionVisibility.showSocialLinks && socialLinksArray.length > 0 && (
                <div className="pt-2">
                  <SocialLinks links={socialLinksArray} />
                </div>
              )}
            </div>

            {/* Avatar Frame - Editorial Rectangle */}
            <div className="editorial-avatar-box flex justify-start lg:justify-end">
              <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-lg overflow-hidden border border-border/80 shadow-xl bg-muted">
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={displayName}
                    fill
                    priority
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="280px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-serif text-muted-foreground">
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase with Animated Cloud Marquee, Pause-on-Hover & See All Toggle */}
      {sectionVisibility.showSkills && filteredSkills.length > 0 && (
        <section id="skills" className="py-16 border-b border-border/60 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">
                (01) Expertise &amp; Core Stack
              </span>
              <span className="text-xs text-muted-foreground font-mono">{filteredSkills.length} disciplines</span>
            </div>

            <AnimatedSkillsCloud
              skills={filteredSkills}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </div>
        </section>
      )}

      {/* Career Experience */}
      {sectionVisibility.showExperience && filteredExperience.length > 0 && (
        <section id="experience" className="py-20 border-b border-border/60 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">
                (02) Career Chronicle
              </span>
            </div>

            <div className="space-y-8">
              {filteredExperience.map((exp, idx) => (
                <div
                  key={exp._id || idx}
                  className="py-6 border-t border-border/70 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-baseline hover:border-foreground transition-colors"
                >
                  <div>
                    <div className="text-base font-bold text-foreground">{exp.company}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">
                      {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif font-medium text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Showcase - Large Editorial Layout */}
      {sectionVisibility.showProjects && filteredProjects.length > 0 && (
        <section id="projects" className="py-20 border-b border-border/60 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">
                (03) Selected Works
              </span>
              <span className="text-xs text-muted-foreground font-mono">Archive ({filteredProjects.length})</span>
            </div>

            <div className="space-y-12">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="group pt-8 border-t border-border/70 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start hover:border-foreground transition-colors duration-500"
                >
                  {/* Left: Project meta */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-muted-foreground">
                      CASE_{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges with SkillIcon */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-muted-foreground bg-muted/60 border border-border/70 font-mono"
                        >
                          <SkillIcon name={tech} size={13} color="currentColor" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold hover:underline"
                          style={{ color: primaryColor }}
                        >
                          Visit Project <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-3.5 w-3.5" /> Source
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Live Iframe or Image Preview */}
                  <div className="rounded-lg overflow-hidden border border-border bg-muted group-hover:shadow-2xl transition-shadow duration-500">
                    <ProjectPreviewFrame
                      title={project.title}
                      image={project.image}
                      liveUrl={project.liveUrl}
                      primaryColor={primaryColor}
                      secondaryColor={secondaryColor}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {sectionVisibility.showCertifications && filteredCertifications.length > 0 && (
        <section id="certifications" className="py-16 border-b border-border/60 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-10">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">
                (04) Accreditations &amp; Certifications
              </span>
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

      {/* Contact Section */}
      {showContactSection && (
        <section id="contact" className="py-24 scroll-mt-28">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-muted-foreground">
              Initiate Dialogue
            </span>

            <h2 className="text-4xl sm:text-6xl font-serif tracking-tight">
              Have a visionary initiative?
            </h2>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {hasVisibleEmail && (
                <a
                  href={`mailto:${content.socialLinks?.email}`}
                  className="px-8 py-4 rounded-full font-serif text-base text-white shadow-xl transition-transform hover:scale-105 inline-block"
                  style={{ backgroundColor: primaryColor }}
                >
                  Write an Email
                </a>
              )}

              {hasVisibleWhatsApp && (
                <a
                  href={`https://wa.me/${content.socialLinks?.whatsapp?.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full font-serif text-base border border-border hover:border-foreground transition-all inline-block"
                >
                  WhatsApp Direct
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
