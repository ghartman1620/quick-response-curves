

function changeCurveType() {
    console.log(this.value)
    switch (this.value){
        case "linear":
        case "quadratic":
            
            document.getElementById("y-intercept").value = 0;
            document.getElementById("intercept-val").innerHTML = 0;
            document.getElementById("slope").min = -5;
            document.getElementById("slope").max = 5;
            document.getElementById("slope").value = 1;
            document.getElementById("slope-val").innerHTML = 1;
            break;
        case "logit":
            
            document.getElementById("y-intercept").value = 0;
            document.getElementById("intercept-val").innerHTML = 0;
            document.getElementById("slope").min = -1;
            document.getElementById("slope").max = 1;
            document.getElementById("slope").value = 1/12;
            document.getElementById("slope-val").innerHTML = 1/12;
            
            
            break;
        case "logistic":
            
            
            document.getElementById("y-intercept").value = 0;
            document.getElementById("intercept-val").innerHTML = 0;
            document.getElementById("slope").min = -30;
            document.getElementById("slope").max = 30;
            document.getElementById("slope").value = -10;
            document.getElementById("slope-val").innerHTML = -10;
            break;
    }
    draw()
}
$('input[type=radio][name=curve-type]').change(changeCurveType);
$('input[type=range]').change(draw);
$('input[type=range][id=slope]').change(function(){
    document.getElementById("slope-val").innerHTML = this.value;
});
$('input[type=range][id=y-intercept]').change(function(){
    document.getElementById("intercept-val").innerHTML = this.value;
});
$('input[type=range][id=x-intercept]').change(function(){
    document.getElementById("x-intercept-val").innerHTML = this.value;
});


