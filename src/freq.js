'use strict'

var _ = require('lodash');
var async = require('async');
var Chance = require('chance');
var chance = new Chance();
var redis = require("redis");
var client = redis.createClient();
var multi = client.multi();

// build a nice 10 digit hash
var hash = chance.hash({length: 10});

// hard coded to know what I wanted to know, take input later
var source = require('../input/sscoc-export.json');
// var source = require('../input/single.json');

console.log('Total articles to process:', source.data.length);
console.log('Beginning string operations...');

async.each(source.data, function(data, callback) {

	var total;
	var i = 0;
	var string = data.body.toString();
	var words = string
		.replace(/[.,?!;:()“”"'\-0123456789]/g, " ")
		.replace(/[\u2026]/g, " ") //ellipsis
		.replace(/\s+/g, " ")
		.toLowerCase()
		.split(" ");

	total = words.length;
	_(words).forEach(function (w) {
		i++;
		multi.hsetnx(hash, w, 0);
		multi.hincrby(hash, w, 1);
		if (i === total) { callback(); } // all words processed
	});

}, function(err){
	if( err ) {
	  console.log('A file failed to process, exiting.');
	  process.exit();
	} else {
		console.log('String operations complete.');		
		console.log('Processing Redis queue...');
		multi.exec(function (err, replies) {
			client.quit();
			console.log(replies.length + ' queries handled.')
			console.log('All input has been processed successfully.');
			console.log('Stored in hash:', hash)
	  		process.exit();
		});
	}
});
