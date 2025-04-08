import {
  FileText,
  Upload,
  Edit,
  CheckCircle,
  Layout,
  Star,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className= "py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Why Choose Our Resume Builder?
          </h2>
          <p className="mt-4 text-gray-600">
            Create, enhance, and customize your resume with ease using our
            powerful tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <FileText className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Create from Scratch</h3>
            <p className="text-muted-foreground">
              Build your resume step-by-step with our intuitive builder.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <Upload className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">AI Enhancement</h3>
            <p className="text-muted-foreground">
              Upload your existing resume and let our AI improve it.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <Edit className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Easy Customization</h3>
            <p className="text-muted-foreground">
              Choose from multiple themes and layouts to make your resume stand
              out.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <Layout className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Professional Templates</h3>
            <p className="text-muted-foreground">
              Access a variety of professionally designed templates.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <CheckCircle className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">ATS-Friendly</h3>
            <p className="text-muted-foreground">
              Ensure your resume passes Applicant Tracking Systems with ease.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col items-center text-center p-6 border rounded-lg">
            <Star className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Stand Out</h3>
            <p className="text-muted-foreground">
              Highlight your skills and achievements to impress employers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
