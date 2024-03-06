// ==UserScript==
// @name        hs-os timetable
// @namespace   https://github.com/Syntoxr
// @downloadURL https://github.com/Syntoxr/userscripts/raw/main/hs-os/timetable.user.js
// @supportURL  https://github.com/Syntoxr/userscripts/tree/main/hs-os
// @homepageURL https://github.com/Syntoxr/userscripts/tree/main
// @include     /^https:\/\/studienorganisation\.hs-osnabrueck\.de\/scripts\/mgrqispi\.dll\?APPNAME=CampusNet&PRGNAME=SCHEDULER/
// @grant       GM_addStyle
// @version     1.2
// @author      Syntoxr, Adrian
// @description UI improvements like conflict highlighting and better readability
// ==/UserScript==

GM_addStyle ( `
table td[abbr*="Spalte 1"] {
  border-left: 1px solid black !important
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

// Find conflicting timeslots and mark them.
GM_addStyle ( `
.conflict {
  background-color:red !important
}
` );

const rows = document.getElementById("weekTableRoomplan").children[0].children[1].children
for (row of rows) {
  let lastDay = null;
  let lastAbbr = "";
  for (td of row.children) {
    if (td.classList.contains("appointment")) {
      const abbr = td.abbr.substring(0,2);
      if (lastAbbr == abbr) {
        lastDay.classList.add("conflict");
        td.classList.add("conflict");
      }
      lastAbbr = abbr;
      lastDay = td;
    }
  }
}
