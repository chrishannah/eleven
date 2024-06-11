---
categories:
- Automation
- Shortcuts
- Writing
- App
date: 2020-04-18 14:44:00+00:00
description: ''
layout: layouts/post
permalink: how-im-using-shortcuts-and-data-jar-to-help-write-link-posts/
tags:
- Automation
- Shortcuts
- Writing
- App
- post
title: How I’m Using Shortcuts and Data Jar To Help Write Link Posts
---

<p>Last night I spent some time reading on my iPad, and I noticed a few articles that I might want to link to from my blog. Except I didn’t want to start creating drafts in iA Writer, or doing any manual work. I just wanted a way to remind myself that I want to link to this at some point.</p>
<p>I started to think that I could simply create a reminder in the Reminders app (I’ve switched from Things), possibly with the URL as a note so I could get back to it when I needed it again. However, that would require me to then later load the URL, and fetch the details from it. And seeing as I would have had the article loaded at the time of reading, it made more sense to store this data, and then be able to reference it at a later date.</p>
<p>So I came up with an idea of two shortcuts, one to store relevant data about the article I wanted to reference, and then another which I could use to select from the list and kick off a draft in <a href="https://apps.apple.com/gb/app/ia-writer/id775737172">iA Writer</a>.</p>
<p>That’s when I thought about using the recently released data store app, <a href="https://apps.apple.com/gb/app/data-jar/id1453273600">Data Jar</a>, which is a fantastic tool for storing all kinds of data.</p>
<h1>Store Link Post Idea</h1>
<p>To start off, the Shortcut I created to do the initial data storing and reminder creation was relatively simple. It accepts input from the Share sheet, in the form of a Safari web page, and then has just three actions:</p>
<ol>
<li>Add a new reminder with the title of the article to my blog list.</li>
<li>Create a dictionary with four pieces of data &#8211; the title, URL, any text that was selected that I want to quote, and also the author. Although I’ve found the author to not be very reliable.</li>
<li>Store this dictionary at the end of my <code>drafts</code> list in Data Jar.</li>
</ol>
<p><a href="https://chrishannah.me/images/2020/04/Image.png"><img src="https://chrishannah.me/images/2020/04/Image.png" alt=""></a></p>
<p>Download the Shortcut: <a href="https://www.icloud.com/shortcuts/cda947a8097f4b6290c7a67da9666074">Add to Drafts List</a></p>
<h1>Starting a Link Post</h1>
<p>This shortcut is a bit more complex, as it has to do quite a few things:</p>
<ul>
<li>Retrieve the list of link post ideas from Data Jar.</li>
<li>Show the list, and allow the user (me) to select an option.</li>
<li>Transform the various pieces of data into a link post outline.</li>
<li>Create a new document in iA Writer.</li>
</ul>
<p>It’s a bit long, so I’ll put the long screenshot below, and then explain why it may seem pretty complicated for what it does, and the things I had to work around.</p>
<p><a href="https://chrishannah.me/images/2020/04/63367181-1299-410A-A9A8-9EF07FB52A9E-scaled.jpeg"><img src="https://chrishannah.me/images/2020/04/63367181-1299-410A-A9A8-9EF07FB52A9E-scaled.jpeg" alt="Start Link Post From Draft Shortcut"></a></p>
<p>To start off, the shortcut gets the list of drafts from Data Jar. This contains all the drafts that have been saved.</p>
<p>It then does a little transformation with that data, using a temporary variable in Data Jar. It clears the value for the specific key I’m going to use, and then it loops through the list of articles, and extracts the title and the index of each article into a new list. This is because we need to show the list of articles, and also perform operations on the specific article that was selected.</p>
<p>The temporary list is then displayed, and from the chosen article, the Index is then used to fetch the complete article data from Data Jar. That includes the title, author, page selection (snippet), and the URL.</p>
<p>Once that data is extracted, the page section is formatted as a Markdown Blockquote via <a href="https://textcase.app">Text Case</a> (my app), and then it’s put together with the rest of the data to form a basic link post outline.</p>
<p>Finally, the outline is URL encoded and opened as a new document in iA Writer via the URL scheme.</p>
<p>Download the Shortcut: <a href="https://www.icloud.com/shortcuts/6e21b6a401954b87b82b11eacc757892">Start Link Post From Draft</a></p>
<hr>
<p>These two shortcuts are simple in theory, and to be honest I could have achieved the same result with less complexity, and maybe even without Data Jar. However, I like that the storing and kicking off a link post in iA Writer are separate processes. Because it allowed for more flexibility in the future and also doesn’t distract me at the time of reading an article. Which was one of the big reasons for me making these.</p>
<p>I really liked using Data Jar for these as well, so I hope I can make use of it again in future shortcuts!</p>
<h1>Links</h1>
<p>Find the apps used, and the shortcuts below:</p>
<ul>
<li><a href="https://apps.apple.com/gb/app/data-jar/id1453273600">Data Jar</a></li>
<li><a href="https://apps.apple.com/gb/app/ia-writer/id775737172">iA Writer</a></li>
<li><a href="https://textcase.app">Text Case</a></li>
<li><a href="https://www.icloud.com/shortcuts/cda947a8097f4b6290c7a67da9666074">Add to Drafts List Shortcut</a></li>
<li><a href="https://www.icloud.com/shortcuts/6e21b6a401954b87b82b11eacc757892">Start Link Post From Draft Shortcut</a></li>
</ul>
