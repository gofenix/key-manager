import { createClient } from "supabase";

const supabaseUrl = "https://ttsogebedhkttgyrgjtc.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_KEY") || '123456';
const client = createClient(supabaseUrl, supabaseKey);

export async function getAll() {
  let { data: key_manager, error } = await client
    .from("key_manager")
    .select("*");
  console.log(key_manager);
  console.log(error);
}

export async function getResultByName(name: string): Promise<string> {
  let { data, error } = await client
    .from("key_manager")
    .select("*")
    .eq("key_name", name);

  if (error) {
    console.error(error);
    return "";
  }
  console.log(data);

  if (data.length > 0) {
    return data[0].key_result;
  }
  return "";
}
