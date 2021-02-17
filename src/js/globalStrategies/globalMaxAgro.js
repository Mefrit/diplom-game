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
define(["require", "exports", "../lib/globalStrdefault"], function (require, exports, globalStrdefault_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobalSTRMaxAgro = void 0;
    var GlobalSTRMaxAgro = (function (_super) {
        __extends(GlobalSTRMaxAgro, _super);
        function GlobalSTRMaxAgro(props) {
            return _super.call(this, props) || this;
        }
        GlobalSTRMaxAgro.prototype.assessment = function () {
            return 1;
        };
        return GlobalSTRMaxAgro;
    }(globalStrdefault_1.GlobalSTRDefaultMethods));
    exports.GlobalSTRMaxAgro = GlobalSTRMaxAgro;
});
