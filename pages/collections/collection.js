/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";


/**
 * Import
 */

import { client } from "../../js/api_configure.js";
import { collectionCard } from "../../js/collection_card.js";


/**
 * Render featured collection
 */


const /** {NodeElement} */ $collectionGrid = document.querySelector("[data-collection-grid]");
const /** {Number} */ perPage = 36;
let /** {Number} */ currentPage = 1;
let /** {Numnber} */ totalPage = 0;


/**
 * 
 * @param {Number} page Page number 
 */

const loadCollections = function (page) {

    client.collections.featured({ per_page: perPage, page: page }, data => {

        totalPage = Math.ceil(data.total_results / perPage);

        data.collections.forEach(collection => {

            const /** {NoodeElement} */ $collectionCard = collectionCard(collection);

            $collectionGrid.appendChild($collectionCard);

        });

         // when collections loaded
        isLoaded = true;
        (currentPage <= totalPage) && ($loader.style.display = "none");

    })

}


loadCollections(currentPage);


/**
 * Load more photos
 */

const /** {NodeElement} */ $loader = document.querySelector("[data-loader]");
let /** {Boolean} */ isLoaded = false;

const loadMore = function () {
    
    if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) &&
    currentPage <= totalPage && isLoaded) {
  
      currentPage++;
      loadCollections(currentPage);
      isLoaded = false;
  
    }

} 

window.addEventListener("scroll", loadMore);