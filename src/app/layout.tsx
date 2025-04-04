import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { Box } from "@mui/material";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Shopping Cart POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>   
           <Box className={'page'}>
              <Header />
              {children}
          </Box>
        </ReduxProvider>
      </body>
    </html>
  );
}
