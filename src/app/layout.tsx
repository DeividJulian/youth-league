import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Rivera Youth FC", description: "Youth league platform" };

const links = [["/", "Home"], ["/history", "History"], ["/rules", "Rules"], ["/contact", "Contact"], ["/players", "Players"], ["/fixtures", "Fixtures"], ["/live", "Live"], ["/admin", "Admin"]];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
