/** Публичные контакты; задайте в .env: NEXT_PUBLIC_CONTACT_EMAIL */
export const CONTACT_EMAIL =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_CONTACT_EMAIL
    ? process.env.NEXT_PUBLIC_CONTACT_EMAIL
    : "contact@example.com";
