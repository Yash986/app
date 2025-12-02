import { useState, useEffect } from "react";
import { Heart, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/check-auth", {
        credentials: "include",
      });
      const data = await response.json();
      setIsUnlocked(data.isAuthenticated);
    } catch (err) {
      console.error("Failed to check auth:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/verify-password", { password });
      const data = await response.json();
      
      if (data.success) {
        setIsUnlocked(true);
      } else {
        setError("That's not the right password, try again");
        setPassword("");
      }
    } catch (err) {
      setError("That's not the right password, try again");
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Heart className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex items-center justify-center px-6"
      data-testid="password-gate"
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Our Private Space
          </h1>
          <p className="text-muted-foreground">
            Enter our secret password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 text-center text-lg"
              autoFocus
              disabled={isSubmitting}
              data-testid="input-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-toggle-password"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center" data-testid="text-error">
              {error}
            </p>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            data-testid="button-unlock"
          >
            <Heart className="w-4 h-4 mr-2" />
            {isSubmitting ? "Checking..." : "Unlock Our Story"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Hint: What do we say to each other every day?
        </p>
      </div>
    </div>
  );
}
