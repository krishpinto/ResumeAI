"use client";

import { Suspense } from "react";
import BasicInfoForm from "@/components/BasicInfoForm";

export default function BasicInfoPage() {
  return (
    <main className="flex h-[calc(100vh-4rem)]">
      <Suspense fallback={<div>Loading...</div>}>
        <BasicInfoForm />
      </Suspense>
    </main>
  );
}
