/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";


/**
 * Convert Url to object
 * @param {String} urlString Url string
 * @returns {Object} Url Object 
 */

export const urlDecode = urlString => {

    return Object.fromEntries(urlString.replace(/%23/g, "#").replace(/%20/g, " ")
    .split("&").map(i => i.split("=")));

}