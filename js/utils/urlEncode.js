/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";


/**
 * Convert object to url
 * @param {Object} urlObj url object 
 * @returns url string
 */

export const urlEncode = urlObj => {
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/, "%23");
}