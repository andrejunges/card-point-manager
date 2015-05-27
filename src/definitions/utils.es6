let utils = {};

utils.getFirstDayMonth = function() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

utils.getLastDayMonth = function() {
    var d = new Date(),
        aux = new Date(d.getFullYear(), d.getMonth() + 1, 1);

    aux.setDate(aux.getDate() - 1);
    return aux;
}

global.UtilsCpm = utils;
