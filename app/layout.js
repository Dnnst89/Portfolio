import { Providers } from "@/redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import ApolloProviders from "@/src/graphQl/ApolloProviders";
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
      <body
        className={`${poppins.className} bg-[length:60%] lg:bg-[length:25%] bg-center bg-[url('https://detinmarin-aws-s3-images-bucket.s3.us-west-2.amazonaws.com/2_Fondo_Detinmarin_1024px_f324e3d318.svg')]`}>
        <ApolloProviders>
          <Providers>{children}</Providers>
        </ApolloProviders>
      </body>
    </html>
  );
}