import { Person } from "./person";
import { ViewScene } from "../viewScene";
import { Collection } from "./person_collection";
export class Scene {
    loader: any;
    canvas: any;
    ai: any;
    arrImg: object[];
    collectionPersons: any;
    chosePerson: boolean;
    curentPerson: any;
    view: any;
    constructor(loader, arrImg, ai) {
        this.loader = loader;
        this.chosePerson = false;

        this.collectionPersons = new Collection(arrImg);
        //  arrImg.map(elem => {
        //     return new Person(elem);
        // });
        this.view = new ViewScene(this.collectionPersons);
        this.curentPerson = undefined;

        this.ai = ai;
        this.ai.initView(this.view);
        this.ai.initPersons(this.collectionPersons, this.syncUnit);
        this.play();
    }
    getCoordFromStyle(elem) {
        return parseInt(elem.split("px")[0]);
    }
    getPerson() {
        return this.collectionPersons;
    }
    onBlock = (event) => {
        let block = event.target,
            posX,
            posY;
        if (this.canvas != undefined) {
            posX = Math.abs(parseInt(this.canvas.style.left.split("px")[0]) - this.getCoordFromStyle(block.style.left));
            posY = Math.abs(parseInt(this.canvas.style.top.split("px")[0]) - this.getCoordFromStyle(block.style.top));
            // let coord_block = document.createElement("h1");
            // coord_block.innerText = "x:" + block.style.left + " y:" + block.style.top;
            document.getElementById("block_information").innerHTML =
                "<h1>x:" +
                this.getCoordFromStyle(block.style.left) / 120 +
                " y:" +
                this.getCoordFromStyle(block.style.top) / 120 +
                "</h1>";

            if (posX < 190 && posY < 190) {
                block.classList.add("block__free");
            } else {
                block.classList.add("block__nonFree");
            }
        }
    };
    syncUnit = (data) => {
        this.collectionPersons = data;
    };
    onOutBlock = (event) => {
        event.target.classList.remove("block__free");
        event.target.classList.remove("block__nonFree");
    };
    onMove = (event) => {
        let posX = event.target.style.left,
            posY = event.target.style.top,
            activePerson = [];
        //условие что можно ходить в область

        if (true) {
            this.canvas.style.left = parseInt(posX.split("px")[0]) + 18 + "px";
            this.canvas.style.top = posY;
        }
        activePerson = this.collectionPersons.getCollection().filter((elem: any) => {
            if (elem.getId() == this.canvas.getAttribute("data-id")) {
                elem.setCoord(parseInt(posX.split("px")) / 120, parseInt(posY.split("px")) / 120);

                elem.setMoveAction(true);
            }
            if (!elem.getMoveAction() && !elem.getKind()) {
                return elem;
            }
        });
        if (activePerson.length == 0) {
            // optimizase
            this.collectionPersons.getCollection().forEach((elem: any) => {
                if (!elem.getKind()) {
                    elem.setMoveAction(false);
                }
            });
            setTimeout(() => {
                this.ai.step();
            }, 200);
        }
    };
    renderElement(element) {
        this.view.renderElement(element);
    }
    renderArena() {
        let scence = document.getElementById("scene"),
            block,
            posX = 0,
            posY = 0;
        for (let j = 0; j < 6; j++) {
            for (let i = 0; i < 11; i++) {
                block = document.createElement("img");
                block.addEventListener("mouseout", this.onOutBlock);
                block.addEventListener("mouseover", this.onBlock);
                block.addEventListener("click", this.onMove);
                block = this.view.renderBlockView(block, posX, posY, i, j);
                scence.appendChild(block);
                posX += 120;
            }
            posX = 0;
            posY += 120;
        }
    }
    setAIperson() { }
    play() {
        this.renderArena();

        this.loader.load(this.collectionPersons);
        this.loader.onReady(() => {
            this.collectionPersons.collection.forEach((elem: any) => {
                let img = this.loader.get(elem.person.url);
                let cnvsElem = document.createElement("canvas");
                cnvsElem = this.view.renderPlayer(cnvsElem, elem, img);

                if (!elem.person.evil) {
                    cnvsElem.onclick = this.onChangePerson;
                } else {
                    cnvsElem.onclick = this.contactPersons;
                }
                elem.initDomPerson(cnvsElem);
                // когда будем делать графику будет сложнее, тк от этого аподхода придется избавиться
                elem.initImage(img);
                document.getElementById("scene").appendChild(cnvsElem);
            });
        });
    }
    contactPersons = (event) => {
        let canvas = event.target,
            img = this.loader.get(event.target.getAttribute("data-image"));
        this.view.contactPersonsView(canvas, img);
        // setTimeout(() => {
        //     this.ai.step();
        // }, 200);
    };
    onChangePerson = (event) => {
        let canvas = event.target;

        if (this.canvas != undefined) {
            this.view.clearPrev(this.canvas, this.loader);
        }
        this.chosePerson = true;

        this.view.changePersonView(canvas, this.loader);

        this.canvas = canvas;

        this.view.showAvailabeMovies(this.canvas);
    };
    renderAiPerson() { }
}
