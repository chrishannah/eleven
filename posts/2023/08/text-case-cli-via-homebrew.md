---
date: 2023-08-26 22:00:00+00:00
description: ''
layout: layouts/post
permalink: text-case-cli-via-homebrew/
tags:
- post
title: Text Case CLI via Homebrew
---

I wrote just a few days ago, about [Text Case coming to the command line][blog]. And it's
already time to announce that it's now available to install from Homebrew.

Okay, so it's not in the core tap, I have my own custom tap (maybe that will happen eventually).
But it's still a pretty easy process.

All you need to do is:

```
brew tap chrishannah/textcase
brew install textcase
```

Then you'll be able to format text using the `textcase` command. Which is pretty easy. I used
it myself to format the slug inside Neovim when writing this post.

![](/images/2023/08/neovim-textcase.jpeg)

While I'm here, I may as well explain what functionality is supported in the very first release
of Text Case CLI.

To start off, the currently supported formats are:

 - stripHTML - Strip all HTML tags.
 - stripWhitespace - Remove all whitespace.
 - trimWhitespace - Remove any preceeding or succeeding whitespace.
 - clapCase - Put 👏 between every word.
 - hashtags - Convert words into hashtags.
 - rot13 - Reverse all characters.
 - shuffled - Shuffle all characters.
 - slug - Convert the text into a slug.
 - smallCaps - Convert all characters into small capital characters.
 - mockingSpongebob - Turn your words into something sarcastic Spongebob would say
 - upsideDown - Flip all characters.
 - capitalise - Capitalise the first letter.
 - capitaliseWords - Capitalise all words.
 - lowercase - Make all characters lowercase.
 - reversed - Reverse all characters.
 - uppercase - Make all characters uppercase.
 - sentence - Capitalise text as a sentence.

 To use these formats, you can pass in input in three different ways - you can use the `--input`
 option to pass a string of text, the `--in` option to specify a file to use as input, or you
 can pipe in data from stdin.

 The outputted string will be sent to stdout, but you can also use the `--out` option to have the
 resulting text written as a file instead.

If you have any questions or feedback about Text Case CLI, then feel free to [email me](mailto:me@chrishannah.me), or you can
find me on [Twitter/X][tw] or [Mastodon][m].

*Written: while relaxing in a caravan in Wells-next-the-Sea.*

[blog]: https://chrishannah.me/text-case-is-coming-to-the-command-line
[tw]: https://twitter.com/chrishannah
[m]: https://fosstodon.org/@chrishannah