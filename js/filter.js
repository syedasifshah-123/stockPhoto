/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";

/**
 * Import
 */


import { menu } from "./menu.js";


/**
 * Add filter functionally
 * @param {Node} $filterWrapper Filter Wrapper
 * @param {Object} filterObj Filter object
 * @param {Function} callback Callback function 
 */


export const filter = ($filterWrapper, filterObj, callback) => {
   
    const /** {NodeEement} */ $filterClearBtn = $filterWrapper.querySelector(
    "[data-filter-clear]");
    const /** {NodeEement} */ $filterValue = $filterWrapper.querySelector(
    "[data-filter-value]");
    const /** {NodeEement} */ $filterChip = $filterWrapper.querySelector(
    "[data-filter-chip]");
    const /** {NodeEement} */ $filterColorField = $filterWrapper.querySelector(
    "[data-color-field]");
    const /** {String} */ filterKey = $filterWrapper.dataset.filter;
    const /** {Object} */ newObj = filterObj;

    menu($filterWrapper, filterValue => {
        $filterValue.innerText = filterValue;
        $filterChip.classList.add("selected");

        newObj[filterKey] = filterValue;
        callback(newObj);
    });

    $filterClearBtn.addEventListener("click", function () {
        $filterChip.classList.remove("selected");
        $filterValue.innerText = $filterValue.dataset.filterValue;

        delete newObj[filterKey];
        callback(newObj);
    });

    $filterColorField?.addEventListener("change", function () {
        const /** {String} */ filterValue = this.value.toUpperCase();

        $filterValue.innerText = filterValue;
        $filterChip.classList.add("selected");

        newObj[filterKey] = filterValue;
        callback(newObj);
    })

}