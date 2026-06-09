import { NextResponse, type NextRequest } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const requestSchema = z.object({
  kind: z.enum(["survey", "activity"]),
  ageGroup: z.string().min(1),
  programType: z.string().min(1),
  outcomes: z.string().min(1),
  riskLevel: z.enum(["low", "medium", "high"]).default("low"),
});

export async function POST(request: NextRequest) {
  const parsed = requestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { kind, ageGroup, programType, outcomes, riskLevel } = parsed.data;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      draft: buildFallbackDraft(kind, ageGroup, programType, outcomes, riskLevel),
      source: "fallback",
    });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You help youth program managers create age-appropriate, low-risk, editable program operations content. Keep suggestions practical and avoid medical, legal, or unsafe advice.",
      },
      {
        role: "user",
        content: `Create a ${kind} draft for ages ${ageGroup}, program type ${programType}, outcomes ${outcomes}, risk level ${riskLevel}. Return concise bullet points.`,
      },
    ],
  });

  return NextResponse.json({
    draft:
      completion.choices[0]?.message.content ??
      buildFallbackDraft(kind, ageGroup, programType, outcomes, riskLevel),
    source: "openai",
  });
}

function buildFallbackDraft(
  kind: "survey" | "activity",
  ageGroup: string,
  programType: string,
  outcomes: string,
  riskLevel: "low" | "medium" | "high",
) {
  if (kind === "survey") {
    return [
      `Survey draft for ages ${ageGroup} in ${programType}.`,
      `1. I felt safe and included during today's session.`,
      `2. The activities helped me practice ${outcomes}.`,
      "3. The facilitator explained instructions clearly.",
      "4. What was one moment where your group worked well together?",
      "5. What should we change for the next session?",
      `Review note: keep collection consent-aware and appropriate for ${riskLevel} risk content.`,
    ].join("\n");
  }

  return [
    `Activity ideas for ages ${ageGroup} in ${programType}.`,
    "1. Low-pressure name web with opt-out roles for quieter participants.",
    "2. Silent lineup challenge using birthdays or favorite outdoor activity.",
    `3. Reflection circle focused on ${outcomes}.`,
    `Review note: confirm site rules before using any ${riskLevel} risk activity.`,
  ].join("\n");
}
