// Utilidad para exponer variables de entorno en Remix (Vite)

export function getEnv() {
  return {
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || "",
  };
}
