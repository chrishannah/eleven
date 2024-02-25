---
categories:
- GitHub
- Guide
- Source Control
- Xcode
date: 2017-03-01 11:04:29+00:00
description: ''
layout: layouts/post
permalink: putting-your-xcode-project-on-github-the-easy-way/
tags:
- GitHub
- Guide
- Source Control
- Xcode
- post
title: Putting Your Xcode Project on GitHub the Easy Way
---

<div id="warning" class="kg-card-markdown">
<strong>Warning</strong>: This guide is now outdated since Xcode has changed a lot since it was first published. <a href="https://chrishannah.me/using-github-and-xcode-together">A new version of this guide, Using GitHub and Xcode Together, is available and is based upon Xcode 10.1</a>.</div>
<div class="kg-card-markdown">
<p>Developers are always talking about whether to use Git from the command line, or via a GUI such as <a href="https://desktop.github.com">GitHub Desktop</a>. Well, if you’re using Xcode, then there’s a much simpler method that’s already built-in! It’s called Xcode Source Control<sup class="footnote-ref"><a id="fnref1" href="#fn1">[1]</a></sup>.</p>
<p>I’m just about to upload one of my projects to GitHub, so I thought I’d share the process. Especially as I’ve recently found it so much easier to use, because it’s right there in Xcode!</p>
<h3 id="step1">Step 1</h3>
<p>The first step is to let Xcode create a Git repository on your Mac. It should be checked by default.</p>
<p><img class="alignnone size-full wp-image-492" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-29-05.png" alt=""></p>
<h3 id="step2">Step 2</h3>
<p>Then you will need to create a new repository on GitHub. Give it a name, description, and make it Public/Private. But make sure you <strong>don’t</strong> select “Initialize this repository with a README”.</p>
<p><img class="alignnone size-full wp-image-493" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-31-11.png" alt=""><br />
Then select “Create Repository”.</p>
<h3 id="step3">Step 3</h3>
<p>Then you’ll be redirected to a page where you’ll be asked to set up your repository. You only need one thing from this page, and it’s the URL in the Quick Setup section.</p>
<p>In my case, this is <code>https://github.com/chrishannah/CH-Work-Item.git</code>.</p>
<p><img class="alignnone size-full wp-image-494" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-33-57.png" alt=""></p>
<h3 id="step4">Step 4</h3>
<p>Now it’s time to add this into Xcode.</p>
<p>Simply select Source Control from the menu bar, your project name, and then select the “Configure project” option.</p>
<p><img class="alignnone size-full wp-image-495" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-36-02.png" alt=""></p>
<p>Once you’ve done that, the next step is to select the “Remotes” tab, then select the + button in the bottom-left corner, and select “Add Remote”.</p>
<p><img class="alignnone size-full wp-image-496" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-36-21.png" alt=""></p>
<p>Here you will need to give it a name, and an address. The address is the URL previously found on the GitHub set up page. Then press “Add Remote”.</p>
<p><img class="alignnone size-full wp-image-498" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-36-59.png" alt=""></p>
<h3 id="step5">Step 5</h3>
<p>The repository has now been created on GitHub, and added to Xcode, the next step is to initialise the repository.</p>
<p>Again, from the menu bar, select Source Control, and then Commit.</p>
<p><img class="alignnone size-full wp-image-499" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-42-45.png" alt=""></p>
<p>A window will appear with all the changes to the repository, since this hasn’t been initialised yet, it will show all of your projects files.</p>
<p>Simply add a commit message, select “Push to remote”, which should automatically select your GitHub repository, and press “Commit X Files and Push”.</p>
<p><img class="alignnone size-full wp-image-500" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-43-07.png" alt=""><br />
If you haven’t connected your GitHub to Xcode before, you will be prompted for a username and password, these are your GitHub details.</p>
<h3 id="thatsit">That’s It!</h3>
<p>Once you’ve completed all of the previous steps, your project should now be on GitHub, and if you go back to the repository on GitHub, it should now be populated.</p>
<p><img class="alignnone size-full wp-image-501" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-49-42.png" alt=""></p>
<p>If you haven’t already (like me above), it’s probably best to add a README file.</p>
<h3 id="managingyourrepository">Managing Your Repository</h3>
<p>From here it’s really easy to manage your repository in Xcode. It’s all found in the Source Control menu.</p>
<p><img class="alignnone size-full wp-image-502" src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-01-at-10-52-10.png" alt=""></p>
<p>From there you can commit new files, push them to GitHub, pull any new changes, and anything else you’d expect from a Git client.</p>
<hr>
<p>I hope that this guide proved useful, and provided a bit of piece of mind for you knowing that your project is now essentially backed up.</p>
<p>If you want to see the other tutorials I have here, then there is a <a href="https://chrishannah.me/tag/guide/">Guide section</a>.</p>
<p>You can <a href="https://github.com/chrishannah">find me on GitHub as chrishannah</a>.</p>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item">For more information, there is a session from WWDC 2013, “<a href="https://developer.apple.com/videos/play/wwdc2013/414/">Understanding Source Control in Xcode</a>” that explains this in more detail <a class="footnote-backref" href="#fnref1">↩︎</a></li>
</ol>
</section>
</div>