"use client";

import { Suspense } from "react";
import BasicInfoForm from "@/components/BasicInfoForm";

export default function BasicInfoPage() {
  return (
    <main className="flex h-screen">
      {" "}
      {/* Ensure full height */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col flex-grow h-full overflow-auto p-6">
          {" "}
          {/* Wrapper for consistent height */}
          <BasicInfoForm />
        </div>
      </Suspense>
    </main>
  );
}
