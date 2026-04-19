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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function waitlistConfirmationEmail(name?: string) {
  const heading = name ? `Welkom, ${capitalize(name)}.` : "Je staat op de lijst.";
  return {
    subject: "Je staat op de lijst — EQUIVE Early Access",
    html: `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#FAFAF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#1a1a1a; -webkit-font-smoothing: antialiased;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FAFAF7;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; background:#ffffff; border:1px solid #E8E5DE;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding: 40px 32px 32px 32px; border-bottom: 1px solid #E8E5DE;">
              <a href="https://www.equive.shop" style="text-decoration:none; color:#000000;">
                <img src="https://www.equive.shop/logo-email.png" alt="EQUIVE" width="220" style="display:block; border:0; outline:none; max-width:220px; height:auto;">
              </a>
            </td>
          </tr>

          <!-- Hero greeting -->
          <tr>
            <td style="padding: 48px 40px 0 40px;">
              <p style="margin:0 0 12px 0; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color:#B8A691; font-weight: 600;">Early Access</p>
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 34px; line-height: 1.15; font-weight: 700; color:#000000; letter-spacing: -0.01em;">${heading}</h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 20px 40px 36px 40px;">
              <p style="margin:0 0 16px 0; font-size: 16px; line-height: 1.65; color:#3a3a3a;">
                Je bent één van de eerste ruiters die The Signature gaat dragen — een rijbroek waar je geen keuze hoeft te maken tussen comfort en stijl.
              </p>
              <p style="margin:0; font-size: 16px; line-height: 1.65; color:#3a3a3a;">
                Zodra het zover is, ben jij de eerste die het hoort.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 0 40px 44px 40px;">
              <a href="https://www.equive.shop" style="display:inline-block; background:#000000; color:#ffffff; text-decoration:none; padding: 16px 40px; font-size: 12px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;">
                Bekijk de collectie
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="border-top: 1px solid #E8E5DE; height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</div>
            </td>
          </tr>

          <!-- Benefits -->
          <tr>
            <td style="padding: 36px 40px 0 40px;">
              <p style="margin:0 0 20px 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color:#B8A691; font-weight: 600;">Wat dit voor jou betekent</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 36px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #F2F0EA;">
                    <p style="margin:0 0 4px 0; font-size: 14px; font-weight: 600; color:#000000;">Early access prijs</p>
                    <p style="margin:0; font-size: 14px; color:#7a7a7a;">\u20AC64,95 in plaats van \u20AC79,99</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #F2F0EA;">
                    <p style="margin:0 0 4px 0; font-size: 14px; font-weight: 600; color:#000000;">Eerste toegang</p>
                    <p style="margin:0; font-size: 14px; color:#7a7a7a;">Bestel vóór de officiële launch</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0;">
                    <p style="margin:0 0 4px 0; font-size: 14px; font-weight: 600; color:#000000;">Beperkte oplage</p>
                    <p style="margin:0; font-size: 14px; color:#7a7a7a;">Alleen voor de eerste 100 klanten</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- USP bar -->
          <tr>
            <td style="background:#FAFAF7; padding: 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" width="33%" style="padding: 0 6px;">
                    <p style="margin:0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color:#000000; font-weight: 700;">Gratis verzending</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color:#7a7a7a;">in NL & BE</p>
                  </td>
                  <td align="center" width="33%" style="padding: 0 6px;">
                    <p style="margin:0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color:#000000; font-weight: 700;">30 dagen retour</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color:#7a7a7a;">geen gedoe</p>
                  </td>
                  <td align="center" width="33%" style="padding: 0 6px;">
                    <p style="margin:0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color:#000000; font-weight: 700;">Premium kwaliteit</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color:#7a7a7a;">comfort én stijl</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding: 44px 40px 36px 40px;">
              <p style="margin:0; font-size: 15px; line-height: 1.65; color:#3a3a3a; font-style: italic;">
                Heb je vragen? Reageer gewoon op deze mail — we antwoorden zo snel mogelijk persoonlijk.
              </p>
              <p style="margin: 18px 0 0 0; font-size: 14px; color:#000000; font-weight: 600;">— Het EQUIVE Team</p>
            </td>
          </tr>

        </table>

        <!-- Footer -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;">
          <tr>
            <td align="center" style="padding: 36px 16px 16px 16px;">
              <p style="margin: 0 0 18px 0; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color:#7a7a7a; font-weight: 500;">Volg ons voor inspiratie</p>
              <p style="margin: 0 0 28px 0;">
                <a href="https://instagram.com/equiveequestrian" style="display:inline-block; padding: 0 10px; font-size: 13px; color:#000000; text-decoration:none; font-weight: 600;">Instagram</a>
                <span style="color:#B8A691; padding: 0 4px;">·</span>
                <a href="https://www.equive.shop" style="display:inline-block; padding: 0 10px; font-size: 13px; color:#000000; text-decoration:none; font-weight: 600;">Website</a>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; color:#9a9a9a; letter-spacing: 0.06em;">EQUIVE EQUESTRIAN · AMSTERDAM</p>
              <p style="margin: 0; font-size: 11px; color:#9a9a9a;">
                <a href="mailto:support@equive.shop" style="color:#9a9a9a; text-decoration: underline;">support@equive.shop</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`,
  };
}

