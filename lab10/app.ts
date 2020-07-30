import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://deno.land/x/view_engine/mod.ts";
import { upload } from "https://deno.land/x/upload_middleware_for_oak_framework/mod.ts";

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
indexRouter
    .get( '/', indexController )
    .post('/upload', upload('uploads'), async(context: any, next: any) => {
        const file = context.uploadedFiles;
        console.log(file);
        context.response.redirect('/');
    })

app.use( indexRouter.routes() );
app.use(indexRouter.allowedMethods());

console.log('App is litening on PORT 8000');

await app.listen({ port: 8000 });



