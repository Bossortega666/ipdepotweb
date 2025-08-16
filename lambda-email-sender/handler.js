// handler.js

// handler.js  (Node.js 18+ recomendado)

const nodemailer = require("nodemailer");

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const MIN_SCORE = parseFloat(process.env.RECAPTCHA_MIN_SCORE || "0.5"); // ajusta 0.3–0.7 según tu tráfico

// Helper CORS
const cors = (statusCode, bodyObj = {}) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  },
  body: JSON.stringify(bodyObj),
});

// Verificación reCAPTCHA v3
async function verifyRecaptcha(token, expectedAction, remoteip) {
  if (!token) return { ok: false, result: { reason: "missing_token" } };

  const params = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET,
    response: token,
  });
  if (remoteip) params.set("remoteip", remoteip);

  // Node 18+ trae fetch nativo
  const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const result = await r.json(); // { success, score, action, ... }

  const ok =
    result.success === true &&
    (result.score ?? 1) >= MIN_SCORE &&
    (!expectedAction || result.action === expectedAction);

  return { ok, result };
}

exports.handler = async (event) => {
  // Preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return cors(200);
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const {
      name = "",
      email = "",
      phone = "",
      companyName = "",
      companyLine = "",
      message = "",
      recaptchaToken,
      recaptchaAction = "contact_form", // desde el frontend
    } = body;

    // 1) Verificar reCAPTCHA
    const remoteip =
      event.requestContext?.http?.sourceIp ||
      event.requestContext?.identity?.sourceIp;

    const { ok, result } = await verifyRecaptcha(
      recaptchaToken,
      recaptchaAction,
      remoteip
    );

    if (!ok) {
      console.warn("reCAPTCHA failed", {
        expected: recaptchaAction,
        result,
        ip: remoteip,
      });
      return cors(403, { message: "Captcha inválido" });
    }

    // 2) Validaciones mínimas
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return cors(400, { message: "Faltan campos obligatorios." });
    }

    // 3) Transport SMTP (usa variables de entorno)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                 // p.ej. "smtp.gmail.com"
      port: Number(process.env.SMTP_PORT || 465),  // 465 SSL
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,               // NO hardcodear
        pass: process.env.SMTP_PASS,               // App Password si Gmail
      },
    });

    // 4) Email
    const mailFrom =
      process.env.MAIL_FROM || '"Mi Sitio Web" <no-reply@tudominio.com>';
    const mailTo = process.env.MAIL_TO || "destinatario@tudominio.com";

    const text = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      companyName ? `Empresa: ${companyName}` : null,
      companyLine ? `Giro: ${companyLine}` : null,
      "",
      "Mensaje:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: "Nuevo mensaje de contacto",
      text,
    });

    return cors(200, { message: "Correo enviado", id: info.messageId });
  } catch (err) {
    console.error("SendEmail error:", err);
    return cors(500, { message: "Error al enviar correo." });
  }
};

