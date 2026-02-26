import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <AuthProvider>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
