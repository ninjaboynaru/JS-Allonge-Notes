



### Memorize
Caution with using named recursive functions as arguments. 

The recursive function, *wich calls itself* will end up calling an unemorized version of itself,
resulting in not using the memorization feature to its fullest potential.


### GetWith
Works pretty nicely with *MapWith* *(Also works well with *mabey(fn)* to prevent undefined results)*
```
const getOrange = GetWith('oranges');   //fn that gets 'oranges' property from object

const getInventoryOranges = MapWith(getOrange);

/*
 const getInventoryOranges = MapWith(Mabey(getOrange) );
 Also works really nicely to prevent undefined properties.
*/

var inventories = [
 {apples:1, grapes:55, oranges:2},
 {apples:12, grapes:42, oranges:15},
 {apples:5, grapes:8, oranges:12},
]

var orangesInInventories = getInventoryOranges(inventories);

/*
* Given an array of objects that contain the property 'oranges',  
* getInventoryOranges, will return an array of the 'oranges' property of each element  
* in the array
*/
```






