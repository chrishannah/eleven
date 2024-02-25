---
categories:
- Guide
- Swift
- Swift Basics
date: 2017-03-10 00:23:50+00:00
description: ''
image: https://cdn.chrishannah.me/images/2017/03/populating-data-1.png
layout: layouts/post
permalink: getting-started-with-uitableview-populating-data/
tags:
- Guide
- Swift
- Swift Basics
- post
title: 'Getting Started with UITableView: Populating Data'
---

<p><em>This article is part of a collection of articles about <a href="https://chrishannah.me/tag/swift-basics/">Swift Basics</a>, where I try to explain different parts of Swift development in a more understandable way.</em></p>
<hr />
<p>In most iOS applications, you will probably need to use a <code>UITableView</code> at some point. In this short guide, you will find out how to create a <code>UITableView</code>, and populate it with your own data.</p>
<h2>UITableView</h2>
<p>As Apple say in <a href="https://developer.apple.com/reference/uikit/uitableview">the documentation</a>, &#8220;A table view displays a list of items in a single column.&#8221;. Basically, it&#8217;s a list of cells, that you can take complete control over. With a <code>UITableView</code> object, there are two ways in which you can control them. They are the UITableViewDelegate, and the <code>UITableViewDataSource</code>. The delegate is what manages the interactions on the table cells, such as selecting and reordering. The <code>UITableViewDataSource</code> is as you may of guessed, what controls the data that populates the table, and also configures the cells in the Table View. However in this guide, we will just be focussing on the <code>DataSource</code>, as this is all we need to populate a TableView with data.</p>
<h3>Styles</h3>
<p>There are various ways in which you can customise the style of the TableView manually, but there are two main styles that you can choose from in the InterfaceBuilder, &#8220;Grouped&#8221; or &#8220;Plain&#8221;. There aren&#8217;t many differences, but in the &#8220;Plain&#8221; style, each cell fills the Table, and the relevant header/footer float above the cells. However in the &#8220;Grouped&#8221; style, the sections are visually separated into groups, with the addition of a background colour.</p>
<h2>Creating the Project</h2>
<p>We&#8217;ll start with a new Xcode project. So create a new iOS project, and select the &#8220;Single View Application&#8221; template. Then you can give it a name, for this example I&#8217;m using &#8220;TableViewExample&#8221;.</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-09-at-16-54-56.png" alt="" /></p>
<p>Just make sure the Language is Swift, and the other options aren&#8217;t needed for this example. This will create all the necessary files, such as &#8220;AppDelegate.swift&#8221;, &#8220;ViewController.swift&#8221;, and &#8220;Main.storyboard&#8221;.</p>
<h2>Putting a UITableView on the Screen</h2>
<p>Click on the &#8220;Main.storyboard&#8221; file, and from the object library on the right, drag a Table View onto the view (There should only be the one).</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-09-at-17-00-35.png" alt="" /></p>
<p>Then to make sure it works on all iOS devices and screen sizes, we&#8217;ll set up the layout. Just drag the corners of the TableView so that it fills the view, but keeps the top status bar visible, it should automatically align. Select the Table View, and then open up the &#8220;Add New Constraints&#8221; view from the bottom right corner. It is the icon with a square, which has a vertical line either side.</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-09-at-17-02-39.png" alt="" /></p>
<p>Once you constraint view appears, select the four lines around the square at the top, while making sure each value is 0. This will simply make it fit to the edges on any screen size.</p>
<h2>Configuring the UITableView</h2>
<p>Now we need to configure the Table View so that we can manage it later on. So select the Table View, and then click to show the &#8220;Attributes Inspector&#8221; from the right sidebar.</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-09-at-17-09-02.png" alt="" /></p>
<p>The only values you need to change are:</p>
<ul>
<li><strong>Content</strong> &#8211; Dynamic Prototypes</li>
<li><strong>Prototype Cells</strong> &#8211; 1</li>
<li><strong>Style</strong> &#8211; Grouped</li>
</ul>
<p>All we are doing with these settings, is making the cells in the table dynamic, so that we can update them with live data later on. Then we set the style to grouped, so we can see each section better visually.</p>
<h2>UITableViewCell</h2>
<p>As we also want to populate the cells with some data later on, we will make use of the dynamic prototyping in Interface Builder, to design the cells.</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-10-at-00-14-09.png" alt="" /></p>
<p>Firstly we will set a &#8220;Reuse Identifier&#8221; for the cell, this is so that we can reuse the same cell prototype when loading the TableView. To do this, just select the cell (it may be easier to do this in the Document Outline to the left&#8221;, and while still showing the &#8220;Attributes Inspector&#8221;, set the Reuse Identifier to &#8220;PlainCell&#8221;.</p>
<h3>Linking the UITableView to the ViewController</h3>
<p>We will manage the Table View from the initial View Controller, so the next step is to set it as the DataSource of the Table. You can do this programatically, but for this example we will do it using Interface Builder. To do this, select the Table View, and then choose the &#8220;Connections Inspector&#8221; in the right sidebar.</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Screen-Shot-2017-03-09-at-17-29-51.png" alt="" /></p>
<p>From there, just click and drag from the open circle to the right of &#8220;delegate&#8221; and &#8220;dataSource&#8221; to the View Controller icon at the top of the view. Then in the &#8220;ViewController.swift&#8221; file, we will need to set the class to be the DataSource. Just replace the current class definition:</p>
<pre><code>class ViewController: UIViewController {
</code></pre>
<p>To the following:</p>
<pre><code>class ViewController: UIViewController, UITableViewDataSource {
</code></pre>
<p>It will show some errors right now, but that is just because we haven&#8217;t implemented the required functions yet.</p>
<h2>Populating the Table View</h2>
<p>We have the Table View set up in Interface Builder, and it&#8217;s linked to the View Controller, so now it&#8217;s time to populate it with real data. At the top of the View Controller class, just below the code you&#8217;ve just written, copy the below code:</p>
<pre><code>let sections = ["Fruit", "Vegetables"]
let fruit = ["Apple", "Orange", "Mango"]
let vegetables = ["Carrot", "Broccoli", "Cucumber"]
</code></pre>
<p>This is just three arrays that will be used for the section headings, and the content of each of them.</p>
<h3>UITableViewDataSource</h3>
<p>To fill the table with data, we need to write four functions to do the following:</p>
<ul>
<li>Set the headings for each section.</li>
<li>Set the total number of sections.</li>
<li>Set the total number of rows in each section.</li>
<li>Configure the individual cells with the relevant data.</li>
</ul>
<h4>Section Headings</h4>
<p>We already defined the section headings before, so all we need to do here is to return the string for the associated section, which the function receives as an Int.</p>
<pre><code>func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -&gt; String? {
    return sections[section]
}
</code></pre>
<h4>Number of Sections</h4>
<p>This is quite a simple method, and it just tells the TableView how many sections there are. We already have the section headings in an Array, so we can just return the <code>count</code> value of this.</p>
<pre><code>func numberOfSections(in tableView: UITableView) -&gt; Int {
return sections.count
}
</code></pre>
<h4>Number of Rows</h4>
<p>Very similar to the method above, but this time we have slightly more complexity in how we return the value of the number of rows. As this method is for every section, we first need to check which section it is for, and then return the <code>count</code> value of the relevant array.</p>
<pre><code>func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -&gt; Int {
  switch section {
  case 0:
    // Fruit Section
    return fruit.count
  case 1:
    // Vegetable Section
    return vegetables.count
  default:
    return 0
 }
}
</code></pre>
<h4>Configure the Cell</h4>
<p>The last part of populating the Table View, is to load the data into the cell. We do this by first creating a <code>UITableViewCell</code> object, by making use of the <code>dequeueReusableCell(withIdentifier:)</code> function. This uses the Reuse Identifier we set earlier, to dynamically reuse one of the cells that have already been created. Then depending on the section that the cell is in, we set the text of the text label of the cell, to the value from the relevant array. After this, the cell is returned, and it is displayed.</p>
<pre><code>func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -&gt; UITableViewCell {
  // Create an object of the dynamic cell "PlainCell"
  let cell = tableView.dequeueReusableCell(withIdentifier: "PlainCell", for: indexPath)
  // Depending on the section, fill the textLabel with the relevant text
  switch indexPath.section {
  case 0:
    // Fruit Section
    cell.textLabel?.text = fruit[indexPath.row]
    break
  case 1:
    // Vegetable Section
    cell.textLabel?.text = vegetables[indexPath.row]
    break
  default:
    break
  }

  // Return the configured cell
  return cell

}
</code></pre>
<h3>Results</h3>
<p>If you run this project now, it should look like this:</p>
<p><img src="https://chrishannah.me/wp-content/uploads/2017/03/Simulator-Screen-Shot-10-Mar-2017-00-07-23.png" alt="" /></p>
<h3>Final Code</h3>
<p>Here is the final code for the View Controller that we created:</p>
<pre><code>class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

  let sections = ["Fruit", "Vegetables"]
  let fruit = ["Apple", "Orange", "Mango"]
  let vegetables = ["Carrot", "Broccoli", "Cucumber"]

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view, typically from a nib.
  }

  // MARK: UITableViewDataSource

  func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -&gt; String? {
    return sections[section]
  }

  func numberOfSections(in tableView: UITableView) -&gt; Int {
    return sections.count
  }

  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -&gt; Int {
    switch section {
    case 0:
      // Fruit Section
      return fruit.count
    case 1:
      // Vegetable Section
      return vegetables.count
    default:
      return 0
    }
  }

  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -&gt; UITableViewCell {
    // Create an object of the dynamic cell "PlainCell"
    let cell = tableView.dequeueReusableCell(withIdentifier: "PlainCell", for: indexPath)
    // Depending on the section, fill the textLabel with the relevant text
    switch indexPath.section {
    case 0:
      // Fruit Section
      cell.textLabel?.text = fruit[indexPath.row]
      break
    case 1:
      // Vegetable Section
      cell.textLabel?.text = vegetables[indexPath.row]
      break
    default:
      break
    }

    // Return the configured cell
    return cell
  }

}
</code></pre>
<p>You can <a href="https://github.com/chrishannah/TableViewExample">find the example project on GitHub</a>.</p>
<p><strong>Congratulations!</strong> You&#8217;ve now developed an app that makes use of a UITableView, along with a UITableViewDataSource to dynamically populate data, and also to configure the UITableViewCell. As this is an ongoing series of articles, you can expect more guides on how to take this project even further.</p>