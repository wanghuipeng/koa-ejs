/**
 * Created by ammie on 17/4/28.
 */

$(function() {
    'use strict';

    var $header = $('#header');
    $('#header').find(".WhiteLogo").show();
    $('#header').find(".ColorLogo").hide();
    $("#header").removeClass("floating");

    if (window.location.pathname == "/website/aboutus" || window.location.pathname == "/website/employee" || window.location.pathname == "/website/history" || window.location.pathname == "/website/certificate") {
        $(".about").addClass("active");
    }


});