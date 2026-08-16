import type { IPortfolio, IExperience, IProject, ICertification, ISocialLinks, ISectionVisibility, IHiddenItems } from "@/models/Portfolio";

export interface TemplateProps {
  portfolio: IPortfolio & { userId: { name: string; image?: string } };
  displayName: string;
  primaryColor: string;
  secondaryColor: string;
  avatarSrc?: string;
  filteredExperience: IExperience[];
  filteredProjects: IProject[];
  filteredCertifications: ICertification[];
  filteredSkills: string[];
  socialLinksArray: { platform: keyof ISocialLinks; url: string }[];
  sectionVisibility: ISectionVisibility;
  hiddenItems: IHiddenItems;
  hasVisibleEmail: boolean;
  hasVisibleWhatsApp: boolean;
  showContactSection: boolean;
}
