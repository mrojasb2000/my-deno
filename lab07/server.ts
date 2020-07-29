import { Application, Router, RouterContext } from 'https://deno.land/x/oak/mod.ts';
//import createUser from "./handlers/createUser.ts";
import getUsers from "./handlers/getUsers.ts";
//import iuser from "./models/user.ts";

const app = new Application();
const router = new Router();
const port = 8000;

interface IUser {
  email: string,
  password: string
}

router
  .get("/users", getUsers)
  .post("/users", async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body()
    const myUser: IUser = body.value  

    console.log(myUser.email);
    response.body = { message: 'Student Added Successfully' }
    response.status = 200
  });

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening to port ${port}`);

await app.listen({port});