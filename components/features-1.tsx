import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Upload, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4">
            Create, enhance, and customize your resume with ease using our
            powerful tools.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          {/* Card 1 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <FileText className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Create from Scratch</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Build your resume step-by-step with our intuitive builder.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Upload className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">AI Enhancement</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Upload your existing resume and let our AI improve it with
                professional suggestions.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <ArrowRight className="size-6" aria-hidden />
              </CardDecorator>
              <h3 className="mt-6 font-medium">Easy Download</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Download your resume in multiple formats for job applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
