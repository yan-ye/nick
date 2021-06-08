


function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString =  function (){
    return `${this.x}${this.y}`
}
let p = new Point(1,2)

console.log(p.toString(), 11111)


class Point1 {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `Class Point ${this.x} ${this.y}`
    }
}
let p1 = new Point1('1','2')
console.log(p1.toString())
