export default {
  async fetch(request: Request): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "text/html;charset=UTF-8");

    const readmeContent = await fetch(
      "https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md"
    ).then((r) => r.text());
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <body>
            ${readmeContent.replaceAll(/<!--/g, "").replaceAll(/-->/g, "")}
        </body>
    </html>
    `;

    return new Response(html, { headers });
  },
};
