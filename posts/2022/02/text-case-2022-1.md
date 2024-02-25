---
categories:
- Text Case
- App
- Update
- Story
date: 2022-02-07 13:09:03+00:00
description: ''
layout: layouts/post
permalink: text-case-2022-1/
summary: The new features that come in Text Case 2022.1 and a story on why this update
  has taken so long.
tags:
- Text Case
- App
- Update
- Story
- post
title: Text Case 2022.1
---

It’s the first update to Text Case this year, and to be honest the first one in quite some time. I’ll get on to that in a bit, but first I’ll go over what’s in this update.

**Two fixes**. Firstly to address the Guardian title case that wasn’t correctly following the rules where certain words are always lowercase. And secondly, to address the bug when searching the formats list and the empty section headers would still be present.

<img src="https://cdn.chrishannah.me/images/2022/02/Monday--07-Feb-2022-11-18-58.png" caption="">

**Refreshed dark mode** . The previous dark mode took inspiration from other iOS apps when it was first designed, where it used a lot of jet black, and everything was very dark. But it’s always been a thing that I’ve not 100% been a fan of, so I took some time to soften the colours a bit, and I think it looks a lot better.

<img src="https://cdn.chrishannah.me/images/2022/02/Monday--07-Feb-2022-11-33-37.png" caption="">

**New accent colours**. Text Case has always had a red-ish accent colour throughout the app. This colour was taken from the original app icon. However, the default icon changed back at the start of 2021 when 12 new variants were added. The new default icon featured a slightly different red, and a new blue colour. So for this update I’ve decided to adjust the accent colours to match this icon, which means in light mode the accent will be red, and the blue will be used for dark mode (which works well with the new dark mode I must say).

<img src="https://cdn.chrishannah.me/images/2022/02/Monday--07-Feb-2022-11-21-24-1.PNG">

**Support for Shortcuts on Mac**. Definitely a _finally_. This has been long deserved, and I’m to be honest I’m surprised more people haven’t ben reaching out and asking for it. But it’s finally here, and I think it makes Text Case a much better option now for people who want their automations to work on all of their machines.

**1 new format**. This update wasn’t planned to be filled with new formats, but there was one that I was getting a few requests for, and that was to be able to remove line breaks from a piece of text. It’s relatively simple, so I thought I may as well add it now. There are a few more I have lined up that will be in a future release, I just wanted to get this update out sooner rather than later.

## Download

This update is available now for iOS, iPadOS, and macOS!

<a href="https://apps.apple.com/us/app/text-case/id1407730596?uo=4"><img src="https://textcase.app/assets/appstore.png" style="max-height: 40px !important;"/></a>
<a href="https://apps.apple.com/us/app/text-case/id1492174677?ls=1&mt=12"><img src="https://textcase.app/assets/macappstore.png" style="max-height: 40px !important;"/></a>

---

## So why has it been so long since the last update?

Okay, so it mainly comes down to one event. Which was pretty much self-inflicted, and probably shouldn’t have happened.

So, a few months ago I was playing around with Linux, and installing various distros on a partition on my Mac. This time I was testing out Pop!_OS, which is a relatively beginner-friendly distro, and seemed Mac friendly.

I created all the necessary partitions, making note of the macOS partitions to keep away from them, and I installed the OS. It went fine, and I was able to play with it, and spend some time installing a bunch of packages and desktop environments. And once I was a bit more comfortable, I decided to clear the partitions and reinstall the OS, and then use what I learned to make a cleaner configuration.

However, on the second install, the OS was written to the wrong partition. Somehow the macOS partition had been used instead. I’m 99.9% sure it wasn’t me, although if this was someone else doing it, I’d be 99.9% sure it was user error.

My Mac had essentially been wiped. Although, at this point I was relatively calm as I have my important documents in iCloud Drive, photos in iCloud Photos, and my development work hosted in GitHub repositories.

Except that last one wasn’t entirely true. For some reason, the work I did for the [2021.6 release](https://chrishannah.me/text-case-2021-6/) of Text Case hadn’t been pushed. So the App Store version was actually ahead of the code.

This meant that before I could work on any new features, I’d have to rewrite the last update. The update contained 15 new formats, various adjustments, and a few bug fixes. On top of that, there was a slight issue I was having with Xcode where I had one framework causing me issues, because it was being linked in the Mac Catalyst app target, and also the macOS bundle which powers the macOS services support.

If you add in my laziness, and some irritation that I’d have to spend time on things I’d already finished, this work took longer than it did originally.

Eventually I had everything how it was in the 2021.6 release, and I got working on the new functionality that I mentioned above. Part of me was thinking that I should add more to the update to make it a bigger release, but with the big gap in time since the last update, I thought it was best to just get it out now. It’s not like I can’t update again in a few weeks.

So that’s the story. I’m certainly glad it’s over, and I’m sure some of you will find it funny. I’ve taken a few steps to make sure it won’t happen again, such as buying a NAS and setting up Time Machine, and also buying a second-hand ThinkPad to handle my Linux experiments. Hopefully that means Text Case can go back to being regularly updated with new formats and functionality.
