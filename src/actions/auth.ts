"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function sendOTP(formData: FormData) {
  try {
    const email = formData.get("email");

    if (!email) {
      return { error: "Invalid email" };
    }

    // Try to call the sendVerificationOTP method, fallback gracefully if not available
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (auth.api as any).sendVerificationOTP({
        body: {
          email: email as string,
          type: "sign-in",
        },
      });

      if (!response.success) {
        return { error: "Failed to send OTP" };
      }

      return { success: "OTP sent" };
    } catch {
      console.warn('sendVerificationOTP method not available - OTP functionality disabled');
      return { error: "OTP functionality is not configured" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to send OTP" };
  }
}

export async function signInOTP(formData: FormData) {
  try {
    const email = formData.get("email");
    const otp = formData.get("otp");

    if (!email || !otp) {
      return { error: "Invalid email or OTP" };
    }

    // Try to call the signInEmailOTP method, fallback gracefully if not available
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (auth.api as any).signInEmailOTP({
        body: {
          email: email as string,
          otp: otp as string,
        },
      });

      if (!response.user || !response.token) {
        return { error: "Failed to sign in" };
      }

      return { success: "Signed in" };
    } catch {
      console.warn('signInEmailOTP method not available - OTP functionality disabled');
      return { error: "OTP functionality is not configured" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to sign in" };
  }
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    revalidatePath("/");
    redirect("/login");
  } catch (error) {
    console.error('Error signing out:', error);
    // Still redirect even if sign out fails
    revalidatePath("/");
    redirect("/login");
  }
}
