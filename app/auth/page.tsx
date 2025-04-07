"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const auth = getAuth();

    // Check if the user is already authenticated
    if (auth.currentUser) {
      router.push("/dashboard");
      return;
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to dashboard if the user is logged in
        router.push("/dashboard");
      } else {
        setLoading(false); // Stop loading if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [router]);

  if (loading) {
    // Show a loading spinner or placeholder while resolving auth state
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <AuthForm />
    </main>
  );
}
