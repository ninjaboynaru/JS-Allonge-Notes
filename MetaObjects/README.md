



## Meta Objects
Meta Object is an object that creates, describes or manipulates another object.

- Mixins
- Forwarding
- Deligation



## Fowarding
Assigning methods to an object that forward their calls to another object *(the meta object)*.  
For example, assiging to object *A* the method *Restart*, but calling *Restart* on object *A*, just ends up calling *Restart*
on object *B*
```
A {
 Restart: function(...args){ return B.Restart(args) }
}
```


With mixins, the receiver object holds the state,
while with *Forwarding*, the metaobject/source holds the state.

## Deligation
Is like forwarding but the method is called in context of the receiver, this the receiver holds the state.
```
A {
 Restart: function(...args){ return B.Restart.apply(this, args) }
}
```

## Deligation To Own
Is like Deligation and Forwarding, but the meta object is contained within the receiver and called in the context of
the receiver.




## Early vs Late Binding
Mixins result in early binding, while Deligation and Forwarding result in late binding.  
What does this mean? 

---

In early binding *(mixin)*, the receiver is refering to the methods on the mixin/metaObject by reference to the function signitures
themselves.
```
sourceObject.Clear = mixin.Clear;
```
> Changing **mixin.Clear** to something else will have no effect on **sourceObject.Clear**. **sourceObject.clear** still references the old
function sigingiture.  

---

In late binding, *(Deleigate and Forwarding)*, the reciever is refering to the methods on the metaObject through the metaObject. 
Thus if the method on the metaObject were to change its behavior, this would affect the receiver object.
```
receiverObject {
 Clear: function(...args){ return B.Clear.apply(this, args) }
}
```
> Changing **B.Clear** will affect **ReceiverObject.Clear**. **receiverObject.Clear** does not reference a specific function, but instead
references the value of a key on an object *i.e. the value/method stored at B.Clear, what ever it may be at the current moment*






## Prototypes
- Prototypes are late bound
- Prototype relationships can be established through *new function* invokation or through *Object.create()*
- With deligation 1 object can deligate out behavior to multiple others
- With prototypes, an object can have only 1 prototype.











