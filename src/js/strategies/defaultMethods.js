define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DefaultMethodsStrategey = (function () {
        function DefaultMethodsStrategey(props) {
            var _this = this;
            this.getNeighbors = function (coord) {
                var res = [];
                for (var i = -1; i < 2; i++) {
                    for (var j = -1; j < 2; j++) {
                        res.push({ x: coord.x + i, y: coord.y + j });
                    }
                }
                console.log("getNeighbors", _this.deleteExcessCoord(res), coord);
                return _this.deleteExcessCoord(res);
            };
            this.moveAutoStepStupid = function (unit, coord, nearEnemie) {
                var x = unit.person.x, y = unit.person.y, resEmptyArea = true;
                var pointsNear;
                var current = { id: 0, x: unit.person.x, y: unit.person.y }, came_from = {}, frontier = [], cost_so_far = [], new_cost, priority, bestPoint;
                came_from[0] = NaN;
                cost_so_far[0] = 0;
                if (current.x == coord.x && current.y == coord.y) {
                    alert("YES you see it");
                }
                else {
                    console.log("unit", unit, unit.person.x, unit.person.y);
                    pointsNear = _this.getNeighbors({ x: unit.person.x, y: unit.person.y });
                    console.log("pointsNear", pointsNear);
                    pointsNear.forEach(function (next, index, arr) {
                        next.id = unit.person.x + unit.person.y + index;
                        new_cost = cost_so_far[current.id] + 1;
                        if (cost_so_far.indexOf(next.id) == -1 || new_cost < cost_so_far[next.id]) {
                            cost_so_far[next.id] = new_cost;
                            priority = _this.heuristic({ x: nearEnemie.person.x, y: nearEnemie.person.y }, next);
                            frontier.push({ next: next, priority: priority });
                            came_from[next.id] = current;
                        }
                    });
                }
                console.log("frontier", frontier);
                bestPoint = frontier[0];
                frontier.forEach(function (element) {
                    if (element.priority < bestPoint.priority) {
                        bestPoint = element;
                    }
                });
                console.log("bestPoint=> ", bestPoint);
                _this.moveTo(unit, bestPoint.next);
            };
            this.scene = props.scene;
            this.unit_collection = props.unit_collection;
        }
        DefaultMethodsStrategey.prototype.moveTo = function (person, coord) {
            person.setCoord(coord.x, coord.y);
            person.person.x = coord.x;
            person.person.y = coord.y;
            this.unit_collection.updateElement(person);
            console.log(this.unit_collection, person.person.x, person.person.y);
            this.scene.renderElement(person);
        };
        DefaultMethodsStrategey.prototype.deleteExcessCoord = function (cahceCoord) {
            var _this = this;
            if (cahceCoord === void 0) { cahceCoord = []; }
            return cahceCoord.filter(function (elem) {
                if (elem.x >= 0 && elem.x <= 8) {
                    if (elem.y >= 0 && elem.y <= 4) {
                        if (_this.unit_collection.checkFreeCoord({ x: elem.x, y: elem.y })) {
                            return elem;
                        }
                    }
                }
            });
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
        DefaultMethodsStrategey.prototype.heuristic = function (a, b) {
            console.log(Math.abs(a.x - b.x) + Math.abs(a.y - b.y), a, b);
            return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        };
        return DefaultMethodsStrategey;
    }());
    exports.DefaultMethodsStrategey = DefaultMethodsStrategey;
});
