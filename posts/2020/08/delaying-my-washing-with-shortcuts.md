---
categories:
- Automation
- Shortcuts
date: 2020-08-06 00:22:13+00:00
description: ''
layout: layouts/post
permalink: delaying-my-washing-with-shortcuts/
tags:
- Automation
- Shortcuts
- post
title: Delaying My Washing With Shortcuts
---

<p>A bit of a weird headline, I know. However, to be honest, this post was originally going to be a short aside, about myself being delighted with the delay function on my washing machine.</p>
<p>For content, I bought a house with my girlfriend a little over 18 months ago, and the seller left a perfectly functioning washing machine. It was always something we were thinking about replacing at some point in the future, especially when after a few months we noticed that it would occasionally leak water from the door. Probably just needed a new seal, but it was old anyway, and it didn&#8217;t fit the style in our kitchen anymore.</p>
<p>Luckily for us, a few weeks ago someone in my girlfriends family had a washing machine going spare (moving house), and it was in pretty good condition. So we gladly took it off their hands.</p>
<p>Fortunately for me, it had a delay function. I know it&#8217;s not advanced technology, I&#8217;ve seen what you can get for stupid amounts of money. But it&#8217;s enough to do the job for me.</p>
<p>The only issue I have with doing the laundry is that I always feel the need to do it at weird times. For example, it&#8217;s 22:00 and I&#8217;ve only just put a load of washing on. That&#8217;s not a problem in itself though, the issue is that I would prefer to have it freshly washed at a time where the sun is out and I am free to put it outside to dry. Right now, that time is around 12:30pm. Because that&#8217;s around the time I take my lunch break, and it means I can get it put in a few minutes, and it dries pretty quickly.</p>
<p>So by having a delay function, I&#8217;m able to be sporadically productive at weird times, put a load of washing in the machine, and set it to be ready for exactly when I need it. Except, the delay is exactly that, a period of time before the function starts, not a set time for it to run or finish by. Also, the precision is to an hour. So the only calculation I need to do is to work out the number of hours until noon the next day, and then subtract however long the wash duration is. Not exactly a hard calculation, but I&#8217;m lazy. So I came up with a needlessly complicated shortcut to do it for me.</p>
<p><a href="https://chrishannah.me/images/2020/08/IMG_4385.jpeg"><img class="aside" src="https://chrishannah.me/images/2020/08/IMG_4385.jpeg" /></a></p>
<p>If you&#8217;re expecting something minimal that just does the job, then look away now. This may look a mess, but it produces a pretty nice output.</p>
<p>You can check out a <a href="https://chrishannah.me/images/2020/08/IMG_4385.jpeg">full size image of the shortcut</a>, or <a href="https://www.icloud.com/shortcuts/abcbe93904274bc98819bf72aa996087">download it straight away</a> if you want to check it out. I&#8217;ll do my best to explain what&#8217;s going on, but it may bet easier to have a look yourself.</p>
<p>First of all, it asks for the time that I wish the washing to be ready. In most cases this will be 12:00, so that&#8217;s the default value. It then formats this time, so it can be used later in the format, and stores it in the <code>Washing Time</code> variable.</p>
<p>Afterwards, it calculates the time between the current date and time and the selected time (which by default uses the current date). It&#8217;s to check whether that time has already passed in the current day or not. If it has passed, then I must mean tomorrow, if not, then it&#8217;s today. I could simply prompt for input, but if I can save any interaction then I will.</p>
<p>If it determines that I must mean tomorrow, then it adds 1 day to the date stored in the <code>Washing Time</code> variable, and also sets a new variable called <code>Today or Tomorrow</code> to &#8220;tomorrow&#8221;.</p>
<p>If it&#8217;s for today, then the date stays the same, and <code>Today or Tomorrow</code> is set to &#8220;today&#8221;. This variable is nothing special, just a string that I use later on in the final message that appears. This if statement was just a good place to put it, to avoid duplicate logic.</p>
<p>Now it knows the date and time that the wash needs to be ready by, it also needs to take into consideration the duration of the wash. Similarly to the previous input, the most used wash on my washing machine is 76 minutes, so I put that as the default to make it easier.</p>
<p>That duration is subtracted from the earlier calculated wash time, this will be the time that the wash needs to start. It then calculates how minutes there are until that time.</p>
<p>That duration is now formatted into an Hour:Minute format. The minutes are first calculates using the modulus operation, and the hours are calculated by removing the aforementioned &#8220;minutes&#8221; value, and diving by 60.</p>
<p>There is a little if statement afterwards to check if the minutes value is less than 10. This is to make sure the minutes are always formatted as two digits. There could be a better way for this, but I know that this way works.</p>
<p>After calculating the delay needed, it wraps it into a friendly message with all the information I may or may not need.</p>
<p>Example: 🕰 The required delay for a 76 minute wash to finish today at 12:00 is 10:32 🧼</p>
<hr style="clear: both;" />
<p>Now I&#8217;ve finished writing about this, it has occurred to me that I&#8217;ve blown this problem completely out of proportion. But it was fun, so who cares?</p>
<p><strong>Washing Delay Calculator</strong>:</p>
<ul>
<li><a href="https://www.icloud.com/shortcuts/abcbe93904274bc98819bf72aa996087">Download the Shortcut</a></li>
<li><a href="https://chrishannah.me/images/2020/08/IMG_4385.jpeg">View the full-size image</a></li>
</ul>
