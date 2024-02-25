---
categories:
- iOS
- WWDC
date: 2017-06-07 07:27:11+00:00
description: ''
layout: layouts/post
permalink: social-media-accounts-no-longer-integrated-into-ios-11/
tags:
- iOS
- WWDC
- post
title: Social Media Accounts No Longer Integrated into iOS 11
---

<div class="kg-card-markdown">
<p>Starting in iOS 11, users will no longer be able to associate social media accounts, such as Twitter or Facebook into the Settings app.</p>
<p>Previously, users could add an account to Settings, which would then allow other apps to request these details as authentication. Which was quite useful, as there are a lot of apps/services that authenticate via Twitter, and this meant you didn&#8217;t have to keep entering your password.</p>
<p>There is an alternative that developers can use, and that is the built in Keychain that can be used to store authentication details, such as username or password. And they can combine this together with the new additions to in app autofill, so that stored details can be loaded into the login form automatically.</p>
<p>This also means that the Social app framework, that developers used to initiate content sharing to built-in social networks has changed. Instead of providing a simple way to post to LinkedIn, Weibo, Facebook, is Twitter, it is now a generalised framework that can be manipulated to be used with any social account.</p>
<p>From the documentation:</p>
<blockquote>
<p>On iOS and macOS, this framework provides a template for creating HTTP requests. On iOS only, the Social framework provides a generalized interface for posting requests on behalf of the user.</p>
</blockquote>
<blockquote>
<p>A common way to use this framework is:</p>
<ul>
<li>Create a network session.</li>
<li>Get the activity feed for a user.</li>
<li>Make a new post.</li>
<li>Set properties on a post, add attachments, etc.</li>
<li>Publish a post to an activity feed.</li>
</ul>
</blockquote>
<p>So it&#8217;s still helpful, in that it can be used in more ways than before, and a general interface is also provided. But from the point of view of something like Twitter that was previously integrated, it will be a bit more work to integrate.</p>
</div>