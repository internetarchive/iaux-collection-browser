export {};

declare global {
  interface Window {
    archive_analytics: any; // 👈️ turn off type checking
  }
}
