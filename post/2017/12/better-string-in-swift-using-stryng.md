---
date: 2017-12-20 16:30:54+00:00
description: ''
layout: layouts/post
permalink: better-string-in-swift-using-stryng/
tags:
- post
title: Better String in Swift Using Stryng
---

<p>If you write in Swift, then there&#8217;s a good chance you&#8217;ve tried to access a section (Substring) of a String.</p>
<p>Usually  it&#8217;s done by using an index, and an offset. But in some cases you need to specify the start index along with an offset, and also an end index with an offset.</p>
<p>It gets a bit messy.</p>
<p>Luckily I&#8217;ve just discovered Stryng on GitHub, and it&#8217;s a beautiful solution.</p>
<p>There&#8217;s a ton of examples, and you should totally read the README even if you aren&#8217;t going to use it. But here&#8217;s my favourite:</p>
<p><em>Before Stryng:</em></p>
<pre><code>let message = “One Two Three”
message[message.index(message.startIndex, offsetBy: 4)..&lt;message.index(message.startIndex, offsetBy: 7)] // “Two”
</code></pre>
<p><em>After Stryng:</em></p>
<pre><code>let message = “One Two Three”
message[4..&lt;7] // "Two”
</code></pre>
<p>🤩</p>