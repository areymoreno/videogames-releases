// VARIABLES
const NOW_DATE = new Date();
const API_KEY_PEKE = '9856663a8c5a4005ac6fe75f0504eca8'; // REFRESCA CADA 12 DEL MES - @PekenoSalta
const API_KEY_GREG = '40527447516948558e75a705b01a51fa'; // REFRESCA CADA 11 DEL MES - @GregorI0
const API_KEY_DEVELOP = 'e7e64384f3864a10bc010c11928def1f'; // REFRESCA CADA 03 DEL MES - @Stompilla
const LI_TABLE = 'MajorGamesTable';

window.onload = initGameWeb();

function initGameWeb() {

    let theAPI = randomAPI();
    requestMajorGames('GOTY', '2023-01-01', '2023-12-31', theAPI);

}

function randomAPI() {
    const arrayAPI = new Array(API_KEY_PEKE, API_KEY_GREG, API_KEY_DEVELOP);
    let theAPI = arrayAPI[Math.floor(Math.random() * 3)];
    
    return theAPI;
}

function requestMajorGames(appendMonth, initialDate, finishDate, API_KEY) {

    let appendRelease = LI_TABLE + appendMonth

    let requestURL = 'https://api.rawg.io/api/games?key=' + API_KEY + '&dates=' + initialDate + ',' + finishDate + '&page_size=30&metacritic=85,100&ordering=metacritic';
    let request = new XMLHttpRequest();

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        const requestGamesResponse = request.response;
        const requestGames = JSON.parse(JSON.stringify(requestGamesResponse));

        if (requestGames.results.length > 0) {

            for (let index = requestGames.results.length - 1; index > 0; index--) {


                let slug = requestGames.results[index].slug;
                let name = requestGames.results[index].name;
                let metascore = getMetascore(requestGames.results[index].metacritic);

                let requestPlatform = requestGames.results[index].platforms;
                let arrayPlatform = new Array();

                if (requestPlatform) {
                    for (let indexP = 0; indexP < requestGames.results[index].platforms.length; indexP++) {
                        arrayPlatform.push(requestPlatform[indexP].platform.name);
                    }
                    apppendRelease(appendRelease, slug, name, metascore, arrayPlatform);
                }

            }

        } else {
            $('#' + appendRelease).append('<li class="list-group-item d-flex justify-content-between align-items-center">Este a??o a??n no se ha analizado nada.</li>');
        }

    }
}

function getMetascore(metascore) {

    let metascoreFormat = '';

    if ((metascore >= 90) && (metascore <= 100)) {
        metascoreFormat = '<span id="badgeCSS" class="badge bg-success" style="padding: 10px; margin: 0px 10px 0px 0px; ">' + metascore + '</span>';
    } else if ((metascore >= 80) && (metascore <= 89)) {
        metascoreFormat = '<span id="badgeCSS" class="badge" style="padding: 10px; margin: 0px 10px 0px 0px; background-color: limegreen">' + metascore + '</span>';
    }

    return metascoreFormat;
}

function getPlatform(platforms) {

    let cadena = '';

    let playstation = 0;
    let xbox = 0;
    let nintendo = 0;
    let pc = 0;
    let mobile = 0;

    for (let index = 0; index < platforms.length; index++) {
        switch (platforms[index]) {
            case 'PlayStation 5':
                playstation++;
                break;
            case 'PlayStation 4':
                playstation++;
                break;
            case 'Xbox Series S/X':
                xbox++;
                break;
            case 'Xbox One':
                xbox++;
                break;
            case 'PC' || 'macOS' || 'Linux':
                pc++;
                break;
            case 'iOS' || 'Android':
                mobile++;
                break;
            case 'Nintendo Switch':
                nintendo++;
                break;
        }
    }

    if (playstation > 0) {
        cadena = cadena + '<span id="badgeCSS" class="badge text-bg-primary"><i class="bi bi-playstation"></i></span>';
    }

    if (xbox > 0) {
        cadena = cadena + '<span id="badgeCSS" class="badge text-bg-success"><i class="bi bi-xbox"></i></span>';
    }

    if (nintendo > 0) {
        cadena = cadena + '<span id="badgeCSS" class="badge text-bg-danger"><i class="bi bi-nintendo-switch"></i></span>';
    }

    if (pc > 0) {
        cadena = cadena + '<span id="badgeCSS" class="badge text-bg-secondary"><i class="bi bi-laptop"></i></span>';
    }

    if (mobile > 0) {
        cadena = cadena + '<span id="badgeCSS" class="badge text-bg-info"><i class="bi bi-phone"></i></span>';
    }
    return cadena;
}

function apppendRelease(appendRelease, slug, name, metascore, platform) {

    let releaseAppend = '#' + appendRelease;

    $(releaseAppend).append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
        '<div></strong>' + metascore + ' <b><a style="color: black;" target="_blank" href="https://rawg.io/games/' + slug + '">' + name + '</a></b></div>' +
        '<div class="text-end">' + getPlatform(platform) + '</div></li>');

}
