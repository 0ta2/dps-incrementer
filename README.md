# dps-incrementer

Increments or decrements a number, day of the week, etc.

# Install

Please install [deno](https://deno.land/)
Next, install the plug-in.

packer.nvim

```
use "vim-denops/denops.vim"
use "0ta2/dps-incrementer"
```

# Usage

Here is an example in a lua configuration.

```
vim.api.nvim_set_keymap('n', '+', ':Incrementer increment<CR>', { noremap = true, silent = false })
vim.api.nvim_set_keymap('n', '-', ':Incrementer decrement<CR>', { noremap = true, silent = false })
```
