"use client";

import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm />
      </Suspense>
    </main>
  );
}
