import { MoveRandomPerson } from "../strategies/move";
import { FightIfYouCan } from "../strategies/angryIfcan";
import { AtackTheArcher } from "../strategies/atackTheArcher";

export class Ai {
    arrOwnPerson: any;
    arrAllPersons: any;
    unit_collection: any;
    syncUnit: any;
    cache_coord_bots: any;
    view: any;
    // обьект для рендера элементов
    scene: any;
    constructor(arrAllPersons) {
        // this.arrAllPersons = arrAllPersons;
        // this.arrOwnPerson = arrAllPersons.filter(elem => {
        //     if (elem.evil) {
        //         return elem;
        //     }
        this.scene = {};
        //тут храняться занятые координаты( то бишь, что бы не на 1 клетку ходили )\
        this.cache_coord_bots = [];
        this.syncUnit = function () {
            console.log("default");
        };
    }
    initPersons = (unit_collection, syncUnit) => {
        this.unit_collection = unit_collection;
        this.syncUnit = syncUnit;
    };
    initView(view) {
        this.view = view;
    }
    initScene = (scene) => {
        console.log("initScene", scene);
        this.scene = scene;
    };
    getCoord(coord) {
        return parseInt(coord.split("px")[0]);
    }
    randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    getUnitObj(id) {
        let unit,
            data = this.unit_collection.getCollection();

        for (let i = 0; i < data.length; i++) {
            if (data[i].person.id == id) {
                unit = data[i];
                break;
            }
        }

        return unit;
    }
    changeLocation(element, x = -1, y = -1) {
        let posDifX = x,
            posDifY = y,
            elemX = element.getX() * 120,
            elemY = element.getY() * 120,
            unit;

        if (x == -1 && y == -1) {
            while (true) {
                posDifX = this.randomInteger(-2, 2);
                posDifY = this.randomInteger(-2, 2);

                if (elemX + posDifX * 120 < 1080 && elemY + posDifY * 120 < 600) {
                    if (elemY + posDifY * 120 >= 0 && elemX + posDifX * 120 >= 0) {
                        posDifX = elemX / 120 + posDifX;
                        posDifY = elemY / 120 + posDifY;
                        // console.log("old position => ", element, "to new pos ", posDifX, posDifY);
                        if (this.checkFreeLocation(posDifX, posDifY)) {
                            element.setCoord(posDifX, posDifY);
                            this.unit_collection.updateElement(element);
                            break;
                        }
                    }
                }
            }
        } else {
            unit = this.getUnitObj(element.getAttribute("data-id"));
            x = elemX / 120 + x;
            y = elemY / 120 + y;
            unit.setCoord(x, y);
        }

        posDifX *= 120;
        posDifY *= 120;
        console.log("Find enemies move", posDifX, posDifY);
        this.scene.renderElement(element);
        // element.style.left = posDifX + "px";
        // element.style.top = posDifY + "px";
    }
    checkFreeLocation(posDifX, posDifY) {
        let arr = this.unit_collection.getCollection(),
            res = true;

        arr.forEach((elem) => {
            if (elem.getX() == posDifX && elem.getY() == posDifY) {
                // console.log("checkFreeLocation false", arr, posDifX, posDifY);
                console.log("checkFreeLocation elem", elem.getX(), "=", posDifX, elem.getY(), "=", posDifY);
                res = false;
            }
        });
        console.log("checkFreeLocation true", posDifX, posDifY, arr);
        return res;
    }
    getCoordinateEnemies() {
        let enemies = [].slice.call(document.getElementsByClassName("players"));
    }
    exploreArea = (enemieAi) => {
        let x = enemieAi.getY(),
            y = enemieAi.getY();
        let arrX = [x - 2, x - 1, x, x + 1, x + 2],
            arrY = [y - 2, y - 1, y, y + 1, y + 2],
            user_persons = this.unit_collection.getUserCollection(),
            enemieCoordX = -1,
            enemieCoordY = -1,
            result = { result: false, x: -1, y: -1 },
            cacheEvil = [];
        user_persons.forEach((elem) => {
            enemieCoordX = arrX.indexOf(elem.getX());
            enemieCoordY = arrY.indexOf(elem.getY());

            // console.log("exploreArea", enemieCoordX != -1 && enemieCoordY != -1, elem.person.id != enemieAi.person.id);

            if (enemieCoordX != -1 && enemieCoordY != -1) {
                if (elem.person.id != enemieAi.person.id) {
                    // console.log("return find enemies!!!", arrX, arrY, elem);
                    cacheEvil.push(elem);
                    result = { result: true, x: enemieCoordX, y: enemieCoordY };
                }
            }
        });
        return result;
    };
    stepAi(res, unit) {
        setTimeout(() => {
            let obj;
            unit.moveAction = false;
            if (unit.person.class == "fighter") {
                obj = new FightIfYouCan({
                    unit: unit,
                    result: res,
                    scene: this.scene,
                    unit_collection: this.unit_collection,
                    view: this.view
                });
                obj.attackPerson();
            } else {
                obj = new AtackTheArcher({
                    unit: unit,
                    result: res,
                    scene: this.scene,
                    unit_collection: this.unit_collection,
                    view: this.view
                });
                obj.start();
            }
        }, 100)

        // } else {
        //     // рандомный ход
        //     this.changeLocation(person);
        // }
    }
    step = () => {
        let posDifX, posDifY, res;

        this.unit_collection.getCollection().forEach((element) => {

            if (element.person.evil && element.person.health > 12) {
                this.stepAi(res, element);
            }
            // this.changeLocation(element, res.x, res.y);
        });
        this.syncUnit(this.unit_collection);
    };
}
