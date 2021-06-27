import { main } from "./deps.ts";

main(async ({ vim }) => {
  vim.register({
    async increment(): Promise<void> {
      const cword = await vim.call("expand", "<cword>") as number;

      const num = Number(cword) + 1;

      await vim.cmd(`let @a = "${num}"`);
      await vim.cmd('normal "_diw');
      await vim.cmd('normal "aP');

      console.log(num);
    },

    async decrement(): Promise<void> {
      const cword = await vim.call("expand", "<cword>") as number;

      const num = Number(cword) - 1;

      await vim.cmd(`let @a = "${num}"`);
      await vim.cmd('normal "_diw');
      await vim.cmd('normal "aP');

      console.log(num);
    },
  });

  await vim.execute(`
    command! Incrementer echomsg denops#request('${vim.name}', 'increment', []),
    command! Decrement echomsg denops#request('${vim.name}', 'decrement', [])
  `);
});
