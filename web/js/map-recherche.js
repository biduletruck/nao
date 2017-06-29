/**
 * web/js/map-recherche-1.js
 * Créé par firekey le 02/06/2017.
 */

$(function(){

    /* ========================= VARIABLES ========================= */

    var carte;
    var icone;
    var marqueursTab = [];
    var marqueurPosition = [0];
    var iconPosition = L.icon({
        iconUrl: document.location.href + '/../../imgs/icon-position@4x.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });
    var iconProtegee = L.icon({
        iconUrl: document.location.href + '/../../imgs/icon-espece-protegee.png',
        iconSize: [22.5, 32],
        iconAnchor: [11.25, 16]
    });
    var iconNonProtegee = L.icon({
        iconUrl: document.location.href + '/../../imgs/icon-espece-non-protegee.png',
        iconSize: [22.5, 32],
        iconAnchor: [11.25, 16]
    });


    /* ========================= ACTIONS POST-LOAD ========================= */

    $('#wrapper').css({paddingTop: '0'});
    redimensionner($('.container-fluid, #div-carte, #carte-rechercher'));

    carte = L.map('carte-rechercher').setView([46.785575, 2.355276], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/julobrsd/cj2x40f2z001p2rod8xkal2c9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsb2Jyc2QiLCJhIjoiY2oyeDNwMW5nMDB4ODM4cHV4ZWkwMjk0YSJ9.TworUnb_y8Jf5blBUVuRxQ', {attribution: '<span class="pin-glacial gras">Nos Amis les Oiseaux | Ex-Nihilo</span>', maxZoom: 18}).addTo(carte);

    if (navigator.geolocation){
        navigator.geolocation.watchPosition(
            function(position){
                if (marqueurPosition.length > 2){
                    for (i = 0; i < 2; i++){
                        carte.removeLayer(marqueurPosition[i]);
                    }
                }
                var geoPosition = L.marker([position.coords.latitude, position.coords.longitude], {icon: iconPosition}).bindPopup('<div class="text-center pin-glacial">Vous êtes<br>localisé(e)<br>ici.</div>').openPopup().addTo(carte);
                marqueurPosition.push(geoPosition);
            },
            function(erreur){
                switch(erreur.code){
                    case erreur.PERMISSION_DENIED: alert('La configuration de votre navigateur ou de votre appareil n\'autorise pas la géolocalisation.'); break;
                    case erreur.POSITION_UNAVAILABLE: alert('Une erreur est survenue lors de la géolocalisation. Votre position est indéterminée'); break;
                    case erreur.TIMEOUT: alert('Le délai de réponse de la géolocalisation est dépassé. Votre position est indéterminée'); break;
                }
            }
        ), {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000
        };
    } else {
        alert('Votre navigateur ne prends pas en charge la géolocalisation.');
    }

    $('#select-row').css({
        position: 'absolute',
        bottom: '0',
        width: '100%',
        zIndex: '900'
    });

    $('#div-select-recherche-home-2').css({
        border: '1px solid transparent',
        borderRadius: '74px 74px 0 0',
        backgroundColor: 'rgba(40, 204, 158, 1)',
        padding: '0 64px'
    });


    /* ========================= GESTION EVENEMENTIELLE ========================= */

    $(window).resize(function(){
        redimensionner($('.container-fluid, #div-carte, #carte-rechercher'));
    });

    $('#select-recherche-home-2').on({
        change: function(){
            afficherOiseaux($(this).val());
        }
    });


    /* ========================= FONCTIONS ========================= */

    function redimensionner(elmts){
        elmts.each(function(){
            $(this).height($('#wrapper').height());
        });
    }

    function afficherOiseaux(famille){
        $.ajax({
            type: "POST",
            url: $('#adresseCarto').val(),
            data: {'espece': famille},
            dataType: 'json',
            success: function(reponses){
                for (i = 0; i < marqueursTab.length; i++){
                    carte.removeLayer(marqueursTab[i]);
                }
                if (reponses.length < 3){alert('Aucun résultat !');}
                $.each(JSON.parse(reponses), function(index, observation){
                    var jour = observation.date.date.substr(8, 2);
                    var mois = observation.date.date.substr(5, 2);
                    var annee = observation.date.date.substr(0, 4);
                    if (observation.typeEspece != null && observation.typeEspece.substr(0, 3) == 'non'){
                        icone = iconNonProtegee;
                    } else {
                        icone = iconProtegee;
                    }
                    if (observation.typeEspece.substr(0, 3) == 'non' || $('#protection-especes').val() == '0'){
                        var marqueur = L.marker([observation.latitude, observation.longitude], {icon: icone});
                        marqueursTab.push(marqueur);
                        marqueur
                            .bindPopup(
                                '<div class="text-center pin-glacial">'+
                                    '<img src="../../web/img_upload/'+observation.image+'" width="100px" height="100px"><br>'+
                                    observation.espece.nomVern+'<br>'+
                                    '('+observation.espece.lbNom+')<br>'+
                                    'vu le '+jour+'-'+mois+'-'+annee+'<br>'+
                                '</div>'
                            )
                            .openPopup()
                            .addTo(carte);
                    }
                });
            }
        });
    }
});
