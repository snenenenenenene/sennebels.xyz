export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

export const pageview = () => {
  const url = window.location.pathname;
  // @ts-ignore ts(2339)
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  // @ts-ignore ts(2339)
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
