import { Context } from 'hono';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';

interface Env {
  PRESENCE: DurableObjectNamespace;
}

// Proxy /api/presence requests (HTTP & WebSocket) to the Durable Object
export async function handlePresence(
  c: Context<{ Bindings: Env }>
): Promise<Response> {
  const id = c.env.PRESENCE.idFromName('global');
  const stub = c.env.PRESENCE.get(id);

  // @ts-expect-error: allow raw CF Request
  return stub.fetch(c.req.raw as any);
}
