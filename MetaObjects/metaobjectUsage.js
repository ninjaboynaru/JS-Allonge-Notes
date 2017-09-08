
var log = console.log;

var MetaObjectMethods = require('./metaobjectMethods.js');

var Person = {
    FirstName: function()
    {
        return this.firstName;
    },
    LastName: function()
    {
        return this.lastName;
    },
    FullName: function()
    {
        return this.firstName + ' ' + this.lastName;  
    },
    SetName: function(first, last)
    {
        this.firstName = first;
        this.lastName = last;
    }
}



// Using mixins results in early binding
var earlyBoundPerson = MetaObjectMethods.Mix({}, Person);

// Using deligation results in late binding
// Modification can be made to Deligate() method to avoid specifying all the methods as strings
var lateBoundPerson = MetaObjectMethods.Delegate({}, Person, 'FirstName', 'LastName', 'FullName', 'SetName');

earlyBoundPerson.SetName('James', 'Saddy');
lateBoundPerson.SetName('Robert', 'Fisher');

log('earlyBoundPerson name is ' + earlyBoundPerson.FullName() );
log('lateBoundPerson name is ' + lateBoundPerson.FullName() );
log('\nNow changing behavior of source Person object \n');

/*
 - These changes will not affect earlyBoundPerson.
 - earlyBoundPerson.FullName references the old function signiture.
 - lateBoundPerson.FullName references what ever is stored at Person.FullName
*/
Person.FullName = function()
{
    return this.firstName + ' ' + this.lastName[0] + '.';
}

log('earlyBoundPerson name is still ' + earlyBoundPerson.FullName() );
log('lateBoundPerson name is now ' + lateBoundPerson.FullName() );









/*
    EXAMPLE FROM BOOK
    Using Deligate to own to manage state

    var thisGame = {
        numberOfNeighbours: function(cellLocation)
        {
            return 2 // Placeholder value
        }
    }

    const Alive = {
      alive () {
        return true;
      },
      aliveInNextGeneration () {
        return (this.numberOfNeighbours() === 3);
      }
    };

    const Dead = {
      alive () {
        return false;
      },
      aliveInNextGeneration () {
        return (this.numberOfNeighbours() === 2 || this.numberOfNeighbours() === 3);
      }
    };

    const Cell = {
      numberOfNeighbours () {
        return thisGame.numberOfNeighbours(this._location);
      }
    }

    MetaObjectMethods.DeligateToOwn(Cell, '_state', ['alive', 'aliveInNextGeneration']);

    const someCell = Object.assign({
      _state: Alive,
      _location: {x: -15, y: 12}
    }, Cell);

    To change the state of someCell, change  someCell._state = Dead;
    
    This is because, any function calls to someCell.alive get sent to the object stored at someCell._state.
    Thus, changing someCell._state results in a different response.
*








