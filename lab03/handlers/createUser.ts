import { createUser } from "../services/users.ts";

export default async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid user data" };
    return;
  }
  const body = await request.body();
  console.log(request);


  const {
    value: { name, role, jiraAdmin },
  } = await request.body();

  if (!name || !role) {
    response.status = 422;
    response.body = { msg: "Incorrect user data. Name and role are required" };
    return;
  }

  const userId = await createUser({
    name,
    role,
    jiraAdmin,
  });

  response.body = { msg: "User created", userId };
};
