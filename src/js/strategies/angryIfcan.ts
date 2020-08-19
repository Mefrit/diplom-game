import { DefaultMethodsStrategey } from "./defaultMethods";

export class FightIfYouCan extends DefaultMethodsStrategey {
    unit: any;
    coordsEvil: any;
    constructor(props: any) {
        super(props);
        // console.log("\n angry", props);
        this.unit = props.unit;
        // this.coordsEvil = { x: props.result.x, y: props.result.y };
    }
    attackPerson() {
        // console.log("\n ataka coordsEvil=> ", this.coordsEvil);
        let nearEnemies = this.findNearestEnemies();

        this.moveAutoStepStupid(this.unit, { x: nearEnemies.person.x, y: nearEnemies.person.y }, nearEnemies);
    }
    findNearestEnemies() {
        let min = 1000,
            nearEnemies = undefined,
            tmp_x,
            tmp_y,
            tmp_min = 1000;
        this.unit_collection.getCollection().forEach((element) => {
            if (!element.person.evil) {
                console.log();

                tmp_x = this.unit.person.x - element.person.x;
                tmp_y = this.unit.person.y - element.person.y;

                tmp_min = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
                if (min > tmp_min) {
                    min = tmp_min;
                    nearEnemies = element;
                }
            }
        });
        return nearEnemies;
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
