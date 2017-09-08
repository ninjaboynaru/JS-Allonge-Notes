

var objectRecipes = require('./recipes_data-objects');
var factorial = require('../factorialMethods.js');
var log = console.log;


var fastFactorial = objectRecipes.Memorize(factorial.FactorialLoop);


var deepArray = [ 1, 2, 3, [4, 5, [6,7,8] ] ];

function Double (num){ return num * 2 }

const deepDouble = objectRecipes.DeepMapWith(Double);

var deepMapResults = deepDouble(deepArray);

log(deepArray.map(Double) );
log(deepMapResults);