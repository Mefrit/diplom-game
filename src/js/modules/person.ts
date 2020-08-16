export class Person {
    person: any;
    chosePerson: boolean;
    arrImg: object[];
    canvas: any;
    moveAction: any;
    x: any;
    y: any;
    domPerson: any;
    constructor(person) {
        this.person = person;
        this.x = person.x;
        this.y = person.y;
        this.moveAction = false;
        this.domPerson = undefined;
    }
    initDomPerson(domPerson) {
        this.domPerson = domPerson;
    }
    setHealth(value) {
        this.person.health = parseInt(value);
    }
    getHealth() {
        return parseInt(this.person.health);
    }
    getUrl() {
        return this.person.url;
    }
    getId() {
        return this.person.id;
    }
    getKind() {
        return this.person.evil;
    }
    setCoord = (x: number, y: number) => {
        this.x = x;
        this.y = y;
    }
    getX() {
        return parseFloat(this.x);
    }
    getY() {
        return parseFloat(this.y);
    }
    getHeight() {
        return parseFloat(this.person.height);
    }
    getWidth() {
        return parseFloat(this.person.width);
    }
    getMoveAction() {
        return this.moveAction;
    }
    setMoveAction(value) {
        this.moveAction = value;
    }
}
