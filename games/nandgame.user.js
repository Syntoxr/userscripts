// ==UserScript==
// @name        save manager
// @namespace   https://github.com/Syntoxr
// @downloadURL https://github.com/Syntoxr/userscripts/raw/main/games/nandgame.user.js
// @supportURL  https://github.com/Syntoxr/userscripts/tree/main/games
// @homepageURL https://github.com/Syntoxr/userscripts/tree/main
// @match       https://www.nandgame.com/
// @grant       none
// @version     1.2
// @author      Syntoxr
// @description Adds import / export functionality to nandgame
// @run-at      document-idle
// ==/UserScript==



function setup() {
  let navbarElem = document.querySelector(".container-fluid .justify-content-end");

  //dummyDiv and appending its children is needed cause adding the HTML directly breaks existing buttons
  var dummyDiv = document.createElement( 'div' );

  dummyDiv.innerHTML = `<li class="nav-item" style="margin-left:40px;margin-right:10px"><button id="btnExport" class="nav-link active"><i class="bi"></i>Export</button></li>
                        <li class="nav-item"><button id="btnImport" class="nav-link active"><i class="bi"></i>Import</button></li>
                        <form id="importForm"><input id="importInput" style="display:none" type="file"></form>`


  for(var i=0; i<dummyDiv.children.length + i; i++){
    navbarElem.appendChild(dummyDiv.children[0])
  }


  const dlAnchorElem = document.createElement("a")
  dlAnchorElem.style.display = "none"

  const importForm = document.getElementById("importForm")
  const ulInputElem = document.getElementById("importInput")


  function exportSave() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));

    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "nand-save-" + new Date().toLocaleString() + ".json");
    dlAnchorElem.click();
  }


  btnExport.addEventListener("click",() => {exportSave()})
  btnImport.addEventListener("click",() => {ulInputElem.click()})

  //read file and overwrite localstorage
  const reader = new FileReader();
  reader.onload = function() {
    var fileContent = JSON.parse(reader.result);
    localStorage.clear();
    for (const [key, value] of Object.entries(fileContent)) {
      localStorage.setItem(key, value);
    }
  };

  //listen for file uploads
  ulInputElem.addEventListener("change", (event) => {
    const file = event.target.files[0]

    if (file.type !== "application/json") {
      console.warn("uploaded wrong file type: " + file.type)
      return
    };

    reader.readAsText(file);
    importForm.reset();
    location.reload();
    })
}

setup()
