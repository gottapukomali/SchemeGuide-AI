import { z } from "zod";

// Government Scheme Schema
export const schemeSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    "students",
    "farmers",
    "women",
    "housing",
    "health",
    "employment",
    "senior_citizens",
    "entrepreneurs",
  ]),
  description: z.string(),
  benefits: z.array(z.string()),
  eligibility: z.array(z.string()),
  documents: z.array(z.string()),
  applicationProcess: z.array(z.string()),
  officialLink: z.string(),
  targetGroup: z.string(),
  ministry: z.string(),
});

export type Scheme = z.infer<typeof schemeSchema>;

// Chat Message Schema
export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
  schemes: z.array(schemeSchema).optional(),
});

export type Message = z.infer<typeof messageSchema>;

// Chat Request Schema
export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message is required"),
  conversationHistory: z.array(messageSchema).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Chat Response Schema
export const chatResponseSchema = z.object({
  message: z.string(),
  schemes: z.array(schemeSchema).optional(),
  suggestedQuestions: z.array(z.string()).optional(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// Scheme Category type
export type SchemeCategory = Scheme["category"];

// Suggested questions for users
export const suggestedQuestions = [
  "What schemes are available for students?",
  "How can farmers get financial assistance?",
  "Schemes for women entrepreneurs?",
  "Housing schemes I can apply for?",
  "Health insurance schemes for families?",
  "Employment schemes for youth?",
  "Benefits for senior citizens?",
  "Documents needed for PM Kisan?",
];

// Category information for display
export const categoryInfo: Record<
  SchemeCategory,
  { label: string; description: string }
> = {
  students: {
    label: "Students",
    description: "Scholarships and educational support",
  },
  farmers: {
    label: "Farmers",
    description: "Agricultural assistance and subsidies",
  },
  women: {
    label: "Women",
    description: "Women empowerment and welfare",
  },
  housing: {
    label: "Housing",
    description: "Affordable housing and home loans",
  },
  health: {
    label: "Health",
    description: "Healthcare and insurance programs",
  },
  employment: {
    label: "Employment",
    description: "Job creation and skill development",
  },
  senior_citizens: {
    label: "Senior Citizens",
    description: "Pension and elderly care",
  },
  entrepreneurs: {
    label: "Entrepreneurs",
    description: "Business loans and startup support",
  },
};
