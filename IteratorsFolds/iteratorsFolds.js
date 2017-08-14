
/*
    The purpose of these methods is to separate the core operations of sets
    of data into separate and generic units.
    
    FOLDING: Condensing a set of data down to 1 value
*/



var IteratorsFolds = {};


/**
* Successively apply a function to each value in an array.
* Only works on 1 dimensional arrays.
* @function
* @param terminalValue - Default start value 
*/
IteratorsFolds.FoldArray = function(fn, terminalValue, data)
{
    var [first, ...rest] = data;
    if(first == undefined)
    {
        return terminalValue;
    }
    else return fn(first, IteratorsFolds.FoldArray(fn, terminalValue, rest) );
    
    /*
        VISUALIZATION
        FN: (a,b)=>+b
        DATA: [1,2,3]
        TERMINAL VALUE: 0
        fn(1, fn(2, fn(3, 0) )))
    */
}


/**
* Returns a function that when called, returns the next element in an array.
* Actually returns an object containing keys done:bool and value:
* 
* @function
*/
IteratorsFolds.ArrayIterator = function(data)
{
    var index = 0;
    return function()
    {
        var state = {done:false, value:undefined};
        if(index >= data.length)
        {
            state.done = true;
            state.value = data[data.length-1];
        }
        else
        {
            state.value = data[index];
            index+=1;
        }
        
        return state;
    }
}


/**
* Return an iterator that returns numbers in order when called.
* @function
*/
IteratorsFolds.NumberIterator = function(start=0)
{
    var number = start;
    return function()
    {
        return {done:false, value:number++}
    }
}

/**
* Returns an iterator that when called, returns the next number in the Fibonacci sequence.
* @function
*/
IteratorsFolds.FibonacciIterator = function()
{
    /*
    * FIBONACCI SEQUENCE:
    * Sequencnce where each number (after the first two) is the sum of
    * the 2 preceding numbers
    */
    
    var previous = 0;
    var current = 1;
    
    return function()
    {
        var state = {done:false, value:current};
        var tempPrevious = previous;
        
        previous = current;
        current = current+tempPrevious;
        
        return state;
    } 
}


/**
* Return a modified iterator that can only be called a set
* number of times.
*
* @functions
* @param limit - The iterator will not be called more than this
*/
IteratorsFolds.LimitIterator = function(iterator, limit)
{
    var count = 0;
    var lastValue;
    
    return function()
    {
        if(count <= limit)
        {
            count += 1;
            var currentIteration = iterator();
            lastValue = currentIteration.value;
            
            return currentIteration;
        }
        else
        {
            return {done:true, value:lastValue}
        }
    }
}

/**
* Place all the values from an iterator into an array.
* Expects the iterator to return an object with a done key and a value key
* @function
*/
IteratorsFolds.ToArray = function(iterator)
{
    var data = [];
    
    var currentIteration = iterator();

    while(currentIteration.done == false)
    {
        data.push(currentIteration.value);
        currentIteration = iterator();
    }
    
    return data;
}


/**
* Return a modified iterator with a function applied to each value.
*
* @function
*/
IteratorsFolds.MapWith = function(iterator, fn)
{
    return function()
    {
        var state = iterator();
        state.value = fn(state.value);
        
        return state;
    }
}

/**
* Returns modifed iterator that only returns values that match a filter function.
* CAUTION Infinite loop with infanite iterators and filters that never match 
*
* @function
* @param fn - Function that returns true if the value matches, and false if not
*/
IteratorsFolds.Filter = function(iterator, fn)
{
    return function()
    {
        var currentState = iterator();
        
        while(currentState.done == false && fn(currentState.value) == false)
        {
            currentState = iterator();
        }
        return currentState;
    }
}



/*---- INTERESTING USES ----*/

/*
* GOAL: Get all odd numbers squared, up to a set number, in an array
* STEPS:
* - Get numbers
* - Filter only the odd ones
* - Square them
* - Limit the ammount of numbers
* - Return array
*/
;(function(){
    function IsOdd(num)
    {
        if(num%2 == 1){return true}
        return false 
    }
    var Square = (x)=>x*x;
    
    // Will return odd numbers when called
    var oddIterator = IteratorsFolds.Filter(IteratorsFolds.NumberIterator(), IsOdd);
    
    /*
    * Limit the amount of times 'oddIterator' can be called.
    * CAUTION: limitedOddIterator has a 'reference' to 'oddIterator', not a 'copy'.
    */
    var limitedOddIterator = IteratorsFolds.LimitIterator(oddIterator, 20);
    var data = IteratorsFolds.ToArray(IteratorsFolds.MapWith(limitedOddIterator, Square) );
    
    console.log('20 odd numbers squared');
    console.log(data);
    console.log('');
    
})();











if (typeof module != 'undefined'){ module.exports = IteratorsFolds }


