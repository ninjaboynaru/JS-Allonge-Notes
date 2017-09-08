

 


# Iterables
For an object to be **iterable**, it must have a method that returns an iteator.  

**Iterable**: An object that can be iterated over.  
**Iterator**: An object that implements a **next()** method that gets the next value in the iteration. 

---

### Old Way
The simple and old way of doing this is by giving the object a method such as *iterator*.  

This method will not allow the object to be used in *for of** loops or to be used with the *...* spread operator.
```
var dataObject = {};
dataObject.data = ['a', 'b', 'c', 'd'];

dataObject.iterator = function() {
 var iteratorIndex = 0;
 var iteratorObject = {}
 
 iteratorObject.next = function() {
  if(iteratorIndex >= this.data.length){ return {done:true} }
  return {done:false, value:this.data[iteratorIndex++]}
 }
 
 return iteratorObject;
}
```

### New Standard Way
The new standard way is name the method that returns the iterator **Symbol.iterator**.  

**Symbol.iterator**: Evaluates to a symbol that represents the name the object should use if it wants to return an iterator/be iterable.
> It's garunteed to be unique so as not to conflict with old libraries that implemented their own iterators.  

```
var dataObject = {};
dataObject.data = ['a', 'b', 'c', 'd'];

dataObject[Symbol.iterator] = function() {
 var iteratorIndex = 0;
 var iteratorObject = {}
 
 iteratorObject.next = function() {
  if(iteratorIndex >= this.data.length){ return {done:true} }
  return {done:false, value:this.data[iteratorIndex++]}
 }
 
 return iteratorObject;
}

for(var dataElement of dataObject){console.log(dataElement)}
```

---

### Spreading
Iterable objects can be spread and gathered into arrays and arguments using the *...* spread operator just like regular arrays.  


### Infinite
Iterators that never return ``` {done:true} ``` are infinite.
- Using them in **for of** loops will result in an infinite loop
- Using them with the *...* spread operator will result in an infinite loop
- ``` {done:true value:'some value'} ``` is valid and will **not** result in an infinite loop.

### Spreading Large Iterables
Spreading results in JS creating an array out of the elements of the iterable.  

For very large collections, this may be wastefull depending on the operation.  

If trying to get a single element from the iterator,  
it may be better to iterate over it than to create an array and then find the value.





