/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";

/**
 * Import
 */


import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { photoCard } from "../../js/photo_card.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";
import { filter } from "../../js/filter.js";


const /** {NodeElement} */ $filterBar = document.querySelector("[data-filter-bar]");

$filterBar.style.display = window.location.search ? "flex" : "none";


/**
 * Initial filter
 */


const /** {NodeList} */ $filterWrappers = document.querySelectorAll("[data-filter]");

$filterWrappers.forEach($filterWrapper => {
    filter($filterWrapper, window.filterObj, (newObj) => {
        window.filterObj = newObj;
        updateUrl(newObj, "photos");
    });
});


/**
  * Render curated or searched photos
  * If searched something then render searched photos
  * Otherwise render curated photos
  */


const /** {NodeElement} */ $photGrid = document.querySelector("[data-photo-grid]");
const /** {NodeElement} */ $title = document.querySelector("[data-title]");
const /** {Object} */ photoGrid = gridInit($photGrid);
const /** {Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /** {String} */ searchUrl = window.location.search.slice(1);
let /** {Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /** {String} */ title = searchObj ? `${searchObj.query} photos` : "Curated Photos";

$title.textContent = title;
document.title = title;


/**
 * Render all photos 
 * @param {Number} currentPage Current page number 
 */


const renderPhotos = function (currentPage) {

    client.photos[searchObj ? "search" : "curated"]({ ...searchObj, per_page:
    perPage, page: currentPage}, data => {
  
      // console.log(data);
      totalPage = Math.ceil(data.total_results / perPage);
      
      data.photos.forEach(photo => {
  
        const /** {NodeElement} */ $photoCard = photoCard(photo);
  
        updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns);
  
      });
  
      // when photos loaded
      isLoaded = true;
  
      // when no more found, hode loader
      if (currentPage <= totalPage) $loader.style.display = "none";
  
  
    }); 
  
   
  }
  
renderPhotos(currentPage);
  

/**
 * Load more photos
 */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = true;

window.addEventListener("scroll", function () {

  if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) &&
  currentPage <= totalPage && isLoaded) {

    currentPage++;
    renderPhotos(currentPage);
    isLoaded = false;

  }

});