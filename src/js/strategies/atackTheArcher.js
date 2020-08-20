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
        AtackTheArcher.prototype.checkFreeWay2AtackX = function (enemy) {
            var arrayPoit = [], sgn = enemy.x < this.unit.x ? -1 : 1;
            for (var i = 0; i < Math.abs(enemy.x - this.unit.x); i++) {
                if (arrayPoit.length < 5) {
                    arrayPoit.push({ x: enemy.x - sgn * i, y: enemy.y });
                }
                else {
                    break;
                }
            }
            this.checkFreePoints(arrayPoit);
            console.log(arrayPoit);
            return true;
        };
        AtackTheArcher.prototype.findPointAtackArcher = function (enemy) {
            var maxX = Math.abs(enemy.person.x - this.unit.person.x), maxY = Math.abs(enemy.person.y - this.unit.person.y);
            if (maxY > maxX) {
                console.log(maxX, maxY);
            }
            else {
                if (this.checkFreeWay2AtackX(enemy)) {
                }
            }
        };
        AtackTheArcher.prototype.start = function () {
            var enemy = this.findNearestEnemies(this.unit);
            this.findPointAtackArcher(enemy);
        };
        return AtackTheArcher;
    }(defaultMethods_1.DefaultMethodsStrategey));
    exports.AtackTheArcher = AtackTheArcher;
});
