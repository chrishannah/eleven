---
date: 2018-01-02 16:29:11+00:00
description: ''
layout: layouts/post
permalink: easily-clear-out-xcode-simulator/
tags:
- post
title: Easily Clear Out Xcode Simulator
---

<p>I&#8217;ve been getting annoyed recently with the amount of simulators I had installed in Xcode at work. But I&#8217;ve come across a really simple command that will <em>fix</em> this automatically.</p>
<p>I had 10.1, 10.2, 11.0. 11.1, and 11.2 installed, which I then reduced to just two of them. Then instead of painfully selecting and deleting each generated simulator, I just typed this:</p>
<p><code>fastlane snapshot reset_simulators</code></p>
<p>It uses Fastlane&#8217;s <a href="https://docs.fastlane.tools/actions/snapshot/#completely-reset-all-simulators">Snapshot tool</a>, and what it does is delete all of your current simulators, and generate a set of new ones depening on the current SDKs you have installed.</p>