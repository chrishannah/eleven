---
categories:
- Design
- iOS
- UX
date: 2018-07-20 09:20:15+00:00
description: ''
layout: layouts/post
permalink: search-bars-belong-at-the-bottom-not-at-the-top/
tags:
- Design
- iOS
- UX
- post
title: Search Bars Belong at the Bottom, Not at the Top
---

<p>Theo Strauss, <a href="https://uxdesign.cc/what-every-product-designer-should-take-away-from-lyfts-new-ui-742c9668b067">writing about Lyft’s new implementation of the search bar</a>, and why its best placed at the bottom:</p>
<blockquote>
<p>Although we don’t think about it too often, a search bar all the way at the top of the screen is hard to reach. Especially for users who have smaller hands or users who have less flexible hands, reaching up is annoying, mostly because the top of the screen is far away from where their fingers sit.</p>
<p>If you visualize most apps, the main content is in the middle or lower-mid area. Tab bars for navigation, posts on social media, and keyboards on messaging platforms are all examples of important pieces of experiences sitting in a more reachable position.</p>
</blockquote>
<p>I feel exactly the same. The ability to search within an app, or just accessing the main navigational controls of an app, should be the most accessible parts.</p>
<p>In a world where we use tools such as a mouse, or laptop trackpad to direct a cursor around a screen, a classic vertical layout where all navigation is at the top, and the content filling the rest of the space, is probably fine.</p>
<p>However nowadays we interact with content on our displays <em>directly</em>, so it needs to be designed with a human hand in mind, not a cursor.</p>
<p>You can already see Apple pushing developers/designers towards this bottom-up approach, as they’ve added the “pull up” drawer-like component that contains a search bar and results, into the Maps app. This is the approach I feel needs to be standardised going forward, but this isn’t the only approach. As the Music app also follows this idea of having controls at the bottom, with the now playing indicator being there.</p>
<p>I do see this becoming a trend very soon, and I suspect that in a few months quite a lot of apps will be using a sheet similar to the one in Apple Maps. The only drawback is that Apple don’t provide a standard implementation of this bottom sheet, and instead developers either have to implement this manually, or adopt a library from other third-party developers.</p>
<p>I’ve been experimenting with it at work, and I’ve found one library to be very useful, and that is <a href="https://github.com/MarioIannotta/PullUpController">PullUpController</a> by <a href="https://github.com/MarioIannotta">Mario Iannotta</a>. It provides you with a simple one liner to add any view to act as the bottom sheet, and also manages the sticky points, management of inner scrolling views and content, and you can also extend it to your wishes.</p>
<p>Hopefully Apple can share their implementation and more developers can make use of this new interface style.</p>