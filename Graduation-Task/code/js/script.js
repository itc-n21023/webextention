$(".openbtn").click(function () {
    $(this).toggleClass('active');
    $("#g-nav").toggleClass('panelactive');
    $(".circle-bg").toggleClass('circleactive');
});

$("#g-nav a").click(function () {
    $(".openbtn").removeClass('active');
    $("#g-nav").removeClass('panelactive');
    $(".circle-bg").removeClass('circleactive');
});

$('#g-nav a,#footer a').click(function () {

    var elmHash = $(this).attr('href');
    $(elmHash).css("position", "relative");
    var pos = $(elmHash).offset().top;
    $(elmHash).css("position", "sticky");
    $('body,html').animate({ scrollTop: pos }, 500);
    return false;

});

function fadeAnime() {


    $('.smoothTrigger').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('smooth');
        } else {
            $(this).removeClass('smooth');
        }
    });
}


function SmoothTextAnime() {
    $('.smoothTextTrigger').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('smoothTextAppear');
        } else {
            $(this).removeClass('smoothTextAppear');
        }
    });
}

var unit = 100,
    canvasList,
    info = {},
    colorList;

function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#fff', '#fff', '#fff', '#fff', '#fff']);

    for (var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth;
        canvas.height = 200;
        canvas.contextCache = canvas.getContext("2d");
    }
    update();
}

function update() {
    for (var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        draw(canvas, colorList[canvasIndex]);
    }

    info.seconds = info.seconds + .014;
    info.t = info.seconds * Math.PI;

    setTimeout(update, 35);
}

function draw(canvas, color) {
    var context = canvas.contextCache;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawWave(canvas, color[0], 0.5, 3, 0);
    drawWave(canvas, color[1], 0.8, 4, 0);
    drawWave(canvas, color[2], 0.5, 1.6, 0);
    drawWave(canvas, color[3], 0.8, 3, 100);
    drawWave(canvas, color[4], 0.5, 1.6, 250);
}


function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.globalAlpha = alpha;
    context.beginPath();
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.stroke();
}

function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height / 2);
    var yAxis = 0;
    var context = canvas.contextCache;
    var x = t;
    var y = Math.sin(x) / zoom;
    context.moveTo(yAxis, unit * y + xAxis);

    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 3;
        context.lineTo(i, unit * y + xAxis);
    }
}

init();


function particleTextAnime() {

    $("#particle").particleText({
        text: "A l l ' e s t r o",
        colors: ["#000"],
        speed: "middle",
    });
}

$(window).scroll(function () {
    fadeAnime();
    SmoothTextAnime();
    VivusAnime();
});

$(window).on('load', function () {
    $("#splash-logo").delay(1200).fadeOut('slow');

    $("#splash").delay(1500).fadeOut('slow', function () {
        $('body').addClass('appear');
        VivusInit();
        VivusAnime();
    });

    $('.splashbg').on('animationend', function () {
        fadeAnime();
        SmoothTextAnime();
        particleTextAnime();
    });


});

let search = document.querySelector(`input[name='search']`);
let submit = document.querySelector(`input[name='submit']`);

// いずれかのキーが離された時
search.addEventListener('keyup', () => {
    document.querySelector(`#output1`).innerHTML = search.value;
});

// Enterキーが押された時
search.addEventListener('change', () => {
    document.querySelector(`#output2`).innerHTML = search.value;
});

// submitボタンが押された時
submit.addEventListener('click', () => {
    document.querySelector(`#output3`).innerHTML = search.value;
});

