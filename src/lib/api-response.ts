import { NextResponse } from "next/server";

export function successResponse(data: any, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 500, errors: any = null) {
    return NextResponse.json(
        { 
            success: false, 
            error: message, 
            ...(errors && { details: errors }) 
        }, 
        { status }
    );
}

// Error parsing logic helper
export function handleApiError(error: any) {
    console.error("API Error encountered:", error);
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((val: any) => val.message);
        return errorResponse("Validation Failed", 400, messages);
    }
    if (error.code === 11000) {
        return errorResponse("Duplicate key error: Unique resource already exists.", 409);
    }
    return errorResponse(error.message || "Internal Server Error", 500);
}