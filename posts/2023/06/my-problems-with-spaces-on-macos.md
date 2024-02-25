---
categories:
- macOS
- Spaces
date: 2023-06-23 19:55:27+00:00
description: ''
layout: layouts/post
permalink: my-problems-with-spaces-on-macos/
tags:
- macOS
- Spaces
- post
title: My problems with Spaces on macOS
---

Although I'd say I'm primarily a Mac user, I do tend to go back and forth occasionally between macOS and Linux. And while Linux isn't a singular OS, there are a lot of common features that I've used on various Linux installations that I really wish would be better supported on macOS.

I wrote about [tiling window managers on macOS](https://chrishannah.me/using-a-tiling-window-manager-on-macos/) back in 2021, which is one of said features. And it's one that I find makes working a lot more efficient and organised.

However, to really get the best out of a tiling window manager, I think you also need to have good a workspace manager. On macOS that comes in the form of Spaces. And while that may let you use multiple fixed workspaces, I find the implementation a bit lacking

<img src="https://cdn.chrishannah.me/images/2023/06/Screenshot-2023-06-23-at-19.38.42-2.png" caption="Multiple Desktops on macOS using Spaces">

You can configure Spaces to have a fixed number of "Desktops" always enabled, and to have them not continuously change order (which is a stupid default option in my opinion).

However, there are a few things that you can't do with Spaces:

* Give each workspace a name.
* Associate a workspace to an application.
* **Efficiently** move windows between workspaces.
* **Quickly** move back and forward between workspaces.

The main problem I have with spaces is the speed of navigation. Because when I mean I want to move between workspaces, I want it to be **instant**. I don't want animations between workspaces. I want to quickly switch, and carry on with what I'm doing.

Except with Spaces, you'll get a short panning animation as you move to another space (with Reduce motion it becomes a fade instead). It's not _that_ long, but it's enough to make me pause what I'm doing. It's enough to just slightly irritate me.

Any keyboard shortcuts are also bound to the same animations.

It might not seem like a big complaint. But these types of small hinderances, are part of what makes me keep going back to Linux. The one thing universally I hate about using technology is when I feel like I'm being slowed down. Especially, when it's just to show me a nice animation.

---

You can do a bit more if you use [Amethyst](https://ianyh.com/amethyst/) (which is what I use for a tiling window manager). That lets you configure keyboard shortcuts to move windows around, but it doesn't deal with moving your focus between workspaces.
