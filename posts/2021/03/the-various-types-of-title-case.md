---
categories:
- Writing
- Text Case
date: 2021-03-03 21:54:12+00:00
description: ''
layout: layouts/post
permalink: the-various-types-of-title-case/
tags:
- Writing
- Text Case
- post
title: The Various Types of Title Case
---

As you may or not know, I'm the developer of [Text Case](https://textcase.app), a text-transformation utility app for iOS and macOS. The app now supports tons of various pre-defined transformations and allows the creation of custom transformations, however, the app was originally based around one format, title case.

As the name suggests, title case refers to the capitalisation of text that is to be used as a title. But it's not something that has an objective set of rules. Instead, it's more of a rule that's based around personal style choices.

The most popular title case standards I've heard of are AP (Associated Press), APA (American Psychological Association), and CMOS (Chicago Manual of Style), but there are countless more. 

And including the next planned release for Text Case, it will support a total of 9 different title case variations. Some are quite similar, however, as people like to stick to certain standards, I think it's important that there's a lot of options in the app. And since I've had a few questions in theist asking what the difference is, I thought I'd write a post to explain the implemented rules.

Please note, the implemented formats aren't carbon copies of the official standards, as some of the rules aren't exactly feasible to build into an automated tool. For example, a few standards have the rule to keep the second part of a Latin species name lowercase, and AMA seems to have a few rules based around greek letters.

But from the perspective of Text Case, here is how each of them is implemented:

## American Medical Association (AMA)

- Capitalise first and last word.
- Capitalise major words.
- Do not capitalise coordinating conjunctions (and, but, for, nor, or, so, yet).
- Do not capitalise articles (a, an, the)
- Do not capitalise prepositions of three or fewer letters.

## Associated Press (AP)

- Capitalise first and last word.
- Capitalise major words.
- Capitalise all words of four letters or more.
- Do not capitalise articles, conjunctions, or prepositions of three or fewer letters.

## American Psychological Association (AP)

- Capitalise first and last word.
- Capitalise the first word after a colon.
- Capitalise nouns, verbs, adjectives, adverbs, and pronouns.
- Capitalise all words of four letters or more.
- Do not capitalise articles, conjunctions, or prepositions of three or fewer letters.
- Capitalise the second part of hyphenated major words.

## Bluebook

- Capitalise first and last word.
- Capitalise the first word after a colon.
- Capitalise all words except articles, conjunctions, or prepositions of four letters or fewer.

## Chicago Manual of Style (CMOS)

- Capitalise first and last word.
- Capitalise nouns, pronouns, verbs, adjectives, and adverbs.
- Capitalise all conjunctions except coordinating conjunctions.
- Do not capitalise articles of prepositions.
- Do not capitalise "as" in any grammatical function.

## Guardian

- Capitalise all words except for "a", "an", "and", "at", "for", "from", "in", "of", "on", "the", "to”.
- Capitalise the first word after a colon.

## Modern Language Association (MLA)

- Capitalise first and last word.
- Capitalise nouns, pronouns, verbs, adjectives, adverbs, and subordinating conjunctions.
- Do not capitalise articles, prepositions, and coordinating conjunctions.
- Capitalise the first word after a colon.

## New York Times

- Capitalise nouns, pronouns, and verbs.
- Capitalise all words of four or more letters.
- Capitalise "no", "nor", "not", "off", "out", "so", and "up".
- Do not capitalise "a", "and", "as", "at", "but", "by", "en", "for", "if", "in", "of", "on", "or", "the", "to", "v.", "vs.", and "via".

## Wikipedia

- Capitalise first and last word.
- Capitalise verbs, nouns, pronouns, adjectives, adverbs, and subordinating conjunctions.
- capitalise prepositions of five letters or more.
- Do not capitalise articles, prepositions of four letters or fewer, and coordinating conjunctions.

<hr />

Hopefully this has answered some questions that people have regarding the different title case variants. But if you have any more, then I'd be very willing to hear them. And if you spot something that isn't right, then please let me know!