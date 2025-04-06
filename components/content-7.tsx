import { Cpu, Zap, FileText, Layout, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-gray-900 dark:text-white">
          Build Your Resume with Ease
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          {/* Left Content */}
          <div className="relative space-y-4">
            <p className="text-muted-foreground">
              Our platform provides everything you need to create a professional
              resume. From AI-powered tools to customizable templates, we make
              the process simple and effective.
            </p>
            <p className="text-muted-foreground">
              Whether you're starting from scratch or enhancing an existing
              resume, our tools are designed to help you stand out to employers.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
              {/* Feature 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium">Step-by-Step Builder</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Create your resume effortlessly with our intuitive
                  step-by-step builder.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium">AI-Powered Tools</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Enhance your resume with AI suggestions for professional
                  language and formatting.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium">
                    Customizable Templates
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Choose from a variety of professional templates to match your
                  style.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="text-sm font-medium">ATS-Friendly</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Ensure your resume passes Applicant Tracking Systems with
                  ease.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative mt-6 sm:mt-0">
            <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="/newphoto.png" // Path to the newphoto image in the public folder
                className="rounded-[15px] shadow"
                alt="Resume Preview"
                width={1206}
                height={612}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
