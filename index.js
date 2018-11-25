function radioChange() {
    console.log("Hello!");
}
// returns a function that, given a point,
// normalizes that point to 0-1 using min and max
// as bookends.
function normalizeFunction(min, max){
    let fn = (val) => {
        return (val-min)/(max-min);
    }
    return fn;
}

function draw() {

    // compile the expression once
    var radios = document.getElementsByName('curve-type');
    var curveType = "";
    // from https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            curveType = radios[i].value;

            break;
        }
    }
    
    var m = document.getElementById("slope").value;
    var b = document.getElementById("y-intercept").value;
    var c = document.getElementById("x-intercept").value;


    switch(curveType){
        case "linear":
            var expression = `${m} * (x) + ${b}`
            break;
        case "quadratic":
            var expression = `${b} + ${m} * (x-${c})^2`
            break;
        case "logit":
            var expression = `.5+log(x/(1-x))*${m}`
            break;
        case "logistic":
            // -10 allows the curve to approximately
            // change by value 1 over 0 to 1, and 5
            // is an offset that allows the curve
            // to have the same difference between 0 for x= 0 and
            // 1 for x=1
            var expression = `1/(1+e^(${m} (x - .5)))`
            break;

    }
    console.log(expression);
    const expr = math.compile(expression)
    // evaluate the expression repeatedly for different values of x
    const xValues = math.range(0, 1, 0.001).toArray()
    const yValues = xValues.map(function (x) {
        var result = expr.eval({x: x})
        if (result < 0) return 0
        if (result > 1) return 1

        return result
    })


    // render the plot using plotly
    const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter'
    }
    const data = [trace1]
    Plotly.newPlot('plot', data)
    var min = document.getElementById("minValue").value;
    var max = document.getElementById("maxValue").value;
    var evalPoint = document.getElementById("evaluate-x").value;
    
    var normalize = normalizeFunction(min, max);
    
    document.getElementById("eval-point").innerHTML = evalPoint;
    document.getElementById("eval-result").innerHTML = expr.eval({x: normalize(evalPoint)});
}

document.getElementById('form').onsubmit = function (event) {
    event.preventDefault()
    draw()
}

draw()