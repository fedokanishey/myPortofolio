import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/atoms/Button";

export default function PortfolioNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="relative">
          <div className="text-9xl font-bold text-muted/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-20 w-20 text-muted-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
          <p className="text-muted-foreground">
            This portfolio doesn&apos;t exist or hasn&apos;t been published yet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="gradient" asChild>
            <Link href="/">
              <span className="flex items-center">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/explore">Explore Portfolios</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
