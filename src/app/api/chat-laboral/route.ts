import { NextResponse } from "next/server";
import { buildWhatsappUrl } from "@/data/site";
import { evaluateLaborConversation, type LaborChatMessage } from "@/lib/legal/labor-chat";

type ChatPayload = {
  messages?: LaborChatMessage[];
};

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as ChatPayload;
  const messages = sanitizeMessages(payload.messages);

  if (!messages.length) {
    return NextResponse.json({ error: "messages_required" }, { status: 400 });
  }

  const result = evaluateLaborConversation(messages);

  return NextResponse.json({
    ...result,
    whatsappUrl: buildWhatsappUrl(result.whatsappMessage),
  });
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
