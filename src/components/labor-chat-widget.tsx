"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChatIcon, SendIcon, WhatsAppIcon, XIcon } from "@/components/icons";
import { conversionEvents } from "@/lib/conversion";
import { type LaborChatResult, type LaborLead } from "@/lib/legal/labor-chat";
import { cn } from "@/lib/utils";

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = LaborChatResult & {
  whatsappUrl: string;
  aiEnabled?: boolean;
};

const leadStorageKey = "leal_labor_chat_lead_v1";
const sessionStorageKey = "leal_labor_chat_session_v1";

const starterMessages: UiMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hola. Este canal orienta de forma general en derecho laboral colombiano y ayuda a definir si conviene agendar una consulta. No reemplaza la revision de un abogado.",
  },
  {
    id: "question",
    role: "assistant",
    content: "Para empezar: ¿eres trabajador, empleador o empresa, y que situacion necesitas revisar?",
  },
];

const starterReplies = ["Me despidieron", "Tengo dudas con mi liquidacion", "Creo que hay acoso laboral", "Soy empresa"];

export function LaborChatWidget() {
  const reduceMotion = useReducedMotion();
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [lastResponse, setLastResponse] = useState<ChatResponse | null>(null);
  const [leadProfile, setLeadProfile] = useState<LaborLead | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestedReplies = useMemo(() => {
    return lastResponse?.quickReplies?.length ? lastResponse.quickReplies : starterReplies;
  }, [lastResponse]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: "end", behavior: reduceMotion ? "auto" : "smooth" });
    });

    return () => cancelAnimationFrame(frame);
  }, [messages, isSending, reduceMotion]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setLeadProfile(readStoredLeadProfile());
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  function openChat() {
    setIsOpen(true);
  }

  async function sendMessage(content: string) {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSending) {
      return;
    }

    const userMessage: UiMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedContent,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSending(true);

    try {
      const activeLeadProfile = leadProfile ?? readStoredLeadProfile();

      const response = await fetch("/api/chat-laboral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          leadProfile: activeLeadProfile,
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("chat_request_failed");
      }

      const data = (await response.json()) as ChatResponse;
      setLastResponse(data);
      setLeadProfile(data.lead);
      storeLeadProfile(data.lead);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "No pude procesar el mensaje en este momento. Puedes intentar de nuevo o pasar directo a WhatsApp para agendar la consulta.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-24 right-4 z-[60] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <motion.section
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          aria-label="Chat laboral Leal Abogados"
          className="flex h-[min(40rem,calc(100svh-8rem))] w-[calc(100vw-2rem)] max-w-[25rem] flex-col overflow-hidden rounded-sm border border-ink/12 bg-white shadow-[0_28px_90px_rgba(7,7,7,0.26)]"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
          transition={reduceMotion ? undefined : { duration: 0.2, ease: "easeOut" }}
        >
          <header className="border-b border-white/10 bg-ink px-4 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/56">Chat laboral</p>
                <h2 className="mt-1 font-serif text-xl font-semibold">Orientacion inicial</h2>
              </div>
              <button
                aria-label="Cerrar chat laboral"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-white/78 transition hover:border-white/45 hover:text-white"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-white/58">Derecho laboral colombiano.</p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-smoke px-4 py-4">
            {messages.map((message) => (
              <div
                className={cn(
                  "max-w-[88%] rounded-sm px-4 py-3 text-sm leading-6 shadow-sm",
                  message.role === "user"
                    ? "ml-auto bg-brand-red text-white"
                    : "mr-auto whitespace-pre-line border border-ink/8 bg-white text-ink",
                )}
                key={message.id}
              >
                {message.content}
              </div>
            ))}
            {isSending ? (
              <div className="mr-auto max-w-[88%] rounded-sm border border-ink/8 bg-white px-4 py-3 text-sm text-muted shadow-sm">
                Analizando el contexto del caso...
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="border-t border-ink/10 bg-white px-4 py-3">
            {leadProfile ? (
              <div className="mb-3 border border-ink/10 bg-smoke px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted">Ya entendido</p>
                  <span className="shrink-0 border border-ink/10 bg-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted">
                    {temperatureShortLabelByType[leadProfile.temperature]} {leadProfile.confidence}%
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted">
                  <span className="border border-ink/10 bg-white px-2 py-2">{caseShortLabelByType[leadProfile.caseType]}</span>
                  <span className="border border-ink/10 bg-white px-2 py-2">{urgencyShortLabelByType[leadProfile.urgency]}</span>
                  <span className="border border-ink/10 bg-white px-2 py-2">{roleShortLabelByType[leadProfile.role]}</span>
                  {leadProfile.city ? (
                    <span className="border border-ink/10 bg-white px-2 py-2">{leadProfile.city}</span>
                  ) : null}
                  {leadProfile.keyDates[0] ? (
                    <span className="border border-ink/10 bg-white px-2 py-2">{leadProfile.keyDates[0]}</span>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {suggestedReplies.map((reply) => (
                <button
                  className="shrink-0 rounded-sm border border-ink/12 bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:border-brand-red hover:text-brand-red"
                  disabled={isSending}
                  key={reply}
                  onClick={() => void sendMessage(reply)}
                  type="button"
                >
                  {reply}
                </button>
              ))}
            </div>

            {lastResponse?.whatsappUrl ? (
              <a
                className="mb-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-brand-red px-4 text-sm font-semibold text-white transition hover:bg-brand-redDark"
                data-event={conversionEvents.laborChatWhatsApp}
                data-event-label={lastResponse.ctaLabel}
                data-event-location="labor-chat-widget"
                href={lastResponse.whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lastResponse.ctaLabel}
              </a>
            ) : null}

            <form className="flex items-end gap-2" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="labor-chat-message">
                Mensaje para el chat laboral
              </label>
              <textarea
                className="min-h-12 flex-1 resize-none rounded-sm border border-ink/14 bg-white px-3 py-3 text-sm leading-5 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-red"
                disabled={isSending}
                id="labor-chat-message"
                maxLength={700}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Cuéntanos qué pasó..."
                rows={1}
                value={input}
              />
              <button
                aria-label="Enviar mensaje"
                className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-ink text-white transition hover:bg-brand-red disabled:cursor-not-allowed disabled:bg-muted"
                disabled={isSending || !input.trim()}
                type="submit"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.section>
      ) : (
        <motion.button
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          aria-label="Abrir chat laboral"
          className="group flex min-h-14 items-center gap-3 rounded-sm border border-white/15 bg-ink px-4 py-3 text-left text-white shadow-[0_24px_70px_rgba(7,7,7,0.28)] transition hover:-translate-y-0.5 hover:bg-brand-red"
          data-event={conversionEvents.laborChatOpen}
          data-event-label="Abrir chat laboral"
          data-event-location="floating-widget"
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          onClick={openChat}
          type="button"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-white text-ink transition group-hover:text-brand-red">
            <ChatIcon className="h-5 w-5" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/58">Laboral</span>
            <span className="block text-sm font-semibold">Revisar mi caso</span>
          </span>
        </motion.button>
      )}
    </div>
  );
}

const caseShortLabelByType = {
  despido: "Despido",
  liquidacion: "Liquidacion",
  prestaciones: "Prestaciones",
  acoso: "Acoso",
  estabilidad_reforzada: "Estabilidad",
  accidente_enfermedad_laboral: "Accidente",
  contrato_realidad: "Contrato",
  jornada_salario: "Jornada",
  ministerio_trabajo: "Ministerio",
  tutela: "Tutela",
  preventivo_empresa: "Empresa",
  otro: "Laboral",
} satisfies Record<ChatResponse["lead"]["caseType"], string>;

const urgencyShortLabelByType = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
  critica: "Critica",
} satisfies Record<ChatResponse["lead"]["urgency"], string>;

const roleShortLabelByType = {
  trabajador: "Trabajador",
  empleador: "Empleador",
  empresa: "Empresa",
  otro: "Otro",
  desconocido: "Perfil",
} satisfies Record<ChatResponse["lead"]["role"], string>;

const temperatureShortLabelByType = {
  frio: "Frio",
  tibio: "Tibio",
  caliente: "Caliente",
} satisfies Record<ChatResponse["lead"]["temperature"], string>;

function getOrCreateSessionId() {
  if (typeof window === "undefined") {
    return "server-session";
  }

  const currentSessionId = window.localStorage.getItem(sessionStorageKey);

  if (currentSessionId) {
    return currentSessionId;
  }

  const nextSessionId = crypto.randomUUID();
  window.localStorage.setItem(sessionStorageKey, nextSessionId);

  return nextSessionId;
}

function readStoredLeadProfile() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(leadStorageKey);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as LaborLead;
  } catch {
    window.localStorage.removeItem(leadStorageKey);
    return null;
  }
}

function storeLeadProfile(lead: LaborLead) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(leadStorageKey, JSON.stringify(lead));
}
