import { FightIfYouCan } from "../strategies/angryIfcan";
import { AtackTheArcher } from "../strategies/atackTheArcher";
import { SecurityArcher } from "../strategies/sucurityArcher";

export class GlobalSTRDefaultMethods {
    constructor(props) {
        console.log("GlobalSTRDefaultMethods props", props);
        this.scene = props.scene;
        this.view = props.view;
        this.unit_collection = props.unit_collection;
    }
    assessment() {
        return 1;
    }
    startStr() {

    }
}