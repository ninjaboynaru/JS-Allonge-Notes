
/*
* A collection of various function descriptors/higher order functions.
*
* Not fully tested, but this is for learning purposes.
*
* I'm writing these out as I go through the book 'Javascript Allonge 6th Edition'
* Amazing book, opened my eyes to a whole new world of JavaScript and code in general.
*
* Combining multiple higher order functions can result in some pretty complex and powerful
* behavior but can also result in hard to read code.
*
* DEFINITION:
* A higher-order function is a function that takes only functions as arguments and returns
* only functions.
*/
var recipes = {};


/**
* Returns a function to only take 1 argument.
*
* Given an a function, it returns an output function that will call the
* input function with 1 and only 1 argument.
*
* @function
*/
recipes.Unary = function(fn, context)
{
	// fn expects only 1 argument
	if(fn.length == 1){ return fn }
	
	// fn expects more or less than 1 argument
	return function(argument)
	{
		if(context)
		{
			return fn.call(context, argument);
		}
		else
		{
			return fn.call(this, argument);
		}
	}
}


/**
* Returns function that returns a value, and executes another function on that value for side effects.
* 
* Given a value, it returns an output function that returns that value.
* But if you pass a function as an argument to the output function, it will execute the output function on the value
* and return the value.
*
* @function
*/
recipes.Tap = function(value)
{
	return function(fn)
	{
		// if a function was passed, invoke it for side effects
		if(typeof fn == 'function')
		{
			fn(value);
		}
		return value;
	}
}


/**
* Returns a function that does nothing if the input is undefined or null.
*
* Given an input function, an output function is returned that accepts arguments.
* If any of those arguments are null, nothing is done, but if the arguments are valid/not null,
* the original input function is executed with those arguments.
*
* @function
*/
recipes.Mabey = function(fn, context)
{
	return function()
	{
		// no arguments were passed. return
		if(arguments.length == 0){ return }
		else
		{
			// check that all arguments passed are not null/undefined
			for(let arg of arguments)
			{
				if(args == null){ return } // (null == undefined) is true
			}
			
			// assign a context if there is none
			if(context == undefined){ context = this }
			
			// call the function
			return fn.apply(context, arguments);
		}
	}
}



/*
* Returns a function that may only be called once
*
* Given an input function, an output function is returned that may only be called once.
* Any subsequent calls will return undefined.
*
* @function
*/
recipes.Once = function(fn, context)
{
	var called = false;
	return function()
	{
		if(called == true){ return undefined }
		if(context == undefined){ context = this }
		
		called = true;
		return fn.apply(context, arguments);
		
		
	}
}


/**
*
* Returns a function that is a composition of calling many functions in succession.
*
* Given a set of input functions, returns an output function that takes an argument, and calls each input function with the result of
* the previous input function.
*
* EXAMPLE: Compose(sin, cos) = sin(cos(argument))
* EXAMPLE: Compose(Add, Log, Multiply) = Add(Log(Multiply(argument)))
*
* NOTE: Each function passed in should return a value. *Log* in the above example should return a value
*
* @function
*/
recipes.Compose = function Compose(firstFn, ...otherFn)
{
	if(otherFn.length == 0)
	{
		return firstFn;
	}
	return function(arg)
	{
		return firstFn(Compose(...otherFn)(arg));
	}
}









if(typeof module != 'undefined'){ module.exports = recipes }


