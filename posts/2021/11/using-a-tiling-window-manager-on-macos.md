---
categories:
- Mac
- macOS
- Window Management
date: 2021-11-30 21:37:14+00:00
description: ''
layout: layouts/post
permalink: using-a-tiling-window-manager-on-macos/
tags:
- Mac
- macOS
- Window Management
- post
title: Using a Tiling Window Manager on macOS
---

Since starting to use Linux, I’ve been hearing more about window managers, and especially tiling window managers. I started to play around with them on my Linux install (I’m now using [Kubuntu](https://kubuntu.org)), and after some getting used to the keyboard shortcuts, I found it to be really useful to quickly be able to rearrange windows, and also have everything visible at once.

That’s why a few days ago I tried to see what I could achieve on my Mac. I’d tried [BetterSnapTool](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwid3pK1hcH0AhX-SPEDHbIVAdcQFnoECAIQAQ&url=https%3A%2F%2Fapps.apple.com%2Fgb%2Fapp%2Fbettersnaptool%2Fid417375580%3Fmt%3D12&usg=AOvVaw3QistFe1KCUcv6kSdd66yY) recently, but wanted something with a bit more control. After watching a to of demos on YouTube of people’s setups, it seems as if [yabai](https://github.com/koekeishiya/yabai) was the most popular option. I was starting to get the feel of it, but it never felt stable. Sometimes as I was typing in Safari’s address bar, the windows would attempt to readjust as if I’d moved something. But it just resulted in a bunch of flickering. Add on that you need to [disable SIP](https://developer.apple.com/documentation/security/disabling_and_enabling_system_integrity_protection) before installing yabai, it never felt like a _great_ choice.

But, I looked a bit more, and I discovered another option, [Amethyst](https://ianyh.com/amethyst/). I checked out the website, and it looked reasonably simple to grasp the basics of, while also offering an absolute ton of options. This is what I wanted ideally, as I want to be able to use it straight away, but I didn’t want to be stuck with a really restricted experience.

By default, it has over 50 different actions that are configured with keyboard shortcuts. Right now, I’m using about five of them regularly, and I already feel faster on my Mac.

There are a few default layouts, and you even create them yourself, but I’ve been using the “Tall” layout the whole time, and I think it’s certainly enough for now. That basically means that there’s one window to the left, and all other windows are in a vertical stack to the right.

Here’s an example of how my Mac usually looks:

<img src="https://chrishannah.me/images/2021/11/Screenshot-2021-11-30-at-18.26.19.png" caption="">

On the left, I have the “main” window, this is usually a web browser or text editor. Then on the right, there’s usually at least one terminal window, and maybe a few extras.

How I’ve been using the right side is that I’ll have a handy terminal window to perform quick commands, like managing a git repository, but also windows that I might want to occasionally check out. So if I’m writing code, I might have a terminal to the right for git, and a web browser while I’m looking at how to do a certain task.

There are times where I’d like a full-screen app, for example when I’m writing, I like to have just [Ulysses](https://ulysses.app) open, or if I’m reading a long web page, I might want to also have that as big as possible. For this, I usually use a different desktop. Amethyst does have a bunch of shortcuts for managing desktops, but I’ve not got the hang of those yet.

As for the shortcuts that I do use, I can adjust the width of the focussed window, by using `SHIFT + OPT + L` to make it bigger and `SHIFT + OPT + L` to make it smaller. And if the window you have focused is in a vertical stack, then they are all resized at the same time.

To move focus between windows, you can cycle through them clockwise with `SHIFT + OPT + K`, and clockwise with `SHIFT + OPT + J`. Most of the time I do this via the trackpad, but the shortcuts can be useful.

But I’d say the most useful is `SHIFT + OPT + RETURN`, which swaps the focussed window with the “main” window. Essentially making it the big window on the left of my display. It becomes key when there are three or more windows on the right, and I want to quickly make it bigger. Then when I’m done, I can just focus on the previous window and make that the main window again.

There are definitely some drawbacks to using a tiling window manager. The main one is that you can’t have two big windows, with one behind the other. This has forced me into multiple desktops, but also hide or quit applications when I’m finished with them.

The only thing I’m not sure about is how it will deal with multiple monitors. Maybe I’ll try that out soon.

For now, I’m enjoying how fast it feels to navigate between windows on my Mac, and hopefully, I’ll get the hang of some more shortcuts soon.
