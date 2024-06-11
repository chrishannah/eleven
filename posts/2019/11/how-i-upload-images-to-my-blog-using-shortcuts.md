---
categories:
- Shortcuts
date: 2019-11-05 21:22:42+00:00
description: ''
layout: layouts/post
permalink: how-i-upload-images-to-my-blog-using-shortcuts/
tags:
- Shortcuts
- post
title: How I Upload Images to My Blog Using Shortcuts
---

<p>I write a lot of my blog posts on my iPad using iA Writer, and because it is mainly a text editor, it doesn’t support adding photos directly into a document. This makes it slightly more cumbersome for myself when I’m trying to include an image in a post, so I’d have to go to the web interface of my blog, upload an image manually, and then copy the URL.</p>
<p>However, it recently came to my mind that I could probably automate this process. And of course, that would be with the Shortcuts app.</p>
<p>So I made a simple Shortcut that can be run from the Share Sheet, accepting only images.</p>
<p>Then because I simply want to upload it to my WordPress blog (I have no separate CDN for images), I attempted to use the “Post to WordPress” action. Which I only just discovered can upload media, along with posts and pages.</p>
<p>And just like when you upload a new post using that action, the result is the URL of the uploaded post/page/media.</p>
<p>Although the URL that was returned wasn’t <em>exactly</em> the one I was looking for. I was expecting the absolute URL for the image that was uploaded. But instead, it was the URL of a kind of “preview” page, which is essentially the same template used for a blog post, except the content is the image that was uploaded.</p>
<p>This stumped me, and I was considering giving up with the Shortcut at this point. But I realised that Shortcuts can handle articles on websites pretty well.</p>
<p>So I played around with the various actions that dealt with articles and found a very simple solution to extract the image URL. It turns out, in the weird media post (that’s not actually uploaded as a blog post 🤨) has the uploaded image set as being the featured image.</p>
<p>That meant that I could extract that using the “Get Details of Article” action, right after the “Get Article using Safari Reader” action, and then select to get the “Main Image URL”. And it worked perfectly.</p>
<p>So with the fundamental work done, I added an “Ask for Input” action at the beginning, to extract the title of the media. And also a “Text” block, to use the title and image URL and format it as Markdown so it can then be quickly copied and pasted into a document in iA Writer.</p>
<hr />
<p>So after all of that talking, I’m sure you would like to see what the Shortcut actually looks like:</p>
<p><img src="https://chrishannah.me/images/2019/11/IMG_0071-1.png" alt="Upload Image To Blog Shortcut Screenshot" /></p>
<p><a href="https://www.icloud.com/shortcuts/7f8cce33f0824139bb753e94af3458d4">Download the Upload Image To Blog Shortcut</a></p>
<p>Hopefully either the resulting Shortcut can be useful to other people, or at least my thought process behind it, as no matter how good you think you know Shortcuts, it also seems to surprise you.</p>
