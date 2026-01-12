import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { getMyPortfolio } from "@/actions/portfolio";
import { ThemeForm } from "./ThemeForm";

export const metadata = {
  title: "Theme",
  description: "Customize your portfolio theme",
};

export default async function ThemePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const portfolio = await getMyPortfolio();

  return (
    <DashboardLayout slug={portfolio?.slug}>
      <ThemeForm portfolio={portfolio} />
    </DashboardLayout>
  );
}
