$(function() {
    $("img.lazy").width(560);
    $("img.lazy").lazyload({
        effect : "fadeIn",
        event : "click"
    });
});

$(document).ready(function(){
    $("img.lazy").attr("src", "images/grey.gif");
});