---
date: 2019-03-12 09:41:48+00:00
description: ''
layout: layouts/post
permalink: a-major-bank-accidentally-published-private-code-to-the-public-npm-registry/
tags:
- post
title: A Major Bank Accidentally Published Private Code to the Public NPM Registry
---

<p><a href="https://twitter.com/seldo">Laurie Voss</a>, a Co-founder and Chief Data Office of <a href="https://www.npmjs.com">NPM</a>(A package manager for JavaScript, and a huge database of public and private JavaScript packages), had an interesting story to tell on Twitter:</p>
<blockquote class="twitter-tweet" data-lang="en-gb">
<p lang="en" dir="ltr">A major international bank accidentally published a private package of their own to the public npm Registry, took *3 years* to notice, and then sent DMCA takedown notices to Amazon and Cloudflare for hosting &quot;stolen code&quot;. Now I have to pay a lawyer to explain this to them.</p>
<p>&mdash; Laurie Voss (@seldo) <a href="https://twitter.com/seldo/status/1105153287718723584?ref_src=twsrc%5Etfw">11 March 2019</a></p></blockquote>
<p><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<blockquote class="twitter-tweet" data-conversation="none" data-lang="en-gb">
<p lang="en" dir="ltr">We sell a thing that prevents this kind of mistake, it is called npm Enterprise, you should all really look into it instead of making me spend money to explain how npm publish works to your lawyer.</p>
<p>&mdash; Laurie Voss (@seldo) <a href="https://twitter.com/seldo/status/1105153658998579202?ref_src=twsrc%5Etfw">11 March 2019</a></p></blockquote>
<p><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<blockquote class="twitter-tweet" data-conversation="none" data-lang="en-gb">
<p lang="en" dir="ltr">(I should make clear that this kind of legal confusion happens ALL THE TIME and is a genuine source of overhead in running the registry)</p>
<p>&mdash; Laurie Voss (@seldo) <a href="https://twitter.com/seldo/status/1105155780867612673?ref_src=twsrc%5Etfw">11 March 2019</a></p></blockquote>
<p><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<blockquote class="twitter-tweet" data-conversation="none" data-lang="en-gb">
<p lang="en" dir="ltr">Our lawyer is also going to need to explain to a bank why a React package does not constitute &quot;Stolen Financial Credentials&quot; oh lord</p>
<p>&mdash; Laurie Voss (@seldo) <a href="https://twitter.com/seldo/status/1105157348560007168?ref_src=twsrc%5Etfw">11 March 2019</a></p></blockquote>
<p><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></p>
<p>My first reaction was something akin to &quot;How the hell do you do this by mistake?&quot;. Surely publishing a package to NPM has just enough friction that you don&#8217;t publish private IP to a public repository.</p>
<p>You have to also keep in mind thatNPM have supported private repositories since 2014, and also offer a full enterprise solution already, <a href="https://www.npmjs.com/products/enterprise">NPM Enterprise</a>.</p>