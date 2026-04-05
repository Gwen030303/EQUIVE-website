import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

interface Subscriber {
  email: string;
  name?: string;
  size?: string;
  source?: string;
  type: "newsletter" | "waitlist" | "collection-drop";
  timestamp: string;
}

async function readSubscribers(): Promise<Subscriber[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, size, source, type } = body;

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email en type zijn verplicht." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres." },
        { status: 400 }
      );
    }

    const subscribers = await readSubscribers();

    const existing = subscribers.find(
      (s) => s.email === email && s.type === type
    );
    if (existing) {
      return NextResponse.json({ success: true, message: "Al ingeschreven." });
    }

    subscribers.push({
      email,
      name: name || undefined,
      size: size || undefined,
      source: source || undefined,
      type,
      timestamp: new Date().toISOString(),
    });

    await writeSubscribers(subscribers);

    // TODO: Vervang dit met Klaviyo API call wanneer je API key hebt:
    // await fetch("https://a.klaviyo.com/api/v2/list/LIST_ID/subscribe", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     api_key: process.env.KLAVIYO_API_KEY,
    //     profiles: [{ email, first_name: name, properties: { size, source, type } }],
    //   }),
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Er ging iets mis." },
      { status: 500 }
    );
  }
}
