// 判断是否已过期
var end = new Date("2016-12-31 23:23:59"), now = new Date();
var c = now.getTime() - end.getTime();

if (c >= 0) {
    
    $(".bg")[0].src = "./files/end.png";
    $(".bg")[0].style.zIndex = 100;

} else {

    var $rulerbox = $(".ruler-box");

    $(".ruler").click(function(event) {
        $rulerbox[0].style.display = "block";
    });

    $(".close").click(function(event) {
        $rulerbox[0].style.display = "none";
    });
}

setTimeout(function(){
    location.href = "native://menu?data=[]";
}, 500);