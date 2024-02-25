---
categories:
- Swift
- UIKit
date: 2019-01-17 23:29:26+00:00
description: ''
layout: layouts/post
permalink: adding-insets-to-a-uilabel/
tags:
- Swift
- UIKit
- post
title: Adding Insets to a UILabel
---

<p>I ran into a situation at work today, where I was already using a UILabel to display text, but it was styled in a way that really needed some padding.</p>
<p>UILabel doesn’t directly support this, and the most common way to get around it is to embed the UILabel inside a UIView, and control the constraints that way. I didn’t really want to do that for what I was doing, and I also wanted to just make my own label that <em>could</em> handle padding.</p>
<p>It didn’t take long and was a lot more straightforward than I thought. I subclasses UIClass, added a UIEdgeInsets variable, and then made sure that <code>intrinsicContentSize</code>, <code>sizeThatFits(_ size: CGSize)</code>, and <code>drawText(in rect: CGRect)</code> took that into consideration. So it still works perfectly with AutoLayout.</p>
<p><script src="https://gist.github.com/chrishannah/634c476db92bdb040ba4133c82ec6bd6.js"></script></p>
<p>It’s certainly not a major open source project or anything, but it could be a quick way to add padding support to a UILabel!</p>