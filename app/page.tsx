import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">AI-Powered Resume Builder</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mb-8">
          Create professional resumes from scratch or enhance your existing resume with our AI-powered tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>

      <section className="py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <FileText className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Create from Scratch</h3>
          <p className="text-muted-foreground">Build your resume step-by-step with our intuitive builder.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <Upload className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">AI Enhancement</h3>
          <p className="text-muted-foreground">Upload your existing resume and let our AI improve it.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <ArrowRight className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Easy Download</h3>
          <p className="text-muted-foreground">Download your resume in multiple formats for job applications.</p>
        </div>
      </section>
    </div>
  )
}

