import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { getMyPortfolio } from "@/actions/portfolio";
import { CertificationsForm } from "./CertificationsForm";

export const metadata = {
  title: "Certifications",
  description: "Manage your certifications and credentials",
};

export default async function CertificationsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const portfolio = await getMyPortfolio();

  return (
    <DashboardLayout slug={portfolio?.slug}>
      <CertificationsForm portfolio={portfolio} />
    </DashboardLayout>
  );
}
