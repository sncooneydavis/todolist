/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 474:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `// extracted by mini-css-extract-plugin
export {};`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;QACQ,CAAA","sourcesContent":["// extracted by mini-css-extract-plugin\nexport {};"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 355:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/add.svg";

/***/ }),

/***/ 732:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/view-completed.svg";

/***/ }),

/***/ 782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/all-options.svg";

/***/ }),

/***/ 162:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/date.svg";

/***/ }),

/***/ 547:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/time-stopwatch.svg";

/***/ }),

/***/ 81:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/drag-bottom-settings.svg";

/***/ }),

/***/ 928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/drag-view-data.svg";

/***/ }),

/***/ 415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/drag-view-default.svg";

/***/ }),

/***/ 42:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/utility-bar-filter.svg";

/***/ }),

/***/ 216:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/utility-bar-search.svg";

/***/ }),

/***/ 528:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/add-variable.svg";

/***/ }),

/***/ 940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/habit.svg";

/***/ }),

/***/ 699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/down.png";

/***/ }),

/***/ 405:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/recurring.svg";

/***/ }),

/***/ 282:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/reminder.svg";

/***/ }),

/***/ 152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/up.png";

/***/ }),

/***/ 847:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/up.svg";

/***/ }),

/***/ 544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/images/x.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			524: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(474);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/components/main-page.html
// Imports
var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(216), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(42), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(355), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(415), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(732), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(782), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_6___ = new URL(/* asset import */ __webpack_require__(940), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(528), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_8___ = new URL(/* asset import */ __webpack_require__(547), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_9___ = new URL(/* asset import */ __webpack_require__(162), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_10___ = new URL(/* asset import */ __webpack_require__(928), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_11___ = new URL(/* asset import */ __webpack_require__(81), __webpack_require__.b);
// Module
var code = `<div class="main container"> <div id="left-pane"> <div class="left container"> <div id="utility-toolbar" class="single-line"> <input id="utility-input" name="utility-input" type="text"/> <button class="utility button inactive"> <img class="hidden" src="${___HTML_LOADER_IMPORT_0___}"/> <img class="hidden" src="${___HTML_LOADER_IMPORT_1___}"/> <img class="" src="${___HTML_LOADER_IMPORT_2___}"/> </button> </div> <div id="left-view-toolbar"> <button id="home-view-button" type="button"> <img class="bigicon inactive" src="${___HTML_LOADER_IMPORT_3___}"/> </button> <button id="todo-view-button" type="button"> <img class="bigicon" src="${___HTML_LOADER_IMPORT_4___}"/> <img class="bigicon options hidden" src="${___HTML_LOADER_IMPORT_5___}"/> </button> <button id="habit-view-button" type="button"> <img class="bigicon inactive" src="${___HTML_LOADER_IMPORT_6___}"/> <img class="bigicon options hidden" src="${___HTML_LOADER_IMPORT_5___}"/> </button> <button id="measurement-view-button" type="button"> <img class="bigicon inactive" src="${___HTML_LOADER_IMPORT_7___}"/> <img class="bigicon options hidden" src="${___HTML_LOADER_IMPORT_5___}"/> </button> </div> <div id="todo-panel"> </div> <div id="timer-panel" class="hidden"> <button id="main-timer-button" class="dragbar-button" type="button"> <img class="bigicon inactive" src="${___HTML_LOADER_IMPORT_8___}"/> <input class="countup hidden" value="00:00" type="time" step="1" readonly="readonly"/> </button> <button id="main-timer-item-button" class="dragbar-button" class="hidden"> <input id="main-timer-item-name" class="" value="task and time here" type="text" maxlength="15" readonly="readonly"/> </button> </div> </div> <div class="dragbar right"> <div class="solid-line"></div> <div class="z-top top"> <button id="calendar-view-button" class="dragbar-button" type="button"> <img class="dragbar-icon" src="${___HTML_LOADER_IMPORT_9___}"/> </button> <button id="data-view-button" class="dragbar-button" type="button"> <img class="dragbar-icon inactive" src="${___HTML_LOADER_IMPORT_10___}"/> </button> </div> <div class="z-top bottom"> <button id="settings-view-button" class="dragbar-button" type="button"> <img class="dragbar-icon inactive" src="${___HTML_LOADER_IMPORT_11___}"/> </button> </div> </div> </div> <div id="right-pane"> </div> </div>`;
// Exports
/* harmony default export */ const main_page = (code);
;// ./src/components/left-pane/items-views/1.todo-view/2.task-template.html
// Imports
var _2_task_template_HTML_LOADER_IMPORT_0_ = new URL(/* asset import */ __webpack_require__(405), __webpack_require__.b);
var _2_task_template_HTML_LOADER_IMPORT_1_ = new URL(/* asset import */ __webpack_require__(282), __webpack_require__.b);
var _2_task_template_HTML_LOADER_IMPORT_2_ = new URL(/* asset import */ __webpack_require__(152), __webpack_require__.b);
var _2_task_template_HTML_LOADER_IMPORT_3_ = new URL(/* asset import */ __webpack_require__(699), __webpack_require__.b);
var _2_task_template_HTML_LOADER_IMPORT_4_ = new URL(/* asset import */ __webpack_require__(544), __webpack_require__.b);
// Module
var _2_task_template_code = `<div data-list-id="" data-sublist-id="" data-todo-id="" data-todo-type="" class="todo"> <div class="todo-bar"> <input data-field="isCompleted" class="task-checkbox popover hidden" type="checkbox"/> <div class="left"> <input data-field="name" class="todo-title top" type="text" placeholder="add task name"/> <div class="bottom single-line"> <button class="nearest-datetime-button single-line" type="button"> <input data-field="nextSession" class="readonly datetime indicator" type="text" value="" readonly="readonly"/> </button> <button class="cycle-indicator-button hidden" type="button"> <img class="indicator" src="${_2_task_template_HTML_LOADER_IMPORT_0_}"/> </button> <button class="reminder-indicator-button hidden" type="button"> <img class="indicator" src="${_2_task_template_HTML_LOADER_IMPORT_1_}"/> </button> </div> </div> <button class="todo-details-on right" type="button"> <img class="off" src="${_2_task_template_HTML_LOADER_IMPORT_2_}"/> <img class="on hidden" src="${_2_task_template_HTML_LOADER_IMPORT_3_}"/> </button> </div> <div class="todo-edit-dropdown hidden"> <div class="todo-details-dropdown hidden"> <div class="checklist container"> <div class="blank subtask single-line"> <input class="subtask-checkbox" type="checkbox" disabled="disabled"/> <input class="subtask-title blank" type="text" value="" placeholder="click enter to add"/> </div> <div class="extant-subtasks"></div> </div> <textarea data-field="notes" class="notes container" placeholder="Notes"></textarea> <div class="attachment container hidden"> </div> </div> <div class="todo-schedule-dropdown hidden"> <div class="schedule-type-selection single-line"> <button class="datetime-only-button" type="button"> datetime </button> <button class="add-repeat-button" type="button"> cycle </button> <button class="add-deadline-button" type="button"> deadline </button> </div> <div class="schedule-calendar"> </div> <div class="deadline-description hidden"> </div> <div class="scheduled-datetimes-dropdown hidden"> </div> <div class="logged-datetimes-dropdown hidden"> </div> <div class="open-recurring single-line hidden"> <button class="open-recurring-button single-line" type="button"> <img class="icon inactive" src="${_2_task_template_HTML_LOADER_IMPORT_0_}"/> <span class="inactive description"> set recurrence </span> <div class="hidden single-line description"> <span class="hidden"> repeats </span> <input class="recurring-description" type="text" value="" readonly="readonly"/> </div> </button> <button class="clear-recurring-button hidden"> <img class="icon inactive" src="${_2_task_template_HTML_LOADER_IMPORT_4_}"/> </button> </div> <div class="open-reminder single-line hidden"> </div> </div> <div class="bottom-section single-line"> <button class="add-datetime-button left hidden" type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 24 24" id="add-datetime-icon"> <desc>App Window Clock Streamline Icon: https://streamlinehq.com</desc> <path stroke-linecap="round" stroke-linejoin="round" d="M19.949416666666668 7.565185833333333v-5.5c0 -0.3646775 -0.14483333333333334 -0.7144133333333333 -0.40269166666666667 -0.9722716666666665 -0.2578583333333333 -0.25786291666666666 -0.6076583333333333 -0.4027283333333333 -0.9723083333333332 -0.4027283333333333h-16.5c-0.3646683333333333 0 -0.7144133333333333 0.14486541666666666 -0.9722716666666665 0.4027283333333333C0.8442829999999999 1.3507725 0.6994166666666667 1.7005083333333333 0.6994166666666667 2.0651858333333335V17.190158333333333c0 0.36474166666666663 0.14486633333333335 0.7144499999999999 0.4027283333333333 0.9723083333333332 0.2578583333333333 0.2578583333333333 0.6076033333333333 0.40269166666666667 0.9722716666666665 0.40269166666666667h5.5" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M0.6994166666666667 4.8151858333333335h19.25" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M10.321666666666665 15.815158333333333c0 0.7223333333333334 0.14226666666666665 1.4375166666666666 0.41864166666666663 2.1047583333333333 0.27646666666666664 0.6673333333333333 0.6815416666666667 1.2736166666666666 1.1923083333333333 1.7843833333333334 0.510675 0.510675 1.1170499999999999 0.9158416666666667 1.7842916666666666 1.1922166666666667 0.6673333333333333 0.276375 1.3825166666666666 0.41864166666666663 2.1047583333333333 0.41864166666666663s1.4375166666666666 -0.14226666666666665 2.1047583333333333 -0.41864166666666663c0.6673333333333333 -0.276375 1.2736166666666666 -0.6815416666666667 1.7843833333333334 -1.1922166666666667 0.510675 -0.5107666666666667 0.9158416666666667 -1.1170499999999999 1.1922166666666667 -1.7843833333333334 0.276375 -0.6672416666666666 0.41864166666666663 -1.382425 0.41864166666666663 -2.1047583333333333 0 -0.7222416666666667 -0.14226666666666665 -1.437425 -0.41864166666666663 -2.1047583333333333 -0.276375 -0.6672416666666666 -0.6815416666666667 -1.2736166666666666 -1.1923083333333333 -1.7842916666666666 -0.510675 -0.5107666666666667 -1.1169583333333333 -0.9158416666666667 -1.7842916666666666 -1.1922166666666667 -0.6672416666666666 -0.27646666666666664 -1.3825166666666666 -0.4187333333333333 -2.1047583333333333 -0.4187333333333333s-1.437425 0.14226666666666665 -2.1047583333333333 0.4187333333333333c-0.6672416666666666 0.276375 -1.2736166666666666 0.6814499999999999 -1.7842916666666666 1.1922166666666667 -0.5107666666666667 0.510675 -0.9158416666666667 1.1170499999999999 -1.1923083333333333 1.7842916666666666 -0.276375 0.6673333333333333 -0.41864166666666663 1.3825166666666666 -0.41864166666666663 2.1047583333333333Z" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M18.252666666666666 15.815341666666665H15.821666666666667v-2.430083333333333" stroke-width="2"> </path> </svg> </button> <button class="add-details-button left hidden" type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 24 24" id="add-details-icon"> <desc>Notes Checklist Flip Streamline Icon: https://streamlinehq.com</desc> <path stroke-linecap="round" stroke-linejoin="round" d="M2.0625 2.0625h17.875s1.375 0 1.375 1.375v16.5s0 1.375 -1.375 1.375H2.0625s-1.375 0 -1.375 -1.375v-16.5s0 -1.375 1.375 -1.375Z" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M4.8125 0.6875v2.75" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M17.1875 0.6875v2.75" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M11.6875 16.5h4.125" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M11.6875 9.625h4.125" stroke-width="2"></path> <path stroke-linecap="round" stroke-linejoin="round" d="m9.075 14.025 -2.8874999999999997 3.85 -2.0625 -2.0625" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="m9.075 6.875 -2.8874999999999997 3.85L4.125 8.6625" stroke-width="2"> </path> </svg> </button> <div class="right"> <button class="duplicate-button" type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="duplicate-task-icon"> <desc>Duplicate Streamline Icon: https://streamlinehq.com</desc> <path stroke-linecap="round" stroke-linejoin="round" d="M16.75 4.5V1.75c0 -0.55228 -0.4477 -1 -1 -1h-14c-0.55228 0 -1 0.44771 -1 1v14c0 0.5523 0.44772 1 1 1H4.5" stroke-width="2.5"></path> <path stroke-linejoin="round" d="M7.25 8.25c0 -0.55229 0.44772 -1 1 -1h14c0.5523 0 1 0.44772 1 1v14c0 0.5523 -0.4477 1 -1 1h-14c-0.55229 0 -1 -0.4477 -1 -1v-14Z" stroke-width="2.5"></path> </svg> </button> <button class="delete-button" type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="delete-task-icon"> <desc>Bin 1 Streamline Icon: https://streamlinehq.com</desc> <path stroke-linecap="round" stroke-linejoin="round" d="M1 5h22" stroke-width="2"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 1h-4.5c-0.39782 0 -0.77936 0.15804 -1.06066 0.43934C8.40804 1.72064 8.25 2.10218 8.25 2.5V5h7.5V2.5c0 -0.39782 -0.158 -0.77936 -0.4393 -1.06066C15.0294 1.15804 14.6478 1 14.25 1Z" stroke-width="2"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17.75v-7.5" stroke-width="2"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 17.75v-7.5" stroke-width="2"></path> <path stroke-linecap="round" stroke-linejoin="round" d="M18.86 21.62c-0.0278 0.3758 -0.197 0.7271 -0.4735 0.9832 -0.2764 0.256 -0.6397 0.3978 -1.0165 0.3968H6.63c-0.37683 0.001 -0.74006 -0.1408 -1.01653 -0.3968 -0.27647 -0.2561 -0.44565 -0.6074 -0.47347 -0.9832L3.75 5h16.5l-1.39 16.62Z" stroke-width="2"> </path> </svg> </button> </div> </div> </div> </div> <button class="tiny-add-bar" type="button"> </button>`;
// Exports
/* harmony default export */ const _2_task_template = (_2_task_template_code);
;// ./src/components/left-pane/items-views/1.todo-view/subtask-template.html
// Module
var subtask_template_code = `<div data-subtask-id="" class="subtask single-line"> <input data-field="isCompleted" class="subtask-checkbox" type="checkbox"/> <button class="clear-subtask-button hidden" type="button">X</button> <input data-field="name" class="subtask-title" type="text" value="SUBTASK_TITLE" placeholder="+ subtask"/> </div> `;
// Exports
/* harmony default export */ const subtask_template = (subtask_template_code);
;// ./node_modules/date-fns/constants.js
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

;// ./node_modules/date-fns/constructFrom.js


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_constructFrom = ((/* unused pure expression or super */ null && (constructFrom)));

;// ./node_modules/date-fns/toDate.js


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(context || argument, argument);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_toDate = ((/* unused pure expression or super */ null && (toDate)));

;// ./node_modules/date-fns/getDay.js


/**
 * The {@link getDay} function options.
 */

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(date, options) {
  return toDate(date, options?.in).getDay();
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getDay = ((/* unused pure expression or super */ null && (getDay)));

;// ./node_modules/date-fns/getDaysInMonth.js



/**
 * The {@link getDaysInMonth} function options.
 */

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date, considering the context if provided.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = constructFrom(_date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getDaysInMonth = ((/* unused pure expression or super */ null && (getDaysInMonth)));

;// ./src/components/left-pane/datetime-picker.html
// Module
var datetime_picker_code = `<div class="calendar-component"> <div class="cal-heading"> <select class="month indicator" name="date-month"> <option value="0">Jan</option> <option value="1">Feb</option> <option value="2">Mar</option> <option value="3">Apr</option> <option value="4">May</option> <option value="5">Jun</option> <option value="6">Jul</option> <option value="7">Aug</option> <option value="8">Sep</option> <option value="9">Oct</option> <option value="10">Nov</option> <option value="11">Dec</option> </select> <select class="year" name="date-year"></select> </div> <div class="cal-body"> <div class="day-names single-line"> <span class="day-name">Sun</span> <span class="day-name">Mon</span> <span class="day-name">Tue</span> <span class="day-name">Wed</span> <span class="day-name">Thu</span> <span class="day-name">Fri</span> <span class="day-name">Sat</span> </div> <div class="date-numbers"></div> </div> </div> `;
// Exports
/* harmony default export */ const datetime_picker = (datetime_picker_code);
;// ./src/utilities/date-picker.js
/* eslint-disable no-console */
/* eslint-disable no-plusplus */



class SelectedDate {
  constructor(date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.monthName = date.toLocaleString('en-US', { month: 'short' });
    this.day = date.getDate();
  }

  static get currentYear() {
    return new Date().getFullYear();
  }

  changeMonthEvent(event) {
    const todoElement = event.target.closest('.todo');
    const newDate = new Date(this.year, event.target.value, this.day);
    // eslint-disable-next-line no-use-before-define
    const newClone = createCalendarClone(newDate);
    event.target.closest('.schedule-calendar').replaceChildren(newClone);
    const datetimeElement = todoElement.querySelector('.readonly.datetime');
    datetimeElement.setAttribute(
      'value',
      `${this.year}-${event.target.value}-${this.day}`
    );
    datetimeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  changeYearEvent(event) {
    const todoElement = event.target.closest('.todo');
    const newDate = new Date(event.target.value, this.month, this.day);
    // eslint-disable-next-line no-use-before-define
    const newClone = createCalendarClone(newDate);
    event.target.closest('.schedule-calendar').replaceChildren(newClone);
    const datetimeElement = todoElement.querySelector('.readonly.datetime');
    datetimeElement.setAttribute(
      'value',
      `${event.target.value}-${this.month + 1}-${this.day}`
    );
    datetimeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  changeDayEvent(event) {
    const todoElement = event.target.closest('.todo');
    const newDate = new Date(
      this.year,
      this.month,
      event.target.getAttribute('data-number')
    );
    // eslint-disable-next-line no-use-before-define
    const newClone = createCalendarClone(newDate);
    event.target.closest('.schedule-calendar').replaceChildren(newClone);
    const datetimeElement = todoElement.querySelector('.readonly.datetime');
    datetimeElement.classList.remove('hidden');
    datetimeElement.setAttribute(
      'value',
      `${this.year}-${this.month + 1}-${event.target.getAttribute('data-number')}`
    );
    datetimeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

function createCalendarClone(date) {
  const calendarTemplate = document.createElement('template');
  calendarTemplate.innerHTML = datetime_picker;
  const calendarClone = document.importNode(calendarTemplate.content, true);
  const selectedDate = new SelectedDate(date);
  const yearDropdown = calendarClone.querySelector('.year');
  for (let i = 0; i < 5; i++) {
    yearDropdown.innerHTML += `
    <option value="${SelectedDate.currentYear + i}">
      ${SelectedDate.currentYear + i}
    </option>`;
  }
  calendarClone.querySelector(
    `.year > [value="${selectedDate.year}"]`
  ).selected = true;
  calendarClone.querySelector(
    `.month > [value="${selectedDate.month}"]`
  ).selected = true;

  // fill grid with empty buttons for day of the previous month
  const dayOfWeekNumber = getDay(
    new Date(selectedDate.year, selectedDate.month, 1)
  );
  for (let i = 0; i < dayOfWeekNumber; i++) {
    calendarClone.querySelector('.date-numbers').innerHTML +=
      '<button class="empty-date-number" disabled></button>';
  }

  // fill in date number buttons for each day of month
  const daysOfSelectedMonth = getDaysInMonth(date);
  for (let i = 1; i <= daysOfSelectedMonth; i++) {
    calendarClone.querySelector('.date-numbers').innerHTML += `
      <button class="date-number selectable" data-number="${i}">${i}</button>`;
  }
  if (selectedDate.day) {
    const chosenDateButton = calendarClone.querySelector(
      `.date-numbers > [data-number="${selectedDate.day}"]`
    );
    chosenDateButton.disabled = true;
    chosenDateButton.classList.add('selected');
  }

  // Change Month Handler
  calendarClone
    .querySelector('.month')
    // eslint-disable-next-line no-use-before-define
    .addEventListener(
      'change',
      selectedDate.changeMonthEvent.bind(selectedDate)
    );

  // Change Year Handler
  calendarClone
    .querySelector('.year')
    // eslint-disable-next-line no-use-before-define
    .addEventListener(
      'change',
      selectedDate.changeYearEvent.bind(selectedDate)
    );

  // Change Day Handler
  const allDateNumberButtons = calendarClone.querySelectorAll('.date-number');
  allDateNumberButtons.forEach((button) =>
    button.addEventListener(
      'click',
      selectedDate.changeDayEvent.bind(selectedDate)
    )
  );

  return calendarClone;
}

;// ./src/view/todo-view.js
/* eslint-disable no-console */
/* eslint-disable import/extensions */




class TodoView {
  constructor(modeller, controller) {
    this.todoModeller = modeller;
    this.todoModel = modeller.todoModel;
    this.todoController = controller;
  }

  // TDL: move all event handlers that affect both DOM and Model to the controller
  // TDL: all query selectors initialized first whenever action is taken on new todo
  static SELECTORS = {
    dateTimeTaskBarButton: '.nearest-datetime-button',
    toggleDetailsArrow: '.todo-details-on',
    todoEditDropdown: '.todo-edit-dropdown',
    todoDetailsDropdown: '.todo-details-dropdown',
    todoScheduleDropdown: '.todo-schedule-dropdown',
    extantSubtasks: '.extant-subtasks',
    subtaskTitle: '.subtask-title',
    subtaskCheckbox: '.subtask-checkbox',
    subtaskDelete: '.clear-subtask-button',
    notesContainer: '.notes.container',
    readonlyDatetime: '.readonly.datetime',
    changeDatetimeButton: '.nearest-datetime-button',
    workDate: '.open-edit-button .work-date',
    workTime: '.open-edit-button .work-time',
    addDateTimeButton: '.add-datetime-button',
    addDetailsButton: '.add-details-button',
    datetimeOnlyButton: '.datetime-only-button',
    datetimeAndDeadlineButton: '.add-deadline-button',
    scheduleCalendar: '.schedule-calendar',
    deleteButton: '.delete-button',
    tinyAdd: '.tiny-add-bar',
  };

  renderTodo(todo) {
    if (todo.isCompleted === false) {
      // TDL: put this in static initialization block
      const todoTemplate = document.createElement('template');
      todoTemplate.innerHTML = _2_task_template;
      const todoClone = document.importNode(todoTemplate.content, true);
      todoClone.querySelector('.todo-title').setAttribute('value', todo.name);
      const todoDiv = todoClone.querySelector('.todo');
      todoDiv.setAttribute('data-list-id', todo.listId);
      todoDiv.setAttribute('data-sublist-id', todo.sublistId);
      todoDiv.setAttribute('data-todo-id', todo.todoId);
      todoDiv.setAttribute('data-todo-type', todo.type);

      // .todo-bar event listeners
      todoDiv.addEventListener('mouseover', TodoView.taskCheckboxMouseover);
      todoDiv.addEventListener(
        'mouseout',
        this.taskCheckboxMouseout.bind(this)
      );
      const taskCheckbox = todoDiv.querySelector('.task-checkbox');
      taskCheckbox.addEventListener('change', TodoView.removeCompletedTodo);
      todoClone
        .querySelector(TodoView.SELECTORS.toggleDetailsArrow)
        .addEventListener('click', TodoView.handleDropdownArrowClick);

      // .bottom-section event listeners
      todoClone
        .querySelector(TodoView.SELECTORS.deleteButton)
        .addEventListener('click', this.handleDeleteTodoElement.bind(this));
      todoClone
        .querySelector(TodoView.SELECTORS.addDateTimeButton)
        .addEventListener(
          'click',
          TodoView.toggleDetailsDatetimeDropdownsEvent
        );
      todoClone
        .querySelector(TodoView.SELECTORS.addDetailsButton)
        .addEventListener(
          'click',
          TodoView.toggleDetailsDatetimeDropdownsEvent
        );

      // tiny add bar functionality
      todoClone
        .querySelector(TodoView.SELECTORS.tinyAdd)
        .addEventListener('mouseover', (event) => {
          // eslint-disable-next-line no-param-reassign
          event.target.innerHTML = '+';
        });
      todoClone
        .querySelector(TodoView.SELECTORS.tinyAdd)
        .addEventListener('mouseout', (event) => {
          // eslint-disable-next-line no-param-reassign
          event.target.innerHTML = '';
        });
      todoClone
        .querySelector(TodoView.SELECTORS.tinyAdd)
        .addEventListener(
          'click',
          this.handleTinyAddBarBelowTaskClick.bind(this)
        );

      if (todo.nextSession) {
        // TODO: send to datetime-formatter.js and replace todo.workDate below with output
        const dateTimeTaskBarValue = todoClone.querySelector(
          TodoView.SELECTORS.readonlyDatetime
        );
        dateTimeTaskBarValue.setAttribute('value', todo.nextSession);
        todoClone
          .querySelector(TodoView.SELECTORS.changeDatetimeButton)
          .addEventListener('click', TodoView.handleDatetimeButtonClick);
        const calendarClone = createCalendarClone(new Date(todo.nextSession));
        todoClone
          .querySelector(TodoView.SELECTORS.scheduleCalendar)
          .appendChild(calendarClone);
      } else {
        todoClone
          .querySelector(TodoView.SELECTORS.readonlyDatetime)
          .classList.add('hidden');
        const calendarClone = createCalendarClone(new Date());
        todoClone
          .querySelector(TodoView.SELECTORS.scheduleCalendar)
          .appendChild(calendarClone);
      }

      // checklist event handlers and rendering
      const extantSubtasksContainer = todoClone.querySelector(
        TodoView.SELECTORS.extantSubtasks
      );
      if (todo.checklist) {
        todo.checklist.forEach((subtask) => {
          this.addSubtaskToDOMfromData(subtask, extantSubtasksContainer);
        });
      }
      todoClone
        .querySelector('.blank.subtask .subtask-title')
        .addEventListener('keypress', this.handleSubtaskAddOnEnter.bind(this));

      if (todo.notes) {
        const notesContainer = todoClone.querySelector(
          TodoView.SELECTORS.notesContainer
        );
        notesContainer.value = todo.notes;
      }
      return todoClone;
    }
    return null;
  }

  handleTinyAddBarBelowTaskClick(event) {
    const priorTodo = event.target.previousElementSibling;
    const todoData =
      this.todoController.appendToMiddleOfModelAndReturnBlankTodo(priorTodo);
    const todoClone = this.renderTodo(todoData);
    const { parentNode } = event.target;
    parentNode.insertBefore(todoClone, event.target.nextSibling);
    const todoTitleElement = parentNode.querySelector(
      `.todo[data-todo-id='${todoData.todoId}'] .todo-title`
    );
    todoTitleElement.focus();
    // TDL: show datetime button 'schedule task' then hide until datetime added
  }

  handleTinyAddBarBelowListClick(event) {
    const todoData = this.todoController.appendToStartOfListAndReturnBlankTodo(
      event.target.nextElementSibling
    );
    const todoClone = this.renderTodo(todoData);
    event.target.after(todoClone);
    event.target.parentNode
      .querySelector(`.todo[data-todo-id='${todoData.todoId}'] .todo-title`)
      .focus();
  }

  static removeCompletedTodo(event) {
    const todoDiv = event.target.closest('.todo');
    // eslint-disable-next-line no-param-reassign
    event.target.value = true;
    todoDiv.remove();
  }

  // TDL: move this and its event listener to the controller
  handleDeleteTodoElement(event) {
    const dataElementToDelete = this.todoController.getTodoData(
      event.currentTarget
    );
    this.todoModeller.deleteFromModelAndStore(dataElementToDelete);
    const todoDiv = event.target.closest('.todo');
    if (todoDiv.nextElementSibling.classList.contains('tiny-add-bar')) {
      todoDiv.nextElementSibling.remove();
    }
    todoDiv.remove();
  }

  // NEED TO REMOVE MODEL IN VIEW
  taskCheckboxMouseout(event) {
    const todoData = this.todoController.getTodoData(event.currentTarget);
    if (!todoData.isDetailsOpen && !todoData.isScheduleOpen) {
      event.currentTarget
        .querySelector('.task-checkbox.popover')
        .classList.add('hidden');
    }
  }

  static taskCheckboxMouseover(event) {
    event.currentTarget
      .querySelector('.task-checkbox.popover')
      .classList.remove('hidden');
  }

  static handleDropdownArrowClick(event) {
    const todoBarDiv = event.currentTarget.closest('.todo-bar');
    const todoElement = event.currentTarget.closest('.todo');
    const editingDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoEditDropdown
    );
    const detailsDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoDetailsDropdown
    );
    const detailsViewButton = todoElement.querySelector(
      TodoView.SELECTORS.addDetailsButton
    );
    const scheduleDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoScheduleDropdown
    );
    const scheduleViewButton = todoElement.querySelector(
      TodoView.SELECTORS.addDateTimeButton
    );
    const arrowsElement = todoElement.querySelector('.todo-details-on');
    // details dropdown is open
    if (!detailsDropdownElement.classList.contains('hidden')) {
      todoBarDiv.style.borderBottomLeftRadius = '10px';
      todoBarDiv.style.borderBottomRightRadius = '10px';
      detailsDropdownElement.classList.add('hidden');
      scheduleViewButton.classList.add('hidden');

      // schedule dropdown is open
    } else if (!scheduleDropdownElement.classList.contains('hidden')) {
      todoBarDiv.style.borderBottomLeftRadius = '10px';
      todoBarDiv.style.borderBottomRightRadius = '10px';
      scheduleDropdownElement.classList.add('hidden');
      detailsViewButton.classList.add('hidden');

      // both are closed, so open details dropdown
    } else if (editingDropdownElement.classList.contains('hidden')) {
      detailsDropdownElement.classList.remove('hidden');
      todoBarDiv.style.borderBottomLeftRadius = '0px';
      todoBarDiv.style.borderBottomRightRadius = '0px';
      scheduleViewButton.classList.remove('hidden');
    }
    editingDropdownElement.classList.toggle('hidden');
    TodoView.toggleDropdownArrows(arrowsElement);
  }

  static handleDatetimeButtonClick(event) {
    const todoBarDiv = event.currentTarget.closest('.todo-bar');
    const todoElement = event.currentTarget.closest('.todo');
    const editingDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoEditDropdown
    );
    const detailsDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoDetailsDropdown
    );
    const detailsViewButton = todoElement.querySelector(
      TodoView.SELECTORS.addDetailsButton
    );
    const scheduleDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoScheduleDropdown
    );
    const arrowsElement = todoElement.querySelector('.todo-details-on');

    // details dropdown is open
    if (!detailsDropdownElement.classList.contains('hidden')) {
      TodoView.toggleDetailsDatetimeDropdownsEvent(event);

      // schedule dropdown is open
    } else if (!scheduleDropdownElement.classList.contains('hidden')) {
      TodoView.toggleDropdownArrows(arrowsElement);
      todoBarDiv.style.borderBottomLeftRadius = '10px';
      todoBarDiv.style.borderBottomRightRadius = '10px';
      detailsViewButton.classList.add('hidden');
      scheduleDropdownElement.classList.add('hidden');
      editingDropdownElement.classList.add('hidden');

      // both are closed
    } else {
      TodoView.toggleDropdownArrows(arrowsElement);
      todoBarDiv.style.borderBottomLeftRadius = '0px';
      todoBarDiv.style.borderBottomRightRadius = '0px';
      detailsViewButton.classList.remove('hidden');
      scheduleDropdownElement.classList.remove('hidden');
      editingDropdownElement.classList.remove('hidden');
    }
  }

  static toggleDropdownArrows(arrowsElement) {
    arrowsElement
      .querySelector(':scope > :first-child')
      .classList.toggle('hidden');
    arrowsElement
      .querySelector(':scope > :nth-child(2)')
      .classList.toggle('hidden');
  }

  // when buttons in edit-dropdown clicked
  static toggleDetailsDatetimeDropdownsEvent(event) {
    const todoDiv = event.currentTarget.closest('.todo');
    todoDiv
      .querySelector(TodoView.SELECTORS.todoScheduleDropdown)
      .classList.toggle('hidden');
    todoDiv
      .querySelector(TodoView.SELECTORS.todoDetailsDropdown)
      .classList.toggle('hidden');
    todoDiv
      .querySelector(TodoView.SELECTORS.addDateTimeButton)
      .classList.toggle('hidden');
    todoDiv
      .querySelector(TodoView.SELECTORS.addDetailsButton)
      .classList.toggle('hidden');
  }

  handleSubtaskAddOnEnter(event) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        const newSubtaskData =
          this.todoController.addAndReturnNewSubtask(event);
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
        const extantSubtasksContainer = event.target
          .closest('.todo')
          .querySelector(TodoView.SELECTORS.extantSubtasks);
        this.addSubtaskToDOMfromData(newSubtaskData, extantSubtasksContainer);
      }
    }
  }

  static toggleShowDeleteSubtaskButton(event) {
    event.target
      .closest('.subtask')
      .querySelector('.clear-subtask-button')
      ?.classList.toggle('hidden');
  }

  addSubtaskToDOMfromData(subtask, extantSubtasksContainer) {
    const subtaskTemplate = document.createElement('template');
    subtaskTemplate.innerHTML = subtask_template;
    const subtaskClone = document.importNode(subtaskTemplate.content, true);
    subtaskClone.firstElementChild.setAttribute(
      'data-subtask-id',
      subtask.subtaskId
    );
    subtaskClone
      .querySelector(TodoView.SELECTORS.subtaskTitle)
      .setAttribute('value', subtask.name);
    if (subtask.isCompleted) {
      subtaskClone.querySelector(TodoView.SELECTORS.subtaskCheckbox).checked =
        true;
    } else {
      subtaskClone.querySelector(TodoView.SELECTORS.subtaskCheckbox).checked =
        false;
    }
    ['focusin', 'focusout'].forEach((eventType) => {
      subtaskClone
        .querySelector('.subtask')
        .addEventListener(eventType, (event) => {
          setTimeout(() => {
            if (
              !document.activeElement.classList.contains(
                TodoView.SELECTORS.subtaskDelete
              )
            ) {
              TodoView.toggleShowDeleteSubtaskButton(event);
            }
          }, 100);
        });
    });

    subtaskClone
      .querySelector('.clear-subtask-button')
      .addEventListener(
        'click',
        this.todoController.handleSubtaskDelete.bind(this)
      );
    extantSubtasksContainer.appendChild(subtaskClone);
  }
}

;// ./src/components/left-pane/items-views/1.todo-view/list-template.html
// Imports
var list_template_HTML_LOADER_IMPORT_0_ = new URL(/* asset import */ __webpack_require__(847), __webpack_require__.b);
var list_template_HTML_LOADER_IMPORT_1_ = new URL(/* asset import */ __webpack_require__(699), __webpack_require__.b);
// Module
var list_template_code = ` <div class="left popover hidden"> <button class="collapse-one-level-button" type="button"> <img class="edit icon" src="${list_template_HTML_LOADER_IMPORT_0_}"/> </button> <button class="expand-one-level-button" type="button"> <img class="edit icon" src="${list_template_HTML_LOADER_IMPORT_1_}"/> </button> <button class="organize-by-button" type="button"> ○ </button> </div> <ul class="order-options popover hidden"> <li> <input id="order-by-name" name="organize-by" type="radio"/> Name </li> <li> <input id="order-by-type" name="organize-by" type="radio"/> Type </li> <li> <input id="order-by-oldest-to-newest" name="organize-by" type="radio"/> Oldest to Newest </li> <li> <input id="order-by-newest-to-oldest" name="organize-by" type="radio"/> Newest to Oldest </li> </ul> <div data-list-id="" class="list"> <div class="heading single-line"> <button class="open-list-button" type="button"> <input class="readonly title" type="text" value="LIST_TITLE" readonly="readonly"/> </button> <input data-field="name" class="editing-list-title hidden" type="text" value="LIST_TITLE"/> <button class="options-list-button hidden" type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 24 24" id="open-options-icon"> <desc>Reward Stars 2 Streamline Icon: https://streamlinehq.com</desc> <path stroke-linecap="round" stroke-linejoin="round" d="M9.855083333333333 1.2604166666666665c-0.02291666666666667 5.757583333333333 2.776583333333333 9.023666666666665 9.166666666666666 9.166666666666666 -5.92625 -0.02291666666666667 -8.866 3.1542499999999998 -9.166666666666666 9.166666666666666 -0.057749999999999996 -5.6714166666666666 -2.5923516666666666 -9.174916666666666 -9.16668775 -9.166666666666666 5.881336083333333 -0.08249999999999999 9.143771083333332 -2.9214166666666666 9.16668775 -9.166666666666666Z" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M17.427666666666667 1.2604166666666665v3.6666666666666665" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M15.594333333333333 3.09375h3.6666666666666665" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M19.479166666666664 17.072916666666664v3.6666666666666665" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M17.645833333333332 18.90625h3.6666666666666665" stroke-width="2"> </path> </svg> </button> </div> <div class="body container hidden"> <div class="options popover hidden"> <button class="add-sublist-button"> Add Sublist </button> <button class="print-list-button"> Print List </button> <button class="archive-list-button"> Archive List </button> </div> <div class="todo container"> <button class="tiny-add-bar-list" type="button"> </button></div> <div class="sublist container"> </div> </div> </div> `;
// Exports
/* harmony default export */ const list_template = (list_template_code);
;// ./src/components/left-pane/items-views/1.todo-view/sublist-template.html
// Module
var sublist_template_code = ` <div data-list-id="" data-sublist-id="" class="sublist"> <div class="heading single-line"> <button class="open-list-button" type="button"> <input class="readonly title" type="text" value="LIST_TITLE" readonly="readonly"/> </button> <input data-field="name" class="editing-list-title hidden" type="text" value="LIST_TITLE"/> <button class="options-list-button hidden" type="button"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-1 -1 24 24" id="open-options-icon"> <desc>Reward Stars 2 Streamline Icon: https://streamlinehq.com</desc> <path stroke-linecap="round" stroke-linejoin="round" d="M9.855083333333333 1.2604166666666665c-0.02291666666666667 5.757583333333333 2.776583333333333 9.023666666666665 9.166666666666666 9.166666666666666 -5.92625 -0.02291666666666667 -8.866 3.1542499999999998 -9.166666666666666 9.166666666666666 -0.057749999999999996 -5.6714166666666666 -2.5923516666666666 -9.174916666666666 -9.16668775 -9.166666666666666 5.881336083333333 -0.08249999999999999 9.143771083333332 -2.9214166666666666 9.16668775 -9.166666666666666Z" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M17.427666666666667 1.2604166666666665v3.6666666666666665" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M15.594333333333333 3.09375h3.6666666666666665" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M19.479166666666664 17.072916666666664v3.6666666666666665" stroke-width="2"> </path> <path stroke-linecap="round" stroke-linejoin="round" d="M17.645833333333332 18.90625h3.6666666666666665" stroke-width="2"> </path> </svg> </button> </div> <div class="body container hidden"> <div class="options popover hidden"> <button class="print-sublist-button"> Print Sublist </button> <button class="archive-list-button"> Archive Sublist </button> </div> <button class="tiny-add-bar-list" type="button"></button></div> </div> `;
// Exports
/* harmony default export */ const sublist_template = (sublist_template_code);
;// ./src/view/list-view.js
/* eslint-disable no-console */
/* eslint-disable import/extensions */




class ListView {
  constructor(modeller, controller) {
    this.todoController = controller;
    this.todoModeller = modeller;
    this.todoModel = modeller.todoModel;
    this.todoView = new TodoView(modeller, controller);

    this.renderView();
  }

  static SELECTORS = {
    readonlyTitle: '.readonly.title',
    editingTitle: '.editing-list-title',
    optionsPopover: '.options.popover',
    optionsListButton: '.options-list-button',
    todoContainer: '.todo.container',
    sublistContainer: '.sublist.container',
    bodyContainer: '.body.container',
    openListButton: '.open-list-button',
    tinyAdd: '.tiny-add-bar-list',
  };

  renderView() {
    const container = document.getElementById('todo-panel');
    container.innerHTML = '';
    this.todoModel.forEach((list) => {
      container.appendChild(this.renderList(list));
      // this is a hack; TDL: replace with default list
      if (list.listId === 'list-1') {
        list.toggleOpen();
        ListView.toggleListOpen(list);
      }
    });
    container.addEventListener(
      'change',
      this.todoController.handleInputChange.bind(this)
    );
  }

  renderList(list) {
    const listTemplate = document.createElement('template');
    listTemplate.innerHTML = list_template;
    const listClone = document.importNode(listTemplate.content, true);

    listClone.querySelector('.list').setAttribute('data-list-id', list.listId);
    const readonlyListTitleDiv = listClone.querySelector(
      ListView.SELECTORS.readonlyTitle
    );
    readonlyListTitleDiv.setAttribute('value', list.name);
    readonlyListTitleDiv.addEventListener(
      'click',
      this.readonlyListTitleClick.bind(this)
    );
    listClone
      .querySelector(ListView.SELECTORS.editingTitle)
      .setAttribute('value', list.name);

    const optionsListButton = listClone.querySelector(
      ListView.SELECTORS.optionsListButton
    );
    optionsListButton.addEventListener('click', ListView.optionsListClick);

    // tiny add bar fxy
    listClone
      .querySelector(ListView.SELECTORS.tinyAdd)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAdd)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAdd)
      .addEventListener(
        'click',
        this.todoView.handleTinyAddBarBelowListClick.bind(this.todoView)
      );

    // Populate todo container
    list.todos.forEach((todo) => {
      const todoClone = this.todoView.renderTodo(todo);
      if (todoClone) {
        listClone
          .querySelector(ListView.SELECTORS.todoContainer)
          .appendChild(todoClone);
      }
    });

    // Populate sublist container
    const sublistContainer = listClone.querySelector(
      ListView.SELECTORS.sublistContainer
    );
    if (list.sublists.length !== 0) {
      list.sublists.forEach((sublist) => {
        const sublistClone = this.populateSublist(sublist);
        if (sublistClone) {
          sublistContainer.appendChild(sublistClone);
        }
      });
    } else {
      sublistContainer.classList.add('hidden');
    }
    return listClone;
  }

  readonlyListTitleClick(event) {
    const sublistId = event.target
      .closest('.sublist')
      ?.getAttribute('data-sublist-id');
    const listId = event.target.closest('.list').getAttribute('data-list-id');

    if (!sublistId) {
      this.todoModel.forEach((list) => {
        list.toggleOpen();
        ListView.toggleListOpen(list);
      });
    } else {
      const listData = this.todoModel.find((list) => list.listId === listId);
      console.log('sublist ID', sublistId);
      listData.sublists.forEach((sublist) => {
        if (sublist.isOpen || sublist.sublistId === sublistId) {
          sublist.toggleOpen();
          ListView.toggleListOpen(sublist);
        }
      });
    }
  }

  static optionsListClick(event) {
    const optionsPopover = event.currentTarget
      .closest('.heading')
      .nextElementSibling.querySelector(ListView.SELECTORS.optionsPopover);
    if (optionsPopover) {
      optionsPopover.classList.toggle('hidden');
    }
  }

  static toggleListOpen(list) {
    let listDiv;
    if (list.listId) {
      listDiv = document.querySelector(`div[data-list-id="${list.listId}"]`);
    } else if (list.sublistId) {
      listDiv = document.querySelector(
        `div[data-sublist-id="${list.sublistId}"]`
      );
    }
    if (listDiv) {
      const bodyContainer = listDiv.querySelector(
        ListView.SELECTORS.bodyContainer
      );
      if (bodyContainer) {
        bodyContainer.classList.toggle('hidden');
      }

      const headingDiv = listDiv.querySelector('.heading');
      if (headingDiv) {
        if (list.isOpen) {
          headingDiv.style.borderBottomLeftRadius = '0px';
          headingDiv.style.borderBottomRightRadius = '0px';
        } else {
          headingDiv.style.borderBottomLeftRadius = '10px';
          headingDiv.style.borderBottomRightRadius = '10px';
        }
      }

      const openListButton = listDiv.querySelector(
        ListView.SELECTORS.openListButton
      );
      if (openListButton) {
        openListButton.classList.toggle('hidden');
      }

      const editingListTitle = listDiv.querySelector(
        ListView.SELECTORS.editingTitle
      );
      if (editingListTitle) {
        editingListTitle.classList.toggle('hidden');
      }

      const optionsButton = listDiv.querySelector(
        ListView.SELECTORS.optionsListButton
      );
      if (optionsButton) {
        optionsButton.classList.toggle('hidden');
      }
    }
  }

  populateSublist(sublist) {
    const sublistTemplate = document.createElement('template');
    sublistTemplate.innerHTML = sublist_template;
    const sublistClone = document.importNode(sublistTemplate.content, true);

    const sublistDiv = sublistClone.querySelector('.sublist');
    sublistDiv.setAttribute('data-sublist-id', sublist.sublistId);
    const readonlySublistTitleDiv = sublistClone.querySelector(
      ListView.SELECTORS.readonlyTitle
    );
    readonlySublistTitleDiv.setAttribute('value', sublist.name);
    readonlySublistTitleDiv.addEventListener(
      'click',
      this.readonlyListTitleClick.bind(this)
    );
    sublistClone
      .querySelector(ListView.SELECTORS.editingTitle)
      .setAttribute('value', sublist.name);

    const optionsSublistButton = sublistClone.querySelector(
      ListView.SELECTORS.optionsListButton
    );
    optionsSublistButton.addEventListener('click', ListView.optionsListClick);

    // tiny add bar fxy
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAdd)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAdd)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAdd)
      .addEventListener(
        'click',
        this.todoView.handleTinyAddBarBelowListClick.bind(this.todoView)
      );

    // Populate todo container
    sublist.todos.forEach((todo) => {
      const todoClone = this.todoView.renderTodo(todo);
      if (todoClone) {
        sublistClone
          .querySelector(ListView.SELECTORS.bodyContainer)
          .appendChild(todoClone);
      }
    });
    return sublistClone;
  }
}

