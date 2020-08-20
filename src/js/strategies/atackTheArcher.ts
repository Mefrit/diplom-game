import { DefaultMethodsStrategey } from "./defaultMethods";
export class AtackTheArcher extends DefaultMethodsStrategey {
    unit: any;
    coordsEvil: any;
    view: any
    constructor(props: any) {
        super(props);
        // console.log("\n angry", props);

        this.unit = props.unit;
        // this.coordsEvil = { x: props.result.x, y: props.result.y };
    }
    checkFreeWay2AtackX(enemy) {
        let arrayPoit = [], sgn = enemy.x < this.unit.x ? -1 : 1;
        for (let i = 0; i < Math.abs(enemy.x - this.unit.x); i++) {
            if (arrayPoit.length < 5) {
                arrayPoit.push({ x: enemy.x - sgn * i, y: enemy.y });
            } else {
                break;
            }
        }
        this.checkFreePoints(arrayPoit);
        console.log(arrayPoit);
        return true;
    }
    findPointAtackArcher(enemy) {
        let maxX = Math.abs(enemy.person.x - this.unit.person.x),
            maxY = Math.abs(enemy.person.y - this.unit.person.y);

        if (maxY > maxX) {
            console.log(maxX, maxY);
        } else {
            if (this.checkFreeWay2AtackX(enemy)) {

            }
        }
    }
    start() {
        let enemy = this.findNearestEnemies(this.unit);
        this.findPointAtackArcher(enemy);
    }
}