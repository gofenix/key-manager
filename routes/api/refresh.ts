import { FreshContext } from "$fresh/server.ts";
import { getAll } from "../../utils/db.ts";

const kv = await Deno.openKv();

export const handler = async (_req: Request, _ctx: FreshContext): Response => {
  const keys = await getAll();
  for(let item of keys) {
    await kv.set(['keys', item.key_name], item)
  }

  const entries = kv.list({ prefix: ["keys"] })
  for await (const entry of entries) {
    console.log(entry.key); // ["keys", "ada"]
    console.log(entry.value); // { ... }
    console.log(entry.versionstamp); // "00000000000000010000"
  }
  return Response.json({ "refresh": "ok" });
};
