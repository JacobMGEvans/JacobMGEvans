export default {
  async fetch(request: Request): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "text/html");

    const readmeContent = await fetch(
      "https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md"
    ).then((r) => r.text());

    return new Response(readmeContent, { headers });
  },
};
