import { serve } from "https://deno.land/std@0.60.0/http/server.ts";
const s = serve({port: 8000})
console.log("http://localhost:8000");
console.log('Hello from Deno 🖐')
for await (const req of s) {
    req.respond({ body: "Hello World!\n"});
}