;// ./src/model/item-classes.js
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */

class SubtaskData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  constructor({ name, isCompleted = false }) {
    this.subtaskId = `subtask-${SubtaskData.incrementCounter()}`;
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

class SessionData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  constructor({
    startDate = null,
    startTime = null,
    endDate = null,
    endTime = null,
    isLogged = false,
    isPast = false,
  } = {}) {
    // defaults to empty session if no vals
    this.sessionId = `session-${SessionData.incrementCounter()}`;
    this.startDate = startDate;
    this.startTime = startTime;
    this.endDate = endDate;
    this.endTime = endTime;
    this.isLogged = isLogged;
    this.isPast = isPast;
  }
}

class TodoData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  #isDetailsOpen;

  #isScheduleOpen;

  constructor({
    listId = '',
    sublistId = '',
    name = '',
    type = 'task',
    isDetailsOpen = false,
    isScheduleOpen = false,
    isCompleted = false,
    schedule = [],
    nextSession = null,
    checklist = [],
    notes = '',
  } = {}) {
    this.listId = listId;
    this.sublistId = sublistId;
    this.todoId = `todo-${TodoData.incrementCounter()}`;
    this.name = name;
    this.type = type;
    this.#isDetailsOpen = isDetailsOpen;
    this.#isScheduleOpen = isScheduleOpen;
    this.isCompleted = isCompleted;
    this.schedule = Array.isArray(schedule)
      ? schedule.map((session) =>
          session instanceof SessionData ? session : new SessionData(session)
        )
      : [];
    this.nextSession = nextSession;
    this.checklist = Array.isArray(checklist)
      ? checklist.map((subtask) => new SubtaskData(subtask))
      : [];
    this.notes = notes;
  }

  get isScheduleOpen() {
    return this.#isScheduleOpen;
  }

  get isDetailsOpen() {
    return this.#isDetailsOpen;
  }

  toggleScheduleOpen() {
    this.#isScheduleOpen = !this.#isScheduleOpen;
  }

  toggleDetailsOpen() {
    this.#isDetailsOpen = !this.#isDetailsOpen;
  }

  checkIfNextSession(sessionToCheck) {
    if (!(sessionToCheck instanceof SessionData)) {
      throw new Error('Invalid session passed to checkIfNextSession.');
    }
    if (this.schedule.length === 0) {
      this.nextSession = sessionToCheck;
    } else if (
      this.nextSession.startDate > sessionToCheck.startDate ||
      (this.nextSession.startDate === sessionToCheck.startDate &&
        this.nextSession.startTime > sessionToCheck.startTime)
    ) {
      this.nextSession = sessionToCheck;
    }
  }
}

