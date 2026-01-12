import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { getMyPortfolio } from "@/actions/portfolio";
import { SettingsForm } from "./SettingsForm";

export const metadata = {
  title: "Settings",
  description: "Portfolio settings",
};

export default async function SettingsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const portfolio = await getMyPortfolio();

  return (
    <DashboardLayout slug={portfolio?.slug}>
      <SettingsForm portfolio={portfolio} />
    </DashboardLayout>
  );
}
