---
title: DurationBox Options
layout: apicat
sect: mode
mode: durationbox
---

# Option List - DurationBox mode

<ul data-role="listview" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
		{% for mod in docu.modes %}
			{% if mod == page.mode %}
			<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
			{% endif %}
		{% endfor %}
	{% endif %}
	{% endfor %}
</ul>
