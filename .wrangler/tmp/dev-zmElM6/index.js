// .wrangler/tmp/bundle-1XEm6Q/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// src/index.ts
var src_default = {
  async fetch(request, env, ctx) {
    const imageUrls = /* @__PURE__ */ new Set();
    const TAILWIND_URL = env.TAILWIND_URL;
    const KV_KEY = env.KV_KEY;
    const KV_TAILWIND = env.KV_TAILWIND;
    let tailwindScript = await KV_TAILWIND.get(KV_KEY);
    if (!tailwindScript) {
      const response2 = await fetch(TAILWIND_URL);
      if (response2.ok) {
        tailwindScript = await response2.text();
        await KV_TAILWIND.put(KV_KEY, tailwindScript);
      }
    }
    const response = await fetch(
      "https://raw.githubusercontent.com/JacobMGEvans/JacobMGEvans/main/README.md"
      // {
      //   cf: {
      //     cacheEverything: true,
      //     cacheTtl: 600, // Cache for 10 minutes
      //   },
      // }
    );
    const markdown = await response.text();
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head></head>
    <body>
      ${markdown}
    </body>
    </html>
    `;
    const rewriter = new HTMLRewriter().on("head", {
      element(element) {
        element.append(
          `
            <meta charset="UTF-8">
            <meta property="og:url" content="https://dev.to/jacobmgevans" />
            <meta name="description" content="Jacob MG Evans GitHub profile. Describing personal passions and accomplishments." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="robots" content="index, follow" />
            <script>${tailwindScript ? tailwindScript : ""}<\/script>
            <script defer>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      slate: '#1f2937',
                      primary: '#6366F1',
                      accent: '#D97706',
                    }
                  }
                }
              }
            <\/script>
            <style type="text/tailwindcss">
              @layer utilities {
                .content-auto {
                  content-visibility: auto;
                }
              }
            </style>
            <title>JacobMGEvans profile</title>
          `,
          { html: true }
        );
      }
    }).on("div:first-of-type", {
      element(element) {
        element.setAttribute("class", "flex justify-center space-x-4 my-4");
      }
    }).on("body", {
      element(element) {
        element.setAttribute(
          "class",
          "min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 p-4"
        );
      }
    }).on("h1", {
      element(element) {
        element.setAttribute(
          "class",
          "text-4xl font-extrabold text-primary mt-8 mb-4 tracking-tight"
        );
      }
    }).on("h2", {
      element(element) {
        element.setAttribute(
          "class",
          "text-2xl font-extrabold text-primary mt-8 mb-4 tracking-tight"
        );
      }
    }).on('p[align="center"]', {
      element(element) {
        element.setAttribute("class", "flex justify-center space-x-4 my-8");
      }
    }).on("img", {
      element(element) {
        const src = element.getAttribute("src");
        if (src) {
          imageUrls.add(src);
        }
        element.setAttribute("loading", "lazy");
        element.setAttribute("decoding", "async");
      }
    }).on("a", {
      element(element) {
        element.setAttribute("class", "text-blue-500 underline");
      }
    }).on("a img", {
      element(element) {
        element.setAttribute(
          "class",
          "h-16 filter drop-shadow-lg transition-transform transform hover:scale-150"
        );
      }
    }).on("div a img", {
      element(element) {
        element.setAttribute(
          "class",
          "h-6 filter drop-shadow-lg transition-transform transform hover:scale-110"
        );
      }
    }).on("section", {
      element(element) {
        element.setAttribute("class", "text-center text-lg my-6");
        element.tagName = "div";
      }
    }).on("span", {
      element(element) {
        element.setAttribute("class", "flex justify-center space-x-6 my-6");
      }
    }).on("details", {
      element(element) {
        element.setAttribute(
          "class",
          "bg-gray-800 shadow-lg rounded-lg p-6 my-8 w-full max-w-3xl border border-gray-700"
        );
      }
    }).on("summary", {
      element(element) {
        element.setAttribute(
          "class",
          "font-semibold cursor-pointer text-accent hover:text-accent-light"
        );
      }
    }).on("hr", {
      element(element) {
        element.setAttribute("class", "border-gray-600 my-6");
      }
    }).on("p", {
      element(element) {
        element.setAttribute("class", "text-lg text-center");
      }
    });
    const transformedResponse = rewriter.transform(new Response(html));
    const rewrittenHTML = await transformedResponse.text();
    const images = Array.from(imageUrls).filter(
      (image) => image.includes(".png") || image.includes(".webp")
    );
    return new Response(rewrittenHTML, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        ETag: request.cf?.country,
        "Cache-Control": "public: max-age=3600",
        /** until I figure out how to load the images up as assets without Worker Sites or completely Pages conversion */
        Link: images.map((image) => `<${image}>; rel="preload"; as="image"`).join(", ")
      }
    });
  }
};

// node_modules/.pnpm/wrangler@3.72.0_@cloudflare+workers-types@4.20240815.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
};
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/.pnpm/wrangler@3.72.0_@cloudflare+workers-types@4.20240815.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-1XEm6Q/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/.pnpm/wrangler@3.72.0_@cloudflare+workers-types@4.20240815.0/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// .wrangler/tmp/bundle-1XEm6Q/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  };
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
