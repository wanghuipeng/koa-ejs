$(function() {
    //遍历tab菜单，为每个tab菜单添加 click事件
    $(".solution-cases-tabs>.solution-cases-li").each(function(index, item) {
        $(item).hover(function(e) {
            e.preventDefault();
            // 其余的菜单移除class active
            $(".solution-cases-tabs>.solution-cases-li").removeClass("active");
            // 当前菜单被点击时，为当前菜单添加class  active
            $(e.target).addClass("active");
            //隐藏其他已经被展开的案例列表
            $(".case-content .solution-case-lists").hide();
            //菜单被点击的同时，显示出当前菜单所对应的案例列表
            $(".case-content .solution-case-lists").eq(index).show();
        });
    });

    //页面加载时，自动触发第一个tab 菜单的click事件
    $(".solution-cases-tabs>.solution-cases-li").eq(0).addClass("active");
    $(".solution-case-lists").eq(0).css("display", "block");

    // 移动端 行业解决方案  tab切换 逻辑
    // 给 tab绑定 click事件
    $(".solution-case-tab").each(function(i, item) {
        $(item).click(function(e) {
            e.preventDefault();

            // $(".navbar-control img").toggleClass("show hide");
            // if($(".navbar-control").children().hasClass("show")){
            //     $(".navbar-control").eq(i).children("img").toggleClass("hide show");
            // }
            // $(".solution-case-tab").eq(i).children("p").toggleClass("gray green");
            //
            // $(".solution-case").eq(i).toggleClass("show hide");
            //
            //
            // if($(".solution-case").eq(i).css("display") == "block"){
            //     $(".solution-case-tab").eq(i).css("border-bottom","1px solid #e6e6e6");
            // }else{
            //     $(".solution-case-tab").eq(i).css("border-bottom","none");
            //
            // }
            // var $SolutionCase = $(".solution-case");
            if ($(".solution-case").eq(i).css("display") == "block") {
                $(".solution-case").eq(i).hide();
                $(".solution-case-tab>p").removeClass("green").addClass("gray");

                $(".tab_arrow_open").hide();
                $(".tab_arrow_close").show();

            } else {
                $(".solution-case").hide();
                $(".solution-case").eq(i).show();

                $(".solution-case-tab>p").removeClass("green").addClass("gray");

                $(".tab_arrow_open").hide();
                $(".tab_arrow_close").show();

                $(".solution-case-tab>p").eq(i).removeClass("gray").addClass("green");

                $(item).find(".tab_arrow_close").hide();
                $(item).find(".tab_arrow_open").show();
            }

        })
    })

    // 1. 网站在行业解决方案点击免费注册时, 把行业模板信息(id) 传到 注册页面
    // 2. 注册成功后, 跳转到 console 时带上模板 id
    // 3. console 根据模板 id 自动导入模板

    // 模板Id
    // 依次是：社交分销、社区团购、服务预订与入住、订货和供应链
    var ProdAppId = ["5ccffe2354377a0008129850", "5c4e5f5f1143e10007e94844", "5cedf01f180e0d0008643a6f", "5ccffd579a0ef40008b3e836"];
    var UatAppId = ["5ccffe2354377a0008129850", "5c4e5f5f1143e10007e94844", "5cedf01f180e0d0008643a6f", "5ccffd579a0ef40008b3e836"];

    // PC端模板传参逻辑
    $(".case .btns>.freeBtn").each(function(index, item) {
        $(item).click(function(e) {
            e.preventDefault();
            // 环境判断
            var env;
            if ((window.__ENV__MAXWON && window.__ENV__MAXWON.env) == 'DEV') {
                env = 'dev';
                // $.cookie.defaults.path = '/';
                // $.cookie("selectedAppId",UatAppId[index]);
                window.location.href = '/console/v2/signup#/' + '?' + 'selectedAppId=' + UatAppId[index];


            } else if ((window.__ENV__MAXWON && window.__ENV__MAXWON.env) == 'UAT') {
                env = 'uat';
                // $.cookie.defaults.path = '/';
                // $.cookie("selectedAppId",UatAppId[index]);
                window.location.href = '/console/v2/signup#/' + '?' + 'selectedAppId=' + UatAppId[index];
            } else {
                env = '';
                // $.cookie.defaults.path = '/';
                // $.cookie("selectedAppId",UatAppId[index]);
                window.location.href = '/console/v2/signup#/' + '?' + 'selectedAppId=' + ProdAppId[index];
            }

            // window.location.href='/console/v2/signup#/' + '?' + 'appId=' + appId[index];
        })
    });
    // mobile端模板传参逻辑
    $(".solution-case .case .btns>.freeBtn").each(function(index, item) {
        $(item).click(function(e) {
            e.preventDefault();
            // 环境判断
            var env;
            if ((window.__ENV__MAXWON && window.__ENV__MAXWON.env) == 'DEV') {
                env = 'dev';
                // $.cookie.defaults.path = '/';
                // $.cookie("selectedAppId",UatAppId[index]);
                window.location.href = '/console/v2/signup#/' + '?' + 'selectedAppId=' + UatAppId[index];

            } else if ((window.__ENV__MAXWON && window.__ENV__MAXWON.env) == 'UAT') {
                env = 'uat';
                // $.cookie.defaults.path = '/';
                // $.cookie("selectedAppId",UatAppId[index]);
                window.location.href = '/console/v2/signup#/' + '?' + 'selectedAppId=' + UatAppId[index];
            } else {
                env = '';
                // $.cookie.defaults.path = '/';
                // $.cookie("selectedAppId",UatAppId[index]);
                window.location.href = '/console/v2/signup#/' + '?' + 'selectedAppId=' + ProdAppId[index];
            }

        })
    });
    // 会员系统点击出现详细内容
    $(".member-lists li").click(function() {
        $(this).siblings().children('.member-item-detail').removeClass("show");
        $(this).children('.member-item-detail').toggleClass("show");
    })

    // pc各行业切换
    var backgroundImageList = [
        'url(../website/common/images/index/5_1_bg.png)',
        'url(../website/common/images/index/5_2_bg.png)',
        'url(../website/common/images/index/5_3_bg.png)',
        'url(../website/common/images/index/5_4_bg.png)',
        'url(../website/common/images/index/5_5_bg.png)',
        'url(../website/common/images/index/5_6_bg.png)',
    ];

    function selectSolution(index) {
        $('.solution-container .solution-list li').removeClass('active');
        $('.solution-container .solution-list li:eq(' + index + ')').addClass('active');
        $('.solution-container .solution-detail .solution-detail-item').removeClass('show');
        $('.solution-container .solution-detail .solution-detail-item:eq(' + (index) + ')').addClass('show');
        $('.solution-container').css('background-image', backgroundImageList[index]);
    }
    $('.solution-container .solution-list li').click(function() {
        var index = $(this).index();
        selectSolution(index);
    });
    selectSolution(0);

    // 移动端解决方案轮播
    var mySwiper = new Swiper('.solution-mobile', {
        roundLengths: true,
        slidesPerView: "auto",
        loopedSlides: 5,
        centeredSlides: true,
        followFinger: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        initialSlide: 0,
        speed: 600,
        loop: true
    });
});