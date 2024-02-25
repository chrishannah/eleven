---
categories:
- Shortcuts
- Mac
- Automation
- Blogging
date: 2022-02-12 19:07:25+00:00
description: ''
layout: layouts/post
permalink: safari-to-link-post-shortcut/
tags:
- Shortcuts
- Mac
- Automation
- Blogging
- post
title: Safari to Link Post Shortcut
---

Since getting my new Mac a few days ago, I’ve been trying to move my iOS writing automations over. However, one of the main shortcuts just wasn’t possible on the Mac. It’s the “Link Post” shortcut that I’ve been using for quite some time on my iPad.

It doesn’t exactly do much, but it saves a lot of time and effort. It essentially uses the share menu in Safari to pass the article and the highlighted text to a shortcut. From there, it extracts the title, author, and url of the article, along with formatting the selected text as a markdown blockquote (using my app, [Text Case](https://textcase.app)), formats it nicely, and creates a new sheet in Ulysses. Leaving me to add some comments to the sheet, before publishing it to my blog.

Turns out the Mac’s a bit more complicated, as while there’s a share menu, you can’t use it to launch a shortcut. So, my existing solution was out the window.

<img src="https://cdn.chrishannah.me/images/2022/02/Screenshot-2022-02-12-at-18.04.27.png" caption="">

I tried a few other options that sounded promising, such as the “Get Article from Safari Reader” action that seemed to be precisely what I wanted. I’d be able to detect the URL somehow, and then be able to extract any information manually. Unfortunately, this action doesn’t work, and I’ve been told it hasn’t been working for some time.

After some experimenting, I realised that as long as I could have the URL and highlighted text, then I would be able to come up with something sufficient. Because from the URL, I can make a quick `GET` request, and get the page title. I haven’t worked out how to get the author using this method, but it wasn’t exactly reliable on iOS anyway.

My last option was to try to use macOS Services. I discovered that if I used a service from Safari, then it received the selected text as the input. And to top it off there was also a way to receive the “onscreen content” inside a shortcut, which in the case of Safari, returns the URL of the current page.

<img src="https://cdn.chrishannah.me/images/2022/02/Screenshot-2022-02-12-at-17.50.10.png" caption="">

That meant I was able to combine the selected text from the input, and the URL from the onscreen content, and put together a link post generator.

After fetching the page title and url, the only thing it needs to do is to format the selected text as a Markdown blockquote using [Text Case](https://textcase.app/), and put it together into a nice format.

It’s definitely not the quickest shortcut, with it taking around 5 seconds to create the Ulysses sheet, but it’s definitely better than doing all of this manually. I also added a notification after the sheet is created, so you can be sure it’s done. And you also get an option to open the sheet straight away.

Here’s [a quick video of the shortcut in action](https://youtu.be/PPQrfas7YTI):

<iframe width="560" height="315" src="https://www.youtube.com/embed/PPQrfas7YTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Download the “Safari to Link Post” shortcut](https://www.icloud.com/shortcuts/aa95d985e2074caca928816ce4896d12).
