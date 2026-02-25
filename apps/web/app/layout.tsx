import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Taski Next Platform",
  description: "Task management + analytics-ready full-stack starter"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
