import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData, Link, json } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout$1({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-col bg-pink-50", children: /* @__PURE__ */ jsx("main", { className: "flex-1 w-full max-w-7xl mx-auto px-4", children }) });
}
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "w-full py-3 bg-white shadow-sm sticky top-0 z-30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between px-4 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-2xl font-playfair font-bold text-pink-600 tracking-tight select-none", children: "Bralesa" }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-base font-medium text-gray-500 ml-1 tracking-wide", children: "Accesorios" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex gap-2", children: [
      /* @__PURE__ */ jsx("button", { className: "text-pink-600 hover:text-pink-800 font-medium px-2 py-1 rounded transition", children: "Anillos" }),
      /* @__PURE__ */ jsx("button", { className: "text-pink-600 hover:text-pink-800 font-medium px-2 py-1 rounded transition", children: "Aretes" }),
      /* @__PURE__ */ jsx("button", { className: "text-pink-600 hover:text-pink-800 font-medium px-2 py-1 rounded transition", children: "Cadenas" }),
      /* @__PURE__ */ jsx("button", { className: "text-pink-600 hover:text-pink-800 font-medium px-2 py-1 rounded transition", children: "Pulseras" }),
      /* @__PURE__ */ jsx("button", { className: "text-pink-600 hover:text-pink-800 font-medium px-2 py-1 rounded transition", children: "Topitos" })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "md:hidden p-2 rounded-full hover:bg-pink-50 text-pink-600",
        "aria-label": "Buscar",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "w-6 h-6",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              }
            )
          }
        )
      }
    )
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "w-full py-4 bg-white border-t mt-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center text-gray-500 text-sm px-4", children: [
    "© ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " Bralesa Accesorios. Todos los derechos reservados."
  ] }) });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "bg-pink-50 font-sans", children: [
      /* @__PURE__ */ jsxs(Layout$1, { children: [
        /* @__PURE__ */ jsx(Header, {}),
        children,
        /* @__PURE__ */ jsx(Footer, {})
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Categoria() {
  return /* @__PURE__ */ jsxs("div", { className: "py-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-pink-600 mb-4", children: "Categoría" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "Aquí se mostrarán los productos de la categoría seleccionada." })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Categoria
}, Symbol.toStringTag, { value: "Module" }));
let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
function getEnv() {
  return {
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || ""
  };
}
const loader$1 = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      images: {
        orderBy: { order: "asc" }
      }
    }
  });
  const env = getEnv();
  return { product, ENV: env };
};
function ProductDetail() {
  var _a;
  const { product, ENV } = useLoaderData();
  if (!product)
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: "Producto no encontrado" });
  const whatsappNumber = (ENV == null ? void 0 : ENV.WHATSAPP_NUMBER) || "";
  const whatsappMessage = `Hola! Me interesa el ${product.name} que vi en tu catálogo 💎

Precio: $${product.price}
Referencia: ${product.id}

¿Está disponible? 🤔`;
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  return /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsx(
      Gallery,
      {
        images: product.images,
        principal: product.image,
        name: product.name
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2 font-serif", children: product.name }),
      /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-pink-600 mb-4", children: [
        "$",
        product.price
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-pink-400 mr-2", children: product.available ? "⚡️ Disponible" : "❌ Agotado" }),
        /* @__PURE__ */ jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-semibold text-pink-700 bg-pink-100", children: product.material })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mb-2", children: [
        "Categoría: ",
        (_a = product.category) == null ? void 0 : _a.name
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-8", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: whatsappURL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "bg-green-500 text-white py-2 px-5 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2",
            children: "💬 WhatsApp"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-yellow-400 text-white py-2 px-5 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center gap-2",
            onClick: () => navigator.share && navigator.share({
              title: product.name,
              url: window.location.href
            }),
            children: "📤 Compartir"
          }
        )
      ] })
    ] })
  ] }) });
}
function Gallery({
  images,
  principal,
  name
}) {
  var _a, _b;
  const allImages = principal ? [{ imageUrl: principal, altText: name }, ...images] : images;
  const [selected, setSelected] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-square w-full relative", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: ((_a = allImages[selected]) == null ? void 0 : _a.imageUrl) || "/placeholder.png",
        alt: ((_b = allImages[selected]) == null ? void 0 : _b.altText) || name,
        className: "w-full h-full object-cover rounded-lg shadow"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 justify-center mt-2", children: allImages.map((img, idx) => /* @__PURE__ */ jsx(
      "button",
      {
        className: `w-16 h-16 rounded-lg border-2 ${selected === idx ? "border-pink-500" : "border-transparent"}`,
        onClick: () => setSelected(idx),
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: img.imageUrl,
            alt: img.altText || name,
            className: "w-full h-full object-cover rounded-md"
          }
        )
      },
      idx
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1 mt-2", children: allImages.map((_, idx) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `w-2 h-2 rounded-full ${selected === idx ? "bg-pink-500" : "bg-pink-200"}`
      },
      idx
    )) })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductDetail,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async () => {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } })
  ]);
  return json({
    featured: products.slice(0, 4),
    newProducts: products.slice(0, 8),
    categories
  });
};
function Index() {
  const { featured, newProducts, categories } = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6", children: [
    /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "⭐" }),
        " Productos destacados"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: featured.map((product) => {
        var _a;
        return /* @__PURE__ */ jsx(
          "li",
          {
            className: "bg-gradient-to-br from-pink-50 to-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-105",
            children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/producto/${product.slug}`,
                className: "block focus:outline-none focus:ring-2 focus:ring-pink-400",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: product.image || "/placeholder.png",
                        alt: product.name,
                        className: "w-full h-36 object-cover object-center bg-pink-100"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-pink-400", children: product.available ? "⚡️" : "❌" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 truncate", children: product.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-pink-600 font-bold", children: [
                      "$",
                      product.price
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: (_a = product.category) == null ? void 0 : _a.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: product.material || "" })
                  ] })
                ]
              }
            )
          },
          product.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "📂" }),
        " Categorías"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: categories.map((cat) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex flex-col items-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl min-w-[90px] shadow hover:scale-105 transition",
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-lg mb-1", children: cat.name[0] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-pink-700", children: cat.name })
          ]
        },
        cat.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🆕" }),
        " Nuevos productos"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "product-grid flex flex-wrap gap-8", children: newProducts.map((product) => {
        var _a;
        return /* @__PURE__ */ jsx(
          "li",
          {
            className: "bg-gradient-to-br from-pink-50 to-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:shadow-lg hover:scale-105",
            children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/producto/${product.slug}`,
                className: "block focus:outline-none focus:ring-2 focus:ring-pink-400",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: product.image || "/placeholder.png",
                        alt: product.name,
                        className: "w-96 h-36 object-cover object-center bg-pink-100"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsx("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-pink-400", children: product.available ? "⚡️" : "❌" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 truncate", children: product.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-pink-600 font-bold", children: [
                      "$",
                      product.price
                    ] }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: (_a = product.category) == null ? void 0 : _a.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: product.material || "" })
                  ] })
                ]
              }
            )
          },
          product.id
        );
      }) })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DHHVaxuq.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-CwNEkwoc.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DFInwbkz.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-CwNEkwoc.js"], "css": ["/assets/root-CcbM8TbC.css"] }, "routes/categoria.$slug": { "id": "routes/categoria.$slug", "parentId": "root", "path": "categoria/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/categoria._slug-D__LKgWU.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/producto.$slug": { "id": "routes/producto.$slug", "parentId": "root", "path": "producto/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/producto._slug-BSgOQSSV.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-CwNEkwoc.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DwiSUwq6.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-CwNEkwoc.js"], "css": [] } }, "url": "/assets/manifest-b2fe3c12.js", "version": "b2fe3c12" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/categoria.$slug": {
    id: "routes/categoria.$slug",
    parentId: "root",
    path: "categoria/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/producto.$slug": {
    id: "routes/producto.$slug",
    parentId: "root",
    path: "producto/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
