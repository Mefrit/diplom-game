define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Person = void 0;
    var Person = (function () {
        function Person(person) {
            var _this = this;
            this.setCoord = function (x, y) {
                _this.x = x;
                _this.y = y;
            };
            this.person = person;
            this.x = person.x;
            this.y = person.y;
            this.moveAction = false;
            this.domPerson = undefined;
        }
        Person.prototype.initDomPerson = function (domPerson) {
            this.domPerson = domPerson;
        };
        Person.prototype.setHealth = function (value) {
            this.person.health = parseInt(value);
        };
        Person.prototype.getHealth = function () {
            return parseInt(this.person.health);
        };
        Person.prototype.getUrl = function () {
            return this.person.url;
        };
        Person.prototype.getId = function () {
            return this.person.id;
        };
        Person.prototype.getKind = function () {
            return this.person.evil;
        };
        Person.prototype.getX = function () {
            return parseFloat(this.x);
        };
        Person.prototype.getY = function () {
            return parseFloat(this.y);
        };
        Person.prototype.getHeight = function () {
            return parseFloat(this.person.height);
        };
        Person.prototype.getWidth = function () {
            return parseFloat(this.person.width);
        };
        Person.prototype.getMoveAction = function () {
            return this.moveAction;
        };
        Person.prototype.setMoveAction = function (value) {
            this.moveAction = value;
        };
        return Person;
    }());
    exports.Person = Person;
});
