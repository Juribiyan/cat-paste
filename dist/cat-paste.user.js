// ==UserScript==
// @name         CatPaste
// @namespace    https://ochan.ru/gds
// @version      0.1.0
// @description  Clipboard uploading for Catbox
// @updateURL    https://juribiyan.github.io/cat-paste/dist/cat-paste.meta.js
// @downloadURL  https://juribiyan.github.io/cat-paste/dist/cat-paste.user.js
// @author       Snivy
// @match        https://catbox.moe/
// @match        https://litterbox.catbox.moe/
// @icon         https://juribiyan.github.io/cat-paste/favicon.ico
// @grant        none
// ==/UserScript==

"use strict";

(function () {
  var _form$dropzone, _form$dropzone$listen;
  var form = document.querySelector('#dropzoneUpload'),
    drop = form === null || form === void 0 ? void 0 : (_form$dropzone = form.dropzone) === null || _form$dropzone === void 0 ? void 0 : (_form$dropzone$listen = _form$dropzone.listeners) === null || _form$dropzone$listen === void 0 ? void 0 : _form$dropzone$listen.find(function (l) {
      return (l === null || l === void 0 ? void 0 : l.events) && 'drop' in l.events;
    }).events.drop;
  if (drop) {
    window.addEventListener('paste', function (ev) {
      var _ev$clipboardData;
      var items = (_ev$clipboardData = ev.clipboardData) === null || _ev$clipboardData === void 0 ? void 0 : _ev$clipboardData.items,
        files = [];
      if (!items) return;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.kind == 'file') {
          files.push(item.getAsFile());
        }
      }
      drop({
        dataTransfer: {
          files: files
        },
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
    });
  }
})();