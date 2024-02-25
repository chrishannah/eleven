---
categories:
- Guide
- Help
- macOS
date: 2017-01-14 01:19:45+00:00
description: ''
layout: layouts/post
permalink: open-apps-from-unidentified-developers-on-macos/
tags:
- Guide
- Help
- macOS
- post
title: Open Apps From Unidentified Developers on macOS
---

<div class="kg-card-markdown">
<p>I&#8217;ve seen a few people have issues regarding opening applications that they have downloaded from the internet, that they get the error below, about it being from an unidentified developer.</p>
<p><img class="alignnone size-full wp-image-528" src="https://chrishannah.me/wp-content/uploads/2017/12/Screen-Shot-2017-01-14-at-01-10-10-1.png" /></p>
<p>This is due to the latest security settings in macOS, and these are accessible in the Security &amp; Privacy pane in System Preferences.</p>
<p><img class="alignnone size-full wp-image-529" src="https://chrishannah.me/wp-content/uploads/2017/12/Screen-Shot-2017-01-14-at-01-14-22-1.png" /></p>
<p>There are two options to choose from:</p>
<ul>
<li>App Store</li>
<li>App Store and identified developers</li>
</ul>
<p>Of course the top option means you can only open applications distributed from the Mac App Store. But the other one means it allows all apps from the Mac App Store, and also any developers that have signed their application with Apple&#8217;s &#8220;Developer ID&#8221; certificate. This allows developers to distribute their apps outside of the store, but also maintain the same security features, and trust level as the former option.</p>
<p>You can read more about Developer ID on the <a href="https://developer.apple.com/developer-id/">Apple Developer website</a>.</p>
<p>There is also a temporary solution, which lets you override the security settings on a case by case basis. Just press &#8220;Open Anyway&#8221; at the bottom of the preferences pane, and it will then open like normal!</p>
<p><em>Edit (14th January 2017)</em>:</p>
<p>My friend Cesare let me know that you can also <a href="https://twitter.com/cdf1982/status/820144535342817281">unlock a third option</a>, this let&#8217;s you choose &#8220;Anywhere&#8221; in the preferences, and will let you download and open any application without restriction.</p>
<p>To unlock it, just open Terminal (Applications/Utilities/Terminal) and enter the following line exactly:</p>
<pre><code>sudo spctl --master-disable
</code></pre>
<p>If you want to return it back to normal, just enter the following:</p>
<pre><code>sudo spctl --master-enable
</code></pre>
</div>