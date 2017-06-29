/**
 * web/js/observation-2.js
 * Créé par firekey le 09/06/2017.
 */

$(function(){

    /* ========================= VARIABLES ========================= */

    var carte;
    var marqueurs = [0];

    var iconPosition = L.icon({
        iconUrl: document.location.href + '/../../../imgs/icon-position@4x.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    var iconPin = L.icon({
        iconUrl: document.location.href + '/../../../imgs/icon-pin@4x.png',
        iconSize: [16.5, 32],
        iconAnchor: [8.25, 32]
    });


    /* ========================= ACTIONS POST-LOAD========================= */

    $('.btn-nav').removeClass('active');
    $('#btn-nav-obs').addClass('active');

    retirer($('.control-label'));

    $('#appbundle_observation_imageFile').before(
        '<div class="text-center">' +
            '<i class="fa fa-camera fa-5x pin-glacial" aria-hidden="true"></i>' +
        '</div>'
    );

    redimensionnerCarte();
    arrondirAngles();
    redimensionnerBoutonsGPS();
    organiserSelects();
    redimensionner($('html'));

    carte = L.map('carte-new-observation').setView([46.785575, 2.355276], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/julobrsd/cj2x40f2z001p2rod8xkal2c9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsb2Jyc2QiLCJhIjoiY2oyeDNwMW5nMDB4ODM4cHV4ZWkwMjk0YSJ9.TworUnb_y8Jf5blBUVuRxQ',
        {
            attribution: '<a href="#">Nos Amis les Oiseaux</a> | <a href="#">Ex-Nihilo.com</a>',
            maxZoom: 18
        }
    ).addTo(carte);


    /* ========================= GESTION EVENEMENTIELLE ========================= */

    $(window).on({
        resize: function(){
            redimensionnerCarte();
            arrondirAngles();
            redimensionnerBoutonsGPS();
            redimensionner($('html'));
        }
    });

    $('#indiquer').click(function(){
        for (i = 0; i < marqueurs.length; i++){
            carte.removeLayer(marqueurs[i]);
        }
        var marqueur = L.marker([46.785575, 2.355276], {icon: iconPin}).addTo(carte);
        marqueurs.push(marqueur);

        var infoBulle = L.popup();
        infoBulle
            .setLatLng([47.7, 2.355276])
            .setContent('<div class="text-center pin-glacial">Cliquez sur<br>l\'endroit de<br>l\'observation.</div>')
            .openOn(carte);
    });

    carte.on('click', function(e){
        for (i = 0; i < marqueurs.length; i++){
            carte.removeLayer(marqueurs[i]);
        }

        var marqueur = L.marker([e.latlng.lat, e.latlng.lng], {icon: iconPin}).addTo(carte);
        marqueurs.push(marqueur);

        $('#appbundle_observation_latitude').attr('value', e.latlng.lat);
        $('#appbundle_observation_longitude').attr('value', e.latlng.lng);
    });

    $('#geolocaliser').click(function(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                function(position){
                    for (i = 0; i < marqueurs.length; i++){
                        carte.removeLayer(marqueurs[i]);
                    }

                    $('#appbundle_observation_latitude').attr('value', position.coords.latitude);
                    $('#appbundle_observation_longitude').attr('value', position.coords.longitude);

                    var marqueur = L.marker([position.coords.latitude, position.coords.longitude], {icon: iconPosition})
                        .bindPopup('<div class="text-center pin-glacial">Vous êtes<br>localisé(e)<br>ici.</div>')
                        .openPopup()
                        .addTo(carte);
                    marqueurs.push(marqueur);

                    var infoBulle = L.popup();
                    infoBulle
                        .setLatLng([position.coords.latitude, position.coords.longitude])
                        .setContent('<div class="text-center pin-glacial">Vous êtes<br>localisé(e)<br>ici.</div>')
                        .openOn(carte);
                },
                function(erreur){
                    switch(erreur.code){
                        case erreur.PERMISSION_DENIED: alert('La configuration de votre navigateur ou de votre appareil n\'autorise pas votre localisation'); break;
                        case erreur.POSITION_UNAVAILABLE: alert('Une erreur est survenue durant la géolocalisation. Votre position reste indéterminée'); break;
                        case erreur.TIMEOUT: alert('Le délai de réponse de la géolocalisation est dépassé, réitérez l\'opération'); break;
                    }
                }
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

    function redimensionner(elmts){
        $(elmts).each(function(){
            $(this).css('min-height', $('.container-fluid').height()+$('.navbar-fixed-top').height() + 30);
        });
    }

    function redimensionnerCarte(){
        $('#carte-new-observation').height($('#form-observation-2').height() + 30);
    }

    function arrondirAngles() {
        if ($(document).width() < 975){
            $('#form-observation-2').css({borderRadius: '30px 30px 0 0'});
            $('#carte-new-observation').css({borderRadius: '0 0 30px 30px'});
        } else {
            $('#observation-2').css({paddingTop: '15px', paddingBottom: '15px'});
            $('#form-observation-2').css({padding: '15px 0 15px 15px', borderRadius: '30px 0 0 30px'});
            $('#carte-new-observation').css({borderRadius: '0 30px 30px 0'});
        }
        $('#container-observation-2').css({borderRadius: '30px'});
    }

    function redimensionnerBoutonsGPS(){
        if ($('html').width() < 975){
            $('#indiquer, #geolocaliser').addClass('btn-block');
        } else {
            $('#indiquer, #geolocaliser').removeClass('btn-block');
        }
    }

    function organiserSelects(){
        if ($('#appbundle_observation_ordre').val() == ''){
            $('#appbundle_observation_famille, #appbundle_observation_espece').attr('disabled', 'disabled');
        } else {
            if ($('#appbundle_observation_famille').val() == ''){
                $('#appbundle_observation_famille').removeAttr('disabled');
                $('#appbundle_observation_espece').attr('disabled', 'disabled');
            } else {
                $('#appbundle_observation_famille, #appbundle_observation_espece').removeAttr('disabled');
            }
        }
    }
});