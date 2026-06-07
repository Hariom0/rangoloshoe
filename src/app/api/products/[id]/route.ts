import { NextRequest } from "next/server";
import dbconnect from "@/lib/db";
import Footware from "@/models/Footware";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { successResponse, handleApiError, errorResponse } from "@/lib/api-response";


interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await dbconnect();

        // 1. Await and extract the comma-separated IDs/slugs string
        const { id } = await params;

        if (!id) {
            return errorResponse("Missing identifiers in path", 400);
        }

        // 2. Clean the string and split it into an array
        const list: string[] = id
            .trim()
            .split(",")
            .map((item) => item.trim());

        // 3. Fix Mongoose syntax: Use the $in operator to query multiple items
        const products = await Footware.find({
            slug: { $in: list },
        });

        // 4. Return error if no matching products were found
        if (products.length === 0) {
            return errorResponse("Products not found", 404);
        }

        return successResponse(products);
    } catch (error) {
        return handleApiError(error);
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await dbconnect();
        const formData = await request.formData();
        const { id } = await params;

        const product = await Footware.findOne({ slug: id });
        if (!product) {
            return errorResponse("Product not found", 404);
        }

        const updateFields: any = {};

        // 1. Update basic scalar fields
        ["name", "slug", "description", "gender", "category", "price", "discountPrice", "is_fresh_drop", "is_bestseller", "isActive"].forEach((field) => {
            if (formData.has(field)) {
                if (field === "price" || field === "discountPrice") {
                    updateFields[field] = Number(formData.get(field));
                } else if (field === "isActive") {
                    updateFields[field] = formData.get(field) === "true";
                } else {
                    updateFields[field] = formData.get(field);
                }
            }
        });

        // 2. Update variants
        if (formData.has("variants")) {
            updateFields.variants = JSON.parse(formData.get("variants") as string);
        }

        // 3. Reconstruct Media Array (Retained + New)
        if (formData.has("mediaMetadata")) {
            const mediaMetadata = JSON.parse((formData.get("mediaMetadata") as string) || "[]");
            const retainedMedia = JSON.parse((formData.get("retainedMedia") as string) || "[]");
            const uploadedFiles = formData.getAll("files") as File[];

            const newImagesArray: any[] = [];

            // Step A: Process retained existing images first
            for (let i = 0; i < retainedMedia.length; i++) {
                newImagesArray.push({
                    url: retainedMedia[i].url,
                    altText: mediaMetadata[i]?.altText || retainedMedia[i].altText,
                    isPrimary: mediaMetadata[i]?.isPrimary || false,
                    // Keep original _id if your schema uses subdocument IDs
                    ...(retainedMedia[i]._id && { _id: retainedMedia[i]._id }),
                });
            }

            // Step B: Process newly uploaded files and append them
            const offset = retainedMedia.length; // Metadata index offset for new files
            for (let i = 0; i < uploadedFiles.length; i++) {
                const file = uploadedFiles[i];
                const buffer = Buffer.from(await file.arrayBuffer());

                // Upload to Cloudinary
                const cloudinaryResult = await uploadToCloudinary(buffer, (updateFields.category || product.category || "general").toLowerCase());

                const metaIndex = offset + i;
                newImagesArray.push({
                    url: cloudinaryResult.secure_url,
                    altText: mediaMetadata[metaIndex]?.altText || `${updateFields.name || product.name} asset`,
                    isPrimary: mediaMetadata[metaIndex]?.isPrimary || false,
                });
            }

            // Assign the entirely reconstructed array back to the product
            updateFields.images = newImagesArray;
        }
        console.log(updateFields, formData);
        
        // 4. Save to Database
        const updatedProduct = await Footware.findOneAndUpdate({ slug: id }, updateFields, { new: true, runValidators: true });

        return successResponse(updatedProduct);
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await dbconnect();
        const { id } = await params;
        const product = await Footware.findOne({ slug: id });

        if (!product) {
            return errorResponse("Product not found", 404);
        }

        // Clean up linked asset payloads from Cloudinary buckets to prevent dead file accumulations
        if (product.images && product.images.length > 0) {
            for (const item of product.images) {
                await deleteFromCloudinary(item.url);
            }
        }

        await Footware.findOneAndDelete({ slug: id });
        return successResponse({ message: "Product and matching remote assets deleted successfully" });
    } catch (error) {
        return handleApiError(error);
    }
}