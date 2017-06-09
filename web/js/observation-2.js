/**
 * web/js/observation-2.js
 * Created by firekey on 09/06/2017.
 */


$(function(){

    /* ========================= VARIABLES ========================= */

    var iconPosition = L.icon({
        iconUrl: '../../../web/imgs/icon-position@4x.png',
        iconSize: [64, 64],
        iconAnchor: [32, 32]
    });

    var iconPin = L.icon({
        iconUrl: '../../../web/imgs/icon-pin@4x.png',
        iconSize: [32.54, 64],
        iconAnchor: [16.26, 64]
    });


    /* ========================= ACTIONS ========================= */

    retirer($('.control-label'));

    $('#appbundle_observation_image')
        .before(
            '<label class="text-center pin-glacial">' +
                '<i class="fa fa-camera fa-5x" style="cursor: pointer"></i>' +
                '<br>'+
                'Ajouter une photo'+
            '</label>'
        )
        .css('display', 'none');

    redimensionnerCarte();

    arrondirAngles();

    redimensionnerBoutonsGPS();


    /* ========================= CARTOGRAPHIE ========================= */

    var carte = L.map('carte-new-observation').setView([46.785575, 2.355276], 5);

    var calque = $(carte);

    L.tileLayer('https://api.mapbox.com/styles/v1/julobrsd/cj2x40f2z001p2rod8xkal2c9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsb2Jyc2QiLCJhIjoiY2oyeDNwMW5nMDB4ODM4cHV4ZWkwMjk0YSJ9.TworUnb_y8Jf5blBUVuRxQ',
        {
            attribution: '<a href="#">Nos Amis les Oiseaux</a> | <a href="#">Ex-Nihilo.com</a> _',
            maxZoom: 10
        }
    ).addTo(carte);


    /* ========================= GESTION EVENEMENTIELLE ========================= */

    window.addEventListener('resize', function(){
        arrondirAngles();
        redimensionnerCarte();
        redimensionnerBoutonsGPS();
    });

    $(".fa-camera").click(function(){
        $("#appbundle_observation_image").click();
    });

    $('#indiquer, #geolocaliser').click(function(e){
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            },
            1000,
            function(){
                window.location.hash = hash;
            }
        );
    });
/*
    carte.click(function(e){
        console.log(e);
    });
*/
    $('#geolocaliser').click(function(){
        if (navigator.geolocation){
            navigator.geolocation.watchPosition(
                function(position){
                    $('#appbundle_observation_latitude').val(position.coords.latitude);
                    $('#appbundle_observation_longitude').val(position.coords.longitude);
                    L.marker([position.coords.latitude, position.coords.longitude], {icon: iconPosition}).addTo(carte);
                },
                function(erreur){
                    switch(erreur.code){
                        case erreur.PERMISSION_DENIED: alert('Suite à votre refus la géolocalisation n\'a pas été effectuée'); break;
                        case erreur.POSITION_UNAVAILABLE: alert('Une erreur est survenue durant la géolocalisation. Votre position reste indéterminée'); break;
                        case erreur.TIMEOUT: alert('Le délai de réponse de la géolocalisation est dépassé'); break;
                    }
                },
                {enableHighAccuracy: true, maximumAge: 30000, timeout: 10000}
            );
        } else {
            alert('Votre navigateur ne prends pas en charge la géolocalisation.');
        }
    });


    /* ========================= FONCTIONS ========================= */

    function retirer(elmtTab){
        elmtTab.each(function(){
            $(this).remove();
        })
    }

    function redimensionnerCarte(){
        $('#carte-new-observation').height($('#form-observation-2').height() + 30);
    }

    function arrondirAngles() {
        var largeur = $('html').width();
        if (largeur < 975){
            $('#form-observation-2').css({padding: '15px', borderRadius: '30px 30px 0 0'});
            $('#carte-new-observation').css({borderRadius: '0 0 30px 30px'});
        } else {
            $('#form-observation-2').css({padding: '15px 0 15px 15px', borderRadius: '30px 0 0 30px'});
            $('#carte-new-observation').css({borderRadius: '0 30px 30px 0'});
        }
    }

    function redimensionnerBoutonsGPS(){
        var largeur = $('html').width();
        if (largeur < 975){
            $('#indiquer, #geolocaliser')
                .addClass('btn-block')
                .attr('href', '#carte-new-observation');
        } else {
            $('#indiquer, #geolocaliser')
                .removeClass('btn-block')
                .removeAttr('href');
        }
    }
});