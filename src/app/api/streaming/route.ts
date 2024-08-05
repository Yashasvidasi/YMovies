import { NextRequest, NextResponse } from "next/server";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { IncomingMessage, ServerResponse } from "http";

// Extend the Options type to include the onProxyRes property
interface ExtendedOptions {
  target: string;
  changeOrigin: boolean;
  selfHandleResponse: boolean;
  onProxyRes?: (
    proxyRes: IncomingMessage,
    req: IncomingMessage,
    res: ServerResponse
  ) => void;
}

const proxyConfig: ExtendedOptions = {
  target: "https://multiembed.mov",
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyRes: (
    proxyRes: IncomingMessage,
    req: IncomingMessage,
    res: ServerResponse
  ) => {
    let body: Uint8Array[] = [];
    proxyRes.on("data", (chunk) => {
      body.push(chunk);
    });
    proxyRes.on("end", () => {
      const responseBody = Buffer.concat(body).toString();
      const modifiedBody = responseBody.replace(
        "</body>",
        `
        <script>
          window.addEventListener('beforeunload', function (event) {
            event.preventDefault();
            event.returnValue = '';
          });
          window.addEventListener('popstate', function (event) {
            history.pushState(null, null, location.href);
          });
        </script>
      </body>`
      );
      res.setHeader("Content-Type", "text/html");
      res.statusCode = proxyRes.statusCode || 200;
      res.end(modifiedBody);
    });
  },
};

const proxy = createProxyMiddleware(proxyConfig);

export async function GET(req: NextRequest) {
  return new Promise((resolve, reject) => {
    const proxyReq = new IncomingMessage(req as any);
    const proxyRes = new ServerResponse(proxyReq);

    proxyRes.on("finish", () => {
      resolve(
        new Response(proxyRes.outputData[0].data, {
          status: proxyRes.statusCode,
          headers: proxyRes.getHeaders() as HeadersInit,
        })
      );
    });

    proxy(proxyReq, proxyRes, (err: any) => {
      if (err) {
        reject(
          new Response(JSON.stringify({ error: "Proxy error", details: err }), {
            status: 500,
          })
        );
      }
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
