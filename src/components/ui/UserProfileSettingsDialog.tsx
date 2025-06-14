import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { Input } from "./input";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Camera, Loader2 } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";

interface UserProfileSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileSettingsDialog: React.FC<UserProfileSettingsDialogProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    twitter_handle: '',
    linkedin_url: '',
    github_username: '',
  });
  const [uploading, setUploading] = useState(false);

  // Update form data when profile loads
  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        twitter_handle: profile.twitter_handle || '',
        linkedin_url: profile.linkedin_url || '',
        github_username: profile.github_username || '',
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    const { error } = await uploadAvatar(file);
    
    if (error) {
      alert(`Error uploading avatar: ${error.message}`);
    }
    
    setUploading(false);
  };

  const handleSave = async () => {
    const { error } = await updateProfile(formData);
    
    if (error) {
      alert(`Error updating profile: ${error.message}`);
      return;
    }

    onClose();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Manage your profile information, including photo, social media links, and contact details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage 
                  src={profile?.avatar_url || ''} 
                  alt={profile?.full_name || 'User avatar'} 
                />
                <AvatarFallback className="text-lg">
                  {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                </AvatarFallback>
              </Avatar>
              
              <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              
              {uploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground text-center">
              Click the camera icon to upload a new profile picture
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="full_name" className="text-right text-sm font-medium">
                Full Name
              </label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="col-span-3"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="col-span-3"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="twitter" className="text-right text-sm font-medium">
                Twitter
              </label>
              <Input
                id="twitter"
                value={formData.twitter_handle}
                onChange={(e) => handleInputChange('twitter_handle', e.target.value)}
                className="col-span-3"
                placeholder="@username"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="linkedin" className="text-right text-sm font-medium">
                LinkedIn
              </label>
              <Input
                id="linkedin"
                value={formData.linkedin_url}
                onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                className="col-span-3"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="github" className="text-right text-sm font-medium">
                GitHub
              </label>
              <Input
                id="github"
                value={formData.github_username}
                onChange={(e) => handleInputChange('github_username', e.target.value)}
                className="col-span-3"
                placeholder="username"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileSettingsDialog;