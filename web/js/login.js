/**
 * web/js/login.js
 * Créé par firekey le 08/06/2017.
 */

$(function(){

    /* ========================= ACTIONS POST-LOAD========================= */

    setTimeout(function(){
        redimensionner($('html'));
    }, 300);

    $('.btn-nav').removeClass('active');
    $('#btn-nav-cnx').addClass('active');
    $('#Inscription main > div').removeAttr('id').addClass('bg-herbe-tropicale');
    $('#Inscription input.btn').removeClass('btn-primary').addClass('btn-pin-glacial text-uppercase blanc');


    /* ========================= GESTION EVENEMENTIELLE ========================= */

    $(document).on({
        resize: function(){
            redimensionner($('html'));
        }
    });


    /* ========================= FONCTIONS ========================= */

    function redimensionner(elmts){
        $(elmts).each(function(){
            $(this).css('min-height', $('.container-fluid').height()+$('.navbar-fixed-top').height() + 30);
        });
    }

});