
const log = console.log;

function Test()
{
    log('Test FN Called in Context: ');
    log(this);
}

const requiresFinite = (fn, fn2) =>
    function(n) {
        if (Number.isFinite(n)){
            log('Context 1: ');
            log(this);
            fn2();
            return fn(n);
        }
        else throw "Bad Wolf";
    }

class Circle {
    constructor (radius) {
        this.radius = radius;
        Test();
    }
    diameter () {
        return Math.PI * 2 * this.radius;
    }
    scaleBy (factor) {
        log('Context 2: ');
        log(this);
        return new Circle(factor * this.radius);
    }
}


const two = new Circle(2);

Circle.prototype.scaleBy = requiresFinite(Circle.prototype.scaleBy, Test);

log(two.scaleBy(2).diameter() );