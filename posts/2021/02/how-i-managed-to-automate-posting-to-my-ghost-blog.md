---
categories:
- Automation
- Shortcuts
date: 2021-02-04 16:19:08+00:00
description: ''
layout: layouts/post
permalink: how-i-managed-to-automate-posting-to-my-ghost-blog/
tags:
- Automation
- Shortcuts
- post
title: How I Managed to Automate Posting to My Ghost Blog
---

For those that don’t know, this blog runs on the [Ghost blogging platform](https://ghost.org). A platform that is notoriously not that good at dealing with automation, or working from iOS devices, since they don’t have their own apps, and rely on third-parties integrating with their API.

The app I use for writing right now is [iA Writer](https://ia.net/writer), and luckily for me, it has integrated with the Ghost API. So after I created an API token from my blog’s admin panel, I was able to publish to my blog. Except that you can only publish drafts, you can’t control things like tags or the slug, and the title is the name of the file, not the typical H1 title from the Markdown content.

I wasn’t happy with the process, since I had to use the web interface for every post, but I just got on with it because there wasn’t an alternative.

But, I’ve been looking into [Craft](https://www.craft.do/) recently, and it reminded me that my publishing workflow isn’t flexible at all. So there would be no chance of me publishing anything from Craft.

## Ghost Admin API

That lead me to have a look at the [documentation for the Ghost Admin API]. Which to be honest I think is pretty bad, it’s written like a blog post, rather than clearly defining each request. Plus they override the `⌘ + F` keyboard shortcut for a stupid search tool, so that made it more difficult to find anything.

After I got to grips with how it worked, I realised that it would be too much of a hassle to interact with the API just using the Shortcuts app. Simply because of the authentication method. It uses a signed JWT token, which isn’t a bad thing, but it is when you have to construct and sign the token yourself.

After you add a custom integration to your blog, you can find an “Admin API key”, which sounds pretty good. Except this isn’t a ready-made key that you can use for authorisation. First of all, this key is actually two things, one half is a key that goes as part of the `kid` inside the JWT token, and the other half is a string that you need convert from hexadecimal into bytes, and then use that to sign the JWT token.

It was too complex for me to even attempt using Shortcuts, and I’d need a few libraries if I wanted to write some JavaScript, so I couldn’t use [Scriptable](https://scriptable.app/) either.

Which meant the only option was to write an app instead.

Although, not a fully functioning app, I only actually wanted a few Shortcut actions. So I ended up creating a SwiftUI app that looks like this:

<img src="https://chrishannah.me/images/2021/02/IMG_0366.png">

However, there are actually three Shortcut actions that it provides:

* Get Blog Info
* Upload Image
* Create Post

The first one isn’t actually needed, but I used that to test out the Shortcuts action and API integration, since it has no parameters, and doesn’t require authentication. It just fetches some basic information about a Ghost blog.

## Image Upload

But the first _real_ action I worked on was uploading images. It was a bit tricky, dealing with accepting a file as an input, and then getting the data in a state where it could be uploaded. I had an issue for a while where the app didn’t have permission to access the file, so I had to copy the data, write it to the app, and upload it to the blog.

I’m not too sure how stable this action is, especially since the endpoint only accepts a few image formats (not HEIC). So I have to do a conversion first. Although I’m doing this in Shortcuts for simplicity. But at least it works!

Here is the Shortcut I’ve created to upload an image:

<img src="https://chrishannah.me/images/2021/02/Image.png">

## Post Creation

Now the big one, creating posts. This was a slightly bigger task, but a relatively straightforward one to build.

There are five parameters in the Create Post action:

* Title
* Slug
* Content
* Status (Draft/Published)
* Tags

Essentially, they just all need to be passed on to the API. A bit of formatting is involved, with the tags being parsed from a comma-separated list to an array of strings, and the HTML content being wrapped in Mobiledoc format (which is what Ghost uses).

There is a ton of data in the response, but since I don’t see most of it being useful, I only look for four pieces of information:

* Title
* Slug (I thought this would be helpful, not so sure now)
* URL
* Featured Image URL

I’m only using the title and URL in my shortcut right now, as it’s still pretty simple.

The first part of the Shortcut deals with the title. First of all, it removes the first H1 from the document and also extracts the title without formatting for later. This was taken from Federico Viticci’s Publish to WordPress shortcut.

After that, I use my app Text Case to format the title into AP Title Case, convert the Markdown content into HTML, and also to create a slug from the title.

Then I run it through the new Create Post action.

<img src="https://chrishannah.me/images/2021/02/IMG_0371.png">

From there I have the post information, which means I can automate sending a tweet about the new blog post and launch the page in Safari.

It’s good to have publishing to the blog and Twitter in one place because I plan on experimenting with different types of posts on my blog soon, so it’s nice to have control.

## The App

To be honest, I don’t think the app will ever go public. That thought did pop into my head a few times while building it, but it will take a bit of work to make it user-friendly. I’d have to untie it from my blog, add some stability, and maybe even do error handling. Because right now, it either works or it doesn’t.

But you never know, maybe this is an idea I can take further? Not sure how much I’d need to charge for it though, since the number of people that have a blog, use Ghost, want to automate the process, and also want to pay money for it, is probably quite low.
