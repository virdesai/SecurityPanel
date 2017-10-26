/*
 * @Author: Vir Desai 
 * @Date: 2017-10-13 22:52:27 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 21:03:17
 */

/**
 * Global Util Functions
 */

const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const iconMap = {
    '01d': '\uf00d', // clear sky
    '02d': '\uf002', // few clouds
    '03d': '\uf041', // scattered clouds
    '04d': '\uf013', // broken clouds
    '09d': '\uf019', // shower rain
    '10d': '\uf008', // rain
    '11d': '\uf016', // thunderstorm
    '13d': '\uf064', // snow
    '50d': '\uf014', // mist
    '01n': '\uf077',
    '02n': '\uf086',
    '03n': '\uf041',
    '04n': '\uf031',
    '09n': '\uf028',
    '10n': '\uf028',
    '11n': '\uf016',
    '13n': '\uf016',
    '50n': '\uf014'
};

function striptags(input) {
    return input.replace(/(<([^>]+)>)/ig, '');
}

const UTIL = {
    /**
      * Test if Obj is empty
      */
    objIsEmpty: (obj) => {
        if (typeof obj === 'object' && !(obj instanceof Array)) {
            if (Object.keys(obj).length === 0) { return true; }
        }
        return false;
    },

    /**
      * Convert Obj to Arr
      */
    objToArr: obj => Object.keys(obj).map(k => obj[k]),

    /**
      * Limit characters, placing a ... at the end
      */
    limitChars: (str, limit = 15) => {
        if (str.length > limit) { return `${str.substr(0, limit).trim()} ...`; }
        return str;
    },

    /**
      * Decode HTML Entites
      */
    htmlEntitiesDecode: str => entities.decode(str),

    /**
      * Convert all HTMLEntities when Array
      */
    convertHtmlEntitiesArray: (arr) => {
        const finalArr = arr;

        if (arr instanceof Array) {
            arr.forEach((item, key) => {
                if (item instanceof Array) {
                    finalArr[key] = UTIL.convertHtmlEntitiesArray(item);
                } else if (typeof item === 'object') {
                    finalArr[key] = UTIL.convertHtmlEntitiesObject(item);
                } else if (typeof item === 'string') {
                    finalArr[key] = entities.decode(striptags(item));
                }
            });
        }

        return finalArr;
    },

    /**
      * Convert all HTMLEntities when Object
      */
    convertHtmlEntitiesObject: (obj) => {
        const finalObj = obj;

        if (typeof obj === 'object' && !(obj instanceof Array)) {
            Object.keys(obj).forEach((key) => {
                const item = obj[key];

                if (item instanceof Array) {
                    finalObj[key] = UTIL.convertHtmlEntitiesArray(item);
                } else if (typeof item === 'object') {
                    finalObj[key] = UTIL.convertHtmlEntitiesObject(item);
                } else if (typeof item === 'string') {
                    finalObj[key] = entities.decode(striptags(item));
                }
            });
        }

        return finalObj;
    },

    /**
      * Strips all HTML tags
      */
    stripTags: str => striptags(str),

    getIcon: (iconCode) => iconMap[iconCode] || '\uf03e',

    kelvinToFahrenheit: (temp) => temp * 9.0/5.0 - 459.67
};

/* Export ==================================================================== */
module.exports = UTIL;
module.exports.details = {
    title: 'UTIL',
};
