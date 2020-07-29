/* import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://deno.land/x/view_engine/mod.ts";
import { upload } from "https://deno.land/x/upload_middleware_for_oak_framework/mod.ts";
 */
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app: Application = new Application();

app.use( viewEngine( oakAdapter, ejsEngine, { 
  viewRoot: '.',
  viewExt: '.ejs'
}));

const indexController = ( ctx: any ) => {
  ctx.render("index", { data: { name: "John" } });
};

const indexRouter: Router = new Router();
indexRouter.get( '/', indexController );

app.use( indexRouter.routes() );

await app.listen({ port: 8000 });



