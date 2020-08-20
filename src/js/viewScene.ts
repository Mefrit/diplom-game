export class ViewScene {
    arrObjPersons: any;
    constructor(arrObjPlayers) {
        this.arrObjPersons = arrObjPlayers;
    }

    renderPlayer = (cnvsElem, elem, img) => {
        let ctx;
        cnvsElem.style.position = "absolute";
        cnvsElem.classList.add("person");
        if (elem.evil) {
            cnvsElem.classList.add("ai");
        } else {
            cnvsElem.classList.add("players");
        }
        cnvsElem.setAttribute("data-image", elem.person.url);
        cnvsElem.setAttribute("data-id", elem.person.id);

        cnvsElem.style.top = elem.y * 120 + "px";
        cnvsElem.style.left = elem.x * 120 + "px";
        cnvsElem.style.width = 120 + "px";
        cnvsElem.style.height = 130 + "px";

        ctx = cnvsElem.getContext("2d");

        this.drawImage(ctx, img);
        this.drawHealth(ctx, elem);
        return cnvsElem;
    };
    renderElement = (element) => {

        element.domPerson.style.left = element.getX() * 120 + "px";
        element.domPerson.style.top = element.getY() * 120 + "px";
        // element.style.left = pos_dif_x + "px";
        // element.style.top = pos_dif_y + "px";
    };
    drawHealth = (ctx, elem, damage = 0) => {
        let obj;
        this.arrObjPersons.getCollection().forEach((elemCollection) => {
            if (elemCollection.getId() == elem.person.id) {
                obj = elemCollection;
            }
        });

        ctx.moveTo(20, 20);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        if (damage != 0) {
            if (obj.getHealth() > 10) {
                obj.setHealth(obj.getHealth() - damage);
            } else {
                ctx.strokeStyle = "red";
            }
        }
        ctx.lineTo(obj.getHealth() * 3, 20);
        ctx.stroke();
    };
    contactPersonsView = (canvas, img, damage = 5) => {
        let ctx = canvas.getContext("2d"),
            id;
        ctx.beginPath();
        ctx.clearRect(0, 0, 1000, 1000);
        this.drawImage(ctx, img);
        id = { id: canvas.getAttribute("data-id") };
        this.drawHealth(ctx, { person: id }, damage);
    };
    drawImage(ctx, img) {
        let width, height, coef;

        if (img.width > 200) {
            coef = 150 / parseFloat(img.width);
            width = img.width * coef;
            height = img.height * coef;
        } else {
            width = img.width;
            height = img.height;
        }

        ctx.drawImage(img, 0, 0, width + 150, height);
        return ctx;
    }
    clearPrev(canvas, loader) {
        let ctx = canvas.getContext("2d"),
            img,
            width;
        ctx.clearRect(0, 0, 1000, 1000);
        img = loader.get(canvas.getAttribute("data-image"));
        this.drawImage(ctx, img);
    }
    changePersonView(canvas, loader) {
        let ctx = canvas.getContext("2d"),
            id,
            img;

        ctx.fillStyle = "coral"; // меняем цвет рамки
        ctx.fillRect(0, 0, 1000, 1000);
        img = loader.get(canvas.getAttribute("data-image"));
        this.drawImage(ctx, img);
        id = { id: canvas.getAttribute("data-id") };
        this.drawHealth(ctx, { person: id });
    }
    showAvailabeMovies(canvas) {
        let posX = canvas.style.left.split("px")[0],
            posY = canvas.style.top.split("px")[0],
            arrBlocks: any = document.getElementsByClassName("sence__block"),
            radius,
            posXblock,
            posYblock;

        radius = Math.sqrt(posX * posX + posY * posY);
        arrBlocks = [].slice.call(arrBlocks);

        arrBlocks.forEach((element) => {
            posXblock = element.style.left.split("px")[0];
            posYblock = element.style.top.split("px")[0];
        });
    }
    renderBlockView(block, posX, posY, i, j) {
        block.setAttribute("data-coord", i + ";" + j);
        block.classList.add("sence__block");
        block.style.left = posX + "px";
        block.style.top = posY + "px";
        block.src = "src/images/block.png";
        return block;
    }
}
