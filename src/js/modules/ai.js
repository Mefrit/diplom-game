define(["require", "exports", "../strategies/angryIfcan", "../strategies/atackTheArcher"], function (require, exports, angryIfcan_1, atackTheArcher_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ai = void 0;
    var Ai = (function () {
        function Ai(arrAllPersons) {
            var _this = this;
            this.initPersons = function (unit_collection, syncUnit) {
                _this.unit_collection = unit_collection;
                _this.syncUnit = syncUnit;
            };
            this.initScene = function (scene) {
                console.log("initScene", scene);
                _this.scene = scene;
            };
            this.exploreArea = function (enemieAi) {
                var x = enemieAi.getY(), y = enemieAi.getY();
                var arrX = [x - 2, x - 1, x, x + 1, x + 2], arrY = [y - 2, y - 1, y, y + 1, y + 2], user_persons = _this.unit_collection.getUserCollection(), enemieCoordX = -1, enemieCoordY = -1, result = { result: false, x: -1, y: -1 }, cacheEvil = [];
                user_persons.forEach(function (elem) {
                    enemieCoordX = arrX.indexOf(elem.getX());
                    enemieCoordY = arrY.indexOf(elem.getY());
                    if (enemieCoordX != -1 && enemieCoordY != -1) {
                        if (elem.person.id != enemieAi.person.id) {
                            cacheEvil.push(elem);
                            result = { result: true, x: enemieCoordX, y: enemieCoordY };
                        }
                    }
                });
                return result;
            };
            this.step = function () {
                var posDifX, posDifY, res;
                _this.unit_collection.getCollection().forEach(function (element) {
                    if (element.person.evil && element.person.health > 12) {
                        _this.stepAi(res, element);
                    }
                });
                _this.syncUnit(_this.unit_collection);
            };
            this.scene = {};
            this.cache_coord_bots = [];
            this.syncUnit = function () {
                console.log("default");
            };
        }
        Ai.prototype.initView = function (view) {
            this.view = view;
        };
        Ai.prototype.getCoord = function (coord) {
            return parseInt(coord.split("px")[0]);
        };
        Ai.prototype.randomInteger = function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        };
        Ai.prototype.getUnitObj = function (id) {
            var unit, data = this.unit_collection.getCollection();
            for (var i = 0; i < data.length; i++) {
                if (data[i].person.id == id) {
                    unit = data[i];
                    break;
                }
            }
            return unit;
        };
        Ai.prototype.changeLocation = function (element, x, y) {
            if (x === void 0) { x = -1; }
            if (y === void 0) { y = -1; }
            var posDifX = x, posDifY = y, elemX = element.getX() * 120, elemY = element.getY() * 120, unit;
            if (x == -1 && y == -1) {
                while (true) {
                    posDifX = this.randomInteger(-2, 2);
                    posDifY = this.randomInteger(-2, 2);
                    if (elemX + posDifX * 120 < 1080 && elemY + posDifY * 120 < 600) {
                        if (elemY + posDifY * 120 >= 0 && elemX + posDifX * 120 >= 0) {
                            posDifX = elemX / 120 + posDifX;
                            posDifY = elemY / 120 + posDifY;
                            if (this.checkFreeLocation(posDifX, posDifY)) {
                                element.setCoord(posDifX, posDifY);
                                this.unit_collection.updateElement(element);
                                break;
                            }
                        }
                    }
                }
            }
            else {
                unit = this.getUnitObj(element.getAttribute("data-id"));
                x = elemX / 120 + x;
                y = elemY / 120 + y;
                unit.setCoord(x, y);
            }
            posDifX *= 120;
            posDifY *= 120;
            console.log("Find enemies move", posDifX, posDifY);
            this.scene.renderElement(element);
        };
        Ai.prototype.checkFreeLocation = function (posDifX, posDifY) {
            var arr = this.unit_collection.getCollection(), res = true;
            arr.forEach(function (elem) {
                if (elem.getX() == posDifX && elem.getY() == posDifY) {
                    console.log("checkFreeLocation elem", elem.getX(), "=", posDifX, elem.getY(), "=", posDifY);
                    res = false;
                }
            });
            console.log("checkFreeLocation true", posDifX, posDifY, arr);
            return res;
        };
        Ai.prototype.getCoordinateEnemies = function () {
            var enemies = [].slice.call(document.getElementsByClassName("players"));
        };
        Ai.prototype.stepAi = function (res, unit) {
            var _this = this;
            setTimeout(function () {
                var obj;
                unit.moveAction = false;
                if (unit.person.class == "fighter") {
                    obj = new angryIfcan_1.FightIfYouCan({
                        unit: unit,
                        result: res,
                        scene: _this.scene,
                        unit_collection: _this.unit_collection,
                        view: _this.view
                    });
                    obj.attackPerson();
                }
                else {
                    obj = new atackTheArcher_1.AtackTheArcher({
                        unit: unit,
                        result: res,
                        scene: _this.scene,
                        unit_collection: _this.unit_collection,
                        view: _this.view
                    });
                    obj.start();
                }
            }, 100);
        };
        return Ai;
    }());
    exports.Ai = Ai;
});
