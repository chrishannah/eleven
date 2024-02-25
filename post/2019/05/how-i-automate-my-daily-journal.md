---
categories:
- Automation
- Journal
- Shortcuts
date: 2019-05-17 13:03:54+00:00
description: ''
layout: layouts/post
permalink: how-i-automate-my-daily-journal/
tags:
- Automation
- Journal
- Shortcuts
- post
title: How I Automate My Daily Journal
---

<p>Since the start of this year, I&#8217;ve been <a href="https://chrishannah.me/category/micro/journal/">writing a daily journal on a separate part of this blog</a>.</p>
<p>After I started writing the entries, I realised I didn&#8217;t want the boring task of creating the file in a specific directory, and creating the same title/header over and over again. So I added a tiny bit of automation.</p>
<h2>Things Task</h2>
<p><img loading="lazy" width="1325" height="2616" class="alignnone size-full wp-image-7379" src="https://cdn.chrishannah.me/images/2019/05/iVBORw0KGgoAAAANSUhEUgAABS0AAAo4CAYAAAC8JoKAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIu-2.png" alt="iVBORw0KGgoAAAANSUhEUgAABS0AAAo4CAYAAAC8JoK+AAABgmlDQ1BzUkdCIElFQzYxOTY2LTIu-2.PNG" srcset="https://cdn.chrishannah.me/images/2019/05/iVBORw0KGgoAAAANSUhEUgAABS0AAAo4CAYAAAC8JoKAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIu-2.png 1325w, https://cdn.chrishannah.me/images/2019/05/iVBORw0KGgoAAAANSUhEUgAABS0AAAo4CAYAAAC8JoKAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIu-2-152x300.png 152w, https://cdn.chrishannah.me/images/2019/05/iVBORw0KGgoAAAANSUhEUgAABS0AAAo4CAYAAAC8JoKAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIu-2-768x1516.png 768w" sizes="(max-width: 1325px) 100vw, 1325px" /></p>
<p>The first thing I did was to set up a task in <a href="https://itunes.apple.com/us/app/id775737172">Things</a>, that repeated every day, simply to tell me to write my journal. After a while, I noticed that I would sometimes get very close to 12 before remembering about it. So I added a reminder for 11 pm, which gives me a bit of time to delay and still get it done in time.</p>
<h2>Journal Template Shortcut</h2>
<p>To take the hassle out of creating the initial file, I created a relatively small shortcut that creates the template and opens it in <a href="https://itunes.apple.com/us/app/id904237743">iA Writer</a>.</p>
<p>I have a specific directory for my journal entries, and this keeps them all in one place.</p>
<p>It also uses the current date to create the filename and the heading for the post.</p>
<p>From there, it opens iA Writer, so I can jot down what I did in that day. And it&#8217;s ready to be published</p>
<p>You can <a href="https://www.icloud.com/shortcuts/29f96511dbd24b3a91f500a56252e07f">download my &#8220;Journal Template&#8221; shortcut for reference</a>.</p>
<h2>Linking the Shortcut to the Things Task</h2>
<p><img loading="lazy" width="4095" height="2616" class="alignnone size-full wp-image-7380" src="https://cdn.chrishannah.me/images/2019/05/Image.png" alt="Image.PNG" srcset="https://cdn.chrishannah.me/images/2019/05/Image.png 4095w, https://cdn.chrishannah.me/images/2019/05/Image-300x192.png 300w, https://cdn.chrishannah.me/images/2019/05/Image-768x491.png 768w" sizes="(max-width: 4095px) 100vw, 4095px" /></p>
<p>While Things is useful enough to help me remember I need to write my entry, and the shortcut helps to create the initial file, I also linked these together.</p>
<p>I did that by adding a custom URL into the body of the Things task, so whenever it notified me, I could tap on the task and then on the link. It would then launch the shortcut, and lets me immediately start writing.</p>
<p>It also allows me to <em>not</em> starting right away, as sometimes I&#8217;m not in the best place to do it, or I just want to put it off a bit longer.</p>
<p>The url is quite simple, and is in the following format:</p>
<pre><code>shortcuts://run-shortcut?name={name}
</code></pre>
<p><strong>{name}</strong> is the name of the Shortcut, but URL encoded. You may be able to work this out yourself, but my app <a href="https://textcase.app">Text Case</a> can also do this for you.</p>
<h2>More Automation</h2>
<p>After I finish writing my journal entry for the day, I then publish it to my blog. I use the built-in &#8220;New Draft on WordPress&#8221; share extension, which then opens the draft in Safari where I can add the category, and publish.</p>
<p>It&#8217;s a reasonably quick task, but something else I plan on automating. So in the near future, I will be creating another shortcut, that can take the latest journal entry and publish it to my blog using the specific category and time I like.</p>