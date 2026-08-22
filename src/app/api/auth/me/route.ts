import { error, getSessionUserPublic, json } from "@/lib/api";

export async function GET() {
  const user = await getSessionUserPublic();
  if (!user) return error("Non connecté.", 401);
  return json(user);
}
