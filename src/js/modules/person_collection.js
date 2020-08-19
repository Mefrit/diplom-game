define(["require", "exports", "./person"], function (require, exports, person_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Collection = (function () {
        function Collection(data) {
            this.collection = data.map(function (elem) {
                return new person_1.Person(elem);
            });
            console.log("this.collection ", this.collection);
        }
        Collection.prototype.getCollection = function () {
            return this.collection;
        };
        Collection.prototype.checkFreeCoord = function (coord) {
            var res = true;
            this.collection.forEach(function (element) {
                if (element.x == coord.x && element.y == coord.y) {
                    res = false;
                }
            });
            return res;
        };
        Collection.prototype.getAiCollection = function () {
            return this.collection.filter(function (elem) {
                if (elem.person.evil) {
                    return elem;
                }
            });
        };
        Collection.prototype.getUserCollection = function () {
            return this.collection.filter(function (elem) {
                if (!elem.person.evil) {
                    return elem;
                }
            });
        };
        Collection.prototype.updateElement = function (unit) {
            this.collection = this.collection.map(function (elem) {
                if (unit.getId() == elem.getId()) {
                    return unit;
                }
                else {
                    return elem;
                }
            });
        };
        return Collection;
    }());
    exports.Collection = Collection;
});
