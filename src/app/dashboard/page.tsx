import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { getMyPortfolio } from "@/actions/portfolio";
import { DashboardContent } from "./DashboardContent";

export const metadata = {
  title: "Dashboard",
  description: "Manage your portfolio",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [portfolio, user] = await Promise.all([
    getMyPortfolio(),
    currentUser(),
  ]);

  const clerkName = user?.firstName 
    ? `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`
    : user?.username || "";

  return (
    <DashboardLayout slug={portfolio?.slug}>
      <DashboardContent portfolio={portfolio} clerkName={clerkName} />
    </DashboardLayout>
  );
}
