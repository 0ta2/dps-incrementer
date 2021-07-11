import type { Denops } from "./deps.ts";
import { execute } from "./deps.ts";
import { cword } from "./cword.ts";
import { write } from "./write.ts";
import { weeks } from "./values/weeks.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async increment(): Promise<void> {
      const word: string = await cword(denops);
      let num = Number(word);

      if (isNaN(num)) {
        if (weeks.includes(word)) {
          const weekIndex = weeks.indexOf(word);
          if (weeks.length === weekIndex + 1) {
            const week = weeks[0];

            await denops.cmd(`let @a = "${week}"`);
            await denops.cmd('normal "_diw');

            const col = await denops.call("col", ".") as number;
            const currentLineText = await denops.call("getline", ".") as string;

            if (currentLineText[col - 1] === " ") {
              await denops.cmd('normal "ap');
            } else {
              await denops.cmd('normal "aP');
            }
          } else {
            const week = weeks[weekIndex + 1];

            await denops.cmd(`let @a = "${week}"`);
            await denops.cmd('normal "_diw');

            const col = await denops.call("col", ".") as number;
            const currentLineText = await denops.call("getline", ".") as string;

            console.log(currentLineText);
            if (currentLineText[col - 1] === " ") {
              await denops.cmd('normal "ap');
            } else {
              await denops.cmd('normal "aP');
            }
          }
        }
      } else {
        ++num;
        write(denops, num);
      }
    },

    async decrement(): Promise<void> {
      const word: string = await cword(denops);
      let num = Number(word);

      if (isNaN(num)) {
        if (weeks.includes(word)) {
          const weekIndex = weeks.indexOf(word);

          if (weekIndex === 0) {
            const week = weeks[6];

            await denops.cmd(`let @a = "${week}"`);
            await denops.cmd('normal "_diw');

            const col = await denops.call("col", ".") as number;
            const currentLineText = await denops.call("getline", ".") as string;

            if (currentLineText[col + 1] === " ") {
              await denops.cmd('normal "ap');
            } else {
              await denops.cmd('normal "aP');
            }
          } else {
            const week = weeks[weekIndex - 1];

            await denops.cmd(`let @a = "${week}"`);
            await denops.cmd('normal "_diw');

            const col = await denops.call("col", ".") as number;
            const currentLineText = await denops.call("getline", ".") as string;

            if (currentLineText[col + 1] === " ") {
              await denops.cmd('normal "ap');
            } else {
              await denops.cmd('normal "aP');
            }
          }
        }
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
