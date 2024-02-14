// analytics.js
import ReactGA from 'react-ga4';

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID);
// analytics function used to track when users clicks on a product
const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

export default trackEvent;
