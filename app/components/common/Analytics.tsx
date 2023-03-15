// // I COULD END UP USING THIS IF I SWITCH TO FATHOM FOR ANALYTICS
// import { useEffect } from "react";
"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

const Analytics = () => {
  //   useEffect(() => {
  //     Fathom.load("YOUR_FATHOM_TRACKING_CODE", {
  //       includedDomains: ["yourdomain.com"],
  //     });

  //     const onRouteChange = () => Fathom.trackPageview();

  //     window.addEventListener("routeChange", onRouteChange);
  //     return () => window.removeEventListener("routeChange", onRouteChange);
  //   }, []);

  return <GoogleAnalytics trackPageViews strategy={"afterInteractive"} />;
};

export default Analytics;
