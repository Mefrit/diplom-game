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
            var nearEnemie = this.findNearestEnemies(this.unit), coord, res, attakedEnemie;
            coord = { x: nearEnemie.person.x, y: nearEnemie.person.y };
            res = this.moveAutoStepStupid(this.unit, nearEnemie, "fighter");
            console.log(res);
            if (res.findEnime == true) {
                attakedEnemie = this.findEnemieForAtake(res.enemie);
                this.view.contactPersonsView(res.enemie.domPerson, res.enemie.image, this.unit.person.damage);
                console.log(res.enemie, this.view);
            }
        };
        FightIfYouCan.prototype.findEnemieForAtake = function (enemie) {
            return enemie;
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
