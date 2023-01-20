// VARIABLES
const NOW_DATE = new Date();
const API_KEY_PEKE = '9856663a8c5a4005ac6fe75f0504eca8'; // REFRESCA CADA 12 DEL MES - @PekenoSalta
const API_KEY_GREG = '40527447516948558e75a705b01a51fa'; // REFRESCA CADA 11 DEL MES - @GregorI0
const API_KEY_DEVELOP = 'e7e64384f3864a10bc010c11928def1f'; // REFRESCA CADA 03 DEL MES - @Stompilla
const LI_TABLE = 'ReleaseTable';

window.onload = initGameWeb();

function initGameWeb() {

    let dateNOW = formatDateNow();
    let theAPI = randomAPI();

    getGamesMonth('ENE23', dateNOW, '2023-01-31', theAPI);
    getGamesMonth('FEB23', '2023-02-01', '2023-02-28', theAPI);
    getGamesMonth('MAR23', '2023-03-01', '2023-03-31', theAPI);
    getGamesMonth('ABR23', '2023-04-01', '2023-04-30', theAPI);
    getGamesMonth('MAY23', '2023-05-01', '2023-05-31', theAPI);
    getGamesMonth('JUN23', '2023-06-01', '2023-06-30', theAPI);
    getGamesMonth('JUL23', '2023-07-01', '2023-07-31', theAPI);
    getGamesMonth('AGO23', '2023-08-01', '2023-08-31', theAPI);
    getGamesMonth('SEP23', '2023-09-01', '2023-09-30', theAPI);
    getGamesMonth('OCT23', '2023-10-01', '2023-10-31', theAPI);
    getGamesMonth('NOV23', '2023-11-01', '2023-11-30', theAPI);
    getGamesMonth('DIC23', '2023-12-01', '2023-12-31', theAPI);

}

function randomAPI() {
    const arrayAPI = new Array(API_KEY_PEKE, API_KEY_GREG, API_KEY_DEVELOP);
    let theAPI = arrayAPI[Math.floor(Math.random() * 3)];
    
    (theAPI);
    return theAPI;
}

function getGamesMonth(appendMonth, initialDate, finishDate, API) {

    let appendRelease = LI_TABLE + appendMonth

    let requestURL = 'https://api.rawg.io/api/games?key=' + API + '&dates=' + initialDate + ',' + finishDate + '&page_size=100&ordering=released';
    let request = new XMLHttpRequest();

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        const requestGamesResponse = request.response;
        const requestGames = JSON.parse(JSON.stringify(requestGamesResponse));

        if (requestGames.results.length > 0) {

            requestGames.results.forEach(game => {

                let slug = game.slug;
                let name = game.name;
                let released = game.released;

                let requestPlatform = game.platforms;
                let arrayPlatform = new Array();

                let splitDate = released.split('-');
                let inverseDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];

                if (requestPlatform) {
                    for (let indexP = 0; indexP < game.platforms.length; indexP++) {
                        arrayPlatform.push(requestPlatform[indexP].platform.name);
                    }
                    apppendRelease(appendRelease, slug, name, inverseDate, arrayPlatform);
                }


            });

        } else {
            $('#' + appendRelease).append('<li class="list-group-item d-flex justify-content-between align-items-center">No hay juegos confirmados para este mes.</li>');
        }

    }
}
function formatDateNow() {

    let year = NOW_DATE.getFullYear();
    let monthUTC = NOW_DATE.getMonth() + 1;
    let dayUTC = NOW_DATE.getDate();

    let month = '0';
    let day = '0';

    if (monthUTC < 10) {
        month = '0' + monthUTC;
    } else {
        month = monthUTC;
    }

    if (dayUTC < 10) {
        day = '0' + dayUTC;
    } else {
        day = dayUTC;
    }

    let dateNow = year + '-' + month + '-' + day;
    return dateNow;
}

function getPlatform(platforms, position) {

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

    if (position === 'banner') {
        cadena = getBadgeBanners (playstation, xbox, nintendo, pc, mobile);
    }

    return cadena;
}

function getBadgeBanners (playstation, xbox, nintendo, pc, mobile) {

    let cadena = '';

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

    if ((playstation == 0) && (xbox == 0) && (pc == 00) && (nintendo == 0) && (mobile == 0)) {
        cadena = '<span id="badgeCSS" class="badge text-bg-warning"><i class="bi bi-question-square-fill"></i></span>';
    }   

    return cadena;
}

function apppendRelease(appendRelease, slug, name, date, platform) {

    let releaseAppend = '#' + appendRelease;
    let position = 'banner';

    $(releaseAppend).append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
        '<div>' + date + ' - <b><a style="color: black;" target="_blank" href="https://rawg.io/games/' + slug + '">' + name + '</a></b></div>' +
        '<div class="text-end">' + getPlatform(platform, position) + '</div></li>');

}