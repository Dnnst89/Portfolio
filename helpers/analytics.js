// analytics.js
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID);
// analytics function used to track when users clicks on a product
const trackEvent = (category, action, label, value, initialAge, finalAge) => {
  let transport =
    initialAge !== undefined
      ? "De " + initialAge + " a " + finalAge + " años"
      : null; //variable to map the age range in analytics
  ReactGA.event({
    category,
    action,
    label,
    value,
    transport,
  });
};

export default trackEvent;
