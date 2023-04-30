// ==UserScript==
// @name         CatPaste
// @namespace    https://ochan.ru/gds
// @version      0.1.1
// @description  Clipboard uploading for Catbox
// @updateURL    https://juribiyan.github.io/cat-paste/src/cat-paste.meta.js
// @downloadURL  https://juribiyan.github.io/cat-paste/src/cat-paste.user.js
// @author       Snivy
// @match        https://catbox.moe/
// @match        https://litterbox.catbox.moe/
// @icon         https://juribiyan.github.io/cat-paste/favicon.ico
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(async () => {
  let form = unsafeWindow.document.querySelector('#dropzoneUpload')
  , attempts = 0
  while (!form.dropzone && attempts < 10) {
    await sleep(1000)
    attempts++
  }
  let drop = ([].find.call(form?.dropzone?.listeners, l => l?.events && ('drop' in l.events))).events.drop
  if (drop) {
    window.addEventListener.call(unsafeWindow, 'paste', ev => {
      let items = ev.clipboardData?.items
      , files = [];
      if (!items) return;
      for (let i = 0 ; i < items.length ; i++) {
        let item = items[i];
        if (item.kind == 'file') {
          files.push(item.getAsFile())
        }
      }
      unsafeWindow.__toDrop = cloneInto({
        dataTransfer: { files: files }
      }, unsafeWindow)
      unsafeWindow.__toDrop["preventDefault"] = exportFunction(function() {}, unsafeWindow.__toDrop)
      unsafeWindow.__toDrop["stopPropagation"] = exportFunction(function() {}, unsafeWindow.__toDrop)
      drop(unsafeWindow.__toDrop)
    })
  }

  function sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms)
    })
  }
})()