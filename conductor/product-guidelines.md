# Product Guidelines - The Skate Workshop Website

## Tone & Voice
The website's communication style must balance three key pillars to reflect Willy Santos's unique coaching philosophy:

1.  **Professional & Authority-Driven:** Emphasize Willy's Olympic-level credentials, 30+ years of experience, and technical mastery. Use data points (e.g., "400+ tricks", "Commission Skateboard France") to prove "best in the world" status.
2.  **Inspirational & High-Energy:** Capture the "stoke" of skateboarding. Use active language that motivates athletes to push their limits.
3.  **Community-Focused & Authentic:** Maintain the welcoming, inclusive vibe of "Willy's Workshop." Acknowledge the roots of street skating and the importance of the crew.

## Visual Identity (Updated for App Consistency)
The website's design must strictly adhere to the new **Primal Training Inspired** design system and the mobile app's **Design Tokens (v1.0)** to ensuring a seamless cross-platform experience.

### Core Principles
*   **Best Designed in the World:** Aim for a "Minimalist Luxury" aesthetic with "Gritty & Raw" undertones.
*   **Bold Typography:** Use tight letter-spacing and heavy weights (700-800) for headlines to create impact.
*   **Generous Spacing:** Utilize the new 8px-based spacing scale with large gaps (56px, 80px, 92px) to create breathing room.
*   **High Contrast:** Maintain a stark Black/White/Red palette.

### Color Palette (Synced with Mobile App)
*   **Primary Brand:** `Workshop Red #D7232B` (hover/pressed `#B31E25`, light tint `#E4555C`). Used for primary actions, badges, and focus states.
*   **Background:** `Dark Grey #121212` (Softer Dark Mode).
*   **Surface:** `Gray #1F2937` (Dark Gray). Used for cards, inputs, and navigation backgrounds.
*   **Text:**
    *   Primary: `White #FFFFFF`
    *   Secondary: `Gray #9CA3AF` (Gray 400)
    *   Muted: `Gray #6B7280` (Gray 500)

### Typography
*   **Primary Font:** `Spline Sans` (Google Font). Used for all text to match the mobile app's "street/skate" feel.
    *   **Headlines:** Bold/ExtraBold, Tight tracking (-0.02em to -0.05em).
    *   **Body:** Regular/Medium, Clean and readable.
    *   **Mono:** `Geist Mono` or `JetBrains Mono` for technical labels/stats.

### UI Components
*   **Cards:** Dark Gray (`#1F2937`) backgrounds with subtle borders (`#374151`).
*   **Buttons:**
    *   Primary: White Background (`#FFFFFF`) with Black Text (`#000000`).
    *   Secondary: Dark Gray Background (`#1F2937`) with White Text (`#FFFFFF`).
*   **Badges:** High-contrast pill shapes.
    *   "Coming Soon": Red text on transparent red bg (`rgba(215, 35, 43, 0.2)`).

### Assets
*   **Logo/Icon:** The source truth for the icon is located at `C:\Users\blasj\Projects\the-skate-workshop-rebuild\images\icon.png`. This should replace the existing assets in `public/images/logo/`.

## Design Implementation Strategy
1.  **Design tokens:** `brand.primary #D7232B`, `brand.red-dark`, `brand.red-light` in `tailwind.config.ts`; no second accent.
2.  **Font Migration:** Switch from `Anek Tamil/Inter` to `Spline Sans` throughout the application.
3.  **Component Refactor:** Update Card and Button components to match the new "Dark Gray Surface" style instead of the previous "Black on Black" approach.
