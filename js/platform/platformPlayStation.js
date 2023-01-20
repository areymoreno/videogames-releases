// VARIABLES
const NOW_DATE = new Date();
const API_KEY_PEKE = '9856663a8c5a4005ac6fe75f0504eca8'; // REFRESCA CADA 12 DEL MES - @PekenoSalta
const API_KEY_GREG = '40527447516948558e75a705b01a51fa'; // REFRESCA CADA 11 DEL MES - @GregorI0
const API_KEY_DEVELOP = 'e7e64384f3864a10bc010c11928def1f'; // REFRESCA CADA 03 DEL MES - @Stompilla
const LI_TABLE = 'ReleaseTable';

window.onload = initGameWeb();

function initGameWeb () {

    let theAPI = randomAPI();
    let dateNOW = formatDateNow()

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

function getGamesMonth (appendMonth, initialDate, finishDate, API_KEY) {

    let appendRelease = LI_TABLE + appendMonth

    let requestURL = 'https://api.rawg.io/api/games?key=' + API_KEY + '&dates=' + initialDate + ',' + finishDate + '&page_size=100&ordering=-released&platforms=18,187';
    let request = new XMLHttpRequest();

    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    
    request.onload = function () {
        const requestGamesResponse = request.response;
        const requestGames = JSON.parse(JSON.stringify(requestGamesResponse));

        if (requestGames.results.length > 0) {

            for (let index = requestGames.results.length - 1; index > 0; index--) {

                let name = requestGames.results[index].name;
                let released = requestGames.results[index].released;
                
                let requestPlatform = requestGames.results[index].platforms;
                let arrayPlatform = new Array();
    
                let splitDate = released.split('-');
                let inverseDate = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
    
                if (requestPlatform == null) {
                    let platformNull = '-';
                    apppendRelease(appendRelease, name, inverseDate, platformNull);
                } else {
                    for(let indexP = 0; indexP < requestGames.results[index].platforms.length; indexP++) {
                        arrayPlatform.push(requestPlatform[indexP].platform.name);
                    }
                    apppendRelease(appendRelease, name, inverseDate, arrayPlatform);
                }
                
            }

        } else {
            $('#' + appendRelease).append('<li class="list-group-item d-flex justify-content-between align-items-center">No hay juegos confirmados para este mes.</li>');
        }

    }
}

function formatDateNow () {

    let year = NOW_DATE.getFullYear();
    let monthUTC = NOW_DATE.getMonth() + 1;
    let dayUTC = NOW_DATE.getDate();

    let month = '0';
    let day = '0';

    if(monthUTC < 10) {
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

function apppendRelease (appendRelease, name, date, platform) {

    let releaseAppend = '#' + appendRelease;

    $(releaseAppend).append('<li class="list-group-item d-flex justify-content-between align-items-center">' +
        '<div>' + date + ' - <b>' + name + '</b></div>' + 
        '<div class="text-end"><span id="badgeCSS" class="badge text-bg-primary"><i class="bi bi-playstation"></i></span></div></li>');

}
