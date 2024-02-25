---
categories:
- Project
- Text Case
date: 2019-09-13 23:11:45+00:00
description: ''
layout: layouts/post
permalink: what-text-case-is-becoming/
tags:
- Project
- Text Case
- post
title: What Text Case Is Becoming
---

<p>Back in July of last year when I first released <a href="https://textcase.app">Text Case</a> to the App Store, my idea behind it was for it to be a small utility app that you could use to format text into a few different formats. The main format was title case, and although it was a standalone app, I always thought of it being used primarily by selecting text and using the Action Extension to copy a formatted version of that text to the clipboard.</p>
<p>However, since that first release, there&#8217;s been 10 updates. Some of them were minor bug fixes, but most of them were adding new formats. In the current version that&#8217;s in the App Store, there are 24 different formats to use. Which is a pretty big number in my opinion. Especially as it was just meant to be a small utility app.</p>
<p>As Text Case as grown, the primary way people were using Text Case became through the Shortcuts app. Simply because it&#8217;s just easier to use it in that way. It can slot into your writing workflow, and you would never really need to open the app.</p>
<p>But as we all know, the original way that third-party apps could provide functionality to the Shortcuts app, was by &#8220;donating&#8221; different actions to the system. And then <em>magically</em> they would appear as selectable actions in the Shortcuts app, and that could either perform a task in the background, or it could launch your app directly into a specific part.</p>
<p>As Text Case is really just something that takes an input, does some fancy things to it, and then provides that result as an output, it was held back by the original limitations of how Shortcuts worked. The only way you would be able to use functionality from Text Case without launching the app was to copy text to the clipboard, have Text Case perform its changes on the clipboard, and then overwrite that with the newly formatted text. It only took a couple of extra steps, but it was nowhere near the ideal solution.</p>
<p>However, in iOS/iPadOS 13, there is a whole load of new advancements to how apps integrate with the Shortcuts app. The benefits at least from the perspective of Text Case is that you can make use of parameters. So within the format text action, you will be able to provide the source text as a parameter, there will be no specific need to make use of the clipboard. These actions can also return values as well, so your formatted text will be directly available to use as either a direct result or as an input into another action. It just turns the functionality of Text Case into customisable building blocks, that can be part of a bigger workflow.</p>
<p>That new functionality, that will be released very soon, is making me think about what Text Case is becoming. I can&#8217;t say that I see it as a standalone app anymore. Sure, it will always <em>be</em> an app. But that&#8217;s not really how it&#8217;s going to be used. Text Case is becoming a kind of &#8220;directory&#8221; of text formatting tools, which will directly integrate into different parts of the system.</p>
<p>It means that when I add more formats to Text Case, just like I am with the next update (which will add three new options), I don&#8217;t feel like I&#8217;m simply just making my app better. It feels like I&#8217;m providing the <em>system</em> with additional functionality. Whether it&#8217;s through an Action Extension that can be launched by sharing text, or within the Shortcuts app, Text Case is becoming more of a framework for using elsewhere, rather than something people would use directly.</p>
<p>And you know what? I&#8217;m completely fine with that. It&#8217;s really interesting to see how Text Case is changing, and how you can get all the functions of the app, without even remembering that you have it installed.</p>