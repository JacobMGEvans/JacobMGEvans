import { Context } from 'hono';
import type { DurableObjectNamespace } from '@cloudflare/workers-types';

// Environment bindings for this handler
interface Env {
  PRESENCE: DurableObjectNamespace;
}

// Proxy /api/presence requests (HTTP & WebSocket) to the Durable Object stub
export async function handlePresence(
  c: Context<{ Bindings: Env }>
): Promise<Response> {
  // Get the global presence DO
  const id = c.env.PRESENCE.idFromName('global');
  const stub = c.env.PRESENCE.get(id);

  // Forward the raw request to the DO stub
  // @ts-ignore: allow raw CF Request
  return stub.fetch(c.req.raw as any);
}
