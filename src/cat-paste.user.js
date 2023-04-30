// ==UserScript==
// @name         CatPaste
// @namespace    https://ochan.ru/gds
// @version      0.1.0
// @description  Clipboard uploading for Catbox
// @updateURL    https://juribiyan.github.io/cat-paste/src/cat-paste.meta.js
// @downloadURL  https://juribiyan.github.io/cat-paste/src/cat-paste.user.js
// @author       Snivy
// @match        https://catbox.moe/
// @match        https://litterbox.catbox.moe/
// @icon         https://juribiyan.github.io/cat-paste/icon.png
// @grant        none
// ==/UserScript==

(() => {
  let form = document.querySelector('#dropzoneUpload')
  , drop = form?.dropzone?.listeners?.find(l => l?.events && ('drop' in l.events)).events.drop
  if (drop) {
    window.addEventListener('paste', ev => {
      let items = ev.clipboardData?.items
      , files = [];
      if (!items) return;
      for (let i = 0 ; i < items.length ; i++) {
        let item = items[i];
        if (item.kind == 'file') {
          files.push(item.getAsFile())
        }
      }
      drop({
        dataTransfer: { files: files },
        preventDefault: function () {},
        stopPropagation: function () {}
      })
    })
  }
})()