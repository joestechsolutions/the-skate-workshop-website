import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isEmailInWaitlist, addToWaitlist } from "@/lib/waitlist-store";

// Waitlist signups land in Supabase (public.waitlist in The Skate Workshop's own
// project). This used to write a JSON file under process.cwd() (which silently
// failed in serverless) and email via nodemailer/SMTP over raw TCP (which cannot
// run under the edge runtime that Cloudflare Pages requires). The emails are gone
// from the request path; the database row is now the record, and Joe reviews the
// waitlist in the Supabase dashboard. If email notifications come back, they go
// through an HTTP mail API — not raw TCP SMTP — so the route stays edge-safe.

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = waitlistSchema.parse(body);
    const email = validatedData.email.trim().toLowerCase();

    const alreadyOnList = await isEmailInWaitlist(email);
    if (alreadyOnList) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll notify you when we launch." },
        { status: 400 }
      );
    }

    await addToWaitlist(email, validatedData.name);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        email,
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

    console.error("Waitlist API error:", error);

    return NextResponse.json(
      {
        message: "Failed to join waitlist. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Cloudflare Pages (next-on-pages): this route must run on the edge runtime.
// Supabase storage is pure fetch-based HTTP, so it is edge-safe.
export const runtime = "edge";