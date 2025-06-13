import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Input } from "./input";
import { Button } from "./button";

interface UserSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSettingsDialog: React.FC<UserSettingsDialogProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSave = () => {
    console.log("Saving settings:", {
      email,
      currentPassword,
      newPassword,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Settings</DialogTitle>
          <DialogDescription>
            Update your account settings, including email and password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currentPassword" className="text-right">Current Password</label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="newPassword" className="text-right">New Password</label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingsDialog; 