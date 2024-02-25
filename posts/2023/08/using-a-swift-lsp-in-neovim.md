---
date: 2023-08-24 21:30:00+00:00
description: ''
layout: layouts/post
permalink: using-a-swift-lsp-in-neovim/
tags:
- post
title: Using a Swift LSP in Neovim
---

I spent quite a bit of time trying to work out how to get a Swift LSP working in Neovim the other day. Enough time that I wanted to share it here.

I won't go into too much detail about what an LSP is, how it works, or its benefits. There are a lot of other people who can do a much better job of that than me.

However, I would like to say that this is just how I have it working myself. There are bound to be many other ways you can get a Swift LSP working in Neovim. It just happens that this is a pretty simple configuration, that I will likely also improve in the future.

The first step is to obviously install the Swift LSP. Apple's one (I'm not sure if there are any others) is [SourceKit-LSP](https://github.com/apple/sourcekit-lsp). You can build this from source (this is what I did), or the README also explains that it's also included in the [toolchains found on Swift.org](https://www.swift.org/download/). So do whatever is best for you. But, be sure that it is accessible on your `$PATH`.

After that, you'll need to configure Neovim to find the LSP, tell it what files to look for (swift), how it can detect the root directory, the name of the command, etc. And then, more importantly, start the LSP, and attach it to the buffer.

My config looks like this:

```lua
 local swift_lsp = vim.api.nvim_create_augroup("swift_lsp", { clear = true })
 vim.api.nvim_create_autocmd("FileType", {
 	pattern = { "swift" },
 	callback = function()
 		local root_dir = vim.fs.dirname(vim.fs.find({
 			"Package.swift",
 			".git",
 		}, { upward = true })[1])
 		local client = vim.lsp.start({
 			name = "sourcekit-lsp",
 			cmd = { "sourcekit-lsp" },
 			root_dir = root_dir,
 		})
 		vim.lsp.buf_attach_client(0, client)
 	end,
 	group = swift_lsp,
 })
 ```

This is Lua code, so use it in whatever `.lua` file makes sense to you. However, if you just want to include it in a `.vim` file, you'll need to wrap it like so:

 ```vim
 " lsp
 lua << EOF
 -- lua code goes here
 EOF
 ```

After that, you should be able to write terrible Swift code and have it tell you all the things that you're doing wrong.

Like this, for example:

![swift lsp](/images/2023/08/swift-lsp.png)

For reference, my [Neovim config is available on GitHub](https://github.com/chrishannah/nvim-config).