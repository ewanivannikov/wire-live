import { logger } from "../LoggerService";

const swUrl = new URL('./service.worker', import.meta.url);
console.log('swUrl', swUrl);

export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(swUrl, {
        scope: "/api",
      });
      if (registration.installing) {
        logger.debug("Service worker installing");
      } else if (registration.waiting) {
        logger.debug("Service worker installed");
      } else if (registration.active) {
        logger.debug("Service worker active");
      }
    } catch (error) {
      logger.error(`Registration failed with ${error}`);
    }
  }
};
