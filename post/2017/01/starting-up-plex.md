---
categories:
- Automation
- Media
- Personal
- Plex
date: 2017-01-30 18:03:20+00:00
description: ''
layout: layouts/post
permalink: starting-up-plex/
tags:
- Automation
- Media
- Personal
- Plex
- post
title: Starting Up Plex
---

<div class="kg-card-markdown">
<p>Over the past few days I&#8217;ve been setting up my own media server, and in particular, Plex. Plex is a great tool that can do wonderful things to your media collection, but the one thing that I just <em>love</em> is that it can take plain video files, an then give it so much context. It really makes your library something to look at.</p>
<h2 id="theserver">The Server</h2>
<p>The actual server itself is my old MacBook Pro, which I don&#8217;t think is the best machine for the job, but it&#8217;s the best spare machine I have available at the minute. I&#8217;m not going to write down all the specs, but it&#8217;s got an i5, 4 GB Ram, and a 1 TB hard drive. The only job of this machine however, is to manage my collection, the storage is a 3 TB NAS drive that I&#8217;ve had for a while.</p>
<h2 id="mycollections">My Collections</h2>
<p>At the minute I have three different libraries in Plex, one for all the movies I have downloaded, second for the TV Shows, and then I have also included my iTunes Media folder as a library, as I have a huge number of films in iTunes.</p>
<p>Now let&#8217;s get on to how I populate these libraries (Leaving some ethical behaviour behind of course).</p>
<p><strong>TV Shows</strong></p>
<p>The TV Shows are just video files that I have collected over the years and obtain manually, there are a few applications that can track new episodes, and even download them automatically, but I haven&#8217;t found any that I deem good enough. I don&#8217;t watch many tv shows, so a tiny bit of manual work isn&#8217;t a big deal for this.</p>
<p><strong>Movies</strong></p>
<p>My Movie collection is a mix, I have ripped some movies in the past (I hate DVDs), and also have a rather magical automation for downloading other movies I like. Here is a step by step process on how this automation works:</p>
<ol>
<li>Find a movie on <a href="https://trakt.tv/">Trakt</a>, and add it to my watch list.</li>
<li><a href="https://couchpota.to">CouchPotato</a> finds new additions in my Trakt watch list, and then populates them in it&#8217;s own database.</li>
<li>Every so often, CouchPotato will check to see if any of the added movies are available to download (with some quality preferences).</li>
<li>CouchPotato then sends these links to download to <a href="https://transmissionbt.com">Transmission</a>, which is currently running as a local web server.</li>
<li>Transmission will triage each addition, and with some specific restrictions like cumulative download limits and speed limits (that actually change depending on the time of day), start these  downloads, and place them in the correct folder on the NAS.</li>
<li><a href="https://www.plex.tv">Plex</a> Media Server tries to detect when new files are added to the libraries (It also checks regularly), and then it will analyse the media, add it to the library, and also put together all the needed metadata.</li>
</ol>
<p>It&#8217;s a really fast process, and I enjoy how little work I have to do to make something happen. I&#8217;m sure the process may change in the future, but at the minute it feels pretty seamless.</p>
<p><strong>iTunes</strong></p>
<p>This is definitely where my main content comes from, it&#8217;s where I get all of my favourite content. Even to a point where I will have a copy of a film, but I will then also purchase it on iTunes. Because it means I get the best quality available, any iTunes extras, and I also feel like it&#8217;s future proofing my movie collection slightly.</p>
<h2 id="thoughts">Thoughts</h2>
<p>I&#8217;m starting to really see why I hear so many good things about Plex, it&#8217;s easy to set up, it work&#8217;s nearly everywhere, and it just makes my media collection look amazing.</p>
<p>Running my own media server is something I think I will take further, and if I can pick up a cheap Mac Mini soon, that may be the next step. With my Amazon Dot, and now this small project, automation is becoming a fun hobby.</p>
</div>