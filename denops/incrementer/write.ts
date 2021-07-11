import type { Denops } from "./deps.ts";
import { fn } from "./deps.ts";

export async function write(denops: Denops, num: number) {
  // Save the current register to a variable.
  const regSave = await fn.getreg(denops, "a");

  await fn.setreg(denops, "a", num);
  await denops.cmd('normal "_diw');

  const col = await fn.col(denops, ".") as number;
  const line = await fn.getline(denops, ".");

  if (line[col - 1] === " ") {
    await denops.cmd('normal "ap');
  } else {
    await denops.cmd('normal "aP');
  }

  // Return the evacuated register.
  await fn.setreg(denops, "a", regSave);
}
