---
categories:
- macOS
- Monterey
- Tip
date: 2021-11-22 12:07:43+00:00
description: ''
layout: layouts/post
permalink: monterey-blocking-ports-5000-and-7000/
tags:
- macOS
- Monterey
- Tip
- post
title: Monterey Blocking Ports 5000 and 7000
---

If you're a developer and use macOS Monterey, then you may have come into issues when using ports `5000` and `7000` on your local machine. And seeing as these are pretty common ports, I can imagine that this will affect quite a few people.

It turns out, what's using these ports is the new AirPlay Receiver functionality added in Monterey.

You can find this in the Sharing pane of System Preferences. And if you don't care about having it enabled, then you can just uncheck it, and the ports will be free.

<img src="https://cdn.chrishannah.me/images/2021/11/Screenshot-2021-11-22-at-11.46.04.png">

However, if you do want to make use of AirPlay Receiver, then all you need to do is first disable it, run your local server, and then enable AirPlay Receiver again. It will then use a different port.
