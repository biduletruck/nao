/**
 * web/js/qsn.js
 * Créé par firekey le 10/06/2017.
 */

$(function(){

    /* ========================= ACTIONS POST-LOAD========================= */

    $('.btn-nav').removeClass('active');
    $('#btn-nav-qsn').addClass('active');
    $('#qsn-2, #qsn-3').hide();
    redimensionner($('html'));


    /* ========================= GESTION EVENEMENTIELLE ========================= */

    $(document).on({
        resize: function(){
            redimensionner($('html'));
        }
    });

    $('#chevron-qsn-1').click(function(){
        $('#qsn-1').hide('slide', {direction: 'up'}, 'fast', function(){
            $('#qsn-2').show('slide', {direction: 'down'}, 'fast', function(){
                redimensionner($('html'));
            });
        })
    });

    $('#chevron-qsn-2-haut').click(function(){
        $('#qsn-2').hide('slide', {direction: 'down'}, 'fast', function(){
            $('#qsn-1').show('slide', {direction: 'up'}, 'fast', function(){
                redimensionner($('html'));
            });
        })
    });

    $('#chevron-qsn-2-bas').click(function(){
        $('#qsn-2').hide('slide', {direction: 'up'}, 'fast', function(){
            $('#qsn-3').show('slide', {direction: 'down'}, 'fast', function(){
                redimensionner($('html'));
            });
        })
    });

    $('#chevron-qsn-3').click(function(){
        $('#qsn-3').hide('slide', {direction: 'down'}, 'fast', function(){
            $('#qsn-2').show('slide', {direction: 'up'}, 'fast', function(){
                redimensionner($('html'));
            });
        })
    });


    /* ========================= FONCTIONS ========================= */

    function redimensionner(elmts){
        $(elmts).each(function(){
            $(this).css('min-height', $('.container-fluid').height()+$('.navbar-fixed-top').height() + 30);
        });
    }

});