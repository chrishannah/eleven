---
categories:
- RegEx
- Twitter
date: 2017-11-08 11:09:23+00:00
description: ''
image: https://cdn.chrishannah.me/images/2017/11/Screen-Shot-2017-11-08-at-10.17.40-1.png
layout: layouts/post
permalink: use-mute-filters-to-return-to-140-character-tweets/
tags:
- RegEx
- Twitter
- post
title: Use Regular Expressions to Return to 140 Character Tweets
---

<div class="kg-card-markdown">
<p>As we all know, Twitter is now changing the character limit of a tweet to 280 characters, from the original 140. I&#8217;m sure they have reasons, and I&#8217;m not here to argue against any of them.</p>
<p>However, if you find yourself wanting to go back to the &#8220;old Twitter&#8221;, where tweets were short, and we had to abbreviate things when we couldn’t fit all of it in. There is <em>a way</em> to achieve this.</p>
<p>The method is by simply hiding any tweets that do not meet your length preference. The most popular twitter clients for iOS and macOS (Tweetbot, and Twitterrific), have some form of muting feature, which also allow advanced muting with regular expressions.</p>
<p>Some people make use of this to mute certain hashtags, overuse of hashtags or @mentions, and some really advanced things. But for the purpose of checking a tweet length, you just need to see how many characters there are.</p>
<p>And that&#8217;s simply:</p>
<pre><code>[\s\S]{MIN_LENGTH, MAX_LENGTH}
</code></pre>
<p>You use <code>[\s\S]</code> to match any character, and then use the lengths afterwards to specify a minimum and/or maximum length.</p>
<p>Just to explain it in a bit more detail, the square brackets are a way to define a collection of character matching rules. And the curly braces are sequence quantifiers, that can match minimum, exact, or maximum length of a match.</p>
<p>And then there&#8217;s the <code>s</code> and <code>\S</code>.</p>
<p>The <code>\s</code> is used to match a whitespace character, so spaces, tabs, new lines, etc. And the <code>\S</code> is used to match the opposite, all non-whitespace characters, So if you put them together, then you&#8217;re going to match every possible character. Which in a scenario like this, is all you need.</p>
<h2 id="thepatterns">The Patterns</h2>
<p>So now I&#8217;ve explained the scenario, and solution in a bit of detail, I&#8217;ll get to the actual regular expression patterns.</p>
<p>In this case, we simply want to hide all tweets that do not fit the old standard of 140 characters in a tweet.</p>
<p>However, we aren&#8217;t setting rules, but instead writing patterns to match tweets that will be hidden, we will need to inverse the logic.</p>
<p>Seeing as we only have one parameter &#8211; the maximum length we want to see, it will be very easy. Because now we need to say, <em>if</em> a tweet matches <em>these conditions</em>, hide it.</p>
<p>The conditions will be of course, that it is over the limit we set. In this example I will use the old 140 character limit, but you could set your own custom preference using this same method.</p>
<p>If we take that logic and apply it to the simple pattern I mentioned earlier, we can simplify it even further. As we&#8217;re not checking a maximum length, that&#8217;s irrelevant. We just want to hide anything <em>over</em> a certain amount.</p>
<p>Which leaves us with:</p>
<pre><code>[\s\S]{MIN_LENGTH,}
</code></pre>
<p>You still need the comma in there though, as otherwise it will only match if it is the exact same length as the number entered.</p>
<p>Now the last part, the actual number.</p>
<p>Remember, this is not the length that we want to see, but instead the opposite. So if you want to see all tweets that are 140 characters or less, you need to check for anything 141 characters or over. (The same logic also applies to other limits).</p>
<p>So that makes it:</p>
<pre><code>[\s\S]{141,}
</code></pre>
<p>Simple!</p>
<h2 id="usingthepatternsintweetbottwitterrific">Using The Patterns in Tweetbot/Twitterrific</h2>
<p>So we have the regular expression created, now we just need to make use of it in a twitter client.</p>
<p>Tweetbot is the slightly easier option, as you just need to navigate to Mute filters, and then add a keyword filter. Where you&#8217;ll have to type your pattern in, which will enable a regular expression switch, which you will have to tap.</p>
<p>In Twitterrific, it&#8217;s somewhat more confusing, but only initially. In this app, the mute feature is called Muffles. And you add a new muffle, to mute tweets just like Tweetbot. However when you navigate to the Muffles section, it doesn&#8217;t mention regular expressions, which lead me to initially thought they weren&#8217;t supported.</p>
<p>However, you can use them in Twitterrific, it just takes one extra parameter, a pattern title. You specify a RegEx Muffle in the following format:</p>
<pre><code>Title :: Pattern
</code></pre>
<p>P.S. I know there is more formatting available, but it&#8217;s not relevant here.</p>
<p>So for Twitterrific, you might want to use something like this:</p>
<pre><code>Classic Twitter :: [\s\S]{141,}
</code></pre>
<p>And that is it. Now you can hide away from the future, and pretend these long tweets just don&#8217;t exist.</p>
<p><strong>Apps Mentioned</strong>:</p>
<ul>
<li>Tweetbot (<a href="https://itunes.apple.com/gb/app/tweetbot-4-for-twitter/id1018355599?mt=8&amp;uo=4&amp;at=1010l4Hj&amp;ct=chblog">iOS</a>/<a href="https://itunes.apple.com/gb/app/tweetbot-for-twitter/id557168941?mt=12&amp;uo=4&amp;at=1010l4Hj&amp;ct=chblog">macOS</a>)</li>
<li>Twitterrific (<a href="https://itunes.apple.com/gb/app/twitterrific-5-for-twitter/id580311103?mt=8&amp;uo=4&amp;at=1010l4Hj&amp;ct=chblog">iOS</a>/<a href="https://itunes.apple.com/gb/app/twitterrific-5-for-twitter/id1289378661?mt=12&amp;uo=4&amp;at=1010l4Hj&amp;ct=chblog">macOS</a>)</li>
</ul>
</div>