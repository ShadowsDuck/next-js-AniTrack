"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Image from "next/image";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-background relative flex min-h-screen overflow-hidden px-4 py-16 md:py-32">
      {/* Animated background elements using theme colors */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl"></div>
        <div className="bg-primary/5 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full blur-3xl delay-1000"></div>
        <div className="bg-accent/10 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full blur-3xl delay-2000"></div>
      </div>

      <div className="relative m-auto h-fit w-full max-w-sm transform transition-all duration-300 hover:scale-[1.02]">
        <div className="bg-card/80 border-border shadow-primary/10 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl">
          <div className="relative p-8 pb-6">
            {/* Decorative gradient overlay using primary color */}
            <div className="bg-primary absolute top-0 right-0 left-0 h-1"></div>

            <div className="text-center">
              <Link
                href="/"
                aria-label="go home"
                className="group mx-auto block w-fit"
              >
                <div className="relative inline-block">
                  <div className="bg-hover absolute inset-0 scale-150 rounded-full opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"></div>
                  <p className="relative transform text-5xl drop-shadow-sm filter transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={"/images/AniTrackLogo.png"}
                      alt="AniTrack Logo"
                      width={100}
                      height={100}
                      priority
                    />
                  </p>
                </div>
              </Link>

              <h1 className="text-primary mt-6 mb-2 text-2xl font-bold">
                Hi Welcome 👋
              </h1>

              <p className="text-muted-foreground text-sm font-medium">
                Track your anime journey with us
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <Button
                type="button"
                variant="outline"
                className="group bg-card/50 border-border hover:border-primary hover:bg-hover hover:shadow-primary/20 relative h-12 w-full overflow-hidden border-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
                onClick={signInWithGoogle}
                disabled={isLoading}
              >
                {/* Animated background on hover */}
                <div className="bg-primary/0 group-hover:bg-primary/5 absolute inset-0 transition-all duration-300"></div>

                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                    <span className="text-foreground font-semibold">
                      Signing in...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 256 262"
                      className="transform transition-transform duration-300 group-hover:scale-110"
                    >
                      <path
                        fill="#4285f4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      ></path>
                      <path
                        fill="#34a853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      ></path>
                      <path
                        fill="#fbbc05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                      ></path>
                      <path
                        fill="#eb4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      ></path>
                    </svg>
                    <span className="text-foreground font-semibold">
                      Continue with Google
                    </span>
                  </div>
                )}
              </Button>

              {/* Decorative divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-border w-full border-t"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="text-muted-foreground bg-card/80 px-4 text-xs font-medium backdrop-blur-sm">
                    Secure authentication
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements using theme colors */}
        <div className="bg-primary absolute -top-2 -right-2 h-6 w-6 animate-bounce rounded-full opacity-20 delay-300"></div>
        <div className="bg-accent absolute -bottom-1 -left-1 h-4 w-4 animate-bounce rounded-full opacity-30 delay-700"></div>
      </div>

      {/* Additional floating particles using theme colors */}
      <div className="bg-primary/40 absolute top-1/4 right-1/3 h-2 w-2 animate-ping rounded-full delay-1000"></div>
      <div className="bg-accent/30 absolute bottom-1/3 left-1/4 h-3 w-3 animate-ping rounded-full delay-2000"></div>
    </section>
  );
}
