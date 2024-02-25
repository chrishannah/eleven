---
categories:
- App
- COVID-19
- NHS
date: 2020-05-05 11:23:00+00:00
description: ''
layout: layouts/post
permalink: the-nhs-covid-19-app/
tags:
- App
- COVID-19
- NHS
- post
title: The NHS COVID-19 App
---

<p>The NHS has come up with its own contact-tracing app, “<a href="https://www.ncsc.gov.uk/information/nhs-covid-19-app-explainer">NHS COVID-19</a>”, and there are already plans for it to be <a href="https://www.bbc.co.uk/news/uk-52540068">trialled with key workers on the Isle of Wight</a>.</p>
<p>However, it’s doesn’t use the more privacy focussed solution that Apple and Google have come up with, but rather a centralised one. Where the data about the tracked interactions will be sent. Although it doesn’t seem exactly clear what that data is. It could simply be a list of unique IDs that the device has come into contact with, along with your own ID. Or it could also include other sensitive information. Who knows? All I know is that, that question will always exist while it uses a custom solution.</p>
<p>Privacy is not only the potential issue with the app though. My concern mainly is with its effectiveness. This is <a href="https://www.ncsc.gov.uk/information/nhs-covid-19-app-explainer">how they claim it works</a>:</p>
<blockquote>
<ul>
<li>Once you’ve installed the app on your phone, it can detect (using Bluetooth) if other phones that are also running the app are nearby.</li>
<li>Importantly, the app knows how close it has been to other phones running the app, and for how long. This allows the app to build up an idea of which of these phones owners are most at risk.</li>
<li>If you then use the app to report that you’re experiencing coronavirus symptoms, all the phones that have been nearby will receive an alert from the app.</li>
<li>Users reading the alert will now know they may have been near a person with coronavirus, and can then self-isolate.</li>
<li>If the NHS later discovers that your diagnosis was wrong (and your reported symptoms are not coronavirus), the other users will receive another alert, letting them know if they can stop self-isolating.</li>
</ul>
</blockquote>
<p>My questions would be the following:</p>
<ul>
<li>How often can it run? If it’s just an app with no special entitlements, then surely it is bound my the background restrictions like most other apps.</li>
<li>If it’s monitoring it relatively often, then surely even Bluetooth Low Energy will have an impact on the battery level?</li>
<li>What happens if a device is put into low power mode? Is all tracing stopped? Because surely background tasks aren’t run as often then.</li>
<li>Can you really trust it to trace every contact you’ve had? For example if you sit next to someone with COVID-19 for 10 minutes, but for some reason the background task to monitor Bluetooth doesn’t run, then does it really do it’s job?</li>
</ul>
<p>And I’d just like to point out the PDF that NHS made to <a href="https://www.ncsc.gov.uk/files/NHS%20COVID-19%20comparison%20infographic.pdf">explain the differences between a decentralised and centralised model</a>. The only difference I see, is that their centralised model also includes an “NHS clinical algorithm” to detect the risk posed from each of your interactions.</p>
<p>I for one, will not be using any contact-tracing app, that doesn’t follow the solution that Apple and Google have come up with. Because, apart from wanting to control the data yourself, and possibly even retrieve more data than necessary, there’s no real gain to use a centralised approach.</p>