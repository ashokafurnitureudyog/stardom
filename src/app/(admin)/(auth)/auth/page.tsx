/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2, AlertTriangle, ArrowRight } from "lucide-react";
import { loginUser, PasswordState } from "@/lib/controllers/AuthControllers";
import Image from "next/image";

const initialState: PasswordState = {
  success: false,
  message: undefined,
  error: undefined,
};

const AdminLoginPage = () => {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );
  const router = useRouter();

  // Redirect on success
  React.useEffect(() => {
    if (state.success) {
      router.push("/admin/dashboard");
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen flex w-full bg-background font-sans">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 xl:p-24 relative z-10">
        <div className="w-full max-w-sm space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span className="text-primary/80 font-serif italic text-lg tracking-wide">
                Welcome back
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 font-serif">
              Administrative <br />
              <span className="font-medium text-primary">Access</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Please enter your credentials to manage the workspace.
            </p>
          </motion.div>

          {state.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <Alert
                variant="destructive"
                className="border-red-500/20 bg-red-500/5 text-red-600"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground/80"
              >
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@stardom.com"
                  className="pl-10 h-12 bg-secondary/20 border-border/40 focus:border-primary/50 transition-all font-light"
                  required
                />
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              {state.errors?.email && (
                <p className="text-xs text-red-500 mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground/80"
                >
                  Password
                </Label>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-secondary/20 border-border/40 focus:border-primary/50 transition-all font-light"
                  required
                />
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              {state.errors?.password && (
                <p className="text-xs text-red-500 mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium tracking-wide bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-4 text-center">
            <p className="text-xs text-muted-foreground/60">
              Protected by enterprise-grade security.
              <br />
              Stardom © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-neutral-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10 opacity-80" />

        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
          alt="Office Interior"
          fill
          className="object-cover opacity-90"
          priority
          sizes="50vw"
        />

        <div className="absolute bottom-0 left-0 right-0 p-16 z-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-serif italic mb-4">
              "Design is intelligence made visible."
            </h2>
            <div className="h-px w-12 bg-white/50 mb-6" />
            <p className="text-white/80 font-light max-w-md text-lg leading-relaxed">
              Manage your premium furniture collections, customer interactions,
              and portfolio with precision and elegance.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
