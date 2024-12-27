import createCache from "@emotion/cache";

// Personaliza la caché para trabajar con Material-UI
export const createEmotionCache = () =>
  createCache({ key: "css", prepend: true });
