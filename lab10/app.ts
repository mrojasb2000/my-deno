import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";
import { upload } from "https://deno.land/x/upload_middleware_for_oak_framework/mod.ts";

// Setting up boilerplate for view-engine
const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

// Initiate app
const indexRouter: Router = new Router();
const app: Application = new Application();

// Passing view-engine as middleware
app.use( viewEngine( oakAdapter, ejsEngine, { 
  viewRoot: '.',
  viewExt: '.ejs'
}));

// Allowing Static file to fetch from server
app.use(async (ctx,next) => {
    await send(ctx, ctx.request.url.pathname,{
     root: `${Deno.cwd()}/static`
      })
    next()
   });

const indexController = ( ctx: any ) => {
  ctx.render("index", { data: { name: "John" } });
};

// Creating Routes
indexRouter
    .get( '/', indexController )
    .post('/upload', upload('uploads'), async(context: any, next: any) => {
        const file = context.uploadedFiles;
        console.log(file);
        context.response.redirect('/');
    })

// Adding middleware to require our router
app.use( indexRouter.routes() );
app.use(indexRouter.allowedMethods());

// Making app to listen to port
console.log('App is litening on PORT 8000');
await app.listen({ port: 8000 });



