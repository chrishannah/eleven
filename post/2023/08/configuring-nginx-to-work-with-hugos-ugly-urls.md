---
date: 2023-08-22 18:00:00+00:00
description: ''
layout: layouts/post
permalink: configuring-nginx-to-work-with-hugos-ugly-urls/
tags:
- post
title: Configuring Nginx to Work With Hugo’s "Ugly" URLs
---

I recently [migrated my blog][blog] from running on Ghost to Hugo. With
that, came a few changes to how the pages were built, how the URLs were formed,
and also the rules around showing 404s and redirecting where possible.

In a default Hugo installation, individual blog posts are each written as
`index.html` files inside a directory named after the given slug. So you would
end up with something like so:
```plaintext
blog/
├─ hello-world/
│  ├─ index.html
├─ about/
│  ├─ index.html
├─ my-first-blog-post/
│  ├─ index.html
```

That means when someone visits either `/hello-world` or `/hello-world/`,
they'll be taken to the content (Which is actually stored as
`/hello-world/index.html`).

Just to make things difficult, I didn't want my file structure to look like
that. It felt wrong. Instead I wanted each blog post to be generated as it's
own html file, with the slug being the filename.

Fortunately, Hugo has an option called [uglyURLs][ugly], which does exactly
that. So the same structure above would instead look like this:
```plaintext
blog/
├─ about.html
├─ my-first-blog-post.html
├─ hello-world.html
```

However, while this may look good to me. It introduced a few issues that I had
to deal with. Primarily being that the `.html` extension had to be given for
a page to load. There was no more `/about` being redirected to `/about.html`.
And definitely no `/about/` being supported.

That obviously would break a lot of past links to my blog posts. So I *had* to
find a way to deal with this.

So I set about finding a way in nginx, to essentially remove the need to have
the extension in the URL. But I then realised, that it wasn't that simple.

Because, let's say I have an about page with the filename `about.html`.
Ideally, I want `/about.html`, `/about`, and `/about/` to redirect to this
page. But at the same time, I have a mini-site for my app, [Text Shot][ts], that
sites at `/text-shot/index.html`, and ideally I want `/text-shot/index.html`,
`/text-shot/`, and `/text-shot` to all redirect to this site.

That led me to a lot of Googling, regular expressions, and quite a bit of time
spent trying various options in my nginx configuration. (If you were super
unlucky, you may have hit a 404 while I was testing).

By default, my nginx configuration handled the requests with the `try_files`
function:
```nginx
try_files $uri $uri.html $uri/ $uri =404;
```

Basically, if request was `/about`, it would try to fetch a file from these
locations (in order): `/about`, `/about.html`, `/about/`, and then if all of
those fail, produce a 404.

The code to deal with removing the need to include `.html` was relatively
simple. All it does is check if the request includes the extension, and if so,
remove it and perform a 302 redirect to the plain URI.
```nginx
if ($request_uri ~ ^/(.*)\.html(\?|$)) {
    return 302 /$1;
}
try_files $uri $uri.html $uri/ $uri =404;
```

However, that still meant that if you visited `/about/`, it would think you
were looking for `/about/index.html`, rather than the `/about.html` page.

So, I had to then add another redirect. So if the url ended in a trailing
slash (but wasn't just `/`), it would also perform a 302 redirect to a url
without the trailing slash. I ended up with this:
```nginx
location / {
    if ($request_uri ~ ^/(.*)\.html(\?|$)) {
        return 302 /$1;
    }
    if ($request_uri ~ ^/([-a-zA-Z0-9@:%_\+.~?&//=]*)\/$) {
        return 302 /$1;
    }
    try_files $uri $uri.html $uri/index.html $uri/ $uri =404;
}
```

*For reference, `$uri` is the full request URL, and `$request_uri` is anything
after the host.*

There's bound to be a way for this logic to be improved. But as far as I can
see, it works how I expect, and it gives me the exact behaviour I was looking
for.

Now for some examples. First off, the ways in which you would get to a file
located at `/about.html`:

*(Note: all redirects are stated, the rest is the priority order of the
`try_files` function.)*

1. `/about.html`: 302 to `/about` -> try `/about` -> try `about.html`.
2. `/about/`: 302 to `/about` -> try `/about` -> try `about.html`.
3. `/about`: try `/about` -> try `/about.html`.

And for the page located at `/text-shot/index.html`:

1. `/text-shot`: try `/text-shot` -> try `/text-shot.html` -> try `/text-shot/index.html`.
2. `/text-shot/`: 302 to `/text-shot` -> try `/text-shot` -> try `/text-shot.html` -> try `/text-shot/index.html`.
3. `/text-shot/index`: try `/text-shot/index` -> try `/text-shot/index.html`.
4. `/text-shot/index.html`: 302 to `/text-shot/index` -> try `/text-shot/index` -> try `/text-shot/index.html`.
5. `/text-shot/index/`: 302 to `/text-shot/index` -> try `/text-shot/index` ->
try `/text-shot/index.html`.

Note: nginx will search for an index file when `try_files` checks `$uri/`, so
there's no need to handle that. However, there were circular redirects when `/text-shot/` would be redirected to `/text-shot`, and then eventually back to `/text-shot/`, so I added an explicit attempt to `$uri/index.html` to avoid this.

Admittedly, a few of those examples are a bit odd, and likely will never
happen. But I had to cover all bases.

As you can see, it's not perfect. There are some requests that go through
a 302 just to end up at the exact page that was requested. Like #2 above.

In an ideal world, I'll never touch this configuration again. And there's also
a low chance that anyone reading this would ever need to do anything similar.
But, I can't say I found many resources online for my specific scenario, so
I thought I'd write my own.

I guess I brought this all on myself when I decided I wanted to both install my
own custom Hugo blog on a linux VM, and to also want static files with the full
filename, not just convenient "pretty" URLs that Hugo generates by default. Oh
well, at least I learned a bit more about how to configure nginx I guess.

[blog]: https://chrishannah.me/blog-update-hugo.html
[ts]: https://chrishannah.me/text-shot/
[ugly]: https://gohugo.io/content-management/urls/#appearance