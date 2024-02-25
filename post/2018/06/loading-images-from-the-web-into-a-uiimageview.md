---
categories:
- Kingfisher
- Library
- UIImageView
date: 2018-06-22 11:11:14+00:00
description: ''
layout: layouts/post
permalink: loading-images-from-the-web-into-a-uiimageview/
tags:
- Kingfisher
- Library
- UIImageView
- post
title: Loading Images From the Web Into a UIImageView
---

<p>This is more of a recommendation than a tip, but it totally helped me out, so I thought I’d share.</p>
<p>If you find yourself needing to load quite a substantial about of images form the web, handle caching, and then add them to image views, then I think <a href="https://github.com/onevcat/Kingfisher">Kingfisher</a> is a library you should check out.</p>
<p>I use it in my Micro.blog client, Slate, where I’m loading profile pictures, and countless images inside the post content. I simply pass the URL of the image to the UIImageView, and Kingfisher will take care of the downloading, caching, applying, and also apply a placeholder while it’s doing this if you so choose.</p>
<p>Straight from the README on GitHub, the easiest implementation of this is as follows:</p>
<pre><code class="swift">let url = URL(string: "url_of_your_image")
imageView.kf.setImage(with: url)
</code></pre>
<p>But there is a more complex function you can call to have a whole load more control:</p>
<pre><code class="swift">func setImage(with resource: Resource?,
                         placeholder: Placeholder? = nil,
                         options: KingfisherOptionsInfo? = nil,
                         progressBlock: DownloadProgressBlock? = nil,
                         completionHandler: CompletionHandler? = nil) -&gt; RetrieveImageTask
    {
</code></pre>
<p>Which you can use like this:</p>
<pre><code class="swift">let imageURL = URL(string: "here is the image url")
        let placeholderImage = UIImage(named: "placeholder")

        imageView.kf.setImage(with: imageURL,
                              placeholder: placeholderImage,
                              options: nil, progressBlock: { (receivedSize, totalSize) in
                                // Do something with the progress amount, like update a progress bar
        }) { (image, error, cacheType, url) in
            // After completion, do whatever you want with the image, any errors, cacheType, and the URL
        }
</code></pre>
<p>I’m a big fan of the library, and if you’re ever in a situation where you need to simply load a few images from the web, or a more image heavy app, then this is my suggestion. It’s certainly a lot easier than writing your own image downloader, and cache system. I spent a while making one myself, but it was never as good as Kingfisher.</p>
<p><a href="https://github.com/onevcat/Kingfisher">Kingfisher on GitHub</a></p>