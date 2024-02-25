---
categories:
- Development
- Swift
date: 2018-01-03 23:17:21+00:00
description: ''
layout: layouts/post
permalink: a-simple-and-clean-way-to-store-sectioned-data-for-a-uitableview/
tags:
- Development
- Swift
- post
title: A Simple and Clean Way to Store Sectioned Data for a UITableView
---

<p>This is just something small in Swift/iOS that I find pretty handy, so I thought I’d share it just in case it can help.</p>
<p>So, the <em>problem</em> is that creating data that has to be presented in a UITableView can be somewhat complex, especially if you have multiple columns. This <em>solution</em> is geared towards quickly creating dummy data, but I think it could be expanded into an overall DataSource solution.</p>
<p>Anyway, we’ll start with the current way of managing sections. Usually, you would have some kind of enum that would correspond to a section integer, and also however many arrays of data for the number of sections. You would then either use the section enum to find the correct array. Or maybe you’d use a 2d array, and then use it as the index.</p>
<p>It just doesn’t see very <em>Swift</em> to me. In Swift, everything is simple, easy to read, and is pretty easy to write. So I thought I&#8217;d come up with a slight abstraction.</p>
<p>My first idea was to just make two structs, one for a Section, and another for a Table:</p>
<div class="language-swift">
<pre><code>struct Section {
    var title: String
    var items: [String]
}

struct Table {
    var sections: [Section]
}
</code></pre>
</div>
<p>You could then go ahead, create individual sections, and add them to one table. Easy.</p>
<p><strong>Example Data</strong></p>
<p>Animals:</p>
<ul>
<li>Cats
<ul>
<li>Tiger</li>
<li>Lion</li>
<li>Lynx</li>
</ul>
</li>
<li>Bears
<ul>
<li>Grizzly</li>
<li>Black</li>
<li>Polar</li>
</ul>
</li>
</ul>
<p><strong>Example Code</strong></p>
<div class="language-swift">
<pre><code>let catSection = Section(title: "Cats", items: ["Tiger", "Lion", "Lynx"])
let bearSection = Section(title: "Bears", items: ["Grizzly", "Black", "Polar"])

let animalTable = Table(sections: [catSection, bearSection])
</code></pre>
</div>
<p>I just find that a bit more readable.</p>
<p>It also makes the number of sections and rows a <em>bit</em> simpler:</p>
<div class="language-swift">
<pre><code>let numberOfSections = animalTable.sections.count
let numberOfRows = animalTable.sections[0].items.count
</code></pre>
</div>
<p>However, you can add this functionality to the Table struct Which makes it much, much better.</p>
<p>Here is the definition of the <code>ComplexTable</code> struct:</p>
<div class="language-swift">
<pre><code>struct ComplexTable {
    var sections: [Section]
    
    func numberOfRows(forSection section: Int) -&gt; Int {
        if sections.count &gt; section {
            return sections[section].items.count
        } else {
            return 0
        }
    }

    func numberOfSections() -&gt; Int {
        return sections.count
    }
}</code></pre>
</div>
<p>Which would make it this easy to get the row and section counts:</p>
<div class="language-swift">
<pre><code>let numberOfSections = complexAnimalTable.numberOfSections()
let numberOfRows = complexAnimalTable.numberOfRows(forSection: 0)</code></pre>
</div>
<p>So there you go.</p>
<p>It&#8217;s nothing big, and it won&#8217;t win many programming awards. But it&#8217;s a small piece of code that will certainly help me when I&#8217;m just messing around with tables, or I want a really clean and simple way to store small amounts of organised data.</p>