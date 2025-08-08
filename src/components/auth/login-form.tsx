"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendOTP } from "@/actions/auth";
import { useFormStatus } from "react-dom";
import { GoogleButton } from "./google-button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending..." : "Send OTP Code"}
    </Button>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(null);
    
    const result = await sendOTP(formData);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccess("Verification code sent! Please check your email.");
    
    // Redirect to the OTP verification page after a short delay
    setTimeout(() => {
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    }, 1500);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Sign in with your email or social accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}
            
            {success && (
              <p className="text-green-600 text-sm">{success}</p>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}
