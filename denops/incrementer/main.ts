import type { Denops } from "./deps.ts";
import { execute } from "./deps.ts";
import { cword } from "./cword.ts";
import { write } from "./write.ts";
import { weeks } from "./values/weeks.ts";
import { incOrDec } from "./incOrDec.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async increment(): Promise<void> {
      const word: string = await cword(denops);
      let num = Number(word);

      if (isNaN(num)) {
        const inc = incOrDec(weeks, word, "increment");
        write(denops, inc);
      } else {
        ++num;
        write(denops, num);
      }
    },

    async decrement(): Promise<void> {
      const word: string = await cword(denops);
      let num = Number(word);

      if (isNaN(num)) {
        const inc = incOrDec(weeks, word, "decrement");
        write(denops, inc);
      } else {
        --num;
        write(denops, num);
      }
    },
  };

  await execute(
    denops,
    `
    command! Incrementer echomsg denops#request('${denops.name}', 'increment', [])
    command! Decrement echomsg denops#request('${denops.name}', 'decrement', [])
    `,
  );
}
