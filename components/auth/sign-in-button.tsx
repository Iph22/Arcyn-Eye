"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Chrome } from "lucide-react";
import { useState } from "react";

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error signing in:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      size="lg"
      className="glass-strong hover:bg-primary/20 transition-all duration-300 group"
    >
      <Chrome className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
      {isLoading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
}
