import { FreshContext, Handlers } from "$fresh/server.ts";
import { createClient } from "supabase";
import { getAll, getResultByName } from "../../../utils/db.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const key = ctx.params.key;
    const result = await getResultByName(key);
    // const key = ["user", id];
    // const user = (await kv.get<User>(key)).value!;
    return Response.json({ key, result });
  },
};
