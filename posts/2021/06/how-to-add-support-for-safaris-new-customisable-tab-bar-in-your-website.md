---
categories:
- How To
- Safari
date: 2021-06-09 18:01:19+00:00
description: ''
layout: layouts/post
permalink: how-to-add-support-for-safaris-new-customisable-tab-bar-in-your-website/
tags:
- How To
- Safari
- post
title: How to Add Support for Safari’s New Customisable Tab Bar in Your Website
---

In the new (beta) versions of iOS, iPadOS, and macOS, a redesigned version of Safari includes a new combined address bar and tab bar. Which although, isn’t winning over everyone, it allows for a slight bit of customisation. Your website can provide a colour that will act as a background/tint colour for the new tab bar.

This colour is defined in the `theme-color` meta tag, and the `media` attribute can be used to provide different colours for Light and Dark appearances.

Here is an example of what I currently have set up for this website to provide the pink accent colour that’s used for links as the theme colour:
```html
<meta name="theme-color"
      content="rgb(233, 0, 94)"
      media="(prefers-color-scheme: light)">
<meta name="theme-color"
      content="rgb(255, 0, 103)"
      media="(prefers-color-scheme: dark)">
```

And here is what it looks like:

<img src="https://chrishannah.me/images/2021/06/41220D4E-498E-483F-BCC7-92411013F7F3.jpeg" caption="">

I’m not totally in favour of the new Safari design myself, but I’m definitely a fan of added customisation.

You can read more about the other changes in the [Safari 15 release notes](https://developer.apple.com/documentation/safari-release-notes/safari-15-beta-release-notes).
