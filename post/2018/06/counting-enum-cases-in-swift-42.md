---
categories:
- Enum
date: 2018-06-09 13:08:09+00:00
description: ''
layout: layouts/post
permalink: counting-enum-cases-in-swift-42/
tags:
- Enum
- post
title: Counting Enum Cases in Swift 4.2
---

<p>Previous to Swift 4.2, the way you (or at least, I) count the number of cases in an Enum, would be to create an extra case called <code>lastValue</code>, or <code>count</code>. This, of course, was only useful if the raw type was an Int.</p>
<pre><code class="swift">enum Option: Int {
    case one
    case two
    case count
}

Option.count.rawValue
</code></pre>
<p>Well now, if you make it conform to the <code>CaseIterable</code> protocol, you can use the <code>allCases</code> array. Which is generated automatically, and contains all the cases in the order they were defined.</p>
<pre><code class="swift">enum Option: CaseIterable {
    case one
    case two
}

Option.allCases.count
</code></pre>
<p>This also means you can not only use it to count the amount of cases, but iterate over all of them much easier.</p>
<p>The <code>allCases</code> value is only generated when the Enum doesn’t use associated values, in which case you will have to do this manually.</p>
<pre><code class="swift">enum Option: CaseIterable {
    case one
    case two(Bool)

    static var allCases: [Option] = [.one, .two(true)]
}

</code></pre>