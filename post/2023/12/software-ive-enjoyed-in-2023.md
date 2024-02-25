---
categories:
- apps
- software
date: 2023-12-24 16:20:56
layout: layouts/post
permalink: software-ive-enjoyed-in-2023/
tags:
- post
title: Software I've Enjoyed in 2023
---

2023 is nearly at a close, so I thought I'd write about the software that I've
enjoyed using this year. Some of these I've been using for a while, others I've
either moved back to this year, or tried out for the first time.

## Things

![Screenshot](https://cdn.chrishannah.me/images/2023/12/things.png)

I'm not exactly a big user of task manager apps, but for the odd occasion where
i want to track important tasks, or keep track of things like packing luggage
for a trip, or purchasing/wrapping christmas presents, [Things](https://culturedcode.com/things/) has been a really
good fit for me. I'm pretty sure it's capable of much more than I use it for,
but I'd rather that, than use something that forces me to change my habits.

## Neovim

![Screenshot](https://cdn.chrishannah.me/images/2023/12/neovim.png)

This is probably symbolic of my the general way I've been using my computers
recently,
but I have to give a massive mention to [Neovim](https://neovim.io). You may
not have heard of Neovim, but if you've heard of Vim/Vi, I'm sure you'll have
a rough idea of what it is.

I've been using Neovim for most of my development work (outside of Java),
writing short notes, editing small files, and also to write blog posts. It's
a truly powerful piece of software, and the more I'm both learning and
customising it, I'm becoming faster at using it, and it's becoming much more
moulded to my own use cases.

If you're interested, my Neovim config is [available on
GitHub](https://github.com/chrishannah/nvim-config).

## Artifact

![Screenshot](https://cdn.chrishannah.me/images/2023/12/artifact.png)

Apart from social media, I've found [Artifact](https://artifact.news) to be a really good tool to
surface news, blog posts, links, apps, etc. that are both relevant and
interesting to me. I don't use it every day, but I can easily get lost in there
if I want to. It sends articles that it things I'd like regularly as push
notifications, which aren't always perfect, but they're still useful enough
that I've left them on.

The only downside to Artifact is that it's iOS only. I'd love to either see
a native Mac app, or even just a web interface that I could use.

## NetNewsWire

![Screenshot](https://cdn.chrishannah.me/images/2023/12/netnewswire.png)

This is an app I've used for a while. But it's such a great RSS reader, I can't
say I've even wanted to even think about switching to anything else. I'm using
[NetNewsWire](https://netnewswire.com) mainly to follow people, whether it's developers, personal
bloggers, or even a few newsletters.

It seems to me that there's been a bit of a resurgence in personal blogging
recently, so I've definitely been using NetNewsWire more than past years. And
I hope it continues.

## Homebrew

![Screenshot](https://cdn.chrishannah.me/images/2023/12/homebrew.png)

The world of package managers[^2] for macOS is a lonely one. Fortunately,
what we have is [Homebrew](https://brew.sh). Maybe it's because I appreciate
command line tools, or just that I dabble occasionally with Linux, but having
a package manager is becoming essential for me. Whether it's to install a CLI
tool like eza, neovim, or ripgrep, or even non-open source software through
Homebrew Cask, it's a really easy way to both install and manage software.

I use Homebrew myself as a developer as well. I distribute [Text Case
CLI](https://github.com/chrishannah/textcase-cli) through a custom Homebrew
tap. Simply because I didn't want to go through the hassle of signing and
notarising it as an app, and then have the extra baggage of maintaining it that
way. Instead, when you use Homebrew to install Text Case CLI, it clones the
public repository, and then compiles it on your machine.

I've been through a few laptops at work recently, and that's when I really
notice how useful it is to have a package manager. Because in one command you
can pretty much get all your required tools installed. Which means you don't
need to go through the boring task of going to various app websites,
downloading installers, expanding DMGs, etc.

## Amethyst

![Screenshot](https://cdn.chrishannah.me/images/2023/12/amethyst.png)

I've been [using this for
a while](https://chrishannah.me/using-a-tiling-window-manager-on-macos), but
I'm a big fan of tiling window managers[^1], and [Amethyst](https://ianyh.com/amethyst/) is the best one I've come across for macOS so far.

Sure, I'd much prefer a proper native tiling window system with better
workspace support. But at least Amethyst gives me the tiling support, and
also some keybindings that can help you throw windows between macOS spaces.
It's definitely not for everyone, but as someone that typically works from
a laptop screen, it's super handy to be able to manage my windows and spaces
from my keyboard.

## Safari Web Apps

![Screenshot](https://cdn.chrishannah.me/images/2023/12/add-to-dock.png)

This isn't an app in it's own right. But the recent feature in macOS Sonoma to
[save any website in Safari as a web
app](https://support.apple.com/en-gb/104996#) is so useful for when an app or
service only exists online. Back when I was playing Chess a lot, I had the
Chess.com website saved in my dock as a web app. At home I just have a web app
for Fosstodon (the Mastodon instance I'm on), and at work, I have a bunch of
them for internal web tools that we use.

The best thing is that they're not the same as typical web app turned
native, like you may see with Electron-based apps. Instead, they look, feel, and
perform, exactly how they would if they were opened in Safari.


[^1]: A window manager that resizes your windows into always-visible tiles on
    your screen (or workspace). [Read more](https://en.wikipedia.org/wiki/Tiling_window_manager).
[^2]: Basically, a tool that helps you automate the management of installing,
    configuring, and removal of software (packages). [Read more](https://en.wikipedia.org/wiki/Package_manager).