declare global {
  interface Window {
    _env_?: {
      VITE_API_PROTOCOL?: string;
      VITE_API_HOST?: string;
      VITE_API_PORT?: string;
    };
  }
}

const protocol =
  window._env_?.VITE_API_PROTOCOL ??
  import.meta.env.VITE_API_PROTOCOL ??
  "http";
const host =
  window._env_?.VITE_API_HOST ?? import.meta.env.VITE_API_HOST ?? "localhost";
const port =
  window._env_?.VITE_API_PORT ?? import.meta.env.VITE_API_PORT ?? "3000";

export const API_BASE_URL = `${protocol}://${host}:${port}`;