class SublistData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  #isOpen;

  constructor({ name, isOpen = false, todos = [] }) {
    this.sublistId = `sublist-${SublistData.incrementCounter()}`;
    this.name = name;
    this.#isOpen = isOpen;
    this.todos = Array.isArray(todos)
      ? todos.map((todo) =>
          todo instanceof TodoData ? todo : new TodoData(todo)
        )
      : [];
  }

  get isOpen() {
    return this.#isOpen;
  }

  toggleOpen() {
    this.#isOpen = !this.#isOpen;
  }
}

class ListData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  #isOpen;

  constructor({ name, isOpen = false, todos = [], sublists = [] }) {
    this.listId = `list-${ListData.incrementCounter()}`;
    this.name = name;
    this.#isOpen = isOpen;
    this.todos = Array.isArray(todos)
      ? todos.map((todo) =>
          todo instanceof TodoData ? todo : new TodoData(todo)
        )
      : [];
    this.sublists = Array.isArray(sublists)
      ? sublists.map((sublist) =>
          sublist instanceof SublistData ? sublist : new SublistData(sublist)
        )
      : [];
  }

  get isOpen() {
    return this.#isOpen;
  }

  toggleOpen() {
    this.#isOpen = !this.#isOpen;
  }
}

;// ./src/model/todo-model.js
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable import/extensions */


