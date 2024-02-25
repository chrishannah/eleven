---
categories:
- Development
date: 2016-01-29 12:00:00+00:00
description: ''
layout: layouts/post
permalink: getting-started-mongodb/
tags:
- Development
- post
title: Getting Started with MongoDB - Basic Messaging
---

<div class="kg-card-markdown">
<p>After talking to a friend at university about wanting to start a little side project while I don&#8217;t have any coursework, he suggested I tried out MongoDB. He gave me a little demo just in Terminal and how easy it was to simply create a database, I never plan on using MySQL again after seeing this.</p>
<p>To create a new database all you need to enter is <code>use testdb</code> If it’s already been created then it will simply select that database, if not then it will just create it. Easy!</p>
<p>Then to create a collection inside a database (tables in MySQL), just insert some data! So for example if I entered this:</p>
<pre><code>db.users.insert({name: “Chris Hannah”, username: “chris”, email: “chris@email.com”})
</code></pre>
<p>It would then create a new collection with the name users, and then insert a new document (row), with the corresponding values for name, username, and email.</p>
<h3 id="makingitintosomething">Making it into something</h3>
<p>So after I realised I could get the hang of MongoDB, I started seeing how I could use it in something like PHP. It took ages to get the different extensions installed, and also working with XAMPP (I wont discuss the trouble I had, it would take too long).</p>
<p>But after getting that sorted, I worked out a little code to display all the entries in the Users collection. That felt pretty nice to have, as I was still inserting the data via Terminal and then refreshing the page to see the data suddenly appear.</p>
<p><img src="" alt="Mongo"></p>
<p>After that I thought this could be useful for a basic messaging service, so I started a new messages collection in the database. The only data I stored was the user (which I will then correlate with the users collection eventually), the message text, and a timestamp.</p>
<p>I got the messages appearing just like I did with the Users. But after adding a basic form, and another bit of PHP to take the data and insert it into the database, I got something that slightly resembles a message board.</p>
<p>I&#8217;m now going to work on it a bit further, and it may develop into a basic service like Twitter, or a chat room thing, either way I&#8217;m not too bothered. It&#8217;s all for the purpose of learning, so just making <em>something</em> is good enough.</p>
</div>