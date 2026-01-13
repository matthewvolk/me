import { GoogleAnalytics as GA } from "@next/third-parties/google";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return <GA gaId={GA_TRACKING_ID} />;
}

export { sendGAEvent } from "@next/third-parties/google";
