"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main 404 Card */}
        <Card className="bg-secondary/30 border-0 shadow-xl backdrop-blur-sm">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <CardTitle className="mb-2 text-6xl font-bold text-slate-900 dark:text-white">
              404
            </CardTitle>
            <CardDescription className="text-xl text-slate-600 dark:text-slate-300">
              Oops! Page not found
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <p className="mx-auto max-w-md leading-relaxed text-slate-500 dark:text-slate-400">
              The page you&apos;re looking for doesn&apos;t exist. It might have
              been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
              <Button
                onClick={() => router.push("/")}
                className="w-full text-white sm:w-auto"
                size="lg"
                variant="secondary"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