class TodoModeller {
  constructor() {
    this.todoModel = this.loadData();
  }

  loadData() {
    // STORAGE EMPTY => POPULATE DEMO DATA
    if (localStorage.length === 0) {
      // eslint-disable-next-line no-use-before-define
      this.todoModel = demoData.map((list) => new ListData(list));
      this.saveToLocalStorage();
      return this.todoModel;
    }
    const storedData = localStorage.getItem('storedLists');
    return JSON.parse(storedData).map((list) => new ListData(list)); // converts raw objects to class instances
  }

  saveToLocalStorage() {
    localStorage.setItem('storedLists', JSON.stringify(this.todoModel));
  }

  updateFieldInModelAndStore(
    listId,
    sublistId,
    todoId,
    subtaskId,
    field,
    value
  ) {
    const list = this.todoModel.find((listData) => listData.listId === listId);
    const sublist = list.sublists.find(
      (sublistData) => sublistData.sublistId === sublistId
    );
    // checkbox change events on todo's only send todoId and field
    // this finds the todo even without listId so its isCompleted status can be toggled
    let todo;
    if (sublist) {
      todo = sublist.todos.find((todoData) => todoData.todoId === todoId);
    } else if (list) {
      todo = list.todos.find((todoData) => todoData.todoId === todoId);
    } else {
      const flatTodos = [
        ...this.todoModel.flatMap((flatList) => [
          ...flatList.todos,
          ...flatList.sublists.flatMap((flatSublist) => flatSublist.todos),
        ]),
      ];
      todo = flatTodos.find((todoData) => todoData.todoId === todoId);
    }
    const subtask = todo?.checklist?.find(
      (subtaskData) => subtaskData.subtaskId === subtaskId
    );

    // set values in model and save
    if (subtask) {
      if (field === 'isCompleted') {
        subtask.isCompleted = !subtask.isCompleted;
      } else {
        subtask[field] = value;
      }
    } else if (todo) {
      if (field === 'isCompleted') {
        todo.isCompleted = !todo.isCompleted;
      } else {
        todo[field] = value;
      }
    } else if (sublist) {
      sublist[field] = value;
    } else if (list) {
      list[field] = value;
    }
    this.saveToLocalStorage();
  }

