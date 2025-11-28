import { Link, useLocation } from "wouter";
import { MessageCircle, Home, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">
              Govt Schemes Assistant
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {location !== "/" && (
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-nav-home">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          )}
          {location !== "/chat" && (
            <Link href="/chat">
              <Button variant="default" size="sm" data-testid="button-nav-chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
