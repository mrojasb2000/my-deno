import { Application } from "https://deno.land/x/abc/mod.ts";
import "https://deno.land/x/denv/mod.ts";
/* import {
  fetchAllEmployees,
  createEmployee,
  fetchOneEmployee,
  updateEmployee,
  deleteEmployee,
} from "./controllers/employees.ts"; */
import {
  createEmployee,
} from "./controllers/employees.ts";
import { ErrorMiddleware } from "./middlewares/error.ts";

const port = 5000;
const app = new Application();

app.use(ErrorMiddleware);

/* app.get("/employees", fetchAllEmployees)
.get("/employees/:id", fetchOneEmployee)
.put("/employees/:id", updateEmployee)
.delete("/employees/:id", deleteEmployee)
 */
app.post("/employees", createEmployee)
  .start({ port });

console.log(`Server listening on http://localhost:${port}`);
