import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MatekTutor – prototípus",
  description: "Egyszerű, tanulóközpontú MatekTutor prototípus"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
