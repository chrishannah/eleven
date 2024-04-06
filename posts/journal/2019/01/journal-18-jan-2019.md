---
date: 2019-01-18 21:28:27+00:00
description: ''
layout: layouts/post
permalink: journal-18-jan-2019/
tags:
- post

title: 'Journal: 18 Jan 2019'
---

<p>An interesting day at work today. I had to reimplement a line-chart in one of our apps, because the framework that we previously used was producing inconsistent results.</p>
<p>The chart we have shows time-based data, and the problem stems from the fact that the data provided by the API isn&#8217;t consistent with the timing of records. So for example there might be 10 data points for one day, two for the next, and six for another. We spread out the values on the y-axis and the associated dates on the x-axis, but the spacing of data is based on the amount of data points, with no way to override this.</p>
<p>Luckily I done a bit more research, and there&#8217;s a framework called <a href="https://github.com/danielgindi/Charts">Charts</a> by <a href="https://github.com/danielgindi">Daniel Cohen Gindi</a>, that&#8217;s actually a Swift/iOS Chart framework for a Android. It also happens to be the one used in our Android app, so just based on consistency it&#8217;s better than the one we had before.</p>
<p>Apart from that, it&#8217;s been a pretty average day.</p>
