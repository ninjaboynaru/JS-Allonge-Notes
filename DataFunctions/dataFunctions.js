
/*
* STAND ALONE FILE
* Note meant to be imported
*/


/**
* Kestral/Constant combinator.
*
* Returns function that regardless of input, will return
* original argument (constant)
*
* @function
*/
function K(x)
{
    return function(y)
    {
        return x;
    }
}
/**
* Idiot bird/identit combinator.
* Given argument, will always return that same argument.
*
* @function
*/
function I(x)
{
    return x;
}

/**
* Vireo/Vector combinator
*
* (Stores the first 2 parameters x and y, through closure)
* @function
*/
var V = (x) => (y) => (z) => z(x)(y);



var First = K;
var Second = K(I);
var Pair = V;

(function(){
    var firstResult = First('Apple')('Bannana');    //Apple
    var secondResult = Second('Apple')('Bannana');  //Bannana

    // This is a rough example. The V combinator can be used to construct data such as this
    var functionAsData = function(selector)
    {
        return selector('Data Item 1')('Data Item 2');
    }
    
    var firstData = functionAsData(First);  //Data Item 1
    var secondData = functionAsData(Second); //Data Item 2
})();


// Creating data as functions
(function(){
    var data = V('Data Item 1')('Data Item 2');
    data(First); //Data Item 1
    data(Second); //Data Item 2
})();


// Using functions as lists
(function(){
    var EMPTY = ( ()=>{} );
    
    var list = Pair(1)(Pair(2)(Pair(3)(EMPTY) ));
    list(First) //1
    list(Second)(First) //2
    
    /*
    * Can also create methods such as MapWith and Length using this style
    */
})();














