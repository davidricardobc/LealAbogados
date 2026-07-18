import { type LaborLead } from "@/lib/legal/labor-chat";

const maxStoredSessions = 250;

type LaborSessionStore = Map<string, LaborLead>;

declare global {
  var __lealLaborSessionStore: LaborSessionStore | undefined;
}

function getStore() {
  globalThis.__lealLaborSessionStore ??= new Map<string, LaborLead>();

  return globalThis.__lealLaborSessionStore;
}

export function getStoredLaborLead(sessionId: string) {
  return getStore().get(sessionId);
}

export function storeLaborLead(sessionId: string, lead: LaborLead) {
  const store = getStore();

  if (store.size >= maxStoredSessions && !store.has(sessionId)) {
    const oldestKey = store.keys().next().value;

    if (oldestKey) {
      store.delete(oldestKey);
    }
  }

  store.set(sessionId, lead);
}
