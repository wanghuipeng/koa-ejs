(function() {

    $("#new-righter .close-icon").click(function() {
        $("#new-righter").hide();
    })
    var mobileinitflag = 0,
        pcinitflag = 0;

    var Storage = (function() {
        'use strict';
        return {
            get: function(key) {
                // if(store.local.get(key))
                return store.local.get(key);
                // else
                // return Cookie.get(key)
            },
            set: function(key, value) {
                store.local.set(key, value);
                // Cookie.set(key,value,10*365)
            },
            remove: function(key) {
                store.local.remove(key);
                // Cookie.remove(key)
            },
            clear: function() {
                store.local.clearAll();
                // Cookie.clear();
            }
        }
    })();

    var utmstrings = "";

    var query = window.location.search.substring(1);
    var params = query.split('&');

    for (var i = 0; i < params.length; i++) {
        var pos = params[i].indexOf('=');
        if (pos > 0) {
            var key = params[i].substring(0, pos);
            var value = params[i].substring(pos + 1);
            if (key == "utm_source" || key == "utm_term_keyword" || key == "utm_campaign" || key == "utm_medium" || key == "utm_term" || key == "utm_content" || key == "utm_plan") {
                utmstrings = decodeURI(value);
                $.cookie(key, utmstrings, { expires: 365, path: '/' });
            }
            if (key == "utm_source") {
                $.cookie('landingPage', window.location.href, { path: '/' });
            }
        }
    }

    window.Storage = Storage;

    function initPC() {
        if (pcinitflag)
            return;
    }

    function initMobile() {

        if (mobileinitflag)
            return;

        mobileinitflag = 1;

    }

    $(function() {
        'use strict';

        // $(window).resize(function(){
        //     var currentWidth = $(window).width();
        //     //Mobile
        //     if( currentWidth < windowbreakpoint ){
        //
        //         // $("html").css("font-size",Math.pow(currentWidth/windowbreakpoint,0.4)*100 +"%");
        //         initMobile();
        //
        //         //PC
        //     }else{
        //         $("html").css("font-size","100%");
        //         initPC();
        //     }
        // })
        // $(window).resize();

    });

    var catpoint = getParam("name") || "";

    if (catpoint != "") {
        $("." + catpoint).parent().addClass("action");
        $("." + catpoint).parents(".navli").addClass("active");
    }


    function getParam(paramName) {
        paramValue = "", isFound = !1;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
            arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    }

    //header 登录菜单dropdown切换
    $("#login").hover(function() {
        $(".dropdown-container").toggle();
    });

    // $("#solution-menu").hover(function(){
    //     $(".solution-dropDown").toggle(0);
    // });

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

    // $("body > *").on("click",function(e){
    //     if($("#mobile-nav-control").hasClass("show")){
    //         clearInterval(fd);
    //         $("#mobile-navbar").slideUp(100,function(){
    //             $("#mobile-navbar li").addClass("ready");
    //         });
    //         $("#mobile-nav-control").toggleClass('hide show');
    //     }
    // });

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
        if ($(this).hasClass("hide")) {
            $(".visiblecubes").slideDown(200, function() {
                $(self).removeClass("animating");
            });
        } else {
            $(".visiblecubes").slideUp(200, function() {
                $(self).removeClass("animating");
            });
        }
        $(this).toggleClass("hide show");
    })

    // $("#mobile-navbar").css("height","31rem");
    // $(".leapCloud-header-mobile #mobile-login-buttons").css("bottom","10%");
    $(".solution-mobile").css({
        // "width":"90%",
        "border-bottom": "none"
    });
    $(".merchants").css("border-top", "1px solid rgba(255, 255, 255, 0.3)");
    //
    // $(".menu-click").css({
    //     "margin-left":0
    // });

    // $(".solution-dropDown-mobile").hide();

    $(".menu-click").click(function(e) {
        e.preventDefault();
        $(".solution-dropDown-mobile").slideToggle();
        $(".menu-click .control").find("img").toggleClass("hide show");

        // if($(".solution-dropDown-mobile").css("display") == "none"){
        //     $("#mobile-navbar").css("height","22rem");
        //     $(".leapCloud-header-mobile #mobile-login-buttons").css("bottom","50%");
        // }else{
        //     $("#mobile-navbar").css("height","31rem");
        //     $(".leapCloud-header-mobile #mobile-login-buttons").css("bottom","5%");
        // }
    });

    var jq_dropMenuBtns = $(".dropMenu-toggle__btn")
    var jq_dropMenuViews = $('.dropMenu-toggle__view')
    jq_dropMenuBtns.on('click', function() {
        var jq_self = $(this)
        var siblingsView = jq_self.siblings('.dropMenu-toggle__view')

        if (!siblingsView.is(':visible')) {
            // 找到已显示的 menuView, 将其关闭. 并切换剪头
            var visibleViwe = jq_dropMenuViews.filter(':visible')
            visibleViwe.siblings('.dropMenu-toggle__btn').find('img').toggleClass("hide show")
            visibleViwe.slideUp()
        }
        jq_self.find('img').toggleClass("hide show")
        jq_self.addClass('.active')
        siblingsView.slideToggle()
    })

    $(".menu-title").each(function(index, item) {
        $(item).click(function(e) {
            e.preventDefault();
            $(item).next(".menu-child").toggle("hide show");
            // $(".control").eq(index).find("img").toggleClass("show hide");
            $(item).find(".control").find("img").toggleClass("hide show");
        });
    });

    // if($(".solution-dropDown-mobile").css("display") == "none"){
    //     // console.log(1);
    //     $("#mobile-navbar").css("height","22rem");
    //     // console.log(2);
    // }

    $(".product-menu-mobile").click(function(e) {
        // e.preventDefault();
        $(".product-menu-mobile .control>img").toggleClass("show hide");
        $(".product-dropdown").toggle();
    });

    //
    var $w = document.body.clientWidth;
    if ($w == 768) {

    }


    document.addEventListener("DOMContentLoaded", function() {
        if (window.devicePixelRatio === void 0 || window.devicePixelRatio < 2) return;
        document.querySelectorAll("img[srclarge]").forEach(img => {
            img.onload = function() {
                img.onload = null;
                img.width = img.width;
                img.height = img.height;
                let x2src = img.getAttribute("srclarge")
                let newImg = new Image;
                newImg.onload = function() {
                    img.src = x2src;
                };
                newImg.src = x2src;
            }
            img.src = img.src
        })
    })
})();