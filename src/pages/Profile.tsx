import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AvatarCropModal } from "@/components/ui/avatar-crop-modal";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Loader2, User, Mail, Camera, Save, ArrowLeft, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const Profile = () => {
    const { user, isLoading: authLoading, updateProfile } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Crop modal state
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    // Password change state
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        display_name: "",
        bio: "",
        avatar_url: "",
        website: "",
    });

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
        }
    }, [authLoading, user, navigate]);

    // Populate form with current user data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                display_name: user.display_name || "",
                bio: user.bio || "",
                avatar_url: user.avatar_url || "",
                website: (user as any).website || "",
            });
            setAvatarPreview(user.avatar_url || null);
        }
    }, [user]);

    // Handle avatar file selection - opens crop modal
    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast({
                title: "Invalid File",
                description: "Please select an image file.",
                variant: "destructive",
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File Too Large",
                description: "Please select an image smaller than 5MB.",
                variant: "destructive",
            });
            return;
        }

        // Store file name for later
        setSelectedFileName(file.name);

        // Read file and open crop modal
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImageSrc(e.target?.result as string);
            setCropModalOpen(true);
        };
        reader.readAsDataURL(file);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle cropped image from modal
    const handleCropComplete = async (croppedBlob: Blob) => {
        setCropModalOpen(false);
        setIsUploadingAvatar(true);

        try {
            // 1. Get signed upload URL from backend
            const urlResponse = await api.post('/auth/avatar-upload-url', {
                fileName: selectedFileName || 'avatar.jpg',
            });
            const { uploadUrl, avatarUrl } = urlResponse.data;

            // 2. Upload cropped file directly to R2
            await fetch(uploadUrl, {
                method: 'PUT',
                body: croppedBlob,
                headers: {
                    'Content-Type': 'image/jpeg',
                },
            });

            // 3. Update form data with the new avatar URL
            setFormData(prev => ({ ...prev, avatar_url: avatarUrl }));

            // 4. Show preview from blob
            const previewUrl = URL.createObjectURL(croppedBlob);
            setAvatarPreview(previewUrl);

            toast({
                title: "Avatar Uploaded",
                description: "Click 'Save Changes' to update your profile.",
            });

        } catch (err: any) {
            console.error('Avatar upload error:', err);
            toast({
                title: "Upload Failed",
                description: err.response?.data?.message || "Could not upload avatar.",
                variant: "destructive",
            });
        } finally {
            setIsUploadingAvatar(false);
            setSelectedImageSrc(null);
        }
    };

    const handleCropCancel = () => {
        setCropModalOpen(false);
        setSelectedImageSrc(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await updateProfile(formData as any);
            toast({
                title: "Profile Updated",
                description: "Your profile has been updated successfully.",
            });
        } catch (err: any) {
            toast({
                title: "Update Failed",
                description: err.response?.data?.message || "Could not update profile.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Password change handler
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");

        // Validation
        if (passwordData.newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }

        if (passwordData.currentPassword === passwordData.newPassword) {
            setPasswordError("New password must be different from current password.");
            return;
        }

        setIsChangingPassword(true);

        try {
            await api.put('/auth/password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });

            toast({
                title: "Password Changed",
                description: "Your password has been updated successfully.",
            });

            // Clear form
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to change password.";
            setPasswordError(message);
        } finally {
            setIsChangingPassword(false);
        }
    };

    if (authLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                </div>
            </Layout>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <>
            <Helmet>
                <title>My Profile — 94mercato</title>
                <meta name="description" content="Update your 94mercato profile settings." />
            </Helmet>
            <Layout>
                <section className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-stone/30 to-background">
                    <div className="container-luxury">
                        <div className="max-w-2xl mx-auto space-y-8">
                            {/* Header */}
                            <div>
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(-1)}
                                    className="text-muted-foreground hover:text-foreground mb-4"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                                <h1 className="heading-large mb-2">My Profile</h1>
                                <p className="text-muted-foreground">
                                    Manage your account settings and public profile
                                </p>
                            </div>

                            {/* Profile Card */}
                            <div className="glass-card-elevated p-8">
                                {/* Avatar Section */}
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                                    <div className="relative">
                                        {/* Hidden file input */}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />

                                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-sapphire to-champagne flex items-center justify-center overflow-hidden">
                                            {isUploadingAvatar ? (
                                                <Loader2 className="h-8 w-8 animate-spin text-cream" />
                                            ) : avatarPreview ? (
                                                <img
                                                    src={avatarPreview}
                                                    alt={user.display_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-12 w-12 text-cream" />
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAvatarClick}
                                            disabled={isUploadingAvatar}
                                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-champagne flex items-center justify-center shadow-lg hover:bg-champagne/80 transition-colors disabled:opacity-50"
                                        >
                                            <Camera className="h-4 w-4 text-midnight" />
                                        </button>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">{user.display_name}</h2>
                                        <p className="text-muted-foreground">{user.email}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-sapphire/20 text-champagne capitalize">
                                                {user.role}
                                            </span>
                                            {user.is_verified && (
                                                <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Click the camera icon to upload a new photo
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email (Read Only) */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="bg-muted/50"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Email cannot be changed
                                        </p>
                                    </div>

                                    {/* Display Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="display_name">Display Name</Label>
                                        <Input
                                            id="display_name"
                                            type="text"
                                            placeholder="How you want to be called"
                                            value={formData.display_name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, display_name: e.target.value })
                                            }
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Your legal name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Bio */}
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            placeholder="Tell us a bit about yourself..."
                                            value={formData.bio}
                                            onChange={(e) =>
                                                setFormData({ ...formData, bio: e.target.value })
                                            }
                                            disabled={isSubmitting}
                                            rows={4}
                                            className="resize-none"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            This will be visible on your public profile
                                        </p>
                                    </div>

                                    {/* Website - Show for sellers and admins */}
                                    {(user.role === 'seller' || user.role === 'admin') && (
                                        <div className="space-y-2">
                                            <Label htmlFor="website" className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                Website
                                            </Label>
                                            <Input
                                                id="website"
                                                type="url"
                                                placeholder="https://yourwebsite.com"
                                                value={formData.website}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, website: e.target.value })
                                                }
                                                disabled={isSubmitting}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Your portfolio or business website
                                            </p>
                                        </div>
                                    )}

                                    {/* Balance Display */}
                                    <div className="p-4 rounded-lg bg-champagne/10 border border-champagne/20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Account Balance</span>
                                            <span className="text-2xl font-bold text-champagne">
                                                ${user.balance?.toFixed(2) || "0.00"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="luxury"
                                        className="w-full"
                                        size="lg"
                                        disabled={isSubmitting || isUploadingAvatar}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>

                            {/* Password Change Card */}
                            <div className="glass-card-elevated p-8">
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold flex items-center gap-2">
                                        <Lock className="h-5 w-5" />
                                        Change Password
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Update your password to keep your account secure
                                    </p>
                                </div>

                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    {passwordError && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm">
                                            {passwordError}
                                        </div>
                                    )}

                                    {/* Current Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="currentPassword"
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="Enter current password"
                                                value={passwordData.currentPassword}
                                                onChange={(e) =>
                                                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                                }
                                                disabled={isChangingPassword}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* New Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                value={passwordData.newPassword}
                                                onChange={(e) =>
                                                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                                                }
                                                disabled={isChangingPassword}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Minimum 8 characters
                                        </p>
                                    </div>

                                    {/* Confirm New Password */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Re-enter new password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) =>
                                                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                                                }
                                                disabled={isChangingPassword}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="w-full"
                                        disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                    >
                                        {isChangingPassword ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Changing Password...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="mr-2 h-4 w-4" />
                                                Change Password
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

            {/* Avatar Crop Modal */}
            {selectedImageSrc && (
                <AvatarCropModal
                    isOpen={cropModalOpen}
                    imageSrc={selectedImageSrc}
                    onClose={handleCropCancel}
                    onCropComplete={handleCropComplete}
                />
            )}
        </>
    );
};

export default Profile;
