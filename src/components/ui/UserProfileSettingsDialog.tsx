import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Input } from "./input";
import { Button } from "./button";

interface UserProfileSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  // Add props for initial data if needed
}

const UserProfileSettingsDialog: React.FC<UserProfileSettingsDialogProps> = ({ isOpen, onClose }) => {
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [socialMedia, setSocialMedia] = React.useState({
    twitter: "",
    linkedin: "",
    github: "",
  });
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhotoFile(event.target.files[0]);
    }
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setSocialMedia((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSave = () => {
    console.log("Saving profile settings:", {
      photoFile, // In a real app, you'd upload this file
      socialMedia,
      phoneNumber,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Manage your profile information, including photo, social media links, and phone number.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="photo" className="text-right">Photo</label>
            <Input
              id="photo"
              type="file"
              className="col-span-3"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="twitter" className="text-right">Twitter</label>
            <Input
              id="twitter"
              value={socialMedia.twitter}
              onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="linkedin" className="text-right">LinkedIn</label>
            <Input
              id="linkedin"
              value={socialMedia.linkedin}
              onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="github" className="text-right">GitHub</label>
            <Input
              id="github"
              value={socialMedia.github}
              onChange={(e) => handleSocialMediaChange("github", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right">Phone</label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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

export default UserProfileSettingsDialog; 