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

        person.setCoord(coord.x, coord.y);
        person.person.x = coord.x;
        person.person.y = coord.y;

        this.unit_collection.updateElement(person);
        console.log(this.unit_collection, person.person.x, person.person.y);
        this.scene.renderElement(person);

        //
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
        console.log("getNeighbors", this.deleteExcessCoord(res), coord);
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
        console.log(Math.abs(a.x - b.x) + Math.abs(a.y - b.y), a, b);
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    // автоматический путь к задангным координатам без учета возможных опасностей
    moveAutoStepStupid = (unit, coord, nearEnemie) => {
        // нужн окак то придумать, что бы можно было обходить препятствия и строить оптимальный путь
        let x = unit.person.x,
            y = unit.person.y,
            resEmptyArea = true;
        // хранит путь до точки

        let pointsNear;

        let current = { id: 0, x: unit.person.x, y: unit.person.y }, came_from = {},
            frontier: any = [],//граница
            cost_so_far = [],
            new_cost, priority, bestPoint;

        came_from[0] = NaN;
        cost_so_far[0] = 0;
        if (current.x == coord.x && current.y == coord.y) {
            alert("YES you see it");
        } else {
            console.log("unit", unit, unit.person.x, unit.person.y);
            pointsNear = this.getNeighbors({ x: unit.person.x, y: unit.person.y });
            console.log("pointsNear", pointsNear);
            pointsNear.forEach((next, index, arr) => {
                next.id = unit.person.x + unit.person.y + index;

                new_cost = cost_so_far[current.id] + 1;

                if (cost_so_far.indexOf(next.id) == -1 || new_cost < cost_so_far[next.id]) {
                    cost_so_far[next.id] = new_cost;
                    priority = this.heuristic({ x: nearEnemie.person.x, y: nearEnemie.person.y }, next);
                    // console.log(this.heuristic({ x: nearEnemie.person.x, y: nearEnemie.person.y }, next));
                    frontier.push({ next: next, priority: priority });
                    came_from[next.id] = current;
                }

                // if (this.checkCameFromEmpty(cameFrom, elem)) {
                // }
            });


        }
        console.log("frontier", frontier);
        bestPoint = frontier[0];
        frontier.forEach(element => {
            if (element.priority < bestPoint.priority) {
                bestPoint = element;
            }
        });
        console.log("bestPoint=> ", bestPoint);
        this.moveTo(unit, bestPoint.next)


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
