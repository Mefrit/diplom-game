define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultMethodsStrategey = void 0;
    var DefaultMethodsStrategey = (function () {
        function DefaultMethodsStrategey(props) {
            var _this = this;
            this.getNeighbors = function (coord, type) {
                if (type === void 0) { type = "figter"; }
                var res = [];
                for (var i = -2; i < 3; i++) {
                    for (var j = -2; j < 3; j++) {
                        res.push({ x: coord.x + i, y: coord.y + j });
                    }
                }
                res = _this.deleteExcessCoord(res);
                if (type == "arcger") {
                    res.push({ x: coord.x, y: coord.y });
                }
                return res;
            };
            this.moveAutoStepStupid = function (unit, perso2go, type) {
                if (type === void 0) { type = "fighter"; }
                var pointsNear, res = { findEnime: false, enemie: perso2go, type: type };
                var current = { id: 0, x: unit.person.x, y: unit.person.y }, came_from = {}, frontier = [], cost_so_far = [], new_cost, priority, bestPoint, coefProximity = type == "archer" ? 1 : 2;
                came_from[0] = NaN;
                cost_so_far[0] = 0;
                if (_this.checkEnemieNear(current, perso2go, coefProximity)) {
                    res.findEnime = true;
                    if (!!res.enemie) {
                        res.enemie;
                    }
                    return res;
                }
                else {
                    pointsNear = _this.getNeighbors({ x: unit.person.x, y: unit.person.y }, type);
                    pointsNear.forEach(function (next, index, arr) {
                        next.id = unit.person.x + unit.person.y + index;
                        new_cost = cost_so_far[current.id] + 1;
                        if (cost_so_far.indexOf(next.id) == -1 || new_cost < cost_so_far[next.id]) {
                            cost_so_far[next.id] = new_cost;
                            priority = _this.heuristic({ x: perso2go.x, y: perso2go.y }, next, type);
                            frontier.push({ next: next, priority: priority });
                            came_from[next.id] = current;
                        }
                    });
                }
                bestPoint = frontier[0];
                frontier.forEach(function (element) {
                    if (element.priority <= bestPoint.priority) {
                        if (type == "archer") {
                            bestPoint = element;
                        }
                        else {
                            bestPoint = element;
                        }
                    }
                });
                if (frontier.length > 0) {
                    _this.moveTo(unit, bestPoint.next);
                }
                current = { id: 0, x: unit.person.x, y: unit.person.y };
                res.findEnime = _this.checkEnemieNear(current, perso2go, coefProximity);
                if (res.findEnime) {
                    unit.removePrevPoint();
                }
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
        DefaultMethodsStrategey.prototype.findNearestArchers = function (unit) {
            var min = 1000, nearArcher = undefined, tmp_x, tmp_y, tmp_min = 1000;
            this.unit_collection.getCollection().forEach(function (element) {
                if (element.person.evil && !element.isNotDied() && element.person.class == 'archer') {
                    tmp_x = unit.person.x - element.person.x;
                    tmp_y = unit.person.y - element.person.y;
                    tmp_min = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
                    if (min > tmp_min) {
                        min = tmp_min;
                        nearArcher = element;
                    }
                }
            });
            return nearArcher;
        };
        DefaultMethodsStrategey.prototype.findNearestEnemies = function (unit) {
            var min = 1000, nearEnemies = undefined, tmp_x, tmp_y, tmp_min = 1000;
            this.unit_collection.getCollection().forEach(function (element) {
                if (!element.person.evil && !element.isNotDied()) {
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
                if (elem.x >= 0 && elem.x < 11) {
                    if (elem.y >= 0 && elem.y < 6) {
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
        DefaultMethodsStrategey.prototype.heuristic = function (a, b, type) {
            var res = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            switch (type) {
                case "archer":
                    if (Math.abs(a.x - b.x) < 4) {
                        res += 10;
                        if (Math.abs(a.x - b.x) < 3) {
                            res += 10;
                        }
                        if (Math.abs(a.x - b.x) < 2) {
                            res += 40;
                        }
                    }
                    else {
                        if (Math.abs(a.x - b.x) > 3) {
                            res += Math.abs(a.x - b.x) + 10;
                        }
                    }
                    if (Math.abs(a.x - b.x) < 1) {
                        res += 0.5;
                    }
                    if (Math.abs(a.y - b.y) < 2) {
                        res += Math.abs(a.y - b.y);
                    }
                    if (Math.abs(a.y - b.y) < 3) {
                        res += Math.abs(a.y - b.y) + 5;
                    }
                    if (Math.abs(a.y - b.y) >= 3) {
                        res += Math.abs(a.y - b.y) + 10;
                    }
                    break;
                default:
                    res += Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
                    break;
            }
            return res;
        };
        DefaultMethodsStrategey.prototype.checkArcherPosition = function (enemie) {
            var res = { point: {}, result: false };
            if (Math.abs(enemie.x - this.unit.x) < 2) {
                if (this.checkFreePoints({ x: enemie.x, y: enemie.y - 1 })) {
                    res.result = true;
                    res.point = { x: enemie.x, y: enemie.y - 1 };
                    return res;
                }
                if (this.checkFreePoints({ x: enemie.x, y: enemie.y + 1 })) {
                    res.result = true;
                    res.point = { x: enemie.x, y: enemie.y + 1 };
                    return res;
                }
            }
            else {
                if (Math.abs(enemie.y - this.unit.y) < 2) {
                    if (this.checkFreePoints({ x: enemie.x - 1, y: enemie.y })) {
                        res.result = true;
                        res.point = { x: enemie.x - 1, y: enemie.y };
                        return res;
                    }
                    if (this.checkFreePoints({ x: enemie.x + 1, y: enemie.y })) {
                        res.result = true;
                        res.point = { x: enemie.x + 1, y: enemie.y };
                        return res;
                    }
                }
            }
            return res;
        };
        DefaultMethodsStrategey.prototype.checkEnemieNear = function (current, enemie, coefProximity) {
            return Math.abs(current.x - enemie.x) < coefProximity && Math.abs(current.y - enemie.y) < coefProximity;
        };
        DefaultMethodsStrategey.prototype.checkFreePoints = function (points, type) {
            if (type === void 0) { type = "fighter"; }
            var res = { free: true, deleteLastPoint: false };
            this.unit_collection.getCollection().forEach(function (unit) {
                for (var i = 0; i < points.length; i++) {
                    if (points[i].x < 0 || points[i].x > 8) {
                        res.free = false;
                    }
                    if (points[i].y < 0 || points[i].y > 3) {
                        res.free = false;
                    }
                    if (unit.x == points[i].x && points[i].y == unit.y) {
                        if (!(type == "archer" && i == points.length - 1)) {
                            console.log("\n type", type, "points", points, unit);
                            res.free = false;
                        }
                        else {
                            res.deleteLastPoint = true;
                        }
                    }
                }
            });
            return res;
        };
        return DefaultMethodsStrategey;
    }());
    exports.DefaultMethodsStrategey = DefaultMethodsStrategey;
});
