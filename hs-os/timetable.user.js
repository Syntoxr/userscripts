// ==UserScript==
// @name        hs-os timetable
// @namespace   https://github.com/Syntoxr
// @downloadURL https://github.com/Syntoxr/userscripts/raw/main/hs-os/timetable.user.js
// @supportURL  https://github.com/Syntoxr/userscripts/tree/main/hs-os
// @homepageURL https://github.com/Syntoxr/userscripts/tree/main
// @include     /^https:\/\/studienorganisation\.hs-osnabrueck\.de\/scripts\/mgrqispi\.dll\?APPNAME=CampusNet&PRGNAME=SCHEDULER/
// @grant       GM_addStyle
// @version     1.0
// @author      Syntoxr
// @description UI improvements like conflict highlighting and better readability
// ==/UserScript==

GM_addStyle ( `
table td[abbr*="Spalte 1"] {
  border-right: 1px solid black !important
}
` );

let days = document.getElementsByClassName("weekday");

//determine conflicting days and mark them in header
for(let i = 0; i < 7; i++){
  const day = days[i];
  const colspan = day.getAttribute("colspan");

  if (colspan > 1) {
    day.style.cssText += 'background-color:red !important';
  }
}
