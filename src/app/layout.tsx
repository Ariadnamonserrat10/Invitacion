import type { Metadata } from "next";
import "@fontsource/great-vibes";
import "@fontsource/allura";
import "@fontsource/parisienne";
import "@fontsource/dancing-script/400.css";
import "@fontsource/dancing-script/500.css";
import "@fontsource/dancing-script/600.css";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mis XV Años - Suri Michelle Velasco Aparicio",
  description: "Invitación a la celebración de XV Años de Suri Michelle Velasco Aparicio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
