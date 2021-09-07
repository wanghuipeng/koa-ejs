$(function() {
    var phoneTextSelector = '.leap__phone-text'
    var phonecallSelector = '.leap__phone-call'
        // var phoneNumber = '400-001-2862'

    var now = new Date()
    var hours = now.getHours()

    window.leapServicePhone = '400-158-0151'

    // if (hours == 12 || hours == 16 || hours == 22) {
    //   $(phoneTextSelector).text(phoneNumber)
    //   $(phonecallSelector).attr('href', 'tel:' + phoneNumber)
    //   window.leapServicePhone = phoneNumber
    // }
})