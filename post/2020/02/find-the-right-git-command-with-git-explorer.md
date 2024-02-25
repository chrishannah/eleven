---
categories:
- Git
date: 2020-02-19 09:20:22+00:00
description: ''
layout: layouts/post
permalink: find-the-right-git-command-with-git-explorer/
tags:
- Git
- post
title: Find the Right Git Command With Git Explorer
---

<p>If you&#8217;ve ever wanted to do something in Git via the command line, but you&#8217;re just not quite sure what the command is. Or you roughly know what you want to do, but don&#8217;t know where to start, then <a href="https://gitexplorer.com">Git Explorer</a> is the perfect tool.</p>
<p>All you need to do is select from of them 19 options after &#8220;I want to&#8221;, and that can be something like &#8220;I want to compare two commits&#8221; or &#8220;I want to configure&#8221;. Then you get further options to refine the query, and it shows you the exact command you need.</p>
<p>For example, if you wanted to remove multiple branches that matched a certain pattern, then you just need to select these options:</p>
<p><em>I want to</em></p>
<ul>
<li>delete/remove</li>
<li>multiple branches</li>
<li>by pattern</li>
</ul>
<p>Then you get told the command:</p>
<p><code>git branch | grep &lt;regex pattern&gt; | xargs git branch -D</code></p>
<p>And also a helpful note to help you understand it:</p>
<blockquote><p>
  e.g. git branch | grep &#8220;-&#8221; | xargs git branch -D will delete all branches that have &#8216;-&#8216; in their names or git branch | grep -v &#8220;master&#124;staging&#8221; | xargs git branch -D will delete all branches except staging and master.</p>
<p>  NB: Always put your regex pattern in quotes
</p></blockquote>
<p>I use Git via the command line myself, but there&#8217;s always the odd scenario where I can&#8217;t quite figure out the command or proper syntax, so this website will be perfect for me. It&#8217;s going straight into my bookmarks.</p>
<p><a href="https://gitexplorer.com">Check out Git Explorer</a>.</p>