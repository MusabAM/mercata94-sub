import { useState, useRef } from "react";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import api from "@/lib/api";

interface ThumbnailUploaderProps {
    thumbnail: string | null;
    onThumbnailChange: (url: string | null) => void;
    maxSizeMB?: number;
}

export function ThumbnailUploader({
    thumbnail,
    onThumbnailChange,
    maxSizeMB = 2,
}: ThumbnailUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const uploadThumbnail = async (file: File) => {
        setIsUploading(true);
        setUploadError(null);

        try {
            // Step 1: Get signed URL from backend
            const urlResponse = await api.post("/products/image-upload-url", {
                fileName: file.name,
                contentType: file.type,
            });
            const { uploadUrl, publicUrl } = urlResponse.data;

            // Step 2: Upload to R2
            await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            onThumbnailChange(publicUrl);
        } catch (error) {
            console.error("Thumbnail upload error:", error);
            setUploadError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleFile = (file: File) => {
        // Validate image type
        if (!file.type.startsWith("image/")) {
            setUploadError("Please select an image file");
            return;
        }
        // Validate file size
        if (file.size > maxSizeMB * 1024 * 1024) {
            setUploadError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }
        uploadThumbnail(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeThumbnail = () => {
        onThumbnailChange(null);
    };

    return (
        <div className="space-y-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/jpeg,image/png,image/webp,image/gif"
            />

            {thumbnail ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary group">
                    <img
                        src={thumbnail}
                        alt="Product thumbnail"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-md bg-white/20 text-white text-sm hover:bg-white/30 transition-colors"
                        >
                            Replace
                        </button>
                        <button
                            type="button"
                            onClick={removeThumbnail}
                            className="px-3 py-1.5 rounded-md bg-red-500/80 text-white text-sm hover:bg-red-500 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`w-full aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${isDragging
                            ? "border-champagne bg-champagne/10"
                            : "border-border hover:border-champagne/50"
                        } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                >
                    {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-champagne" />
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium">Upload thumbnail image</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Drag & drop or click • Max {maxSizeMB}MB • Recommended 16:9
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {uploadError && (
                <p className="text-sm text-red-500">{uploadError}</p>
            )}
        </div>
    );
}
