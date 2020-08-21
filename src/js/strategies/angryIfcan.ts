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
        let nearEnemie = this.findNearestEnemies(this.unit), coord, res, attakedEnemie;
        coord = { x: nearEnemie.person.x, y: nearEnemie.person.y };
        res = this.moveAutoStepStupid(this.unit, nearEnemie, "fighter");
        console.log(res);
        if (res.findEnime == true) {
            attakedEnemie = this.findEnemieForAtake(res.enemie);
            // запуск анимации атаки
            this.view.contactPersonsView(res.enemie.domPerson, res.enemie.image, this.unit.person.damage);
            console.log(res.enemie, this.view);
        }

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
