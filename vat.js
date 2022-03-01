var vats = [];
var i = 0;
while (i < paints.length) {
    vats[i] = new vat(paints[i]);
    i = i + 1;
}

function vat(paint) {
    const hold = this;
    this.paint = paint;
    this.busy = false;
    this.time = 10_000/TICK;
    this.count = 0;

    this.setTime = function(input) {
        this.time = input/TICK;
    }
    this.getTimeLeft = function() {
        if (this.count > this.time) {
            return 0;
        }
        return fixNumber((TICK/1000)*(this.time - this.count));
    }
    this.getName = function() {
        return this.paint.name;
    }

    var elem = document.createElement("div");
    elem.classList.add("vat");
    var titles = document.createElement("p");
    titles.innerHTML = capitalize(this.getName()) + " Mixer";
    var text = document.createElement("p");
    text.innerHTML = this.paint.name;
    var button = document.createElement("button");
    button.innerHTML = "Begin Mix";
    button.addEventListener("click", function() {
        this.disabled = true;
        hold.mix();
    });
    elem.appendChild(titles);
    elem.appendChild(text);
    elem.appendChild(button);
    this.update = function() {
        text.innerHTML = this.getTimeLeft();
        button.disabled = (this.busy || !this.canMix());
    }
    this.mix = function() {
        this.busy = true;
        if (this.paint.mixes() == 1) {
            var a = 0;
            while (a < supplies.length) {
                if (paints[supplies[a].position] == this.paint) {
                    supplies[a].use();
                }
                a = a + 1;
            }
        } else {
            var res = this.paint.preqs();
            var a = 0;
            while (a < res.length) {
                res[a].use();
                a = a + 1;
            }
        }
    }
    this.canMix = function() {
        var output = false;
        if (this.paint.mixes() == 1) {
            output = false;
            var a = 0;
            var pos = -1;
            while (a < paints.length) {
                if (this.paint == paints[a]) {
                    pos = a;
                }
                a = a + 1;
            }
            if (supplies[pos].amount > 0) {
                output = true;
            }
        } else {
            output = true;
            var res = this.paint.preqs();
            var a = 0;
            while (a < res.length) {
                if (res[a].getValue() < 1) {
                    output = false;
                }
                a = a + 1;
            }
        }
        return output;
    }
    this.tick = function() {        
        if (this.busy) {
            this.count = this.count + 1;
        }
        if (this.count >= this.time) {
            this.count = 0;
            this.busy = false;
            this.paint.increase(1);
        }
        this.update();
    }
    this.getElement = function() {
        return elem;
    }
}