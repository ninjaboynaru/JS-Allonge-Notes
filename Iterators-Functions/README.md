



### Why?
The purpose of methods like these is to separate the core operations of sets
of data into separate, generic and flexible units.

---

### Folding
Condensing a set of data down to 1 value.  

This is done by applying a method to each element in an array, but one of the arguments
of that method is the result of applying that method to the previous value.

#### Folding Example
To get the sum of all values in an array we could write a ArraySum method
that would iterate through an array and add the values as it goes.

- This combines the task of iterating through the array and adding values into 1
- With folding we can separate that.  

- The [FoldArray](iterators-functions.js) method would handle iterating through the list
- The *fn* argument we pass to it would handle summing the values
```
IteratorFolds.FoldArray( function(a,b){return a+b}, 0, array );
```

---

### Iterators
Functions that allow traversing of a set of data at your own pace.
Sort of like generators.  

When called, the iterator will return the next value in the array.
Actually they usually return an object such as **{done:boolean, value:'some array value'}**

---

### Unfolding
Expanding a seed value into an object or more values.
Very much like generators.

#### Unfolding Example
The [NumberIterator](iterators-functions.js) wich takes a seed/start value and returns numbers in ascending order
from there.  

Or the [FibonacciIterator](iterators-functions.js) wich returns numbers in the Fibonacci sequence.  

Or a function that, given a seed/start, returns an array with every number before it.

---

### Filter
Continues getting values from an iterator untill one matches the filter.  
Then returns that value.

When called again, it repeats the above process.  
**(Carfull with infinite iterators where the filter never finds a match and the iterator never ends)**  

**(Filter that looks for letter the *a*, applied to NumberIterator that generates numbers forever = BAD TIME)**

---

## Other Core Methods
- MapWith iterator *(Applies a function to values from an iterator)*
- ToArray iterator *(Pushes all the values from an iterator to an array)* **(Watch for iterators that never finish)**
- Limit iterator *(Limits the amount of times an iterator can be called)*
- Filter iterator **(Not implemented)**


## Intersting Uses
Getting twenty odd numbers, squared in an array. 

This can be done with a function specifically made for this, or with a combination of the above functions.  

See [iterators-functions.js near the bottom](iterators-functions.js)












