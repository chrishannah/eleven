---
categories:
- meta
date: 2023-08-19
description: ''
layout: layouts/post
permalink: blog-update-hugo/
tags:
- meta
- post
title: Blog Update
---

As of tonight, I've now completed the final stage of transitioning my blog from
Ghost to Hugo.

As you may have known, my blog has been powered by [Ghost][g] for a few years.
It's definitely served me well. However, a while ago I started to like the idea
of static sites. Seeing as my blog is essentially a list of static posts, it
felt a bit weird that the pages were being served dynamically. So, I started
on the journey of moving to [Hugo][h].

It took a bit of work to adapt my existing theme to work with Hugo's template
system. But I managed to get it pretty similar, while also adding a few
improvements at the same time.[^1]

Of course, being a static site, pages now load super fast, and they're
extremely lightweight. But that's not the only good thing about using Hugo.
It's also super easy to host other static pages alongside the source Markdown
post files. This means I can build mini-sites for my apps, and keep them
managed within my blog. I can control the structure of the site better, either
by using categories/tags or by structuring the source files in the way I want
them to be generated. And another great one, I can now create custom pages and
templates. For example, I built a custom [archive][a] page for all of the posts
on the blog, and a few extras that as a bit different for [essays][e] and
[travel updates][t].

In the early version of this new Hugo blog, I had it being deployed to
a Digital Ocean app via a GitHub action that was triggered after pushing new
posts. But, that didn't allow me full control of the VM it was running from, so
I decided to switch to a droplet (VM), and have built my own minimal
installation.

Obviously, Hugo is installed, but apart from that the only other things I had
to install was nginx and certbot. So *very* minimal. I was wondering how I'd
manage the deployment, because I still wanted to have the site automatically
rebuild after pushing my changes. Luckily, I found [a guide by Josh
Hausotter][gu] that shows you how to configure a remote repository on your
Digital Ocean droplet and a "post receive" action that runs a script whenever
changes are received to generate the static files and move them to the correct
directory. I honestly never thought about using git this way.

As for how I write and publish my posts from my own machine. I do that using
[Neovim][n] on my Mac, and then just pushing to the remote repository. Neovim
might not be the most trendy tool for writers, but I find it works for me, and
I also use it for writing code, so I'm pretty comfortable with the keybinds.

You may be wondering, what does this mean for you? Do you need to change
anything? Well, in theory, no. The posts are now stored as static `html` files,
however I have configured nginx for these to work without the extension, and
the filenames/slugs haven't changed. Technically, the RSS feed is now
different. Hugo generates the RSS feed in an `index.xml` file at the base of
the site, [which you can find here][r]. However, I have set up directs for
`/feed` and `/rss`, so you shouldn't need to do anything.

Hopefully, this change will go by mostly unnoticed. But if you do notice
something odd, you know where to find me. (Links are at the bottom of the
page)

*Written: while watching Oblivion with my cat.*

[^1]: The theme is named Hurley. (Lost reference)

[g]: https://ghost.org
[h]: https://gohugo.io
[a]: https://chrishannah.me/archive.html
[e]: https://chrishannah.me/essays.html
[t]: https://chrishannah.me/travel.html
[n]: https://neovim.io
[gu]: https://www.digitalcloudnw.com/blog/how-to-deploy-hugo-site-to-digitalocean-with-git-hooks/
[r]: https://chrishannah.me/index.xml