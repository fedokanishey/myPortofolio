import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { getMyPortfolio } from "@/actions/portfolio";
import { ProfileForm } from "./ProfileForm";

export const metadata = {
  title: "Profile",
  description: "Manage your profile information",
};

export default async function ProfilePage() {
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
      <ProfileForm portfolio={portfolio} clerkName={clerkName} />
    </DashboardLayout>
  );
}
