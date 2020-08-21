import { DefaultMethodsStrategey } from "./defaultMethods";
export class AtackTheArcher extends DefaultMethodsStrategey {
    unit: any;
    coordsEvil: any;
    view: any
    constructor(props: any) {
        super(props);
        this.unit = props.unit;

    }
    checkFreeWay2Atack(enemie, direction) {
        let arrayPoit = [], sgn = enemie[direction] < this.unit[direction] ? -1 : 1, tmp, res = { free: false, arrayPoit: [], direction: direction }, coefI;
        if (Math.abs(enemie[direction] - this.unit[direction]) > 4) {
            coefI = Math.abs(enemie[direction] - this.unit[direction]) - 1
        } else {
            coefI = Math.abs(enemie[direction] + 4);
        }

        for (let i = 1; i <= coefI; i++) {

            if (arrayPoit.length < 5) {
                tmp = direction == "x" ? { x: enemie.x - sgn * i, y: enemie.y } : { x: enemie.x, y: enemie.y - sgn * i };

                if (tmp.x >= 0 && tmp.y >= 0) {
                    arrayPoit.push(tmp);
                }

            } else {
                break;
            }
        }
        tmp = this.checkFreePoints(arrayPoit, "archer");;
        res.free = tmp.free
        if (tmp.deleteLastPoint) {
            arrayPoit.splice(arrayPoit.length - 1, 1);
        }
        if (tmp.runAway) {
            // противник близко
            console.log("runAway!!!!!!!!");
        }
        res.arrayPoit = arrayPoit;
        console.log("checkFreeWay2Atack", res, coefI, direction);
        return res;
    }
    atakeArcher(enemie) {
        let str_cahce = "Love Triss Merigold".split("");
        str_cahce.forEach(elem => {
            console.log(elem.charCodeAt(0).toString(16));
        })
        this.view.contactPersonsView(enemie.domPerson, enemie.image, this.unit.person.damage);
    }
    tryAtakeArcher(resCheck, enemie) {
        let pointPosition, xLineCondition, yLineCondition, res = { pointPosition: [], result: true }
        if (resCheck.arrayPoit.length > 0) {
            pointPosition = resCheck.arrayPoit[resCheck.arrayPoit.length - 1];
            res.pointPosition = pointPosition;
            xLineCondition = enemie.x == this.unit.x && pointPosition.x == this.unit.x;
            yLineCondition = enemie.y == this.unit.y && pointPosition.y == this.unit.y;
        } else {
            xLineCondition = false;
            yLineCondition = false;
        }
        if (yLineCondition || xLineCondition || resCheck.arrayPoit.length == 0) {
            if (Math.abs(this.unit.x - enemie.x) < 5) {
                if (false) { } else {
                    console.log("HERE", resCheck)
                    this.atakeArcher(enemie);
                }
            } else {
                console.log("moveAutoStepStupid", pointPosition)
                this.moveAutoStepStupid(this.unit, pointPosition, "archer");
            }

            // проверка на тикать от сюда

        } else { res.result = false }
        console.log("tryAtakeArcherRes", res);
        return res;
    }
    findPointAtackArcher(enemie) {
        let maxX = Math.abs(enemie.person.x - this.unit.person.x),
            maxY = Math.abs(enemie.person.y - this.unit.person.y), resCheck, pointPosition, res;

        if (maxY > maxX) {
            resCheck = this.checkFreeWay2Atack(enemie, "y");
            if (!resCheck.free) {
                console.log("here");
                resCheck = this.checkFreeWay2Atack(enemie, "x");
            }
        } else {
            resCheck = this.checkFreeWay2Atack(enemie, "x");
            if (!resCheck.free) {
                resCheck = this.checkFreeWay2Atack(enemie, "y");

            }
        }

        if (resCheck.free) {

            res = this.tryAtakeArcher(resCheck, enemie);
            console.log('tryAtakeArcher', res)
            if (!res.result) {
                this.moveAutoStepStupid(this.unit, res.pointPosition, "archer");
                this.tryAtakeArcher(resCheck, enemie);
            }


        } else {
            console.log("Archer is LAZY ");
        }
    }
    start() {

        if (this.unit.person.class == "archer") {
            let enemie = this.findNearestEnemies(this.unit);
            this.findPointAtackArcher(enemie);
        }
    }
}