import type { Denops } from "./deps.ts";
import { fn } from "./deps.ts";

export async function write(denops: Denops, word: number | string | null) {
  // Save the current register to a variable.
  const regSave = await fn.getreg(denops, "a");

  const curCol = await fn.col(denops, ".") as number;
  const endLine = await fn.col(denops, "$") as number;

  const isCurCol = (curCol === endLine - 1) ? true : false;

  await fn.setreg(denops, "a", word);
  await denops.cmd('normal "_diw');

  const col = await fn.col(denops, ".") as number;
  const line = await fn.getline(denops, ".");

  if (
    (typeof line[col - 1] === "string" && !(line[col - 1] === " ")) &&
    !(isCurCol)
  ) {
    await denops.cmd('normal "aP');
  } else {
    await denops.cmd('normal "ap');
  }

  // Return the evacuated register.
  await fn.setreg(denops, "a", regSave);
}
