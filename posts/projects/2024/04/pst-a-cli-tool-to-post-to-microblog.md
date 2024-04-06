---
categories:
- open-source
- rust
- development
date: 2024-04-05 23:18:29
layout: layouts/post
permalink: projects/2024/pst-a-cli-tool-to-post-to-microblog/
tags:
- post
title: A CLI Tool to Post to Micro.Blog
---

I've been working on a small command line tool recently. It's essentially a
simple way to write a short post on Micro.blog from the command line, called
[pst][pst].

It's probably not the typical place people tend to do their microblogging. But I
did it for a few reasons:

1. I live in a terminal when I use a computer, so it's easy for me to quickly
   write a post, or share a link. I don't always have Micro.blog open.
2. There's obviously less distractions when you can just post and carry on with
   whatever you were doing.
3. It's a simple idea, so it would be perfect to use it as a learning
   oppurtunity.
4. I don't get many ideas for small projects like this, so I have to run with
   them. Otherwise I'd never build anything.

So, now you know the reasons, I'll explain a bit more about [pst][pst], how to
install it, configure your blog, and also how to use it.

First of all, you can install pst from [crates.io][cc] or [homebrew][hb]:

**crates.io**

```
cargo install pst
```

**homebrew**

```
brew tap chrishannah/pst
brew install pst
```

To configure pst, all you need to do is to generate an app token from Micro.blog
(find that in your Account settings), and then store that in a JSON file under
`~/.config/pst/config.json`. The specific format is in the [README][pst].

Using pst is pretty simple, you have the `pst` command, followed by the type
(`post` or `draft`), and then your content. Examples:

```
pst draft "don't show this to anyone"

pst post "hello, losers!"
```

After that, you'll see some handy links in the terminal for where you can view,
preview, or edit the post on Micro.blog.

I forgot to also say that it's built with Rust! I'd been wanting to write
something in Rust for a while, but it was never the right time, and I also
didn't have the correct project. Luckily for me, it's a small project, so I
decided to use it to learn some Rust.

Obviously I haven't used it for long (or for much), but I've really enjoyed
using the language. And especially for these types of tools, I can see myself
using Rust even more in the future. (Especially because I have my Neovim config
working perfectly with Rust now.)


[pst]: https://github.com/chrishannah/pst
[cc]: https://crates.io/
[hb]: https://brew.sh/
