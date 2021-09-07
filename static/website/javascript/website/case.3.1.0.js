$(document).ready(function() {
    'use strict';

    $(window).scroll(function(e) {
        doLazyLoad()
    })
    $(window).resize(function(e) {
        doLazyLoad()
    })

    $(".cases-con .thumbnail").bind("mouseenter mouseleave",
        function(e) {
            $(e.currentTarget).children().attr('class', 'thumbnail-info');
            var w = $(this).width();
            var h = $(this).height();
            var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            var eventType = e.type;
            var dirName = new Array('top', 'right', 'bottom', 'left');
            if (e.type == 'mouseenter') {
                $(e.currentTarget).children().addClass("enter-" + dirName[direction]).removeClass("leave-" + dirName[direction]).show();
            } else {
                $(e.currentTarget).children().removeClass("enter-" + dirName[direction]).addClass("leave-" + dirName[direction])
                setTimeout(function() {
                    $(e.currentTarget).children().hide();
                    $(e.currentTarget).children().removeClass("leave-" + dirName[direction])
                }, 100)
            }
        });

    $(".cases-menu ul li").click(function(e) {
        $(".cases-menu ul li").removeClass("action");
        var reg = $(e.currentTarget).data("order");
        $(e.currentTarget).addClass("action");
        $(".cases-con .caseflex").hide();
        $(".reg" + reg).show();
        window.location.hash = reg;
        doLazyLoad()
    })

    var settime;

    // $(".cases-con ul li").click(function (e) {
    //     var id = $(e.currentTarget).data("id");

    //     if(id){
    //        // 跳转到 案例 对应的详情页面
    //        window.open('/website/caseDetail' + '?id=' + id);  
    //     }else{
    //       window.location.href = '/website/case'
    //     }


    //     // var casedata;
    //     // for(var i = 0;i < casedatalist.cases.length; i++){
    //     //   if(casedatalist.cases[i].id == id){
    //     //     casedata = casedatalist.cases[i];
    //     //   }
    //     // }

    //     // console.log('casedatalist',casedatalist);
    //     // console.log('casedata',casedata);

    //     // var temp = "";
    //     // for(var i = 0; i < casedata.imgs.length; i++){
    //     //   temp += '<img src="'+casedata.imgs[i]+'"/>'
    //     // }
    //     // var a = casedata.content;
    //     // $(".detail-body .cases-mask-left").html(temp);
    //     // $(".detail-body").append(a);
    //     // console.log($(".detail-body .cases-mask-left"));

    //     // $("#basic").smartbox({
    //     //     title:casedata.title,
    //     //     width:900,
    //     //     height:400,
    //     //     isDrag:false,
    //     //     overlayOpacity:0.6,
    //     //     content:'<div class="cases-mask-left">'+temp+'</div>'+casedata.content,
    //     //     isAutoShow:false,
    //     //     afterShow:function(){
    //     //       $("html,body").css("overflow","hidden");
    //     //         $(".right-icon").empty().qrcode({
    //     //             size:100,
    //     //             // text:"https://"+ window.location.host +"/news/showCase.php?id="+id
    //     //             text:"https://www.leapcloud.cn/news/showCase.php?id="+id
    //     //         });
    //     //     },
    //     //     beforeClose:function(){
    //     //       $("html,body").css("overflow","auto");
    //     //       clearInterval(settime);
    //     //         var arr = window.location.hash.split("/");
    //     //         window.location.hash = arr[0];
    //     //     }
    //     // });
    //     // $("#basic").smartbox("open");
    //     // var img_time = 0;
    //     // $(".cases-mask-left img:eq("+img_time+")").fadeIn(500);
    //     // img_time++;
    //     // settime = setInterval(function(){
    //     //   var imglength = $(".cases-mask-left img").length;
    //     //   if(img_time >= imglength){
    //     //     img_time = 0;
    //     //   }
    //     //   $(".cases-mask-left img").hide();
    //     //   $(".cases-mask-left img:eq("+img_time+")").fadeIn(500);
    //     //   img_time++;
    //     // },2000);
    // });

    function doLazyLoad() {
        var winHeight = $(window).height();
        var winScrollHeight = $(window).scrollTop();
        $('[data-leap-lazy-img]:visible').each(function(i, ele) {
            if ($(ele).offset().top - winHeight - winScrollHeight <= 0 && ($(ele).offset().top + $(ele).height() > winScrollHeight)) {
                $(ele).css('background-image', 'url(' + $(ele).attr('data-leap-lazy-img') + ')');
                $(ele).removeAttr('data-leap-lazy-img');
            }
        })

        $('[data-leap-src]:visible').each(function(i, ele) {
            if ($(ele).offset().top - winHeight - winScrollHeight <= 0 && ($(ele).offset().top + $(ele).height() > winScrollHeight)) {
                $(ele).attr('src', $(ele).attr('data-leap-src'));
                $(ele).removeAttr('data-leap-src');
            }
        })
    }

    function parseHash(hash) {
        window.location.hash = hash.split("/")[0];
        var find = false;
        $(".cases-menu ul li").each(function(index, item) {
            var dataOrder = $(item).data('order');
            var hashVal = hash.split("/")[0];
            if (dataOrder == hashVal.substring(1)) {
                $(item).click();
            }
        });

        $(".cases-con ul li").each(function(index, item) {

            if (find) return;
            if ($(item).data("id") == hash.split("/")[1]) {
                $(item).click()
                find = true;
            }
        })
    }
    parseHash(window.location.hash);
    doLazyLoad()
});