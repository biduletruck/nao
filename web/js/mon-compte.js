/**
 * web/js/mon-compte.js
 * Créé par firekey le 10/06/2017.
 */

$(function(){

    /* ========================= ACTIONS POST-LOAD ========================= */

    $('.btn-nav').removeClass('active');
    $('#btn-nav-cpt').addClass('active');
    $('#btn-retour-mon-compte').remove();
    $(':input').addClass('pin-glacial');

    organiserContenu();

    $('#nombre span').text($('#nb-obs').val());
    $('#validees span').text($('#nb-val').val());
    $('#attente span').text($('#nb-att').val());

    setTimeout(function(){
        selectionnerTab($('#nombre'));
        $('#nombre').removeClass('aloe-vera').addClass('pin-glacial');
        montrerDiv($('#tabNombre'));
        $('#ajouter').removeClass('pin-glacial');
    }, 50);


    /* ========================= GESTION EVENEMENTIELLE ========================= */

    $(document).on({
        resize: function(){
            organiserContenu();
        }
    });

    $('#nombre').on('click', function(){
        deselectionnerTabs();
        selectionnerTab($(this));
        cacherDiv($('#tabValidees, #tabAttente'));
        setTimeout(function(){
            montrerDiv($('#tabNombre'));
        }, 500);

    });

    $('#validees').on('click', function(){
        deselectionnerTabs();
        selectionnerTab($(this));
        cacherDiv($('#tabNombre, #tabAttente'));
        setTimeout(function(){
            montrerDiv($('#tabValidees'));
        }, 500);
    });

    $('#attente').on('click', function(){
        deselectionnerTabs();
        selectionnerTab($(this));
        cacherDiv($('#tabValidees, #tabNombre'));
        setTimeout(function(){
            montrerDiv($('#tabAttente'));
        }, 500);
    });


    /* ========================= FONCTIONS ========================= */

    function organiserContenu(){
        if ($(document).width() >= 951){
            $('#image').removeClass('col-xs-6 col-xs-offset-3').addClass('col-xs-8 col-xs-offset-2');
        } else {
            $('#image').removeClass('col-xs-8 col-xs-offset-2').addClass('col-xs-6 col-xs-offset-3');
        }
        $('#my-observations').height($('#show').height());
    }

    function selectionnerTab(elmt){
        elmt.parent().toggleClass('bg-pin-glacial aloe-vera bg-aloe-vera pin-glacial');
        elmt.toggleClass('aloe-vera pin-glacial');
        elmt.children().toggleClass('bg-aloe-vera pin-glacial bg-pin-glacial aloe-vera');
        desactiverElmts(elmt);
    }

    function deselectionnerTabs(){
        $('#div-nombre, #div-validees, #div-attente').removeClass('bg-aloe-vera pin-glacial').addClass('bg-pin-glacial aloe-vera');
        $('#nombre, #validees, #attente').removeClass('pin-glacial').addClass('aloe-vera');
        $('#nombre span, #validees span, #attente span').removeClass('bg-pin-glacial aloe-vera').addClass('bg-aloe-vera pin-glacial');
        activerElmts($('#nombre, #validees, #attente'));
    }

    function desactiverElmts(elmts){
        elmts.each(function(){
            $(this).attr('disabled', 'disabled');
        });
    }

    function activerElmts(elmts){
        elmts.each(function(){
            $(this).removeAttr('disabled');
        });
    }

    function cacherDiv(elmts){
        $(elmts).each(function(){
            $(this).hide('slide', {direction: 'left'}, 400);
        });
    }

    function montrerDiv(elmt){
        $(elmt).show('slide', {direction: 'left'}, 400);
    }

});