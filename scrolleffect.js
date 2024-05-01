$(function(){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('header').addClass('fixed-header');
        }
        else{
            $('header').removeClass('fixed-header');
        }
    });
});