---
categories:
- continuous integration
- Development
date: 2019-02-19 23:34:10+00:00
description: ''
layout: layouts/post
permalink: having-some-fun-with-continuous-integration/
tags:
- continuous integration
- Development
- post
title: Having Some Fun With Continuous Integration
---

<p>I had an interesting day at work today, as I was configuring a new project work with our CI server, and have things like Unit/UI Tests in a readable format, and also convert the code coverage into something that could be stored along with the build artefacts.</p>
<p>Just for some background, we use Bamboo as a server, and I&#8217;m pretty limited with what I can actually configure myself, without getting someone with higher privileges. So I try to work within my limitations, and see what I can come up with.</p>
<p>I use Fastlane as the main solution to manage the whole process. And that means I can use the scan and slather commands to do the heavy lifting for the testing/code coverage. The way I had to integrate it in our CI server was reasonably simple. The test results were handled by setting the output type to <code>junit</code>, and then adding a simple JUnit Parser task on Bamboo. The code coverage was slightly more complex, as it needed me to run a python package that converts it into a &#8220;Clover&#8221; format that Bamboo could understand.</p>
<p>What was more tricky, was getting this data nicely formatted when it was sent to our Slack room. The previous build plans all had notifications handled form Bamboo, and it just gave a short message with the number of tests that passed/failed. I wanted more insight this time though, as I knew the test data was available, and also that I had code coverage being generated. I decided that the simplest (maybe it wasn&#8217;t in the end) solution was to just find a way to read the information from the <code>.xml</code> files, and send a custom message to Slack as part of the Fastlane process.</p>
<p>What I ended up with is a kind of monstrous-masterpiece. In Fastlane I had the Slack command being called with some basic information about the build, such as the branch, project name, and whether it passed/failed. But to get the results of the Unit/UI tests, I thought I&#8217;d use <code>grep</code> to find the line in the <code>junit</code> file that had text like &#8220;tests=100 failures=0&#8221;, I then used <code>sed</code> to clean up the surrounding text, and had the final output as &#8220;Passed: 100, Failed: 0&#8221;. The code coverage was slightly harder. I used <code>grep</code> and <code>sed</code> again in the same way to find the total code coverage, but it was formatted like &#8220;1.00000000&#8221;, and I wanted a percentage. So I piped that through <code>bc</code> with a small calculation, and they&#8217;re not formatted as a percentage with two decimal spaces.</p>
<p>Then with some magic of environment variables, I added two build-specific URLs to the message payload. One for the build details, and the other which linked directly to the code coverage report.</p>
<p>What I ended up with was something like this:</p>
<ul>
<li><strong>iOS App</strong></li>
<li><strong>Tests</strong> Passed: 100, Failed: 0</li>
<li><strong>Code Coverage</strong> 100.00%</li>
<li><strong>Coverage URL</strong> https://build.com/coverage/IOS_BUILD_99</li>
<li><strong>Build URL</strong> https://build.com/IOS_BUILD_99/something</li>
<li><strong>Result</strong> Success</li>
<li><strong>Git Branch</strong> master</li>
</ul>
<p>I&#8217;m not sure if all of that is relevant for each build, or if I&#8217;ll have to include some other things I&#8217;ve forgotten about. But what I can say, is that it was really fun to come with all of these little scripts that come together with something so simple at the end. And it&#8217;s quite likely that no-one else seeing the messages will have any idea the lengths I went to to make everything appear so simple.</p>