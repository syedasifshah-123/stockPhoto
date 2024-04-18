/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";

/**
 * Import
 */

import { addEventOnElements } from "./utils/event.js";


export const segment = function ($segment, callback) {

    const /** {Node Element} */ $segmentBtns = $segment.querySelectorAll(        
    "[data-segment-btn]");
    let /** {Node Element} */ $lastSelectedSegmentBtn = $segment.querySelector(        
   "[data-segment-btn].selected");

   addEventOnElements($segmentBtns, "click", function () {
    $lastSelectedSegmentBtn.classList.remove("selected");
    this.classList.add("selected");
    $lastSelectedSegmentBtn = this;
    callback(this.dataset.segmentValue);
   });

} 