---
categories:
- Writing
- Craft
date: 2021-02-08 21:13:19+00:00
description: ''
layout: layouts/post
permalink: using-craft-to-write-blog-posts/
tags:
- Writing
- Craft
- post
title: Using Craft To Write Blog Posts
---

I’ve been using Craft for a few weeks, but around a week ago I had the thought of using it to write blog posts. I’d already found it a great app for collecting information, links, and images, and was working well as a research tool. But I wondered if this could replace iA Writer for my blog writing.

I shortly discovered that Craft has no functionality to publish to Ghost blogs, which is what my blog is run on. That stopped me in my tracks. But only for a short period, since as you may already know, I  ended up looking into the Ghost API myself, and [writing a small iOS app with Shortcut actions to manage uploading images and creating posts](https://chrishannah.me/how-i-managed-to-automate-posting-to-my-ghost-blog/). So that got me back trying out Craft again.

## Writing in Craft

I find the act of writing in Craft to be very enjoyable. I like how I can use a lot of the typical Markdown syntax, but also have it presented in a way where it looks like a final piece of writing. Rather than in an intermediary language that will then _become_ a blog post later on.

While you could say that there are a lot of formatting options in Craft, it is still relatively minimal and doesn’t introduce a ton of distractions.

There are four fonts to choose from, two options for page width, spell check, cover image, and few extras in the form of page formatting. But for the actual style of your text, you have the various levels of headings, bold, italics, list, checklist, and you can even have a block of text appear as an embedded blog or a quote. So it all seems pretty normal. Although you can change the text colour of a block, which seems a bit novel for a notes app for me. I think that could be a bit useful when organising content, or even just using a nice colour, but I especially like how it doesn’t affect the Markdown export.

I must admit though, there is one feature that Craft has that I absolutely love. Embedding documents within each other.  There are various formatting options, but essentially they appear as cards inside a document.

<img src="https://chrishannah.me/images/2021/02/Screenshot-2021-02-08-at-20.15.53.png">

I’ve used these a few times for more general research writing, but I see these as being pretty useful when doing more long-form writing, as it allows you to manage a structure easier. So I don’t think I’ll need to use embedded content or linked documents when writing the majority of my blog posts, but it’s good to have.

## Using Craft as a Research Tool

I think even if Craft isn’t used as a tool for writing a final version of a document, it’s an invaluable tool for gathering research and organising your thoughts. Like I said at the start of this post, I’ve been using Craft for a while already for this very purpose. I have a document for interesting things I find, where I usually store a link and a few thoughts, so I can reference it later if I want to either look further into a subject or even write about it.

<img src="https://chrishannah.me/images/2021/02/Screenshot-2021-02-08-at-20.40.01.png">

There’s a lot more to Craft than just text and images too, with the support for various types of content embeds, linking documents, and the modular design of cards, it can really serve as a hub of information. Couple this together with third-party apps like Spark that allow you to generate URLs for specific emails, and you can put together a document that can serve as a central point for a project.

I have a document like so for my app [Text Case](https://textcase.app), and also my upcoming [newsletter](https://chrishannah.me/newsletter/). Because while I want to keep different pieces of writing in different documents, I appreciate a level of organisation and I find it a good tool for planning.

## Exporting Your Writing

When it comes to taking your writing out of Craft, I must admit there’s room for improvements.

There are a few options for exporting a document into various formats, like Markdown, PDF, Textbundle, and MS Word. But that obviously requires you to then move that content manually into your blog.

<img src="https://chrishannah.me/images/2021/02/Screenshot-2021-02-08-at-20.52.24.png">

Along with simply exporting a document into another format, there are options to send your document to another application. So when you’re finished writing, you can send your document to an app such as iA Writer or Ulysses to finalise any formatting, and then use their built-in publishing tools. It feels like a workaround, but it’s still definitely possible. I have my custom Shortcut actions, which means I _can_ publish directly from Ghost. But there are times where I think using iA Writer as a middle-man is useful, especially when dealing with things like HTML embeds.

I have found that Craft doesn’t support the HTML syntax I like for blockquotes, so right now I’m writing posts that include those in iA Writer. Although I’m still using Craft to collect the links and notes for those posts. It’s not a complex format, I just prefer to use a parent `figure` element, which contains a `blockquote` for the actual quote and a `figcaption` for the author and title of the quoted document. I suppose this could be fixed if there was an option to embed raw HTML in a document, but for now, I have to write that elsewhere.

## Final Thoughts

I find Craft a delight to use, and writing becomes a joy when using it. But with the limitations of certain HTML elements and lack of built-in publishing tools, I can’t see it becoming my sole writing app. At least until those things are remedied.

But alongside using Craft to plan personal projects and keep notes, I find it an invaluable tool for research. It may seem trivial, but having a place where you can throw a bunch of content in a single place is super useful, and at least for myself, it removes so much of the friction when it comes to writing. For example, for a potential link post, I used to start with an article or quote, and then have to start from scratch. But with my current collection of links, thoughts, and related content, it’s really easy to then create a blog post.

I can say for definite that Craft will stay as part of my writing workflow, and I’m open to it taking up a bigger chunk, but that responsibility relies on the people at Craft. Let’s see what they can come up with next.
