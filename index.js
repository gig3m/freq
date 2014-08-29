'use strict'

var _ = require('lodash');
var async = require('async');

module.exports = function(input) {
	var strings = [];
	var dictionary = [];
	Array.isArray(input) ? strings = input : strings.push(input.toString());
	async.each(strings, function(string, callback) {
		var total;
		var i = 0;
		string = string.toString();
		var words = string
			.replace(/[.,?!;:()“”"'\-0123456789]/g, " ")
			.replace(/[\u2026]/g, " ") //ellipsis
			.replace(/\s+/g, " ")
			.toLowerCase()
			.split(" ");

		total = words.length;
		_(words).forEach(function (w) {
			i++;
			// console.log(w, _.contains(dictionary, { 'word': w }), dictionary);
			if (_.find(dictionary, { 'word': w }) != undefined) {
				var entry = _.find(dictionary, { 'word': w });
				entry.count = entry.count+1;
			}else{
				dictionary.push({ 'word': w, 'count': 1 });
			}

			if (i === total) { callback(); } // all words processed
		});

	}, function(err){
		if( err ) {
		  console.log('An error occured, exiting.');
		  process.exit();
		} else {
			//process order of dictionary
			dictionary = _.sortBy(dictionary, function(e) {
				return e.count*-1;
			});
		}
	});
	return dictionary;
}
