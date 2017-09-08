
const log = console.log;
log('');

function OutsideContextFn()
{
    log('Fn on outside context: ');
    log(this);
    log('');
}

var obj = {
    checkProp: 'THIS PROPERTY IS IN THE OBJECT obj',
    
    fn: function()
    {
        log('Regular function context: ');
        log(this);
        log('');
    },
    
    fnFatArrow: ()=> {
        log('Fat arrow context: ');
        log(this);
        log('');
    },
    
    fnOutsideCall: function()
    {
        OutsideContextFn();
    }
}

obj.fn();
obj.fnFatArrow();
obj.fnOutsideCall();