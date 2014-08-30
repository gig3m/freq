freq [![Build Status: Master][travis-badge]][travis-badge-url]
====

> Tally word frequency from a string or an array of strings.

[![NPM][npm-badge]][npm-badge-url]

## Install

```bash
npm install freq --save
```

## Use

```js
var freq = require('freq');

freq('My, my, my music hits me so hard Makes me say Oh my Lord');
//	[ 
//		{ word: 'my', count: 4 },
//		{ word: 'me', count: 2 },
//		{ word: 'music', count: 1 },
//		{ word: 'hits', count: 1 },
//		{ word: 'so', count: 1 },
//		{ word: 'hard', count: 1 },
//		{ word: 'makes', count: 1 },
//		{ word: 'say', count: 1 },
//		{ word: 'oh', count: 1 },
//		{ word: 'lord', count: 1 } 
//	]
```
Freq tries to remove any non-letter character from your string, normalizes them to lowercase, then counts them.

Freq can also take an array of strings (it's original purpose) and will tally across all given strings.

```js

freq(['Kris Kross will make you', 'Jump', 'Jump']);
//	[
//		{ word: 'jump', count: 2 },
//		{ word: 'kris', count: 1 },
//		{ word: 'kross', count: 1 },
//		{ word: 'will', count: 1 },
//		{ word: 'make', count: 1 },
//		{ word: 'you', count: 1 }
//	]
```

[travis-badge-url]: https://travis-ci.org/gig3m/freq
[travis-badge]: https://travis-ci.org/gig3m/freq.svg?branch=master
[npm-badge]: https://nodei.co/npm/freq.png
[npm-badge-url]: https://nodei.co/npm/freq