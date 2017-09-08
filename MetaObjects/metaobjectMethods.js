

var MetaObjectMethods = {};

MetaObjectMethods.Mix = Object.assign; // Mixin function


/**
* Assigns to an object, methods that forward their calls to another meta object.
*
* @function
* @ param {string} methods - Names of the methods to forward from/to the metaObject
*/
MetaObjectMethods.Forward = function(receiver, metaObject, ...methods)
{
    methods.forEach(function(methodName){
        function ProxyMethod(...args)
        {
            return metaObject[methodName](args);
        }
        
        receiver[methodName] = ProxyMethod;
    });
    
    return receiver;
}

/**
* Assigns to an object, methods that call the same method name on another object,
* in the context of the receiver
* 
* @function
* @ param {string} methods - Names of the methods to forward from/to the metaObject
*/
MetaObjectMethods.Delegate = function(receiver, metaObject, ...methods)
{
    methods.forEach(function(methodName){
        function ProxyMethod(...args) {
            return metaObject[methodName].apply(receiver, args);
        }
        
        receiver[methodName] = ProxyMethod;
    });
    
    return receiver;
}

/**
* Assigns to an object, methods that call the same method name on another object,
* in the context of the receiver. The other object is a property of the receiver.
* 
* @function
* @ param {string} methods - Names of the methods to forward from the metaObject
* @ param {string} ownObjectName - Name of the property on the receiver to forward method calls to
*/
MetaObjectMethods.DelegateToOwn  = function(receiver, ownMetaObjectName, ...methods)
{
    methods.forEach(function(methodName){
        function ProxyMethod(...args) {
            return receiver[ownMetaObjectName][methodName].apply(receiver, args);
        }

        receiver[methodName] = ProxyMethod;
    });
    
    return receiver;
}


if (typeof module != 'undefined'){ module.exports = MetaObjectMethods }



