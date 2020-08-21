import { AllHTMLAttributes } from "react";

export class DefaultMethodsStrategey {
    scene: any;
    view: any;
    unit_collection: any;
    constructor(props) {
        this.scene = props.scene;
        this.view = props.view;
        this.unit_collection = props.unit_collection;
    }
    // моментальный перевод
    moveTo(person, coord) {
        // тут нужна проаверка на лучшее место для удара

        person.setCoord(coord.x, coord.y);

        this.unit_collection.updateElement(person);

        this.scene.renderElement(person);

        //
    }
    findNearestEnemies(unit) {
        let min = 1000,
            nearEnemies = undefined,
            tmp_x,
            tmp_y,
            tmp_min = 1000;
        this.unit_collection.getCollection().forEach((element) => {
            if (!element.person.evil && !element.isDied()) {
                console.log();

                tmp_x = unit.person.x - element.person.x;
                tmp_y = unit.person.y - element.person.y;

                tmp_min = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
                if (min > tmp_min) {
                    min = tmp_min;
                    nearEnemies = element;
                }
            }
        });

        return nearEnemies;
    }
    //указывает на лучшую  точку
    deleteExcessCoord(cahceCoord = []) {

        return cahceCoord.filter((elem) => {

            if (elem.x >= 0 && elem.x <= 8) {
                if (elem.y >= 0 && elem.y <= 4) {
                    if (this.unit_collection.checkFreeCoord({ x: elem.x, y: elem.y })) {
                        return elem;
                    }
                }
            }
        });
    }
    getNeighbors = (coord) => {
        let res = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                res.push({ x: coord.x + i, y: coord.y + j });
            }
        }

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
    heuristic(a, b) {

        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    // автоматический путь к задангным координатам без учета возможных опасностей
    moveAutoStepStupid = (unit, enemie, type = "fighter") => {
        // нужн окак то придумать, что бы можно было обходить препятствия и строить оптимальный путь

        // хранит путь до точки

        let pointsNear, res = { findEnime: false, enemie: enemie, type: type };

        let current = { id: 0, x: unit.person.x, y: unit.person.y }, came_from = {},
            frontier: any = [],//граница
            cost_so_far = [],
            new_cost, priority, bestPoint, coefProximity = type == "archer" ? 1 : 2;

        came_from[0] = NaN;
        cost_so_far[0] = 0;
        if (this.checkEnemieNear(current, enemie, coefProximity)) {
            res.findEnime = true;
            console.log("checkEnemieNear=>>>>>>>>>>>>in ", type);
            return res;
        } else {

            pointsNear = this.getNeighbors({ x: unit.person.x, y: unit.person.y });

            pointsNear.forEach((next, index, arr) => {
                next.id = unit.person.x + unit.person.y + index;

                new_cost = cost_so_far[current.id] + 1;

                if (cost_so_far.indexOf(next.id) == -1 || new_cost < cost_so_far[next.id]) {
                    cost_so_far[next.id] = new_cost;
                    // priority = this.heuristic({ x: nearEnemie.person.x, y: nearEnemie.person.y }, next);
                    priority = this.heuristic({ x: enemie.x, y: enemie.y }, next);

                    frontier.push({ next: next, priority: priority });
                    came_from[next.id] = current;
                }

                // if (this.checkCameFromEmpty(cameFrom, elem)) {
                // }
            });
        }

        bestPoint = frontier[0];
        frontier.forEach(element => {

            if (element.priority < bestPoint.priority) {
                // что бы искал пути, конечно это не панацея в более сложных ситуация фигурка будет тупить
                if (type == "archer") {
                    bestPoint = element;
                } else {
                    if (unit.coordPrevPoint.x != element.next.x && unit.coordPrevPoint.y != element.next.y) {
                        bestPoint = element;
                    }
                }


            }
        });

        this.moveTo(unit, bestPoint.next);
        current = { id: 0, x: unit.person.x, y: unit.person.y }
        console.log("moveAutoStepStupid=>>>>>>>>>>>>in ", this.checkEnemieNear(current, enemie, coefProximity));

        res.findEnime = this.checkEnemieNear(current, enemie, coefProximity);

        return res;

    }
    checkEnemieNear(current, enemie, coefProximity) {

        return Math.abs(current.x - enemie.x) < coefProximity && Math.abs(current.y - enemie.y) < coefProximity
    }
    checkFreePoints(points, type = "fighter") {
        let res = { free: true, deleteLastPoint: false, runAway: false };
        this.unit_collection.getCollection().forEach((unit) => {
            for (let i = 0; i < points.length; i++) {

                if (unit.x == points[i].x && points[i].y == unit.y) {

                    if (!(type == "archer" && i == points.length - 1)) {
                        if (unit.person.evil) {
                            res.runAway = true;
                        }
                        res.free = false;

                    } else {
                        res.deleteLastPoint = true;
                    }

                }
            }


        });
        console.log("checkFreePoints", res);
        return res;
    }
}
