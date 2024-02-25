---
categories:
- Project
- Development
- Text Case
- Text Case 2.0
date: 2019-01-10 10:30:09+00:00
description: ''
image: https://cdn.chrishannah.me/images/2019/01/ddddd.png
layout: layouts/post
permalink: starting-work-on-text-case-2-0/
tags:
- Project
- Development
- Text Case
- Text Case 2.0
- post
title: Starting Work on Text Case 2.0
---

<p>As you may have already seen <a href="https://twitter.com/chrishannah">on my Twitter</a>, or in <a href="https://chrishannah.me/category/micro/journal/">my journal entries</a>, I’ve started to work on the second major version of Text Case, 2.0. The major changes will be to the user interface, so I want it to be slightly more colourful, fit more in what I see as the latest design language Apple has set out in the Shortcuts app, and also have the formats structured better.</p>
<p>The project started with me making a list of all the things that I will need to implement for it to be level with the functionality of the current version. Here’s that list:</p>
<ul>
<li>Input
<ul>
<li>Drag and Drop</li>
<li>Input Field</li>
<li>Use Copied Text</li>
<li>From File?</li>
<li>Keyboard Shortcuts
<ul>
<li>Global Paste</li>
</ul>
</li>
</ul>
</li>
<li>Formats List
<ul>
<li>Tap to Copy</li>
<li>Hold to Share</li>
</ul>
</li>
<li>Siri Shortcuts Support
<ul>
<li>Add to Siri</li>
<li>Shortcuts App</li>
<li>Backwards Compatibility</li>
</ul>
</li>
<li>Action Extension</li>
<li>Settings
<ul>
<li>Theme
<ul>
<li>Light</li>
<li>Black</li>
</ul>
</li>
<li>Title Case Format</li>
<li>Reorder Groups</li>
<li>Enable/Disable Formats</li>
<li>Custom App Icons</li>
</ul>
</li>
</ul>
<p><img loading="lazy" width="2710" height="2616" class="alignnone size-full wp-image-6691" src="https://cdn.chrishannah.me/images/2019/01/Image-8.png" srcset="https://cdn.chrishannah.me/images/2019/01/Image-8.png 2710w, https://cdn.chrishannah.me/images/2019/01/Image-8-300x290.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-8-768x741.png 768w" sizes="(max-width: 2710px) 100vw, 2710px" /></p>
<p>I started working on the most important section of the app, the formats list. Over the past few days I’ve been building up the style similar to the Shortcuts app, so instead of being simple white boxes that contain the formatted text, they’re more colourful and even have a slight gradient to add a bit of depth (I’m planning on experimenting with a small shadow as well).</p>
<p>So once the list was working, I added the core logic from the current version and made the formats work. I did adapt it slightly though, as it now groups similar formats together, which I think makes the app look a lot tidier. This change means that when I add the reordering feature, it will most likely me limited to reordering the groups rather than individual formats. You’ll still be able to hide any you don’t want to see though.</p>
<p>Then I added the input field. It’s also a bit cleaner, and fits with the new style. But it has essentially the same capabilities as before. I plan on investigating importing text from a file, and implementing drag and drop, but I think that’s supported automatically.</p>
<p><img loading="lazy" width="2710" height="2616" class="alignnone size-full wp-image-6690" src="https://cdn.chrishannah.me/images/2019/01/Image-9.png" srcset="https://cdn.chrishannah.me/images/2019/01/Image-9.png 2710w, https://cdn.chrishannah.me/images/2019/01/Image-9-300x290.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-9-768x741.png 768w" sizes="(max-width: 2710px) 100vw, 2710px" /></p>
<p>After I had the list displaying, input working, and the text being formatted, I worked on the interaction with the resulting formatted text. I’ve had a few bits of feedback in the past saying they would appreciate one-touch copying, and now I’ve added it! So you can simply tap any formatted text in the app, and you’ll get a nice alert at the bottom showing the exact text you’ve copied. Or alternatively, you can still tap and hold on formatted text to bring up the contextual actions, which are the same as before, copy and share.</p>
<p>The next step from here will be to start working on the settings section of the app, as that also allows me to test the rest of the app in different scenarios much easier. I’m already planning two changes to the settings in  this new version. The first is changing the idea of an accent colour to a theme, as I want the format groups to control the colour. But I also appreciate that a light and dark theme is a minimum. The second change is custom app icons, they may be a basic selection, but the app no longer has a “main colour” so I’d like to give a few options.</p>
<hr>
<p>If you want to stay up to date with the development of Text Case 2.0, You can find more regular content <a href="https://twitter.com/chrishannah">on my Twitter</a>, <a href="https://chrishannah.me/category/micro/journal/">brief updates on my journal</a>, and I’ll still post any major progress here.</p>