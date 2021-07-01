import type { Denops } from "./deps.ts";

export async function cword(denops: Denops): Promise<string> {
  const cword = await denops.call("expand", "<cword>") as string;
  return cword;
}
