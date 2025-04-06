import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
          <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-36">
            <div className="text-center">
              <AnimatedGroup variants={transitionVariants}>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 text-balance text-5xl md:text-6xl lg:mt-16 xl:text-[4.5rem] font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Build Your Professional Resume Effortlessly
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-6 max-w-2xl text-balance text-lg text-gray-600 dark:text-gray-300"
                >
                  Create stunning resumes or enhance your existing ones with our
                  AI-powered tools. Stand out to employers with ease.
                </TextEffect>
              </AnimatedGroup>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row"
              >
                <Button asChild size="lg">
                  <Link href="/resume-builder/basic-info">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    <FileText className="mr-2 h-5 w-5" />
                    Create Resume
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/resume-enhancer">
                    <Upload className="mr-2 h-5 w-5" />
                    Enhance Resume
                  </Link>
                </Button>
              </AnimatedGroup>
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
