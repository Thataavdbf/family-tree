// src/app/chaldean/analytics.ts
// Stub analytics service for ChaldeanPage

export function trackTabChange(tabKey: string) {
  // Replace this with a real analytics integration (e.g., Google Analytics, Segment, etc.)
  if (typeof window !== 'undefined') {
    // Example: window.gtag?.('event', 'tab_change', { tab: tabKey });
    // For now, just log to the console for demonstration
    console.info(`[analytics] Tab changed: ${tabKey}`);
  }
}