  deleteFromModelAndStore(dataElement) {
    const list = this.todoModel.find(
      (listData) => listData.listId === dataElement.listId
    );
    const sublist = list?.sublists.find(
      (sublistData) => sublistData.sublistId === dataElement.sublistId
    );
    let todo;
    if (sublist) {
      todo = sublist.todos.find(
        (todoData) => todoData.todoId === dataElement.todoId
      );
    } else if (list) {
      todo = list.todos.find(
        (todoData) => todoData.todoId === dataElement.todoId
      );
    }
    const subtask = todo?.checklist.find(
      (subtaskData) => subtaskData.subtaskId === dataElement.subtaskId
    );

    // delete element from model and save
    if (subtask) {
      const index = todo.checklist.findIndex(
        (subtaskData) => subtaskData.subtaskId === subtask.subtaskId
      );
      todo.checklist.splice(index, 1);
    } else if (sublist) {
      const index = sublist.todos.findIndex(
        (todoData) => todoData.todoId === todo.todoId
      );
      sublist.todos.splice(index, 1);
    } else if (list) {
      const index = list.todos.findIndex(
        (todoData) => todoData.todoId === todo.todoId
      );
      list.todos.splice(index, 1);
    }
    this.saveToLocalStorage();
  }
}

// FOR DEMO PURPOSE ONLY - WILL DELETE
const demoData = [
  {
    listId: 'list-1',
    name: 'Todo List Project',
    isOpen: false,
    todos: [
      {
        listId: 'list-1',
        sublistId: null,
        todoId: 'todo-1',
        name: 'hover between tasks to add task',
        type: 'task',
        isDetailsOpen: false,
        isScheduleOpen: false,
        isCompleted: false,
        schedule: [
          {
            sessionId: 'session-1',
            startDate: '2025-02-11',
            startTime: null,
            endDate: '2025-02-11',
            endTime: null,
            isLogged: false,
            isPast: false,
          },
        ],
        nextSession: '2025-02-11',
        checklist: [
          {
            subtaskId: 'subtask-1',
            name: 'can complete tasks',
            isCompleted: false,
          },
          {
            subtaskId: 'subtask-2',
            name: 'can delete tasks',
            isCompleted: false,
          },
          {
            subtaskId: 'subtask-3',
            name: 'cannot duplicate tasks',
            isCompleted: false,
          },
        ],
        notes: null,
      },
      {
        listId: 'list-1',
        sublistId: null,
        todoId: 'todo-2',
        name: 'click the arrow to add date',
        type: 'task',
        isDetailsOpen: false,
        isScheduleOpen: false,
        isCompleted: false,
        schedule: [],
        nextSession: '',
        checklist: [
          {
            name: 'click the "schedule" button',
            subtaskId: 'subtask-4',
            isCompleted: false,
          },
          {
            name: '(lower left hand corner)',
            subtaskId: 'subtask-5',
            isCompleted: false,
          },
          {
            name: 'click on month and year to adjust',
            subtaskId: 'subtask-6',
            isCompleted: false,
          },
        ],
        notes: '',
      },
    ],
    sublists: [
      {
        sublistId: 'sublist-1',
        name: 'Click to open sublist',
        isOpen: false,
        todos: [
          {
            listId: 'list-1',
            sublistId: 'sublist-1',
            todoId: 'todo-3',
            name: 'cannot add new (sub)lists',
            type: 'task',
            isDetailsOpen: false,
            isScheduleOpen: false,
            isCompleted: false,
            schedule: [
              {
                sessionId: 'session-2',
                startDate: '2025-02-11',
                startTime: null,
                endDate: '2025-02-11',
                endTime: null,
                isLogged: false,
                isPast: false,
              },
            ],
            nextSession: '2025-02-11',
            checklist: [],
            notes: '',
          },
          {
            listId: 'list-1',
            sublistId: 'sublist-1',
            todoId: 'todo-4',
            name: 'can edit (sub)list name',
            type: 'task',
            isDetailsOpen: false,
            isScheduleOpen: false,
            isCompleted: false,
            schedule: [],
            nextSession: null,
            checklist: [],
            notes: '',
          },
        ],
      },
      {
        sublistId: 'sublist-2',
        name: 'Details',
        isOpen: false,
        todos: [
          {
            listId: 'list-1',
            sublistId: 'sublist-2',
            todoId: 'todo-5',
            name: 'can add details',
            type: 'task',
            isDetailsOpen: false,
            isScheduleOpen: false,
            isCompleted: false,
            schedule: [],
            nextSession: null,
            checklist: [
              {
                name: 'can add subtasks',
                subtaskId: 'subtask-7',
                isCompleted: false,
              },
              {
                name: 'can complete subtasks',
                subtaskId: 'subtask-8',
                isCompleted: false,
              },
              {
                name: 'can delete subtasks',
                subtaskId: 'subtask-9',
                isCompleted: false,
              },
            ],
            notes: 'can add notes!',
          },
        ],
      },
    ],
  },
  {
    listId: 'list-2',
    name: 'The Odin Project JavaScript',
    isOpen: false,
    todos: [
      {
        listId: 'list-2',
        sublistId: null,
        todoId: 'todo-6',
        name: 'dynamic UI interactions',
        type: 'task',
        isDetailsOpen: false,
        isScheduleOpen: false,
        isCompleted: false,
        schedule: [],
        nextSession: null,
        checklist: [
          {
            subtaskId: 'subtask-10',
            name: 'drop down menus',
            type: 'subtask',
            isCompleted: false,
          },
          {
            subtaskId: 'subtask-11',
            name: 'image carousels',
            type: 'subtask',
            isCompleted: false,
          },
        ],
        notes:
          'https://www.theodinproject.com/lessons/node-path-javascript-dynamic-user-interface-interactions',
      },
    ],
    sublists: [],
  },
];

