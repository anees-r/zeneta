import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "zeneta.gg",
  description: "Just a dude trying to figure out this Youtube stuff.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
