import {
  FileText,
  Upload,
  Edit,
  CheckCircle,
  Layout,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "Create from Scratch",
      description: "Build your resume step-by-step with our intuitive builder.",
    },
    {
      icon: Upload,
      title: "AI Enhancement",
      description: "Upload your existing resume and let our AI improve it.",
    },
    {
      icon: Edit,
      title: "Easy Customization",
      description: "Choose from multiple themes and layouts to make your resume stand out.",
    },
    {
      icon: Layout,
      title: "Professional Templates",
      description: "Access a variety of professionally designed templates.",
    },
    {
      icon: CheckCircle,
      title: "ATS-Friendly",
      description: "Ensure your resume passes Applicant Tracking Systems with ease.",
    },
    {
      icon: Star,
      title: "Stand Out",
      description: "Highlight your skills and achievements to impress employers.",
    },
  ];

  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Our Resume Builder?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create, enhance, and customize your resume with ease using our
            powerful tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 border-muted">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full mb-2 mx-auto">
                    <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