;// ./src/controller/todo-panel-control.js
/* eslint-disable import/extensions */
/* eslint-disable no-console */





class TodoPanelController {
  constructor(userInstance) {
    this.userInstance = userInstance;
    this.todoModeller = new TodoModeller(userInstance.storedLists, this);
    this.todoModel = this.todoModeller.todoModel;
    this.listView = new ListView(this.todoModeller, this);
  }

  savetoLocalStorage() {
    this.userInstance.storedLists = this.todoModel;
    localStorage.setItem(this.userInstance.email, this.userInstance);
  }

  static getIDsFromElement(element) {
    if (
      element.classList.contains('editing-list-title') ||
      element.classList.contains('title')
    ) {
      const listId = element.closest('.list').getAttribute('data-list-id');
      const sublistId = element
        .closest('.sublist')
        ?.getAttribute('data-sublist-id');
      return { listId, sublistId };
    }
    const listId = element.closest('.todo').getAttribute('data-list-id');
    const sublistId = element.closest('.todo').getAttribute('data-sublist-id');
    const todoId = element.closest('.todo').getAttribute('data-todo-id');
    const subtaskId = element
      .closest('.subtask')
      ?.getAttribute('data-subtask-id');
    return {
      listId,
      sublistId,
      todoId,
      subtaskId,
    };
  }

