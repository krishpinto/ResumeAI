import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <section className="relative">
          <div className="absolute inset-0 -z-10 size-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
            <div className="text-center">
                <h1 className="mt-8 text-balance text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                  Build Your Professional Resume Effortlessly
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
                  Create stunning resumes or enhance your existing ones with our
                  AI-powered tools. Stand out to employers with ease.
                </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href="/resume-builder/basic-info">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    <FileText className="mr-2 h-5 w-5" />
                    Create Resume
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Link href="/resume-enhancer">
                    <Upload className="mr-2 h-5 w-5" />
                    Enhance Resume
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mt-16 overflow-hidden px-2 sm:mt-20">
              <div
                aria-hidden
                className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
              />
              <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                <Image
                  className="bg-background aspect-15/8 relative rounded-2xl"
                  src="/img212.png" // Updated path to the image in the public folder
                  alt="Resume Preview"
                  width="2700"
                  height="1440"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
