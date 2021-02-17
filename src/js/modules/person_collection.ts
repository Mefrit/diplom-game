import { Person } from "./person";
export class Collection {
    collection: any;
    constructor(data) {
        this.collection = data.map((elem) => {
            return new Person(elem);
        });

        console.log("this.collection ", this.collection);
    }
    getCollection() {
        return this.collection;
    }
    checkFreeCoord(coord) {
        let res = true;
        this.collection.forEach((element) => {
            if (element.x == coord.x && element.y == coord.y) {
                res = false;
            }
        });
        return res;
    }
    getAiCollection() {
        return this.collection.filter((elem) => {
            if (elem.person.evil) {
                return elem;
            }
        });
    }
    getUserCollection() {
        return this.collection.filter((elem) => {
            if (!elem.person.evil) {
                return elem;
            }
        });
    }
    getAiArchers() {
        return this.collection.filter((elem) => {
            if (elem.person.evil && elem.person.class == 'archer') {
                return elem;
            }
        });
    }
    updateElement(unit) {
        this.collection = this.collection.map((elem) => {
            if (unit.getId() == elem.getId()) {
                return unit;
            } else {
                return elem;
            }
        });
    }
}
