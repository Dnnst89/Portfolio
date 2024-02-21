'use client';
import React, { useEffect } from "react";
import ReactGA from 'react-ga4';
import "../styles/fonts.css";

import MainLayout from './layouts/MainLayout';
export default function Home() {
    
     {/* Adding GOOGLE ANALYTICS for all routes in the app. */}
    React.useEffect(() => {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID);
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
      }, []);

    return <MainLayout></MainLayout>;
}
