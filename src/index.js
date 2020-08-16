define(["require", "exports", "react", "react-dom", "./js/loader", "./js/modules/ai", "./js/modules/scene"], function (require, exports, React, ReactDOM, loader_1, ai_1, scene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ROOT = document.getElementById("root");
    ReactDOM.render(React.createElement("h1", null, "Hellen"), ROOT);
    var loader = new loader_1.ImageDownloader();
    var arrPersons = [
        {
            url: "./src/images/hero.png",
            x: 1,
            y: 0,
            evil: true,
            class: "fighter",
            damage: 19,
            health: 50,
            id: 3,
        },
        {
            url: "./src/images/vinny.png",
            x: 1,
            y: 1,
            evil: true,
            class: "fighter",
            damage: 19,
            health: 50,
            id: 5,
        },
        {
            url: "./src/images/person.jpg",
            x: 1,
            y: 2,
            evil: true,
            class: "fighter",
            damage: 19,
            health: 50,
            id: 4,
        },
        {
            url: "./src/images/hola.png",
            x: 7,
            y: 2,
            evil: false,
            class: "fighter",
            damage: 12,
            health: 50,
            id: 1,
        },
        {
            url: "./src/images/hola2.png",
            x: 7,
            y: 1,
            evil: false,
            class: "fighter",
            damage: 12,
            health: 50,
            id: 0,
        },
    ];
    var Director = (function () {
        function Director(loader, arrPersons) {
            var _this = this;
            this.startAI = function () {
                _this.ai.step();
            };
            this.ai = new ai_1.Ai([]);
            this.scene = new scene_1.Scene(loader, arrPersons, this.ai);
            this.ai.initScene(this.scene);
            this.start();
        }
        Director.prototype.start = function () {
            var play = document.createElement("input");
            play.type = "button";
            play.classList.add("button");
            play.value = "Ход соперника";
            play.addEventListener("click", this.startAI);
            document.getElementById("scene").appendChild(play);
        };
        return Director;
    }());
    new Director(loader, arrPersons);
});
