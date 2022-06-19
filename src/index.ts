export default {
  async fetch(request: Request): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "text/html;charset=UTF-8");

    const readmeContent = await fetch(
      "https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md"
    ).then((r) => r.text());

    //TODO Create a slicable/gettable Head from README and drop it into template <head> tag here
    // TODO: TailwindCSS needs to be accessible on the website as an asset AND locally for the README.md file
    const html = `
    <!DOCTYPE html>
    <head>
      <meta property="og:url" content="https://dev.to/jacobmgevans" />
      <meta name="description" content="Jacob MG Evans GitHub profile. Describing personal passions and accomplishments."/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title> JacobMGEvans profile </title> 
    </head>
    <html lang="en">
        <body align="center">
            ${readmeContent}
        </body>
    </html>
    `;

    console.log(JSON.stringify(readmeContent));
    return new Response(html, { headers });
  },
};
