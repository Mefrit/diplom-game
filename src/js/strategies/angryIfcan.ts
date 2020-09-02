import { DefaultMethodsStrategey } from "./defaultMethods";

export class FightIfYouCan extends DefaultMethodsStrategey {
    unit: any;
    coordsEvil: any;
    view: any
    constructor(props: any) {
        super(props);
        // console.log("\n angry", props);

        this.unit = props.unit;
        // this.coordsEvil = { x: props.result.x, y: props.result.y };
    }
    attackPerson() {
        let nearEnemie = this.findNearestEnemies(this.unit), coord, res, attakedEnemie, checkArcherPosition;
        coord = { x: nearEnemie.person.x, y: nearEnemie.person.y };
        res = this.moveAutoStepStupid(this.unit, nearEnemie, "fighter");

        if (res.findEnime == true) {
            attakedEnemie = this.findEnemieForAtake(res.enemie);
            // запуск анимации атаки
            this.view.contactPersonsView(res.enemie.domPerson, res.enemie.image, this.unit.person.damage);
            console.log(res.enemie, this.view);
            checkArcherPosition = this.checkArcherPosition(res.enemie);
            // только если олучник стреляет сделать то бишь на позиции
            if (checkArcherPosition.result && !this.unit.moveAction) {
                console.log("checkArcherPosition", checkArcherPosition)
                this.moveAutoStepStupid(this.unit, checkArcherPosition.point, "fighter");
            }
        }
    }
    checkArcherPosition(enemie) {
        // провеяет что бы персонаж старался не находиться на линии удара лучника если атакуеть
        let res = { point: {}, result: false }
        if (Math.abs(enemie.x - this.unit.x) < 2) {

            if (this.checkFreePoints({ x: enemie.x, y: enemie.y - 1 })) {
                res.result = true;
                res.point = { x: enemie.x, y: enemie.y - 1 }
                return res;
            }
            if (this.checkFreePoints({ x: enemie.x, y: enemie.y + 1 })) {
                res.result = true;
                res.point = { x: enemie.x, y: enemie.y + 1 }
                return res;
            }
        } else {
            if (Math.abs(enemie.y - this.unit.y) < 2) {
                if (this.checkFreePoints({ x: enemie.x - 1, y: enemie.y })) {
                    res.result = true;

                    res.point = { x: enemie.x - 1, y: enemie.y }
                    return res;
                }
                if (this.checkFreePoints({ x: enemie.x + 1, y: enemie.y })) {
                    res.result = true;
                    res.point = { x: enemie.x + 1, y: enemie.y }
                    return res;
                }
            }
        }

        return res;
    }
    findEnemieForAtake(enemie) {
        // !!! можно тут прописать на проверку более круттого выбора кого бить
        // this.unit_collection.getCollection().forEach((element) => {
        // }
        return enemie;
    }

    findEnemies() {
        let cacheEnimies = [];
        this.unit_collection.getCollection().forEach((element) => {
            if (!element.person.evil) {
                cacheEnimies.push(element);
            }
        });
        return cacheEnimies;
    }
}
