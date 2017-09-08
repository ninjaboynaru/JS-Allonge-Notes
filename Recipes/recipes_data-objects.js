
/*
* A collection of various function descriptors/higher order functions for objects and data.
*
* Not fully tested, but this is for learning purposes.
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
* Returns a function that maps an array.
* @param {function} fn - The function to map the array with
* @function
*/
recipes.MapWith = function(fn)
{
    return function(arr)
    {
        return arr.map(fn);
    }
}


/**
* Returns a function that deep maps an array.
* @param {function} fn - The function to map the array with
* @function
*/
recipes.DeepMapWith = function(fn)
{
    function InnerMap(arrayElement)
    {
        if(Array.isArray(arrayElement) )
        {
            return arrayElement.map(InnerMap);
        }
        else
        {
            return fn(arrayElement);
        }
    }
    
    return function(arr)
    {
        return arr.map(InnerMap);
    }
}


/**
* Returns new function that memorizes its results and arguments to prevent
* recalculating the same results again.
*
* @function
*/
recipes.Memorize = function(fn)
{
    var results = {}
    return function(...args)
    {
        var key = JSON.stringify(args);
        if(results[key])
        {
            return results[key];
        }
        else
        {
            results[key] = fn(args);
            return results[key];
        }
    }
}


/**
* Returns a function that extracts the value of an attribute from an object.
* @function
* @param {string} attribute
*/
recipes.GetWith = function(attribute)
{
    return function(obj)
    {
        return obj(attribute);
    }
}


/**
* Returns a function that extracts a property from an array of objects.
* @function
* @param {string} attribute
*/
recipes.PluckWith = function(attribute)
{
    return function(arr)
    {
        return recipes.MapWith(Recipes.GetWith(attribute) );
    }
}




if(typeof module != 'undefined'){ module.exports = recipes }


