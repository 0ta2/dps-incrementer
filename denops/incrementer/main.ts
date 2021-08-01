import type { Denops } from "./deps.ts";
import { ensureString, execute, util } from "./deps.ts";
import { cword } from "./cword.ts";
import { write } from "./write.ts";
import { weeks } from "./values/weeks.ts";
import { incOrDec } from "./incOrDec.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async incrementer(direction: unknown): Promise<void> {
      const word: string = await cword(denops);

      const reg = /^(0+)/;

      // A number with a zero at the beginning.
      if (reg.test(word)) {
        const regWord = reg.exec(word);
        if (regWord !== null) {
          let num = Number(word);
          if (direction === "increment") {
            ++num;
            write(denops, regWord[1] + num);
          } else {
            --num;
            write(denops, regWord[1] + num);
          }
        }
        return;
      }

      // Number
      if (util.isNumeric(word)) {
        let num = Number(word);
        if (direction === "increment") {
          ++num;
          write(denops, num);
        } else {
          --num;
          write(denops, num);
        }

        return;
      }

      // Week
      if (weeks.includes(word)) {
        ensureString(direction);
        const inc = incOrDec(weeks, word, direction);
        write(denops, inc);
        return;
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
