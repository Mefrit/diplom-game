define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobalSTRDefaultMethods = void 0;
    var GlobalSTRDefaultMethods = (function () {
        function GlobalSTRDefaultMethods(props) {
            console.log("GlobalSTRDefaultMethods props", props);
            this.scene = props.scene;
            this.view = props.view;
            this.unit_collection = props.unit_collection;
        }
        GlobalSTRDefaultMethods.prototype.assessment = function () {
            return 1;
        };
        GlobalSTRDefaultMethods.prototype.startStr = function () {
        };
        return GlobalSTRDefaultMethods;
    }());
    exports.GlobalSTRDefaultMethods = GlobalSTRDefaultMethods;
});
