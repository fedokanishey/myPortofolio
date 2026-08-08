import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getMyPortfolio } from "@/actions/portfolio";
import { ProjectsForm } from "./ProjectsForm";

export const metadata = {
  title: "Projects",
  description: "Manage your projects",
};

export default async function ProjectsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const portfolio = await getMyPortfolio();

  return <ProjectsForm portfolio={portfolio} />;
}
