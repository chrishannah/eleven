---
categories:
- tools
- command-line
date: 2023-12-19 20:57:03
layout: layouts/post
permalink: a-better-version-of-the-ls-command/
tags:
- post
title: A Better Version of the ls Command
---

I was watching various videos recently about various command line tools that
could be useful on macOS, and one peaked my interest, a replacement for the
`ls` (list directory contents) command, called [exa][exa]. It's still *just*
listing the contents of a directory, but it has a lot of nice-to-have features
like better colouring, better visualisation of metadata, knowledge about more
file types, and a bunch of options that you can use.

TL;DR, exa is [no longer being maintained][exag]. However, a replacement has
now risen out of the ashes, and is called [eza][eza].

Essentially, eza, is a maintained fork of exa, and adds even more features,
that you definitely didn't know you needed. Nevertheless, even just using the
default behaviour, you'll find it much more pleasant to use than `ls`.

I have it currently replacing three commands, `ls` maps directly to `eza`, `ll`
is mapped to `eza --long`, and also because it has support for trees, `tree` is also mapped to `eza --tree`.

Some examples to give you an idea what it looks like:

`eza`

![](https://chrishannah.me/images/2023/12/eza.png)

`eza --long`

![](https://chrishannah.me/images/2023/12/eza-long.png)

`eza --tree`

![](https://chrishannah.me/images/2023/12/eza-tree.png)

You can find the code, docs, and install instructions via [the GitHub
repo][eza]. But if you're on a Mac, and you use [Homebrew][hb], you just need to
type `brew install eza`.


[exa]: https://the.exa.website
[eza]: https://github.com/eza-community/eza
[hb]: http://brew.sh
[exag]: https://github.com/ogham/exa
