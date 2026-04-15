import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ------------------------------------------------------------------ */
/*  Hostinger SMTP config                                              */
/* ------------------------------------------------------------------ */

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_USER || "info@equive.shop";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@equive.shop";

const VALID_TYPES = ["newsletter", "waitlist", "collection-drop"] as const;
type SubscribeType = (typeof VALID_TYPES)[number];

/* ------------------------------------------------------------------ */
/*  Email templates                                                    */
/* ------------------------------------------------------------------ */

function waitlistConfirmationEmail(name?: string) {
  const greeting = name ? `Hey ${name}` : "Hey";
  return {
    subject: "Je staat op de lijst — EQUIVE Early Access",
    html: `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F7F5F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F5F2;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr><td style="background-color:#0A0A0A;padding:32px 40px;text-align:center;">
          <img src="https://www.equive.shop/logo-email.webp" alt="EQUIVE" height="40" style="height:40px;width:auto;" />
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 40px 32px;">
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0A0A0A;line-height:1.2;">
            Je staat op de lijst.
          </h1>
          <p style="margin:0 0 16px;font-size:15px;color:#0A0A0A;line-height:1.7;">
            ${greeting},
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#0A0A0A;line-height:1.7;">
            Welkom bij EQUIVE Early Access. Je bent één van de eerste ruiters die The Signature gaat dragen — een rijbroek waar je geen keuze hoeft te maken tussen comfort en stijl.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#0A0A0A;line-height:1.7;">
            Wat dit voor jou betekent:
          </p>

          <!-- Benefits -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td style="padding:12px 16px;background-color:#F7F5F2;border-radius:8px;">
              <p style="margin:0;font-size:14px;color:#0A0A0A;line-height:1.6;">
                <strong style="color:#B08D57;">Early access prijs</strong> — €64,95 in plaats van €79,95
              </p>
            </td></tr>
            <tr><td style="height:8px;"></td></tr>
            <tr><td style="padding:12px 16px;background-color:#F7F5F2;border-radius:8px;">
              <p style="margin:0;font-size:14px;color:#0A0A0A;line-height:1.6;">
                <strong style="color:#B08D57;">Eerste toegang</strong> — je kunt bestellen vóór de officiële launch
              </p>
            </td></tr>
            <tr><td style="height:8px;"></td></tr>
            <tr><td style="padding:12px 16px;background-color:#F7F5F2;border-radius:8px;">
              <p style="margin:0;font-size:14px;color:#0A0A0A;line-height:1.6;">
                <strong style="color:#B08D57;">Beperkte oplage</strong> — alleen voor de eerste 100 klanten
              </p>
            </td></tr>
          </table>

          <p style="margin:0 0 8px;font-size:15px;color:#0A0A0A;line-height:1.7;">
            We mailen je zodra het zover is.
          </p>
          <p style="margin:0;font-size:15px;color:#B08D57;font-style:italic;">
            Tot snel in het zadel.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;border-top:1px solid #F0EDE8;">
          <p style="margin:0;font-size:12px;color:#0A0A0A;opacity:0.4;line-height:1.6;text-align:center;">
            EQUIVE — Premium Rijkleding, Amsterdam
            <br>
            <a href="https://www.equive.shop" style="color:#B08D57;text-decoration:none;">equive.shop</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

function newsletterConfirmationEmail(name?: string) {
  const greeting = name ? `Hey ${name}` : "Hey";
  return {
    subject: "Welkom bij EQUIVE",
    html: `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F7F5F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F5F2;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;">
        <tr><td style="background-color:#0A0A0A;padding:32px 40px;text-align:center;">
          <img src="https://www.equive.shop/logo-email.webp" alt="EQUIVE" height="40" style="height:40px;width:auto;" />
        </td></tr>
        <tr><td style="padding:40px;">
          <h1 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#0A0A0A;">Welkom bij EQUIVE</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#0A0A0A;line-height:1.7;">${greeting},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#0A0A0A;line-height:1.7;">
            Leuk dat je erbij bent. We houden je op de hoogte van nieuwe collecties, updates en exclusieve acties.
          </p>
          <p style="margin:0;font-size:15px;color:#B08D57;font-style:italic;">Tot snel in het zadel.</p>
        </td></tr>
        <tr><td style="padding:24px 40px 32px;border-top:1px solid #F0EDE8;">
          <p style="margin:0;font-size:12px;color:#0A0A0A;opacity:0.4;line-height:1.6;text-align:center;">
            EQUIVE — Premium Rijkleding, Amsterdam<br>
            <a href="https://www.equive.shop" style="color:#B08D57;text-decoration:none;">equive.shop</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, size, source, type } = body as {
      email?: string;
      name?: string;
      size?: string;
      source?: string;
      type?: string;
    };

    /* ---------- Validation ---------- */

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email en type zijn verplicht." },
        { status: 400 },
      );
    }

    if (!VALID_TYPES.includes(type as SubscribeType)) {
      return NextResponse.json(
        { error: "Ongeldig aanmeldtype." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres." },
        { status: 400 },
      );
    }

    /* ---------- Send emails ---------- */

    const template =
      type === "waitlist" || type === "collection-drop"
        ? waitlistConfirmationEmail(name)
        : newsletterConfirmationEmail(name);

    // Send confirmation to subscriber
    await transporter.sendMail({
      from: `EQUIVE <${FROM_EMAIL}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    // Notification to owner (non-blocking)
    transporter.sendMail({
      from: `EQUIVE <${FROM_EMAIL}>`,
      to: NOTIFY_EMAIL,
      subject: `Nieuwe ${type} aanmelding — ${email}`,
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.8;color:#333;">
        <h2 style="margin:0 0 16px;">Nieuwe aanmelding</h2>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Naam:</strong> ${name}</p>` : ""}
        ${size ? `<p><strong>Maat:</strong> ${size}</p>` : ""}
        ${source ? `<p><strong>Bron:</strong> ${source}</p>` : ""}
        <p><strong>Tijd:</strong> ${new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" })}</p>
      </div>`,
    }).catch((err) => console.error("[subscribe] Owner notification failed:", err));

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[subscribe] Error:", message);
    return NextResponse.json(
      { error: `E-mail kon niet worden verzonden: ${message}` },
      { status: 500 },
    );
  }
}
