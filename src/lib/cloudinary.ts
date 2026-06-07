import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer directly to Cloudinary
 */
export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                folder: `footware_store/${folder}`, 
                resource_type: "auto" // Automatically handles both images and videos
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

/**
 * Helper to extract Cloudinary public ID from a URL to delete old media files
 */
export const deleteFromCloudinary = async (url: string) => {
    try {
        // Extracts the public ID from standard cloudinary URL configurations
        const URLParts = url.split("/");
        const fileWithName = URLParts.pop();
        const folderName = URLParts.pop();
        if (!fileWithName || !folderName) return;
        
        const publicId = `footware_store/${folderName}/${fileWithName.split(".")[0]}`;
        const isVideo = url.includes("/video/");
        
        await cloudinary.uploader.destroy(publicId, { 
            resource_type: isVideo ? "video" : "image" 
        });
    } catch (error) {
        console.error("Cloudinary deletion failed:", error);
    }
};