  getTodoData(element) {
    const ids = TodoPanelController.getIDsFromElement(element);
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    if (ids.sublistId && ids.sublistId !== 'null') {
      if (ids.todoId && ids.todoId !== 'null') {
        const todoData = listData.sublists
          .find((sublist) => sublist.sublistId === ids.sublistId)
          .todos.find((todo) => todo.todoId === ids.todoId);
        if (ids.subtaskId && ids.subtaskId !== 'null') {
          return todoData.find(
            (subtask) => todoData.checklist.subtaskId === subtask.subtaskId
          );
        }
        return todoData;
      }
      return listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
    }
    const todoData = listData.todos.find((todo) => todo.todoId === ids.todoId);
    if (ids.subtaskId && ids.subtaskId !== 'null') {
      return todoData.find(
        (subtask) => todoData.checklist.subtaskId === subtask.subtaskId
      );
    }
    return todoData;
  }

  handleInputChange(event) {
    if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
    if (!event.target.classList.contains('blank')) {
      const ids = TodoPanelController.getIDsFromElement(event.target);
      this.todoModeller.updateFieldInModelAndStore(
        ids.listId,
        ids.sublistId,
        ids.todoId,
        ids.subtaskId,
        event.target.getAttribute('data-field'),
        event.target.value
      );
    }
  }

  appendToMiddleOfModelAndReturnBlankTodo(priorTodo) {
    const priorIds = TodoPanelController.getIDsFromElement(priorTodo);
    const newTodo = new TodoData({
      listId: priorIds.listId,
      sublistId: priorIds.sublistId,
    });
    // get place in todoModel
    const listData = this.todoModel.find(
      (list) => list.listId === priorIds.listId
    );
    if (priorIds.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === priorIds.sublistId
      );
      const priorTodoIndex = sublistData.todos.findIndex(
        (todo) => todo.todoId === priorIds.todoId
      );
      sublistData.todos.splice(priorTodoIndex + 1, 0, newTodo);
    } else if (priorIds.listId) {
      const priorTodoIndex = listData.todos.findIndex(
        (todo) => todo.todoId === priorIds.todoId
      );
      listData.todos.splice(priorTodoIndex + 1, 0, newTodo);
    }
    this.todoModeller.saveToLocalStorage();
    return newTodo;
  }

  appendToStartOfListAndReturnBlankTodo(firstTodoELement) {
    const ids = TodoPanelController.getIDsFromElement(firstTodoELement);
    const newTodo = new TodoData({
      listId: ids.listId,
      sublistId: ids.sublistId,
    });
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    if (ids.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
      sublistData.todos.unshift(newTodo);
    } else if (ids.listId) {
      listData.todos.unshift(newTodo);
    }
    this.todoModeller.saveToLocalStorage();
    return newTodo;
  }

  addAndReturnNewSubtask(event) {
    const ids = TodoPanelController.getIDsFromElement(event.target);
    const newSubtask = new SubtaskData({
      name: event.target.value,
    });
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    if (ids.sublistId !== null && ids.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
      const todoData = sublistData.todos.find(
        (todo) => todo.todoId === ids.todoId
      );
      todoData.checklist.push(newSubtask);
    } else if (ids.listId) {
      const todoData = listData.todos.find(
        (todo) => todo.todoId === ids.todoId
      );
      todoData.checklist.push(newSubtask);
    }
    this.todoModeller.saveToLocalStorage();
    return newSubtask;
  }

  handleSubtaskDelete(event) {
    const ids = TodoPanelController.getIDsFromElement(event.target);
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    let todoData;
    if (ids.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
      todoData = sublistData.todos.find((todo) => todo.todoId === ids.todoId);
    } else {
      todoData = listData.todos.find((todo) => todo.todoId === ids.todoId);
    }
    const subtaskIndex = todoData.checklist.findIndex(
      (subtask) => subtask.subtaskId === ids.subtaskId
    );
    todoData.checklist.splice(subtaskIndex, 1);
    this.todoModeller.saveToLocalStorage();
    console.log(event.target);
    event.target.closest('.subtask').remove();
  }
}

