/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Loader2, AlertTriangle } from "lucide-react";
import { loginUser } from "@/lib/controllers/AuthControllers";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await loginUser(formData);

      if (result.success) {
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/10 p-4">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.8 8.544 15.214 9.96l9.9-9.96h-2.77zM32 0l-3.486 3.486-13.27 13.27L16.657 18.17l14.7-14.7h-2.828L14.828 17.172 16.243 18.586 28.544 6.284 32 2.828 35.456 6.284 47.757 18.586l1.415-1.414L35.47 3.47 32 0zM0 0c0 3.873 3.133 7.006 7.006 7.006L0 0zm60 0c0 3.873-3.133 7.006-7.006 7.006L60 0zM0 60c0-3.873 3.133-7.006 7.006-7.006L0 60zm60 0c0-3.873-3.133-7.006-7.006-7.006L60 60z" fill="currentColor" fill-opacity="0.1" fill-rule="evenodd"%3E%3C/path%3E%3C/svg%3E")',
          }}
        />
      </div>

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-card/95 shadow-xl border-primary/10">
        <CardHeader className="text-center pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center justify-center gap-2">
              <h1 className="text-3xl tracking-tight font-extralight">
                STARDOM
              </h1>
            </div>
            <CardTitle className="text-xl font-medium text-muted-foreground">
              Administrator Access
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Administrative Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your admin email"
                  className="pl-10"
                  required
                />
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Access Admin Panel"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              This is a secure area. Unauthorized access attempts will be
              logged.
            </p>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
