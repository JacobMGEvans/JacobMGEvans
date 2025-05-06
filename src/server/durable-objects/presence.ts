import { DurableObject } from 'cloudflare:workers';

export type UserLocation = {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  status?: string;
  affiliation?: string;
  lastSeen: string;
};

// I hate classes, but Durable Objects cant be used without them
export class PresenceDO extends DurableObject {
  private state: DurableObjectState;
  private users: Map<string, UserLocation> = new Map();
  private sessions: Map<string, WebSocket> = new Map();

  constructor(state: DurableObjectState, env: any) {
    super(state, env);
    this.state = state;
    state.blockConcurrencyWhile(async () => {
      const entries = await state.storage.get<[string, UserLocation][]>(
        'users'
      );
      if (entries) {
        this.users = new Map(entries);
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('upgrade')?.toLowerCase() === 'websocket') {
      return this.handleWebSocket(request);
    }

    if (request.method === 'GET') {
      return new Response(JSON.stringify(Array.from(this.users.values())), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (request.method === 'POST') {
      try {
        const data = (await request.json()) as UserLocation;
        data.lastSeen = new Date().toISOString();
        this.users.set(data.id, data);
        await this.state.storage.put('users', Array.from(this.users.entries()));
        this.broadcast();
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        return new Response(String(err), { status: 400 });
      }
    }

    return new Response('Not found', { status: 404 });
  }

  private handleWebSocket(request: Request): Response {
    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    server.accept();
    const sessionId = crypto.randomUUID();
    this.sessions.set(sessionId, server);

    server.addEventListener('message', async (evt) => {
      try {
        const data = JSON.parse(evt.data as string) as UserLocation;
        data.lastSeen = new Date().toISOString();
        this.users.set(data.id, data);
        await this.state.storage.put('users', Array.from(this.users.entries()));
        this.broadcast();
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
      }
    });
    server.addEventListener('close', () => this.sessions.delete(sessionId));
    server.addEventListener('error', () => this.sessions.delete(sessionId));

    server.send(JSON.stringify(Array.from(this.users.values())));
    const init = { status: 101, webSocket: client } as any;
    return new Response(null, init);
  }

  private broadcast() {
    const msg = JSON.stringify(Array.from(this.users.values()));
    for (const ws of this.sessions.values()) {
      try {
        ws.send(msg);
      } catch {}
    }
  }
}
