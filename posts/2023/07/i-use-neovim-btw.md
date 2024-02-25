---
date: 2023-07-28 01:00:00+00:00
description: ''
layout: layouts/post
permalink: i-use-neovim-btw/
tags:
- post
title: I Use Neovim
---

I usually tend to write about the tools that I use, whether it's programming,
or writing for my blog. Well, this time, I guess it's a bit of both. As I'm now
using [Neovim][neovim] for practically any task that involves writing text.

I've been using it at work, with a recent JavaScript project I've been working
on, to write quick notes or todo lists, and I've also been using it recently to
write blog posts.

Because of its extensibility, I've managed to adapt it to my own specific
needs. I have some basic preferences that you'll have in most editors like
themes, layouts, code highlighting, etc. But I've also got a fuzzy finder for
files (and buffers), code highlighting/formatting, code completion, and even
refactoring functionality.

I've only really scratched the surface so far, but I'm already finding it to be
an amazing tool. Sure, there's a steep learning curve. I had to figure out what
plug-ins I needed, learn how to configure them, learn [vim motions][vm], and
also configure a bunch of key mappings for the specific functions that I want
to access in certain contexts. (If you're interested, my [Neovim config
is on GitHub][config])

I've definitely learned that it's not a tool for everyone. Turns out not every
developer wants to use or even cares about the command line. I got a few
comments like "I just don't see the point" or "I'm too used to my mouse to
use the terminal".

Maybe it isn't objectively better than an IDE for writing code, but it certainly
*feels* better to me. Maybe it's the distraction-free way of working, or that the code is in its
most primitive form. But, at least for now, it fits the way I want to work.

And like I said, I'm using it for all sorts of text now. Because if I'm
spending most of my time writing code in Neovim, having another plain text todo
list in another file is really handy. And once I found myself spending so much
time in Neovim at work, when I got home, I started doing the same.

So, when I wanted to write a blog post recently, I decided to try and use
Neovim for that. Because after all, my blog is just a collection of static
Markdown files that I manage with git. Now, my process of writing a new blog
post is to create a new text file, write the post in Neovim, and then use git
to commit and push the changes. After that, my site regenerates
automatically.

I don't know how deep I'll go with Neovim. I still expect any work I do in Java
at work to be in IntelliJ, and I can't see myself using it for my apps either.
But for everything else, I think this will be my editor of choice.

And as much as I am enjoying using it, I do find it rather funny that I have
a powerful M1-powered MacBook Pro, running a nicely designed, modern operating
system, and there I am, with a terminal running full screen and dealing with
plain text files.

Next up on my list of things to learn, is [tmux][tmux]. I've seen a lot of
people use it, and it feels like the logical next step. After that, I want to
see if I can build out some of my own Neovim setup with a way to use text
snippets, and to output dynamic data such as the curent date.

Now that I'm in this world, I would expect that I'm going to start writing
about it a lot more. So you may start seeing the blog sway a bit more technical
in the future.

[neovim]: https://neovim.io
[vim]: https://www.vim.org
[config]: https://github.com/chrishannah/nvim-config
[tmux]: https://github.com/tmux/tmux/wiki