import * as React from "react";
import * as ReactDOM from "react-dom";
import { ImageDownloader } from "./js/loader";
import { Ai } from "./js/modules/ai";
import { Scene } from "./js/modules/scene";
// import { Persons } from './js/modules/personsController';
// import { Module } from "./components/modules/module";

const ROOT = document.getElementById("root");

ReactDOM.render(<h1>Hellen</h1>, ROOT);

let loader = new ImageDownloader();
// to json
let arrPersons = [
    // { url: './src/images/person2.png', x: 1, y: 4, evil: true, class: 'fighter', damage: 15, health: 50, id: 0 },
    // { url: './src/images/person3.png', x: 3, y: 1, evil: true, class: 'fighter', damage: 14, health: 50, id: 1 },
    // { url: './src/images/hola2.png', x: 3, y: essssssssssssssses4, evil: false, class: 'fighter', damage: 12, health: 50, id: 2 },
    // {
    //     url: "./src/images/person2.png",
    //     x: 0,
    //     y: 0,
    //     evil: true,
    //     class: "fighter",
    //     damage: 4,
    //     health: 50,
    //     id: 3,
    // },
    {
        url: "./src/images/vinny.png",
        x: 6,
        y: 2,
        evil: true,
        class: "archer",
        damage: 9,
        health: 50,
        id: 5,
    },
    // {
    //     url: "./src/images/person.jpg",
    //     x: 2,
    //     y: 2,
    //     evil: true,
    //     class: "fighter",
    //     damage: 4,
    //     health: 50,
    //     id: 4,
    // },
    {
        url: "./src/images/hola.png",
        x: 0,
        y: 2,
        evil: false,
        class: "archer",
        damage: 12,
        health: 50,
        id: 1,
    },
    // {
    //     url: "./src/images/hola2.png",
    //     x: 7,
    //     y: 1,
    //     evil: false,
    //     class: "fighter",
    //     damage: 12,
    //     health: 50,
    //     id: 0,
    // },
];

class Director {
    scene: any;
    ai: any;
    persController: any;
    constructor(loader, arrPersons) {
        this.ai = new Ai([]);
        this.scene = new Scene(loader, arrPersons, this.ai);

        this.ai.initScene(this.scene);
        this.start();
    }

    start() {
        let play = document.createElement("input");
        play.type = "button";
        play.classList.add("button");
        play.value = "Ход соперника";
        play.addEventListener("click", this.startAI);
        document.getElementById("scene").appendChild(play);
    }
    startAI = () => {
        this.ai.step();
    };
}
new Director(loader, arrPersons);
