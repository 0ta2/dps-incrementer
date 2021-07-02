import type { Denops } from "./deps.ts";
import { execute } from "./deps.ts";
import { cword } from "./cword.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async increment(): Promise<void> {
      const word = await cword(denops);

      let num = Number(word);
      if (typeof num === "number") {
        ++num;
        await denops.cmd(`let @a = "${num}"`);
        await denops.cmd('normal "_diw');
        await denops.cmd('normal "aP');
      }
    },

    async decrement(): Promise<void> {
      const word = await cword(denops);

      let num = Number(word);

      if (typeof num === "number") {
        --num;
        await denops.cmd(`let @a = "${num}"`);
        await denops.cmd('normal "_diw');
        await denops.cmd('normal "aP');
      }

      console.log(num);
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
