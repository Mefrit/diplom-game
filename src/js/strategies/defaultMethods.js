define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultMethodsStrategey = void 0;
    var DefaultMethodsStrategey = (function () {
        function DefaultMethodsStrategey(props) {
            this.scene = props.scene;
            this.unit_collection = props.unit_collection;
        }
        DefaultMethodsStrategey.prototype.moveTo = function (person, coord) {
            person.setCoord(coord.x - 1, coord.y);
            this.unit_collection.updateElement(person);
            this.scene.renderElement(person);
        };
        DefaultMethodsStrategey.prototype.heuristic = function () { };
        DefaultMethodsStrategey.prototype.deleteExcessCoord = function (cahceCoord) {
            var _this = this;
            if (cahceCoord === void 0) { cahceCoord = []; }
            return cahceCoord.filter(function (elem) {
                if (elem.x >= 0 && elem.x <= 8) {
                    if (elem.y >= 0 && elem.x <= 4) {
                        if (_this.unit_collection.checkFreeCoord({ x: elem.x, y: elem.y })) {
                            return elem;
                        }
                    }
                }
            });
        };
        DefaultMethodsStrategey.prototype.getNeighbors = function (coord) {
            var res = [];
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    res.push({ x: coord.x - i, y: coord.y - j });
                }
            }
            console.log(res);
            return this.deleteExcessCoord(res);
        };
        DefaultMethodsStrategey.prototype.checkCameFromEmpty = function (cameFrom, point) {
            var res = true;
            cameFrom.forEach(function (element) {
                if (element.x == point.x && element.y == point.y) {
                    res = false;
                }
            });
            return res;
        };
        DefaultMethodsStrategey.prototype.moveAutoStepStupid = function (unit, coord) {
            var _this = this;
            var x = unit.person.x, y = unit.person.y, resEmptyArea = true;
            var cameFrom = {};
            var pointsNear = this.getNeighbors({ x: unit.person.x, y: unit.person.y });
            console.log(" move Auto Step Stupid ", this.getNeighbors({ x: unit.person.x, y: unit.person.y }), {
                x: unit.person.x,
                y: unit.person.y,
            });
            pointsNear.forEach(function (elem) {
                if (_this.checkCameFromEmpty(cameFrom, elem)) {
                }
            });
        };
        return DefaultMethodsStrategey;
    }());
    exports.DefaultMethodsStrategey = DefaultMethodsStrategey;
});
