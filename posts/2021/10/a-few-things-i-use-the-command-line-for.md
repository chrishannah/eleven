---
categories:
- Development
- Tips
- Programming
- Command Line
date: 2021-10-21 21:57:22+00:00
description: ''
layout: layouts/post
permalink: a-few-things-i-use-the-command-line-for/
tags:
- Development
- Tips
- Programming
- Command Line
- post
title: A Few Things I Use the Command Line For
---

I’ve noticed myself using the command line a lot more recently, at home, and work, so I thought I’d share a few of the little tools and handy commands that I use on a day to day basis.

_Note: I use [ZSH](https://en.wikipedia.org/wiki/Z_shell) as my shell, with [oh my zsh](https://ohmyz.sh), so they may differ slightly if you’re using something different._

## Aliases

The most helpful commands that I use have to be aliases for the most minor commands. But because they’re used so often, it saves so much time.

The majority of them are for two things - moving to common directories, and launching applications.

Here are a few examples of directories I have set up with aliases:

* **h**: home directory
* **dev**: developer directory where I store all projects
* **tc**: Text Case directory
* **blb**: Bulba directory

That’s just a small snippet, but usually, I have most projects set up with a very small alias. But even if I don’t have one set up for each project, I’ve got one that puts me at the root of my developer folder anyway.

As for applications, I’ve got a few that I use a lot:

* **xc**: Opens a `xcodeproj` in the current directory
* **xcw**: Opens a `xcworkspace`  in the current directory
* **vs**: Opens the current directory in Visual Studio Code
* **fork**: Opens the current directory in Fork - A Git GUI, for when I want to dig into any conflicts.

## Git

Being a developer, I use Git quite a lot. And that is where [oh my zsh](https://ohmyz.sh) comes in handy, as it comes with a huge number of aliases for common Git commands. [Here’s a great cheatsheet](https://kapeli.com/cheat_sheets/Oh-My-Zsh_Git.docset/Contents/Resources/Documents/index).

Here are the ones I use the most, and also what the full command is:

* `gco`: `git checkout` - checkout branch
* `gaa`: `git add --all` - adds all changes in the current directory
* `gc -m ""`: `git commit -v -m ""` - commits the current changes with a message
* `gp`: `git push` - pushes commits to the configured remote repo
* `gf`: `git fetch`- fetches branches and tags from the configured remote repo

I’m aware that those are pretty minor commands, but they’re so much easier when they’re just one two or three letters.

Also, oh my zsh does come with an alias for committing changes with a message, but it’s `gcmsg` and that’s longer than just using `gc` with the `-m` option.

The most used Git command I use though has to be a little ZSH function I made myself:
```zsh
function gacp {
    gaa; gc -m $1; gp
}
```

It stands for “git add commit push”, and as you can probably tell, it adds and commits the following changes, with the supplied message, and pushes it to the remote repository.

Most of the time I’m doing stuff like this:
```zsh
gacp "JIRA-123 fix tests"
```

Woops!

## FTP

I don’t use these a lot, but I do have a few aliases to update various websites. They basically use the `scp` command (secure copy) to transfer files from a local directory to a remote server. [Guide](https://linuxize.com/post/how-to-use-scp-command-to-securely-transfer-files/).

This isn’t exactly what I have, but they all follow this rough syntax:
```bash
scp -r /Users/chris/website user@123.123.123.213:../var/www/
```

This will recursively upload the contents of a local directory to a remote server. I use this whenever I update changes to my blog theme.

## HTTP Requests

Whether I’m working on a mobile app or REST API at work, I’m usually testing various requests throughout the day. And while I sometimes use a tool like Postman, especially when I’m building a collection for QA testers, I do find it a bit cumbersome sometimes. So that means I end up resorting back to the terminal.

I’ve seen a tool called [httpie](https://httpie.io) which does seem to be quite good, but I’ve found [curl](https://curl.se) to be good enough for my uses.

_Tip: If you’re stuck with the syntax and don’t have time to wade through documentation, I’d recommend using a tool like Postman to build the request, and you can then export the curl request._

Most of the time I’m just performing `GET` requests, so the syntax is simply:
```zsh
curl https://dev.chrishannah.me/feed.json
```

If you need just the headers of the response there’s the `-I` option, and if I want both the headers and body it’s a lowercase `-i`.

### Environment Variables

Usually, I’m using the command line because I want to test quite quickly, and with slight tweaks, so I find making the command as short as possible helps with this.

The first one for me is to use environment variables. So for example I’ll use one for the base URL of the API, and usually a few for any variables that need to be in the path, especially if these are user account numbers, as it makes it a lot easier to quickly test different scenarios.

This means that a request like this:
```zsh
curl https://company.com/api/account/2a3e4832-14e6-430d-8c34-748f4626e864/transactions
```

Can be made a lot shorter by using two environment variables:
```zsh
export base=https://company.com/api
export account=2a3e4832-14e6-430d-8c34-748f4626e864/transactions
```

Which means it can look like this:
```zsh
curl $base/account/$account/transactions
```

The biggest benefit I find is that allows you to edit the command much easier.

### Using Files

Another tip I have for curl is that if you have a bunch of headers that you need to use, then it helps to have these stored in a file.

You can do this by using the `-H` command followed by `@` and then the filename. For example, this command will read the headers from a file named `headers.txt`:
```zsh
curl https://website.com -H @headers.txt
```

The header file needs to be in this format:
```http
Key: Value
```

So something like this would work:
```http
Content-Type: application/json
Authorization: Bearer [token]
```

This is especially handy for me as most of our APIs at work require various authorisation tokens that can be quite large.

You can also use other options to use files for storing the body of the request, but I’ve not had much experience of that, so I’ll have to defer to google.

## JSON

This goes hand-in-hand with making HTTP requests, in that the responses are usually JSON. For that I use the JSON processor, [jq](https://stedolan.github.io/jq/).

Most of the time, I’m just using it to “beautify” data from a curl request, so I pass through the response to `jq` by [piping](https://www.geeksforgeeks.org/piping-in-unix-or-linux/) the output from `curl` to `jq` like so:
```zsh
curl https://dev.chrishannah.me/feed.json | jq
```

What that does is take the response from the curl request and output a pretty printed version of it.

But you can also use `jq` to parse the JSON response and pick out certain fields.

So for example, a request to my blogs JSON feed at `https://dev.chrishannah.me/feed.json` will return a fair bit of JSON data. Something like this:
```json
{
  "version": "https://jsonfeed.org/version/1",
  "title": "Chris Hannah's Dev Blog",
  "home_page_url": "https://dev.chrishannah.me/",
  "feed_url": "https://dev.chrishannah.me/feed.json",
  "description": "A devlog by Chris Hannah",
  "author": {
    "name": "Chris Hannah",
    "url": "https://chrishannah.me"
  },
  "items": [
    { ... }
  ]
}
```

But say I only wanted to read the `author` object, I’d just need to use this command:
```zsh
curl https://dev.chrishannah.me/feed.json | jq '.author'
```

Which will return just this:
```json
{
  "name": "Chris Hannah",
  "url": "https://chrishannah.me"
}
```

There’s a lot more it can do as well, and I’d recommend [checking out these examples](https://stedolan.github.io/jq/tutorial/).

---

I’m sure there are tons of other resources that go into far more detail on what you can do with the command line. But I thought I’d share a few things that I use it for, just in case it might prompt others to find some ways to save themselves time!