---
categories:
- projects
- development
date: 2023-12-31 00:16:34
layout: layouts/post
permalink: my-projects-in-2023/
tags:
- post
title: My Projects in 2023
---

I wanted to wrap up 2023 with another post looking back at the projects
I worked on over the year, and also have a think about what 2024 could bring.

## Text Shot

I can't quite remember where I said it, but I remember thinking at the end of
2022, I really wanted to work on another app. Thankfully I did just that, and
I managed to develop and release a universal (iOS, iPadOS, and macOS)
app that takes in various parameters and generates a "text shot", [Text Shot](http://chrishannah.me/text-shot).

![Text Shot](https://cdn.chrishannah.me/images/2023/12/ts.png)

It's a simple idea, and the app itself is very utilitarian. But from what I've
heard, quite a few people have found it useful, including myself. It was
originally developed to be a way to share quotes from websites (blogs), but
after some feedback, I ended up making it more general. So you can provide up
to four parameters: a title, source, author, and the quote. And on top of that
I added some extra features like font options, themes, basic Markdown
formatting, and also the option to export Alt text for those that wanted to
add it to their Mastodon posts.

[Website](https://chrishannah.me/text-shot) | [App Store](https://apps.apple.com/us/app/text-shot/id6450152342)

## Text Case

This is by no means a new project. But 2023 brought a few small changes to Text
Case, along with an entirely new form.

![Text Case](https://cdn.chrishannah.me/images/2023/12/tc.png)

Apart from some small visual tweaks and bug fixes, I added back a "scratchpad"
feature, which shows a piece of text in all formats and flows at once, similar
to the original version of Text Case, there were new colour options added, and
also, it became a totally free app! The tip jar still exists, but I decided to
make all versions of the app free.

![Text Case](https://cdn.chrishannah.me/images/2023/12/tcc.png)

The new form that Text Case took in 2023 was a command line application. Partly
because I wanted the functionality myself, along with wanting to work on
something new, and also open-source[^1]. It's made with Swift, and it shares
a lot of the underlying logic, although I have been refactoring where necessary
as it's now public. I had planned at one point to distribute it alongside the
Mac App Store version, and also as a publicly available executable, but the
various processes like code signing, Developer ID certificates, app
notarization, etc. made me decide to distribute it via Homebrew instead.

[Website](http://textcase.app) | [iOS App Store](https://apps.apple.com/us/app/text-case/id1407730596?uo=4) | [Mac App Store](https://apps.apple.com/us/app/text-case/id1492174677?ls=1&mt=12) | [GitHub (CLI)](https://github.com/chrishannah/textcase-cli)

[^1]: There may be a better term for it than open-source, because I'm not
    really encouraging contributions, so it's more "public source".

## Smaller Projects

Apart from the two relatively big projects that I've already mentioned,
I worked on a few more smaller projects that were both for fun, and for when
I had a quick idea or need for something to exist. None of them are
groundbreaking, but they were certainly enjoyable, and I think I learned at
least something from all of them.

### blogroll.js

This was something that I've seen on other peoples websites, and it's a way to
have a static list of links, and randomly, a subset are displayed as a list on
a website. As the name suggests, it's a simple JavaScript script, and it's
quite minimal (purposely). All you do is define a `JSON` file with a few links
(only a title and URL is needed), include the script on the website, and then
specify a HTML element where you want the links to be displayed.

I'm not sure if anyone will ever use it. But it was definitely a useful project
for me, as I learned how to make minimal JavaScript scripts, and also have them
easily configurable via parameters.

[GitHub](https://github.com/chrishannah/blogroll.js)

### random-link.js

Very similar to blogroll.js, this is another script that I built that uses
similar logic, but instead only presents a single random link at a time.

[GitHub](https://github.com/chrishannah/random-link.js)

### Arbok

I started to appreciate statically generated websites earlier this year (which is
why my blog now runs via Hugo), and I also wanted to write some more Python, so
I decided to make another static blog generator, named Arbok. It was an
interesting project, although I doubt it will be used (I'm starting to notice
a trend). However, I did have to write some Python code to manipulate files at
work earlier this year, and what I learned writing this project helped me
complete that. So I guess it can be classed a success.

[GitHub](https://github.com/chrishannah/Arbok)

### Hugo Post Organiser

As mentioned above, my blog is now built using Hugo. But previously, it was
based on Ghost. And while I managed to export the content from my Ghost blog
into suitable files ready for Hugo, they lacked organisation. So I decided to
built a tool that could organise a single directory of markdown files, and
organise them into subdirectories by year and month, both taken from the source
frontmatter in each file.

I have yet to use this for my live blog, but I wanted to see if it was feasible
to accomplish. Thankfully it was, and it's something I still may use. But
I decided to not go ahead with using it just yet, because I was reminded many
times about the benefit of not changing URLs and breaking any links to my blog
posts.

[GitHub](https://github.com/chrishannah/Hugo-Post-Organiser)

## Plans for 2024

I don't have any detailed plans for 2024. Just some over arching
ideas that I hope to at least be following for the first half of the year.

Instead of trying a lot of new languages and frameworks, I want to spend most
of my time building on existing skills. So for example maybe using Swift for
a new app, or maybe another command line utility. I'm sure I'll end up using
JavaScript or Python for a few fun ideas. But seeing as I currently work
professionally as a Java developer, I'm interested to see if I can start doing
this more in my spare time as well.

Who knows, maybe my next open-source project will be Java-based?

I certainly enjoyed the process of working in public with the CLI version of
Text Case, and even if not open-source, I'm beginning to become more a fan of
making free software. So I would definitely expect that to continue.