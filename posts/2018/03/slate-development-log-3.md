---
date: 2018-03-18 16:56:07+00:00
description: ''
layout: layouts/post
permalink: slate-development-log-3/
tags:
- post
title: 'Slate Development Log #3'
---

<p>Some more work going on in Slate today.</p>
<p>The next area I&#8217;m going to work on is speeding up the conversion from a post&#8217;s content (which is html), into it’s rich text counterpart (NSAttributedString).</p>
<p>The way it used to work was, it converted all the content, including all the inline images. Which would dramatically decrease speed, as it downloaded them synchronously. It meant I had nearly zero control over how the content was transformed or presented.</p>
<p>So the obvious way to test this was to remove the images from the posts as I&#8217;m parsing them. I did this with a small bit of regex, and it&#8217;s so much better. It can of course still be improved, but this was a massive boost in the right direction.</p>
<p>Obviously I can&#8217;t just keep all images hidden in the timeline, but one of my plans was to try and separate inline images into their own section anyway. This would also allow me to add a tap to preview action, and just generally better support for additional media/attachments.</p>
<p>Along with a few extra changes to the style, and maybe support for themes, this is what will be in v0.2.</p>