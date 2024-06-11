---
categories:
- Automation
date: 2020-11-29 22:40:50+00:00
description: ''
layout: layouts/post
permalink: automate-rotating-wallpapers-on-ios/
tags:
- Automation
- post
title: Automate Rotating Wallpapers on iOS
---

In iOS/iPadOS 14.3, a long awaited Shortcut action will return. The 'Set Wallpaper' action. Couple this with the automation feature of Shortcuts, and you can build something simple, but very fun. It's still in beta right now, so if you're running the public release you will unfortuantely have to wait just a bit longer.

But for people that are running 14.3, you can make use of these two shortcuts I've created that rotate your wallpaper.

## The Shortcuts

![](https://chrishannah.me/images/2020/11/Untitled.jpeg)

The first one simply looks in an album for photos, gets a random one, and sets it as the wallpaper. So you can just add/remove photos from the selected album, and let the shortcut pick it up.

![](https://chrishannah.me/images/2020/11/Untitled-3.png)

The other is a bit smarter, as it has the option to choose a seperate for light and dark backgrounds. so depending on the current appearance that is set, it will choose from a seperate group of photos.

I was stuck for a while with this one, since there is no built-in action to check whether dark mode is currently enabled. Luckily, Alex Hay (developer of Toolbox Pro) shared with me a way to determine this inside a shortcut using JavaScript. Turns out there is an action from Toolbox Pro that can do this, but I thought I’d keep this shortcut from requiring any third-party apps.

To use the shortcuts, you will need to specify the albums before you run them, but apart from that they're ready to go.

### Download

- [Change Wallpaper Shortcut](https://www.icloud.com/shortcuts/49ede9f0cb564b4a936d1d1574d74045)
- [Change Wallpaper (Light/Dark) Shortcut](https://www.icloud.com/shortcuts/3981a96646514f1c95476c2e25a61340)

## Automation

While these shortcuts will change your wallpaper, the magic comes in the automation. Using the Shortcuts app, you can use various triggers to run a shortcut. I haven't found a way to pick a time interval to have it automatically repeat, but you can just pick certain times of the day and have them each trigger the sa me shortcut.

I've just gone with a simple trigger of sunset every day, because I don't personally want it changing all the time. But having a new wallpaper every day seems good.

What I would like in the future, is if you could trigger an automation based on dark/light mode being toggled. Or if you could somehow create one of the adaptive wallpapers that switch between light/dark mode automatically.

When making an automation, make sure to disable ‘Ask Before Running’, otherwise you will need to okay it every time it runs.
