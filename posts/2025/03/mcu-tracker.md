---
date: 2025-03-13 22:00:00
categories: ["AI"]
tags: ["AI", "Cursor", "post"]
layout: layouts/post
permalink: mcu-tracker-with-cursor/
title: "I Challenged Myself to Build a Website Using Cursor"
---

I've been playing around with [Cursor][cursor][^1] recently, and while I haven't started the paid plan yet, I am starting to think I will. I don't think it will replace any of my typical development, but it's well-suited for quick prototypes and small changes that I don't want to write myself.

One recent example was the sidebar design on the left of this blog. That was initially generated via Cursor.

Anyway... Yesterday I was thinking about the MCU, trying to work out what films I've seen, and if I've missed any out, based on the timeline. So I thought, surely I can just get Cursor to build me a basic timeline? Sure enough, it could.

Once I had a basic timeline, I wondered if I could use this as a challenge to see how far I could go with this site, purely using Cursor and not writing any code myself. So I've spent just a few hours, asking Cursor for new features, design tweaks, and small corrections to the actual source data when it missed a film or two.

As for the final result, you can [find the code on GitHub][gh].

![](/posts/2025/03/timeline.jpeg)

The overall functionality is simple, it displays all MCU films (inc. multiverse, and related films like Venom), and lets you track which ones you have watched.

![](/posts/2025/03/grid.jpeg)

But there's also a grid mode for easier viewing.

![](/posts/2025/03/upcoming.jpeg)

A section for upcoming films.

![](/posts/2025/03/stats.jpeg)

And some overall statistics.

As you can see, it's not exactly the most complex site. But for a personal tool, I think it's perfect. And this type of quick project is one of the main reasons why I expect I will continue using Cursor.

Which leads me to my recent thoughts about this type of AI-powered programming. I'm starting to imagine a future where this type of code is not generated like I did here, which is to keep feeding suggestions until a result is delivered, before using that as a "product". But rather, these types of tools/UIs can be built dynamically and in real-time.

This shifts from asking to 'build a website showing all MCU films...' to simply saying 'show me the MCU films,' with the timeline UI being generated and displayed in real-time. In the future maybe we won't have developers generating code via AI tools, maybe *people* will use AI, and the AI can provide relevant visualisations/results directly.

[^1]: An AI code editor.

[cursor]: https://www.cursor.com
[gh]: https://github.com/chrishannah/mcu-tracker