;// ./src/index.js
/* eslint-disable import/extensions */




class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  storedLists = [
    {
      listId: 'list-1',
      name: 'Todo List Project',
      isOpen: false,
      todos: [
        {
          listId: 'list-1',
          sublistId: null,
          todoId: 'todo-1',
          name: 'hover between tasks to add task',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [
            {
              sessionId: 'session-1',
              startDate: '2025-02-11',
              startTime: null,
              endDate: '2025-02-11',
              endTime: null,
              isLogged: false,
              isPast: false,
            },
          ],
          nextSession: '2025-02-11',
          checklist: [
            {
              subtaskId: 'subtask-1',
              name: 'can complete tasks',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-2',
              name: 'can delete tasks',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-3',
              name: 'cannot duplicate tasks',
              isCompleted: false,
            },
          ],
          notes: null,
        },
        {
          listId: 'list-1',
          sublistId: null,
          todoId: 'todo-2',
          name: 'click the arrow to add date',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [],
          nextSession: '',
          checklist: [
            {
              name: 'click the "schedule" button',
              subtaskId: 'subtask-4',
              isCompleted: false,
            },
            {
              name: '(lower left hand corner)',
              subtaskId: 'subtask-5',
              isCompleted: false,
            },
            {
              name: 'click on month and year to adjust',
              subtaskId: 'subtask-6',
              isCompleted: false,
            },
          ],
          notes: '',
        },
      ],
      sublists: [
        {
          sublistId: 'sublist-1',
          name: 'Click to open sublist',
          isOpen: false,
          todos: [
            {
              listId: 'list-1',
              sublistId: 'sublist-1',
              todoId: 'todo-3',
              name: 'cannot add new (sub)lists',
              type: 'task',
              isDetailsOpen: false,
              isScheduleOpen: false,
              isCompleted: false,
              schedule: [
                {
                  sessionId: 'session-2',
                  startDate: '2025-02-11',
                  startTime: null,
                  endDate: '2025-02-11',
                  endTime: null,
                  isLogged: false,
                  isPast: false,
                },
              ],
              nextSession: '2025-02-11',
              checklist: [],
              notes: '',
            },
            {
              listId: 'list-1',
              sublistId: 'sublist-1',
              todoId: 'todo-4',
              name: 'can edit (sub)list name',
              type: 'task',
              isDetailsOpen: false,
              isScheduleOpen: false,
              isCompleted: false,
              schedule: [],
              nextSession: null,
              checklist: [],
              notes: '',
            },
          ],
        },
        {
          sublistId: 'sublist-2',
          name: 'Details',
          isOpen: false,
          todos: [
            {
              listId: 'list-1',
              sublistId: 'sublist-2',
              todoId: 'todo-5',
              name: 'can add details',
              type: 'task',
              isDetailsOpen: false,
              isScheduleOpen: false,
              isCompleted: false,
              schedule: [],
              nextSession: null,
              checklist: [
                {
                  name: 'can add subtasks',
                  subtaskId: 'subtask-7',
                  isCompleted: false,
                },
                {
                  name: 'can complete subtasks',
                  subtaskId: 'subtask-8',
                  isCompleted: false,
                },
                {
                  name: 'can delete subtasks',
                  subtaskId: 'subtask-9',
                  isCompleted: false,
                },
              ],
              notes: 'can add notes!',
            },
          ],
        },
      ],
    },
    {
      listId: 'list-2',
      name: 'The Odin Project JavaScript',
      isOpen: false,
      todos: [
        {
          listId: 'list-2',
          sublistId: null,
          todoId: 'todo-6',
          name: 'dynamic UI interactions',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [],
          nextSession: null,
          checklist: [
            {
              subtaskId: 'subtask-10',
              name: 'drop down menus',
              type: 'subtask',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-11',
              name: 'image carousels',
              type: 'subtask',
              isCompleted: false,
            },
          ],
          notes:
            'https://www.theodinproject.com/lessons/node-path-javascript-dynamic-user-interface-interactions',
        },
      ],
      sublists: [],
    },
  ];
}

const init = () => {
  // LOGIN WITH EXISTING ACCOUNT FORM
  const loginForm = document.querySelector('#login-form');
  const email = loginForm.querySelector('input[type=email]');
  const emailError = loginForm.querySelector('.input-container').children[1];
  const password = loginForm.querySelector('input[type=password]');
  const passwordError = loginForm.querySelector('.input-container').children[3];
  const submitButton = loginForm.querySelector('#submit-existing-login');

  loginForm.addEventListener('input', () => {
    if (email.validity.valueMissing) {
      emailError.textContent = 'Email required';
      emailError.classList.remove('hidden');
    } else if (password.validity.valueMissing) {
      passwordError.textContent = 'Password required';
      passwordError.classList.remove('hidden');
    } else {
      submitButton.removeAttribute('disabled');
    }
  });

  loginForm.addEventListener('submit', () => {
    const id = email.value.toLowerCase();
    const storedData = JSON.parse(localStorage.getItem(id)) || null;
    if (storedData.email === id && storedData.password === password.value) {
      document.querySelector('body').innerHTML = main_page;
      // eslint-disable-next-line no-new
      new TodoPanelController(storedData);
    } else if (storedData === null) {
      email.error.textContent = 'Email not found';
      email.error.classList.remove('hidden');
    } else if (
      storedData.email === id &&
      storedData.password !== password.value
    ) {
      passwordError.textContent = 'Wrong password';
      passwordError.classList.remove('hidden');
    }
  });

  // LOGIN WITH NEW ACCOUNT FORM
  const signupForm = document.querySelector('#signup-form');
  const submitNewLoginButton = signupForm.querySelector('#submit-new-login');

  const name = signupForm.querySelector('input[type=text]');
  const nameError = signupForm.querySelector('input-container').children[1];
  name.addEventListener('input', () => {
    if (name.validity.valueMissing) {
      nameError.classList.remove('hidden');
      name.validity.valid = false;
    } else {
      name.validity.valid = true;
    }
  });

  const newEmail = signupForm.querySelector('input[type=email]');
  const newEmailError =
    signupForm.querySelector('.input-container').children[3];
  newEmail.addEventListener('input', () => {
    if (!newEmail.validity.valid) {
      newEmailError.classList.remove('hidden');
      newEmail.validity.valid = false;
    } else {
      newEmail.validity.valid = true;
    }
  });

  const newPassword = signupForm.querySelector('input[type=password]');
  const passwordShortError =
    signupForm.querySelector('.input-container').children[5];
  const passwordNumberError =
    signupForm.querySelector('.input-container').children[6];
  const passwordLetterError =
    signupForm.querySelector('.input-container').children[7];
  newPassword.addEventListener('input', () => {
    if (newPassword.length < 6) {
      passwordShortError.classList.remove('hidden');
    }
    if (!/\d/.test(newPassword.value)) {
      passwordNumberError.classList.remove('hidden');
    }
    if (!/[a-zA-Z]/.test(newPassword.value)) {
      passwordLetterError.classList.remove('hidden');
    }
    if (
      newPassword.length > 5 &&
      /\d/.test(newPassword.value) &&
      /[a-zA-Z]/.test(newPassword.value)
    ) {
      newPassword.validity.valid = true;
    }
  });

  const newPasswordConfirmation = signupForm.querySelector('.confirm');
  const newPasswordConfirmationError =
    signupForm.querySelector('.input-container').children[9];
  newPasswordConfirmation.addEventListener('input', () => {
    if (newPasswordConfirmation.value !== newPassword.value) {
      newPasswordConfirmationError.classList.remove('hidden');
      newPasswordConfirmation.validity.valid = false;
    } else {
      newPasswordConfirmation.validity.valid = true;
    }
  });

  if (
    name.validity.valid &&
    newEmail.validity.valid &&
    newPassword.validity.valid &&
    newPasswordConfirmation.validity.valid
  ) {
    submitNewLoginButton.removeAttribute('disabled');
  }

  signupForm.addEventListener('submit', () => {
    // eslint-disable-next-line no-new
    const controller = new TodoPanelController(
      new User(email.value.toLowerCase(), password.value)
    );
    controller.saveToLocalStorage();
  });
};

init();

// function updateClock() {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   requestAnimationFrame(updateClock); // Keep updating
// }

// updateClock();

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map