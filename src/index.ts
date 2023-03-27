const handler = {
  async fetch(): Promise<Response> {
    const headers = new Headers();
    headers.set("Content-Type", "text/html;charset=UTF-8");

    const readmeContent = await fetch(
      "https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/readme.html"
    );
    /**
     * TODO: Create a slicable/gettable Head from README and drop it into template <head> tag here
     * TODO: TailwindCSS needs to be accessible on the website as an asset AND locally for the README.md file
     * TODO: Use HTMLRewriter to add the TailwindCSS stylesheet to the <head> tag and replace this template literal.
     */
    // const transformedHtml = new HTMLRewriter({ html: true })
    //   .on("head", {
    //     element(element) {
    //       element.append(
    //         `<meta property="og:url" content="https://dev.to/jacobmgevans" />`,
    //         `<meta name="description" content="Jacob MG Evans GitHub profile. Describing personal passions and accomplishments."/>`,
    //         `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    //         `<meta name="theme-color" content="#000000" />`,
    //         `<title> JacobMGEvans profile </title>`
    //       );
    //     },
    //   })
    //   .on("body", {
    //     element(element) {
    //       element.setAttribute("align", "center");
    //     },
    //   });

    // return transformedHtml.transform(readmeContent);
    return new Response(await readmeContent.text(), { headers });
  },
};

export default handler;
