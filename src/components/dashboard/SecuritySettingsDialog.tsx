/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "@/lib/controllers/AuthControllers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeOff, CheckCircle2, Lock } from "lucide-react";

interface FormData {
  currentPassword: string;
  newPassword: string;
}

interface UserDetails {
  name: string;
  email: string;
  $createdAt: string;
  $updatedAt: string;
}

export const SecuritySettingsDialog = ({
  user,
  onClose,
}: {
  user: UserDetails;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("currentPassword", data.currentPassword);
      formData.append("newPassword", data.newPassword);

      const result = await changePassword(null, formData);

      if (result.success) {
        setShowSuccess(true);
        reset();
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 2000);
      } else {
        setError(result.error || "Password update failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  const SuccessToast = () => (
    <div className="fixed bottom-6 right-6 animate-in slide-in-from-right-8 z-[1000]">
      <div className="flex items-center gap-3 bg-neutral-900 border border-[#A28B55] text-[#A28B55] px-4 py-3 rounded-xl shadow-[0_0_12px_rgba(162,139,85,0.2)]">
        <CheckCircle2 className="w-5 h-5 text-[#A28B55]" />
        <div>
          <p className="font-medium text-sm">Password Updated!</p>
          <p className="text-xs text-neutral-200">
            Security settings saved successfully
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md border-[#3C3120] bg-[#171410] shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#A28B55]">
              <Lock className="w-5 h-5 text-[#A28B55]" />
              Account Security
            </DialogTitle>
          </DialogHeader>

          {/* Read-only Admin Details */}
          <div className="space-y-4 border-b border-[#352b1c] pb-4">
            <div>
              <Label className="text-neutral-200">Full Name</Label>
              <Input
                value={user.name}
                readOnly
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
            </div>
            <div>
              <Label className="text-neutral-200">Email Address</Label>
              <Input
                value={user.email}
                readOnly
                className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-neutral-200">Account Created</Label>
                <Input
                  value={new Date(user.$createdAt).toLocaleDateString()}
                  readOnly
                  className="bg-neutral-950/70 border-[#352b1c] text-xs text-neutral-400 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
                />
              </div>
              <div>
                <Label className="text-neutral-200">Last Active</Label>
                <Input
                  value={new Date(user.$updatedAt).toLocaleDateString()}
                  readOnly
                  className="bg-neutral-950/70 border-[#352b1c] text-xs text-neutral-400 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
                />
              </div>
            </div>
          </div>

          {/* Password Update Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neutral-200">Current Password</Label>
                <div className="relative">
                  <Input
                    {...register("currentPassword", { required: true })}
                    type={showCurrentPassword ? "text" : "password"}
                    className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6 text-neutral-400 hover:text-[#A28B55] hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                </div>
                {errors.currentPassword && (
                  <p className="text-sm text-[#A28B55]">
                    This field is required
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-neutral-200">New Password</Label>
                <div className="relative">
                  <Input
                    {...register("newPassword", {
                      required: true,
                      minLength: 8,
                    })}
                    type={showNewPassword ? "text" : "password"}
                    className="bg-neutral-950/70 border-[#352b1c] text-neutral-200 focus-visible:ring-[#A28B55]/20 focus-visible:border-[#A28B55]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6 text-neutral-400 hover:text-[#A28B55] hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                {errors.newPassword && (
                  <p className="text-sm text-[#A28B55]">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-[#A28B55]">{error}</p>}

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[#352b1c] text-neutral-300 hover:text-[#A28B55] hover:border-[#A28B55] hover:bg-[#131008]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#A28B55] text-neutral-950 hover:bg-[#A28B55]/90 font-medium"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {showSuccess && <SuccessToast />}
    </>
  );
};
