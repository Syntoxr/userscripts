// ==UserScript==
// @name        hs-os linkfixer
// @namespace   https://github.com/Syntoxr
// @downloadURL https://github.com/Syntoxr/userscripts/raw/main/hs-os/linkfixer.user.js
// @supportURL  https://github.com/Syntoxr/userscripts/tree/main/hs-os
// @homepageURL https://github.com/Syntoxr/userscripts/tree/main
// @match       https://*.hs-osnabrueck.de/*
// @grant       none
// @version     1.0
// @author      Syntoxr
// @description Opens links for common tools in same tab instead of a new one
// ==/UserScript==

// Startpage
if (location.href.includes("https://www.hs-osnabrueck.de")){
  console.log("Fixing links for Startpage")
  document.querySelectorAll('a[href="https://intranet.hs-osnabrueck.de"]').forEach((link) => link.target = "_self");
}



// INTRANET

if (location.href.includes("https://intranet.hs-osnabrueck.de")){
  console.log("Fixing links for Intranet")
  const toolbars = document.querySelectorAll('.o-headerDesktopServiceNavigation__links');
  if(toolbars) {
    for (let toolbar of toolbars){
      for (let item of toolbar.children){
        item.firstElementChild.target = "_self"
      }
    }
  }
}
