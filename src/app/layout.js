import "./globals.css";

import { ColorModeScript, extendTheme } from "@chakra-ui/react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({ config });

export const metadata = {
  title: "DePass",
  description: "A decentralised password manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      </body>
    </html>
  );
}
