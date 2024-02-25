---
date: 2023-08-23 22:00:00+00:00
description: ''
layout: layouts/post
permalink: text-case-is-coming-to-the-command-line/
tags:
- post
title: Text Case Is Coming to the Command Line
---

If you didn't already know, I make a text transformation app for iOS, iPadOS,
and macOS, called [Text Case][tc]. It's grown quite a bit over it's lifetime,
supporting now well over 60 different formats, custom flows, and many more
features. And I've now decided, the next place I want to bring it to, is the
command line

And not just to be an additional benefit of purchasing the existing apps. This
is an open-source project, which eventually I want to distribute via [Homebrew][hb].

That may sound weird, seeing as you need to pay to have it on other platforms.
Why would I release it for free?

Basically, I'm a fan of free and open-source software. And while I don't think
it's crazy to ask for £2.99 for an app that I've put quite a number of hours
into making, I do also want to give something back. So, I plan on building
a version of Text Case that will allow people to quickly transform text, using
the command line.

At the same time, I'm bound to improve my own programming skills, seeing as my
code will now be in the public eye. And maybe I'll learn more about building
and distributing open-source software.

However, I do have to say that not *all* of Text Case will be coming to the command
line. I only plan on adding support for the core formats. At least, that's the
plan for now. 

Right now, it supports just 17 different formats, and I'll be working on
bringing the rest over as time goes on. And because it's open-source, you can
keep up to date with the current state by [checking it out on GitHub][tcc].
(You can even use it right now, if you're comfortable with building from
source.)

Here's a quick screenshot of the current version in action:

![textcase cli](images/2023/08/textcase-cli.jpeg)

I hope this news sounds good to at least some of you. In the mean time, I'm
going to get back to adding more format options.

[tc]: https://textcase.app
[tcc]: https://github.com/chrishannah/textcase-cli
[hb]: https://brew.sh