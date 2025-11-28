import { ExternalLink, CheckCircle, FileText, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Scheme } from "@shared/schema";
import { categoryInfo } from "@shared/schema";

interface SchemeCardProps {
  scheme: Scheme;
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <Card
      className="border-l-4 border-l-primary overflow-visible"
      data-testid={`card-scheme-${scheme.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-foreground leading-tight">
              {scheme.name}
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {scheme.ministry}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {categoryInfo[scheme.category].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground">{scheme.description}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <CheckCircle className="h-4 w-4 text-chart-3" />
              Benefits
            </h4>
            <ul className="space-y-1.5">
              {scheme.benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-3" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
              <ClipboardList className="h-4 w-4 text-primary" />
              Eligibility
            </h4>
            <ul className="space-y-1.5">
              {scheme.eligibility.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">
              View Documents & Application Process
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 pt-2 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <FileText className="h-4 w-4 text-chart-2" />
                    Required Documents
                  </h4>
                  <ul className="space-y-1.5">
                    {scheme.documents.map((doc, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-2" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-foreground">
                    How to Apply
                  </h4>
                  <ol className="space-y-1.5">
                    {scheme.applicationProcess.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            data-testid={`button-scheme-link-${scheme.id}`}
          >
            <a
              href={scheme.officialLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Official Website
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
