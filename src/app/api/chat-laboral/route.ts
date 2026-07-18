import { NextResponse } from "next/server";
import { buildWhatsappUrl } from "@/data/site";
import { evaluateLaborConversationWithAi } from "@/lib/legal/labor-ai";
import { type LaborChatMessage, type LaborLeadProfile } from "@/lib/legal/labor-chat";

type ChatPayload = {
  sessionId?: string;
  leadProfile?: LaborLeadProfile;
  messages?: LaborChatMessage[];
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as ChatPayload;
  const messages = sanitizeMessages(payload.messages);

  if (!messages.length) {
    return NextResponse.json({ error: "messages_required" }, { status: 400 });
  }

  const result = await evaluateLaborConversationWithAi(messages, {
    ...sanitizeLeadProfile(payload.leadProfile),
    sessionId: sanitizeString(payload.sessionId, 80) ?? sanitizeString(payload.leadProfile?.sessionId, 80),
  });

  return NextResponse.json({
    ...result,
    aiEnabled: Boolean(process.env.OPENAI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim() || process.env.LABOR_N8N_WEBHOOK_URL?.trim()),
    whatsappUrl: buildWhatsappUrl(result.whatsappMessage),
  });
}

function sanitizeLeadProfile(profile: ChatPayload["leadProfile"]): LaborLeadProfile {
  if (!profile || typeof profile !== "object") {
    return {};
  }

  return profile;
}

function sanitizeString(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, maxLength) : undefined;
}

function sanitizeMessages(messages: ChatPayload["messages"]) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter((message): message is LaborChatMessage => {
      return (
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
      );
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1200),
    }));
}
