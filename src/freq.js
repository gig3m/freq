'use strict'

var fs = require('fs');
var _ = require('lodash');
var low = require('lowdb')

var source = require('../input/sscoc-export.json');

var counts = [];
var total = source.data.length;
var i = 0;
// console.log(source);

_(source.data).forEach(function (data) {
	i++;
	try {

		var string = data.body.toString();
		countWords(string);
		

		// _(local).forEach(function (v,k) {
		// 	counts[v] = (counts[v]||0)+1;
		// 	console.log('Setting '+counts[v]+' equal to '+(counts[k]||0)+1);
		// })



		if (i === total) {
			finished();
		}

	} catch(err) {
		console.log(err);
	}
});

function countWords(string) {
	var words = string
					.replace(/[.,?!;()"'-]/g, " ")
					.replace(/\s+/g, " ")
					.toLowerCase()
					.split(" ");

	_(words).forEach(function (w) {
		if (w === 'the') {
		var present = low('words').where({ word: 'the' }).value()
		console.log(present);			
		}
		// var present = low('words').where({ word: w }).value()
		// console.log(present);
		// if (present) {
		// 	low('words').update(present.id, {word: w, n: (present.n)+1});
		// 	console.log(w, (present.n)+1);			
		// }else{
		// 	low('words').insert({word: w, n: 1});
		// 	console.log(w, 1);	
		// }
	})


    // words.forEach(function (word) {
    //     if (!(counts.hasOwnProperty(word))) {
    //         counts[word] = 0;
    //     }
    //     counts[word]++;
    // });
}

function finished() {
	console.log(counts);
	// _.first(counts, function (v, k) {
	// 	console.log(k, v);
	// });
}


