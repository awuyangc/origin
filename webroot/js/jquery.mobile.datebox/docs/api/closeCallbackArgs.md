---
title: closeCallbackArgs
short: Extra arguments to pass to close callback.
modes: [
	'datebox',
	'timebox',
	'calbox',
	'slidebox',
	'flipbox',
	'timeflipbox',
	'durationbox',
	'durationflipbox',
	'custombox',
	'customflip'
]
cats: [ 'callback' ]
relat: "callback"
layout: api
defval: "[]"
dattype: "Array"
dyn: "True"
---

Note that 'this' in your function is the widget.  argument[0] is the date object, this starts on argument[1]

For more information, please see: [Callbacks / Listeners]({{site.basesite}}doc/6-1-callback/).
