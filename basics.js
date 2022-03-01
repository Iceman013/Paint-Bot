/*
 * Converts sets of 1s and 0s
 */
function ryb(...ryb) {
    var values = [0,0,0];
    var colors = [
        [
            [
                [1,1,1],
                [0.163,0.373,0.6]
            ],
            [
                [1,1,0],
                [0,0.66,0.2]
            ]
        ],
        [
            [
                [1,0,0],
                [0.5,0,0.5]
            ],
            [
                [1,0.5,0],
                [0.2,0.094,0]
            ]
        ]
    ];
    var a = 0;
    while (a < values.length) {
        values[a] = colors[ryb[0]][ryb[1]][ryb[2]][a];
        a = a + 1;
    }
    return values;
}
function colorize(r, y, b, w, k) {
    var colors = ryb(r, y, b);
    var outputs = [0,0,0];
    var a = 0;
    while (a < outputs.length) {
        outputs[a] = ((r+y+b+w)/(r+y+b+k))*Math.floor(255*colors[a]);
        a = a + 1;
    }
    return "rgba(" + outputs[0] + "," + outputs[1] + "," + outputs[2] + ",1)";
}
function brighten(input) {
    return input.substring(0, input.length - 2) + "0.5)"
}
function fixNumber(input) {
    var abs = ["", "K", "M", "B", "T", "q", "Q"];
    var output = 0;
    var pos = 0;
    output = input;
    while (output/1000 >= 1) {
        output = output/1000;
        pos = pos + 1;
    }
    var ns = Math.pow(10, NUMSIZE - Math.floor(Math.log10(output)) - 1);
    output = Math.floor(output*ns)/ns;
    var end;
    if (pos >= abs.length) {
        end = "x10^(" + (3*pos + 1).toString() + ")";
    } else {
        end = abs[pos];
    }
    return output.toString() + end;
}
function capitalize(input) {
    var output = input[0].toUpperCase() +input.substring(1);
    return output;
}