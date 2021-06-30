import type { Denops } from "./deps.ts";
import { execute } from "./deps.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async increment(): Promise<void> {
      const cword = await denops.call("expand", "<cword>") as number;

      const num = Number(cword) + 1;

      await denops.cmd(`let @a = "${num}"`);
      await denops.cmd('normal "_diw');
      await denops.cmd('normal "aP');

      console.log(num);
    },

    async decrement(): Promise<void> {
      const cword = await denops.call("expand", "<cword>") as number;

      const num = Number(cword) - 1;

      await denops.cmd(`let @a = "${num}"`);
      await denops.cmd('normal "_diw');
      await denops.cmd('normal "aP');

      console.log(num);
    },
  };

  await execute(
    denops,
    `
    command! Incrementer echomsg denops#request('${denops.name}', 'increment', []),
    command! Decrement echomsg denops#request('${denops.name}', 'decrement', [])
    `,
  );
}
