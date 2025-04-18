"use client";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
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

const initialState = {
  success: false,
  error: "",
  message: "",
};

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
  const [state, formAction] = useFormState(changePassword, initialState);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        onClose();
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  const SuccessToast = () => (
    <div className="fixed bottom-6 right-6 animate-in slide-in-from-right-8 z-[1000]">
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl shadow-lg">
        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        <div>
          <p className="font-medium text-sm">Password Updated!</p>
          <p className="text-xs">Security settings saved successfully</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Account Security
            </DialogTitle>
          </DialogHeader>

          {/* Read-only Admin Details */}
          <div className="space-y-4 border-b pb-4">
            <div>
              <Label>Full Name</Label>
              <Input value={user.name} readOnly className="bg-muted" />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input value={user.email} readOnly className="bg-muted" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Account Created</Label>
                <Input
                  value={new Date(user.$createdAt).toLocaleDateString()}
                  readOnly
                  className="bg-muted text-xs"
                />
              </div>
              <div>
                <Label>Last Active</Label>
                <Input
                  value={new Date(user.$updatedAt).toLocaleDateString()}
                  readOnly
                  className="bg-muted text-xs"
                />
              </div>
            </div>
          </div>

          {/* Password Update Section */}
          <form action={formAction} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
            </div>

            {state?.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {showSuccess && <SuccessToast />}
    </>
  );
};
