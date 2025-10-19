import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
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
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-primary pt-10 pb-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-6 mb-4", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Terms of Service" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm border-t border-gray-700 pt-4 mt-4", children: [
      "© 2024 runplanner.fit. All rights reserved. ",
      /* @__PURE__ */ jsx("span", { className: "block sm:inline mt-1 sm:mt-0", children: "Built for the running community." })
    ] })
  ] }) });
}
function SiteIcon({ ...props }) {
  return /* @__PURE__ */ jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
    /* @__PURE__ */ jsx("path", { d: "M4 12L7 9L10 12L13 9L16 12L19 9", stroke: "var(--color-primary)", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M4 16H8L10 10L14 18L16 14H20", stroke: "var(--color-secondary)", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Navigation() {
  return /* @__PURE__ */ jsxs("nav", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center", children: [
    /* @__PURE__ */ jsxs("a", { href: "#", className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx(SiteIcon, { className: "w-8 h-8" }),
      /* @__PURE__ */ jsxs("span", { className: "text-xl font-extrabold text-primary", children: [
        "RUNPLANNER",
        /* @__PURE__ */ jsx("span", { className: "font-normal text-secondary", children: ".FIT" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("a", { href: "#tool", className: "px-4 py-2 text-sm font-semibold rounded-full text-white bg-secondary hover:bg-opacity-90 hidden sm:inline-block shadow-lg", children: "Get Started" })
  ] });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsx("header", {
      className: "w-full bg-white shadow-md",
      children: /* @__PURE__ */ jsx(Navigation, {})
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    }), /* @__PURE__ */ jsx("footer", {
      children: /* @__PURE__ */ jsx(Footer, {})
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  const FeatureIcon = ({ children, className }) => /* @__PURE__ */ jsx("div", { className: "mb-4 flex justify-center", children: /* @__PURE__ */ jsx("svg", { className: `w-10 h-10 text-secondary ${className}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children }) });
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx("section", { id: "hero", className: "py-16 md:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-6xl font-extrabold text-primary leading-tight mb-4", children: [
        "The Science of ",
        /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "Sustainable Speed." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl text-gray-600 max-w-3xl mx-auto", children: "Stop guessing. Start training smarter. runplanner.fit provides **free**, research-backed weekly run plans designed to **minimize overuse injuries** and maximize your long-term efficiency." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4", children: /* @__PURE__ */ jsx("a", { href: "#tool", id: "tool", className: "cta-button inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-secondary hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-secondary focus:ring-opacity-50", children: "START YOUR FREE PLAN NOW" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gray-500", children: "100% Free. No credit card required." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "features", className: "py-16 bg-primary text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Built on Principles, Backed by Data" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center p-6 rounded-xl bg-primary/70 border border-secondary/50 shadow-lg", children: [
          /* @__PURE__ */ jsx(FeatureIcon, { children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Scientific Strategy" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Our plans integrate gold-standard training concepts—like **progressive overload** and the **10% Rule**—but customized based on recent sports science literature." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-6 rounded-xl bg-primary/70 border border-secondary/50 shadow-lg", children: [
          /* @__PURE__ */ jsx(FeatureIcon, { children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Injury Minimization" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "We prioritize **long-term health** by carefully managing load and recovery, significantly reducing the risk of common overuse injuries for all runner levels." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center p-6 rounded-xl bg-primary/70 border border-secondary/50 shadow-lg", children: [
          /* @__PURE__ */ jsx(FeatureIcon, { children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: "Seamless Planning" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Get your plan and immediately sync it to your **Google Calendar**. Focus on execution, not data entry. Your plan, automatically where you need it." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "authority", className: "py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:order-1", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-secondary uppercase tracking-wider", children: "How We Plan" }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-primary mt-1 mb-6", children: "The Engine Behind Your Success" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "Our proprietary algorithm, **The Sustainable Performance Model (SPM)**, dynamically adjusts your weekly load based on three core inputs: your current fitness level, your goal, and your reported fatigue." }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-5 text-gray-700", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx("svg", { className: "flex-shrink-0 w-6 h-6 text-secondary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.007 3.238 1.487 5.925 3.528 7.373a11.97 11.97 0 01.76-1.554 12.003 12.003 0 01-1.226-6.819c-.067-1.12.28-2.222.955-3.195z" }) }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Calculated Progression:" }),
              " Volume is managed week-to-week using principles derived from the **Acute-to-Chronic Workload Ratio (ACWR)** to avoid sudden spikes in stress."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx("svg", { className: "flex-shrink-0 w-6 h-6 text-secondary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.007 3.238 1.487 5.925 3.528 7.373a11.97 11.97 0 01.76-1.554 12.003 12.003 0 01-1.226-6.819c-.067-1.12.28-2.222.955-3.195z" }) }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Mandatory Rest:" }),
              " Automatically incorporates scheduled rest weeks and recovery days, recognizing that fitness is built during **rest**, not just work."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start space-x-3", children: [
            /* @__PURE__ */ jsx("svg", { className: "flex-shrink-0 w-6 h-6 text-secondary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.007 3.238 1.487 5.925 3.528 7.373a11.97 11.97 0 01.76-1.554 12.003 12.003 0 01-1.226-6.819c-.067-1.12.28-2.222.955-3.195z" }) }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("strong", { children: "Individualized Load:" }),
              " Moves beyond generic plans by recommending specific paces and efforts based on proven physiological markers."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:order-2 p-8 bg-white border border-gray-200 rounded-xl shadow-xl", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-accent uppercase tracking-wider", children: "Research Focus" }),
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-primary mt-1 mb-4", children: "Our Commitment to Evidence" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 border-l-4 border-secondary pl-3 italic", children: "All plans are generated with direct reference to clinical and sports science journals to ensure best practices in training load management." }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Key Research Pillars:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside space-y-2 pl-4", children: [
            /* @__PURE__ */ jsx("li", { children: "Gabbett, T. J. (2016). *The training—injury prevention paradox: should athletes be training smarter and harder?*" }),
            /* @__PURE__ */ jsx("li", { children: "Impellizzeri, F. M. (2020). *ACWR and the risk of injuries: an important controversy.*" }),
            /* @__PURE__ */ jsx("li", { children: "Foster, C. (1998). *Monitoring training in athletes with reference to overtraining syndrome.*" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm text-secondary hover:underline font-semibold block mt-4", children: "View Full Research Citations (Coming Soon) →" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "final-cta", className: "py-16 bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-white mb-4", children: "Ready to Run Smarter, Not Harder?" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-white/90 mb-8", children: "Generate your personalized, injury-proof running plan in minutes and sync it directly to your digital calendar." }),
      /* @__PURE__ */ jsx("a", { href: "#tool", className: "cta-button inline-flex items-center justify-center px-12 py-5 border border-transparent text-xl font-bold rounded-full text-secondary bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition duration-300", children: "GET MY FREE WEEKLY PLAN" })
    ] }) })
  ] });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CnyD1sGY.js", "imports": ["/assets/chunk-OIYGIGL5-BRnGszPT.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BhoLJ6D6.js", "imports": ["/assets/chunk-OIYGIGL5-BRnGszPT.js"], "css": ["/assets/root-CSjNijWt.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-C9EQMEtg.js", "imports": ["/assets/chunk-OIYGIGL5-BRnGszPT.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c6b0ec5a.js", "version": "c6b0ec5a", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
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
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
