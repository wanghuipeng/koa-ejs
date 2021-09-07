//移动端navbar dropdown的逻辑
$("#mobile-nav-control").on("click", function(e) {
    if ($(this).hasClass('hide')) {
        $("#mobile-navbar").css("max-height", $(window).height() - $("#mobile-top").height()).slideDown(50, function() {
            var index = 0,
                max = $("#mobile-navbar li").size();
            fd = setInterval(function() {
                if (index >= max)
                    clearInterval(fd);
                $("#mobile-navbar li").eq(index).removeClass("ready");
                index++;
            }, 80);
        });
    } else {
        clearInterval(fd);
        $("#mobile-navbar").slideUp(100, function() {
            $("#mobile-navbar li").addClass("ready");
        });
    }
    $(this).toggleClass('hide show');
    e.stopPropagation();
});

$(".solution-mobile").css({
    // "width":"90%",
    "border-bottom": "none"
});
$(".merchants").css("border-top", "1px solid rgba(255, 255, 255, 0.3)");
//
// $(".menu-click").css({
//     "margin-left":0
// });

$(".solution-dropDown-mobile").hide();
$(".menu-child").hide();

$(".menu-click").click(function(e) {
    e.preventDefault();
    $(".solution-dropDown-mobile").toggle();
    $(".menu-click .control").find("img").toggleClass("hide show");

});

$(".menu-title").each(function(index, item) {
    $(item).click(function(e) {
        e.preventDefault();
        $(item).next(".menu-child").toggle("hide show");
        // $(".control").eq(index).find("img").toggleClass("show hide");
        $(item).find(".control").find("img").toggleClass("hide show");
    });
});



$(".product-menu-mobile").click(function(e) {
    // e.preventDefault();
    $(".product-menu-mobile .control>img").toggleClass("show hide");
    $(".product-dropdown").toggle();
});

$(".cube").each(function(index, item) {
    $(item).hover(function(e) {
        $(this).children(".right-alert").show().animate({ "left": "-130px", "width": "130px" }, 100);
    }, function(e) {
        $(this).children(".right-alert").animate({ "left": "0px", "width": "0px" }, 100, function() {
            $(this).hide();
        });
    });
});

$("#righter-control").on("click", function() {
    var self = this;
    $(this).addClass("animating");
    if ($(this).hasClass("pinelhide")) {
        $(".visiblecubes").slideDown(200, function() {
            $(self).removeClass("animating");
        });
    } else {
        $(".visiblecubes").slideUp(200, function() {
            $(self).removeClass("animating");
        });
    }
    $(this).toggleClass("pinelhide pinelshow");
});



if (window.location.pathname === '/news/') {
    $(".navli-news").addClass('active');
}

if (window.location.search.slice(0, 4) === '?cat') {
    var $small = $(".breadcrumbs>small");
    var $a = $(".breadcrumbs>a");


    if ($a.length > 2) {
        $small.eq(1).text(">");
    } else {
        $small.eq($small.length - 1).empty();
    }

}

// console.log($(".widget_categories li.current-cat>a").attr("href").slice(0));

// $(".widget_categories .cat-item").each(function(index,item){
//     $(item).click(function(e){
//         console.log($(this).find("a").text());
//         $(".nav-text").text($(this).find("a").text());
//     });
// });

$(".widget_categories .cat-item").each(function(index, item) {

    // console.log($(item).hasClass("current-cat"));
    if ($(item).hasClass("current-cat")) {
        $(".nav-text").text($(item).find("a").text());
    }

});