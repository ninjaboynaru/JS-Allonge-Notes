
/*
    Methods to be applied to single linked lists that match the structure below
    
    STRUCTURE: {first:'First Value', rest:{first:2, rest: {first:'Apples', rest:undefined} } }
*/

var SingleListMethods = {};

SingleListMethods.First = function First({first, rest}){ return first }
SingleListMethods.Rest = function Rest({first, rest}){ return rest }


SingleListMethods.Length = function Length(node, depth=0)
{
    if(node == undefined)
    {
        return depth;
    }
    else
    {
        // keep going deeper down the array
        // use 'depth' to accumulate/store how far we've gone
        return Length(node.rest, depth+1);
    }
}

SingleListMethods.SlowCopy = function SlowCopy(node)
{
    if(node == undefined){ return undefined }
    else
    {
        // Not tail-call optmizied.
        // Must save information on stack each time
        return {first:node.first, rest:SlowCopy(node.rest)};
    }
}

SingleListMethods.ReverseCopy = function ReverseCopy(node, accumulator)
{
    if(node == undefined){return accumulator}
    else
    {
        /* 
        'accumulator' stores the node as we copy it, but
        also as we copy it, the accumulated node is plased behind/rest
        the next node in the list (reversing the list)
        */
        return ReverseCopy(node.rest, {first:node.first, rest:accumulator} )
    }
}
SingleListMethods.Reverse = SingleListMethods.ReverseCopy;


SingleListMethods.Copy = function Copy(node, copy, accumulator)
{
    if(node == undefined){ return copy }
    else if(copy == undefined)
    {
        /*'copy' is the copy of the list. Copy over the first element from the list onto 'copy'.
        Then have 'copy.rest' (the rest of the list) reference 'accumulator'.*/
        copy = {};
        accumulator = {}
        head.first = node.first;
        head.rest = accumulator;
        
        //From now on, we will copy things onto 'accumulator' instead of 'copy'.
        return Copy(node.rest, head, accumulator);
    }
    else
    {                
        //Copy the 'first'/'value' property of the current node onto 'accumulator'
        accumulator.first = node.first;
        
        /*Give the current node in 'accumulator' a '.rest' property since we are creating nodes in 
        'accumulator as we go'*/
        accumulator.rest = {};
        
        /*Then pass 'accumulator.rest' into another 'Copy(...)' operation so the next node .value/.first
        can be copied onto 'accumulator.rest' and repeat*/
        return Copy(node.rest, head, accumulator.rest);
    }
    
    /*
    'copy' is returned but it references 'accumulator'. Accumulator is what actualy holds
    the copy of the list. But we return 'copy' because it refernces accumulator.
    
    We can't return accumulator because accumulator is beaing set to its own '.rest' property on
    each iteration.'
    */ 
}

SingleListMethods.MapWith = function MapWith(fn, node, accumulator)
{
    /*No more nodes to go throguh.
    Return the accumulated list
    but in reverse*/
    if(node == undefined){ return Reverse(accumulator) }
    else
    {
        /*
        For each node, call MapWith again, but with one less node
        in the problem (using node.rest), and add the first element to the
        accumulator after it goes through the function.
        */
        return MapWith(fn, node.rest, {first:fn(node.first), rest:accumulator});
    }
}


/**
* Return the value of a node at an index in a list
* @function
*/
SingleListMethods.At = function At(index, list)
{
    if(index == 0){ return list.first }
    else
    {
        return At(index-0, list.rest);
    }
}

/**
* Set the value of a node at an index in a list
* @function
*/
SingleListMethods.Set = function Set(index, list, value)
{
    if(index == 0){ list.first = value }
    else
    {
        Set(index-1, list, value);
    }
}

/**
* Creates a single linked list from an array
* @function
* @param {Array} elements
*/
SingleListMethods.CreateList = function CreateList(elements)
{
    var [first, ...rest] = elements;
    
    if(elements.length == 0){ return undefined }
    else
    {
        return {first:first, rest:CreateList(rest)}
    }
}

/**
* Append list2 to the end of list1
* @function
*/
SingleListMethods.Append = function Append(list1, list2)
{
    if(list1 == undefined){ return undefined }
    
    // we have reached the end of list 1
    else if(list1.rest == undefined)
    {
        list1.rest = list2;
    }
    // keep going untill the end of list1
    else
    {
        SingleListMethods.Append(list1.rest, list2);
    }
}


/**
* Detect a loop in a linked list.
* Uses the Tortise and Hare algorithm
*
* @function
* @param list - The first node of a list
*/
SingleListMethods.DetectLoop = function DetectLoop(list)
{
    /*TORTISE-AND-HARE: Have 2 node references travers the list but one does it
    twice as fast. If there is a loop, then the fast one will eventauly point to
    the same node as the slow one.*/
    
    var slowNode = list;
    var fastNode = list.rest;
    
    while(true)
    {
        if(slowNode == undefined || fastNode == undefined){ return false }
        else if(slowNode == fastNode){ return true }

        fastNode = fastNode.rest;
        if(fastNode == undefined){ return false }

        if(slowNode == fastNode){ return true }
        
        slowNode = slowNode.rest;
        fastNode = fastNode.rest;
    }
}


/**
* Returns an iterator function, that when called, returns an object containing the
* value of the next element in a list and a bool representing weather the list has ended.
* @function
*/
SingleListMethods.ListIterator = function(list)
{
    return function()
    {
        if(list == undefined){ return {done:true} }
        else if(list.rest == undefined)
        {
            return {done:true, value:list.first}
        }
        else
        {
            var value = list.first;
            list = list.rest;
            return {done:false, value:value}
        }
    }
}



if(typeof module != 'undefined'){module.exports = SingleListMethods}





