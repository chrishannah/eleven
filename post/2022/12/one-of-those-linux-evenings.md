---
categories:
- Linux
date: 2022-12-18 12:33:06+00:00
description: ''
layout: layouts/post
permalink: one-of-those-linux-evenings/
tags:
- Linux
- post
title: One of Those Linux Evenings
---

Fabian Sanglard [wrote a blog post about one of those "Linux evenings"](https://fabiensanglard.net/a_linux_evening/index.html) where you spend hours trying to fix something that clearly wouldn't be an issue on any other OS. But you go through it anyway, because, you know, Linux is cool.

The problem is that he is trying to use an external SSD. And it works on every computer, except one specific laptop running Ubuntu. (Note: It works with the same laptop when running Windows)

It's an interesting story, and he takes you through the various stages of the debugging process. But I had to share the part where he eventually discovered the fix on an online forum:

> I google it and end up [here](https://forum.level1techs.com/t/asrock-x570-phantom-tb3-itx-and-linux-no-bus-number-available-for-hot-added-bridge/156951/2). I don't understand any of the described solution. It looks like the kernel needs a parameter to set the bus size for a pci channel. After several hours in, I'll try anything.
> 
> [...]
> 
> The machine reboots. And to my amazement, it works.
> 
> I pause and wonder how many hours one must have invested to become so highly skilled on such an esoteric topic. I find comfort in user zxmth's question, asserting I was not alone left in awe.
> 
> > Out of curiosity, how did you come up with this solution? - zxmth
> 
> The author, dkozel, never came back to answer. I imagine they typed the solution on a 40% keyboard featuring unmarked keys and then rolled into the sunset on a Segway for which they had compiled the kernel themselves. Completely oblivious of their awesomeness and of how many people would later find solace in their prose.

If you haven't used Linux before, then this type of experience might put you off forever.

But if you do use it, and you persevere through these long nights of random issues, you tend to bump into these Linux wizards that drop by to offer some magical advice to fix your specific problem, and then vanish to never be heard from again.

Sometimes using Linux can be as easy as any other OS. Then again, a simple interaction can transform into a fever dream.

Weirdly, it's those fever dream moments that keep Linux interesting for me.