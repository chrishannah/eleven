---
categories:
- Meta
date: 2021-03-17 12:35:42+00:00
description: ''
layout: layouts/post
permalink: ghost-4-0-migration/
tags:
- Meta
- post
title: Ghost 4.0 Migration
---

Ghost, the blogging platform that this blog runs on, [recently received a major update](https://ghost.org/changelog/4/). So I decided that I would update the version of my instance. Mainly because the update's main focus was adding support for members and email newsletters, which previously have been part of their "labs" section.

I took the necessary precautions, exported the content, even made a complete backup of the base folder. However, I still assumed that it would go well since Ghost has a command-line tool that _should_ take care of everything.

Unfortunately for me, this migration didn't work. The cause was a failing database migration, which seemed odd to me since this is not something that I have changed. And it turns out; the rollback feature doesn't support major versions.

The next step was installing a new version of Ghost v3, which is pretty easy if you use the CLI tool. Once that was installed, I restored the content, and it worked as usual.

I was still set on updating to v4, though. So I tried again. This time thinking it will work because I have a completely fresh install. Sadly, the same error occurred. Which meant my only option was to start with a new v4 instance.

Luckily, the import functionality worked with my data, even though it was exported with a previous version. All I had to do was verify that worked, migrated members, configured the email newsletter, and made sure the images were all available. Everything went perfectly this time.

I'll need to look into the changes more and see if I can make use of anything. One thing I did notice was the excellent new default theme. So maybe I can steal a few things.

While the blog hasn't visibly changed, this migration did cause one annoyance. As after you set up a Ghost instance, it starts you off with a few default blog posts. So every time I did this, these dummy posts were available in the RSS feed. I think this also meant that a few recent posts were triggered when I did the import. This means, if your RSS reader/service polled for changes during this period, you'll most likely have a few posts that you can ignore. Sorry about this!