import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./i18n/i18n";
import App from "./App";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
const root = ReactDOM.createRoot(container);

// 🔇 Solo en DEV: silencia el rechazo "null/undefined" de reCAPTCHA para que no salga el overlay
if (process.env.NODE_ENV === "development") {
  const recaptchaNullGuard = (e: PromiseRejectionEvent) => {
    // reason puede ser null o undefined
    if ((e as any)?.reason == null) {
      e.preventDefault();
      try {
        e.stopImmediatePropagation();
        e.stopPropagation();
      } catch {}
      console.warn('reCAPTCHA: rechazo "null" ignorado (solo dev)');
    }
  };
  window.addEventListener("unhandledrejection", recaptchaNullGuard, { capture: true });
}

// ⚠️ Si quieres evitar el doble montaje en dev, NO uses StrictMode:
root.render(
  // <React.StrictMode>
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
    useRecaptchaNet
    scriptProps={{ async: true, defer: true, appendTo: "head" }}
  >
    <App />
  </GoogleReCaptchaProvider>
  // </React.StrictMode>
);

reportWebVitals();
