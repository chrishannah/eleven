---
categories:
- Git
- GitHub
- Guide
- Mac
- Xcode
date: 2019-01-07 14:18:21+00:00
description: ''
layout: layouts/post
permalink: using-github-and-xcode-together/
tags:
- Git
- GitHub
- Guide
- Mac
- Xcode
- post
title: Using GitHub and Xcode Together
---

<p>It’s been just under a year since I published my article on <a href="https://chrishannah.me/putting-your-xcode-project-on-github-the-easy-way/">how to connect an Xcode project to a GitHub repository</a>. Since then, Xcode has kept being updated with new Source Control features, and the guide started to break. So I’ve decided to start fresh and show how you can quickly and easily use GitHub to track your Xcode project.</p>
<p><!--more--></p>
<p><em>The Xcode used for this guide was version 10.1.</em></p>
<p>We will first go through initialising a Git repository, finding the Source Control features in Xcode, and then either link it to an existing GitHub remote, or create one directly inside Xcode.</p>
<h2>Initialising a Git Repository</h2>
<p><img loading="lazy" class="alignnone size-full wp-image-6652" src="https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-13.12.19.png" width="577" height="235" srcset="https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-13.12.19.png 577w, https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-13.12.19-300x122.png 300w" sizes="(max-width: 577px) 100vw, 577px" /></p>
<p>You will need to make sure your project is inside a Git repository. The easiest way is to check the “Create Git repository on my Mac” checkbox when first creating the project, but you can also use the <code>git init</code> command<sup id="fnref:1"><a href="1" rel="footnote">1</a></sup> to create one inside the root folder.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6655" src="https://cdn.chrishannah.me/images/2019/01/DraggedImage.png" width="431" height="249" srcset="https://cdn.chrishannah.me/images/2019/01/DraggedImage.png 431w, https://cdn.chrishannah.me/images/2019/01/DraggedImage-300x173.png 300w" sizes="(max-width: 431px) 100vw, 431px" /><br />
Once your project is being tracked by Git, you will see your project in the Source Control pane on the left of Xcode. It’s the second icon from the left, and you can quickly access it using <strong>CMD + 2</strong>.</p>
<p>This shows any local branches, tags, and also any remote repositories you have set up, along with remote branches. So you’ll be able to use this pane, along with the Source Control option in the menu bar to manage your repository once it is set up.</p>
<h2>Setting Up a Remote</h2>
<p><img loading="lazy" class="alignnone size-full wp-image-6654" src="https://cdn.chrishannah.me/images/2019/01/DraggedImage-1.png" width="555" height="378" srcset="https://cdn.chrishannah.me/images/2019/01/DraggedImage-1.png 555w, https://cdn.chrishannah.me/images/2019/01/DraggedImage-1-300x204.png 300w" sizes="(max-width: 555px) 100vw, 555px" /></p>
<p>From this stage you have two options, you can link this repository to an already existing remote you have set up, or you can use Xcode’s new tools to create a new one. Either option can be found by right-clicking on the Remotes folder.</p>
<p>I’ll go through both methods.</p>
<h3>Using an Existing Remote</h3>
<p><img loading="lazy" class="alignnone size-full wp-image-6649" src="https://cdn.chrishannah.me/images/2019/01/Image-3.png" width="5740" height="2066" srcset="https://cdn.chrishannah.me/images/2019/01/Image-3.png 5740w, https://cdn.chrishannah.me/images/2019/01/Image-3-300x108.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-3-768x276.png 768w" sizes="(max-width: 5740px) 100vw, 5740px" /></p>
<p>For this example, I created a blank repository on GitHub. Once a blank repository is created, they show you a few ways to initialise the repository. However the only thing you’ll need is the URL address inside the Quick setup section. For me, it’s <code> https://github.com/chrishannah/Test-Existing-Remote.git&nbsp;</code>.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6646" src="https://cdn.chrishannah.me/images/2019/01/Image-4.png" width="954" height="201" srcset="https://cdn.chrishannah.me/images/2019/01/Image-4.png 954w, https://cdn.chrishannah.me/images/2019/01/Image-4-300x63.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-4-768x162.png 768w" sizes="(max-width: 954px) 100vw, 954px" /></p>
<p>So if you go back to Xcode, right click on Remotes, and select Add Existing Remote, a new window will appear from the top prompting for the location. You just need to paste in the URL you got from GitHub, and select Add.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6651" src="https://cdn.chrishannah.me/images/2019/01/Image-5.png" width="796" height="297" srcset="https://cdn.chrishannah.me/images/2019/01/Image-5.png 796w, https://cdn.chrishannah.me/images/2019/01/Image-5-300x112.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-5-768x287.png 768w" sizes="(max-width: 796px) 100vw, 796px" /></p>
<p>Once you’ve done that, you should see the new remote appear in the Source Control pane, and you’ll be able to commit, push, pull, etc. from the menu bar in Xcode, along with the usual places.</p>
<h3>Create New Remote</h3>
<p>If you haven’t got a remote repository set up yet, this is the easiest way to do so, and you don’t even have to leave Xcode.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6647" src="https://cdn.chrishannah.me/images/2019/01/Image-6.png" width="1001" height="465" srcset="https://cdn.chrishannah.me/images/2019/01/Image-6.png 1001w, https://cdn.chrishannah.me/images/2019/01/Image-6-300x139.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-6-768x357.png 768w" sizes="(max-width: 1001px) 100vw, 1001px" /></p>
<p>Like before, go back to the Source Control pane, right-click on Remotes, and select Create “Project Name” Remote. You’ll then be presented with a window where you can customise the new repository you will be creating.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6653" src="https://cdn.chrishannah.me/images/2019/01/Image-7.png" width="1399" height="292" srcset="https://cdn.chrishannah.me/images/2019/01/Image-7.png 1399w, https://cdn.chrishannah.me/images/2019/01/Image-7-300x63.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-7-768x160.png 768w" sizes="(max-width: 1399px) 100vw, 1399px" /></p>
<p>First of all, you’ll need to connect your GitHub account if you haven’t already. To do this just click on the Account drop down menu, tap Add, and then enter your GitHub credentials.</p>
<p>You can then enter a repository name, which will also dictate the URL, an optional description, the visibility of the project, and name you will call the remote in Xcode. The default options are usually fine, although you may want to make the repository private. The last field, remote name, can be left as the default &#8220;origin. This is just a label you can give to the remote repository, and if you used multiple, it would be helpful to distinguish each of them. Origin is just the conventional name that most developers use.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6648" src="https://cdn.chrishannah.me/images/2019/01/Image-5-1.png" width="796" height="297" srcset="https://cdn.chrishannah.me/images/2019/01/Image-5-1.png 796w, https://cdn.chrishannah.me/images/2019/01/Image-5-1-300x112.png 300w, https://cdn.chrishannah.me/images/2019/01/Image-5-1-768x287.png 768w" sizes="(max-width: 796px) 100vw, 796px" /></p>
<p>Xcode will then create the repost on GitHub, and push your code. You should then see the new remote appear in the Source Control pane, and you’ll be able to commit, push, pull, etc. from the menu bar in Xcode.</p>
<p><img loading="lazy" class="alignnone size-full wp-image-6650" src="https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-14.00.01.png" width="1225" height="897" srcset="https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-14.00.01.png 1225w, https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-14.00.01-300x220.png 300w, https://cdn.chrishannah.me/images/2019/01/Screenshot-2019-01-07-at-14.00.01-768x562.png 768w" sizes="(max-width: 1225px) 100vw, 1225px" /></p>
<p>You’ll also find your code on the remote repository on GitHub.</p>
<hr>
<p>I hope you found this guide helpful. If not, then please let me know either in the comments below, or on Twitter where I’m <a href="https://www.twitter.com/chrishannah">@chrishannah</a>.</p>
<div class="footnotes">
<hr>
<ol>
<li id="fn:1"><a href="https://git-scm.com/docs/git-init">https://git-scm.com/docs/git-init</a>&nbsp;<a href="1" rev="footnote">↩</a></li>
</ol>
</div>