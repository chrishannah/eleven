---
categories:
- App
- Shortcuts
date: 2020-11-24 17:34:54+00:00
description: ''
layout: layouts/post
permalink: connectkit-for-shortcuts/
tags:
- App
- Shortcuts
- post
title: ConnectKit for Shortcuts
---

Josh Holtz, has announced his new app [ConnectKit for Shortcuts](https://apps.apple.com/us/app/connectkit/id1534510889), which bridges the gap between Shortcuts and the App Store Connect API. Surprisingly, you can access quite a lot of the functionality from App Store Connect over the API, including managing users, TestFlight,  app metadata, reporting, and even more!

You can use the built-in token storage for free, along with the action to generate a JWT token that can be used to make authentication requests to the API. But for just a small tip, you can unlock four premium actions which is where the magic is.

<img src="https://chrishannah.me/images/2020/11/Image-1.PNG">

There's an action to get your apps, and also your sales and finance reports, which both come with quite a lot of parameters. For the rest of the API functonality, you can use the Make Request action, which lets you interact with the API directly, but you get the added bonus of the JWT token being generated for you automatically.

When I saw this app on Twitter, I immediately thought about how you could combine it with something like [Charty](https://apps.apple.com/us/app/charty-for-shortcuts/id1494386093?itsct=apps_box&itscg=30200) to view super custom charts for sales. Fortunately, Josh has gone one step further and provided a ton of examples in the app, and on [his blog post](https://www.joshholtz.com/blog/2020/11/24/announcing-connectkit-for-shortcuts.html). Some you may expect like viewing charts in Charty, and app data in [WidgetPack](https://apps.apple.com/us/app/widgetpack/id1526805384?itsct=apps_box&itscg=30200). But also submitting an app for review via Siri.

It sounds great, and I'm very much looking forward to seeing how I can put it to use.

You can get [ConnectKit on the App Store](https://apps.apple.com/us/app/connectkit/id1534510889), and I'd highly recommend reading through [Josh's blog post to see all the details](https://www.joshholtz.com/blog/2020/11/24/announcing-connectkit-for-shortcuts.html).
