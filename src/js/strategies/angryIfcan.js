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
    var FightIfYouCan = (function (_super) {
        __extends(FightIfYouCan, _super);
        function FightIfYouCan(props) {
            var _this = _super.call(this, props) || this;
            _this.unit = props.unit;
            return _this;
        }
        FightIfYouCan.prototype.attackPerson = function () {
            var nearEnemies = this.findNearestEnemies();
            this.moveAutoStepStupid(this.unit, { x: nearEnemies.person.x, y: nearEnemies.person.y }, nearEnemies);
        };
        FightIfYouCan.prototype.findNearestEnemies = function () {
            var _this = this;
            var min = 1000, nearEnemies = undefined, tmp_x, tmp_y, tmp_min = 1000;
            this.unit_collection.getCollection().forEach(function (element) {
                if (!element.person.evil) {
                    console.log();
                    tmp_x = _this.unit.person.x - element.person.x;
                    tmp_y = _this.unit.person.y - element.person.y;
                    tmp_min = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
                    if (min > tmp_min) {
                        min = tmp_min;
                        nearEnemies = element;
                    }
                }
            });
            return nearEnemies;
        };
        FightIfYouCan.prototype.findEnemies = function () {
            var cacheEnimies = [];
            this.unit_collection.getCollection().forEach(function (element) {
                if (!element.person.evil) {
                    cacheEnimies.push(element);
                }
            });
            return cacheEnimies;
        };
        return FightIfYouCan;
    }(defaultMethods_1.DefaultMethodsStrategey));
    exports.FightIfYouCan = FightIfYouCan;
});
