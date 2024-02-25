---
categories:
- Git
- Programming
date: 2017-09-06 15:13:14+00:00
description: ''
layout: layouts/post
permalink: creating-gitignore-files-the-easy-way/
tags:
- Git
- Programming
- post
title: Creating .gitignore Files the Easy Way
---

<div class="kg-card-markdown">
<p>If you&rsquo;re a programmer, you&rsquo;re probably aware about version control and <a href="https://git-scm.com">Git</a>, and maybe even what a <code>.gitignore</code> file is.</p>
<p>If you don&rsquo;t:</p>
<blockquote><p>A gitignore file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected; see the NOTES below for details.</p></blockquote>
<p>Anyway, creating these files can be annoying to write manually, and there a bunch of templates all over the internet to make this much easier.</p>
<p>I however, found a much better solution for creating these files, and it&rsquo;s <a href="https://www.gitignore.io">gitignore.io</a>. It&rsquo;s a website that you can use to generate a <code>.gitignore</code> file, but also a command line tool that you can use, so you never have to leave your terminal.</p>
<p>It has support for operating systems, IDEs, and programming languages. So my standard file will be generated from macOS, Xcode, and Swift, since that&rsquo;s how I roll.</p>
<p>You can type (with autofill of course) whatever templates you want to make use of straight into the website, and then hit &lsquo;Create&rsquo;.</p>
<p><img class="alignnone wp-image-416" src="https://chrishannah.me/wp-content/uploads/2017/09/Screen-Shot-2017-09-06-at-15.57.00.png" alt=""/></p>
<p>For the command line, you&rsquo;ll have to <a href="https://www.gitignore.io/docs">first install it</a>, and then the <code>gi</code> command will be available. All you need to do is type <code>gi</code> followed by a comma-separated list of the same items you would use on the website.</p>
<p>So mine would be:</p>
<p><code>gi macos,xcode,swift</code>.</p>
<p>The command would of course, output this out via the standard output, so you can direct it straight into your <code>.gitignore</code> file by writing something like:</p>
<p><code>gi macos,xcode,swift &gt;&gt; .gitignore</code></p>
<p>It&rsquo;s super easy, and it saves a lot of time.</p>
<p>As a little bonus, <a href="https://vimeo.com/204803019">there&rsquo;s also a quick video</a> on how to install and use the command line tool.</p>
</div>