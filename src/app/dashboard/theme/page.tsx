import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
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

  return <ThemeForm portfolio={portfolio} />;
}
