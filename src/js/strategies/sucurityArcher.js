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
define(["require", "exports", "../lib/defaultMethods"], function (require, exports, defaultMethods_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SecurityArcher = void 0;
    var SecurityArcher = (function (_super) {
        __extends(SecurityArcher, _super);
        function SecurityArcher(props) {
            var _this = _super.call(this, props) || this;
            _this.unit = props.unit;
            return _this;
        }
        SecurityArcher.prototype.start = function () {
            var near_archers = this.unit_collection.getAiArchers(), near_enemy = this.findNearestEnemies(this.unit);
            var near_archer = this.findNearestArchers(this.unit);
            var pos_security = {};
            pos_security.y = near_archer.y;
            if (Math.abs(this.unit.x - near_archer.x) != 0 || Math.abs(this.unit.y - near_archer.y) != 0) {
                console.log("near_archer=> ", near_archer, Math.abs(this.unit.x - near_archer.x) != 0, "||", Math.abs(this.unit.y - near_archer.y) != 0);
                if (this.unit.x + 1 < 11) {
                    pos_security.x = near_archer.x + 1;
                }
                else {
                    pos_security.x = near_archer.x - 1;
                }
                console.log("pos_security => ", pos_security);
                var res = this.moveAutoStepStupid(this.unit, pos_security, "fighter");
                if (res.findEnime == true) {
                    if (Math.abs(this.unit.x - near_enemy.x) == 1) {
                        this.view.contactPersonsView(near_enemy.domPerson, near_enemy.image, this.unit.person.damage);
                        var checkArcherPosition = this.checkArcherPosition(near_enemy);
                        if (checkArcherPosition.result && !this.unit.moveAction) {
                            console.log("checkArcherPosition", checkArcherPosition);
                            this.moveAutoStepStupid(this.unit, checkArcherPosition.point, "fighter");
                        }
                    }
                    else {
                    }
                }
            }
        };
        return SecurityArcher;
    }(defaultMethods_1.DefaultMethodsStrategey));
    exports.SecurityArcher = SecurityArcher;
});
