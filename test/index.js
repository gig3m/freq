var test = require('tape');
var freq = require('../index');

var mockSentence = 'Lorem ipsum dolor sit amet Lorem ipsum';
var mockResult = [
{word: 'lorem', count: 2},
{word: 'ipsum', count: 2},
{word: 'dolor', count: 1},
{word: 'sit', count: 1},
{word: 'amet', count: 1}
];
var mockResultArray = [
{word: 'lorem', count: 4},
{word: 'ipsum', count: 4},
{word: 'dolor', count: 2},
{word: 'sit', count: 2},
{word: 'amet', count: 2}
];

test('freq results for single string', function (t) {
	t.deepEquals(freq(mockSentence), mockResult);
	t.end();
});
test('freq results for array', function (t) {
	t.deepEquals(freq([mockSentence,mockSentence]), mockResultArray);
	t.end();
});
test('freq results empty results for empty string', function (t) {
	t.deepEquals(freq(''), []);
	t.end();
});
test('freq results empty results for non-word string', function (t) {
	t.deepEquals(freq('0192?1203-""""384'), []);
	t.end();
});
test('freq filters punctuation', function (t) {
	t.deepEquals(freq(mockSentence.replace(' ', '.,? ! ;:( )“” "\'-')), mockResult);	
	t.end();
});
test('freq filters numbers', function (t) {
	t.deepEquals(freq(mockSentence.replace(' ', '0 1234 567 89')), mockResult);	
	t.end();
});

