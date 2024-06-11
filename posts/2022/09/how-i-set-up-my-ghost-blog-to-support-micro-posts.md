---
categories:
- Blog
- Ghost
- Microblogging
date: 2022-09-07 13:54:46+00:00
description: ''
layout: layouts/post
permalink: how-i-set-up-my-ghost-blog-to-support-micro-posts/
tags:
- Blog
- Ghost
- Microblogging
- post
title: How I Set Up My Ghost Blog to Support Micro Posts
---

Yesterday, [I configured my blog to support micro posts](https://chrishannah.me/micro-posts/), and I had a lot of feedback asking, essentially, how I did it. So, I’ve decided to write exactly what I did to enable micro posts on my Ghost blog.

As a side note, my blog is a self-hosted instance of Ghost on Digital Ocean. This is the only way I’ve ever used Ghost, so if you pay for a Ghost instance directly on Ghost.org, then I’m not sure if you will have access to everything a self-hosted instance does.

## What Is a Micro Post?

Essentially, a micro post is a blog post without a title, and usually of a very small size. Many people will associate them with Micro.blog. However, you may not realise that Twitter and Tumblr are forms of microblogging too. But the only real limitation that I’ve had to work around in Ghost, is the limitation of a post always needing a title, and the knock on effects of that throughout the feeds, website theme, etc.

## How I Distinguish Micro Posts in Ghost

This is probably the simplest part. The way I distinguish micro posts from full post in my blog is with a new tag.

I now have a `micro` tag, which will be used as the sole tag on any micro post, which the rest of the solution is based on.

## Displaying Them Differently on the Website

On my website, you can see that micro posts and full posts are styled slightly differently. The difference is relatively minor, and boils down to the removal of the title, and having the data become the permalink to the post.

This separation is handled via my custom theme, and in two ways.

Firstly, in places where I am building the layout for the post, I added a condition on the post having the `micro` tag, and then using separate layouts:
```handlebars
{% raw %}
{{#has tag="micro"}}
	<!-- Micro post layout -->
{{else}}
	<!-- Full post layout -->
{{/has}}
{% endraw %}
```

Most of the differences are handled via the layout, but I also added specific styling for micro posts via CSS.

This is done via the `{{post_class}}` which I have added to the class of the `article` element in my post layout:
```handlebars
{% raw %}
<article class="{{post_class}}">
	{{> "post-header"}}
	{{content}}
</article>
{% endraw %}
```

This results in the following HTML:
```handlebars
{% raw %}
<article class="post tag-micro no-image">
	...
</article>
{% endraw %}
```

This means you can use the `tag-micro` class to directly make any style changes.

## How Are the RSS Feeds Handled?

As for the RSS feeds, As you may have seen in my earlier post, I have now added three RSS feeds. One for micro posts, another for _normal_ blog posts, and another for all posts. This is handled via [Ghost’s Routing system](https://ghost.org/docs/themes/routing/), which I have only discovered recently, but which I currently use to manage my RSS feeds, and a few extra collections on my blog.

As for the routing, this is handled via a `yaml` file which is managed via the Ghost dashboard under Labs.

In my `routes.yaml` file, this is the section that contains the configuration for the RSS feeds.
```yaml
{% raw %}
routes:
  /feed/micro/:
    content_type: text/xml
    template: rss-micro
  /feed/:
    content_type: text/xml
    template: rss
  /feed/all/:
    content_type: text/xml
    template: rss-all
{% endraw %}
```

As you can see, the paths are defined, along with the content type, but the most important field is `template`, which refers to a `.hbs` file in my theme that handles the template for each RSS feed.

Each feed has a separate template, however instead of including each one here, I have uploaded them as GitHub gists to make it easier to see each entire file.

* [rss.hbs](https://gist.github.com/chrishannah/fbe434cbc4cc1ce14336569b69a7b1bd) - RSS feed for non-micro posts.
* [rss-micro.hbs](https://gist.github.com/chrishannah/226de0b10a38f8ed6182a6dea0f2edcc) - RSS feed for micro posts.
* [rss-full.hbs](https://gist.github.com/chrishannah/c544a2df771d060c456892b3c2233646) - RSS feed for all posts.

These templates are mostly identical. However, they do all differ on the data that is fetched, and also the title field.

As for the micro post feed, the data that is fetched is the latest 30 posts that have the `micro` tag. The `title` element is also left blank.
```handlebars
{% raw %}
[...]

{{#get "posts" filter="tag:micro" limit="30" include="authors,tags"}}
	{{#foreach posts}}
	<item>
		<title></title>
		<[...]
	</item>
	{{/foreach}}
{{/get}}

[...]
{% endraw %}
```

The feed for the non-micro posts is similar, however has a limit of 15, and will, obviously, fetch all posts that do not have the `micro` tag.
```handlebars
{% raw %}
[...]

{{#get "posts" filter="tag:-micro" limit="15" include="authors,tags"}}
	{{#foreach posts}}
	<item>
		<title><![CDATA[ {{title}} ]]></title>
		[...]
	</item>
	{{/foreach}}
{{/get}}

[...]
{% endraw %}
```

As for the combined feed, I have this fetching the most recent 15 posts. But there is also a condition on the `micro` tag, which is used to show/hide the title.
```handlebars
{% raw %}
[...]

{{#get "posts" limit="15" include="authors,tags"}}
	{{#foreach posts}}
	<item>
		{{#has tag="micro"}}
		<title></title>
		{{else}}
		<title><![CDATA[ {{title}} ]]></title>
		{{/has}}
		[...]
	</item>
	{{/foreach}}
{{/get}}

[...]
{% endraw %}
```

## How Are These Posts Imported to Micro.blog?

Thanks to the magic of Micro.blog, this really didn’t take much effort at all. This is handled via the newly created RSS feed that only contains micro posts.

The character limit of a micro post on Micro.blog is 280, so I have been keeping my micro posts within this limit. But simply by adding this new feed to Micro.blog, the posts are being imported to the platform and appearing on the timeline as if they were written there.

I have a feeling this is down to the lack of a title and the post length being within the limits, so I would assume this is also how it works if you are using another blogging platform.

## Real-World Example

I’ve now gone over the work I needed to do to configure my blog to allow for micro posts, which leaves me with the question of how I actually write a micro post.

In the future, I want to try building out a Shortcut that can interact with my blog via an API. However, I have so far been writing them directly in the web editor.

<img src="https://chrishannah.me/images/2022/09/Screenshot-2022-09-07-at-14.26.45.png" caption="">

There are just three things that I need to do to make a micro post, and have it handled correctly. Obviously, the post content and the new `micro` tag, but I also add a title of `Micro`.

You might wonder why I added a tag, since this whole concept is to have a post _without_ a title. However, a title is still required in Ghost. What I’ve done, is to work around this restriction. In an ideal world, Ghost would remove this restriction, enabling posts with no titles, and then none of this would be necessary.

What this title does, is that it firstly gets around the restriction, but it also takes care of the slug. Because if I keep the title the same for all micro posts, the slug will automatically become `micro-1`, `micro-2`, etc. Meaning, I also don’t have to worry about the URLs looking ugly.

---

I hope this post can be of use to people who want to do the same or similar things with their blogs. But like I said earlier, it would be my preference if Ghost could handle this itself without any workarounds.

If you’re reading this, and you get stuck anywhere, please feel free to leave a comment below, or get in touch via [Micro.blog](http://micro.blog/chrishannah), [Twitter](https://twitter.com/chrishannah), or [Email](mailto:me@chrishannah.me).
