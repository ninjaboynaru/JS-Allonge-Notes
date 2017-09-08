



var GeneratorIterators = {};



/**
* Returns an iterable object that iterates with a function applied to the results.
*
* @param {object} iterable - An iterable object to have its iteration maped with a function
@ @param {function} fn
* @function
*/
GeneratorIterators.MapWith_ArchaicV1 = function(iterable, fn)
{
    var mapedIterable = {};

    mapedIterable[Symbol.iterator] = function *()
    {
        var originalIterator = iterable[Symbol.iterator]();
        var currentIteration = originalIterator.next();

        while(currentIteration.done == false)
        {
            yield fn(currentIteration.value);
            currentIteration = originalIterator.next();
        }
    }


    return mapedIterable;
}

/**
* Returns an iterable object that iterates with a function applied to the results.
*
* @param {object} iterable - An iterable object to have its iteration maped with a function
@ @param {function} fn
* @function
*/
GeneratorIterators.MapWith_ArchaicV2 = function(iterable, fn)
{
    var mapedIterable = {};

    mapedIterable[Symbol.iterator] = function *()
    {
        for(let element of iterable)
        {
            yield fn(element);
        }
    }


    return mapedIterablel
}

/**
* Generator that yields each element of an iterable with a function applied to the result
*
* @param {object} iterable - An iterable object to have its iteration maped with a function
@ @param {function} fn
* @function
*/
GeneratorIterators.MapWith = function *(iterable, fn)
{
    for(let element of iterable)
    {
        yield fn(element);
    }
}


/**
* Generator that yields each elemen of an iterable if that element passes a filter function.
*
* @param {object} iterable - An iterable object to have its iteration filtered
@ @param {function} fn - Function that returns true if its argument passes its filter
* @function
*/
GeneratorIterators.FilterWith = function *(iterable, fn)
{
    for(let element of iterable)
    {
        if(fn(element)== true )
        {
            yield element;
        }
    }
}

GeneratorIterators.IsIterable = function(iterable)
{
    return !!iterable[Symbol.iterator];
}

GeneratorIterators.Tree_Archaic = function *(tree)
{
    for(let element of tree)
    {
        if(GeneratorIterators.IsIterable(element) )
        {
            for(let innerElement of GeneratorIterators.Tree(element) )
            {
                yield innerElement;
            }
        }
        else
        {
            yield element;
        }
    }
}


GeneratorIterators.Tree = function *(tree)
{
    for(let element of tree)
    {
        if(GeneratorIterators.IsIterable(element) )
        {
            yield * GeneratorIterators.Tree(element);
            // "yield *" yields all the elements of an iterable
        }
        else
        {
            yield element;
        }
    }
}


GeneratorIterators.Fibonacci = function *()
{
    var prevA = 0;
    var prevB = 1;
    var current = prevA + prevB;
    
    while(true)
    {
        current = prevA + prevB;
        prevA = prevB;
        prevB = current;
        
        yield current;   
    }
}


GeneratorIterators.LogIterable = function(iterable)
{
    for(let result of iterable)
    {
        console.log(result);
    }
}


GeneratorIterators.LimitedIterable = function *(iterable, limit)
{
    var iterations = 0;
    
    for(let element of iterable)
    {
        if(iterations >= limit)
        {
            break;
        }
        
        yield element;
        iterations += 1;
    }
}




/*
* --- USE ---
* Log first 100 numbers in fibonacci sequence
*/
/*
;(function(){
    GeneratorIterators.LogIterable(GeneratorIterators.LimitedIterable(GeneratorIterators.Fibonacci(), 100) );
});
*/


/*
* --- USE ---
* Log all elements in data tree
*/
/*
;(function(){

    let data = [1, 2, [3,4,5], [6, [7, [8, 9, 10]]] ];
    let dataTree = GeneratorIterators.Tree_Archaic(data);
    GeneratorIterators.LogIterable(dataTree);
});
*/















if (typeof module != 'undefined'){ module.exports = GeneratorIterators }