import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/waitlist-store";

// Coach applications land in Supabase (public.coach_applications in The Skate
// Workshop's own project). This used to email via nodemailer/SMTP over raw TCP,
// which cannot run under the edge runtime that Cloudflare Pages requires — the
// storage is now the record; email notifications can return later through an
// HTTP mail API without breaking the edge invariant.

// Validation schema for coach application
const coachApplicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  yearsExperience: z.string().min(1, "Years of experience is required"),
  message: z
    .string()
    .min(10, "Please tell us why you want to join (at least 10 characters)"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = coachApplicationSchema.parse(body);

    const { error } = await getSupabaseAdmin()
      .from("coach_applications")
      .insert({ payload: validatedData });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      {
        success: true,
        message: "Application received! We'll be in touch soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data provided", errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Coach application API error:", error);

    return NextResponse.json(
      {
        message: "Failed to submit application. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Cloudflare Pages (next-on-pages): this route must run on the edge runtime.
export const runtime = "edge";