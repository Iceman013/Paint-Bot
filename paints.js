var supplies = [
    new supply("Red Rock", 0),
    new supply("Shiny Yellow Metal", 1),
    new supply("Failed Mana Potions", 2),
    new supply("Bottled White", 3),
    new supply("Really Dark Gray", 4)
];
var paints = [
    new paint("red", 1, 1),
    new paint("yellow", 5, 0, 1),
    new paint("blue", 25, 0, 0, 1),
    new paint("white", 125, 0, 0, 0, 1),
    new paint("black", 625, 0, 0, 0, 0, 1),
    new paint("orange", 0, 1, 1),
    new paint("purple", 0, 1, 0, 1),
    new paint("green", 0, 0, 1, 1),
    new paint("light red", 0, 1, 0, 0, 1),
    new paint("light yellow", 0, 0, 1, 0, 1),
    new paint("light blue", 0, 0, 0, 1, 1),
    new paint("dark red", 0, 1, 0, 0, 0, 1),
    new paint("dark yellow", 0, 0, 1, 0, 0, 1),
    new paint("dark blue", 0, 0, 0, 1, 0, 1),
    new paint("gray", 0, 0, 0, 0, 1, 1)
];

function supply(name, position) {
    this.name = name;
    this.position = position;
    this.amount = 0;
    this.cost = function() {
        return Math.floor(paints[this.position].price/markup);
    }
    this.canBuy = function() {
        return this.cost() <= money;
    }
    this.buy = function() {
        if (this.canBuy()) {
            money = money - this.cost();
            this.amount = this.amount + 1;
            document.cookie = "money=" + money + "; expires=Thu, 7 Dec 2056 12:00:00 UTC;";
        }
    }
    this.use = function() {
        this.amount = this.amount - 1;
    }
}
function supTable() {
    this.elem = document.getElementById("store");
    this.values = [];
    this.check = function() {
        var tempV = [];
        tempV[0] = money;
        var a = 0;
        while (a < supplies.length) {
            tempV[a + 1] = supplies[a].amount;
            a = a + 1;
        }
        return tempV;
    }
    this.clear = function() {
        while (this.elem.firstChild) {
            this.elem.removeChild(this.elem.firstChild);
        }
    }
    this.build = function() {
        var drow = document.createElement("tr");
        var heads = ["Name","Amount","Cost","Buy"];
        var a = 0;
        while (a < heads.length) {
            var item = document.createElement("th");
            item.innerHTML = heads[a];
            drow.appendChild(item);
            a = a + 1;
        }
        this.elem.appendChild(drow);
        a = 0;
        while (a < supplies.length) {
            var row = document.createElement("tr");
            row.style.backgroundColor = brighten(paints[supplies[a].position].rgb());
            var name = document.createElement("th");
            name.innerHTML = supplies[a].name;
            var amo = document.createElement("td");
            amo.innerHTML = supplies[a].amount;
            var cos = document.createElement("td");
            cos.innerHTML = supplies[a].cost();
            var sup = document.createElement("button");
            sup.innerHTML = "Buy One";
            const tempSup = supplies[a];
            sup.addEventListener("click", function() {
                tempSup.buy();
            });

            row.appendChild(name);
            row.appendChild(amo);
            row.appendChild(cos);
            row.appendChild(sup);
            this.elem.appendChild(row);
            a = a + 1;
        }
    }
    this.update = function() {
        var a = 0;
        var next = false;
        var temp = this.check();
        while (a < temp.length && a < this.values.length) {
            if (temp[a] != this.values[a]) {
                next = true;
            }
            a = a + 1;
        }
        if (next) {
            this.clear();
            this.build();
            this.values = this.check();
        } else {
            this.values = this.check();
        }
    }
}
function paint(name, price, ...ingrediants) {
    this.name = name;
    this.colors = ingrediants;
    while (this.colors.length < supplies.length) {
        this.colors[this.colors.length] = 0;
    }
    this.price = price;
    this.value = 0;
    this.rgb = function() {
        return colorize(this.colors[0], this.colors[1], this.colors[2], this.colors[3], this.colors[4]);
    }
    this.increase = function(input) {
        this.value = this.value + input;
    }
    this.getValue = function() {
        return this.value;
    }
    this.getSupplies = function() {
        return this.colors;
    }
    this.mixes = function() {
        var a = 0;
        var mixes = 0;
        while (a < this.colors.length) {
            if (this.colors[a] != 0) {
                mixes = mixes + 1;
            }
            a = a + 1;
        }
        return mixes;
    }
    this.preqs = function() {
        var a = 0;
        var output = [];
        while (a < this.colors.length) {
            if (this.colors[a] != 0) {
                output[output.length] = paints[a];
            }
            a = a + 1;
        }
        return output;
    }
    this.updatePrice = function() {
        if (this.mixes() != 1) {
            this.price = 0;
            var temp = this.preqs();
            var a = 0;
            while (a < temp.length) {
                this.price = this.price + temp[a].price*mixup;
                a = a + 1;
            }
        }
    }
    this.use = function() {
        this.value = this.value - 1;
    }
    this.sellAll = function() {
        this.updatePrice();
        money = money + this.value*this.price;
        this.value = 0;
        document.cookie = "money=" + money + "; expires=Thu, 7 Dec 2056 12:00:00 UTC;";
    }
}
function table() {
    this.elem = document.getElementById("supply");
    this.values = [];
    this.clear = function() {
        while (this.elem.firstChild) {
            this.elem.removeChild(this.elem.firstChild);
        }
    }
    this.build = function() {
        var a = 0;
        while (a < paints.length) {
            this.values[a] = paints[a].value;
            var row = document.createElement("tr");
            row.style.backgroundColor = brighten(paints[a].rgb());
            var name = document.createElement("th");
            name.innerHTML = capitalize(paints[a].name);
            var supply = document.createElement("td");
            supply.innerHTML = paints[a].getValue();
            var seller = document.createElement("button");
            seller.innerHTML = "Sell All";
            const tempPaint = paints[a];
            seller.addEventListener("click", function() {
                tempPaint.sellAll();
            });

            row.appendChild(name);
            row.appendChild(supply);
            row.appendChild(seller);
            this.elem.appendChild(row);
            a = a + 1;
        }
    }
    this.update = function() {
        var a = 0;
        var next = false;
        while (a < paints.length) {
            if (paints[a].value != this.values[a]) {
                next = true;
            }
            a = a + 1;
        }
        if (next) {
            this.clear();
            this.build();
        }
    }
}