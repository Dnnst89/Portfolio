import { Providers } from "@/redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import ApolloProviders from "@/src/graphQl/ApolloProviders";
import { GoogleAnalytics } from '@next/third-parties/google';

require("dotenv").config();

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "detinmarin",
  description: "DetinMarin",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (    
      <html lang="en">
        <body className={`${poppins.className} bg-floralwhite`}>
          <ApolloProviders>
            <Providers>{children}</Providers>
          </ApolloProviders>
        </body>
        {/* Adding GOOGLE ANALYTICS for all routes in the app. */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}/>
      </html>
  );
}
