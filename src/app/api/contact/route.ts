import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/waitlist-store";

// Contact form submissions land in Supabase (public.contact_submissions in The
// Skate Workshop's own project). This used to email via nodemailer/SMTP over raw
// TCP, which cannot run under the edge runtime that Cloudflare Pages requires —
// the storage is now the record, and email notifications can return later through
// an HTTP mail API without breaking the edge invariant.

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  inquiryType: z.enum([
    "general",
    "coaching",
    "team",
    "support",
    "press",
    "partnership",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    const { error } = await getSupabaseAdmin()
      .from("contact_submissions")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        inquiry_type: validatedData.inquiryType,
        message: validatedData.message,
      });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      {
        success: true,
        message: "Message received! We'll get back to you soon.",
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

    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        message: "Failed to send message. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Cloudflare Pages (next-on-pages): this route must run on the edge runtime.
export const runtime = "edge";