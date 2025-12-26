import { useState, useRef, useCallback } from "react";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

interface ImageUploaderProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
    maxSizeMB?: number;
}

interface UploadingImage {
    id: string;
    file: File;
    preview: string;
    progress: number;
    error?: string;
}

export function ImageUploader({
    images,
    onImagesChange,
    maxImages = 5,
    maxSizeMB = 2,
}: ImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState<UploadingImage[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const uploadImage = async (file: File): Promise<string | null> => {
        const uploadId = crypto.randomUUID();
        const preview = URL.createObjectURL(file);

        // Add to uploading state
        setUploading((prev) => [
            ...prev,
            { id: uploadId, file, preview, progress: 0 },
        ]);

        try {
            // Step 1: Get signed URL from backend
            const urlResponse = await api.post("/products/image-upload-url", {
                fileName: file.name,
                contentType: file.type,
            });
            const { uploadUrl, fileKey, publicUrl } = urlResponse.data;

            // Update progress
            setUploading((prev) =>
                prev.map((img) =>
                    img.id === uploadId ? { ...img, progress: 30 } : img
                )
            );

            // Step 2: Upload to R2
            await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            // Update progress
            setUploading((prev) =>
                prev.map((img) =>
                    img.id === uploadId ? { ...img, progress: 100 } : img
                )
            );

            // Clean up and return URL
            URL.revokeObjectURL(preview);
            setUploading((prev) => prev.filter((img) => img.id !== uploadId));

            return publicUrl;
        } catch (error) {
            console.error("Image upload error:", error);
            setUploading((prev) =>
                prev.map((img) =>
                    img.id === uploadId
                        ? { ...img, error: "Upload failed", progress: 0 }
                        : img
                )
            );
            // Remove failed upload after a delay
            setTimeout(() => {
                setUploading((prev) => prev.filter((img) => img.id !== uploadId));
                URL.revokeObjectURL(preview);
            }, 3000);
            return null;
        }
    };

    const handleFiles = useCallback(
        async (files: FileList | File[]) => {
            const fileArray = Array.from(files);
            const remainingSlots = maxImages - images.length - uploading.length;

            if (remainingSlots <= 0) {
                return;
            }

            const validFiles = fileArray
                .filter((file) => {
                    // Check if it's an image
                    if (!file.type.startsWith("image/")) {
                        console.warn(`Skipping non-image file: ${file.name}`);
                        return false;
                    }
                    // Check file size
                    if (file.size > maxSizeMB * 1024 * 1024) {
                        console.warn(`File too large: ${file.name}`);
                        return false;
                    }
                    return true;
                })
                .slice(0, remainingSlots);

            // Upload all valid files
            const uploadPromises = validFiles.map(uploadImage);
            const results = await Promise.all(uploadPromises);

            // Add successful uploads to images
            const newUrls = results.filter((url): url is string => url !== null);
            if (newUrls.length > 0) {
                onImagesChange([...images, ...newUrls]);
            }
        },
        [images, uploading.length, maxImages, maxSizeMB, onImagesChange]
    );

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
        // Reset input so same file can be selected again
        e.target.value = "";
    };

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files) {
                handleFiles(e.dataTransfer.files);
            }
        },
        [handleFiles]
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    const canAddMore = images.length + uploading.length < maxImages;

    return (
        <div className="space-y-3">
            {/* Image Grid */}
            {(images.length > 0 || uploading.length > 0) && (
                <div className="grid grid-cols-5 gap-3">
                    {/* Uploaded Images */}
                    {images.map((url, index) => (
                        <div
                            key={url}
                            className="relative aspect-square rounded-lg overflow-hidden group bg-secondary"
                        >
                            <img
                                src={url}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            {index === 0 && (
                                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[10px] font-medium bg-champagne text-foreground rounded">
                                    Cover
                                </span>
                            )}
                        </div>
                    ))}

                    {/* Uploading Images */}
                    {uploading.map((img) => (
                        <div
                            key={img.id}
                            className="relative aspect-square rounded-lg overflow-hidden bg-secondary"
                        >
                            <img
                                src={img.preview}
                                alt="Uploading..."
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                {img.error ? (
                                    <span className="text-xs text-red-500">{img.error}</span>
                                ) : (
                                    <Loader2 className="h-5 w-5 animate-spin text-champagne" />
                                )}
                            </div>
                            {/* Progress bar */}
                            {!img.error && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                                    <div
                                        className="h-full bg-champagne transition-all duration-300"
                                        style={{ width: `${img.progress}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Zone */}
            {canAddMore && (
                <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                    />
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${isDragging
                            ? "border-champagne bg-champagne/10"
                            : "border-border hover:border-champagne/50"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">
                                    {images.length === 0
                                        ? "Add product images"
                                        : "Add more images"}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Drag & drop or click • Max {maxSizeMB}MB per image • Up to{" "}
                                    {maxImages} images
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Helper Text */}
            {images.length > 0 && (
                <p className="text-xs text-muted-foreground">
                    First image will be used as the cover. Drag to reorder (coming soon).
                </p>
            )}
        </div>
    );
}
