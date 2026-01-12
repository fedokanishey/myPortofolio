import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the webhook signing secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }

  // Handle the webhook
  const eventType = evt.type;

  // Connect to database
  await connectDB();

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const user = await User.create({
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      image: image_url,
    });

    console.log("User created:", user);
    return NextResponse.json({ message: "User created", user }, { status: 201 });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
        image: image_url,
      },
      { new: true }
    );

    console.log("User updated:", user);
    return NextResponse.json({ message: "User updated", user }, { status: 200 });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const user = await User.findOneAndDelete({ clerkId: id });

    console.log("User deleted:", user);
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
