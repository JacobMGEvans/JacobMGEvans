import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export default {
  async fetch(request: Request): Promise<Response> {
    const readmeContent = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(
        await fetch(
          "https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md"
        ).then((r) => r.text())
      );

    return new Response(String(readmeContent));
  },
};
