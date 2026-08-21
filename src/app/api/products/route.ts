import dbconnect from "@/lib/db";
import Footware from "@/models/Footware";
import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { successResponse, handleApiError, errorResponse } from "@/lib/api-response";
import { requireAuth, unauthorizedResponse } from "@/lib/checkAuth";
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;

	// Parse numbers properly upfront
	const page = Number(searchParams.get("page") || 1);
	const limit = Number(searchParams.get("limit") || 12);
	const skip = (page - 1) * limit;

	const size = searchParams.get("size");
	const category = searchParams.get("category") || "ALL";
	const gender = searchParams.get("gender") || "ALL";

	// FIX: Explicitly check for the string "true"
	const freshDrop = searchParams.get("fresh-drop") === "true";
	const bestSeller = searchParams.get("best-seller") === "true";

	// Dynamic query building
	const filter: Record<string, any> = {};
	if (category !== "ALL") filter.category = category;
	if (gender !== "ALL") filter.gender = gender;
	if (size) filter.size = size;
	if (freshDrop) filter.is_fresh_drop = true;
	if (bestSeller) filter.is_bestseller = true;

	await dbconnect();

	try {
		// Parallel execution keeps things fast
		const [products, categories, genders, total] = await Promise.all([
			Footware.find(filter).skip(skip).limit(limit),
			Footware.distinct("category"),
			Footware.distinct("gender"),
			Footware.countDocuments(filter),
		]);

		return NextResponse.json({ products, categories, genders, total });
	} catch (error) {
		console.error("Database fetch error:", error);
		// FIX: Added return statement and a 500 status code
		return NextResponse.json({ msg: "Failed to fetch data" }, { status: 500 });
	}
}
export async function POST(request: NextRequest) {
	try {
		const session = await requireAuth();

		if (!session?.user) {
			return unauthorizedResponse();
		}

		await dbconnect();
		const formData = await request.formData();

		// 1. Extract and validate text input fields
		const name = formData.get("name") as string;
		const slug = formData.get("slug") as string;
		const description = formData.get("description") as string;
		const gender = formData.get("gender") as string;
		const is_fresh_drop = formData.get("is_fresh_drop")
		const is_bestseller = formData.get("is_bestseller")
		const category = formData.get("category") as string;
		const price = Number(formData.get("price"));
		const discountPrice = formData.get("discountPrice") ? Number(formData.get("discountPrice")) : undefined;

		// Parse arrays sent as JSON strings
		const variants = JSON.parse((formData.get("variants") as string) || "[]");
		const mediaMetadata = JSON.parse((formData.get("mediaMetadata") as string) || "[]");

		// Fail early before performing costly file uploads if slug conflict exists
		const existingProduct = await Footware.findOne({ slug });
		if (existingProduct) {
			return errorResponse("A product with this URL slug already exists", 400);
		}

		// 2. Capture and process files array
		const uploadedFiles = formData.getAll("files") as File[];
		const imagesArray: any[] = [];

		for (let i = 0; i < uploadedFiles.length; i++) {
			const file = uploadedFiles[i];
			const buffer = Buffer.from(await file.arrayBuffer());

			// Upload file to Cloudinary
			const cloudinaryResult = await uploadToCloudinary(buffer, category.toLowerCase());

			// Link metadata sent relative to file indices
			imagesArray.push({
				url: cloudinaryResult.secure_url,
				altText: mediaMetadata[i]?.altText || `${name} media asset`,
				isPrimary: mediaMetadata[i]?.isPrimary || i === 0,
			});
		}

		// 3. Persist product records into MongoDB
		const newProduct = await Footware.create({
			name,
			slug,
			description,
			gender,
			category,
			is_bestseller,
			is_fresh_drop,
			price,
			discountPrice,
			variants,
			images: imagesArray,
		});

		return successResponse(newProduct, 201);
	} catch (error) {
		return handleApiError(error);
	}
}

// export async function POST(request: NextRequest) {
//   try {
//     await dbconnect();

//     const formData = await request.formData();

//     const name = formData.get("name") as string;
//     const slug = formData.get("slug") as string;
//     const description = formData.get("description") as string;
//     const gender = formData.get("gender") as string;
//     const category = formData.get("category") as string;

//     const is_fresh_drop = formData.get("is_fresh_drop") === "true";
//     const is_bestseller = formData.get("is_bestseller") === "true";

//     const price = Number(formData.get("price"));

//     const discountPrice = formData.get("discountPrice")
//       ? Number(formData.get("discountPrice"))
//       : undefined;

//     const variants = JSON.parse(
//       (formData.get("variants") as string) || "[]"
//     );

//     const mediaMetadata = JSON.parse(
//       (formData.get("mediaMetadata") as string) || "[]"
//     );

//     // Array of image URLs
//     const imageUrls = JSON.parse(
//       (formData.get("imageUrls") as string) || "[]"
//     );

//     const existingProduct = await Footware.findOne({ slug });

//     if (existingProduct) {
//       return errorResponse(
//         "A product with this URL slug already exists",
//         400
//       );
//     }

//     const imagesArray = [];

//     for (let i = 0; i < imageUrls.length; i++) {
//       const imageUrl = imageUrls[i];

//       const cloudinaryResult = await uploadUrlToCloudinary(
//         imageUrl,
//         category.toLowerCase()
//       );

//       imagesArray.push({
//         url: cloudinaryResult.secure_url,
//         public_id: cloudinaryResult.public_id,
//         altText:
//           mediaMetadata[i]?.altText ||
//           `${name} media asset`,
//         isPrimary:
//           mediaMetadata[i]?.isPrimary ?? i === 0,
//       });
//     }

//     const newProduct = await Footware.create({
//       name,
//       slug,
//       description,
//       gender,
//       category,
//       is_bestseller,
//       is_fresh_drop,
//       price,
//       discountPrice,
//       variants,
//       images: imagesArray,
//     });

//     return successResponse(newProduct, 201);
//   } catch (error) {
//     return handleApiError(error);
//   }
// }