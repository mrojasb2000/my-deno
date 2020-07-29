export default async (
  { request, response }: { request: any; response: any },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid user data" };
    return;
  }

  const {
    value: { name },
  } = await request.body();
  console.log(name);

  if (!name) {
    response.status = 422;
    response.body = { msg: "Incorrect user data. Name are required" };
    return;
  }

  console.log(name);

 /*  const userId = await createUser({
    name,
    role,
    jiraAdmin,
  }); */

  response.body = { msg: "User created", name };
};
