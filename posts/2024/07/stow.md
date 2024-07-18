---
categories:
- post
date: 2024-07-17 20:00:00+01:00
layout: layouts/post
permalink: using-stow-to-make-managing-your-dotfiles-easier/
title: Using Stow to Make Managing Your Dotfiles Easier
tags:
- post
- dotfiles
- stow
---

As someone who regularly switches between various macOS and Linux machines,
keeping my dotfiles synced everywhere gets a bit annoying. Fortunately, I've
recently come across a tool called [Stow][stow] from GNU, which helps you manage
your dotfiles.

Stow, combined with a git repository, makes managing and syncing dotfiles
between devices much, much easier.

To install Stow, you'll likely find it in your package manager under "stow". 
For example, for macOS running Homebrew, you'd literally just need to run 
`brew install stow`.

---

As for using Stow, it's probably useful to first know how it works. That way
you'll have a better picture of how it ties everything together.

Let's take this scenario - you have your Neovim configuration saved under
`~/.config/nvim` like normal. 

If you want to synchronise this between devices,
then maybe you could just turn that directory into a git repository itself. 

But if you have a bunch of configs for tools, some in .config, others inside your
home directory, and some just plain config files mixed in there, it can get a
bit messy.

That's where Stow comes in. You can have a central place where you store all
your configurations for various tools. And then you can then choose to "stow"
(load into the relevant directory) the configuration for whichever tool you
want. 

This means you can have one git repository, with a collection of individually
defined packages, which then can be synchronised to various devices. And then on
each of these devices, you can choose a subset of these packages to use.

Let's go back to a real world scenario again. Let's say this is your home
directory:

```tree
.
├── .config/
│   ├── nvim/
│   │   ├── init.lua
│   │   └── lua/
│   │       └── stuff.lua
│   └── tmux/
│       └── tmux.conf
└── .zshrc
```

You can see there are three different things being configured, Neovim, tmux, and
zsh. With Stow, you could have these as three differently defined packages.

Each package in stow, is defined by it being a directory with its name being
the package name. Inside the directory would be the folder structure as if it
were in the home directory.

This would mean, the above configuration inside a central dotfiles directory,
would look like this:

```tree
.
├── nvim/
│   └── .config/
│       └── nvim/
│           ├── init.lua
│           └── lua/
│               └── stuff.lua
├── tmux/
│   └── .config/
│       └── tmux/
│           └── tmux.conf
└── zsh/
    └── .zshrc
```

With that dotfile directory, to configure all of these packages in the local
machine, you would just need to run this command in the directory:

```bash
stow nvim tmux zsh
```

That command would then load all of the packages, by creating a [symbolic
link][sl] from all the relevant files and folders into the correct place.

To get an example, here is a screenshot showing my .config directory with all
the symbolic links, and my .dotfile directory.

[![](/images/2024/07/stow.png)](/images/2024/07/stow.png)

Just as a tip, the default behaviour of the `stow [package]` command, is that it
works when you are in a directory that is one level below your home directory.

You can read the full capabilities of the `stow` command via the man page, or
via the [documentation][docs]. However, if you want a simpler life, you can just
do what I do, and create a directory for your dotfiles like this:
`~/.dotfiles/`.

---

Once you start building up your collection of config packages, and tracking the
directory via git, it becomes really easy to move between machines.

All you would need to do is to pull the git repository, and then use `stow` to
load whichever packages you wanted to load on that particular machine.

You could even have slightly different versions of a given configuration, and
then load a specific version based on the machine you were on. Maybe you have
something that fits your use case at work or home, or even a different platform
such as Mac or Linux.

Once you start using it, it doesn't take long until you start to feel the
benefits.

[docs]: https://www.gnu.org/software/stow/manual/stow.html#Invoking-Stow
[stow]: https://www.gnu.org/software/stow/
[sl]: https://en.wikipedia.org/wiki/Symbolic_link
