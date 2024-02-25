---
categories:
- UITableView
date: 2018-06-08 09:44:42+00:00
description: ''
layout: layouts/post
permalink: hiding-extra-separators-on-a-uitableview/
tags:
- UITableView
- post
title: Hiding Extra Separators on a UITableView
---

<p>When you’re using a UITableView, and there isn’t enough cells to fill up the visible table, it still fills the remaining space with separators. In just one line of code, you can change that to what is probably, the most expected result.</p>
<pre><code class="language-swift">tableView.tableFooterView = UIView()
</code></pre>
<p>It’s really that simple.</p>
<p><img loading="lazy" width="1500" height="1334" class="alignnone size-full wp-image-1349" src="https://chrishannah.me/wp-content/uploads/2018/06/Image.png" srcset="https://cdn.chrishannah.me/images/2018/06/Image.png 1500w, https://cdn.chrishannah.me/images/2018/06/Image-300x267.png 300w, https://cdn.chrishannah.me/images/2018/06/Image-768x683.png 768w, https://cdn.chrishannah.me/images/2018/06/Image-1024x911.png 1024w" sizes="(max-width: 1500px) 100vw, 1500px" /></p>
<p><a href="https://gist.github.com/chrishannah/6a9d25432f908f6c00d0c7e9afd7704d">Check out the full Playground code.</a></p>