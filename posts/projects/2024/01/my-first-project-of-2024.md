---
categories: []
date: 2024-01-08 12:38:39
layout: layouts/post
permalink: projects/2024/my-first-project-of-2024/
tags:
- post
title: My First Project of 2024
---

It's only been just a week, and I've already "completed" my first project of the
year. Well, it's not really completed, but it's functional and it already
completely addresses a personal need.

The project is a simple plugin for Neovim that helps me generate the initial
frontmatter I need for my blog posts. It's called [blogutils.nvim][bu], so you
can imagine it may grow in the future. But right now, it has three pieces of
functionality:

- formatTitle - Format specified input as AP Title Case via Text Case CLI.
- formatSlug - Format specified input as a slug via Text Case CLI.
- generateFrontMatter - Uses the first line of the current buffer as an input,
  then generates a title, slug, gets the current date, and adds the relevant
  frontmatter to the top of the file.

Here's a short video showing me generating the frontmatter from an example
title:

<video autoplay="true" loop="true"
src="https://cdn.chrishannah.me/videos/2024/01/blogutils-nvim-frontmatter.mp4" >

I may improve it in the future, but right now that's all I need it for. And with
how smoothly the development went, I'm really interested in the idea of making
more plugins in the future.

Additionally, the act of learning how to write a Neovim plugin has made me much
more comfortable using Neovim generally. It's weird to think that just months
ago I could barely even use vim motions.

---

I've also created a new page for my [2024 projects][p], which now has just a
single entry. I plan on using this page to document the projects I work on (big
and small) throughout the year, grouped by week. You can also find in the menu
bar the top, titled "2024".

I wanted to group by week because I wanted to visualise my work over the year in
more granularity. I just hope I build enough things to make it an interesting
list.

[bu]: https://github.com/chrishannah/blogutils.nvim
[p]: https://chrishannah.me/projects/2024
