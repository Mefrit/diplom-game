
import { DefaultMethodsStrategey } from "../lib/defaultMethods";

export class SecurityArcher extends DefaultMethodsStrategey {
    constructor(props: any) {
        super(props);
        // console.log("\n angry", props);

        this.unit = props.unit;
        // this.coordsEvil = { x: props.result.x, y: props.result.y };
    }
    // при оценке учитывать, что хотябы 1н лучник жив, чем больше лучников живо, 
    // тем выше приоритет стратегии
    start() {
        var near_archers = this.unit_collection.getAiArchers(),
            near_enemy = this.findNearestEnemies(this.unit);
        var near_archer = this.findNearestArchers(this.unit);
        var pos_security = {};
        // if (near_enemy.y >= this.unit.y) {
        // if (this.unit.y + 1 < 5 ) {
        pos_security.y = near_archer.y;
        // } else {
        //     pos_security.y = near_archer.y - 1;
        // }
        // }
        // if (near_enemy.x >= this.unit.x) {
        // alert(Math.abs(this.unit.x - near_archer.x));

        if (Math.abs(this.unit.x - near_archer.x) != 0 || Math.abs(this.unit.y - near_archer.y) != 0) {
            console.log("near_archer=> ", near_archer, Math.abs(this.unit.x - near_archer.x) != 0, "||", Math.abs(this.unit.y - near_archer.y) != 0);
            if (this.unit.x + 1 < 11) {
                pos_security.x = near_archer.x + 1;
            } else {
                pos_security.x = near_archer.x - 1;
            }
            // }
            console.log("pos_security => ", pos_security);
            var res = this.moveAutoStepStupid(this.unit, pos_security, "fighter");
            if (res.findEnime == true) {
                //атака , если лучник не далеко

                // console.log("\n\n", Math.abs(this.unit.x - near_archer.x), this.unit);
                if (Math.abs(this.unit.x - near_enemy.x) == 1) {
                    // запуск анимации атаки   
                    this.view.contactPersonsView(near_enemy.domPerson, near_enemy.image, this.unit.person.damage);

                    var checkArcherPosition = this.checkArcherPosition(near_enemy);
                    // только если олучник стреляет сделать то бишь на позиции
                    if (checkArcherPosition.result && !this.unit.moveAction) {
                        console.log("checkArcherPosition", checkArcherPosition);
                        this.moveAutoStepStupid(this.unit, checkArcherPosition.point, "fighter");
                    }
                } else {
                    // догоняем лучника
                    // this.moveAutoStepStupid(this.unit, pos_security, "fighter");
                }

            }
        }
        // this.findNearestEnemies(this.unit)
        // мы нашли ближайшего врага и лучника, следует двигаться к позиции стрельбы лучника, 
        // либо, как можно ближе к лучнику, что бы его защитить
        // console.log("get Nearest res=> ", res);
    }
}