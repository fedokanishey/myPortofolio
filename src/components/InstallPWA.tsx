"use client";

import { useState, useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function InstallPWA() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      deferredPrompt.current = null;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const prompt = deferredPrompt.current;
    if (!prompt) return;

    deferredPrompt.current = null;

    const { outcome } = await prompt.prompt();

    if (outcome === "accepted") {
      setCanInstall(false);
    }
  };

  return (
    <Button variant="outline" size="xl" onClick={handleInstallClick} className="gap-2">
      <Download className="h-5 w-5" />
      Install App
    </Button>
  );
}
