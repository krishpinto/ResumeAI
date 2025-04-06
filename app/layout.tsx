import Navbar from "@/components/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        <AuthProvider>
          <main className="min-h-screen">
            <Navbar />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
