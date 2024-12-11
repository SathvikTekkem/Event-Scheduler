// src/app/layout.tsx
import React from "react";
import Header from "./components/Header";

export const metadata = {
  title: "Event Scheduler",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
