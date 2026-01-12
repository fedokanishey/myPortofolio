import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { getMyPortfolio } from "@/actions/portfolio";
import { ExperienceForm } from "./ExperienceForm";

export const metadata = {
  title: "Experience",
  description: "Manage your work experience",
};

export default async function ExperiencePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const portfolio = await getMyPortfolio();

  return (
    <DashboardLayout slug={portfolio?.slug}>
      <ExperienceForm portfolio={portfolio} />
    </DashboardLayout>
  );
}
