

const log = console.log;

var ObjectIterators = {};

/**
* Infinite iterable object that returns ordered sequence of numbers
*/
ObjectIterators.NumberIterable = {
    [Symbol.iterator]: function() {
        var num = 0;
        return {
            next: function()
            {
                return {done:false, value:num++}
            }
        }
    }
}



/**
* Infinite iterable object that returns random numbers
*/
ObjectIterators.RandomNumberIterable = {
    [Symbol.iterator]: function() {
        return {
            next: function() 
            {
                return {done:false, value:Math.random()}
            }
        }
    }
}


/**
* Returns an iterable object that iterates with a function applied to the results.
*
* @param {object} iterable - An iterable object to have its iteration maped with a function
@ @param {function} fn
* @function
*/
ObjectIterators.MapWith = function(iterable, fn)
{
    var mapedIterable = {};

    mapedIterable[Symbol.iterator] = function()
    {
        var originalIterator = iterable[Symbol.iterator]();

        return {
            next:function()
            {
                let {done, value} = originalIterator.next();
                return {done, value:fn(value)};
            }
        }
    }

    return mapedIterable;
}


/**
* Returns an iterable object that iterates with filtered results
*
* @param {object} iterable - An iterable object to have its iteration filtered
@ @param {function} fn - Function that returns true if its argument passes its filter
* @function
*/
ObjectIterators.FilterWith = function (iterable, fn)
{
    var filteredIterable = {};

    filteredIterable[Symbol.iterator] = function()
    {
        var originalIterator = iterable[Symbol.iterator]();

        return {
            next: function()
            {
                var currentIteration = originalIterator.next();
                while(true)
                {
                    if(currentIteration.done == true || fn(currentIteration.value) == true)
                    {
                        return currentIteration;
                    }
                    else{ currentIteration = originalIterator.next() }
                }
            }
        }
    }


    return filteredIterable;
}


/**
* Returns a rudimentary queue object that is iterable.
* Do not use with new keyword. Simply invoke.
*
* @function
*/
ObjectIterators.Queue = function()
{
    var data = [];

    var queObject = {};

    queObject.Enqueue = function(element)
    {
        data.push(element);
        return element;
    }

    queObject.Dequeue = function()
    {
        if(data.length == 0){ return undefined }

        var dequeuedElement = data[0];
        var newData = new Array(data.length-1);

        for(let i = 1; i < data.length; i++)
        {
            newData[i-1] = data[i];
        }

        data = newData;
        return dequeuedElement;
    }

    queObject.toString = function()
    {
        var str = '[';
        for(let i = 0; i < data.length; i++)
        {
            str += data[i];
            if(i != data.length-1)
            {
                str += ', ';
            }
        }
        str += ']';
        return str;
    }

    queObject[Symbol.iterator] = function()
    {
        var iterator = {}
        var currentIndex = 0;
        iterator.next = function()
        {
            if(currentIndex >= data.length)
            {
                return { done:true, value:data[data.length-1] }
            }
            else
            {
                return { done:false, value:data[currentIndex++] };
            }
        }

        return iterator;
    }

    return queObject;
}



/*
    POSSIBLE APPLICATION
    var que1 = ObjectIterators.Queue();
    var doubledQueIterator = ObjectIterators.MapWith(que1, (x)=>x*2);
    var evenFilteredQue = ObjectIterators.FilterWith(que1, (x)=>x%2==0 );

    que1.Enqueue(1);
    que1.Enqueue(2);
    que1.Enqueue(3);
    que1.Enqueue(4);
    que1.Enqueue(5);

    for(let e of doubledQueIterator)
    {
        log(e);
    }
    
    for(let e of evenFilteredQue)
    {
        log(e);
    }
*/





if (typeof module != 'undefined'){ module.exports = ObjectIterators }




