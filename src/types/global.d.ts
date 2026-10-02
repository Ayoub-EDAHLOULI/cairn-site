export {};

declare global {
  interface Window {
    /** Set by MotionReady once the app has hydrated; read by the motion safety net in <head>. */
    __cairnReady?: boolean;
  }
}
