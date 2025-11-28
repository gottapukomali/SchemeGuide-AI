import OpenAI from "openai";
import type { Scheme, ChatResponse } from "@shared/schema";
import { searchSchemes } from "./schemes";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let openaiClient: OpenAI | null = null;
let openaiInitialized = false;

function getOpenAIClient(): OpenAI | null {
  if (!openaiInitialized) {
    openaiInitialized = true;
    try {
      if (process.env.OPENAI_API_KEY) {
        openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      }
    } catch (error) {
      console.warn("OpenAI client initialization failed:", error);
      openaiClient = null;
    }
  }
  return openaiClient;
}

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: ConversationMessage[] = []
): Promise<ChatResponse> {
  // Search for relevant schemes based on user query (limit to 2 for cleaner UI)
  const relevantSchemes = searchSchemes(userMessage, 2);
  
  // Get OpenAI client (deferred initialization)
  const openai = getOpenAIClient();

  // If OpenAI is not configured, use fallback response
  if (!openai) {
    return generateFallbackResponse(userMessage, relevantSchemes);
  }

  // Build context from relevant schemes
  const schemeContext = relevantSchemes
    .map(
      (scheme) => `
Scheme: ${scheme.name}
Category: ${scheme.category}
Ministry: ${scheme.ministry}
Description: ${scheme.description}
Benefits: ${scheme.benefits.join("; ")}
Eligibility: ${scheme.eligibility.join("; ")}
Documents Required: ${scheme.documents.join("; ")}
Application Process: ${scheme.applicationProcess.join("; ")}
Official Website: ${scheme.officialLink}
Target Group: ${scheme.targetGroup}
`
    )
    .join("\n---\n");

  const systemPrompt = `You are an expert AI assistant for Indian Government Schemes. Your role is to help citizens understand and access government benefits they may be eligible for.

IMPORTANT GUIDELINES:
1. Provide accurate, helpful information about government schemes
2. Always mention specific eligibility criteria when discussing schemes
3. Highlight key benefits and required documents
4. Be encouraging - many people don't know they qualify for benefits
5. Keep responses concise (2-3 paragraphs max) - the user will see detailed scheme cards separately
6. Don't repeat all the scheme details in your text - just provide helpful context and guidance
7. If you don't have information about a specific scheme, acknowledge it and suggest checking official portals

AVAILABLE SCHEMES DATABASE:
${schemeContext}

If the user's question relates to the schemes above, provide helpful context. The detailed scheme information will be shown in separate cards.`;

  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6).map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages,
      max_completion_tokens: 512,
    });

    const assistantMessage =
      response.choices[0].message.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    const shouldIncludeSchemes = shouldShowSchemes(userMessage, relevantSchemes);
    const suggestedQuestions = generateSuggestedQuestions(relevantSchemes, userMessage);

    return {
      message: assistantMessage,
      schemes: shouldIncludeSchemes ? relevantSchemes : undefined,
      suggestedQuestions,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return generateFallbackResponse(userMessage, relevantSchemes);
  }
}

function shouldShowSchemes(userMessage: string, schemes: Scheme[]): boolean {
  if (schemes.length === 0) return false;
  
  const queryLower = userMessage.toLowerCase();
  const keywords = [
    "scheme", "eligible", "apply", "benefit", "document", "how", "what",
    "which", "help", "available", "student", "farmer", "women", "housing",
    "health", "employment", "senior", "pension", "loan", "scholarship",
    "kisan", "awas", "insurance", "subsidy", "assistance", "find", "get"
  ];
  
  return keywords.some(keyword => queryLower.includes(keyword));
}

function generateFallbackResponse(userMessage: string, relevantSchemes: Scheme[]): ChatResponse {
  const queryLower = userMessage.toLowerCase();
  const suggestedQuestions = generateSuggestedQuestions(relevantSchemes, userMessage);
  
  if (relevantSchemes.length > 0) {
    let intro = "";
    
    if (queryLower.includes("student") || queryLower.includes("scholarship")) {
      intro = "Here are education and scholarship schemes that match your query. These programs provide financial assistance for students at various education levels.";
    } else if (queryLower.includes("farmer") || queryLower.includes("kisan")) {
      intro = "Here are agricultural support schemes for farmers. These programs provide income support, crop insurance, and credit facilities.";
    } else if (queryLower.includes("women") || queryLower.includes("mahila")) {
      intro = "Here are empowerment schemes for women. These include business loans, savings schemes, and entrepreneurship support.";
    } else if (queryLower.includes("housing") || queryLower.includes("home") || queryLower.includes("awas")) {
      intro = "Here are housing assistance schemes. These programs help families construct or purchase affordable homes.";
    } else if (queryLower.includes("health") || queryLower.includes("hospital")) {
      intro = "Here are health-related schemes. These provide medical insurance and healthcare support for families.";
    } else if (queryLower.includes("job") || queryLower.includes("employment")) {
      intro = "Here are employment and skill development schemes. These programs help with job creation and vocational training.";
    } else if (queryLower.includes("senior") || queryLower.includes("pension") || queryLower.includes("elderly")) {
      intro = "Here are schemes for senior citizens. These include pension plans and savings certificates.";
    } else if (queryLower.includes("business") || queryLower.includes("startup") || queryLower.includes("loan")) {
      intro = "Here are schemes for entrepreneurs. These provide loans and support for starting or expanding businesses.";
    } else {
      intro = "Based on your query, here are relevant government schemes. Check the cards below for eligibility criteria, benefits, and application details.";
    }

    return {
      message: intro,
      schemes: relevantSchemes,
      suggestedQuestions,
    };
  }

  return {
    message: `I can help you find government schemes! Here's what I can assist with:

• **Students** - Scholarships and education loans
• **Farmers** - PM-KISAN, crop insurance, credit cards
• **Women** - Business loans and savings schemes
• **Housing** - PM Awas Yojana for affordable housing
• **Health** - Ayushman Bharat medical insurance
• **Employment** - MGNREGA and skill training
• **Senior Citizens** - Pension and savings schemes
• **Entrepreneurs** - Startup support and MSME loans

Try asking something like "What schemes are available for students?" or "How can I apply for PM-KISAN?"`,
    schemes: undefined,
    suggestedQuestions,
  };
}

function generateSuggestedQuestions(schemes: Scheme[], userMessage: string): string[] {
  const suggestions: string[] = [];
  const queryLower = userMessage.toLowerCase();
  
  if (schemes.length > 0) {
    const firstScheme = schemes[0];
    suggestions.push(`What documents are needed for ${firstScheme.name}?`);
    suggestions.push(`How do I apply for ${firstScheme.name}?`);
  }
  
  if (!queryLower.includes("farmer") && !queryLower.includes("kisan")) {
    suggestions.push("What schemes help farmers?");
  }
  if (!queryLower.includes("student") && !queryLower.includes("scholarship")) {
    suggestions.push("Scholarships for students?");
  }
  if (!queryLower.includes("women")) {
    suggestions.push("Schemes for women?");
  }
  if (!queryLower.includes("housing") && !queryLower.includes("home")) {
    suggestions.push("Housing assistance schemes?");
  }
  
  return suggestions.slice(0, 4);
}
