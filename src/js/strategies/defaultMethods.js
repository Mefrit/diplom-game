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
                return _this.deleteExcessCoord(res);
            };
            this.moveAutoStepStupid = function (unit, enemie, type) {
                if (type === void 0) { type = "fighter"; }
                var pointsNear, res = { findEnime: false, enemie: enemie, type: type };
                var current = { id: 0, x: unit.person.x, y: unit.person.y }, came_from = {}, frontier = [], cost_so_far = [], new_cost, priority, bestPoint, coefProximity = type == "archer" ? 1 : 2;
                came_from[0] = NaN;
                cost_so_far[0] = 0;
                if (_this.checkEnemieNear(current, enemie, coefProximity)) {
                    res.findEnime = true;
                    console.log("checkEnemieNear=>>>>>>>>>>>>in ", type);
                    return res;
                }
                else {
                    pointsNear = _this.getNeighbors({ x: unit.person.x, y: unit.person.y });
                    pointsNear.forEach(function (next, index, arr) {
                        next.id = unit.person.x + unit.person.y + index;
                        new_cost = cost_so_far[current.id] + 1;
                        if (cost_so_far.indexOf(next.id) == -1 || new_cost < cost_so_far[next.id]) {
                            cost_so_far[next.id] = new_cost;
                            priority = _this.heuristic({ x: enemie.x, y: enemie.y }, next);
                            frontier.push({ next: next, priority: priority });
                            came_from[next.id] = current;
                        }
                    });
                }
                bestPoint = frontier[0];
                frontier.forEach(function (element) {
                    if (element.priority < bestPoint.priority) {
                        if (type == "archer") {
                            bestPoint = element;
                        }
                        else {
                            if (unit.coordPrevPoint.x != element.next.x && unit.coordPrevPoint.y != element.next.y) {
                                bestPoint = element;
                            }
                        }
                    }
                });
                _this.moveTo(unit, bestPoint.next);
                current = { id: 0, x: unit.person.x, y: unit.person.y };
                console.log("moveAutoStepStupid=>>>>>>>>>>>>in ", _this.checkEnemieNear(current, enemie, coefProximity));
                res.findEnime = _this.checkEnemieNear(current, enemie, coefProximity);
                return res;
            };
            this.scene = props.scene;
            this.view = props.view;
            this.unit_collection = props.unit_collection;
        }
        DefaultMethodsStrategey.prototype.moveTo = function (person, coord) {
            person.setCoord(coord.x, coord.y);
            this.unit_collection.updateElement(person);
            this.scene.renderElement(person);
        };
        DefaultMethodsStrategey.prototype.findNearestEnemies = function (unit) {
            var min = 1000, nearEnemies = undefined, tmp_x, tmp_y, tmp_min = 1000;
            this.unit_collection.getCollection().forEach(function (element) {
                if (!element.person.evil && !element.isDied()) {
                    console.log();
                    tmp_x = unit.person.x - element.person.x;
                    tmp_y = unit.person.y - element.person.y;
                    tmp_min = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
                    if (min > tmp_min) {
                        min = tmp_min;
                        nearEnemies = element;
                    }
                }
            });
            return nearEnemies;
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
            return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
        };
        DefaultMethodsStrategey.prototype.checkEnemieNear = function (current, enemie, coefProximity) {
            return Math.abs(current.x - enemie.x) < coefProximity && Math.abs(current.y - enemie.y) < coefProximity;
        };
        DefaultMethodsStrategey.prototype.checkFreePoints = function (points, type) {
            if (type === void 0) { type = "fighter"; }
            var res = { free: true, deleteLastPoint: false, runAway: false };
            this.unit_collection.getCollection().forEach(function (unit) {
                for (var i = 0; i < points.length; i++) {
                    if (unit.x == points[i].x && points[i].y == unit.y) {
                        if (!(type == "archer" && i == points.length - 1)) {
                            if (unit.person.evil) {
                                res.runAway = true;
                            }
                            res.free = false;
                        }
                        else {
                            res.deleteLastPoint = true;
                        }
                    }
                }
            });
            console.log("checkFreePoints", res);
            return res;
        };
        return DefaultMethodsStrategey;
    }());
    exports.DefaultMethodsStrategey = DefaultMethodsStrategey;
});
