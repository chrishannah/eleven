---
date: 2015-11-09 12:00:00+00:00
description: ''
layout: layouts/post
permalink: cool-things-to-do-in-terminal/
tags:
- post
title: Cool Things to do in Terminal
---

<div class="kg-card-markdown">
<p>I&#8217;ve been playing around with Terminal recently (the command line interface for Mac), and I&#8217;ve come across a few cool things you can do with it. So here they are.</p>
<h3 id="1watchstarwarsepisodeiv">1. Watch Star Wars Episode IV</h3>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/12/screen-shot-2015-11-09-at-22-07-54-1024x718.png" alt="Star Wars" /><br />
Yes, you can watch the first Star Wars movie straight from Terminal. The whole thing is in ASCII code, and it looks pretty good. I probably shouldn&#8217;t admit this, but I put this on in one of my rather boring university lectures. All you have to do is type:</p>
<pre><code>telnet towel.blinkenlights.nl
</code></pre>
<p>You can do this in Windows as well, but sometimes you have to enable Telnet on your machine first, so <a>here is a guide for that</a>.</p>
<h3 id="2playretrogames">2. Play Retro Games</h3>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/12/screen-shot-2015-11-09-at-22-18-10-1024x718.png" alt="Screen-Shot-2015-11-09-at-22-18-10" /><br />
You can play some very cool retro games right inside your Terminal window, and it&#8217;s pretty easy too. Just type in <code>emacs</code>, press Enter, then press &#8220;Esc + X&#8221;, and then you can type in the games you want to play. Here are a few of the games:</p>
<ul>
<li>tetris</li>
<li>pong</li>
<li>snake</li>
<li>solitaire</li>
<li>gomoku</li>
<li>5&#215;5</li>
<li>dunnet</li>
<li>landmark</li>
<li>doctor</li>
</ul>
<h3 id="3talktoadoctor">3. Talk to a Doctor</h3>
<p>You can also use Terminal to talk to a virtual psychologist! Use the same steps as above, but instead of typing a game, type &#8220;doctor&#8221; (without the quotation marks).</p>
<h3 id="4setastartupmessage">4. Set a Start-up Message</h3>
<p>Add some personalisation to your Mac by adding a start-up message. Type the following, replacing Message with the desired text.</p>
<pre><code>sudo defaults write /Library/Preferences/com.apple.loginwindow LoginwindowText "Message"
</code></pre>
<p>You&#8217;ll be prompted for your password. I have mine saying Hello to me every time I turn my Mac on. To turn this off just type:</p>
<pre><code>sudo defaults write /Library/Preferences/com.apple.loginwindow LoginwindowText ""
</code></pre>
<h3 id="5addsomespacetoyourdock">5. Add some space to your Dock</h3>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/12/screen-shot-2015-11-09-at-22-23-19-1024x652.png" alt="Screen-Shot-2015-11-09-at-22-23-19" /><br />
If your finding your Dock a bit too cluttered, you can add some extra separators to space out the icons a bit more. Copy this into Terminal to add a new separator:</p>
<pre><code>defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'; killall Dock
</code></pre>
<p>To remove it, just drag it out of the Dock.</p>
<h3 id="6makeitspeak">6. Make it Speak</h3>
<p>This is a pretty easy one, and although probably isn&#8217;t very useful, it&#8217;s quite fun! Just type <code>say</code> followed by the text you want it to say, and then press Enter.</p>
<h3 id="7preventyourmacfromsleeping">7. Prevent your Mac from Sleeping</h3>
<p>There are some apps around for Mac that stop it going to sleep, like <a href="http://apprecap.net/coca-keep-your-system-awake/">Coca</a> and <a href="http://apprecap.net/caffeine-mac-app/">Caffeine</a>. But if you want to do it in Terminal instead, then there&#8217;s just one small bit of code you&#8217;ll need to know: <code>caffeinate -u -t 3600</code> To change the amount of time to prevent sleep, just change the value where it is 3600. It is measured in seconds, so the code above will keep your mac awake for an hour.</p>
</div>