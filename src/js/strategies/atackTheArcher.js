var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./defaultMethods"], function (require, exports, defaultMethods_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AtackTheArcher = (function (_super) {
        __extends(AtackTheArcher, _super);
        function AtackTheArcher(props) {
            var _this = _super.call(this, props) || this;
            _this.unit = props.unit;
            return _this;
        }
        AtackTheArcher.prototype.checkFreeWay2Atack = function (enemie, direction) {
            var arrayPoit = [], sgn = enemie[direction] < this.unit[direction] ? -1 : 1, tmp, res = { free: false, arrayPoit: [], direction: direction, runAway: false }, coefI;
            tmp = Math.abs(enemie[direction] - this.unit[direction]);
            if (tmp <= 4) {
                coefI = tmp;
            }
            else {
                return res;
            }
            console.log("coefI", coefI, "direction", direction, enemie[direction], "-", this.unit[direction]);
            for (var i = 1; i <= coefI; i++) {
                if (arrayPoit.length < 5) {
                    tmp = direction == "x" ? { x: enemie.x - sgn * i, y: enemie.y } : { x: enemie.x, y: enemie.y - sgn * i };
                    if (tmp.x >= 0 && tmp.y >= 0) {
                        if (tmp.x != this.unit.x && tmp.y != this.unit.y) {
                            console.log(tmp);
                            arrayPoit.push(tmp);
                        }
                    }
                }
                else {
                    break;
                }
            }
            tmp = this.checkFreePoints(arrayPoit, "archer");
            ;
            res.free = tmp.free;
            if (tmp.deleteLastPoint) {
                arrayPoit.splice(arrayPoit.length - 1, 1);
            }
            res.arrayPoit = arrayPoit;
            console.log("checkFreeWay2Atack", res, coefI, direction);
            return res;
        };
        AtackTheArcher.prototype.atakeArcher = function (enemie) {
            this.view.contactPersonsView(enemie.domPerson, enemie.image, this.unit.person.damage);
        };
        AtackTheArcher.prototype.tryAtakeArcher = function (resCheck, enemie) {
            var pointPosition, xLineCondition, yLineCondition, res = { pointPosition: [], result: true };
            if (resCheck.arrayPoit.length > 0) {
                pointPosition = resCheck.arrayPoit[resCheck.arrayPoit.length - 1];
                res.pointPosition = pointPosition;
                xLineCondition = enemie.x == this.unit.x && pointPosition.x == this.unit.x;
                yLineCondition = enemie.y == this.unit.y && pointPosition.y == this.unit.y;
            }
            else {
                xLineCondition = false;
                yLineCondition = false;
            }
            if (yLineCondition || xLineCondition || resCheck.arrayPoit.length == 0) {
                if (Math.abs(this.unit.x - enemie.x) < 5) {
                    if (false) { }
                    else {
                        console.log("HERE", resCheck);
                        this.atakeArcher(enemie);
                    }
                }
                else {
                    console.log("moveAutoStepStupid", pointPosition);
                    this.moveAutoStepStupid(this.unit, pointPosition, "archer");
                }
            }
            else {
                res.result = false;
            }
            return res;
        };
        AtackTheArcher.prototype.runAwayArcher = function () {
            if (this.unit.x < 8) {
                this.moveAutoStepStupid(this.unit, { x: this.unit.x + 1, y: this.unit.y }, "archer");
            }
        };
        AtackTheArcher.prototype.got2AttackePosition = function (enemie) {
            this.moveAutoStepStupid(this.unit, { x: enemie.x, y: enemie.y }, "archer");
        };
        AtackTheArcher.prototype.findPointAtackArcher = function (enemie) {
            var maxX = Math.abs(enemie.person.x - this.unit.person.x), maxY = Math.abs(enemie.person.y - this.unit.person.y), resCheck, res;
            if (maxY > maxX) {
                resCheck = this.checkFreeWay2Atack(enemie, "y");
                if (!resCheck.free) {
                }
            }
            else {
                resCheck = this.checkFreeWay2Atack(enemie, "x");
                if (!resCheck.free) {
                }
            }
            if (resCheck.free) {
                res = this.tryAtakeArcher(resCheck, enemie);
                if (!res.result) {
                    this.moveAutoStepStupid(this.unit, res.pointPosition, "archer");
                    this.tryAtakeArcher(resCheck, enemie);
                }
            }
            else {
                console.log("Archer is LAZY ", resCheck);
                this.got2AttackePosition(enemie);
            }
        };
        AtackTheArcher.prototype.start = function () {
            if (this.unit.person.class == "archer") {
                var enemie = this.findNearestEnemies(this.unit);
                this.findPointAtackArcher(enemie);
            }
        };
        return AtackTheArcher;
    }(defaultMethods_1.DefaultMethodsStrategey));
    exports.AtackTheArcher = AtackTheArcher;
});
