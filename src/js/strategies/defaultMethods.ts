export class DefaultMethodsStrategey {
    scene: any;
    unit_collection: any;
    constructor(props) {
        this.scene = props.scene;
        this.unit_collection = props.unit_collection;
    }
    // моментальный перевод
    moveTo(person, coord) {
        // тут нужна проаверка на лучшее место для удара
        person.setCoord(coord.x - 1, coord.y);
        this.unit_collection.updateElement(person);
        this.scene.renderElement(person);
        //
    }

    //указывает на лучшую  точку
    heuristic() {}
    deleteExcessCoord(cahceCoord = []) {
        return cahceCoord.filter((elem) => {
            if (elem.x >= 0 && elem.x <= 8) {
                if (elem.y >= 0 && elem.x <= 4) {
                    if (this.unit_collection.checkFreeCoord({ x: elem.x, y: elem.y })) {
                        return elem;
                    }
                }
            }
        });
    }
    getNeighbors(coord) {
        let res = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                res.push({ x: coord.x - i, y: coord.y - j });
            }
        }
        console.log(res);
        return this.deleteExcessCoord(res);
    }
    //проверка на то что эта точка новая
    checkCameFromEmpty(cameFrom, point) {
        let res = true;
        cameFrom.forEach((element) => {
            if (element.x == point.x && element.y == point.y) {
                res = false;
            }
        });
        return res;
    }
    getBetter
    // автоматический путь к задангным координатам без учета возможных опасностей
    moveAutoStepStupid(unit, coord) {
        // нужн окак то придумать, что бы можно было обходить препятствия и строить оптимальный путь
        let x = unit.person.x,
            y = unit.person.y,
            resEmptyArea = true;
        // хранит путь до точки
        let cameFrom = {};
        let pointsNear = this.getNeighbors({ x: unit.person.x, y: unit.person.y });
        console.log(" move Auto Step Stupid ", this.getNeighbors({ x: unit.person.x, y: unit.person.y }), {
            x: unit.person.x,
            y: unit.person.y,
        });
        pointsNear.forEach((elem) => {
            if (this.checkCameFromEmpty(cameFrom, elem)) {
            }
        });

        // while (true) {
        //     // this.unit_collection.getCollection().forEach((elem) => {
        //     //     if (elem.person.x != x) {
        //     //     }
        //     // });
        //     if (pointsNear.x.indexOf(unit.person.x) != -1 || pointsNear.y.indexOf(unit.person.y) != -1) {
        //         break;
        //     }
        //     console.log("while");
        // }
    }
}
