/**
 * @copyright codewithasif 2023
 * @author asif <codewithasif@gmail.com>
 */

"use strict";

/**
 * Add ripple effect on an element
 * @param {Node} $rippleElem Element for ripple effect
 */


export const ripple = function ($rippleElem) {
    $rippleElem.addEventListener("pointerdown", function (e) {
        
        e.stopImmediatePropagation();

        const /* {NodeElement} */ $ripple = document.createElement("div");
        $ripple.classList.add("ripple");

        this.appendChild($ripple);

        const removeRipple = () => {
            $ripple.animate({
                opacity: 0
            }, { fill: "forwards", duration: 200 });

            setTimeout(() => {
                $ripple.remove();
            }, 1000);
        }

        this.addEventListener("pointerup", removeRipple);
        this.addEventListener("pointerleave", removeRipple);

        const /* {Boolean} */ isNotIconBtn = !this.classList.contains("icon-btn");

        if (isNotIconBtn) {
            const /* {Number} */ rippleSize = Math.max(this.clientWidth, this.clientHeight);

            $ripple.style.top = `${e.layerY}px`;
            $ripple.style.left = `${e.layerX}px`;
            $ripple.style.width = `${rippleSize}px`;
            $ripple.style.height = `${rippleSize}px`;
        }
 
    });
}