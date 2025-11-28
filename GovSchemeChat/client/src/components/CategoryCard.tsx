import {
  GraduationCap,
  Wheat,
  Users,
  Home,
  Heart,
  Briefcase,
  User,
  Rocket,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SchemeCategory } from "@shared/schema";
import { categoryInfo } from "@shared/schema";

const categoryIcons: Record<SchemeCategory, LucideIcon> = {
  students: GraduationCap,
  farmers: Wheat,
  women: Users,
  housing: Home,
  health: Heart,
  employment: Briefcase,
  senior_citizens: User,
  entrepreneurs: Rocket,
};

interface CategoryCardProps {
  category: SchemeCategory;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const Icon = categoryIcons[category];
  const info = categoryInfo[category];

  return (
    <Card
      className="cursor-pointer hover-elevate active-elevate-2 transition-all duration-200"
      onClick={onClick}
      data-testid={`card-category-${category}`}
    >
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{info.label}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
      </CardContent>
    </Card>
  );
}
