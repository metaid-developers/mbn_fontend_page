import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MetaBitcoin Network",
  description:
    "The MetaBitcoin Network, centered on the BTC chain, can dynamically link other Bitcoin isomorphic chains, forming a scalable network. It fully solves Bitcoin's expansion issue and enables building a Bitcoin-based Web3 network for 80 billion people globally to use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