function newsletterConfirmationEmail(name?: string) {
  const heading = name ? `Welkom, ${capitalize(name)}.` : "Welkom bij EQUIVE.";
  return {
    subject: "Welkom bij EQUIVE",
    html: `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#FAFAF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#1a1a1a; -webkit-font-smoothing: antialiased;">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#FAFAF7;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px; background:#ffffff; border:1px solid #E8E5DE;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding: 40px 32px 32px 32px; border-bottom: 1px solid #E8E5DE;">
              <a href="https://www.equive.shop" style="text-decoration:none; color:#000000;">
                <img src="https://www.equive.shop/logo-email.png" alt="EQUIVE" width="220" style="display:block; border:0; outline:none; max-width:220px; height:auto;">
              </a>
            </td>
          </tr>

          <!-- Hero greeting -->
          <tr>
            <td style="padding: 48px 40px 0 40px;">
              <p style="margin:0 0 12px 0; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color:#B8A691; font-weight: 600;">Nieuwsbrief</p>
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 34px; line-height: 1.15; font-weight: 700; color:#000000; letter-spacing: -0.01em;">${heading}</h1>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 20px 40px 36px 40px;">
              <p style="margin:0 0 16px 0; font-size: 16px; line-height: 1.65; color:#3a3a3a;">
                Leuk dat je erbij bent. Vanaf nu houden we je op de hoogte van nieuwe collecties, exclusieve acties en alles rondom EQUIVE.
              </p>
              <p style="margin:0; font-size: 16px; line-height: 1.65; color:#3a3a3a;">
                Wij geloven dat je nooit hoeft te kiezen tussen comfort en stijl — en dat laten we je graag zien.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 0 40px 44px 40px;">
              <a href="https://www.equive.shop/shop" style="display:inline-block; background:#000000; color:#ffffff; text-decoration:none; padding: 16px 40px; font-size: 12px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;">
                Bekijk de shop
              </a>
            </td>
          </tr>

          <!-- USP bar -->
          <tr>
            <td style="background:#FAFAF7; padding: 32px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" width="33%" style="padding: 0 6px;">
                    <p style="margin:0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color:#000000; font-weight: 700;">Gratis verzending</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color:#7a7a7a;">in NL & BE</p>
                  </td>
                  <td align="center" width="33%" style="padding: 0 6px;">
                    <p style="margin:0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color:#000000; font-weight: 700;">30 dagen retour</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color:#7a7a7a;">geen gedoe</p>
                  </td>
                  <td align="center" width="33%" style="padding: 0 6px;">
                    <p style="margin:0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color:#000000; font-weight: 700;">Premium kwaliteit</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color:#7a7a7a;">comfort én stijl</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding: 44px 40px 36px 40px;">
              <p style="margin:0; font-size: 15px; line-height: 1.65; color:#3a3a3a; font-style: italic;">
                Heb je vragen? Reageer gewoon op deze mail — we antwoorden zo snel mogelijk persoonlijk.
              </p>
              <p style="margin: 18px 0 0 0; font-size: 14px; color:#000000; font-weight: 600;">— Het EQUIVE Team</p>
            </td>
          </tr>

        </table>

        <!-- Footer -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;">
          <tr>
            <td align="center" style="padding: 36px 16px 16px 16px;">
              <p style="margin: 0 0 18px 0; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color:#7a7a7a; font-weight: 500;">Volg ons voor inspiratie</p>
              <p style="margin: 0 0 28px 0;">
                <a href="https://instagram.com/equiveequestrian" style="display:inline-block; padding: 0 10px; font-size: 13px; color:#000000; text-decoration:none; font-weight: 600;">Instagram</a>
                <span style="color:#B8A691; padding: 0 4px;">·</span>
                <a href="https://www.equive.shop" style="display:inline-block; padding: 0 10px; font-size: 13px; color:#000000; text-decoration:none; font-weight: 600;">Website</a>
              </p>
              <p style="margin: 0 0 8px 0; font-size: 11px; color:#9a9a9a; letter-spacing: 0.06em;">EQUIVE EQUESTRIAN · AMSTERDAM</p>
              <p style="margin: 0; font-size: 11px; color:#9a9a9a;">
                <a href="mailto:support@equive.shop" style="color:#9a9a9a; text-decoration: underline;">support@equive.shop</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
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
    // Log de echte fout voor debugging, maar toon gebruiker een vriendelijke melding
    console.error("[subscribe] SMTP error:", message);
    return NextResponse.json(
      {
        error:
          "We konden je aanmelding nu niet verwerken. Probeer het zo opnieuw, of stuur een mailtje naar support@equive.shop.",
      },
      { status: 500 },
    );
  }
}
