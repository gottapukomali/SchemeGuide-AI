import { useLocation } from "wouter";
import {
  MessageCircle,
  Search,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryCard } from "@/components/CategoryCard";
import { SuggestionChip } from "@/components/SuggestionChip";
import type { SchemeCategory } from "@shared/schema";
import { suggestedQuestions } from "@shared/schema";

const categories: SchemeCategory[] = [
  "students",
  "farmers",
  "women",
  "housing",
  "health",
  "employment",
  "senior_citizens",
  "entrepreneurs",
];

const howItWorks = [
  {
    icon: MessageCircle,
    title: "Ask Questions",
    description:
      "Type your question in natural language about any government scheme",
  },
  {
    icon: Search,
    title: "AI Searches Schemes",
    description:
      "Our AI searches through hundreds of official scheme documents",
  },
  {
    icon: Zap,
    title: "Get Instant Answers",
    description:
      "Receive accurate information about eligibility, benefits, and application process",
  },
];

const trustIndicators = [
  "Accurate Information",
  "Up-to-date Data",
  "Always Free",
];

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleCategoryClick = (category: SchemeCategory) => {
    const categoryQuestions: Record<SchemeCategory, string> = {
      students: "What scholarship schemes are available for students?",
      farmers: "What financial assistance schemes are available for farmers?",
      women: "What schemes are available for women entrepreneurs?",
      housing: "What housing schemes can I apply for?",
      health: "What health insurance schemes are available for families?",
      employment: "What employment and skill development schemes are available?",
      senior_citizens: "What pension and welfare schemes are available for senior citizens?",
      entrepreneurs: "What startup and business loan schemes are available?",
    };
    sessionStorage.setItem("initialQuestion", categoryQuestions[category]);
    setLocation("/chat");
  };

  const handleQuestionClick = (question: string) => {
    sessionStorage.setItem("initialQuestion", question);
    setLocation("/chat");
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              AI-Powered Government Assistant
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Find Government Schemes
              <span className="block text-primary">You Qualify For</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Discover housing schemes, scholarships, farmer assistance, health
              programs, and more. Get accurate information about eligibility,
              benefits, and application process instantly.
            </p>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setLocation("/chat")}
                data-testid="button-start-chat"
              >
                Start Finding Benefits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {trustIndicators.map((indicator) => (
                <div key={indicator} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-chart-3" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Get information about government schemes in three simple steps
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <Card key={step.title} className="relative overflow-visible">
                <CardContent className="pt-8 pb-6 text-center">
                  <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="border-y bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              Popular Questions
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Click on any question to get started instantly
            </p>
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {suggestedQuestions.map((question) => (
              <SuggestionChip
                key={question}
                question={question}
                onClick={() => handleQuestionClick(question)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl">
              Explore by Category
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Find schemes based on your needs and eligibility
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                500+
              </div>
              <p className="text-muted-foreground">Government Schemes</p>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                28
              </div>
              <p className="text-muted-foreground">States & UTs Covered</p>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-primary md:text-4xl">
                24/7
              </div>
              <p className="text-muted-foreground">Available Anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">
                Govt Schemes Assistant
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Information provided is for reference only. Please verify with
              official government sources before applying.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
