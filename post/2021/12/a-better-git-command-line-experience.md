---
categories:
- Git
- Terminal
- Command Line
date: 2021-12-05 13:00:37+00:00
description: ''
layout: layouts/post
permalink: a-better-git-command-line-experience/
tags:
- Git
- Terminal
- Command Line
- post
title: A Better Git Command Line Experience
---

I’ll start by saying that I’m the sort of person that prefers to use the command line for Git commands. But there are still occasions where I just found it annoying, such as managing huge amounts of branches, reading old diffs, and also when making a big commit, and wanting to get a quick overview of what’s being added.

For those occasions, I used [Fork](https://git-fork.com). Although I’m sure for my uses, I could have probably used any Git GUI. However, I’m now using a terminal UI called [Lazygit](https://github.com/jesseduffield/lazygit). I think it’s incredible. It lets me stay in the terminal, but gives me the functionality (that I use) of a typical GUI app.

This is what it looks like:

<img src="https://cdn.chrishannah.me/images/2021/12/Screenshot-2021-12-05-at-12.26.56.png" caption="">

Because it’s a terminal app, it’s full of keyboard shortcuts, that make everything super fast. For example, to pull changes, you just use a lowercase `p`, and to push it’s an uppercase `P`.

Most of them are that simple that you just tap one key, but they tend to be limited to the active panel. For example, if you want to manage branches, then the branches panel needs to be the active one. Once it’s active, you can use things like `space` to checkout the selected branch, `n` to create a new branch, `d` to delete, `o` to create a pull request, etc. There’s honestly so many that if you were to check out Lazygit, I’d recommend having a glance at the [full list of key bindings.](https://github.com/jesseduffield/lazygit/blob/master/docs/keybindings/Keybindings_en.md)

This is obviously a small example, but here is the experience of committing files:

<img src="https://cdn.chrishannah.me/images/2021/12/2021-12-05-12.31.26.gif" caption="">

It’s not limited to the keyboard though, you can navigate Lazygit using the cursor as well:

<img src="https://cdn.chrishannah.me/images/2021/12/2021-12-05-12.34.23.gif" caption="">

After installing Lazygit, I haven’t needed to use a GUI application at all. I know some may prefer to use a GUI, but I certainly have found Lazygit so much easier to use. Especially because of the abundance of keyboard shortcuts, and also because it lets me keep my Git activity to a single terminal window.

[Lazygit](https://github.com/jesseduffield/lazygit) works everywhere, macOS, Linux, or Windows, so if you want to enhance your Git experience in the command line, I’d definitely recommend checking it out.
