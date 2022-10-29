let aboutOff = $('#about').offset().top;
$(window).scroll(function () {
    let windowScroll = $(window).scrollTop();
    if (windowScroll > aboutOff - 80) {
        $('#main-nav').css('backgroundColor', 'rgba(0,0,0,.7)')
        $('#btnUp').fadeIn(2000)
    }
    else {
        $('#main-nav').css('backgroundColor', 'transparent')
        $('#btnUp').fadeOut(0)

    }

})


$("a[href^='#']").click(function (e) {
    let linkHref = $(e.target).attr('href')
    let sectionOff = $(linkHref).offset().top
    $("html,body").animate({ scrollTop: sectionOff }, 2000)
    $(".active").css('border-bottom', 'solid 2px white')
})
$("#btnUp").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 2000)

})