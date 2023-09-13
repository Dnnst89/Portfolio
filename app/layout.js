"use client";
import { Providers } from "@/redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "@/src/graphQl/config";

import NavCategories from "./layouts/includes/NavCategories";
import NavMenu from "./layouts/includes/NavMenu";
import Footer from "./layouts/includes/Footer";

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
        <ApolloProvider client={client}>
          <Providers>
            <NavMenu />
            <NavCategories />
            {children}
            <Footer />
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  );
}
