/**
 * web/js/documentSize.js
 * Créé par firekey le 23/06/2017.
 */

$(function(){

    /* ========================= ACTIONS POST-LOAD ========================= */

    setTimeout(function(){
        redimensionner($('html'));
    }, 300);


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