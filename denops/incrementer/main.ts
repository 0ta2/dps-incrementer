import type { Denops } from "./deps.ts";
import { ensureString } from "./deps.ts";
import { execute } from "./deps.ts";
import { cword } from "./cword.ts";
import { write } from "./write.ts";
import { weeks } from "./values/weeks.ts";
import { incOrDec } from "./incOrDec.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async incrementer(direction: unknown): Promise<void> {
      const word: string = await cword(denops);
      let num = Number(word);

      if (isNaN(num)) {
        ensureString(direction);
        const inc = incOrDec(weeks, word, direction);
        write(denops, inc);
      } else {
        if (direction === "increment") {
          ++num;
          write(denops, num);
        } else {
          --num;
          write(denops, num);
        }
      }
    },
  };

  await execute(
    denops,
    `
    command! -nargs=1 Incrementer echomsg denops#request('${denops.name}', 'incrementer', [<q-args>])
    `,
  );
}
