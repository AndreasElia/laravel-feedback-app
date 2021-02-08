/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/clone.js":
/*!****************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/clone.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cloneBody": () => (/* binding */ cloneBody)
/* harmony export */ });
/* harmony import */ var fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fp-ts/es6/Array */ "./node_modules/fp-ts/es6/Array.js");
// Mark <canvas>, <input> and <textarea> elements with
// unique id's so that their state can be later copied into
// a clone
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var PICO_CLONE_ID_KEY = 'picocloneid';
var id = function () {
    return Math.random()
        .toString(32)
        .substring(2);
};
function isHTMLElement(element) {
    return element instanceof HTMLElement;
}
function isHTMLOrSVGElement(element) {
    return (element instanceof HTMLElement ||
        element instanceof SVGElement);
}
var defaultNaN = function (defaultTo) { return function (value) {
    return isNaN(value) ? defaultTo : value;
}; };
// Even though this function uses `querySelectorAll('*')` it's relatively
// fast - on a page with 25k nodes (youtube) it executes in 10-15ms
var getScrolledElements = function ($target) {
    return Array.from($target.querySelectorAll('*'))
        .filter(function ($el) { return $el.scrollTop !== 0 || $el.scrollLeft !== 0; })
        .filter(isHTMLElement);
};
var attachCloneID = function ($target) {
    var e_1, _a;
    try {
        for (var _b = __values(__spread($target.querySelectorAll('input'), $target.querySelectorAll('textarea'), $target.querySelectorAll('canvas'), getScrolledElements($target))), _c = _b.next(); !_c.done; _c = _b.next()) {
            var $element = _c.value;
            $element.dataset[PICO_CLONE_ID_KEY] = id();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
};
var removeCloneID = function ($target) {
    var e_2, _a;
    try {
        for (var _b = __values($target.querySelectorAll("[data-" + PICO_CLONE_ID_KEY + "]")), _c = _b.next(); !_c.done; _c = _b.next()) {
            var $element = _c.value;
            if (!($element instanceof HTMLElement)) {
                console.warn('Element that had a pico clone id attached was not an HTMLElement during cleanup', $element);
                continue;
            }
            $element.removeAttribute("data-" + PICO_CLONE_ID_KEY);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
};
var cloneCanvases = function (container) {
    var e_3, _a;
    var _loop_1 = function ($clonedCanvas) {
        var cloneId = $clonedCanvas.dataset[PICO_CLONE_ID_KEY];
        if (cloneId === undefined) {
            console.warn('Failed to get clone id from cloned canvas', $clonedCanvas);
            return "continue";
        }
        var $originalCanvas = Array.from(container.parentWindow.document.querySelectorAll('canvas')).find(function ($original) {
            return $original.dataset[PICO_CLONE_ID_KEY] === cloneId;
        });
        if ($originalCanvas === undefined) {
            console.warn('Failed to find original canvas for cloned canvas', $clonedCanvas);
            return "continue";
        }
        var $replacementImg = container.parentWindow.document.createElement('img');
        // Since we're changing the element's name the "canvas"
        // will be untargetable by css, therefore we need to
        // clone all the style properties over manually in this
        // particular case.
        $replacementImg.style.cssText = container.parentWindow.window.getComputedStyle($originalCanvas).cssText;
        $replacementImg.src = $originalCanvas.toDataURL();
        var parent_1 = $clonedCanvas.parentNode;
        if (!parent_1) {
            console.warn('Failed to get parent of node', $clonedCanvas);
            return "continue";
        }
        parent_1.replaceChild($replacementImg, $clonedCanvas);
    };
    try {
        for (var _b = __values(container.tree.html.querySelectorAll('canvas')), _c = _b.next(); !_c.done; _c = _b.next()) {
            var $clonedCanvas = _c.value;
            _loop_1($clonedCanvas);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return container;
};
// Input values set by JS don't get copied when performing a recursive
// `Node.cloneNode`, we need to set the attributes ourselves.
var cloneInputs = function (container) {
    var e_4, _a;
    var _loop_2 = function ($clonedInputOrTextarea) {
        var cloneId = $clonedInputOrTextarea.dataset[PICO_CLONE_ID_KEY];
        if (cloneId === undefined) {
            console.warn('Failed to get clone id from cloned input or textarea', $clonedInputOrTextarea);
            return "continue";
        }
        var $originalInputOrTextarea = __spread(container.parentWindow.document.querySelectorAll('input'), container.parentWindow.document.querySelectorAll('textarea')).find(function ($original) {
            return $original.dataset[PICO_CLONE_ID_KEY] === cloneId;
        });
        if ($originalInputOrTextarea === undefined) {
            console.warn('Failed to find original input or textarea for cloned input or textarea', $clonedInputOrTextarea);
            return "continue";
        }
        if ($originalInputOrTextarea instanceof
            HTMLInputElement &&
            $clonedInputOrTextarea instanceof HTMLInputElement) {
            if (($clonedInputOrTextarea.type === 'checkbox' ||
                $clonedInputOrTextarea.type === 'radio') &&
                $originalInputOrTextarea.checked) {
                // <input type="checkbox | radio" />
                $clonedInputOrTextarea.setAttribute('checked', 'checked');
            }
            else if (
            // <input type="number | text | range" />
            ['number', 'text', 'range'].indexOf($clonedInputOrTextarea.type) !== -1) {
                $clonedInputOrTextarea.setAttribute('value', $originalInputOrTextarea.value);
            }
        }
        else if ($originalInputOrTextarea instanceof
            HTMLTextAreaElement &&
            $clonedInputOrTextarea instanceof HTMLTextAreaElement) {
            // <textarea>
            var contents = container.parentWindow.document.createTextNode($originalInputOrTextarea.value);
            $clonedInputOrTextarea.innerHTML = '';
            $clonedInputOrTextarea.appendChild(contents);
        }
    };
    try {
        for (var _b = __values(__spread(container.tree.html.querySelectorAll('input'), container.tree.html.querySelectorAll('textarea'))), _c = _b.next(); !_c.done; _c = _b.next()) {
            var $clonedInputOrTextarea = _c.value;
            _loop_2($clonedInputOrTextarea);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return container;
};
var cloneElementScroll = function (container, $clone) {
    var e_5, _a;
    var cloneId = $clone.dataset[PICO_CLONE_ID_KEY];
    if (cloneId === undefined) {
        console.warn('Failed to get clone id from cloned scrolled element', $clone);
        return;
    }
    var $original = container.parentWindow.document.querySelector("[data-" + PICO_CLONE_ID_KEY + " = \"" + cloneId + "\"]");
    if (!($original instanceof HTMLElement)) {
        console.warn('Failed to find original element for scrolled element', $clone);
        return;
    }
    $clone.style.position =
        $clone.style.position === 'absolute'
            ? 'absolute'
            : 'relative';
    $clone.style.overflow = 'hidden';
    $clone.style.width = $original.offsetWidth + 'px';
    $clone.style.height = $original.offsetHeight + 'px';
    var $clonedChildren = Array.from($clone.children).filter(isHTMLOrSVGElement);
    var $originalChildren = Array.from($original.children).filter(isHTMLOrSVGElement);
    if ($clonedChildren.length !== $originalChildren.length) {
        console.warn('Scrolled element has a different amount of children ' +
            'than its clone, skipping scroll emulation', $original);
        return;
    }
    var $$zippedChildren = (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__.zip)($originalChildren, $clonedChildren);
    var scrollTopRemaining = $original.scrollTop;
    var scrollLeftRemaining = $original.scrollLeft;
    var lastChild;
    try {
        for (var $$zippedChildren_1 = __values($$zippedChildren), $$zippedChildren_1_1 = $$zippedChildren_1.next(); !$$zippedChildren_1_1.done; $$zippedChildren_1_1 = $$zippedChildren_1.next()) {
            var _b = __read($$zippedChildren_1_1.value, 2), $originalChild = _b[0], $clonedChild = _b[1];
            var originalChildStyles = container.parentWindow.window.getComputedStyle($originalChild);
            // Handle absolutely positioned children
            if (container.parentWindow.window.getComputedStyle($original).position === 'relative' &&
                originalChildStyles.position === 'absolute') {
                $clonedChild.style.top =
                    defaultNaN(0)(parseInt(originalChildStyles.top)) -
                        $original.scrollTop +
                        'px';
                $clonedChild.style.left =
                    defaultNaN(0)(parseInt(originalChildStyles.left)) -
                        $original.scrollLeft +
                        'px';
                // Since all relative children are now absolute, increment z-index
                // of all previously absolute children by 1 so that they're
                // still visible over
                $clonedChild.style.zIndex = (defaultNaN(0)(parseInt(originalChildStyles.zIndex)) + 1).toString();
                continue;
            }
            $clonedChild.style.position = 'absolute';
            $clonedChild.style.width = originalChildStyles.width;
            $clonedChild.style.height = originalChildStyles.height;
            if (typeof lastChild !== 'undefined') {
                var lastChildBoundingRect = lastChild.getBoundingClientRect();
                scrollTopRemaining -=
                    $originalChild.getBoundingClientRect().top -
                        lastChildBoundingRect.top;
                scrollLeftRemaining -=
                    $originalChild.getBoundingClientRect().left -
                        lastChildBoundingRect.left;
            }
            $clonedChild.style.top = -scrollTopRemaining + 'px';
            $clonedChild.style.left = -scrollLeftRemaining + 'px';
            lastChild = $originalChild;
            // const cloneChildBoundingRect = $originalChild.getBoundingClientRect()
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if ($$zippedChildren_1_1 && !$$zippedChildren_1_1.done && (_a = $$zippedChildren_1.return)) _a.call($$zippedChildren_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
};
var cloneScrolls = function (container) {
    var e_6, _a;
    try {
        for (var _b = __values(getScrolledElements(container.parentWindow.html)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var $original = _c.value;
            var cloneId = $original.dataset[PICO_CLONE_ID_KEY];
            if (cloneId === undefined) {
                console.warn('Failed to get clone id from scrolled element', $original);
                continue;
            }
            var $cloned = container.tree.html.querySelector("[data-" + PICO_CLONE_ID_KEY + " = \"" + cloneId + "\"]");
            if (!($cloned instanceof HTMLElement)) {
                console.warn('Failed to find cloned element for original scrolled element', $original);
                continue;
            }
            cloneElementScroll(container, $cloned);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    // The above code doesn't process <html> scroll since it usually gets
    // special treatment in browsers, a simple `translate` will do
    container.tree.html.style.transform += " translate(-" + container.parentWindow.html.scrollLeft + "px, -" + container.parentWindow.html.scrollTop + "px)";
    return container;
};
var removeNodesMatchingSelectors = function (selectors) { return function ($node) {
    if ($node instanceof Element) {
        selectors.forEach(function (selector) {
            var e_7, _a;
            try {
                for (var _b = __values($node.querySelectorAll(selector)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var $child = _c.value;
                    $child.remove();
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        });
    }
}; };
// (ugly)
var cloneBody = function (ignoredSelectors) { return function (container) {
    attachCloneID(container.parentWindow.html);
    container.tree.html.className =
        container.parentWindow.html.className;
    container.tree.html.style.cssText =
        container.parentWindow.html.style.cssText;
    // Fix for `rem` units
    container.tree.svg.style.fontSize = container.parentWindow.window.getComputedStyle(container.parentWindow.html).fontSize;
    var $clonedBody = container.parentWindow.body.cloneNode(true);
    removeNodesMatchingSelectors(ignoredSelectors)($clonedBody);
    container.tree.html.appendChild($clonedBody);
    cloneInputs(container);
    cloneCanvases(container);
    cloneScrolls(container);
    if ($clonedBody instanceof HTMLBodyElement) {
        container.tree.html.style.margin = '0';
    }
    removeCloneID(container.parentWindow.html);
    return container;
}; };


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/container.js":
/*!********************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/container.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTree": () => (/* binding */ createTree),
/* harmony export */   "createContainer": () => (/* binding */ createContainer)
/* harmony export */ });
/* harmony import */ var fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fp-ts/es6/Either */ "./node_modules/fp-ts/es6/Either.js");
/* harmony import */ var fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fp-ts/es6/pipeable */ "./node_modules/fp-ts/es6/pipeable.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ "./node_modules/@gripeless/pico/dist/element.js");
/* harmony import */ var _window_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window-info */ "./node_modules/@gripeless/pico/dist/window-info.js");




var getBackgroundColor = function ($window, $element) {
    var backgroundColor = $window.getComputedStyle($element).backgroundColor;
    return backgroundColor === 'transparent' ||
        backgroundColor === 'rgba(0, 0, 0, 0)'
        ? 'white'
        : backgroundColor;
};
var createTree = function (windowInfo) {
    var _a = windowInfo.window, width = _a.innerWidth, height = _a.innerHeight;
    var h = (0,_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(windowInfo.document);
    var s = (0,_element__WEBPACK_IMPORTED_MODULE_0__.createSVGElement)(windowInfo.document);
    var $iframe = h('iframe', {
        width: width + 'px',
        height: height + 'px'
    });
    var $svg = s('svg', {
        width: width + 'px',
        height: height + 'px'
    });
    $svg.style.backgroundColor = getBackgroundColor(windowInfo.window, windowInfo.body);
    var $foreignObject = s('foreignObject', {
        x: '0',
        y: '0',
        width: width + 'px',
        height: height + 'px'
    });
    var $newHtml = h('html');
    $newHtml.setAttribute('xmlns', _element__WEBPACK_IMPORTED_MODULE_0__.xhtmlNS);
    var $newHead = h('head');
    $newHtml.appendChild($newHead);
    $newHtml.appendChild($newHead);
    $foreignObject.appendChild($newHtml);
    $svg.appendChild($foreignObject);
    $iframe.appendChild($svg);
    return {
        html: $newHtml,
        head: $newHead,
        svg: $svg
    };
};
var createContainer = function ($window) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,_window_info__WEBPACK_IMPORTED_MODULE_1__.getWindowInfo)($window), (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_3__.map)(function (parentWindow) { return ({
        parentWindow: parentWindow,
        tree: createTree(parentWindow)
    }); }));
};


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/download.js":
/*!*******************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/download.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "download": () => (/* binding */ download),
/* harmony export */   "responseToText": () => (/* binding */ responseToText),
/* harmony export */   "responseToBlob": () => (/* binding */ responseToBlob),
/* harmony export */   "blobToDataURL": () => (/* binding */ blobToDataURL),
/* harmony export */   "downloadErrorToDetailedError": () => (/* binding */ downloadErrorToDetailedError)
/* harmony export */ });
/* harmony import */ var fluture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluture */ "./node_modules/fluture/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@gripeless/pico/dist/error.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop */ "./node_modules/@gripeless/pico/dist/noop.js");



var download = function (url) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (reject, resolve) {
        fetch(url, { cache: 'force-cache' })
            .then(function (response) {
            if (response.ok) {
                resolve(response);
            }
            else {
                reject({
                    _tag: 'HTTPError',
                    url: url,
                    status: response.status,
                    statusText: response.statusText
                });
            }
        })
            .catch(function (error) {
            reject({
                _tag: 'NetworkError',
                url: url
            });
        });
        return _noop__WEBPACK_IMPORTED_MODULE_2__.noop;
    });
};
var responseToText = function (response) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (reject, resolve) {
        response
            .text()
            .then(resolve)
            .catch(function (error) {
            return reject({
                error: error,
                reason: "Failed to convert response to text (" + response.url + ")"
            });
        });
        return _noop__WEBPACK_IMPORTED_MODULE_2__.noop;
    });
};
var responseToBlob = function (response) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (reject, resolve) {
        response
            .blob()
            .then(resolve)
            .catch(function (error) {
            return reject({
                error: error,
                reason: "Failed to convert response to text (" + response.url + ")"
            });
        });
        return _noop__WEBPACK_IMPORTED_MODULE_2__.noop;
    });
};
var blobToDataURL = function (blob) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (reject, resolve) {
        var reader = new FileReader();
        reader.onloadend = function () {
            return typeof reader.result === 'string'
                ? resolve(reader.result)
                : reject((0,_error__WEBPACK_IMPORTED_MODULE_1__.err)("Got invalid type when reading blob (" + typeof reader.result + ")"));
        };
        reader.onerror = function () {
            return reject((0,_error__WEBPACK_IMPORTED_MODULE_1__.err)('Failed to load data url for blob'));
        };
        reader.readAsDataURL(blob);
        return reader.abort;
    });
};
var downloadErrorToDetailedError = function (downloadError) {
    var reason = "Failed to download resource at " + downloadError.url + " " +
        (downloadError._tag === 'NetworkError'
            ? '(Network Error, most likely a CORS issue)'
            : "(Status: " + downloadError.status + " - " + downloadError.statusText + ")");
    return {
        reason: reason,
        error: new Error(reason)
    };
};


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/element.js":
/*!******************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/element.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "svgNS": () => (/* binding */ svgNS),
/* harmony export */   "xhtmlNS": () => (/* binding */ xhtmlNS),
/* harmony export */   "createSVGElement": () => (/* binding */ createSVGElement),
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var svgNS = 'http://www.w3.org/2000/svg';
var xhtmlNS = 'http://www.w3.org/1999/xhtml';
var createSVGElement = function ($document) { return function (tagName, options) {
    if (options === void 0) { options = {}; }
    var $el = $document.createElementNS(svgNS, tagName);
    Object.entries(options).forEach(function (_a) {
        var _b = __read(_a, 2), key = _b[0], value = _b[1];
        return $el.setAttribute(key, value);
    });
    return $el;
}; };
var createElement = function ($document) { return function (tagName, properties) {
    if (properties === void 0) { properties = {}; }
    var $el = $document.createElement(tagName);
    Object.assign($el, properties);
    return $el;
}; };


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/error-stack.js":
/*!**********************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/error-stack.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "fromEithers": () => (/* binding */ fromEithers),
/* harmony export */   "fromError": () => (/* binding */ fromError),
/* harmony export */   "fromErrors": () => (/* binding */ fromErrors),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "value": () => (/* binding */ value),
/* harmony export */   "errors": () => (/* binding */ errors)
/* harmony export */ });
/* harmony import */ var fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fp-ts/es6/Array */ "./node_modules/fp-ts/es6/Array.js");
/* harmony import */ var fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fp-ts/es6/pipeable */ "./node_modules/fp-ts/es6/pipeable.js");


var ErrorStack$ = Symbol();
var empty = function (value) { return ({
    _tag: ErrorStack$,
    errors: [],
    value: value
}); };
var fromEithers = function (value) { return function (eithers) { return ({
    _tag: ErrorStack$,
    errors: (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__.lefts)(eithers),
    value: value
}); }; };
var fromError = function (value) { return function (error) { return fromErrors(value)([error]); }; };
var fromErrors = function (value) { return function (errors) { return ({
    _tag: ErrorStack$,
    errors: errors,
    value: value
}); }; };
var concat = function (stack, error) { return ({
    _tag: ErrorStack$,
    errors: stack.errors.concat(error),
    value: stack.value
}); };
var fold = function (foldValueFn, initValue) { return function (stacks) { return ({
    _tag: ErrorStack$,
    errors: (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_1__.pipe)(stacks, (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__.map)(function (s) { return s.errors; }), fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__.flatten),
    value: (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_1__.pipe)(stacks, (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__.map)(function (s) { return s.value; }), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_0__.reduce)(initValue, foldValueFn))
}); }; };
var value = function (stack) { return stack.value; };
var errors = function (stack) { return stack.errors; };


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/error.js":
/*!****************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/error.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "err": () => (/* binding */ err)
/* harmony export */ });
var err = function (reason) { return ({
    reason: reason,
    error: new Error(reason)
}); };


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/export.js":
/*!*****************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/export.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containerToCanvas": () => (/* binding */ containerToCanvas),
/* harmony export */   "containerToSVGBlob": () => (/* binding */ containerToSVGBlob),
/* harmony export */   "containerToPngBlob": () => (/* binding */ containerToPngBlob),
/* harmony export */   "containerToPngDataURL": () => (/* binding */ containerToPngDataURL),
/* harmony export */   "createObjectURL": () => (/* binding */ createObjectURL)
/* harmony export */ });
/* harmony import */ var fluture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluture */ "./node_modules/fluture/index.js");
/* harmony import */ var fp_ts_fluture_es6_Future__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! fp-ts-fluture/es6/Future */ "./node_modules/fp-ts-fluture/es6/Future.js");
/* harmony import */ var fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fp-ts/es6/Either */ "./node_modules/fp-ts/es6/Either.js");
/* harmony import */ var fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! fp-ts/es6/function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fp-ts/es6/pipeable */ "./node_modules/fp-ts/es6/pipeable.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./node_modules/@gripeless/pico/dist/element.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error */ "./node_modules/@gripeless/pico/dist/error.js");
/* harmony import */ var _future__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future */ "./node_modules/@gripeless/pico/dist/future.js");
/* harmony import */ var _noop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./noop */ "./node_modules/@gripeless/pico/dist/noop.js");









var serializeSVGToDataURL = function ($svg) {
    return 'data:image/svg+xml;charset=utf-8,' +
        window.encodeURIComponent(new XMLSerializer().serializeToString($svg));
};
var canvasToPngBlob = function ($canvas) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (rej, res) {
        try {
            $canvas.toBlob(function (maybeBlob) {
                if (maybeBlob === null) {
                    return rej((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)('Failed to get blob from canvas ' +
                        '(the returned blob is null)'));
                }
                res(maybeBlob);
            }, 'image/png', 1);
        }
        catch (_a) {
            rej((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)('Failed to get blob from canvas ' +
                '(the canvas is most likely tainted)'));
        }
        return _noop__WEBPACK_IMPORTED_MODULE_4__.noop;
    });
};
var canvasToPngDataURL = function ($canvas) {
    try {
        return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_5__.right)($canvas.toDataURL('image/png', 1));
    }
    catch (_a) {
        return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_5__.left)((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)('Failed to get data url from canvas ' +
            '(the canvas is most likely tainted)'));
    }
};
var containerToCanvas = function (container) {
    var scalingRatio = container.parentWindow.window.devicePixelRatio || 1;
    var $canvas = (0,_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(container.parentWindow.document)('canvas', {
        width: container.parentWindow.window.innerWidth *
            scalingRatio,
        height: container.parentWindow.window.innerHeight *
            scalingRatio
    });
    var ctx = $canvas.getContext('2d');
    if (ctx === null) {
        return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.reject)((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)('Failed to obtain 2d canvas context'));
    }
    return (0,_future__WEBPACK_IMPORTED_MODULE_3__.timeout)(2000)((0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (rej, res) {
        var $img = new Image();
        $img.onerror = function () {
            return rej((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)("Failed to load exported <img> onto canvas"));
        };
        $img.onload = function () {
            ctx.setTransform(scalingRatio, 0, 0, scalingRatio, 0, 0);
            ctx.drawImage($img, 0, 0);
            res($canvas);
        };
        $img.src = serializeSVGToDataURL(container.tree.svg);
        return $img.remove;
    }));
};
var dataURLToBlob = function (dataURL) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (rej, res) {
        fetch(dataURL)
            .then(function (x) { return x.blob(); })
            .then(res)
            .catch(function () {
            return rej((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)("Failed to convert dataURL to blob (" + dataURL + ")"));
        });
        return _noop__WEBPACK_IMPORTED_MODULE_4__.noop;
    });
};
var containerToSVGBlob = function (container) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_6__.pipe)(serializeSVGToDataURL(container.tree.svg), dataURLToBlob);
};
var containerToPngBlob = function (container) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_6__.pipe)(containerToCanvas(container), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(canvasToPngBlob));
};
var containerToPngDataURL = function (container) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_6__.pipe)(containerToCanvas(container), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)((0,fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_7__.flow)(canvasToPngDataURL, fp_ts_fluture_es6_Future__WEBPACK_IMPORTED_MODULE_8__.fromEither)));
};
// Type safe wrapper for URL.createObjectURL. Also because this
// function creates a reference in a global object URL store,
// this function is technically impure.
var createObjectURL = function (object) {
    try {
        return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_5__.right)(URL.createObjectURL(object));
    }
    catch (_a) {
        return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_5__.left)((0,_error__WEBPACK_IMPORTED_MODULE_2__.err)('Failed to create result object URL'));
    }
};


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/future.js":
/*!*****************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/future.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeout": () => (/* binding */ timeout)
/* harmony export */ });
/* harmony import */ var fluture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluture */ "./node_modules/fluture/index.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./node_modules/@gripeless/pico/dist/error.js");


var timeout = function (ms) { return function (fl) {
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.race)((0,fluture__WEBPACK_IMPORTED_MODULE_0__.Future)(function (rej) {
        var timeout = setTimeout(function () {
            return rej((0,_error__WEBPACK_IMPORTED_MODULE_1__.err)("Timed out waiting for promise (" + ms + "ms)"));
        }, ms);
        return function () { return clearTimeout(timeout); };
    }))(fl);
}; };


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultOptions": () => (/* binding */ defaultOptions),
/* harmony export */   "objectURLFluture": () => (/* binding */ objectURLFluture),
/* harmony export */   "svgObjectURLFluture": () => (/* binding */ svgObjectURLFluture),
/* harmony export */   "dataURLFluture": () => (/* binding */ dataURLFluture),
/* harmony export */   "objectURL": () => (/* binding */ objectURL),
/* harmony export */   "svgObjectURL": () => (/* binding */ svgObjectURL),
/* harmony export */   "dataURL": () => (/* binding */ dataURL)
/* harmony export */ });
/* harmony import */ var fluture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluture */ "./node_modules/fluture/index.js");
/* harmony import */ var fp_ts_fluture_es6_Future__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! fp-ts-fluture/es6/Future */ "./node_modules/fp-ts-fluture/es6/Future.js");
/* harmony import */ var fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! fp-ts/es6/function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! fp-ts/es6/pipeable */ "./node_modules/fp-ts/es6/pipeable.js");
/* harmony import */ var _clone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clone */ "./node_modules/@gripeless/pico/dist/clone.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./container */ "./node_modules/@gripeless/pico/dist/container.js");
/* harmony import */ var _error_stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./error-stack */ "./node_modules/@gripeless/pico/dist/error-stack.js");
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./export */ "./node_modules/@gripeless/pico/dist/export.js");
/* harmony import */ var _inline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inline */ "./node_modules/@gripeless/pico/dist/inline.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options */ "./node_modules/@gripeless/pico/dist/options.js");










var defaultOptions = _options__WEBPACK_IMPORTED_MODULE_6__.defaults;
var generateExport = function ($window, options) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)(
    // Create container where we'll store extracted
    // information about the window (which could fail) in
    (0,_container__WEBPACK_IMPORTED_MODULE_2__.createContainer)($window), fp_ts_fluture_es6_Future__WEBPACK_IMPORTED_MODULE_8__.fromEither, 
    // Clone existing window data into a container,
    // including filling out <input>'s, copying <canvas>
    // elements, etc.  mapEither(cloneBody),
    (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)((0,_clone__WEBPACK_IMPORTED_MODULE_1__.cloneBody)(options.ignore)), 
    // Inline external stylesheets, images, fonts as data
    // URL's inside of the copied tree
    (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_inline__WEBPACK_IMPORTED_MODULE_5__.inlineExternalResources));
};
var objectURLFluture = function ($window, options) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)(generateExport($window, options), 
    // Export tree into a png object URL and return it
    // together with all accumulated errors
    (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(function (_a) {
        var container = _a.value, errors = _a.errors;
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)((0,_export__WEBPACK_IMPORTED_MODULE_4__.containerToPngBlob)(container), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)((0,fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_9__.flow)(_export__WEBPACK_IMPORTED_MODULE_4__.createObjectURL, fp_ts_fluture_es6_Future__WEBPACK_IMPORTED_MODULE_8__.fromEither)), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (objectURL) {
            return (0,_error_stack__WEBPACK_IMPORTED_MODULE_3__.fromErrors)(objectURL)(errors);
        }));
    }));
};
var svgObjectURLFluture = function ($window, options) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)(generateExport($window, options), 
    // Export tree into a object URL containing SVG data and
    // return it together with all accumulated errors
    (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(function (_a) {
        var container = _a.value, errors = _a.errors;
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)((0,_export__WEBPACK_IMPORTED_MODULE_4__.containerToSVGBlob)(container), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)((0,fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_9__.flow)(_export__WEBPACK_IMPORTED_MODULE_4__.createObjectURL, fp_ts_fluture_es6_Future__WEBPACK_IMPORTED_MODULE_8__.fromEither)), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (objectURL) {
            return (0,_error_stack__WEBPACK_IMPORTED_MODULE_3__.fromErrors)(objectURL)(errors);
        }));
    }));
};
var dataURLFluture = function ($window, options) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)(generateExport($window, options), 
    // Export tree into a png object URL and return it
    // together with all accumulated errors
    (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(function (_a) {
        var container = _a.value, errors = _a.errors;
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)((0,_export__WEBPACK_IMPORTED_MODULE_4__.containerToPngDataURL)(container), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (objectURL) {
            return (0,_error_stack__WEBPACK_IMPORTED_MODULE_3__.fromErrors)(objectURL)(errors);
        }));
    }));
};
var promisifyExport = function (fn) { return function ($window, partialOptions) {
    if (partialOptions === void 0) { partialOptions = {}; }
    return new Promise(function (res, rej) {
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_7__.pipe)(fn($window, (0,_options__WEBPACK_IMPORTED_MODULE_6__.normalize)(partialOptions)), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.fork)(function (x) { return rej(x.error); })(res));
    });
}; };
var objectURL = promisifyExport(objectURLFluture);
var svgObjectURL = promisifyExport(svgObjectURLFluture);
var dataURL = promisifyExport(dataURLFluture);


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/inline.js":
/*!*****************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/inline.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inlineExternalResources": () => (/* binding */ inlineExternalResources)
/* harmony export */ });
/* harmony import */ var fluture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluture */ "./node_modules/fluture/index.js");
/* harmony import */ var fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! fp-ts/es6/Array */ "./node_modules/fp-ts/es6/Array.js");
/* harmony import */ var fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fp-ts/es6/Either */ "./node_modules/fp-ts/es6/Either.js");
/* harmony import */ var fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fp-ts/es6/function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fp-ts/es6/pipeable */ "./node_modules/fp-ts/es6/pipeable.js");
/* harmony import */ var _download__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./download */ "./node_modules/@gripeless/pico/dist/download.js");
/* harmony import */ var _error_stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error-stack */ "./node_modules/@gripeless/pico/dist/error-stack.js");
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};







var parallelAll = (0,fluture__WEBPACK_IMPORTED_MODULE_0__.parallel)(Infinity);
function isCSSStyleSheet(sheet) {
    return sheet instanceof CSSStyleSheet;
}
// Takes a non-global, non-sticky RegExp object with exactly one capturing
// group
var replaceAllAsync = function (regex, replaceFn) { return function (input) {
    if (regex.global || regex.sticky) {
        throw new TypeError('Only non-global and non-sticky ' +
            "(without the /g or /y flags) regex' can be used");
    }
    var result = regex.exec(input);
    if (result === null) {
        return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.empty)(input));
    }
    var theWholeMatch = result[0];
    var firstGroup = result[1];
    if (typeof result[1] !== 'string') {
        return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.empty)(input));
    }
    var start = input.substring(0, result.index);
    var middleF = (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(replaceFn(firstGroup), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.coalesce)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromError)(firstGroup))(_error_stack__WEBPACK_IMPORTED_MODULE_2__.empty));
    var endF = replaceAllAsync(regex, replaceFn)(input.substring(result.index + theWholeMatch.length));
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)((0,fluture__WEBPACK_IMPORTED_MODULE_0__.both)(middleF)(endF), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (_a) {
        var _b = __read(_a, 2), middle = _b[0], end = _b[1];
        return (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromErrors)(start + middle.value + end.value)((0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.flatten)([middle.errors, end.errors]));
    }));
}; };
var processStyleSheetText = function (baseURL) { return function (styleSheetText) {
    var $stylesheetStyle = document.createElement('style');
    $stylesheetStyle.appendChild(document.createTextNode(styleSheetText));
    var $fakeDocument = document.implementation.createHTMLDocument();
    $fakeDocument.head.appendChild($stylesheetStyle);
    var sheet = $stylesheetStyle.sheet;
    if (!(sheet instanceof CSSStyleSheet)) {
        var reason = 'Failed to initialize CSSStyleSheet';
        return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.reject)({
            reason: reason,
            error: new Error(reason)
        });
    }
    return inlineURLsFromCSSRuleList(sheet.cssRules, baseURL);
}; };
var URL_REGEX = /url\(['"]?(.+?)['"]?\)/;
var inlineStyleSheetTextURLs = function (baseURL) {
    return replaceAllAsync(URL_REGEX, function (url) {
        if (url.indexOf('data:') === 0) {
            // Skip data urls
            return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)("url(\"" + url + "\")");
        }
        var absoluteURL = new URL(url, baseURL).toString();
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)((0,_download__WEBPACK_IMPORTED_MODULE_1__.download)(absoluteURL), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.mapRej)(_download__WEBPACK_IMPORTED_MODULE_1__.downloadErrorToDetailedError), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_download__WEBPACK_IMPORTED_MODULE_1__.responseToBlob), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_download__WEBPACK_IMPORTED_MODULE_1__.blobToDataURL), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (dataURL) { return "url(" + dataURL + ")"; }));
    });
};
var inlineURLsFromCSSRule = function (baseURL) { return function (rule) {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/url()
    // "The url() function can be included as a value for background,
    // background-image, list-style, list-style-image, content, cursor,
    // border, border-image, border-image-source, mask, mask-image, src as
    // part of a @font-face block, and @counter-style/symbol"
    if (rule instanceof CSSStyleRule) {
        // We go through only the allowed properties individually rather
        // than doing a single big rule.cssText.replace(blahblah) because
        // there can be special cases like `content`, where a property
        // that's just the url() call should be replaced but when it's a
        // url() call inside of a string it should not which makes using a
        // regex-only solution unreasonable.
        //
        // 1. Find all url() calls from `rule.style[x]`
        // 2. Fetch the resources under the url()'s
        // 3. Replace with base64 fetched contents using
        //    `rule.style.setProperty`
        //
        // Modifying rule.style[x] doesn't actually update the base css
        // text, which is a shame - instead we're going to update the
        // rule.style text and then return cssText, which DOES get updated.
        var rulesThatNeedTheirURLCallsInlined = [
            'background',
            'backgroundImage',
            'listStyle',
            'listStyleImage',
            'content',
            'cursor',
            'border',
            'borderImage',
            'borderImageSource',
            'mask',
            'maskImage'
        ];
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(rulesThatNeedTheirURLCallsInlined.map(function (ruleName) {
            var ruleStyle = rule.style[ruleName];
            if (ruleStyle === '' ||
                ruleStyle === undefined) {
                return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)([]);
            }
            return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(inlineStyleSheetTextURLs(baseURL)(ruleStyle), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (_a) {
                var errors = _a.errors, value = _a.value;
                // fp gods please spare me again
                rule.style[ruleName] = value;
                return errors;
            }));
        }), parallelAll, (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.flatten), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (e) {
            // Needs to be a thunk to let the rule.cssText update
            return (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromErrors)(rule.cssText)(e);
        }));
    }
    else if (rule instanceof CSSFontFaceRule) {
        // Setting `src` in a @font-face declaration is not supported in
        // Firefox, we unfortunately have to replace things manually
        return inlineStyleSheetTextURLs(baseURL)(rule.cssText);
    }
    else if (rule instanceof CSSMediaRule) {
        if (window.matchMedia(rule.media.mediaText).matches) {
            return inlineURLsFromCSSRuleList(rule.cssRules, baseURL);
        }
        else {
            return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.empty)(''));
        }
    }
    else if (rule instanceof CSSImportRule) {
        // Download the referenced stylesheet recursively
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)((0,_download__WEBPACK_IMPORTED_MODULE_1__.download)(rule.href), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.mapRej)(_download__WEBPACK_IMPORTED_MODULE_1__.downloadErrorToDetailedError), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_download__WEBPACK_IMPORTED_MODULE_1__.responseToText), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(processStyleSheetText(rule.href)));
    }
    else if (rule instanceof CSSPageRule) {
        // Library is not used in print contexts - safe to ignore.
        return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.empty)(rule.cssText));
    }
    return (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.empty)(rule.cssText));
}; };
var inlineURLsFromCSSRuleList = function (cssRules, baseURL) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(Array.from(cssRules), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)(inlineURLsFromCSSRule(baseURL)), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)((0,fluture__WEBPACK_IMPORTED_MODULE_0__.coalesce)(function (x) {
        return (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromErrors)('')([x]);
    })(fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_5__.identity)), parallelAll, (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fold)(function (a, b) { return a + "\n" + b; }, '')));
};
// Cross-origin stylesheets cannot be read from directly, download any
// stylesheet that's not inline.
var extractStylesFromCSSStyleSheet = function (baseURL) { return function (styleSheet) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(styleSheet.href
        ? (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)((0,_download__WEBPACK_IMPORTED_MODULE_1__.download)(styleSheet.href), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.mapRej)(_download__WEBPACK_IMPORTED_MODULE_1__.downloadErrorToDetailedError), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_download__WEBPACK_IMPORTED_MODULE_1__.responseToText))
        : (0,fluture__WEBPACK_IMPORTED_MODULE_0__.resolve)(Array.from(styleSheet.cssRules)
            .map(function (rule) { return rule.cssText; })
            .join('\n')), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(processStyleSheetText(styleSheet.href || baseURL)));
}; };
var extractStylesFromStyleSheets = function (styleSheets, baseURL) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(Array.from(styleSheets), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.filter)(isCSSStyleSheet), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)(extractStylesFromCSSStyleSheet(baseURL)), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)((0,fluture__WEBPACK_IMPORTED_MODULE_0__.coalesce)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromError)(''))(fp_ts_es6_function__WEBPACK_IMPORTED_MODULE_5__.identity)), parallelAll);
};
var inlineExternalStylesheets = function (container) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(extractStylesFromStyleSheets(container.parentWindow.document.styleSheets, container.parentWindow.window.location.href), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (stacks) {
        var e_1, _a;
        try {
            for (var _b = __values((0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(stacks, (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)(_error_stack__WEBPACK_IMPORTED_MODULE_2__.value))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var styleContents = _c.value;
                var $style = container.parentWindow.document.createElement('style');
                $style.appendChild(container.parentWindow.document.createTextNode(styleContents));
                container.tree.head.appendChild($style);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var errors = (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(stacks, (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)(_error_stack__WEBPACK_IMPORTED_MODULE_2__.errors), fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.flatten);
        return (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromErrors)(container)(errors);
    }));
};
// Inline all images on the page (improvement: can only
// inline *visible* images for potentially less network
// strain if cache doesn't work)
var inlineImages = function (container) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(Array.from(container.tree.html.querySelectorAll('img')), (0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.map)(function ($image) {
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)((0,_download__WEBPACK_IMPORTED_MODULE_1__.download)($image.src), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.mapRej)(_download__WEBPACK_IMPORTED_MODULE_1__.downloadErrorToDetailedError), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_download__WEBPACK_IMPORTED_MODULE_1__.responseToBlob), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(_download__WEBPACK_IMPORTED_MODULE_1__.blobToDataURL), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (dataURL) {
            // please don't hurt me fp gods
            $image.src = dataURL;
            return dataURL;
        }), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.coalesce)(fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_6__.left)(fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_6__.right));
    }), parallelAll, (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromEithers)(container)));
};
var inlineExternalResources = function (container) {
    return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(inlineImages(container), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.chain)(function (stack) {
        // Improvement: `errorStack.chain`
        return (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_3__.pipe)(inlineExternalStylesheets((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.value)(stack)), (0,fluture__WEBPACK_IMPORTED_MODULE_0__.map)(function (secondStack) {
            return (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.fromErrors)((0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.value)(secondStack))((0,fp_ts_es6_Array__WEBPACK_IMPORTED_MODULE_4__.flatten)([
                (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.errors)(stack),
                (0,_error_stack__WEBPACK_IMPORTED_MODULE_2__.errors)(secondStack)
            ]));
        }));
    }));
};


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/noop.js":
/*!***************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/noop.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
var noop = function () { };


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/options.js":
/*!******************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/options.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaults": () => (/* binding */ defaults),
/* harmony export */   "normalize": () => (/* binding */ normalize)
/* harmony export */ });
var defaults = {
    ignore: []
};
var normalize = function (options) {
    return Object.assign({}, defaults, options);
};


/***/ }),

/***/ "./node_modules/@gripeless/pico/dist/window-info.js":
/*!**********************************************************!*\
  !*** ./node_modules/@gripeless/pico/dist/window-info.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getWindowInfo": () => (/* binding */ getWindowInfo)
/* harmony export */ });
/* harmony import */ var fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fp-ts/es6/Either */ "./node_modules/fp-ts/es6/Either.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ "./node_modules/@gripeless/pico/dist/error.js");


var getWindowInfo = function ($window) {
    var $document = $window.document;
    var $head = $document.head;
    var $body = $document.body;
    var $html = $document.querySelector('html');
    if (!($html instanceof HTMLHtmlElement)) {
        return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_1__.left)((0,_error__WEBPACK_IMPORTED_MODULE_0__.err)('Failed to get HTMLHtmlElement'));
    }
    if (!($body instanceof HTMLBodyElement)) {
        return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_1__.left)((0,_error__WEBPACK_IMPORTED_MODULE_0__.err)('Failed to get HTMLBodyElement'));
    }
    // const $canvas = $document.createElement('canvas')
    // const ctx = $canvas.getContext('2d')
    // const $iframe = $document.createElement('iframe')
    // const $svg = $document.createElementNS(svgNS, 'svg')
    return (0,fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_1__.right)({
        window: $window,
        document: $document,
        html: $html,
        head: $head,
        body: $body
    });
};


/***/ }),

/***/ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITERATE_KEY": () => (/* binding */ ITERATE_KEY),
/* harmony export */   "computed": () => (/* binding */ computed),
/* harmony export */   "customRef": () => (/* binding */ customRef),
/* harmony export */   "effect": () => (/* binding */ effect),
/* harmony export */   "enableTracking": () => (/* binding */ enableTracking),
/* harmony export */   "isProxy": () => (/* binding */ isProxy),
/* harmony export */   "isReactive": () => (/* binding */ isReactive),
/* harmony export */   "isReadonly": () => (/* binding */ isReadonly),
/* harmony export */   "isRef": () => (/* binding */ isRef),
/* harmony export */   "markRaw": () => (/* binding */ markRaw),
/* harmony export */   "pauseTracking": () => (/* binding */ pauseTracking),
/* harmony export */   "proxyRefs": () => (/* binding */ proxyRefs),
/* harmony export */   "reactive": () => (/* binding */ reactive),
/* harmony export */   "readonly": () => (/* binding */ readonly),
/* harmony export */   "ref": () => (/* binding */ ref),
/* harmony export */   "resetTracking": () => (/* binding */ resetTracking),
/* harmony export */   "shallowReactive": () => (/* binding */ shallowReactive),
/* harmony export */   "shallowReadonly": () => (/* binding */ shallowReadonly),
/* harmony export */   "shallowRef": () => (/* binding */ shallowRef),
/* harmony export */   "stop": () => (/* binding */ stop),
/* harmony export */   "toRaw": () => (/* binding */ toRaw),
/* harmony export */   "toRef": () => (/* binding */ toRef),
/* harmony export */   "toRefs": () => (/* binding */ toRefs),
/* harmony export */   "track": () => (/* binding */ track),
/* harmony export */   "trigger": () => (/* binding */ trigger),
/* harmony export */   "triggerRef": () => (/* binding */ triggerRef),
/* harmony export */   "unref": () => (/* binding */ unref)
/* harmony export */ });
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");


const targetMap = new WeakMap();
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol(( true) ? 'iterate' : 0);
const MAP_KEY_ITERATE_KEY = Symbol(( true) ? 'Map key iterate' : 0);
function isEffect(fn) {
    return fn && fn._isEffect === true;
}
function effect(fn, options = _vue_shared__WEBPACK_IMPORTED_MODULE_0__.EMPTY_OBJ) {
    if (isEffect(fn)) {
        fn = fn.raw;
    }
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) {
        effect();
    }
    return effect;
}
function stop(effect) {
    if (effect.active) {
        cleanup(effect);
        if (effect.options.onStop) {
            effect.options.onStop();
        }
        effect.active = false;
    }
}
let uid = 0;
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effect.active) {
            return options.scheduler ? undefined : fn();
        }
        if (!effectStack.includes(effect)) {
            cleanup(effect);
            try {
                enableTracking();
                effectStack.push(effect);
                activeEffect = effect;
                return fn();
            }
            finally {
                effectStack.pop();
                resetTracking();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.id = uid++;
    effect.allowRecurse = !!options.allowRecurse;
    effect._isEffect = true;
    effect.active = true;
    effect.raw = fn;
    effect.deps = [];
    effect.options = options;
    return effect;
}
function cleanup(effect) {
    const { deps } = effect;
    if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
            deps[i].delete(effect);
        }
        deps.length = 0;
    }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}
function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
}
function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
}
function track(target, type, key) {
    if (!shouldTrack || activeEffect === undefined) {
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (( true) && activeEffect.options.onTrack) {
            activeEffect.options.onTrack({
                effect: activeEffect,
                target,
                type,
                key
            });
        }
    }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        // never been tracked
        return;
    }
    const effects = new Set();
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect !== activeEffect || effect.allowRecurse) {
                    effects.add(effect);
                }
            });
        }
    };
    if (type === "clear" /* CLEAR */) {
        // collection being cleared
        // trigger all effects for target
        depsMap.forEach(add);
    }
    else if (key === 'length' && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key >= newValue) {
                add(dep);
            }
        });
    }
    else {
        // schedule runs for SET | ADD | DELETE
        if (key !== void 0) {
            add(depsMap.get(key));
        }
        // also run for iteration key on ADD | DELETE | Map.SET
        switch (type) {
            case "add" /* ADD */:
                if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isIntegerKey)(key)) {
                    // new index added to array -> length changes
                    add(depsMap.get('length'));
                }
                break;
            case "delete" /* DELETE */:
                if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
                    add(depsMap.get(ITERATE_KEY));
                    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)) {
                        add(depsMap.get(MAP_KEY_ITERATE_KEY));
                    }
                }
                break;
            case "set" /* SET */:
                if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)) {
                    add(depsMap.get(ITERATE_KEY));
                }
                break;
        }
    }
    const run = (effect) => {
        if (( true) && effect.options.onTrigger) {
            effect.options.onTrigger({
                effect,
                target,
                key,
                type,
                newValue,
                oldValue,
                oldTarget
            });
        }
        if (effect.options.scheduler) {
            effect.options.scheduler(effect);
        }
        else {
            effect();
        }
    };
    effects.forEach(run);
}

const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
    .map(key => Symbol[key])
    .filter(_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol));
const get = /*#__PURE__*/ createGetter();
const shallowGet = /*#__PURE__*/ createGetter(false, true);
const readonlyGet = /*#__PURE__*/ createGetter(true);
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
const arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function (...args) {
        const arr = toRaw(this);
        for (let i = 0, l = this.length; i < l; i++) {
            track(arr, "get" /* GET */, i + '');
        }
        // we run the method using the original args first (which may be reactive)
        const res = method.apply(arr, args);
        if (res === -1 || res === false) {
            // if that didn't work, run it again using raw values.
            return method.apply(arr, args.map(toRaw));
        }
        else {
            return res;
        }
    };
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function (...args) {
        pauseTracking();
        const res = method.apply(this, args);
        resetTracking();
        return res;
    };
});
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */ &&
            receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)) {
            return target;
        }
        const targetIsArray = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target);
        if (!isReadonly && targetIsArray && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(arrayInstrumentations, key)) {
            return Reflect.get(arrayInstrumentations, key, receiver);
        }
        const res = Reflect.get(target, key, receiver);
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key)
            ? builtInSymbols.has(key)
            : key === `__proto__` || key === `__v_isRef`) {
            return res;
        }
        if (!isReadonly) {
            track(target, "get" /* GET */, key);
        }
        if (shallow) {
            return res;
        }
        if (isRef(res)) {
            // ref unwrapping - does not apply for Array + integer key.
            const shouldUnwrap = !targetIsArray || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isIntegerKey)(key);
            return shouldUnwrap ? res.value : res;
        }
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(res)) {
            // Convert returned value into a proxy as well. we do the isObject check
            // here to avoid invalid value warning. Also need to lazy access readonly
            // and reactive here to avoid circular dependency.
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
const set = /*#__PURE__*/ createSetter();
const shallowSet = /*#__PURE__*/ createSetter(true);
function createSetter(shallow = false) {
    return function set(target, key, value, receiver) {
        const oldValue = target[key];
        if (!shallow) {
            value = toRaw(value);
            if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
        }
        const hadKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isIntegerKey)(key)
            ? Number(key) < target.length
            : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(target, key);
        const result = Reflect.set(target, key, value, receiver);
        // don't trigger if target is something up in the prototype chain of original
        if (target === toRaw(receiver)) {
            if (!hadKey) {
                trigger(target, "add" /* ADD */, key, value);
            }
            else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(value, oldValue)) {
                trigger(target, "set" /* SET */, key, value, oldValue);
            }
        }
        return result;
    };
}
function deleteProperty(target, key) {
    const hadKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
        trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
    }
    return result;
}
function has(target, key) {
    const result = Reflect.has(target, key);
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) || !builtInSymbols.has(key)) {
        track(target, "has" /* HAS */, key);
    }
    return result;
}
function ownKeys(target) {
    track(target, "iterate" /* ITERATE */, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target) ? 'length' : ITERATE_KEY);
    return Reflect.ownKeys(target);
}
const mutableHandlers = {
    get,
    set,
    deleteProperty,
    has,
    ownKeys
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
        if ((true)) {
            console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
    },
    deleteProperty(target, key) {
        if ((true)) {
            console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
        }
        return true;
    }
};
const shallowReactiveHandlers = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.extend)({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});
// Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.
const shallowReadonlyHandlers = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.extend)({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

const toReactive = (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) ? reactive(value) : value;
const toReadonly = (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) ? readonly(value) : value;
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
    // #1772: readonly(reactive(Map)) should return readonly + reactive version
    // of the value
    target = target["__v_raw" /* RAW */];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
        !isReadonly && track(rawTarget, "get" /* GET */, key);
    }
    !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
    const { has } = getProto(rawTarget);
    const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
    if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
    }
    else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
    }
}
function has$1(key, isReadonly = false) {
    const target = this["__v_raw" /* RAW */];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
        !isReadonly && track(rawTarget, "has" /* HAS */, key);
    }
    !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
    return key === rawKey
        ? target.has(key)
        : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
    target = target["__v_raw" /* RAW */];
    !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
    return Reflect.get(target, 'size', target);
}
function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    target.add(value);
    if (!hadKey) {
        trigger(target, "add" /* ADD */, value, value);
    }
    return this;
}
function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has, get } = getProto(target);
    let hadKey = has.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
    }
    else if ((true)) {
        checkIdentityKeys(target, has, key);
    }
    const oldValue = get.call(target, key);
    target.set(key, value);
    if (!hadKey) {
        trigger(target, "add" /* ADD */, key, value);
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(value, oldValue)) {
        trigger(target, "set" /* SET */, key, value, oldValue);
    }
    return this;
}
function deleteEntry(key) {
    const target = toRaw(this);
    const { has, get } = getProto(target);
    let hadKey = has.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has.call(target, key);
    }
    else if ((true)) {
        checkIdentityKeys(target, has, key);
    }
    const oldValue = get ? get.call(target, key) : undefined;
    // forward the operation before queueing reactions
    const result = target.delete(key);
    if (hadKey) {
        trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
    }
    return result;
}
function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = ( true)
        ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)
            ? new Map(target)
            : new Set(target)
        : 0;
    // forward the operation before queueing reactions
    const result = target.clear();
    if (hadItems) {
        trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
    }
    return result;
}
function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
        !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
        return target.forEach((value, key) => {
            // important: make sure the callback is
            // 1. invoked with the reactive map as `this` and 3rd arg
            // 2. the value received should be a corresponding reactive/readonly.
            return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
    };
}
function createIterableMethod(method, isReadonly, isShallow) {
    return function (...args) {
        const target = this["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const targetIsMap = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(rawTarget);
        const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
        const isKeyOnly = method === 'keys' && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
        !isReadonly &&
            track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        // return a wrapped iterator which returns observed versions of the
        // values emitted from the real iterator
        return {
            // iterator protocol
            next() {
                const { value, done } = innerIterator.next();
                return done
                    ? { value, done }
                    : {
                        value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                        done
                    };
            },
            // iterable protocol
            [Symbol.iterator]() {
                return this;
            }
        };
    };
}
function createReadonlyMethod(type) {
    return function (...args) {
        if ((true)) {
            const key = args[0] ? `on key "${args[0]}" ` : ``;
            console.warn(`${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.capitalize)(type)} operation ${key}failed: target is readonly.`, toRaw(this));
        }
        return type === "delete" /* DELETE */ ? false : this;
    };
}
const mutableInstrumentations = {
    get(key) {
        return get$1(this, key);
    },
    get size() {
        return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
};
const shallowInstrumentations = {
    get(key) {
        return get$1(this, key, false, true);
    },
    get size() {
        return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
};
const readonlyInstrumentations = {
    get(key) {
        return get$1(this, key, true);
    },
    get size() {
        return size(this, true);
    },
    has(key) {
        return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add" /* ADD */),
    set: createReadonlyMethod("set" /* SET */),
    delete: createReadonlyMethod("delete" /* DELETE */),
    clear: createReadonlyMethod("clear" /* CLEAR */),
    forEach: createForEach(true, false)
};
const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
iteratorMethods.forEach(method => {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
});
function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow
        ? shallowInstrumentations
        : isReadonly
            ? readonlyInstrumentations
            : mutableInstrumentations;
    return (target, key, receiver) => {
        if (key === "__v_isReactive" /* IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* IS_READONLY */) {
            return isReadonly;
        }
        else if (key === "__v_raw" /* RAW */) {
            return target;
        }
        return Reflect.get((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(instrumentations, key) && key in target
            ? instrumentations
            : target, key, receiver);
    };
}
const mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
        const type = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.toRawType)(target);
        console.warn(`Reactive ${type} contains both the raw and reactive ` +
            `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
            `which can lead to inconsistencies. ` +
            `Avoid differentiating between the raw and reactive versions ` +
            `of an object and only use the reactive version if possible.`);
    }
}

const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
function targetTypeMap(rawType) {
    switch (rawType) {
        case 'Object':
        case 'Array':
            return 1 /* COMMON */;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2 /* COLLECTION */;
        default:
            return 0 /* INVALID */;
    }
}
function getTargetType(value) {
    return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
        ? 0 /* INVALID */
        : targetTypeMap((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.toRawType)(value));
}
function reactive(target) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (target && target["__v_isReadonly" /* IS_READONLY */]) {
        return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
}
/**
 * Return a shallowly-reactive copy of the original object, where only the root
 * level properties are reactive. It also does not auto-unwrap refs (even at the
 * root level).
 */
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers);
}
/**
 * Creates a readonly copy of the original object. Note the returned copy is not
 * made reactive, but `readonly` can be called on an already reactive object.
 */
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers);
}
/**
 * Returns a reactive-copy of the original object, where only the root level
 * properties are readonly, and does NOT unwrap refs nor recursively convert
 * returned properties.
 * This is used for creating the props proxy object for stateful components.
 */
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, readonlyCollectionHandlers);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(target)) {
        if ((true)) {
            console.warn(`value cannot be made reactive: ${String(target)}`);
        }
        return target;
    }
    // target is already a Proxy, return it.
    // exception: calling readonly() on a reactive object
    if (target["__v_raw" /* RAW */] &&
        !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
        return target;
    }
    // target already has corresponding Proxy
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    // only a whitelist of value types can be observed.
    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
        return target;
    }
    const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}
function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw" /* RAW */]);
    }
    return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
}
function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
}
function isProxy(value) {
    return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
    return ((observed && toRaw(observed["__v_raw" /* RAW */])) || observed);
}
function markRaw(value) {
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.def)(value, "__v_skip" /* SKIP */, true);
    return value;
}

const convert = (val) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(val) ? reactive(val) : val;
function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
}
function ref(value) {
    return createRef(value);
}
function shallowRef(value) {
    return createRef(value, true);
}
class RefImpl {
    constructor(_rawValue, _shallow = false) {
        this._rawValue = _rawValue;
        this._shallow = _shallow;
        this.__v_isRef = true;
        this._value = _shallow ? _rawValue : convert(_rawValue);
    }
    get value() {
        track(toRaw(this), "get" /* GET */, 'value');
        return this._value;
    }
    set value(newVal) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(toRaw(newVal), this._rawValue)) {
            this._rawValue = newVal;
            this._value = this._shallow ? newVal : convert(newVal);
            trigger(toRaw(this), "set" /* SET */, 'value', newVal);
        }
    }
}
function createRef(rawValue, shallow = false) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    return new RefImpl(rawValue, shallow);
}
function triggerRef(ref) {
    trigger(toRaw(ref), "set" /* SET */, 'value', ( true) ? ref.value : 0);
}
function unref(ref) {
    return isRef(ref) ? ref.value : ref;
}
const shallowUnwrapHandlers = {
    get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
        }
        else {
            return Reflect.set(target, key, value, receiver);
        }
    }
};
function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs)
        ? objectWithRefs
        : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
    constructor(factory) {
        this.__v_isRef = true;
        const { get, set } = factory(() => track(this, "get" /* GET */, 'value'), () => trigger(this, "set" /* SET */, 'value'));
        this._get = get;
        this._set = set;
    }
    get value() {
        return this._get();
    }
    set value(newVal) {
        this._set(newVal);
    }
}
function customRef(factory) {
    return new CustomRefImpl(factory);
}
function toRefs(object) {
    if (( true) && !isProxy(object)) {
        console.warn(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(object) ? new Array(object.length) : {};
    for (const key in object) {
        ret[key] = toRef(object, key);
    }
    return ret;
}
class ObjectRefImpl {
    constructor(_object, _key) {
        this._object = _object;
        this._key = _key;
        this.__v_isRef = true;
    }
    get value() {
        return this._object[this._key];
    }
    set value(newVal) {
        this._object[this._key] = newVal;
    }
}
function toRef(object, key) {
    return isRef(object[key])
        ? object[key]
        : new ObjectRefImpl(object, key);
}

class ComputedRefImpl {
    constructor(getter, _setter, isReadonly) {
        this._setter = _setter;
        this._dirty = true;
        this.__v_isRef = true;
        this.effect = effect(getter, {
            lazy: true,
            scheduler: () => {
                if (!this._dirty) {
                    this._dirty = true;
                    trigger(toRaw(this), "set" /* SET */, 'value');
                }
            }
        });
        this["__v_isReadonly" /* IS_READONLY */] = isReadonly;
    }
    get value() {
        if (this._dirty) {
            this._value = this.effect();
            this._dirty = false;
        }
        track(toRaw(this), "get" /* GET */, 'value');
        return this._value;
    }
    set value(newValue) {
        this._setter(newValue);
    }
}
function computed(getterOrOptions) {
    let getter;
    let setter;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isFunction)(getterOrOptions)) {
        getter = getterOrOptions;
        setter = ( true)
            ? () => {
                console.warn('Write operation failed: computed value is readonly');
            }
            : 0;
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isFunction)(getterOrOptions) || !getterOrOptions.set);
}




/***/ }),

/***/ "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customRef": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.customRef),
/* harmony export */   "isProxy": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy),
/* harmony export */   "isReactive": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive),
/* harmony export */   "isReadonly": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReadonly),
/* harmony export */   "isRef": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef),
/* harmony export */   "markRaw": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.markRaw),
/* harmony export */   "proxyRefs": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs),
/* harmony export */   "reactive": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.reactive),
/* harmony export */   "readonly": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   "ref": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "shallowReactive": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReactive),
/* harmony export */   "shallowReadonly": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly),
/* harmony export */   "shallowRef": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowRef),
/* harmony export */   "toRaw": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw),
/* harmony export */   "toRef": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   "toRefs": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   "triggerRef": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.triggerRef),
/* harmony export */   "unref": () => (/* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.unref),
/* harmony export */   "camelize": () => (/* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize),
/* harmony export */   "capitalize": () => (/* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize),
/* harmony export */   "toDisplayString": () => (/* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.toDisplayString),
/* harmony export */   "toHandlerKey": () => (/* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey),
/* harmony export */   "BaseTransition": () => (/* binding */ BaseTransition),
/* harmony export */   "Comment": () => (/* binding */ Comment),
/* harmony export */   "Fragment": () => (/* binding */ Fragment),
/* harmony export */   "KeepAlive": () => (/* binding */ KeepAlive),
/* harmony export */   "Static": () => (/* binding */ Static),
/* harmony export */   "Suspense": () => (/* binding */ Suspense),
/* harmony export */   "Teleport": () => (/* binding */ Teleport),
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "callWithAsyncErrorHandling": () => (/* binding */ callWithAsyncErrorHandling),
/* harmony export */   "callWithErrorHandling": () => (/* binding */ callWithErrorHandling),
/* harmony export */   "cloneVNode": () => (/* binding */ cloneVNode),
/* harmony export */   "computed": () => (/* binding */ computed),
/* harmony export */   "createBlock": () => (/* binding */ createBlock),
/* harmony export */   "createCommentVNode": () => (/* binding */ createCommentVNode),
/* harmony export */   "createHydrationRenderer": () => (/* binding */ createHydrationRenderer),
/* harmony export */   "createRenderer": () => (/* binding */ createRenderer),
/* harmony export */   "createSlots": () => (/* binding */ createSlots),
/* harmony export */   "createStaticVNode": () => (/* binding */ createStaticVNode),
/* harmony export */   "createTextVNode": () => (/* binding */ createTextVNode),
/* harmony export */   "createVNode": () => (/* binding */ createVNode),
/* harmony export */   "defineAsyncComponent": () => (/* binding */ defineAsyncComponent),
/* harmony export */   "defineComponent": () => (/* binding */ defineComponent),
/* harmony export */   "defineEmit": () => (/* binding */ defineEmit),
/* harmony export */   "defineProps": () => (/* binding */ defineProps),
/* harmony export */   "devtools": () => (/* binding */ devtools),
/* harmony export */   "getCurrentInstance": () => (/* binding */ getCurrentInstance),
/* harmony export */   "getTransitionRawChildren": () => (/* binding */ getTransitionRawChildren),
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "handleError": () => (/* binding */ handleError),
/* harmony export */   "initCustomFormatter": () => (/* binding */ initCustomFormatter),
/* harmony export */   "inject": () => (/* binding */ inject),
/* harmony export */   "isVNode": () => (/* binding */ isVNode),
/* harmony export */   "mergeProps": () => (/* binding */ mergeProps),
/* harmony export */   "nextTick": () => (/* binding */ nextTick),
/* harmony export */   "onActivated": () => (/* binding */ onActivated),
/* harmony export */   "onBeforeMount": () => (/* binding */ onBeforeMount),
/* harmony export */   "onBeforeUnmount": () => (/* binding */ onBeforeUnmount),
/* harmony export */   "onBeforeUpdate": () => (/* binding */ onBeforeUpdate),
/* harmony export */   "onDeactivated": () => (/* binding */ onDeactivated),
/* harmony export */   "onErrorCaptured": () => (/* binding */ onErrorCaptured),
/* harmony export */   "onMounted": () => (/* binding */ onMounted),
/* harmony export */   "onRenderTracked": () => (/* binding */ onRenderTracked),
/* harmony export */   "onRenderTriggered": () => (/* binding */ onRenderTriggered),
/* harmony export */   "onUnmounted": () => (/* binding */ onUnmounted),
/* harmony export */   "onUpdated": () => (/* binding */ onUpdated),
/* harmony export */   "openBlock": () => (/* binding */ openBlock),
/* harmony export */   "popScopeId": () => (/* binding */ popScopeId),
/* harmony export */   "provide": () => (/* binding */ provide),
/* harmony export */   "pushScopeId": () => (/* binding */ pushScopeId),
/* harmony export */   "queuePostFlushCb": () => (/* binding */ queuePostFlushCb),
/* harmony export */   "registerRuntimeCompiler": () => (/* binding */ registerRuntimeCompiler),
/* harmony export */   "renderList": () => (/* binding */ renderList),
/* harmony export */   "renderSlot": () => (/* binding */ renderSlot),
/* harmony export */   "resolveComponent": () => (/* binding */ resolveComponent),
/* harmony export */   "resolveDirective": () => (/* binding */ resolveDirective),
/* harmony export */   "resolveDynamicComponent": () => (/* binding */ resolveDynamicComponent),
/* harmony export */   "resolveTransitionHooks": () => (/* binding */ resolveTransitionHooks),
/* harmony export */   "setBlockTracking": () => (/* binding */ setBlockTracking),
/* harmony export */   "setDevtoolsHook": () => (/* binding */ setDevtoolsHook),
/* harmony export */   "setTransitionHooks": () => (/* binding */ setTransitionHooks),
/* harmony export */   "ssrContextKey": () => (/* binding */ ssrContextKey),
/* harmony export */   "ssrUtils": () => (/* binding */ ssrUtils),
/* harmony export */   "toHandlers": () => (/* binding */ toHandlers),
/* harmony export */   "transformVNodeArgs": () => (/* binding */ transformVNodeArgs),
/* harmony export */   "useContext": () => (/* binding */ useContext),
/* harmony export */   "useSSRContext": () => (/* binding */ useSSRContext),
/* harmony export */   "useTransitionState": () => (/* binding */ useTransitionState),
/* harmony export */   "version": () => (/* binding */ version),
/* harmony export */   "warn": () => (/* binding */ warn),
/* harmony export */   "watch": () => (/* binding */ watch),
/* harmony export */   "watchEffect": () => (/* binding */ watchEffect),
/* harmony export */   "withCtx": () => (/* binding */ withCtx),
/* harmony export */   "withDirectives": () => (/* binding */ withDirectives),
/* harmony export */   "withScopeId": () => (/* binding */ withScopeId)
/* harmony export */ });
/* harmony import */ var _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/reactivity */ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");





const stack = [];
function pushWarningContext(vnode) {
    stack.push(vnode);
}
function popWarningContext() {
    stack.pop();
}
function warn(msg, ...args) {
    // avoid props formatting or warn handler tracking deps that might be mutated
    // during patch, leading to infinite recursion.
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
            msg + args.join(''),
            instance && instance.proxy,
            trace
                .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                .join('\n'),
            trace
        ]);
    }
    else {
        const warnArgs = [`[Vue warn]: ${msg}`, ...args];
        /* istanbul ignore if */
        if (trace.length &&
            // avoid spamming console during tests
            !false) {
            warnArgs.push(`\n`, ...formatTrace(trace));
        }
        console.warn(...warnArgs);
    }
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
}
function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
        return [];
    }
    // we can't just use the stack because it will be incomplete during updates
    // that did not start from the root. Re-construct the parent chain using
    // instance parent pointers.
    const normalizedStack = [];
    while (currentVNode) {
        const last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
            last.recurseCount++;
        }
        else {
            normalizedStack.push({
                vnode: currentVNode,
                recurseCount: 0
            });
        }
        const parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
}
/* istanbul ignore next */
function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
        logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
    });
    return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props
        ? [open, ...formatProps(vnode.props), close]
        : [open + close];
}
/* istanbul ignore next */
function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach(key => {
        res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
        res.push(` ...`);
    }
    return res;
}
/* istanbul ignore next */
function formatProp(key, value, raw) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
        value = JSON.stringify(value);
        return raw ? value : [`${key}=${value}`];
    }
    else if (typeof value === 'number' ||
        typeof value === 'boolean' ||
        value == null) {
        return raw ? value : [`${key}=${value}`];
    }
    else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(value)) {
        value = formatProp(key, (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(value.value), true);
        return raw ? value : [`${key}=Ref<`, value, `>`];
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
        return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    }
    else {
        value = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(value);
        return raw ? value : [`${key}=`, value];
    }
}

const ErrorTypeStrings = {
    ["bc" /* BEFORE_CREATE */]: 'beforeCreate hook',
    ["c" /* CREATED */]: 'created hook',
    ["bm" /* BEFORE_MOUNT */]: 'beforeMount hook',
    ["m" /* MOUNTED */]: 'mounted hook',
    ["bu" /* BEFORE_UPDATE */]: 'beforeUpdate hook',
    ["u" /* UPDATED */]: 'updated',
    ["bum" /* BEFORE_UNMOUNT */]: 'beforeUnmount hook',
    ["um" /* UNMOUNTED */]: 'unmounted hook',
    ["a" /* ACTIVATED */]: 'activated hook',
    ["da" /* DEACTIVATED */]: 'deactivated hook',
    ["ec" /* ERROR_CAPTURED */]: 'errorCaptured hook',
    ["rtc" /* RENDER_TRACKED */]: 'renderTracked hook',
    ["rtg" /* RENDER_TRIGGERED */]: 'renderTriggered hook',
    [0 /* SETUP_FUNCTION */]: 'setup function',
    [1 /* RENDER_FUNCTION */]: 'render function',
    [2 /* WATCH_GETTER */]: 'watcher getter',
    [3 /* WATCH_CALLBACK */]: 'watcher callback',
    [4 /* WATCH_CLEANUP */]: 'watcher cleanup function',
    [5 /* NATIVE_EVENT_HANDLER */]: 'native event handler',
    [6 /* COMPONENT_EVENT_HANDLER */]: 'component event handler',
    [7 /* VNODE_HOOK */]: 'vnode hook',
    [8 /* DIRECTIVE_HOOK */]: 'directive hook',
    [9 /* TRANSITION_HOOK */]: 'transition hook',
    [10 /* APP_ERROR_HANDLER */]: 'app errorHandler',
    [11 /* APP_WARN_HANDLER */]: 'app warnHandler',
    [12 /* FUNCTION_REF */]: 'ref function',
    [13 /* ASYNC_COMPONENT_LOADER */]: 'async component loader',
    [14 /* SCHEDULER */]: 'scheduler flush. This is likely a Vue internals bug. ' +
        'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
};
function callWithErrorHandling(fn, instance, type, args) {
    let res;
    try {
        res = args ? fn(...args) : fn();
    }
    catch (err) {
        handleError(err, instance, type);
    }
    return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(res)) {
            res.catch(err => {
                handleError(err, instance, type);
            });
        }
        return res;
    }
    const values = [];
    for (let i = 0; i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
}
function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    if (instance) {
        let cur = instance.parent;
        // the exposed instance is the render proxy to keep it consistent with 2.x
        const exposedInstance = instance.proxy;
        // in production the hook receives only the error code
        const errorInfo = ( true) ? ErrorTypeStrings[type] : 0;
        while (cur) {
            const errorCapturedHooks = cur.ec;
            if (errorCapturedHooks) {
                for (let i = 0; i < errorCapturedHooks.length; i++) {
                    if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                        return;
                    }
                }
            }
            cur = cur.parent;
        }
        // app-level handling
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
            callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
            return;
        }
    }
    logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
    if ((true)) {
        const info = ErrorTypeStrings[type];
        if (contextVNode) {
            pushWarningContext(contextVNode);
        }
        warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
        if (contextVNode) {
            popWarningContext();
        }
        // crash in dev by default so it's more noticeable
        if (throwInDev) {
            throw err;
        }
        else {
            console.error(err);
        }
    }
    else {}
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
    const p = currentFlushPromise || resolvedPromise;
    return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function queueJob(job) {
    // the dedupe search uses the startIndex argument of Array.includes()
    // by default the search index includes the current job that is being run
    // so it cannot recursively trigger itself again.
    // if the job is a watch() callback, the search will start with a +1 index to
    // allow it recursively trigger itself - it is the user's responsibility to
    // ensure it doesn't end up in an infinite loop.
    if ((!queue.length ||
        !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
        job !== currentPreFlushParentJob) {
        queue.push(job);
        queueFlush();
    }
}
function queueFlush() {
    if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
    }
}
function invalidateJob(job) {
    const i = queue.indexOf(job);
    if (i > -1) {
        queue.splice(i, 1);
    }
}
function queueCb(cb, activeQueue, pendingQueue, index) {
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(cb)) {
        if (!activeQueue ||
            !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
            pendingQueue.push(cb);
        }
    }
    else {
        // if cb is an array, it is a component lifecycle hook which can only be
        // triggered by a job, which is already deduped in the main queue, so
        // we can skip duplicate check here to improve perf
        pendingQueue.push(...cb);
    }
    queueFlush();
}
function queuePreFlushCb(cb) {
    queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
    queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
    if (pendingPreFlushCbs.length) {
        currentPreFlushParentJob = parentJob;
        activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
        pendingPreFlushCbs.length = 0;
        if ((true)) {
            seen = seen || new Map();
        }
        for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
            if ((true)) {
                checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex]);
            }
            activePreFlushCbs[preFlushIndex]();
        }
        activePreFlushCbs = null;
        preFlushIndex = 0;
        currentPreFlushParentJob = null;
        // recursively flush until it drains
        flushPreFlushCbs(seen, parentJob);
    }
}
function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        // #1947 already has active queue, nested flushPostFlushCbs call
        if (activePostFlushCbs) {
            activePostFlushCbs.push(...deduped);
            return;
        }
        activePostFlushCbs = deduped;
        if ((true)) {
            seen = seen || new Map();
        }
        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            if ((true)) {
                checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex]);
            }
            activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    if ((true)) {
        seen = seen || new Map();
    }
    flushPreFlushCbs(seen);
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child so its render effect will have smaller
    //    priority number)
    // 2. If a component is unmounted during a parent component's update,
    //    its update can be skipped.
    queue.sort((a, b) => getId(a) - getId(b));
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            const job = queue[flushIndex];
            if (job) {
                if ((true)) {
                    checkRecursiveUpdates(seen, job);
                }
                callWithErrorHandling(job, null, 14 /* SCHEDULER */);
            }
        }
    }
    finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs(seen);
        isFlushing = false;
        currentFlushPromise = null;
        // some postFlushCb queued jobs!
        // keep flushing until it drains.
        if (queue.length || pendingPostFlushCbs.length) {
            flushJobs(seen);
        }
    }
}
function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
        seen.set(fn, 1);
    }
    else {
        const count = seen.get(fn);
        if (count > RECURSION_LIMIT) {
            throw new Error(`Maximum recursive updates exceeded. ` +
                `This means you have a reactive effect that is mutating its own ` +
                `dependencies and thus recursively triggering itself. Possible sources ` +
                `include component template, render function, updated hook or ` +
                `watcher source function.`);
        }
        else {
            seen.set(fn, count + 1);
        }
    }
}

/* eslint-disable no-restricted-globals */
let isHmrUpdating = false;
const hmrDirtyComponents = new Set();
// Expose the HMR runtime on the global object
// This makes it entirely tree-shakable without polluting the exports and makes
// it easier to be used in toolings like vue-loader
// Note: for a component to be eligible for HMR it also needs the __hmrId option
// to be set so that its instances can be registered / removed.
if ((true)) {
    const globalObject = typeof __webpack_require__.g !== 'undefined'
        ? __webpack_require__.g
        : typeof self !== 'undefined'
            ? self
            : typeof window !== 'undefined'
                ? window
                : {};
    globalObject.__VUE_HMR_RUNTIME__ = {
        createRecord: tryWrap(createRecord),
        rerender: tryWrap(rerender),
        reload: tryWrap(reload)
    };
}
const map = new Map();
function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
        createRecord(id, instance.type);
        record = map.get(id);
    }
    record.instances.add(instance);
}
function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, component) {
    if (!component) {
        warn(`HMR API usage is out of date.\n` +
            `Please upgrade vue-loader/vite/rollup-plugin-vue or other relevant ` +
            `depdendency that handles Vue SFC compilation.`);
        component = {};
    }
    if (map.has(id)) {
        return false;
    }
    map.set(id, {
        component: isClassComponent(component) ? component.__vccOpts : component,
        instances: new Set()
    });
    return true;
}
function rerender(id, newRender) {
    const record = map.get(id);
    if (!record)
        return;
    if (newRender)
        record.component.render = newRender;
    // Array.from creates a snapshot which avoids the set being mutated during
    // updates
    Array.from(record.instances).forEach(instance => {
        if (newRender) {
            instance.render = newRender;
        }
        instance.renderCache = [];
        // this flag forces child components with slot content to update
        isHmrUpdating = true;
        instance.update();
        isHmrUpdating = false;
    });
}
function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
        return;
    // Array.from creates a snapshot which avoids the set being mutated during
    // updates
    const { component, instances } = record;
    if (!hmrDirtyComponents.has(component)) {
        // 1. Update existing comp definition to match new one
        newComp = isClassComponent(newComp) ? newComp.__vccOpts : newComp;
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(component, newComp);
        for (const key in component) {
            if (!(key in newComp)) {
                delete component[key];
            }
        }
        // 2. Mark component dirty. This forces the renderer to replace the component
        // on patch.
        hmrDirtyComponents.add(component);
        // 3. Make sure to unmark the component after the reload.
        queuePostFlushCb(() => {
            hmrDirtyComponents.delete(component);
        });
    }
    Array.from(instances).forEach(instance => {
        if (instance.parent) {
            // 4. Force the parent instance to re-render. This will cause all updated
            // components to be unmounted and re-mounted. Queue the update so that we
            // don't end up forcing the same parent to re-render multiple times.
            queueJob(instance.parent.update);
        }
        else if (instance.appContext.reload) {
            // root instance mounted via createApp() has a reload method
            instance.appContext.reload();
        }
        else if (typeof window !== 'undefined') {
            // root instance inside tree created via raw render(). Force reload.
            window.location.reload();
        }
        else {
            console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
        }
    });
}
function tryWrap(fn) {
    return (id, arg) => {
        try {
            return fn(id, arg);
        }
        catch (e) {
            console.error(e);
            console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` +
                `Full reload required.`);
        }
    };
}

let devtools;
function setDevtoolsHook(hook) {
    devtools = hook;
}
function devtoolsInitApp(app, version) {
    // TODO queue if devtools is undefined
    if (!devtools)
        return;
    devtools.emit("app:init" /* APP_INIT */, app, version, {
        Fragment,
        Text,
        Comment,
        Static
    });
}
function devtoolsUnmountApp(app) {
    if (!devtools)
        return;
    devtools.emit("app:unmount" /* APP_UNMOUNT */, app);
}
const devtoolsComponentAdded = /*#__PURE__*/ createDevtoolsComponentHook("component:added" /* COMPONENT_ADDED */);
const devtoolsComponentUpdated = /*#__PURE__*/ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
const devtoolsComponentRemoved = /*#__PURE__*/ createDevtoolsComponentHook("component:removed" /* COMPONENT_REMOVED */);
function createDevtoolsComponentHook(hook) {
    return (component) => {
        if (!devtools)
            return;
        devtools.emit(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
    };
}
function devtoolsComponentEmit(component, event, params) {
    if (!devtools)
        return;
    devtools.emit("component:emit" /* COMPONENT_EMIT */, component.appContext.app, component, event, params);
}

function emit(instance, event, ...rawArgs) {
    const props = instance.vnode.props || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    if ((true)) {
        const { emitsOptions, propsOptions: [propsOptions] } = instance;
        if (emitsOptions) {
            if (!(event in emitsOptions)) {
                if (!propsOptions || !((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(event) in propsOptions)) {
                    warn(`Component emitted event "${event}" but it is neither declared in ` +
                        `the emits option nor as an "${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(event)}" prop.`);
                }
            }
            else {
                const validator = emitsOptions[event];
                if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(validator)) {
                    const isValid = validator(...rawArgs);
                    if (!isValid) {
                        warn(`Invalid event arguments: event validation failed for event "${event}".`);
                    }
                }
            }
        }
    }
    let args = rawArgs;
    const isModelListener = event.startsWith('update:');
    // for v-model update:xxx events, apply modifiers on args
    const modelArg = isModelListener && event.slice(7);
    if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === 'modelValue' ? 'model' : modelArg}Modifiers`;
        const { number, trim } = props[modifiersKey] || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
        if (trim) {
            args = rawArgs.map(a => a.trim());
        }
        else if (number) {
            args = rawArgs.map(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber);
        }
    }
    if (true) {
        devtoolsComponentEmit(instance, event, args);
    }
    if ((true)) {
        const lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && props[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(lowerCaseEvent)]) {
            warn(`Event "${lowerCaseEvent}" is emitted in component ` +
                `${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". ` +
                `Note that HTML attributes are case-insensitive and you cannot use ` +
                `v-on to listen to camelCase events when using in-DOM templates. ` +
                `You should probably use "${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event)}" instead of "${event}".`);
        }
    }
    // convert handler name to camelCase. See issue #2249
    let handlerName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(event));
    let handler = props[handlerName];
    // for v-model update:xxx events, also trigger kebab-case equivalent
    // for props passed via kebab-case
    if (!handler && isModelListener) {
        handlerName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event));
        handler = props[handlerName];
    }
    if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
        if (!instance.emitted) {
            (instance.emitted = {})[handlerName] = true;
        }
        else if (instance.emitted[handlerName]) {
            return;
        }
        callWithAsyncErrorHandling(onceHandler, instance, 6 /* COMPONENT_EVENT_HANDLER */, args);
    }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    if (!appContext.deopt && comp.__emits !== undefined) {
        return comp.__emits;
    }
    const raw = comp.emits;
    let normalized = {};
    // apply mixin/extends props
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(comp)) {
        const extendEmits = (raw) => {
            hasExtends = true;
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(normalized, normalizeEmitsOptions(raw, appContext, true));
        };
        if (!asMixin && appContext.mixins.length) {
            appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
            extendEmits(comp.extends);
        }
        if (comp.mixins) {
            comp.mixins.forEach(extendEmits);
        }
    }
    if (!raw && !hasExtends) {
        return (comp.__emits = null);
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
        raw.forEach(key => (normalized[key] = null));
    }
    else {
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(normalized, raw);
    }
    return (comp.__emits = normalized);
}
// Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.
function isEmitListener(options, key) {
    if (!options || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
        return false;
    }
    key = key.slice(2).replace(/Once$/, '');
    return ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, key[0].toLowerCase() + key.slice(1)) ||
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key)) ||
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, key));
}

/**
 * mark the current rendering instance for asset resolution (e.g.
 * resolveComponent, resolveDirective) during render
 */
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
    currentRenderingInstance = instance;
}
/**
 * dev only flag to track whether $attrs was used during render.
 * If $attrs was used during render then the warning for failed attrs
 * fallthrough can be suppressed.
 */
let accessedAttrs = false;
function markAttrsAccessed() {
    accessedAttrs = true;
}
function renderComponentRoot(instance) {
    const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, data, setupState, ctx } = instance;
    let result;
    currentRenderingInstance = instance;
    if ((true)) {
        accessedAttrs = false;
    }
    try {
        let fallthroughAttrs;
        if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */) {
            // withProxy is a proxy with a different `has` trap only for
            // runtime-compiled render functions using `with` block.
            const proxyToUse = withProxy || proxy;
            result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
            fallthroughAttrs = attrs;
        }
        else {
            // functional
            const render = Component;
            // in dev, mark attrs accessed if optional props (attrs === props)
            if (( true) && attrs === props) {
                markAttrsAccessed();
            }
            result = normalizeVNode(render.length > 1
                ? render(props, ( true)
                    ? {
                        get attrs() {
                            markAttrsAccessed();
                            return attrs;
                        },
                        slots,
                        emit
                    }
                    : 0)
                : render(props, null /* we know it doesn't need it */));
            fallthroughAttrs = Component.props
                ? attrs
                : getFunctionalFallthrough(attrs);
        }
        // attr merging
        // in dev mode, comments are preserved, and it's possible for a template
        // to have comments along side the root element which makes it a fragment
        let root = result;
        let setRoot = undefined;
        if (( true) && result.patchFlag & 2048 /* DEV_ROOT_FRAGMENT */) {
            ;
            [root, setRoot] = getChildRoot(result);
        }
        if (Component.inheritAttrs !== false && fallthroughAttrs) {
            const keys = Object.keys(fallthroughAttrs);
            const { shapeFlag } = root;
            if (keys.length) {
                if (shapeFlag & 1 /* ELEMENT */ ||
                    shapeFlag & 6 /* COMPONENT */) {
                    if (propsOptions && keys.some(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)) {
                        // If a v-model listener (onUpdate:xxx) has a corresponding declared
                        // prop, it indicates this component expects to handle v-model and
                        // it should not fallthrough.
                        // related: #1543, #1643, #1989
                        fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
                    }
                    root = cloneVNode(root, fallthroughAttrs);
                }
                else if (( true) && !accessedAttrs && root.type !== Comment) {
                    const allAttrs = Object.keys(attrs);
                    const eventAttrs = [];
                    const extraAttrs = [];
                    for (let i = 0, l = allAttrs.length; i < l; i++) {
                        const key = allAttrs[i];
                        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
                            // ignore v-model handlers when they fail to fallthrough
                            if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)(key)) {
                                // remove `on`, lowercase first letter to reflect event casing
                                // accurately
                                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
                            }
                        }
                        else {
                            extraAttrs.push(key);
                        }
                    }
                    if (extraAttrs.length) {
                        warn(`Extraneous non-props attributes (` +
                            `${extraAttrs.join(', ')}) ` +
                            `were passed to component but could not be automatically inherited ` +
                            `because component renders fragment or text root nodes.`);
                    }
                    if (eventAttrs.length) {
                        warn(`Extraneous non-emits event listeners (` +
                            `${eventAttrs.join(', ')}) ` +
                            `were passed to component but could not be automatically inherited ` +
                            `because component renders fragment or text root nodes. ` +
                            `If the listener is intended to be a component custom event listener only, ` +
                            `declare it using the "emits" option.`);
                    }
                }
            }
        }
        // inherit directives
        if (vnode.dirs) {
            if (( true) && !isElementRoot(root)) {
                warn(`Runtime directive used on component with non-element root node. ` +
                    `The directives will not function as intended.`);
            }
            root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
        }
        // inherit transition data
        if (vnode.transition) {
            if (( true) && !isElementRoot(root)) {
                warn(`Component inside <Transition> renders non-element root node ` +
                    `that cannot be animated.`);
            }
            root.transition = vnode.transition;
        }
        if (( true) && setRoot) {
            setRoot(root);
        }
        else {
            result = root;
        }
    }
    catch (err) {
        handleError(err, instance, 1 /* RENDER_FUNCTION */);
        result = createVNode(Comment);
    }
    currentRenderingInstance = null;
    return result;
}
/**
 * dev only
 * In dev mode, template root level comments are rendered, which turns the
 * template into a fragment root, but we need to locate the single element
 * root for attrs and scope id processing.
 */
const getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
        return [vnode, undefined];
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
        rawChildren[index] = updatedRoot;
        if (dynamicChildren) {
            if (dynamicIndex > -1) {
                dynamicChildren[dynamicIndex] = updatedRoot;
            }
            else if (updatedRoot.patchFlag > 0) {
                vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
            }
        }
    };
    return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
    let singleRoot;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isVNode(child)) {
            // ignore user comment
            if (child.type !== Comment || child.children === 'v-if') {
                if (singleRoot) {
                    // has more than 1 non-comment child, return now
                    return;
                }
                else {
                    singleRoot = child;
                }
            }
        }
        else {
            return;
        }
    }
    return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
        if (key === 'class' || key === 'style' || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
            (res || (res = {}))[key] = attrs[key];
        }
    }
    return res;
};
const filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
        if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)(key) || !(key.slice(9) in props)) {
            res[key] = attrs[key];
        }
    }
    return res;
};
const isElementRoot = (vnode) => {
    return (vnode.shapeFlag & 6 /* COMPONENT */ ||
        vnode.shapeFlag & 1 /* ELEMENT */ ||
        vnode.type === Comment // potential v-if branch switch
    );
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    // Parent component's render function was hot-updated. Since this may have
    // caused the child component's slots content to have changed, we need to
    // force the child to update as well.
    if (( true) && (prevChildren || nextChildren) && isHmrUpdating) {
        return true;
    }
    // force child update for runtime directive or transition on component vnode.
    if (nextVNode.dirs || nextVNode.transition) {
        return true;
    }
    if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024 /* DYNAMIC_SLOTS */) {
            // slot content that references values that might have changed,
            // e.g. in a v-for
            return true;
        }
        if (patchFlag & 16 /* FULL_PROPS */) {
            if (!prevProps) {
                return !!nextProps;
            }
            // presence of this flag indicates props are always non-null
            return hasPropsChanged(prevProps, nextProps, emits);
        }
        else if (patchFlag & 8 /* PROPS */) {
            const dynamicProps = nextVNode.dynamicProps;
            for (let i = 0; i < dynamicProps.length; i++) {
                const key = dynamicProps[i];
                if (nextProps[key] !== prevProps[key] &&
                    !isEmitListener(emits, key)) {
                    return true;
                }
            }
        }
    }
    else {
        // this path is only taken by manually written render functions
        // so presence of any children leads to a forced update
        if (prevChildren || nextChildren) {
            if (!nextChildren || !nextChildren.$stable) {
                return true;
            }
        }
        if (prevProps === nextProps) {
            return false;
        }
        if (!prevProps) {
            return !!nextProps;
        }
        if (!nextProps) {
            return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
    }
    for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] &&
            !isEmitListener(emitsOptions, key)) {
            return true;
        }
    }
    return false;
}
function updateHOCHostEl({ vnode, parent }, el // HostNode
) {
    while (parent && parent.subTree === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
    }
}

const isSuspense = (type) => type.__isSuspense;
// Suspense exposes a component-like API, and is treated like a component
// in the compiler, but internally it's a special built-in type that hooks
// directly into the renderer.
const SuspenseImpl = {
    // In order to make Suspense tree-shakable, we need to avoid importing it
    // directly in the renderer. The renderer checks for the __isSuspense flag
    // on a vnode's type and calls the `process` method, passing in renderer
    // internals.
    __isSuspense: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, 
    // platform-specific impl passed from renderer
    rendererInternals) {
        if (n1 == null) {
            mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals);
        }
        else {
            patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, rendererInternals);
        }
    },
    hydrate: hydrateSuspense,
    create: createSuspenseBoundary
};
// Force-casted public typing for h and TSX props inference
const Suspense = ( SuspenseImpl
    );
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals) {
    const { p: patch, o: { createElement } } = rendererInternals;
    const hiddenContainer = createElement('div');
    const suspense = (vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals));
    // start mounting the content subtree in an off-dom container
    patch(null, (suspense.pendingBranch = vnode.ssContent), hiddenContainer, null, parentComponent, suspense, isSVG);
    // now check if we have encountered any async deps
    if (suspense.deps > 0) {
        // has async
        // mount the fallback tree
        patch(null, vnode.ssFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
        isSVG);
        setActiveBranch(suspense, vnode.ssFallback);
    }
    else {
        // Suspense has no async deps. Just resolve.
        suspense.resolve();
    }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, { p: patch, um: unmount, o: { createElement } }) {
    const suspense = (n2.suspense = n1.suspense);
    suspense.vnode = n2;
    n2.el = n1.el;
    const newBranch = n2.ssContent;
    const newFallback = n2.ssFallback;
    const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
    if (pendingBranch) {
        suspense.pendingBranch = newBranch;
        if (isSameVNodeType(newBranch, pendingBranch)) {
            // same root type but content may have changed.
            patch(pendingBranch, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG);
            if (suspense.deps <= 0) {
                suspense.resolve();
            }
            else if (isInFallback) {
                patch(activeBranch, newFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
                isSVG);
                setActiveBranch(suspense, newFallback);
            }
        }
        else {
            // toggled before pending tree is resolved
            suspense.pendingId++;
            if (isHydrating) {
                // if toggled before hydration is finished, the current DOM tree is
                // no longer valid. set it as the active branch so it will be unmounted
                // when resolved
                suspense.isHydrating = false;
                suspense.activeBranch = pendingBranch;
            }
            else {
                unmount(pendingBranch, parentComponent, suspense);
            }
            // increment pending ID. this is used to invalidate async callbacks
            // reset suspense state
            suspense.deps = 0;
            // discard effects from pending branch
            suspense.effects.length = 0;
            // discard previous container
            suspense.hiddenContainer = createElement('div');
            if (isInFallback) {
                // already in fallback state
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG);
                if (suspense.deps <= 0) {
                    suspense.resolve();
                }
                else {
                    patch(activeBranch, newFallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
                    isSVG);
                    setActiveBranch(suspense, newFallback);
                }
            }
            else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
                // toggled "back" to current active branch
                patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG);
                // force resolve
                suspense.resolve(true);
            }
            else {
                // switched to a 3rd branch
                patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG);
                if (suspense.deps <= 0) {
                    suspense.resolve();
                }
            }
        }
    }
    else {
        if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
            // root did not change, just normal patch
            patch(activeBranch, newBranch, container, anchor, parentComponent, suspense, isSVG);
            setActiveBranch(suspense, newBranch);
        }
        else {
            // root node toggled
            // invoke @pending event
            const onPending = n2.props && n2.props.onPending;
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(onPending)) {
                onPending();
            }
            // mount pending branch in off-dom container
            suspense.pendingBranch = newBranch;
            suspense.pendingId++;
            patch(null, newBranch, suspense.hiddenContainer, null, parentComponent, suspense, isSVG);
            if (suspense.deps <= 0) {
                // incoming branch has no async deps, resolve now.
                suspense.resolve();
            }
            else {
                const { timeout, pendingId } = suspense;
                if (timeout > 0) {
                    setTimeout(() => {
                        if (suspense.pendingId === pendingId) {
                            suspense.fallback(newFallback);
                        }
                    }, timeout);
                }
                else if (timeout === 0) {
                    suspense.fallback(newFallback);
                }
            }
        }
    }
}
let hasWarned = false;
function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals, isHydrating = false) {
    /* istanbul ignore if */
    if ( true && !hasWarned) {
        hasWarned = true;
        // @ts-ignore `console.info` cannot be null error
        console[console.info ? 'info' : 'log'](`<Suspense> is an experimental feature and its API will likely change.`);
    }
    const { p: patch, m: move, um: unmount, n: next, o: { parentNode, remove } } = rendererInternals;
    const timeout = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(vnode.props && vnode.props.timeout);
    const suspense = {
        vnode,
        parent,
        parentComponent,
        isSVG,
        container,
        hiddenContainer,
        anchor,
        deps: 0,
        pendingId: 0,
        timeout: typeof timeout === 'number' ? timeout : -1,
        activeBranch: null,
        pendingBranch: null,
        isInFallback: true,
        isHydrating,
        isUnmounted: false,
        effects: [],
        resolve(resume = false) {
            if ((true)) {
                if (!resume && !suspense.pendingBranch) {
                    throw new Error(`suspense.resolve() is called without a pending branch.`);
                }
                if (suspense.isUnmounted) {
                    throw new Error(`suspense.resolve() is called on an already unmounted suspense boundary.`);
                }
            }
            const { vnode, activeBranch, pendingBranch, pendingId, effects, parentComponent, container } = suspense;
            if (suspense.isHydrating) {
                suspense.isHydrating = false;
            }
            else if (!resume) {
                const delayEnter = activeBranch &&
                    pendingBranch.transition &&
                    pendingBranch.transition.mode === 'out-in';
                if (delayEnter) {
                    activeBranch.transition.afterLeave = () => {
                        if (pendingId === suspense.pendingId) {
                            move(pendingBranch, container, anchor, 0 /* ENTER */);
                        }
                    };
                }
                // this is initial anchor on mount
                let { anchor } = suspense;
                // unmount current active tree
                if (activeBranch) {
                    // if the fallback tree was mounted, it may have been moved
                    // as part of a parent suspense. get the latest anchor for insertion
                    anchor = next(activeBranch);
                    unmount(activeBranch, parentComponent, suspense, true);
                }
                if (!delayEnter) {
                    // move content from off-dom container to actual container
                    move(pendingBranch, container, anchor, 0 /* ENTER */);
                }
            }
            setActiveBranch(suspense, pendingBranch);
            suspense.pendingBranch = null;
            suspense.isInFallback = false;
            // flush buffered effects
            // check if there is a pending parent suspense
            let parent = suspense.parent;
            let hasUnresolvedAncestor = false;
            while (parent) {
                if (parent.pendingBranch) {
                    // found a pending parent suspense, merge buffered post jobs
                    // into that parent
                    parent.effects.push(...effects);
                    hasUnresolvedAncestor = true;
                    break;
                }
                parent = parent.parent;
            }
            // no pending parent suspense, flush all jobs
            if (!hasUnresolvedAncestor) {
                queuePostFlushCb(effects);
            }
            suspense.effects = [];
            // invoke @resolve event
            const onResolve = vnode.props && vnode.props.onResolve;
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(onResolve)) {
                onResolve();
            }
        },
        fallback(fallbackVNode) {
            if (!suspense.pendingBranch) {
                return;
            }
            const { vnode, activeBranch, parentComponent, container, isSVG } = suspense;
            // invoke @fallback event
            const onFallback = vnode.props && vnode.props.onFallback;
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(onFallback)) {
                onFallback();
            }
            const anchor = next(activeBranch);
            const mountFallback = () => {
                if (!suspense.isInFallback) {
                    return;
                }
                // mount the fallback tree
                patch(null, fallbackVNode, container, anchor, parentComponent, null, // fallback tree will not have suspense context
                isSVG);
                setActiveBranch(suspense, fallbackVNode);
            };
            const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === 'out-in';
            if (delayEnter) {
                activeBranch.transition.afterLeave = mountFallback;
            }
            // unmount current active branch
            unmount(activeBranch, parentComponent, null, // no suspense so unmount hooks fire now
            true // shouldRemove
            );
            suspense.isInFallback = true;
            if (!delayEnter) {
                mountFallback();
            }
        },
        move(container, anchor, type) {
            suspense.activeBranch &&
                move(suspense.activeBranch, container, anchor, type);
            suspense.container = container;
        },
        next() {
            return suspense.activeBranch && next(suspense.activeBranch);
        },
        registerDep(instance, setupRenderEffect) {
            const isInPendingSuspense = !!suspense.pendingBranch;
            if (isInPendingSuspense) {
                suspense.deps++;
            }
            const hydratedEl = instance.vnode.el;
            instance
                .asyncDep.catch(err => {
                handleError(err, instance, 0 /* SETUP_FUNCTION */);
            })
                .then(asyncSetupResult => {
                // retry when the setup() promise resolves.
                // component may have been unmounted before resolve.
                if (instance.isUnmounted ||
                    suspense.isUnmounted ||
                    suspense.pendingId !== instance.suspenseId) {
                    return;
                }
                // retry from this component
                instance.asyncResolved = true;
                const { vnode } = instance;
                if ((true)) {
                    pushWarningContext(vnode);
                }
                handleSetupResult(instance, asyncSetupResult);
                if (hydratedEl) {
                    // vnode may have been replaced if an update happened before the
                    // async dep is resolved.
                    vnode.el = hydratedEl;
                }
                const placeholder = !hydratedEl && instance.subTree.el;
                setupRenderEffect(instance, vnode, 
                // component may have been moved before resolve.
                // if this is not a hydration, instance.subTree will be the comment
                // placeholder.
                parentNode(hydratedEl || instance.subTree.el), 
                // anchor will not be used if this is hydration, so only need to
                // consider the comment placeholder case.
                hydratedEl ? null : next(instance.subTree), suspense, isSVG, optimized);
                if (placeholder) {
                    remove(placeholder);
                }
                updateHOCHostEl(instance, vnode.el);
                if ((true)) {
                    popWarningContext();
                }
                // only decrease deps count if suspense is not already resolved
                if (isInPendingSuspense && --suspense.deps === 0) {
                    suspense.resolve();
                }
            });
        },
        unmount(parentSuspense, doRemove) {
            suspense.isUnmounted = true;
            if (suspense.activeBranch) {
                unmount(suspense.activeBranch, parentComponent, parentSuspense, doRemove);
            }
            if (suspense.pendingBranch) {
                unmount(suspense.pendingBranch, parentComponent, parentSuspense, doRemove);
            }
        }
    };
    return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, optimized, rendererInternals, hydrateNode) {
    /* eslint-disable no-restricted-globals */
    const suspense = (vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement('div'), null, isSVG, optimized, rendererInternals, true /* hydrating */));
    // there are two possible scenarios for server-rendered suspense:
    // - success: ssr content should be fully resolved
    // - failure: ssr content should be the fallback branch.
    // however, on the client we don't really know if it has failed or not
    // attempt to hydrate the DOM assuming it has succeeded, but we still
    // need to construct a suspense boundary first
    const result = hydrateNode(node, (suspense.pendingBranch = vnode.ssContent), parentComponent, suspense, optimized);
    if (suspense.deps === 0) {
        suspense.resolve();
    }
    return result;
    /* eslint-enable no-restricted-globals */
}
function normalizeSuspenseChildren(vnode) {
    const { shapeFlag, children } = vnode;
    let content;
    let fallback;
    if (shapeFlag & 32 /* SLOTS_CHILDREN */) {
        content = normalizeSuspenseSlot(children.default);
        fallback = normalizeSuspenseSlot(children.fallback);
    }
    else {
        content = normalizeSuspenseSlot(children);
        fallback = normalizeVNode(null);
    }
    return {
        content,
        fallback
    };
}
function normalizeSuspenseSlot(s) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(s)) {
        s = s();
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(s)) {
        const singleChild = filterSingleRoot(s);
        if (( true) && !singleChild) {
            warn(`<Suspense> slots expect a single root node.`);
        }
        s = singleChild;
    }
    return normalizeVNode(s);
}
function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(fn)) {
            suspense.effects.push(...fn);
        }
        else {
            suspense.effects.push(fn);
        }
    }
    else {
        queuePostFlushCb(fn);
    }
}
function setActiveBranch(suspense, branch) {
    suspense.activeBranch = branch;
    const { vnode, parentComponent } = suspense;
    const el = (vnode.el = branch.el);
    // in case suspense is the root node of a component,
    // recursively update the HOC el
    if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
    }
}

let isRenderingCompiledSlot = 0;
const setCompiledSlotRendering = (n) => (isRenderingCompiledSlot += n);
/**
 * Compiler runtime helper for rendering `<slot/>`
 * @private
 */
function renderSlot(slots, name, props = {}, 
// this is not a user-facing function, so the fallback is always generated by
// the compiler and guaranteed to be a function returning an array
fallback) {
    let slot = slots[name];
    if (( true) && slot && slot.length > 1) {
        warn(`SSR-optimized slot function detected in a non-SSR-optimized render ` +
            `function. You need to mark this component with $dynamic-slots in the ` +
            `parent template.`);
        slot = () => [];
    }
    // a compiled slot disables block tracking by default to avoid manual
    // invocation interfering with template-based block tracking, but in
    // `renderSlot` we can be sure that it's template-based so we can force
    // enable it.
    isRenderingCompiledSlot++;
    openBlock();
    const validSlotContent = slot && ensureValidVNode(slot(props));
    const rendered = createBlock(Fragment, { key: props.key || `_${name}` }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 /* STABLE */
        ? 64 /* STABLE_FRAGMENT */
        : -2 /* BAIL */);
    isRenderingCompiledSlot--;
    return rendered;
}
function ensureValidVNode(vnodes) {
    return vnodes.some(child => {
        if (!isVNode(child))
            return true;
        if (child.type === Comment)
            return false;
        if (child.type === Fragment &&
            !ensureValidVNode(child.children))
            return false;
        return true;
    })
        ? vnodes
        : null;
}

/**
 * Wrap a slot function to memoize current rendering instance
 * @private
 */
function withCtx(fn, ctx = currentRenderingInstance) {
    if (!ctx)
        return fn;
    const renderFnWithContext = (...args) => {
        // If a user calls a compiled slot inside a template expression (#1745), it
        // can mess up block tracking, so by default we need to push a null block to
        // avoid that. This isn't necessary if rendering a compiled `<slot>`.
        if (!isRenderingCompiledSlot) {
            openBlock(true /* null block that disables tracking */);
        }
        const owner = currentRenderingInstance;
        setCurrentRenderingInstance(ctx);
        const res = fn(...args);
        setCurrentRenderingInstance(owner);
        if (!isRenderingCompiledSlot) {
            closeBlock();
        }
        return res;
    };
    renderFnWithContext._c = true;
    return renderFnWithContext;
}

// SFC scoped style ID management.
let currentScopeId = null;
const scopeIdStack = [];
/**
 * @private
 */
function pushScopeId(id) {
    scopeIdStack.push((currentScopeId = id));
}
/**
 * @private
 */
function popScopeId() {
    scopeIdStack.pop();
    currentScopeId = scopeIdStack[scopeIdStack.length - 1] || null;
}
/**
 * @private
 */
function withScopeId(id) {
    return ((fn) => withCtx(function () {
        pushScopeId(id);
        const res = fn.apply(this, arguments);
        popScopeId();
        return res;
    }));
}

function initProps(instance, rawProps, isStateful, // result of bitwise flag comparison
isSSR = false) {
    const props = {};
    const attrs = {};
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.def)(attrs, InternalObjectKey, 1);
    setFullProps(instance, rawProps, props, attrs);
    // validation
    if ((true)) {
        validateProps(props, instance);
    }
    if (isStateful) {
        // stateful
        instance.props = isSSR ? props : (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReactive)(props);
    }
    else {
        if (!instance.type.props) {
            // functional w/ optional props, props === attrs
            instance.props = attrs;
        }
        else {
            // functional w/ declared props
            instance.props = props;
        }
    }
    instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const { props, attrs, vnode: { patchFlag } } = instance;
    const rawCurrentProps = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
    const [options] = instance.propsOptions;
    if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(( true) &&
        (instance.type.__hmrId ||
            (instance.parent && instance.parent.type.__hmrId))) &&
        (optimized || patchFlag > 0) &&
        !(patchFlag & 16 /* FULL_PROPS */)) {
        if (patchFlag & 8 /* PROPS */) {
            // Compiler-generated props & no keys change, just set the updated
            // the props.
            const propsToUpdate = instance.vnode.dynamicProps;
            for (let i = 0; i < propsToUpdate.length; i++) {
                const key = propsToUpdate[i];
                // PROPS flag guarantees rawProps to be non-null
                const value = rawProps[key];
                if (options) {
                    // attr / props separation was done on init and will be consistent
                    // in this code path, so just check if attrs have it.
                    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(attrs, key)) {
                        attrs[key] = value;
                    }
                    else {
                        const camelizedKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key);
                        props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance);
                    }
                }
                else {
                    attrs[key] = value;
                }
            }
        }
    }
    else {
        // full props update.
        setFullProps(instance, rawProps, props, attrs);
        // in case of dynamic props, check if we need to delete keys from
        // the props object
        let kebabKey;
        for (const key in rawCurrentProps) {
            if (!rawProps ||
                // for camelCase
                (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, key) &&
                    // it's possible the original props was passed in as kebab-case
                    // and converted to camelCase (#955)
                    ((kebabKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key)) === key || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, kebabKey)))) {
                if (options) {
                    if (rawPrevProps &&
                        // for camelCase
                        (rawPrevProps[key] !== undefined ||
                            // for kebab-case
                            rawPrevProps[kebabKey] !== undefined)) {
                        props[key] = resolvePropValue(options, rawProps || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ, key, undefined, instance);
                    }
                }
                else {
                    delete props[key];
                }
            }
        }
        // in the case of functional component w/o props declaration, props and
        // attrs point to the same object so it should already have been updated.
        if (attrs !== rawCurrentProps) {
            for (const key in attrs) {
                if (!rawProps || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, key)) {
                    delete attrs[key];
                }
            }
        }
    }
    // trigger updates for $attrs in case it's used in component slots
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.trigger)(instance, "set" /* SET */, '$attrs');
    if (( true) && rawProps) {
        validateProps(props, instance);
    }
}
function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    if (rawProps) {
        for (const key in rawProps) {
            const value = rawProps[key];
            // key, ref are reserved and never passed down
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key)) {
                continue;
            }
            // prop option names are camelized during normalization, so to support
            // kebab -> camel conversion here we need to camelize the key.
            let camelKey;
            if (options && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, (camelKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key)))) {
                props[camelKey] = value;
            }
            else if (!isEmitListener(instance.emitsOptions, key)) {
                // Any non-declared (either as a prop or an emitted event) props are put
                // into a separate `attrs` object for spreading. Make sure to preserve
                // original key casing
                attrs[key] = value;
            }
        }
    }
    if (needCastKeys) {
        const rawCurrentProps = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
        for (let i = 0; i < needCastKeys.length; i++) {
            const key = needCastKeys[i];
            props[key] = resolvePropValue(options, rawCurrentProps, key, rawCurrentProps[key], instance);
        }
    }
}
function resolvePropValue(options, props, key, value, instance) {
    const opt = options[key];
    if (opt != null) {
        const hasDefault = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(opt, 'default');
        // default values
        if (hasDefault && value === undefined) {
            const defaultValue = opt.default;
            if (opt.type !== Function && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(defaultValue)) {
                setCurrentInstance(instance);
                value = defaultValue(props);
                setCurrentInstance(null);
            }
            else {
                value = defaultValue;
            }
        }
        // boolean casting
        if (opt[0 /* shouldCast */]) {
            if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(props, key) && !hasDefault) {
                value = false;
            }
            else if (opt[1 /* shouldCastTrue */] &&
                (value === '' || value === (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key))) {
                value = true;
            }
        }
    }
    return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
    if (!appContext.deopt && comp.__props) {
        return comp.__props;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    // apply mixin/extends props
    let hasExtends = false;
    if (__VUE_OPTIONS_API__ && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(comp)) {
        const extendProps = (raw) => {
            hasExtends = true;
            const [props, keys] = normalizePropsOptions(raw, appContext, true);
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(normalized, props);
            if (keys)
                needCastKeys.push(...keys);
        };
        if (!asMixin && appContext.mixins.length) {
            appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
            extendProps(comp.extends);
        }
        if (comp.mixins) {
            comp.mixins.forEach(extendProps);
        }
    }
    if (!raw && !hasExtends) {
        return (comp.__props = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR);
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
        for (let i = 0; i < raw.length; i++) {
            if (( true) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(raw[i])) {
                warn(`props must be strings when using array syntax.`, raw[i]);
            }
            const normalizedKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(raw[i]);
            if (validatePropName(normalizedKey)) {
                normalized[normalizedKey] = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
            }
        }
    }
    else if (raw) {
        if (( true) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(raw)) {
            warn(`invalid props options`, raw);
        }
        for (const key in raw) {
            const normalizedKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key);
            if (validatePropName(normalizedKey)) {
                const opt = raw[key];
                const prop = (normalized[normalizedKey] =
                    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(opt) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt) ? { type: opt } : opt);
                if (prop) {
                    const booleanIndex = getTypeIndex(Boolean, prop.type);
                    const stringIndex = getTypeIndex(String, prop.type);
                    prop[0 /* shouldCast */] = booleanIndex > -1;
                    prop[1 /* shouldCastTrue */] =
                        stringIndex < 0 || booleanIndex < stringIndex;
                    // if the prop needs boolean casting or default value
                    if (booleanIndex > -1 || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(prop, 'default')) {
                        needCastKeys.push(normalizedKey);
                    }
                }
            }
        }
    }
    return (comp.__props = [normalized, needCastKeys]);
}
function validatePropName(key) {
    if (key[0] !== '$') {
        return true;
    }
    else if ((true)) {
        warn(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
}
// use function string name to check type constructors
// so that it works across vms / iframes.
function getType(ctor) {
    const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
}
function isSameType(a, b) {
    return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(expectedTypes)) {
        for (let i = 0, len = expectedTypes.length; i < len; i++) {
            if (isSameType(expectedTypes[i], type)) {
                return i;
            }
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
}
/**
 * dev only
 */
function validateProps(props, instance) {
    const rawValues = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
    const options = instance.propsOptions[0];
    for (const key in options) {
        let opt = options[key];
        if (opt == null)
            continue;
        validateProp(key, rawValues[key], opt, !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawValues, key));
    }
}
/**
 * dev only
 */
function validateProp(name, value, prop, isAbsent) {
    const { type, required, validator } = prop;
    // required!
    if (required && isAbsent) {
        warn('Missing required prop: "' + name + '"');
        return;
    }
    // missing but optional
    if (value == null && !prop.required) {
        return;
    }
    // type check
    if (type != null && type !== true) {
        let isValid = false;
        const types = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(type) ? type : [type];
        const expectedTypes = [];
        // value is valid as long as one of the specified types match
        for (let i = 0; i < types.length && !isValid; i++) {
            const { valid, expectedType } = assertType(value, types[i]);
            expectedTypes.push(expectedType || '');
            isValid = valid;
        }
        if (!isValid) {
            warn(getInvalidTypeMessage(name, value, expectedTypes));
            return;
        }
    }
    // custom validator
    if (validator && !validator(value)) {
        warn('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
}
const isSimpleType = /*#__PURE__*/ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.makeMap)('String,Number,Boolean,Function,Symbol');
/**
 * dev only
 */
function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (isSimpleType(expectedType)) {
        const t = typeof value;
        valid = t === expectedType.toLowerCase();
        // for primitive wrapper objects
        if (!valid && t === 'object') {
            valid = value instanceof type;
        }
    }
    else if (expectedType === 'Object') {
        valid = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(value);
    }
    else if (expectedType === 'Array') {
        valid = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value);
    }
    else {
        valid = value instanceof type;
    }
    return {
        valid,
        expectedType
    };
}
/**
 * dev only
 */
function getInvalidTypeMessage(name, value, expectedTypes) {
    let message = `Invalid prop: type check failed for prop "${name}".` +
        ` Expected ${expectedTypes.map(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize).join(', ')}`;
    const expectedType = expectedTypes[0];
    const receivedType = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toRawType)(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        !isBoolean(expectedType, receivedType)) {
        message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
        message += `with value ${receivedValue}.`;
    }
    return message;
}
/**
 * dev only
 */
function styleValue(value, type) {
    if (type === 'String') {
        return `"${value}"`;
    }
    else if (type === 'Number') {
        return `${Number(value)}`;
    }
    else {
        return `${value}`;
    }
}
/**
 * dev only
 */
function isExplicable(type) {
    const explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some(elem => type.toLowerCase() === elem);
}
/**
 * dev only
 */
function isBoolean(...args) {
    return args.some(elem => elem.toLowerCase() === 'boolean');
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
        const hooks = target[type] || (target[type] = []);
        // cache the error handling wrapper for injected hooks so the same hook
        // can be properly deduped by the scheduler. "__weh" stands for "with error
        // handling".
        const wrappedHook = hook.__weh ||
            (hook.__weh = (...args) => {
                if (target.isUnmounted) {
                    return;
                }
                // disable tracking inside all lifecycle hooks
                // since they can potentially be called inside effects.
                (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
                // Set currentInstance during hook invocation.
                // This assumes the hook does not synchronously trigger other hooks, which
                // can only be false when the user does something really funky.
                setCurrentInstance(target);
                const res = callWithAsyncErrorHandling(hook, target, type, args);
                setCurrentInstance(null);
                (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
                return res;
            });
        if (prepend) {
            hooks.unshift(wrappedHook);
        }
        else {
            hooks.push(wrappedHook);
        }
        return wrappedHook;
    }
    else if ((true)) {
        const apiName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(ErrorTypeStrings[type].replace(/ hook$/, ''));
        warn(`${apiName} is called when there is no active component instance to be ` +
            `associated with. ` +
            `Lifecycle injection APIs can only be used during execution of setup().` +
            ( ` If you are using async setup(), make sure to register lifecycle ` +
                    `hooks before the first await statement.`
                ));
    }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => 
// post-create lifecycle registrations are noops during SSR
!isInSSRComponentSetup && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm" /* BEFORE_MOUNT */);
const onMounted = createHook("m" /* MOUNTED */);
const onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */);
const onUpdated = createHook("u" /* UPDATED */);
const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
const onUnmounted = createHook("um" /* UNMOUNTED */);
const onRenderTriggered = createHook("rtg" /* RENDER_TRIGGERED */);
const onRenderTracked = createHook("rtc" /* RENDER_TRACKED */);
const onErrorCaptured = (hook, target = currentInstance) => {
    injectHook("ec" /* ERROR_CAPTURED */, hook, target);
};

// Simple effect.
function watchEffect(effect, options) {
    return doWatch(effect, null, options);
}
// initial value for watchers to trigger on undefined initial values
const INITIAL_WATCHER_VALUE = {};
// implementation
function watch(source, cb, options) {
    if (( true) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(cb)) {
        warn(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
            `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
            `supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ, instance = currentInstance) {
    if (( true) && !cb) {
        if (immediate !== undefined) {
            warn(`watch() "immediate" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
        if (deep !== undefined) {
            warn(`watch() "deep" option is only respected when using the ` +
                `watch(source, callback, options?) signature.`);
        }
    }
    const warnInvalidSource = (s) => {
        warn(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` +
            `a reactive object, or an array of these types.`);
    };
    let getter;
    let forceTrigger = false;
    if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(source)) {
        getter = () => source.value;
        forceTrigger = !!source._shallow;
    }
    else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(source)) {
        getter = () => source;
        deep = true;
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(source)) {
        getter = () => source.map(s => {
            if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(s)) {
                return s.value;
            }
            else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(s)) {
                return traverse(s);
            }
            else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(s)) {
                return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
            }
            else {
                ( true) && warnInvalidSource(s);
            }
        });
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(source)) {
        if (cb) {
            // getter with cb
            getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
        }
        else {
            // no cb -> simple effect
            getter = () => {
                if (instance && instance.isUnmounted) {
                    return;
                }
                if (cleanup) {
                    cleanup();
                }
                return callWithErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
            };
        }
    }
    else {
        getter = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
        ( true) && warnInvalidSource(source);
    }
    if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
    }
    let cleanup;
    const onInvalidate = (fn) => {
        cleanup = runner.options.onStop = () => {
            callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
        };
    };
    let oldValue = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(source) ? [] : INITIAL_WATCHER_VALUE;
    const job = () => {
        if (!runner.active) {
            return;
        }
        if (cb) {
            // watch(source, cb)
            const newValue = runner();
            if (deep || forceTrigger || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasChanged)(newValue, oldValue)) {
                // cleanup before running cb again
                if (cleanup) {
                    cleanup();
                }
                callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                    newValue,
                    // pass undefined as the old value when it's changed for the first time
                    oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                    onInvalidate
                ]);
                oldValue = newValue;
            }
        }
        else {
            // watchEffect
            runner();
        }
    };
    // important: mark the job as a watcher callback so that scheduler knows
    // it is allowed to self-trigger (#1727)
    job.allowRecurse = !!cb;
    let scheduler;
    if (flush === 'sync') {
        scheduler = job;
    }
    else if (flush === 'post') {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
    }
    else {
        // default: 'pre'
        scheduler = () => {
            if (!instance || instance.isMounted) {
                queuePreFlushCb(job);
            }
            else {
                // with 'pre' option, the first call must happen before
                // the component is mounted so it is called synchronously.
                job();
            }
        };
    }
    const runner = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.effect)(getter, {
        lazy: true,
        onTrack,
        onTrigger,
        scheduler
    });
    recordInstanceBoundEffect(runner, instance);
    // initial run
    if (cb) {
        if (immediate) {
            job();
        }
        else {
            oldValue = runner();
        }
    }
    else if (flush === 'post') {
        queuePostRenderEffect(runner, instance && instance.suspense);
    }
    else {
        runner();
    }
    return () => {
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.stop)(runner);
        if (instance) {
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.remove)(instance.effects, runner);
        }
    };
}
// this.$watch
function instanceWatch(source, cb, options) {
    const publicThis = this.proxy;
    const getter = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(source)
        ? () => publicThis[source]
        : source.bind(publicThis);
    return doWatch(getter, cb.bind(publicThis), options, this);
}
function traverse(value, seen = new Set()) {
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(value) || seen.has(value)) {
        return value;
    }
    seen.add(value);
    if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(value)) {
        traverse(value.value, seen);
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
        for (let i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isMap)(value)) {
        value.forEach((v) => {
            traverse(v, seen);
        });
    }
    else {
        for (const key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}

function useTransitionState() {
    const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: new Map()
    };
    onMounted(() => {
        state.isMounted = true;
    });
    onBeforeUnmount(() => {
        state.isUnmounting = true;
    });
    return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionImpl = {
    name: `BaseTransition`,
    props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        // enter
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        // leave
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        // appear
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator
    },
    setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevTransitionKey;
        return () => {
            const children = slots.default && getTransitionRawChildren(slots.default(), true);
            if (!children || !children.length) {
                return;
            }
            // warn multiple elements
            if (( true) && children.length > 1) {
                warn('<transition> can only be used on a single element or component. Use ' +
                    '<transition-group> for lists.');
            }
            // there's no need to track reactivity for these props so use the raw
            // props for a bit better perf
            const rawProps = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
            const { mode } = rawProps;
            // check mode
            if (( true) && mode && !['in-out', 'out-in', 'default'].includes(mode)) {
                warn(`invalid <transition> mode: ${mode}`);
            }
            // at this point children has a guaranteed length of 1.
            const child = children[0];
            if (state.isLeaving) {
                return emptyPlaceholder(child);
            }
            // in the case of <transition><keep-alive/></transition>, we need to
            // compare the type of the kept-alive children.
            const innerChild = getKeepAliveChild(child);
            if (!innerChild) {
                return emptyPlaceholder(child);
            }
            const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
            setTransitionHooks(innerChild, enterHooks);
            const oldChild = instance.subTree;
            const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
            let transitionKeyChanged = false;
            const { getTransitionKey } = innerChild.type;
            if (getTransitionKey) {
                const key = getTransitionKey();
                if (prevTransitionKey === undefined) {
                    prevTransitionKey = key;
                }
                else if (key !== prevTransitionKey) {
                    prevTransitionKey = key;
                    transitionKeyChanged = true;
                }
            }
            // handle mode
            if (oldInnerChild &&
                oldInnerChild.type !== Comment &&
                (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
                const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
                // update old tree's hooks in case of dynamic transition
                setTransitionHooks(oldInnerChild, leavingHooks);
                // switching between different views
                if (mode === 'out-in') {
                    state.isLeaving = true;
                    // return placeholder node and queue update when leave finishes
                    leavingHooks.afterLeave = () => {
                        state.isLeaving = false;
                        instance.update();
                    };
                    return emptyPlaceholder(child);
                }
                else if (mode === 'in-out') {
                    leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                        const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                        leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                        // early removal callback
                        el._leaveCb = () => {
                            earlyRemove();
                            el._leaveCb = undefined;
                            delete enterHooks.delayedLeave;
                        };
                        enterHooks.delayedLeave = delayedLeave;
                    };
                }
            }
            return child;
        };
    }
};
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
    const { leavingVNodes } = state;
    let leavingVNodesCache = leavingVNodes.get(vnode.type);
    if (!leavingVNodesCache) {
        leavingVNodesCache = Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
    }
    return leavingVNodesCache;
}
// The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.
function resolveTransitionHooks(vnode, props, state, instance) {
    const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
    const key = String(vnode.key);
    const leavingVNodesCache = getLeavingNodesForType(state, vnode);
    const callHook = (hook, args) => {
        hook &&
            callWithAsyncErrorHandling(hook, instance, 9 /* TRANSITION_HOOK */, args);
    };
    const hooks = {
        mode,
        persisted,
        beforeEnter(el) {
            let hook = onBeforeEnter;
            if (!state.isMounted) {
                if (appear) {
                    hook = onBeforeAppear || onBeforeEnter;
                }
                else {
                    return;
                }
            }
            // for same element (v-show)
            if (el._leaveCb) {
                el._leaveCb(true /* cancelled */);
            }
            // for toggled element with same key (v-if)
            const leavingVNode = leavingVNodesCache[key];
            if (leavingVNode &&
                isSameVNodeType(vnode, leavingVNode) &&
                leavingVNode.el._leaveCb) {
                // force early removal (not cancelled)
                leavingVNode.el._leaveCb();
            }
            callHook(hook, [el]);
        },
        enter(el) {
            let hook = onEnter;
            let afterHook = onAfterEnter;
            let cancelHook = onEnterCancelled;
            if (!state.isMounted) {
                if (appear) {
                    hook = onAppear || onEnter;
                    afterHook = onAfterAppear || onAfterEnter;
                    cancelHook = onAppearCancelled || onEnterCancelled;
                }
                else {
                    return;
                }
            }
            let called = false;
            const done = (el._enterCb = (cancelled) => {
                if (called)
                    return;
                called = true;
                if (cancelled) {
                    callHook(cancelHook, [el]);
                }
                else {
                    callHook(afterHook, [el]);
                }
                if (hooks.delayedLeave) {
                    hooks.delayedLeave();
                }
                el._enterCb = undefined;
            });
            if (hook) {
                hook(el, done);
                if (hook.length <= 1) {
                    done();
                }
            }
            else {
                done();
            }
        },
        leave(el, remove) {
            const key = String(vnode.key);
            if (el._enterCb) {
                el._enterCb(true /* cancelled */);
            }
            if (state.isUnmounting) {
                return remove();
            }
            callHook(onBeforeLeave, [el]);
            let called = false;
            const done = (el._leaveCb = (cancelled) => {
                if (called)
                    return;
                called = true;
                remove();
                if (cancelled) {
                    callHook(onLeaveCancelled, [el]);
                }
                else {
                    callHook(onAfterLeave, [el]);
                }
                el._leaveCb = undefined;
                if (leavingVNodesCache[key] === vnode) {
                    delete leavingVNodesCache[key];
                }
            });
            leavingVNodesCache[key] = vnode;
            if (onLeave) {
                onLeave(el, done);
                if (onLeave.length <= 1) {
                    done();
                }
            }
            else {
                done();
            }
        },
        clone(vnode) {
            return resolveTransitionHooks(vnode, props, state, instance);
        }
    };
    return hooks;
}
// the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.
function emptyPlaceholder(vnode) {
    if (isKeepAlive(vnode)) {
        vnode = cloneVNode(vnode);
        vnode.children = null;
        return vnode;
    }
}
function getKeepAliveChild(vnode) {
    return isKeepAlive(vnode)
        ? vnode.children
            ? vnode.children[0]
            : undefined
        : vnode;
}
function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 /* COMPONENT */ && vnode.component) {
        setTransitionHooks(vnode.component.subTree, hooks);
    }
    else if ( vnode.shapeFlag & 128 /* SUSPENSE */) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    }
    else {
        vnode.transition = hooks;
    }
}
function getTransitionRawChildren(children, keepComment = false) {
    let ret = [];
    let keyedFragmentCount = 0;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        // handle fragment children case, e.g. v-for
        if (child.type === Fragment) {
            if (child.patchFlag & 128 /* KEYED_FRAGMENT */)
                keyedFragmentCount++;
            ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
        }
        // comment placeholders should be skipped, e.g. v-if
        else if (keepComment || child.type !== Comment) {
            ret.push(child);
        }
    }
    // #1126 if a transition children list contains multiple sub fragments, these
    // fragments will be merged into a flat children array. Since each v-for
    // fragment may contain different static bindings inside, we need to de-op
    // these children to force full diffs to ensure correct behavior.
    if (keyedFragmentCount > 1) {
        for (let i = 0; i < ret.length; i++) {
            ret[i].patchFlag = -2 /* BAIL */;
        }
    }
    return ret;
}

const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
    name: `KeepAlive`,
    // Marker for special handling inside the renderer. We are not using a ===
    // check directly on KeepAlive in the renderer, because importing it directly
    // would prevent it from being tree-shaken.
    __isKeepAlive: true,
    inheritRef: true,
    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [String, Number]
    },
    setup(props, { slots }) {
        const cache = new Map();
        const keys = new Set();
        let current = null;
        const instance = getCurrentInstance();
        const parentSuspense = instance.suspense;
        // KeepAlive communicates with the instantiated renderer via the
        // ctx where the renderer passes in its internals,
        // and the KeepAlive instance exposes activate/deactivate implementations.
        // The whole point of this is to avoid importing KeepAlive directly in the
        // renderer to facilitate tree-shaking.
        const sharedContext = instance.ctx;
        const { renderer: { p: patch, m: move, um: _unmount, o: { createElement } } } = sharedContext;
        const storageContainer = createElement('div');
        sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
            const instance = vnode.component;
            move(vnode, container, anchor, 0 /* ENTER */, parentSuspense);
            // in case props have changed
            patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, isSVG, optimized);
            queuePostRenderEffect(() => {
                instance.isDeactivated = false;
                if (instance.a) {
                    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance.a);
                }
                const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
                if (vnodeHook) {
                    invokeVNodeHook(vnodeHook, instance.parent, vnode);
                }
            }, parentSuspense);
        };
        sharedContext.deactivate = (vnode) => {
            const instance = vnode.component;
            move(vnode, storageContainer, null, 1 /* LEAVE */, parentSuspense);
            queuePostRenderEffect(() => {
                if (instance.da) {
                    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance.da);
                }
                const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
                if (vnodeHook) {
                    invokeVNodeHook(vnodeHook, instance.parent, vnode);
                }
                instance.isDeactivated = true;
            }, parentSuspense);
        };
        function unmount(vnode) {
            // reset the shapeFlag so it can be properly unmounted
            resetShapeFlag(vnode);
            _unmount(vnode, instance, parentSuspense);
        }
        function pruneCache(filter) {
            cache.forEach((vnode, key) => {
                const name = getComponentName(vnode.type);
                if (name && (!filter || !filter(name))) {
                    pruneCacheEntry(key);
                }
            });
        }
        function pruneCacheEntry(key) {
            const cached = cache.get(key);
            if (!current || cached.type !== current.type) {
                unmount(cached);
            }
            else if (current) {
                // current active instance should no longer be kept-alive.
                // we can't unmount it now but it might be later, so reset its flag now.
                resetShapeFlag(current);
            }
            cache.delete(key);
            keys.delete(key);
        }
        // prune cache on include/exclude prop change
        watch(() => [props.include, props.exclude], ([include, exclude]) => {
            include && pruneCache(name => matches(include, name));
            exclude && pruneCache(name => !matches(exclude, name));
        }, 
        // prune post-render after `current` has been updated
        { flush: 'post', deep: true });
        // cache sub tree after render
        let pendingCacheKey = null;
        const cacheSubtree = () => {
            // fix #1621, the pendingCacheKey could be 0
            if (pendingCacheKey != null) {
                cache.set(pendingCacheKey, getInnerChild(instance.subTree));
            }
        };
        onMounted(cacheSubtree);
        onUpdated(cacheSubtree);
        onBeforeUnmount(() => {
            cache.forEach(cached => {
                const { subTree, suspense } = instance;
                const vnode = getInnerChild(subTree);
                if (cached.type === vnode.type) {
                    // current instance will be unmounted as part of keep-alive's unmount
                    resetShapeFlag(vnode);
                    // but invoke its deactivated hook here
                    const da = vnode.component.da;
                    da && queuePostRenderEffect(da, suspense);
                    return;
                }
                unmount(cached);
            });
        });
        return () => {
            pendingCacheKey = null;
            if (!slots.default) {
                return null;
            }
            const children = slots.default();
            const rawVNode = children[0];
            if (children.length > 1) {
                if ((true)) {
                    warn(`KeepAlive should contain exactly one component child.`);
                }
                current = null;
                return children;
            }
            else if (!isVNode(rawVNode) ||
                (!(rawVNode.shapeFlag & 4 /* STATEFUL_COMPONENT */) &&
                    !(rawVNode.shapeFlag & 128 /* SUSPENSE */))) {
                current = null;
                return rawVNode;
            }
            let vnode = getInnerChild(rawVNode);
            const comp = vnode.type;
            const name = getComponentName(comp);
            const { include, exclude, max } = props;
            if ((include && (!name || !matches(include, name))) ||
                (exclude && name && matches(exclude, name))) {
                current = vnode;
                return rawVNode;
            }
            const key = vnode.key == null ? comp : vnode.key;
            const cachedVNode = cache.get(key);
            // clone vnode if it's reused because we are going to mutate it
            if (vnode.el) {
                vnode = cloneVNode(vnode);
                if (rawVNode.shapeFlag & 128 /* SUSPENSE */) {
                    rawVNode.ssContent = vnode;
                }
            }
            // #1513 it's possible for the returned vnode to be cloned due to attr
            // fallthrough or scopeId, so the vnode here may not be the final vnode
            // that is mounted. Instead of caching it directly, we store the pending
            // key and cache `instance.subTree` (the normalized vnode) in
            // beforeMount/beforeUpdate hooks.
            pendingCacheKey = key;
            if (cachedVNode) {
                // copy over mounted state
                vnode.el = cachedVNode.el;
                vnode.component = cachedVNode.component;
                if (vnode.transition) {
                    // recursively update transition hooks on subTree
                    setTransitionHooks(vnode, vnode.transition);
                }
                // avoid vnode being mounted as fresh
                vnode.shapeFlag |= 512 /* COMPONENT_KEPT_ALIVE */;
                // make this key the freshest
                keys.delete(key);
                keys.add(key);
            }
            else {
                keys.add(key);
                // prune oldest entry
                if (max && keys.size > parseInt(max, 10)) {
                    pruneCacheEntry(keys.values().next().value);
                }
            }
            // avoid vnode being unmounted
            vnode.shapeFlag |= 256 /* COMPONENT_SHOULD_KEEP_ALIVE */;
            current = vnode;
            return rawVNode;
        };
    }
};
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(pattern)) {
        return pattern.some((p) => matches(p, name));
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(pattern)) {
        return pattern.split(',').indexOf(name) > -1;
    }
    else if (pattern.test) {
        return pattern.test(name);
    }
    /* istanbul ignore next */
    return false;
}
function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a" /* ACTIVATED */, target);
}
function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da" /* DEACTIVATED */, target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
    // cache the deactivate branch check wrapper for injected hooks so the same
    // hook can be properly deduped by the scheduler. "__wdc" stands for "with
    // deactivation check".
    const wrappedHook = hook.__wdc ||
        (hook.__wdc = () => {
            // only fire the hook if the target instance is NOT in a deactivated branch.
            let current = target;
            while (current) {
                if (current.isDeactivated) {
                    return;
                }
                current = current.parent;
            }
            hook();
        });
    injectHook(type, wrappedHook, target);
    // In addition to registering it on the target instance, we walk up the parent
    // chain and register it on all ancestor instances that are keep-alive roots.
    // This avoids the need to walk the entire component tree when invoking these
    // hooks, and more importantly, avoids the need to track child components in
    // arrays.
    if (target) {
        let current = target.parent;
        while (current && current.parent) {
            if (isKeepAlive(current.parent.vnode)) {
                injectToKeepAliveRoot(wrappedHook, type, target, current);
            }
            current = current.parent;
        }
    }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    // injectHook wraps the original for error handling, so make sure to remove
    // the wrapped version.
    const injected = injectHook(type, hook, keepAliveRoot, true /* prepend */);
    onUnmounted(() => {
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.remove)(keepAliveRoot[type], injected);
    }, target);
}
function resetShapeFlag(vnode) {
    let shapeFlag = vnode.shapeFlag;
    if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
        shapeFlag -= 256 /* COMPONENT_SHOULD_KEEP_ALIVE */;
    }
    if (shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */) {
        shapeFlag -= 512 /* COMPONENT_KEPT_ALIVE */;
    }
    vnode.shapeFlag = shapeFlag;
}
function getInnerChild(vnode) {
    return vnode.shapeFlag & 128 /* SUSPENSE */ ? vnode.ssContent : vnode;
}

const isInternalKey = (key) => key[0] === '_' || key === '$stable';
const normalizeSlotValue = (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)
    ? value.map(normalizeVNode)
    : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => withCtx((props) => {
    if (( true) && currentInstance) {
        warn(`Slot "${key}" invoked outside of the render function: ` +
            `this will not track dependencies used in the slot. ` +
            `Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(props));
}, ctx);
const normalizeObjectSlots = (rawSlots, slots) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
        if (isInternalKey(key))
            continue;
        const value = rawSlots[key];
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
            slots[key] = normalizeSlot(key, value, ctx);
        }
        else if (value != null) {
            if ((true)) {
                warn(`Non-function value encountered for slot "${key}". ` +
                    `Prefer function slots for better performance.`);
            }
            const normalized = normalizeSlotValue(value);
            slots[key] = () => normalized;
        }
    }
};
const normalizeVNodeSlots = (instance, children) => {
    if (( true) && !isKeepAlive(instance.vnode)) {
        warn(`Non-function value encountered for default slot. ` +
            `Prefer function slots for better performance.`);
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
        const type = children._;
        if (type) {
            instance.slots = children;
            // make compiler marker non-enumerable
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.def)(children, '_', type);
        }
        else {
            normalizeObjectSlots(children, (instance.slots = {}));
        }
    }
    else {
        instance.slots = {};
        if (children) {
            normalizeVNodeSlots(instance, children);
        }
    }
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.def)(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    if (vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
        const type = children._;
        if (type) {
            // compiled slots.
            if (( true) && isHmrUpdating) {
                // Parent was HMR updated so slot content may have changed.
                // force update slots and mark instance for hmr as well
                (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(slots, children);
            }
            else if (type === 1 /* STABLE */) {
                // compiled AND stable.
                // no need to update, and skip stale slots removal.
                needDeletionCheck = false;
            }
            else {
                // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
                // normalization.
                (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(slots, children);
            }
        }
        else {
            needDeletionCheck = !children.$stable;
            normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
    }
    else if (children) {
        // non slot object children (direct value) passed to a component
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
    }
    // delete stale slots
    if (needDeletionCheck) {
        for (const key in slots) {
            if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
                delete slots[key];
            }
        }
    }
};

/**
Runtime helper for applying directives to a vnode. Example usage:

const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')

return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/
const isBuiltInDirective = /*#__PURE__*/ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.makeMap)('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');
function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
        warn('Do not use built-in directive ids as custom directive id: ' + name);
    }
}
/**
 * Adds directives to a VNode.
 */
function withDirectives(vnode, directives) {
    const internalInstance = currentRenderingInstance;
    if (internalInstance === null) {
        ( true) && warn(`withDirectives can only be used inside render functions.`);
        return vnode;
    }
    const instance = internalInstance.proxy;
    const bindings = vnode.dirs || (vnode.dirs = []);
    for (let i = 0; i < directives.length; i++) {
        let [dir, value, arg, modifiers = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ] = directives[i];
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(dir)) {
            dir = {
                mounted: dir,
                updated: dir
            };
        }
        bindings.push({
            dir,
            instance,
            value,
            oldValue: void 0,
            arg,
            modifiers
        });
    }
    return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
            binding.oldValue = oldBindings[i].value;
        }
        const hook = binding.dir[name];
        if (hook) {
            callWithAsyncErrorHandling(hook, instance, 8 /* DIRECTIVE_HOOK */, [
                vnode.el,
                binding,
                vnode,
                prevVNode
            ]);
        }
    }
}

function createAppContext() {
    return {
        app: null,
        config: {
            isNativeTag: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NO,
            performance: false,
            globalProperties: {},
            optionMergeStrategies: {},
            isCustomElement: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NO,
            errorHandler: undefined,
            warnHandler: undefined
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null)
    };
}
let uid = 0;
function createAppAPI(render, hydrate) {
    return function createApp(rootComponent, rootProps = null) {
        if (rootProps != null && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(rootProps)) {
            ( true) && warn(`root props passed to app.mount() must be an object.`);
            rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = new Set();
        let isMounted = false;
        const app = (context.app = {
            _uid: uid++,
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            _context: context,
            version,
            get config() {
                return context.config;
            },
            set config(v) {
                if ((true)) {
                    warn(`app.config cannot be replaced. Modify individual options instead.`);
                }
            },
            use(plugin, ...options) {
                if (installedPlugins.has(plugin)) {
                    ( true) && warn(`Plugin has already been applied to target app.`);
                }
                else if (plugin && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(plugin.install)) {
                    installedPlugins.add(plugin);
                    plugin.install(app, ...options);
                }
                else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(plugin)) {
                    installedPlugins.add(plugin);
                    plugin(app, ...options);
                }
                else if ((true)) {
                    warn(`A plugin must either be a function or an object with an "install" ` +
                        `function.`);
                }
                return app;
            },
            mixin(mixin) {
                if (__VUE_OPTIONS_API__) {
                    if (!context.mixins.includes(mixin)) {
                        context.mixins.push(mixin);
                        // global mixin with props/emits de-optimizes props/emits
                        // normalization caching.
                        if (mixin.props || mixin.emits) {
                            context.deopt = true;
                        }
                    }
                    else if ((true)) {
                        warn('Mixin has already been applied to target app' +
                            (mixin.name ? `: ${mixin.name}` : ''));
                    }
                }
                else if ((true)) {
                    warn('Mixins are only available in builds supporting Options API');
                }
                return app;
            },
            component(name, component) {
                if ((true)) {
                    validateComponentName(name, context.config);
                }
                if (!component) {
                    return context.components[name];
                }
                if (( true) && context.components[name]) {
                    warn(`Component "${name}" has already been registered in target app.`);
                }
                context.components[name] = component;
                return app;
            },
            directive(name, directive) {
                if ((true)) {
                    validateDirectiveName(name);
                }
                if (!directive) {
                    return context.directives[name];
                }
                if (( true) && context.directives[name]) {
                    warn(`Directive "${name}" has already been registered in target app.`);
                }
                context.directives[name] = directive;
                return app;
            },
            mount(rootContainer, isHydrate) {
                if (!isMounted) {
                    const vnode = createVNode(rootComponent, rootProps);
                    // store app context on the root VNode.
                    // this will be set on the root instance on initial mount.
                    vnode.appContext = context;
                    // HMR root reload
                    if ((true)) {
                        context.reload = () => {
                            render(cloneVNode(vnode), rootContainer);
                        };
                    }
                    if (isHydrate && hydrate) {
                        hydrate(vnode, rootContainer);
                    }
                    else {
                        render(vnode, rootContainer);
                    }
                    isMounted = true;
                    app._container = rootContainer;
                    rootContainer.__vue_app__ = app;
                    if (true) {
                        devtoolsInitApp(app, version);
                    }
                    return vnode.component.proxy;
                }
                else if ((true)) {
                    warn(`App has already been mounted.\n` +
                        `If you want to remount the same app, move your app creation logic ` +
                        `into a factory function and create fresh app instances for each ` +
                        `mount - e.g. \`const createMyApp = () => createApp(App)\``);
                }
            },
            unmount() {
                if (isMounted) {
                    render(null, app._container);
                    if (true) {
                        devtoolsUnmountApp(app);
                    }
                }
                else if ((true)) {
                    warn(`Cannot unmount an app that is not mounted.`);
                }
            },
            provide(key, value) {
                if (( true) && key in context.provides) {
                    warn(`App already provides property with key "${String(key)}". ` +
                        `It will be overwritten with the new value.`);
                }
                // TypeScript doesn't allow symbols as index type
                // https://github.com/Microsoft/TypeScript/issues/24587
                context.provides[key] = value;
                return app;
            }
        });
        return app;
    };
}

let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== 'foreignObject';
const isComment = (node) => node.nodeType === 8 /* COMMENT */;
// Note: hydration is DOM-specific
// But we have to place it in core due to tight coupling with core - splitting
// it out creates a ton of unnecessary complexity.
// Hydration also depends on some renderer internal logic which needs to be
// passed in via arguments.
function createHydrationFunctions(rendererInternals) {
    const { mt: mountComponent, p: patch, o: { patchProp, nextSibling, parentNode, remove, insert, createComment } } = rendererInternals;
    const hydrate = (vnode, container) => {
        if (( true) && !container.hasChildNodes()) {
            warn(`Attempting to hydrate existing markup but container is empty. ` +
                `Performing full mount instead.`);
            patch(null, vnode, container);
            return;
        }
        hasMismatch = false;
        hydrateNode(container.firstChild, vnode, null, null);
        flushPostFlushCbs();
        if (hasMismatch && !false) {
            // this error should show up in production
            console.error(`Hydration completed but contains mismatches.`);
        }
    };
    const hydrateNode = (node, vnode, parentComponent, parentSuspense, optimized = false) => {
        const isFragmentStart = isComment(node) && node.data === '[';
        const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, isFragmentStart);
        const { type, ref, shapeFlag } = vnode;
        const domType = node.nodeType;
        vnode.el = node;
        let nextNode = null;
        switch (type) {
            case Text:
                if (domType !== 3 /* TEXT */) {
                    nextNode = onMismatch();
                }
                else {
                    if (node.data !== vnode.children) {
                        hasMismatch = true;
                        ( true) &&
                            warn(`Hydration text mismatch:` +
                                `\n- Client: ${JSON.stringify(node.data)}` +
                                `\n- Server: ${JSON.stringify(vnode.children)}`);
                        node.data = vnode.children;
                    }
                    nextNode = nextSibling(node);
                }
                break;
            case Comment:
                if (domType !== 8 /* COMMENT */ || isFragmentStart) {
                    nextNode = onMismatch();
                }
                else {
                    nextNode = nextSibling(node);
                }
                break;
            case Static:
                if (domType !== 1 /* ELEMENT */) {
                    nextNode = onMismatch();
                }
                else {
                    // determine anchor, adopt content
                    nextNode = node;
                    // if the static vnode has its content stripped during build,
                    // adopt it from the server-rendered HTML.
                    const needToAdoptContent = !vnode.children.length;
                    for (let i = 0; i < vnode.staticCount; i++) {
                        if (needToAdoptContent)
                            vnode.children += nextNode.outerHTML;
                        if (i === vnode.staticCount - 1) {
                            vnode.anchor = nextNode;
                        }
                        nextNode = nextSibling(nextNode);
                    }
                    return nextNode;
                }
                break;
            case Fragment:
                if (!isFragmentStart) {
                    nextNode = onMismatch();
                }
                else {
                    nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, optimized);
                }
                break;
            default:
                if (shapeFlag & 1 /* ELEMENT */) {
                    if (domType !== 1 /* ELEMENT */ ||
                        vnode.type !== node.tagName.toLowerCase()) {
                        nextNode = onMismatch();
                    }
                    else {
                        nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, optimized);
                    }
                }
                else if (shapeFlag & 6 /* COMPONENT */) {
                    // when setting up the render effect, if the initial vnode already
                    // has .el set, the component will perform hydration instead of mount
                    // on its sub-tree.
                    const container = parentNode(node);
                    const hydrateComponent = () => {
                        mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
                    };
                    // async component
                    const loadAsync = vnode.type.__asyncLoader;
                    if (loadAsync) {
                        loadAsync().then(hydrateComponent);
                    }
                    else {
                        hydrateComponent();
                    }
                    // component may be async, so in the case of fragments we cannot rely
                    // on component's rendered output to determine the end of the fragment
                    // instead, we do a lookahead to find the end anchor node.
                    nextNode = isFragmentStart
                        ? locateClosingAsyncAnchor(node)
                        : nextSibling(node);
                }
                else if (shapeFlag & 64 /* TELEPORT */) {
                    if (domType !== 8 /* COMMENT */) {
                        nextNode = onMismatch();
                    }
                    else {
                        nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, optimized, rendererInternals, hydrateChildren);
                    }
                }
                else if ( shapeFlag & 128 /* SUSPENSE */) {
                    nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), optimized, rendererInternals, hydrateNode);
                }
                else if ((true)) {
                    warn('Invalid HostVNode type:', type, `(${typeof type})`);
                }
        }
        if (ref != null) {
            setRef(ref, null, parentSuspense, vnode);
        }
        return nextNode;
    };
    const hydrateElement = (el, vnode, parentComponent, parentSuspense, optimized) => {
        optimized = optimized || !!vnode.dynamicChildren;
        const { props, patchFlag, shapeFlag, dirs } = vnode;
        // skip props & children if this is hoisted static nodes
        if (patchFlag !== -1 /* HOISTED */) {
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'created');
            }
            // props
            if (props) {
                if (!optimized ||
                    (patchFlag & 16 /* FULL_PROPS */ ||
                        patchFlag & 32 /* HYDRATE_EVENTS */)) {
                    for (const key in props) {
                        if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
                            patchProp(el, key, null, props[key]);
                        }
                    }
                }
                else if (props.onClick) {
                    // Fast path for click listeners (which is most often) to avoid
                    // iterating through props.
                    patchProp(el, 'onClick', null, props.onClick);
                }
            }
            // vnode / directive hooks
            let vnodeHooks;
            if ((vnodeHooks = props && props.onVnodeBeforeMount)) {
                invokeVNodeHook(vnodeHooks, parentComponent, vnode);
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
            }
            if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
                queueEffectWithSuspense(() => {
                    vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
                    dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
                }, parentSuspense);
            }
            // children
            if (shapeFlag & 16 /* ARRAY_CHILDREN */ &&
                // skip if element has innerHTML / textContent
                !(props && (props.innerHTML || props.textContent))) {
                let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, optimized);
                let hasWarned = false;
                while (next) {
                    hasMismatch = true;
                    if (( true) && !hasWarned) {
                        warn(`Hydration children mismatch in <${vnode.type}>: ` +
                            `server rendered element contains more child nodes than client vdom.`);
                        hasWarned = true;
                    }
                    // The SSRed DOM contains more nodes than it should. Remove them.
                    const cur = next;
                    next = next.nextSibling;
                    remove(cur);
                }
            }
            else if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                if (el.textContent !== vnode.children) {
                    hasMismatch = true;
                    ( true) &&
                        warn(`Hydration text content mismatch in <${vnode.type}>:\n` +
                            `- Client: ${el.textContent}\n` +
                            `- Server: ${vnode.children}`);
                    el.textContent = vnode.children;
                }
            }
        }
        return el.nextSibling;
    };
    const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, optimized) => {
        optimized = optimized || !!parentVNode.dynamicChildren;
        const children = parentVNode.children;
        const l = children.length;
        let hasWarned = false;
        for (let i = 0; i < l; i++) {
            const vnode = optimized
                ? children[i]
                : (children[i] = normalizeVNode(children[i]));
            if (node) {
                node = hydrateNode(node, vnode, parentComponent, parentSuspense, optimized);
            }
            else {
                hasMismatch = true;
                if (( true) && !hasWarned) {
                    warn(`Hydration children mismatch in <${container.tagName.toLowerCase()}>: ` +
                        `server rendered element contains fewer child nodes than client vdom.`);
                    hasWarned = true;
                }
                // the SSRed DOM didn't contain enough nodes. Mount the missing ones.
                patch(null, vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container));
            }
        }
        return node;
    };
    const hydrateFragment = (node, vnode, parentComponent, parentSuspense, optimized) => {
        const container = parentNode(node);
        const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, optimized);
        if (next && isComment(next) && next.data === ']') {
            return nextSibling((vnode.anchor = next));
        }
        else {
            // fragment didn't hydrate successfully, since we didn't get a end anchor
            // back. This should have led to node/children mismatch warnings.
            hasMismatch = true;
            // since the anchor is missing, we need to create one and insert it
            insert((vnode.anchor = createComment(`]`)), container, next);
            return next;
        }
    };
    const handleMismatch = (node, vnode, parentComponent, parentSuspense, isFragment) => {
        hasMismatch = true;
        ( true) &&
            warn(`Hydration node mismatch:\n- Client vnode:`, vnode.type, `\n- Server rendered DOM:`, node, node.nodeType === 3 /* TEXT */
                ? `(text)`
                : isComment(node) && node.data === '['
                    ? `(start of fragment)`
                    : ``);
        vnode.el = null;
        if (isFragment) {
            // remove excessive fragment nodes
            const end = locateClosingAsyncAnchor(node);
            while (true) {
                const next = nextSibling(node);
                if (next && next !== end) {
                    remove(next);
                }
                else {
                    break;
                }
            }
        }
        const next = nextSibling(node);
        const container = parentNode(node);
        remove(node);
        patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container));
        return next;
    };
    const locateClosingAsyncAnchor = (node) => {
        let match = 0;
        while (node) {
            node = nextSibling(node);
            if (node && isComment(node)) {
                if (node.data === '[')
                    match++;
                if (node.data === ']') {
                    if (match === 0) {
                        return nextSibling(node);
                    }
                    else {
                        match--;
                    }
                }
            }
        }
        return node;
    };
    return [hydrate, hydrateNode];
}

let supported;
let perf;
function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        perf.mark(`vue-${type}-${instance.uid}`);
    }
}
function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        const startTag = `vue-${type}-${instance.uid}`;
        const endTag = startTag + `:end`;
        perf.mark(endTag);
        perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
    }
}
function isSupported() {
    if (supported !== undefined) {
        return supported;
    }
    /* eslint-disable no-restricted-globals */
    if (typeof window !== 'undefined' && window.performance) {
        supported = true;
        perf = window.performance;
    }
    else {
        supported = false;
    }
    /* eslint-enable no-restricted-globals */
    return supported;
}

/**
 * This is only called in esm-bundler builds.
 * It is called when a renderer is created, in `baseCreateRenderer` so that
 * importing runtime-core is side-effects free.
 *
 * istanbul-ignore-next
 */
function initFeatureFlags() {
    let needWarn = false;
    if (typeof __VUE_OPTIONS_API__ !== 'boolean') {
        needWarn = true;
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)().__VUE_OPTIONS_API__ = true;
    }
    if (typeof __VUE_PROD_DEVTOOLS__ !== 'boolean') {
        needWarn = true;
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)().__VUE_PROD_DEVTOOLS__ = false;
    }
    if (( true) && needWarn) {
        console.warn(`You are running the esm-bundler build of Vue. It is recommended to ` +
            `configure your bundler to explicitly replace feature flag globals ` +
            `with boolean literals to get proper tree-shaking in the final bundle. ` +
            `See http://link.vuejs.org/feature-flags for more details.`);
    }
}

// implementation, close to no-op
function defineComponent(options) {
    return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(options) ? { setup: options, name: options.name } : options;
}

const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
function defineAsyncComponent(source) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(source)) {
        source = { loader: source };
    }
    const { loader, loadingComponent: loadingComponent, errorComponent: errorComponent, delay = 200, timeout, // undefined = never times out
    suspensible = true, onError: userOnError } = source;
    let pendingRequest = null;
    let resolvedComp;
    let retries = 0;
    const retry = () => {
        retries++;
        pendingRequest = null;
        return load();
    };
    const load = () => {
        let thisRequest;
        return (pendingRequest ||
            (thisRequest = pendingRequest = loader()
                .catch(err => {
                err = err instanceof Error ? err : new Error(String(err));
                if (userOnError) {
                    return new Promise((resolve, reject) => {
                        const userRetry = () => resolve(retry());
                        const userFail = () => reject(err);
                        userOnError(err, userRetry, userFail, retries + 1);
                    });
                }
                else {
                    throw err;
                }
            })
                .then((comp) => {
                if (thisRequest !== pendingRequest && pendingRequest) {
                    return pendingRequest;
                }
                if (( true) && !comp) {
                    warn(`Async component loader resolved to undefined. ` +
                        `If you are using retry(), make sure to return its return value.`);
                }
                // interop module default
                if (comp &&
                    (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
                    comp = comp.default;
                }
                if (( true) && comp && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(comp) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(comp)) {
                    throw new Error(`Invalid async component load result: ${comp}`);
                }
                resolvedComp = comp;
                return comp;
            })));
    };
    return defineComponent({
        __asyncLoader: load,
        name: 'AsyncComponentWrapper',
        setup() {
            const instance = currentInstance;
            // already resolved
            if (resolvedComp) {
                return () => createInnerComp(resolvedComp, instance);
            }
            const onError = (err) => {
                pendingRequest = null;
                handleError(err, instance, 13 /* ASYNC_COMPONENT_LOADER */, !errorComponent /* do not throw in dev if user provided error component */);
            };
            // suspense-controlled or SSR.
            if (( suspensible && instance.suspense) ||
                (false )) {
                return load()
                    .then(comp => {
                    return () => createInnerComp(comp, instance);
                })
                    .catch(err => {
                    onError(err);
                    return () => errorComponent
                        ? createVNode(errorComponent, {
                            error: err
                        })
                        : null;
                });
            }
            const loaded = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
            const error = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)();
            const delayed = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)(!!delay);
            if (delay) {
                setTimeout(() => {
                    delayed.value = false;
                }, delay);
            }
            if (timeout != null) {
                setTimeout(() => {
                    if (!loaded.value && !error.value) {
                        const err = new Error(`Async component timed out after ${timeout}ms.`);
                        onError(err);
                        error.value = err;
                    }
                }, timeout);
            }
            load()
                .then(() => {
                loaded.value = true;
            })
                .catch(err => {
                onError(err);
                error.value = err;
            });
            return () => {
                if (loaded.value && resolvedComp) {
                    return createInnerComp(resolvedComp, instance);
                }
                else if (error.value && errorComponent) {
                    return createVNode(errorComponent, {
                        error: error.value
                    });
                }
                else if (loadingComponent && !delayed.value) {
                    return createVNode(loadingComponent);
                }
            };
        }
    });
}
function createInnerComp(comp, { vnode: { ref, props, children } }) {
    const vnode = createVNode(comp, props, children);
    // ensure inner component inherits the async wrapper's ref owner
    vnode.ref = ref;
    return vnode;
}

const prodEffectOptions = {
    scheduler: queueJob,
    // #1801, #2043 component render effects should allow recursive updates
    allowRecurse: true
};
function createDevEffectOptions(instance) {
    return {
        scheduler: queueJob,
        allowRecurse: true,
        onTrack: instance.rtc ? e => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance.rtc, e) : void 0,
        onTrigger: instance.rtg ? e => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance.rtg, e) : void 0
    };
}
const queuePostRenderEffect =  queueEffectWithSuspense
    ;
const setRef = (rawRef, oldRawRef, parentSuspense, vnode) => {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(rawRef)) {
        rawRef.forEach((r, i) => setRef(r, oldRawRef && ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode));
        return;
    }
    let value;
    if (!vnode || isAsyncWrapper(vnode)) {
        value = null;
    }
    else {
        if (vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */) {
            value = vnode.component.exposed || vnode.component.proxy;
        }
        else {
            value = vnode.el;
        }
    }
    const { i: owner, r: ref } = rawRef;
    if (( true) && !owner) {
        warn(`Missing ref owner context. ref cannot be used on hoisted vnodes. ` +
            `A vnode with ref must be created inside the render function.`);
        return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ ? (owner.refs = {}) : owner.refs;
    const setupState = owner.setupState;
    // unset old ref
    if (oldRef != null && oldRef !== ref) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(oldRef)) {
            refs[oldRef] = null;
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, oldRef)) {
                setupState[oldRef] = null;
            }
        }
        else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(oldRef)) {
            oldRef.value = null;
        }
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(ref)) {
        const doSet = () => {
            refs[ref] = value;
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, ref)) {
                setupState[ref] = value;
            }
        };
        // #1789: for non-null values, set them after render
        // null values means this is unmount and it should not overwrite another
        // ref with the same key
        if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
        }
        else {
            doSet();
        }
    }
    else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(ref)) {
        const doSet = () => {
            ref.value = value;
        };
        if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
        }
        else {
            doSet();
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(ref)) {
        callWithErrorHandling(ref, owner, 12 /* FUNCTION_REF */, [value, refs]);
    }
    else if ((true)) {
        warn('Invalid template ref type:', value, `(${typeof value})`);
    }
};
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */
function createRenderer(options) {
    return baseCreateRenderer(options);
}
// Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.
function createHydrationRenderer(options) {
    return baseCreateRenderer(options, createHydrationFunctions);
}
// implementation
function baseCreateRenderer(options, createHydrationFns) {
    // compile-time feature flags check
    {
        initFeatureFlags();
    }
    const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, forcePatchProp: hostForcePatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP, cloneNode: hostCloneNode, insertStaticContent: hostInsertStaticContent } = options;
    // Note: functions inside this closure should use `const xxx = () => {}`
    // style in order to prevent being inlined by minifiers.
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, optimized = false) => {
        // patching & not same type, unmount old tree
        if (n1 && !isSameVNodeType(n1, n2)) {
            anchor = getNextHostNode(n1);
            unmount(n1, parentComponent, parentSuspense, true);
            n1 = null;
        }
        if (n2.patchFlag === -2 /* BAIL */) {
            optimized = false;
            n2.dynamicChildren = null;
        }
        const { type, ref, shapeFlag } = n2;
        switch (type) {
            case Text:
                processText(n1, n2, container, anchor);
                break;
            case Comment:
                processCommentNode(n1, n2, container, anchor);
                break;
            case Static:
                if (n1 == null) {
                    mountStaticNode(n2, container, anchor, isSVG);
                }
                else if ((true)) {
                    patchStaticNode(n1, n2, container, isSVG);
                }
                break;
            case Fragment:
                processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                break;
            default:
                if (shapeFlag & 1 /* ELEMENT */) {
                    processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
                else if (shapeFlag & 6 /* COMPONENT */) {
                    processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
                else if (shapeFlag & 64 /* TELEPORT */) {
                    type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
                }
                else if ( shapeFlag & 128 /* SUSPENSE */) {
                    type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
                }
                else if ((true)) {
                    warn('Invalid VNode type:', type, `(${typeof type})`);
                }
        }
        // set ref
        if (ref != null && parentComponent) {
            setRef(ref, n1 && n1.ref, parentSuspense, n2);
        }
    };
    const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateText(n2.children)), container, anchor);
        }
        else {
            const el = (n2.el = n1.el);
            if (n2.children !== n1.children) {
                hostSetText(el, n2.children);
            }
        }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
            hostInsert((n2.el = hostCreateComment(n2.children || '')), container, anchor);
        }
        else {
            // there's no support for dynamic comments
            n2.el = n1.el;
        }
    };
    const mountStaticNode = (n2, container, anchor, isSVG) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
    };
    /**
     * Dev / HMR only
     */
    const patchStaticNode = (n1, n2, container, isSVG) => {
        // static nodes are only patched during dev for HMR
        if (n2.children !== n1.children) {
            const anchor = hostNextSibling(n1.anchor);
            // remove existing
            removeStaticNode(n1);
            [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG);
        }
        else {
            n2.el = n1.el;
            n2.anchor = n1.anchor;
        }
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
        let next;
        while (el && el !== anchor) {
            next = hostNextSibling(el);
            hostInsert(el, container, nextSibling);
            el = next;
        }
        hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
        let next;
        while (el && el !== anchor) {
            next = hostNextSibling(el);
            hostRemove(el);
            el = next;
        }
        hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        isSVG = isSVG || n2.type === 'svg';
        if (n1 == null) {
            mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
        else {
            patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized);
        }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        let el;
        let vnodeHook;
        const { type, props, shapeFlag, transition, scopeId, patchFlag, dirs } = vnode;
        if (false /* HOISTED */) {}
        else {
            el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is);
            // mount children first, since some props may rely on child content
            // being already rendered, e.g. `<select value>`
            if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                hostSetElementText(el, vnode.children);
            }
            else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', optimized || !!vnode.dynamicChildren);
            }
            if (dirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'created');
            }
            // props
            if (props) {
                for (const key in props) {
                    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key)) {
                        hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
                if ((vnodeHook = props.onVnodeBeforeMount)) {
                    invokeVNodeHook(vnodeHook, parentComponent, vnode);
                }
            }
            // scopeId
            setScopeId(el, scopeId, vnode, parentComponent);
        }
        if (true) {
            Object.defineProperty(el, '__vnode', {
                value: vnode,
                enumerable: false
            });
            Object.defineProperty(el, '__vueParentComponent', {
                value: parentComponent,
                enumerable: false
            });
        }
        if (dirs) {
            invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
        }
        // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
        // #1689 For inside suspense + suspense resolved case, just call it
        const needCallTransitionHooks = (!parentSuspense || (parentSuspense && !parentSuspense.pendingBranch)) &&
            transition &&
            !transition.persisted;
        if (needCallTransitionHooks) {
            transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) ||
            needCallTransitionHooks ||
            dirs) {
            queuePostRenderEffect(() => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                needCallTransitionHooks && transition.enter(el);
                dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
            }, parentSuspense);
        }
    };
    const setScopeId = (el, scopeId, vnode, parentComponent) => {
        if (scopeId) {
            hostSetScopeId(el, scopeId);
        }
        if (parentComponent) {
            const treeOwnerId = parentComponent.type.__scopeId;
            // vnode's own scopeId and the current patched component's scopeId is
            // different - this is a slot content node.
            if (treeOwnerId && treeOwnerId !== scopeId) {
                hostSetScopeId(el, treeOwnerId + '-s');
            }
            let subTree = parentComponent.subTree;
            if (( true) && subTree.type === Fragment) {
                subTree =
                    filterSingleRoot(subTree.children) || subTree;
            }
            if (vnode === subTree) {
                setScopeId(el, parentComponent.vnode.scopeId, parentComponent.vnode, parentComponent.parent);
            }
        }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, optimized, start = 0) => {
        for (let i = start; i < children.length; i++) {
            const child = (children[i] = optimized
                ? cloneIfMounted(children[i])
                : normalizeVNode(children[i]));
            patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, optimized) => {
        const el = (n2.el = n1.el);
        let { patchFlag, dynamicChildren, dirs } = n2;
        // #1426 take the old vnode's patch flag into account since user may clone a
        // compiler-generated vnode, which de-opts to FULL_PROPS
        patchFlag |= n1.patchFlag & 16 /* FULL_PROPS */;
        const oldProps = n1.props || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
        const newProps = n2.props || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
        let vnodeHook;
        if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
            invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
            invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
        }
        if (( true) && isHmrUpdating) {
            // HMR updated, force full diff
            patchFlag = 0;
            optimized = false;
            dynamicChildren = null;
        }
        if (patchFlag > 0) {
            // the presence of a patchFlag means this element's render code was
            // generated by the compiler and can take the fast path.
            // in this path old node and new node are guaranteed to have the same shape
            // (i.e. at the exact same position in the source template)
            if (patchFlag & 16 /* FULL_PROPS */) {
                // element props contain dynamic keys, full diff needed
                patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
            }
            else {
                // class
                // this flag is matched when the element has dynamic class bindings.
                if (patchFlag & 2 /* CLASS */) {
                    if (oldProps.class !== newProps.class) {
                        hostPatchProp(el, 'class', null, newProps.class, isSVG);
                    }
                }
                // style
                // this flag is matched when the element has dynamic style bindings
                if (patchFlag & 4 /* STYLE */) {
                    hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
                }
                // props
                // This flag is matched when the element has dynamic prop/attr bindings
                // other than class and style. The keys of dynamic prop/attrs are saved for
                // faster iteration.
                // Note dynamic keys like :[foo]="bar" will cause this optimization to
                // bail out and go through a full diff because we need to unset the old key
                if (patchFlag & 8 /* PROPS */) {
                    // if the flag is present then dynamicProps must be non-null
                    const propsToUpdate = n2.dynamicProps;
                    for (let i = 0; i < propsToUpdate.length; i++) {
                        const key = propsToUpdate[i];
                        const prev = oldProps[key];
                        const next = newProps[key];
                        if (next !== prev ||
                            (hostForcePatchProp && hostForcePatchProp(el, key))) {
                            hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                        }
                    }
                }
            }
            // text
            // This flag is matched when the element has only dynamic text children.
            if (patchFlag & 1 /* TEXT */) {
                if (n1.children !== n2.children) {
                    hostSetElementText(el, n2.children);
                }
            }
        }
        else if (!optimized && dynamicChildren == null) {
            // unoptimized, full diff
            patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        }
        const areChildrenSVG = isSVG && n2.type !== 'foreignObject';
        if (dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG);
            if (( true) && parentComponent && parentComponent.type.__hmrId) {
                traverseStaticChildren(n1, n2);
            }
        }
        else if (!optimized) {
            // full diff
            patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
            queuePostRenderEffect(() => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
                dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
            }, parentSuspense);
        }
    };
    // The fast path for blocks.
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG) => {
        for (let i = 0; i < newChildren.length; i++) {
            const oldVNode = oldChildren[i];
            const newVNode = newChildren[i];
            // Determine the container (parent element) for the patch.
            const container = 
            // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            oldVNode.type === Fragment ||
                // - In the case of different nodes, there is going to be a replacement
                // which also requires the correct parent container
                !isSameVNodeType(oldVNode, newVNode) ||
                // - In the case of a component, it could contain anything.
                oldVNode.shapeFlag & 6 /* COMPONENT */ ||
                oldVNode.shapeFlag & 64 /* TELEPORT */
                ? hostParentNode(oldVNode.el)
                : // In other cases, the parent container is not actually used so we
                    // just pass the block element here to avoid a DOM parentNode call.
                    fallbackContainer;
            patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, true);
        }
    };
    const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                // empty string is not valid prop
                if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key))
                    continue;
                const next = newProps[key];
                const prev = oldProps[key];
                if (next !== prev ||
                    (hostForcePatchProp && hostForcePatchProp(el, key))) {
                    hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                }
            }
            if (oldProps !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key) && !(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
                    }
                }
            }
        }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''));
        const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''));
        let { patchFlag, dynamicChildren } = n2;
        if (patchFlag > 0) {
            optimized = true;
        }
        if (( true) && isHmrUpdating) {
            // HMR updated, force full diff
            patchFlag = 0;
            optimized = false;
            dynamicChildren = null;
        }
        if (n1 == null) {
            hostInsert(fragmentStartAnchor, container, anchor);
            hostInsert(fragmentEndAnchor, container, anchor);
            // a fragment can only have array children
            // since they are either generated by the compiler, or implicitly created
            // from arrays.
            mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
        }
        else {
            if (patchFlag > 0 &&
                patchFlag & 64 /* STABLE_FRAGMENT */ &&
                dynamicChildren &&
                // #2715 the previous fragment could've been a BAILed one as a result
                // of renderSlot() with no valid children
                n1.dynamicChildren) {
                // a stable fragment (template root or <template v-for>) doesn't need to
                // patch children order, but it may contain dynamicChildren.
                patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG);
                if (( true) && parentComponent && parentComponent.type.__hmrId) {
                    traverseStaticChildren(n1, n2);
                }
                else if (
                // #2080 if the stable fragment has a key, it's a <template v-for> that may
                //  get moved around. Make sure all root level vnodes inherit el.
                // #2134 or if it's a component root, it may also get moved around
                // as the component is being moved.
                n2.key != null ||
                    (parentComponent && n2 === parentComponent.subTree)) {
                    traverseStaticChildren(n1, n2, true /* shallow */);
                }
            }
            else {
                // keyed / unkeyed, or manual fragments.
                // for keyed & unkeyed, since they are compiler generated from v-for,
                // each child is guaranteed to be a block so the fragment will never
                // have dynamicChildren.
                patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
            }
        }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        if (n1 == null) {
            if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */) {
                parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
            }
            else {
                mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
            }
        }
        else {
            updateComponent(n1, n2, optimized);
        }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        const instance = (initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense));
        if (( true) && instance.type.__hmrId) {
            registerHMR(instance);
        }
        if ((true)) {
            pushWarningContext(initialVNode);
            startMeasure(instance, `mount`);
        }
        // inject renderer internals for keepAlive
        if (isKeepAlive(initialVNode)) {
            instance.ctx.renderer = internals;
        }
        // resolve props and slots for setup context
        if ((true)) {
            startMeasure(instance, `init`);
        }
        setupComponent(instance);
        if ((true)) {
            endMeasure(instance, `init`);
        }
        // setup() is async. This component relies on async logic to be resolved
        // before proceeding
        if ( instance.asyncDep) {
            parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
            // Give it a placeholder if this is not hydration
            // TODO handle self-defined fallback
            if (!initialVNode.el) {
                const placeholder = (instance.subTree = createVNode(Comment));
                processCommentNode(null, placeholder, container, anchor);
            }
            return;
        }
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
        if ((true)) {
            popWarningContext();
            endMeasure(instance, `mount`);
        }
    };
    const updateComponent = (n1, n2, optimized) => {
        const instance = (n2.component = n1.component);
        if (shouldUpdateComponent(n1, n2, optimized)) {
            if (
                instance.asyncDep &&
                !instance.asyncResolved) {
                // async & still pending - just update props and slots
                // since the component's reactive effect for render isn't set-up yet
                if ((true)) {
                    pushWarningContext(n2);
                }
                updateComponentPreRender(instance, n2, optimized);
                if ((true)) {
                    popWarningContext();
                }
                return;
            }
            else {
                // normal update
                instance.next = n2;
                // in case the child component is also queued, remove it to avoid
                // double updating the same child component in the same flush.
                invalidateJob(instance.update);
                // instance.update is the reactive effect runner.
                instance.update();
            }
        }
        else {
            // no update needed. just copy over properties
            n2.component = n1.component;
            n2.el = n1.el;
            instance.vnode = n2;
        }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
        // create reactive effect for rendering
        instance.update = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.effect)(function componentEffect() {
            if (!instance.isMounted) {
                let vnodeHook;
                const { el, props } = initialVNode;
                const { bm, m, parent } = instance;
                // beforeMount hook
                if (bm) {
                    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(bm);
                }
                // onVnodeBeforeMount
                if ((vnodeHook = props && props.onVnodeBeforeMount)) {
                    invokeVNodeHook(vnodeHook, parent, initialVNode);
                }
                // render
                if ((true)) {
                    startMeasure(instance, `render`);
                }
                const subTree = (instance.subTree = renderComponentRoot(instance));
                if ((true)) {
                    endMeasure(instance, `render`);
                }
                if (el && hydrateNode) {
                    if ((true)) {
                        startMeasure(instance, `hydrate`);
                    }
                    // vnode has adopted host node - perform hydration instead of mount.
                    hydrateNode(initialVNode.el, subTree, instance, parentSuspense);
                    if ((true)) {
                        endMeasure(instance, `hydrate`);
                    }
                }
                else {
                    if ((true)) {
                        startMeasure(instance, `patch`);
                    }
                    patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
                    if ((true)) {
                        endMeasure(instance, `patch`);
                    }
                    initialVNode.el = subTree.el;
                }
                // mounted hook
                if (m) {
                    queuePostRenderEffect(m, parentSuspense);
                }
                // onVnodeMounted
                if ((vnodeHook = props && props.onVnodeMounted)) {
                    const scopedInitialVNode = initialVNode;
                    queuePostRenderEffect(() => {
                        invokeVNodeHook(vnodeHook, parent, scopedInitialVNode);
                    }, parentSuspense);
                }
                // activated hook for keep-alive roots.
                // #1742 activated hook must be accessed after first render
                // since the hook may be injected by a child keep-alive
                const { a } = instance;
                if (a &&
                    initialVNode.shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
                    queuePostRenderEffect(a, parentSuspense);
                }
                instance.isMounted = true;
                // #2458: deference mount-only object parameters to prevent memleaks
                initialVNode = container = anchor = null;
            }
            else {
                // updateComponent
                // This is triggered by mutation of component's own state (next: null)
                // OR parent calling processComponent (next: VNode)
                let { next, bu, u, parent, vnode } = instance;
                let originNext = next;
                let vnodeHook;
                if ((true)) {
                    pushWarningContext(next || instance.vnode);
                }
                if (next) {
                    next.el = vnode.el;
                    updateComponentPreRender(instance, next, optimized);
                }
                else {
                    next = vnode;
                }
                // beforeUpdate hook
                if (bu) {
                    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(bu);
                }
                // onVnodeBeforeUpdate
                if ((vnodeHook = next.props && next.props.onVnodeBeforeUpdate)) {
                    invokeVNodeHook(vnodeHook, parent, next, vnode);
                }
                // render
                if ((true)) {
                    startMeasure(instance, `render`);
                }
                const nextTree = renderComponentRoot(instance);
                if ((true)) {
                    endMeasure(instance, `render`);
                }
                const prevTree = instance.subTree;
                instance.subTree = nextTree;
                if ((true)) {
                    startMeasure(instance, `patch`);
                }
                patch(prevTree, nextTree, 
                // parent may have changed if it's in a teleport
                hostParentNode(prevTree.el), 
                // anchor may have changed if it's in a fragment
                getNextHostNode(prevTree), instance, parentSuspense, isSVG);
                if ((true)) {
                    endMeasure(instance, `patch`);
                }
                next.el = nextTree.el;
                if (originNext === null) {
                    // self-triggered update. In case of HOC, update parent component
                    // vnode el. HOC is indicated by parent instance's subTree pointing
                    // to child component's vnode
                    updateHOCHostEl(instance, nextTree.el);
                }
                // updated hook
                if (u) {
                    queuePostRenderEffect(u, parentSuspense);
                }
                // onVnodeUpdated
                if ((vnodeHook = next.props && next.props.onVnodeUpdated)) {
                    queuePostRenderEffect(() => {
                        invokeVNodeHook(vnodeHook, parent, next, vnode);
                    }, parentSuspense);
                }
                if (true) {
                    devtoolsComponentUpdated(instance);
                }
                if ((true)) {
                    popWarningContext();
                }
            }
        }, ( true) ? createDevEffectOptions(instance) : 0);
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children);
        // props update may have triggered pre-flush watchers.
        // flush them before the render update.
        flushPreFlushCbs(undefined, instance.update);
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        // fast path
        if (patchFlag > 0) {
            if (patchFlag & 128 /* KEYED_FRAGMENT */) {
                // this could be either fully-keyed or mixed (some keyed some not)
                // presence of patchFlag means children are guaranteed to be arrays
                patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                return;
            }
            else if (patchFlag & 256 /* UNKEYED_FRAGMENT */) {
                // unkeyed
                patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                return;
            }
        }
        // children has 3 possibilities: text, array or no children.
        if (shapeFlag & 8 /* TEXT_CHILDREN */) {
            // text children fast path
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                unmountChildren(c1, parentComponent, parentSuspense);
            }
            if (c2 !== c1) {
                hostSetElementText(container, c2);
            }
        }
        else {
            if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) {
                // prev children was array
                if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                    // two arrays, cannot assume anything, do full diff
                    patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
                else {
                    // no new children, just unmount old
                    unmountChildren(c1, parentComponent, parentSuspense, true);
                }
            }
            else {
                // prev children was text OR null
                // new children is array OR null
                if (prevShapeFlag & 8 /* TEXT_CHILDREN */) {
                    hostSetElementText(container, '');
                }
                // mount new if array
                if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                    mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
            }
        }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        c1 = c1 || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
        c2 = c2 || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
            const nextChild = (c2[i] = optimized
                ? cloneIfMounted(c2[i])
                : normalizeVNode(c2[i]));
            patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized);
        }
        if (oldLength > newLength) {
            // remove old
            unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        }
        else {
            // mount new
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, commonLength);
        }
    };
    // can be all-keyed or mixed
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1; // prev ending index
        let e2 = l2 - 1; // next ending index
        // 1. sync from start
        // (a b) c
        // (a b) d e
        while (i <= e1 && i <= e2) {
            const n1 = c1[i];
            const n2 = (c2[i] = optimized
                ? cloneIfMounted(c2[i])
                : normalizeVNode(c2[i]));
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
            }
            else {
                break;
            }
            i++;
        }
        // 2. sync from end
        // a (b c)
        // d e (b c)
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = (c2[e2] = optimized
                ? cloneIfMounted(c2[e2])
                : normalizeVNode(c2[e2]));
            if (isSameVNodeType(n1, n2)) {
                patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
            }
            else {
                break;
            }
            e1--;
            e2--;
        }
        // 3. common sequence + mount
        // (a b)
        // (a b) c
        // i = 2, e1 = 1, e2 = 2
        // (a b)
        // c (a b)
        // i = 0, e1 = -1, e2 = 0
        if (i > e1) {
            if (i <= e2) {
                const nextPos = e2 + 1;
                const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
                while (i <= e2) {
                    patch(null, (c2[i] = optimized
                        ? cloneIfMounted(c2[i])
                        : normalizeVNode(c2[i])), container, anchor, parentComponent, parentSuspense, isSVG);
                    i++;
                }
            }
        }
        // 4. common sequence + unmount
        // (a b) c
        // (a b)
        // i = 2, e1 = 2, e2 = 1
        // a (b c)
        // (b c)
        // i = 0, e1 = 0, e2 = -1
        else if (i > e2) {
            while (i <= e1) {
                unmount(c1[i], parentComponent, parentSuspense, true);
                i++;
            }
        }
        // 5. unknown sequence
        // [i ... e1 + 1]: a b [c d e] f g
        // [i ... e2 + 1]: a b [e d c h] f g
        // i = 2, e1 = 4, e2 = 5
        else {
            const s1 = i; // prev starting index
            const s2 = i; // next starting index
            // 5.1 build key:index map for newChildren
            const keyToNewIndexMap = new Map();
            for (i = s2; i <= e2; i++) {
                const nextChild = (c2[i] = optimized
                    ? cloneIfMounted(c2[i])
                    : normalizeVNode(c2[i]));
                if (nextChild.key != null) {
                    if (( true) && keyToNewIndexMap.has(nextChild.key)) {
                        warn(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
                    }
                    keyToNewIndexMap.set(nextChild.key, i);
                }
            }
            // 5.2 loop through old children left to be patched and try to patch
            // matching nodes & remove nodes that are no longer present
            let j;
            let patched = 0;
            const toBePatched = e2 - s2 + 1;
            let moved = false;
            // used to track whether any node has moved
            let maxNewIndexSoFar = 0;
            // works as Map<newIndex, oldIndex>
            // Note that oldIndex is offset by +1
            // and oldIndex = 0 is a special value indicating the new node has
            // no corresponding old node.
            // used for determining longest stable subsequence
            const newIndexToOldIndexMap = new Array(toBePatched);
            for (i = 0; i < toBePatched; i++)
                newIndexToOldIndexMap[i] = 0;
            for (i = s1; i <= e1; i++) {
                const prevChild = c1[i];
                if (patched >= toBePatched) {
                    // all new children have been patched so this can only be a removal
                    unmount(prevChild, parentComponent, parentSuspense, true);
                    continue;
                }
                let newIndex;
                if (prevChild.key != null) {
                    newIndex = keyToNewIndexMap.get(prevChild.key);
                }
                else {
                    // key-less node, try to locate a key-less node of the same type
                    for (j = s2; j <= e2; j++) {
                        if (newIndexToOldIndexMap[j - s2] === 0 &&
                            isSameVNodeType(prevChild, c2[j])) {
                            newIndex = j;
                            break;
                        }
                    }
                }
                if (newIndex === undefined) {
                    unmount(prevChild, parentComponent, parentSuspense, true);
                }
                else {
                    newIndexToOldIndexMap[newIndex - s2] = i + 1;
                    if (newIndex >= maxNewIndexSoFar) {
                        maxNewIndexSoFar = newIndex;
                    }
                    else {
                        moved = true;
                    }
                    patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, optimized);
                    patched++;
                }
            }
            // 5.3 move and mount
            // generate longest stable subsequence only when nodes have moved
            const increasingNewIndexSequence = moved
                ? getSequence(newIndexToOldIndexMap)
                : _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
            j = increasingNewIndexSequence.length - 1;
            // looping backwards so that we can use last patched node as anchor
            for (i = toBePatched - 1; i >= 0; i--) {
                const nextIndex = s2 + i;
                const nextChild = c2[nextIndex];
                const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
                if (newIndexToOldIndexMap[i] === 0) {
                    // mount new
                    patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG);
                }
                else if (moved) {
                    // move if:
                    // There is no stable subsequence (e.g. a reverse)
                    // OR current node is not among the stable sequence
                    if (j < 0 || i !== increasingNewIndexSequence[j]) {
                        move(nextChild, container, anchor, 2 /* REORDER */);
                    }
                    else {
                        j--;
                    }
                }
            }
        }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el, type, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6 /* COMPONENT */) {
            move(vnode.component.subTree, container, anchor, moveType);
            return;
        }
        if ( shapeFlag & 128 /* SUSPENSE */) {
            vnode.suspense.move(container, anchor, moveType);
            return;
        }
        if (shapeFlag & 64 /* TELEPORT */) {
            type.move(vnode, container, anchor, internals);
            return;
        }
        if (type === Fragment) {
            hostInsert(el, container, anchor);
            for (let i = 0; i < children.length; i++) {
                move(children[i], container, anchor, moveType);
            }
            hostInsert(vnode.anchor, container, anchor);
            return;
        }
        if (type === Static) {
            moveStaticNode(vnode, container, anchor);
            return;
        }
        // single nodes
        const needTransition = moveType !== 2 /* REORDER */ &&
            shapeFlag & 1 /* ELEMENT */ &&
            transition;
        if (needTransition) {
            if (moveType === 0 /* ENTER */) {
                transition.beforeEnter(el);
                hostInsert(el, container, anchor);
                queuePostRenderEffect(() => transition.enter(el), parentSuspense);
            }
            else {
                const { leave, delayLeave, afterLeave } = transition;
                const remove = () => hostInsert(el, container, anchor);
                const performLeave = () => {
                    leave(el, () => {
                        remove();
                        afterLeave && afterLeave();
                    });
                };
                if (delayLeave) {
                    delayLeave(el, remove, performLeave);
                }
                else {
                    performLeave();
                }
            }
        }
        else {
            hostInsert(el, container, anchor);
        }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
        // unset ref
        if (ref != null) {
            setRef(ref, null, parentSuspense, null);
        }
        if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
            parentComponent.ctx.deactivate(vnode);
            return;
        }
        const shouldInvokeDirs = shapeFlag & 1 /* ELEMENT */ && dirs;
        let vnodeHook;
        if ((vnodeHook = props && props.onVnodeBeforeUnmount)) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6 /* COMPONENT */) {
            unmountComponent(vnode.component, parentSuspense, doRemove);
        }
        else {
            if ( shapeFlag & 128 /* SUSPENSE */) {
                vnode.suspense.unmount(parentSuspense, doRemove);
                return;
            }
            if (shouldInvokeDirs) {
                invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
            }
            if (dynamicChildren &&
                // #1153: fast path should not be taken for non-stable (v-for) fragments
                (type !== Fragment ||
                    (patchFlag > 0 && patchFlag & 64 /* STABLE_FRAGMENT */))) {
                // fast path for block nodes: only need to unmount dynamic children.
                unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
            }
            else if ((type === Fragment &&
                (patchFlag & 128 /* KEYED_FRAGMENT */ ||
                    patchFlag & 256 /* UNKEYED_FRAGMENT */)) ||
                (!optimized && shapeFlag & 16 /* ARRAY_CHILDREN */)) {
                unmountChildren(children, parentComponent, parentSuspense);
            }
            // an unmounted teleport should always remove its children if not disabled
            if (shapeFlag & 64 /* TELEPORT */ &&
                (doRemove || !isTeleportDisabled(vnode.props))) {
                vnode.type.remove(vnode, internals);
            }
            if (doRemove) {
                remove(vnode);
            }
        }
        if ((vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
            queuePostRenderEffect(() => {
                vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
                shouldInvokeDirs &&
                    invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
            }, parentSuspense);
        }
    };
    const remove = vnode => {
        const { type, el, anchor, transition } = vnode;
        if (type === Fragment) {
            removeFragment(el, anchor);
            return;
        }
        if (type === Static) {
            removeStaticNode(vnode);
            return;
        }
        const performRemove = () => {
            hostRemove(el);
            if (transition && !transition.persisted && transition.afterLeave) {
                transition.afterLeave();
            }
        };
        if (vnode.shapeFlag & 1 /* ELEMENT */ &&
            transition &&
            !transition.persisted) {
            const { leave, delayLeave } = transition;
            const performLeave = () => leave(el, performRemove);
            if (delayLeave) {
                delayLeave(vnode.el, performRemove, performLeave);
            }
            else {
                performLeave();
            }
        }
        else {
            performRemove();
        }
    };
    const removeFragment = (cur, end) => {
        // For fragments, directly remove all contained DOM nodes.
        // (fragment child nodes cannot have transition)
        let next;
        while (cur !== end) {
            next = hostNextSibling(cur);
            hostRemove(cur);
            cur = next;
        }
        hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
        if (( true) && instance.type.__hmrId) {
            unregisterHMR(instance);
        }
        const { bum, effects, update, subTree, um } = instance;
        // beforeUnmount hook
        if (bum) {
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(bum);
        }
        if (effects) {
            for (let i = 0; i < effects.length; i++) {
                (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.stop)(effects[i]);
            }
        }
        // update may be null if a component is unmounted before its async
        // setup has resolved.
        if (update) {
            (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.stop)(update);
            unmount(subTree, instance, parentSuspense, doRemove);
        }
        // unmounted hook
        if (um) {
            queuePostRenderEffect(um, parentSuspense);
        }
        queuePostRenderEffect(() => {
            instance.isUnmounted = true;
        }, parentSuspense);
        // A component with async dep inside a pending suspense is unmounted before
        // its async dep resolves. This should remove the dep from the suspense, and
        // cause the suspense to resolve immediately if that was the last dep.
        if (
            parentSuspense &&
            parentSuspense.pendingBranch &&
            !parentSuspense.isUnmounted &&
            instance.asyncDep &&
            !instance.asyncResolved &&
            instance.suspenseId === parentSuspense.pendingId) {
            parentSuspense.deps--;
            if (parentSuspense.deps === 0) {
                parentSuspense.resolve();
            }
        }
        if (true) {
            devtoolsComponentRemoved(instance);
        }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
            unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
    };
    const getNextHostNode = vnode => {
        if (vnode.shapeFlag & 6 /* COMPONENT */) {
            return getNextHostNode(vnode.component.subTree);
        }
        if ( vnode.shapeFlag & 128 /* SUSPENSE */) {
            return vnode.suspense.next();
        }
        return hostNextSibling((vnode.anchor || vnode.el));
    };
    const render = (vnode, container) => {
        if (vnode == null) {
            if (container._vnode) {
                unmount(container._vnode, null, null, true);
            }
        }
        else {
            patch(container._vnode || null, vnode, container);
        }
        flushPostFlushCbs();
        container._vnode = vnode;
    };
    const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
        [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
    };
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7 /* VNODE_HOOK */, [
        vnode,
        prevVNode
    ]);
}
/**
 * #1156
 * When a component is HMR-enabled, we need to make sure that all static nodes
 * inside a block also inherit the DOM element from the previous tree so that
 * HMR updates (which are full updates) can retrieve the element for patching.
 *
 * #2080
 * Inside keyed `template` fragment static children, if a fragment is moved,
 * the children will always moved so that need inherit el form previous nodes
 * to ensure correct moved position.
 */
function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(ch1) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
            // this is only called in the optimized path so array children are
            // guaranteed to be vnodes
            const c1 = ch1[i];
            let c2 = ch2[i];
            if (c2.shapeFlag & 1 /* ELEMENT */ && !c2.dynamicChildren) {
                if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* HYDRATE_EVENTS */) {
                    c2 = ch2[i] = cloneIfMounted(ch2[i]);
                    c2.el = c1.el;
                }
                if (!shallow)
                    traverseStaticChildren(c1, c2);
            }
            // also inherit for comment nodes, but not placeholders (e.g. v-if which
            // would have received .el during block patch)
            if (( true) && c2.type === Comment && !c2.el) {
                c2.el = c1.el;
            }
        }
    }
}
// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
            j = result[result.length - 1];
            if (arr[j] < arrI) {
                p[i] = j;
                result.push(i);
                continue;
            }
            u = 0;
            v = result.length - 1;
            while (u < v) {
                c = ((u + v) / 2) | 0;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                }
                else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                if (u > 0) {
                    p[i] = result[u - 1];
                }
                result[u] = i;
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}

const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === '');
const isTargetSVG = (target) => typeof SVGElement !== 'undefined' && target instanceof SVGElement;
const resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(targetSelector)) {
        if (!select) {
            ( true) &&
                warn(`Current renderer does not support string target for Teleports. ` +
                    `(missing querySelector renderer option)`);
            return null;
        }
        else {
            const target = select(targetSelector);
            if (!target) {
                ( true) &&
                    warn(`Failed to locate Teleport target with selector "${targetSelector}". ` +
                        `Note the target element must exist before the component is mounted - ` +
                        `i.e. the target cannot be rendered by the component itself, and ` +
                        `ideally should be outside of the entire Vue component tree.`);
            }
            return target;
        }
    }
    else {
        if (( true) && !targetSelector && !isTeleportDisabled(props)) {
            warn(`Invalid Teleport target: ${targetSelector}`);
        }
        return targetSelector;
    }
};
const TeleportImpl = {
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals) {
        const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment } } = internals;
        const disabled = isTeleportDisabled(n2.props);
        const { shapeFlag, children } = n2;
        if (n1 == null) {
            // insert anchors in the main view
            const placeholder = (n2.el = ( true)
                ? createComment('teleport start')
                : 0);
            const mainAnchor = (n2.anchor = ( true)
                ? createComment('teleport end')
                : 0);
            insert(placeholder, container, anchor);
            insert(mainAnchor, container, anchor);
            const target = (n2.target = resolveTarget(n2.props, querySelector));
            const targetAnchor = (n2.targetAnchor = createText(''));
            if (target) {
                insert(targetAnchor, target);
                // #2652 we could be teleporting from a non-SVG tree into an SVG tree
                isSVG = isSVG || isTargetSVG(target);
            }
            else if (( true) && !disabled) {
                warn('Invalid Teleport target on mount:', target, `(${typeof target})`);
            }
            const mount = (container, anchor) => {
                // Teleport *always* has Array children. This is enforced in both the
                // compiler and vnode children normalization.
                if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                    mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
                }
            };
            if (disabled) {
                mount(container, mainAnchor);
            }
            else if (target) {
                mount(target, targetAnchor);
            }
        }
        else {
            // update content
            n2.el = n1.el;
            const mainAnchor = (n2.anchor = n1.anchor);
            const target = (n2.target = n1.target);
            const targetAnchor = (n2.targetAnchor = n1.targetAnchor);
            const wasDisabled = isTeleportDisabled(n1.props);
            const currentContainer = wasDisabled ? container : target;
            const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
            isSVG = isSVG || isTargetSVG(target);
            if (n2.dynamicChildren) {
                // fast path when the teleport happens to be a block root
                patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG);
                // even in block tree mode we need to make sure all root-level nodes
                // in the teleport inherit previous DOM references so that they can
                // be moved in future patches.
                traverseStaticChildren(n1, n2, true);
            }
            else if (!optimized) {
                patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG);
            }
            if (disabled) {
                if (!wasDisabled) {
                    // enabled -> disabled
                    // move into main container
                    moveTeleport(n2, container, mainAnchor, internals, 1 /* TOGGLE */);
                }
            }
            else {
                // target changed
                if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
                    const nextTarget = (n2.target = resolveTarget(n2.props, querySelector));
                    if (nextTarget) {
                        moveTeleport(n2, nextTarget, null, internals, 0 /* TARGET_CHANGE */);
                    }
                    else if ((true)) {
                        warn('Invalid Teleport target on update:', target, `(${typeof target})`);
                    }
                }
                else if (wasDisabled) {
                    // disabled -> enabled
                    // move into teleport target
                    moveTeleport(n2, target, targetAnchor, internals, 1 /* TOGGLE */);
                }
            }
        }
    },
    remove(vnode, { r: remove, o: { remove: hostRemove } }) {
        const { shapeFlag, children, anchor } = vnode;
        hostRemove(anchor);
        if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            for (let i = 0; i < children.length; i++) {
                remove(children[i]);
            }
        }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2 /* REORDER */) {
    // move target anchor if this is a target change.
    if (moveType === 0 /* TARGET_CHANGE */) {
        insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2 /* REORDER */;
    // move main view anchor if this is a re-order.
    if (isReorder) {
        insert(el, container, parentAnchor);
    }
    // if this is a re-order and teleport is enabled (content is in target)
    // do not move children. So the opposite is: only move children if this
    // is not a reorder, or the teleport is disabled
    if (!isReorder || isTeleportDisabled(props)) {
        // Teleport has either Array children or no children.
        if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            for (let i = 0; i < children.length; i++) {
                move(children[i], container, parentAnchor, 2 /* REORDER */);
            }
        }
    }
    // move main view anchor if this is a re-order.
    if (isReorder) {
        insert(anchor, container, parentAnchor);
    }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, optimized, { o: { nextSibling, parentNode, querySelector } }, hydrateChildren) {
    const target = (vnode.target = resolveTarget(vnode.props, querySelector));
    if (target) {
        // if multiple teleports rendered to the same target element, we need to
        // pick up from where the last teleport finished instead of the first node
        const targetNode = target._lpa || target.firstChild;
        if (vnode.shapeFlag & 16 /* ARRAY_CHILDREN */) {
            if (isTeleportDisabled(vnode.props)) {
                vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, optimized);
                vnode.targetAnchor = targetNode;
            }
            else {
                vnode.anchor = nextSibling(node);
                vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, optimized);
            }
            target._lpa =
                vnode.targetAnchor && nextSibling(vnode.targetAnchor);
        }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
}
// Force-casted public typing for h and TSX props inference
const Teleport = TeleportImpl;

const COMPONENTS = 'components';
const DIRECTIVES = 'directives';
/**
 * @private
 */
function resolveComponent(name) {
    return resolveAsset(COMPONENTS, name) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol();
/**
 * @private
 */
function resolveDynamicComponent(component) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(component)) {
        return resolveAsset(COMPONENTS, component, false) || component;
    }
    else {
        // invalid types will fallthrough to createVNode and raise warning
        return (component || NULL_DYNAMIC_COMPONENT);
    }
}
/**
 * @private
 */
function resolveDirective(name) {
    return resolveAsset(DIRECTIVES, name);
}
// implementation
function resolveAsset(type, name, warnMissing = true) {
    const instance = currentRenderingInstance || currentInstance;
    if (instance) {
        const Component = instance.type;
        // self name has highest priority
        if (type === COMPONENTS) {
            // special self referencing call generated by compiler
            // inferred from SFC filename
            if (name === `_self`) {
                return Component;
            }
            const selfName = getComponentName(Component);
            if (selfName &&
                (selfName === name ||
                    selfName === (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name) ||
                    selfName === (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name)))) {
                return Component;
            }
        }
        const res = 
        // local registration
        // check instance[type] first for components with mixin or extends.
        resolve(instance[type] || Component[type], name) ||
            // global registration
            resolve(instance.appContext[type], name);
        if (( true) && warnMissing && !res) {
            warn(`Failed to resolve ${type.slice(0, -1)}: ${name}`);
        }
        return res;
    }
    else if ((true)) {
        warn(`resolve${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)(type.slice(0, -1))} ` +
            `can only be used in render() or setup().`);
    }
}
function resolve(registry, name) {
    return (registry &&
        (registry[name] ||
            registry[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name)] ||
            registry[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name))]));
}

const Fragment = Symbol(( true) ? 'Fragment' : 0);
const Text = Symbol(( true) ? 'Text' : 0);
const Comment = Symbol(( true) ? 'Comment' : 0);
const Static = Symbol(( true) ? 'Static' : 0);
// Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).
const blockStack = [];
let currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */
function openBlock(disableTracking = false) {
    blockStack.push((currentBlock = disableTracking ? null : []));
}
function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
}
// Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)
let shouldTrack = 1;
/**
 * Block tracking sometimes needs to be disabled, for example during the
 * creation of a tree that needs to be cached by v-once. The compiler generates
 * code like this:
 *
 * ``` js
 * _cache[1] || (
 *   setBlockTracking(-1),
 *   _cache[1] = createVNode(...),
 *   setBlockTracking(1),
 *   _cache[1]
 * )
 * ```
 *
 * @private
 */
function setBlockTracking(value) {
    shouldTrack += value;
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */
function createBlock(type, props, children, patchFlag, dynamicProps) {
    const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true /* isBlock: prevent a block from tracking itself */);
    // save current block children on the block vnode
    vnode.dynamicChildren = currentBlock || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
    // close block
    closeBlock();
    // a block is always going to be patched, so track it as a child of its
    // parent block
    if (shouldTrack > 0 && currentBlock) {
        currentBlock.push(vnode);
    }
    return vnode;
}
function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
    if (( true) &&
        n2.shapeFlag & 6 /* COMPONENT */ &&
        hmrDirtyComponents.has(n2.type)) {
        // HMR only: if the component has been hot-updated, force a reload.
        return false;
    }
    return n1.type === n2.type && n1.key === n2.key;
}
let vnodeArgsTransformer;
/**
 * Internal API for registering an arguments transform for createVNode
 * used for creating stubs in the test-utils
 * It is *internal* but needs to be exposed for test-utils to pick up proper
 * typings
 */
function transformVNodeArgs(transformer) {
    vnodeArgsTransformer = transformer;
}
const createVNodeWithArgsTransform = (...args) => {
    return _createVNode(...(vnodeArgsTransformer
        ? vnodeArgsTransformer(args, currentRenderingInstance)
        : args));
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({ ref }) => {
    return (ref != null
        ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(ref) || (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(ref) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(ref)
            ? { i: currentRenderingInstance, r: ref }
            : ref
        : null);
};
const createVNode = (( true)
    ? createVNodeWithArgsTransform
    : 0);
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
        if (( true) && !type) {
            warn(`Invalid vnode type when creating vnode: ${type}.`);
        }
        type = Comment;
    }
    if (isVNode(type)) {
        // createVNode receiving an existing vnode. This happens in cases like
        // <component :is="vnode"/>
        // #2078 make sure to merge refs during the clone instead of overwriting it
        const cloned = cloneVNode(type, props, true /* mergeRef: true */);
        if (children) {
            normalizeChildren(cloned, children);
        }
        return cloned;
    }
    // class component normalization.
    if (isClassComponent(type)) {
        type = type.__vccOpts;
    }
    // class & style normalization.
    if (props) {
        // for reactive or proxy objects, we need to clone it to enable mutation.
        if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy)(props) || InternalObjectKey in props) {
            props = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, props);
        }
        let { class: klass, style } = props;
        if (klass && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(klass)) {
            props.class = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeClass)(klass);
        }
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(style)) {
            // reactive state objects need to be cloned since they are likely to be
            // mutated
            if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy)(style) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(style)) {
                style = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, style);
            }
            props.style = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeStyle)(style);
        }
    }
    // encode the vnode type information into a bitmap
    const shapeFlag = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(type)
        ? 1 /* ELEMENT */
        :  isSuspense(type)
            ? 128 /* SUSPENSE */
            : isTeleport(type)
                ? 64 /* TELEPORT */
                : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(type)
                    ? 4 /* STATEFUL_COMPONENT */
                    : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(type)
                        ? 2 /* FUNCTIONAL_COMPONENT */
                        : 0;
    if (( true) && shapeFlag & 4 /* STATEFUL_COMPONENT */ && (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy)(type)) {
        type = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(type);
        warn(`Vue received a Component which was made a reactive object. This can ` +
            `lead to unnecessary performance overhead, and should be avoided by ` +
            `marking the component with \`markRaw\` or using \`shallowRef\` ` +
            `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
    }
    const vnode = {
        __v_isVNode: true,
        ["__v_skip" /* SKIP */]: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        children: null,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
    };
    // validate key
    if (( true) && vnode.key !== vnode.key) {
        warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    normalizeChildren(vnode, children);
    // normalize suspense children
    if ( shapeFlag & 128 /* SUSPENSE */) {
        const { content, fallback } = normalizeSuspenseChildren(vnode);
        vnode.ssContent = content;
        vnode.ssFallback = fallback;
    }
    if (shouldTrack > 0 &&
        // avoid a block node from tracking itself
        !isBlockNode &&
        // has current parent block
        currentBlock &&
        // presence of a patch flag indicates this node needs patching on updates.
        // component nodes also should always be patched, because even if the
        // component doesn't need to update, it needs to persist the instance on to
        // the next vnode so that it can be properly unmounted later.
        (patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
        // the EVENTS flag is only for hydration and if it is the only flag, the
        // vnode should not be considered dynamic due to handler caching.
        patchFlag !== 32 /* HYDRATE_EVENTS */) {
        currentBlock.push(vnode);
    }
    return vnode;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
    // This is intentionally NOT using spread or extend to avoid the runtime
    // key enumeration cost.
    const { props, ref, patchFlag } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    return {
        __v_isVNode: true,
        ["__v_skip" /* SKIP */]: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref
            ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                // if the vnode itself already has a ref, cloneVNode will need to merge
                // the refs so the single vnode can be set on multiple refs
                mergeRef && ref
                    ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(ref)
                        ? ref.concat(normalizeRef(extraProps))
                        : [ref, normalizeRef(extraProps)]
                    : normalizeRef(extraProps)
            : ref,
        scopeId: vnode.scopeId,
        children: vnode.children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: perserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment
            ? patchFlag === -1 // hoisted node
                ? 16 /* FULL_PROPS */
                : patchFlag | 16 /* FULL_PROPS */
            : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor
    };
}
/**
 * @private
 */
function createTextVNode(text = ' ', flag = 0) {
    return createVNode(Text, null, text, flag);
}
/**
 * @private
 */
function createStaticVNode(content, numberOfNodes) {
    // A static vnode can contain multiple stringified elements, and the number
    // of elements is necessary for hydration.
    const vnode = createVNode(Static, null, content);
    vnode.staticCount = numberOfNodes;
    return vnode;
}
/**
 * @private
 */
function createCommentVNode(text = '', 
// when used as the v-else branch, the comment node must be created as a
// block to ensure correct updates.
asBlock = false) {
    return asBlock
        ? (openBlock(), createBlock(Comment, null, text))
        : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
    if (child == null || typeof child === 'boolean') {
        // empty placeholder
        return createVNode(Comment);
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(child)) {
        // fragment
        return createVNode(Fragment, null, child);
    }
    else if (typeof child === 'object') {
        // already vnode, this should be the most common since compiled templates
        // always produce all-vnode children arrays
        return child.el === null ? child : cloneVNode(child);
    }
    else {
        // strings and numbers
        return createVNode(Text, null, String(child));
    }
}
// optimized normalization for template-compiled render fns
function cloneIfMounted(child) {
    return child.el === null ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
        children = null;
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(children)) {
        type = 16 /* ARRAY_CHILDREN */;
    }
    else if (typeof children === 'object') {
        if (shapeFlag & 1 /* ELEMENT */ || shapeFlag & 64 /* TELEPORT */) {
            // Normalize slot to plain children for plain element and Teleport
            const slot = children.default;
            if (slot) {
                // _c marker is added by withCtx() indicating this is a compiled slot
                slot._c && setCompiledSlotRendering(1);
                normalizeChildren(vnode, slot());
                slot._c && setCompiledSlotRendering(-1);
            }
            return;
        }
        else {
            type = 32 /* SLOTS_CHILDREN */;
            const slotFlag = children._;
            if (!slotFlag && !(InternalObjectKey in children)) {
                children._ctx = currentRenderingInstance;
            }
            else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
                // a child component receives forwarded slots from the parent.
                // its slot type is determined by its parent's slot type.
                if (currentRenderingInstance.vnode.patchFlag & 1024 /* DYNAMIC_SLOTS */) {
                    children._ = 2 /* DYNAMIC */;
                    vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                }
                else {
                    children._ = 1 /* STABLE */;
                }
            }
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type = 32 /* SLOTS_CHILDREN */;
    }
    else {
        children = String(children);
        // force teleport children to array so it can be moved around
        if (shapeFlag & 64 /* TELEPORT */) {
            type = 16 /* ARRAY_CHILDREN */;
            children = [createTextVNode(children)];
        }
        else {
            type = 8 /* TEXT_CHILDREN */;
        }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
}
function mergeProps(...args) {
    const ret = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, args[0]);
    for (let i = 1; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
            if (key === 'class') {
                if (ret.class !== toMerge.class) {
                    ret.class = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeClass)([ret.class, toMerge.class]);
                }
            }
            else if (key === 'style') {
                ret.style = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeStyle)([ret.style, toMerge.style]);
            }
            else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
                const existing = ret[key];
                const incoming = toMerge[key];
                if (existing !== incoming) {
                    ret[key] = existing
                        ? [].concat(existing, toMerge[key])
                        : incoming;
                }
            }
            else if (key !== '') {
                ret[key] = toMerge[key];
            }
        }
    }
    return ret;
}

function provide(key, value) {
    if (!currentInstance) {
        if ((true)) {
            warn(`provide() can only be used inside setup().`);
        }
    }
    else {
        let provides = currentInstance.provides;
        // by default an instance inherits its parent's provides object
        // but when it needs to provide values of its own, it creates its
        // own provides object using parent provides object as prototype.
        // this way in `inject` we can simply look up injections from direct
        // parent and let the prototype chain do the work.
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        // TS doesn't allow symbol as index type
        provides[key] = value;
    }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
    // fallback to `currentRenderingInstance` so that this can be called in
    // a functional component
    const instance = currentInstance || currentRenderingInstance;
    if (instance) {
        // #2400
        // to support `app.use` plugins,
        // fallback to appContext's `provides` if the intance is at root
        const provides = instance.parent == null
            ? instance.vnode.appContext && instance.vnode.appContext.provides
            : instance.parent.provides;
        if (provides && key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
        }
        else if (arguments.length > 1) {
            return treatDefaultAsFactory && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(defaultValue)
                ? defaultValue()
                : defaultValue;
        }
        else if ((true)) {
            warn(`injection "${String(key)}" not found.`);
        }
    }
    else if ((true)) {
        warn(`inject() can only be used inside setup() or functional components.`);
    }
}

function createDuplicateChecker() {
    const cache = Object.create(null);
    return (type, key) => {
        if (cache[key]) {
            warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
        }
        else {
            cache[key] = type;
        }
    };
}
let isInBeforeCreate = false;
function applyOptions(instance, options, deferredData = [], deferredWatch = [], deferredProvide = [], asMixin = false) {
    const { 
    // composition
    mixins, extends: extendsOptions, 
    // state
    data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, 
    // assets
    components, directives, 
    // lifecycle
    beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, 
    // public API
    expose } = options;
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    const globalMixins = instance.appContext.mixins;
    if (asMixin && render && instance.render === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP) {
        instance.render = render;
    }
    // applyOptions is called non-as-mixin once per instance
    if (!asMixin) {
        isInBeforeCreate = true;
        callSyncHook('beforeCreate', "bc" /* BEFORE_CREATE */, options, instance, globalMixins);
        isInBeforeCreate = false;
        // global mixins are applied first
        applyMixins(instance, globalMixins, deferredData, deferredWatch, deferredProvide);
    }
    // extending a base component...
    if (extendsOptions) {
        applyOptions(instance, extendsOptions, deferredData, deferredWatch, deferredProvide, true);
    }
    // local mixins
    if (mixins) {
        applyMixins(instance, mixins, deferredData, deferredWatch, deferredProvide);
    }
    const checkDuplicateProperties = ( true) ? createDuplicateChecker() : 0;
    if ((true)) {
        const [propsOptions] = instance.propsOptions;
        if (propsOptions) {
            for (const key in propsOptions) {
                checkDuplicateProperties("Props" /* PROPS */, key);
            }
        }
    }
    // options initialization order (to be consistent with Vue 2):
    // - props (already done outside of this function)
    // - inject
    // - methods
    // - data (deferred since it relies on `this` access)
    // - computed
    // - watch (deferred since it relies on `this` access)
    if (injectOptions) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(injectOptions)) {
            for (let i = 0; i < injectOptions.length; i++) {
                const key = injectOptions[i];
                ctx[key] = inject(key);
                if ((true)) {
                    checkDuplicateProperties("Inject" /* INJECT */, key);
                }
            }
        }
        else {
            for (const key in injectOptions) {
                const opt = injectOptions[key];
                if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(opt)) {
                    ctx[key] = inject(opt.from || key, opt.default, true /* treat default function as factory */);
                }
                else {
                    ctx[key] = inject(opt);
                }
                if ((true)) {
                    checkDuplicateProperties("Inject" /* INJECT */, key);
                }
            }
        }
    }
    if (methods) {
        for (const key in methods) {
            const methodHandler = methods[key];
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(methodHandler)) {
                ctx[key] = methodHandler.bind(publicThis);
                if ((true)) {
                    checkDuplicateProperties("Methods" /* METHODS */, key);
                }
            }
            else if ((true)) {
                warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. ` +
                    `Did you reference the function correctly?`);
            }
        }
    }
    if (!asMixin) {
        if (deferredData.length) {
            deferredData.forEach(dataFn => resolveData(instance, dataFn, publicThis));
        }
        if (dataOptions) {
            // @ts-ignore dataOptions is not fully type safe
            resolveData(instance, dataOptions, publicThis);
        }
        if ((true)) {
            const rawData = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(instance.data);
            for (const key in rawData) {
                checkDuplicateProperties("Data" /* DATA */, key);
                // expose data on ctx during dev
                if (key[0] !== '$' && key[0] !== '_') {
                    Object.defineProperty(ctx, key, {
                        configurable: true,
                        enumerable: true,
                        get: () => rawData[key],
                        set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
                    });
                }
            }
        }
    }
    else if (dataOptions) {
        deferredData.push(dataOptions);
    }
    if (computedOptions) {
        for (const key in computedOptions) {
            const opt = computedOptions[key];
            const get = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt)
                ? opt.bind(publicThis, publicThis)
                : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt.get)
                    ? opt.get.bind(publicThis, publicThis)
                    : _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
            if (( true) && get === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP) {
                warn(`Computed property "${key}" has no getter.`);
            }
            const set = !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt.set)
                ? opt.set.bind(publicThis)
                : ( true)
                    ? () => {
                        warn(`Write operation failed: computed property "${key}" is readonly.`);
                    }
                    : 0;
            const c = computed({
                get,
                set
            });
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: () => c.value,
                set: v => (c.value = v)
            });
            if ((true)) {
                checkDuplicateProperties("Computed" /* COMPUTED */, key);
            }
        }
    }
    if (watchOptions) {
        deferredWatch.push(watchOptions);
    }
    if (!asMixin && deferredWatch.length) {
        deferredWatch.forEach(watchOptions => {
            for (const key in watchOptions) {
                createWatcher(watchOptions[key], ctx, publicThis, key);
            }
        });
    }
    if (provideOptions) {
        deferredProvide.push(provideOptions);
    }
    if (!asMixin && deferredProvide.length) {
        deferredProvide.forEach(provideOptions => {
            const provides = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(provideOptions)
                ? provideOptions.call(publicThis)
                : provideOptions;
            Reflect.ownKeys(provides).forEach(key => {
                provide(key, provides[key]);
            });
        });
    }
    // asset options.
    // To reduce memory usage, only components with mixins or extends will have
    // resolved asset registry attached to instance.
    if (asMixin) {
        if (components) {
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(instance.components ||
                (instance.components = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, instance.type.components)), components);
        }
        if (directives) {
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(instance.directives ||
                (instance.directives = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, instance.type.directives)), directives);
        }
    }
    // lifecycle options
    if (!asMixin) {
        callSyncHook('created', "c" /* CREATED */, options, instance, globalMixins);
    }
    if (beforeMount) {
        onBeforeMount(beforeMount.bind(publicThis));
    }
    if (mounted) {
        onMounted(mounted.bind(publicThis));
    }
    if (beforeUpdate) {
        onBeforeUpdate(beforeUpdate.bind(publicThis));
    }
    if (updated) {
        onUpdated(updated.bind(publicThis));
    }
    if (activated) {
        onActivated(activated.bind(publicThis));
    }
    if (deactivated) {
        onDeactivated(deactivated.bind(publicThis));
    }
    if (errorCaptured) {
        onErrorCaptured(errorCaptured.bind(publicThis));
    }
    if (renderTracked) {
        onRenderTracked(renderTracked.bind(publicThis));
    }
    if (renderTriggered) {
        onRenderTriggered(renderTriggered.bind(publicThis));
    }
    if (( true) && beforeDestroy) {
        warn(`\`beforeDestroy\` has been renamed to \`beforeUnmount\`.`);
    }
    if (beforeUnmount) {
        onBeforeUnmount(beforeUnmount.bind(publicThis));
    }
    if (( true) && destroyed) {
        warn(`\`destroyed\` has been renamed to \`unmounted\`.`);
    }
    if (unmounted) {
        onUnmounted(unmounted.bind(publicThis));
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(expose)) {
        if (!asMixin) {
            if (expose.length) {
                const exposed = instance.exposed || (instance.exposed = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs)({}));
                expose.forEach(key => {
                    exposed[key] = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRef)(publicThis, key);
                });
            }
            else if (!instance.exposed) {
                instance.exposed = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
            }
        }
        else if ((true)) {
            warn(`The \`expose\` option is ignored when used in mixins.`);
        }
    }
}
function callSyncHook(name, type, options, instance, globalMixins) {
    callHookFromMixins(name, type, globalMixins, instance);
    const { extends: base, mixins } = options;
    if (base) {
        callHookFromExtends(name, type, base, instance);
    }
    if (mixins) {
        callHookFromMixins(name, type, mixins, instance);
    }
    const selfHook = options[name];
    if (selfHook) {
        callWithAsyncErrorHandling(selfHook.bind(instance.proxy), instance, type);
    }
}
function callHookFromExtends(name, type, base, instance) {
    if (base.extends) {
        callHookFromExtends(name, type, base.extends, instance);
    }
    const baseHook = base[name];
    if (baseHook) {
        callWithAsyncErrorHandling(baseHook.bind(instance.proxy), instance, type);
    }
}
function callHookFromMixins(name, type, mixins, instance) {
    for (let i = 0; i < mixins.length; i++) {
        const chainedMixins = mixins[i].mixins;
        if (chainedMixins) {
            callHookFromMixins(name, type, chainedMixins, instance);
        }
        const fn = mixins[i][name];
        if (fn) {
            callWithAsyncErrorHandling(fn.bind(instance.proxy), instance, type);
        }
    }
}
function applyMixins(instance, mixins, deferredData, deferredWatch, deferredProvide) {
    for (let i = 0; i < mixins.length; i++) {
        applyOptions(instance, mixins[i], deferredData, deferredWatch, deferredProvide, true);
    }
}
function resolveData(instance, dataFn, publicThis) {
    if (( true) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(dataFn)) {
        warn(`The data option must be a function. ` +
            `Plain object usage is no longer supported.`);
    }
    const data = dataFn.call(publicThis, publicThis);
    if (( true) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(data)) {
        warn(`data() returned a Promise - note data() cannot be async; If you ` +
            `intend to perform data fetching before component renders, use ` +
            `async setup() + <Suspense>.`);
    }
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(data)) {
        ( true) && warn(`data() should return an object.`);
    }
    else if (instance.data === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
        instance.data = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.reactive)(data);
    }
    else {
        // existing data: this is a mixin or extends.
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(instance.data, data);
    }
}
function createWatcher(raw, ctx, publicThis, key) {
    const getter = key.includes('.')
        ? createPathGetter(publicThis, key)
        : () => publicThis[key];
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(raw)) {
        const handler = ctx[raw];
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(handler)) {
            watch(getter, handler);
        }
        else if ((true)) {
            warn(`Invalid watch handler specified by key "${raw}"`, handler);
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(raw)) {
        watch(getter, raw.bind(publicThis));
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(raw)) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
            raw.forEach(r => createWatcher(r, ctx, publicThis, key));
        }
        else {
            const handler = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(raw.handler)
                ? raw.handler.bind(publicThis)
                : ctx[raw.handler];
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(handler)) {
                watch(getter, handler, raw);
            }
            else if ((true)) {
                warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
            }
        }
    }
    else if ((true)) {
        warn(`Invalid watch option: "${key}"`, raw);
    }
}
function createPathGetter(ctx, path) {
    const segments = path.split('.');
    return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
            cur = cur[segments[i]];
        }
        return cur;
    };
}
function resolveMergedOptions(instance) {
    const raw = instance.type;
    const { __merged, mixins, extends: extendsOptions } = raw;
    if (__merged)
        return __merged;
    const globalMixins = instance.appContext.mixins;
    if (!globalMixins.length && !mixins && !extendsOptions)
        return raw;
    const options = {};
    globalMixins.forEach(m => mergeOptions(options, m, instance));
    mergeOptions(options, raw, instance);
    return (raw.__merged = options);
}
function mergeOptions(to, from, instance) {
    const strats = instance.appContext.config.optionMergeStrategies;
    const { mixins, extends: extendsOptions } = from;
    extendsOptions && mergeOptions(to, extendsOptions, instance);
    mixins &&
        mixins.forEach((m) => mergeOptions(to, m, instance));
    for (const key in from) {
        if (strats && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(strats, key)) {
            to[key] = strats[key](to[key], from[key], instance.proxy, key);
        }
        else {
            to[key] = from[key];
        }
    }
}

/**
 * #2437 In Vue 3, functional components do not have a public instance proxy but
 * they exist in the internal parent chain. For code that relies on traversing
 * public $parent chains, skip functional ones and go to the parent instead.
 */
const getPublicInstance = (i) => i && (i.proxy ? i.proxy : getPublicInstance(i.parent));
const publicPropertiesMap = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(Object.create(null), {
    $: i => i,
    $el: i => i.vnode.el,
    $data: i => i.data,
    $props: i => (( true) ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.props) : 0),
    $attrs: i => (( true) ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.attrs) : 0),
    $slots: i => (( true) ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.slots) : 0),
    $refs: i => (( true) ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.refs) : 0),
    $parent: i => getPublicInstance(i.parent),
    $root: i => i.root && i.root.proxy,
    $emit: i => i.emit,
    $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
    $forceUpdate: i => () => queueJob(i.update),
    $nextTick: i => nextTick.bind(i.proxy),
    $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP)
});
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        // let @vue/reactivity know it should never observe Vue public instances.
        if (key === "__v_skip" /* SKIP */) {
            return true;
        }
        // for internal formatters to know that this is a Vue instance
        if (( true) && key === '__isVue') {
            return true;
        }
        // data / props / ctx
        // This getter gets called for every property access on the render context
        // during render and is a major hotspot. The most expensive part of this
        // is the multiple hasOwn() calls. It's much faster to do a simple property
        // access on a plain object, so we use an accessCache object (with null
        // prototype) to memoize what access type a key corresponds to.
        let normalizedProps;
        if (key[0] !== '$') {
            const n = accessCache[key];
            if (n !== undefined) {
                switch (n) {
                    case 0 /* SETUP */:
                        return setupState[key];
                    case 1 /* DATA */:
                        return data[key];
                    case 3 /* CONTEXT */:
                        return ctx[key];
                    case 2 /* PROPS */:
                        return props[key];
                    // default: just fallthrough
                }
            }
            else if (setupState !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, key)) {
                accessCache[key] = 0 /* SETUP */;
                return setupState[key];
            }
            else if (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) {
                accessCache[key] = 1 /* DATA */;
                return data[key];
            }
            else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) &&
                (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(normalizedProps, key)) {
                accessCache[key] = 2 /* PROPS */;
                return props[key];
            }
            else if (ctx !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(ctx, key)) {
                accessCache[key] = 3 /* CONTEXT */;
                return ctx[key];
            }
            else if (!__VUE_OPTIONS_API__ || !isInBeforeCreate) {
                accessCache[key] = 4 /* OTHER */;
            }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        // public $xxx properties
        if (publicGetter) {
            if (key === '$attrs') {
                (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.track)(instance, "get" /* GET */, key);
                ( true) && markAttrsAccessed();
            }
            return publicGetter(instance);
        }
        else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) &&
            (cssModule = cssModule[key])) {
            return cssModule;
        }
        else if (ctx !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(ctx, key)) {
            // user may set custom properties to `this` that start with `$`
            accessCache[key] = 3 /* CONTEXT */;
            return ctx[key];
        }
        else if (
        // global properties
        ((globalProperties = appContext.config.globalProperties),
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(globalProperties, key))) {
            return globalProperties[key];
        }
        else if (( true) &&
            currentRenderingInstance &&
            (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(key) ||
                // #1091 avoid internal isRef/isVNode checks on component instance leading
                // to infinite warning loop
                key.indexOf('__v') !== 0)) {
            if (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ &&
                (key[0] === '$' || key[0] === '_') &&
                (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) {
                warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` +
                    `character ("$" or "_") and is not proxied on the render context.`);
            }
            else {
                warn(`Property ${JSON.stringify(key)} was accessed during render ` +
                    `but is not defined on instance.`);
            }
        }
    },
    set({ _: instance }, key, value) {
        const { data, setupState, ctx } = instance;
        if (setupState !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, key)) {
            setupState[key] = value;
        }
        else if (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) {
            data[key] = value;
        }
        else if (key in instance.props) {
            ( true) &&
                warn(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
            return false;
        }
        if (key[0] === '$' && key.slice(1) in instance) {
            ( true) &&
                warn(`Attempting to mutate public property "${key}". ` +
                    `Properties starting with $ are reserved and readonly.`, instance);
            return false;
        }
        else {
            if (( true) && key in instance.appContext.config.globalProperties) {
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    value
                });
            }
            else {
                ctx[key] = value;
            }
        }
        return true;
    },
    has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
        let normalizedProps;
        return (accessCache[key] !== undefined ||
            (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) ||
            (setupState !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, key)) ||
            ((normalizedProps = propsOptions[0]) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(normalizedProps, key)) ||
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(ctx, key) ||
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(publicPropertiesMap, key) ||
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(appContext.config.globalProperties, key));
    }
};
if (true) {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
        warn(`Avoid app logic that relies on enumerating keys on a component instance. ` +
            `The keys will be empty in production mode to avoid performance overhead.`);
        return Reflect.ownKeys(target);
    };
}
const RuntimeCompiledPublicInstanceProxyHandlers = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, PublicInstanceProxyHandlers, {
    get(target, key) {
        // fast path for unscopables when using `with` block
        if (key === Symbol.unscopables) {
            return;
        }
        return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
        const has = key[0] !== '_' && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isGloballyWhitelisted)(key);
        if (( true) && !has && PublicInstanceProxyHandlers.has(_, key)) {
            warn(`Property ${JSON.stringify(key)} should not start with _ which is a reserved prefix for Vue internals.`);
        }
        return has;
    }
});
// In dev mode, the proxy target exposes the same properties as seen on `this`
// for easier console inspection. In prod mode it will be an empty object so
// these properties definitions can be skipped.
function createRenderContext(instance) {
    const target = {};
    // expose internal instance for proxy handlers
    Object.defineProperty(target, `_`, {
        configurable: true,
        enumerable: false,
        get: () => instance
    });
    // expose public properties
    Object.keys(publicPropertiesMap).forEach(key => {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            get: () => publicPropertiesMap[key](instance),
            // intercepted by the proxy so no need for implementation,
            // but needed to prevent set errors
            set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
        });
    });
    // expose global properties
    const { globalProperties } = instance.appContext.config;
    Object.keys(globalProperties).forEach(key => {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            get: () => globalProperties[key],
            set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
        });
    });
    return target;
}
// dev only
function exposePropsOnRenderContext(instance) {
    const { ctx, propsOptions: [propsOptions] } = instance;
    if (propsOptions) {
        Object.keys(propsOptions).forEach(key => {
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: () => instance.props[key],
                set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
            });
        });
    }
}
// dev only
function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(setupState)).forEach(key => {
        if (key[0] === '$' || key[0] === '_') {
            warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" ` +
                `which are reserved prefixes for Vue internals.`);
            return;
        }
        Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => setupState[key],
            set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
        });
    });
}

const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    // inherit parent app context - or - if root, adopt from root vnode
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
        uid: uid$1++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        next: null,
        subTree: null,
        update: null,
        render: null,
        proxy: null,
        exposed: null,
        withProxy: null,
        effects: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        // local resovled assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        emitted: null,
        // state
        ctx: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        data: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        props: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        attrs: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        slots: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        refs: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        setupState: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null
    };
    if ((true)) {
        instance.ctx = createRenderContext(instance);
    }
    else {}
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (true) {
        devtoolsComponentAdded(instance);
    }
    return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
    currentInstance = instance;
};
const isBuiltInTag = /*#__PURE__*/ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.makeMap)('slot,component');
function validateComponentName(name, config) {
    const appIsNativeTag = config.isNativeTag || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
        warn('Do not use built-in or reserved HTML elements as component id: ' + name);
    }
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
    isInSSRComponentSetup = isSSR;
    const { props, children, shapeFlag } = instance.vnode;
    const isStateful = shapeFlag & 4 /* STATEFUL_COMPONENT */;
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    const setupResult = isStateful
        ? setupStatefulComponent(instance, isSSR)
        : undefined;
    isInSSRComponentSetup = false;
    return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    if ((true)) {
        if (Component.name) {
            validateComponentName(Component.name, instance.appContext.config);
        }
        if (Component.components) {
            const names = Object.keys(Component.components);
            for (let i = 0; i < names.length; i++) {
                validateComponentName(names[i], instance.appContext.config);
            }
        }
        if (Component.directives) {
            const names = Object.keys(Component.directives);
            for (let i = 0; i < names.length; i++) {
                validateDirectiveName(names[i]);
            }
        }
    }
    // 0. create render proxy property access cache
    instance.accessCache = Object.create(null);
    // 1. create public instance / render proxy
    // also mark it raw so it's never observed
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    if ((true)) {
        exposePropsOnRenderContext(instance);
    }
    // 2. call setup()
    const { setup } = Component;
    if (setup) {
        const setupContext = (instance.setupContext =
            setup.length > 1 ? createSetupContext(instance) : null);
        currentInstance = instance;
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
        const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */, [( true) ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(instance.props) : 0, setupContext]);
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
        currentInstance = null;
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(setupResult)) {
            if (isSSR) {
                // return the promise so server-renderer can wait on it
                return setupResult.then((resolvedResult) => {
                    handleSetupResult(instance, resolvedResult);
                });
            }
            else {
                // async setup returned Promise.
                // bail here and wait for re-entry.
                instance.asyncDep = setupResult;
            }
        }
        else {
            handleSetupResult(instance, setupResult);
        }
    }
    else {
        finishComponentSetup(instance);
    }
}
function handleSetupResult(instance, setupResult, isSSR) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(setupResult)) {
        // setup returned an inline render function
        {
            instance.render = setupResult;
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(setupResult)) {
        if (( true) && isVNode(setupResult)) {
            warn(`setup() should not return VNodes directly - ` +
                `return a render function instead.`);
        }
        // setup returned bindings.
        // assuming a render function compiled from template is present.
        if (true) {
            instance.devtoolsRawSetupState = setupResult;
        }
        instance.setupState = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs)(setupResult);
        if ((true)) {
            exposeSetupStateOnRenderContext(instance);
        }
    }
    else if (( true) && setupResult !== undefined) {
        warn(`setup() should return an object. Received: ${setupResult === null ? 'null' : typeof setupResult}`);
    }
    finishComponentSetup(instance);
}
let compile;
/**
 * For runtime-dom to register the compiler.
 * Note the exported method uses any to avoid d.ts relying on the compiler types.
 */
function registerRuntimeCompiler(_compile) {
    compile = _compile;
}
function finishComponentSetup(instance, isSSR) {
    const Component = instance.type;
    // template / render function normalization
    if (!instance.render) {
        // could be set from setup()
        if (compile && Component.template && !Component.render) {
            if ((true)) {
                startMeasure(instance, `compile`);
            }
            Component.render = compile(Component.template, {
                isCustomElement: instance.appContext.config.isCustomElement,
                delimiters: Component.delimiters
            });
            if ((true)) {
                endMeasure(instance, `compile`);
            }
        }
        instance.render = (Component.render || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP);
        // for runtime-compiled render functions using `with` blocks, the render
        // proxy used needs a different `has` handler which is more performant and
        // also only allows a whitelist of globals to fallthrough.
        if (instance.render._rc) {
            instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
        }
    }
    // support for 2.x options
    if (__VUE_OPTIONS_API__) {
        currentInstance = instance;
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
        applyOptions(instance, Component);
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
        currentInstance = null;
    }
    // warn missing template/render
    if (( true) && !Component.render && instance.render === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP) {
        /* istanbul ignore if */
        if (!compile && Component.template) {
            warn(`Component provided template option but ` +
                `runtime compilation is not supported in this build of Vue.` +
                ( ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
                    ) /* should not happen */);
        }
        else {
            warn(`Component is missing template or render function.`);
        }
    }
}
const attrHandlers = {
    get: (target, key) => {
        if ((true)) {
            markAttrsAccessed();
        }
        return target[key];
    },
    set: () => {
        warn(`setupContext.attrs is readonly.`);
        return false;
    },
    deleteProperty: () => {
        warn(`setupContext.attrs is readonly.`);
        return false;
    }
};
function createSetupContext(instance) {
    const expose = exposed => {
        if (( true) && instance.exposed) {
            warn(`expose() should be called only once per setup().`);
        }
        instance.exposed = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs)(exposed);
    };
    if ((true)) {
        // We use getters in dev in case libs like test-utils overwrite instance
        // properties (overwrites should not be done in prod)
        return Object.freeze({
            get props() {
                return instance.props;
            },
            get attrs() {
                return new Proxy(instance.attrs, attrHandlers);
            },
            get slots() {
                return (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(instance.slots);
            },
            get emit() {
                return (event, ...args) => instance.emit(event, ...args);
            },
            expose
        });
    }
    else {}
}
// record effects created during a component's setup() so that they can be
// stopped when the component unmounts
function recordInstanceBoundEffect(effect, instance = currentInstance) {
    if (instance) {
        (instance.effects || (instance.effects = [])).push(effect);
    }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
function getComponentName(Component) {
    return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(Component)
        ? Component.displayName || Component.name
        : Component.name;
}
/* istanbul ignore next */
function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
        const match = Component.__file.match(/([^/\\]+)\.\w+$/);
        if (match) {
            name = match[1];
        }
    }
    if (!name && instance && instance.parent) {
        // try to infer the name based on reverse resolution
        const inferFromRegistry = (registry) => {
            for (const key in registry) {
                if (registry[key] === Component) {
                    return key;
                }
            }
        };
        name =
            inferFromRegistry(instance.components ||
                instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
    return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value) && '__vccOpts' in value;
}

function computed(getterOrOptions) {
    const c = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.computed)(getterOrOptions);
    recordInstanceBoundEffect(c.effect);
    return c;
}

// implementation
function defineProps() {
    if ((true)) {
        warn(`defineProps() is a compiler-hint helper that is only usable inside ` +
            `<script setup> of a single file component. Its arguments should be ` +
            `compiled away and passing it at runtime has no effect.`);
    }
    return null;
}
// implementation
function defineEmit() {
    if ((true)) {
        warn(`defineEmit() is a compiler-hint helper that is only usable inside ` +
            `<script setup> of a single file component. Its arguments should be ` +
            `compiled away and passing it at runtime has no effect.`);
    }
    return null;
}
function useContext() {
    const i = getCurrentInstance();
    if (( true) && !i) {
        warn(`useContext() called without active instance.`);
    }
    return i.setupContext || (i.setupContext = createSetupContext(i));
}

// Actual implementation
function h(type, propsOrChildren, children) {
    const l = arguments.length;
    if (l === 2) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(propsOrChildren) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(propsOrChildren)) {
            // single vnode without props
            if (isVNode(propsOrChildren)) {
                return createVNode(type, null, [propsOrChildren]);
            }
            // props without children
            return createVNode(type, propsOrChildren);
        }
        else {
            // omit props
            return createVNode(type, null, propsOrChildren);
        }
    }
    else {
        if (l > 3) {
            children = Array.prototype.slice.call(arguments, 2);
        }
        else if (l === 3 && isVNode(children)) {
            children = [children];
        }
        return createVNode(type, propsOrChildren, children);
    }
}

const ssrContextKey = Symbol(( true) ? `ssrContext` : 0);
const useSSRContext = () => {
    {
        const ctx = inject(ssrContextKey);
        if (!ctx) {
            warn(`Server rendering context not provided. Make sure to only call ` +
                `useSsrContext() conditionally in the server build.`);
        }
        return ctx;
    }
};

function initCustomFormatter() {
    /* eslint-disable no-restricted-globals */
    if ( false || typeof window === 'undefined') {
        return;
    }
    const vueStyle = { style: 'color:#3ba776' };
    const numberStyle = { style: 'color:#0b1bc9' };
    const stringStyle = { style: 'color:#b62e24' };
    const keywordStyle = { style: 'color:#9d288c' };
    // custom formatter for Chrome
    // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
    const formatter = {
        header(obj) {
            // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
            if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(obj)) {
                return null;
            }
            if (obj.__isVue) {
                return ['div', vueStyle, `VueInstance`];
            }
            else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(obj)) {
                return [
                    'div',
                    {},
                    ['span', vueStyle, genRefFlag(obj)],
                    '<',
                    formatValue(obj.value),
                    `>`
                ];
            }
            else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(obj)) {
                return [
                    'div',
                    {},
                    ['span', vueStyle, 'Reactive'],
                    '<',
                    formatValue(obj),
                    `>${(0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReadonly)(obj) ? ` (readonly)` : ``}`
                ];
            }
            else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReadonly)(obj)) {
                return [
                    'div',
                    {},
                    ['span', vueStyle, 'Readonly'],
                    '<',
                    formatValue(obj),
                    '>'
                ];
            }
            return null;
        },
        hasBody(obj) {
            return obj && obj.__isVue;
        },
        body(obj) {
            if (obj && obj.__isVue) {
                return [
                    'div',
                    {},
                    ...formatInstance(obj.$)
                ];
            }
        }
    };
    function formatInstance(instance) {
        const blocks = [];
        if (instance.type.props && instance.props) {
            blocks.push(createInstanceBlock('props', (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(instance.props)));
        }
        if (instance.setupState !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
            blocks.push(createInstanceBlock('setup', instance.setupState));
        }
        if (instance.data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
            blocks.push(createInstanceBlock('data', (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(instance.data)));
        }
        const computed = extractKeys(instance, 'computed');
        if (computed) {
            blocks.push(createInstanceBlock('computed', computed));
        }
        const injected = extractKeys(instance, 'inject');
        if (injected) {
            blocks.push(createInstanceBlock('injected', injected));
        }
        blocks.push([
            'div',
            {},
            [
                'span',
                {
                    style: keywordStyle.style + ';opacity:0.66'
                },
                '$ (internal): '
            ],
            ['object', { object: instance }]
        ]);
        return blocks;
    }
    function createInstanceBlock(type, target) {
        target = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, target);
        if (!Object.keys(target).length) {
            return ['span', {}];
        }
        return [
            'div',
            { style: 'line-height:1.25em;margin-bottom:0.6em' },
            [
                'div',
                {
                    style: 'color:#476582'
                },
                type
            ],
            [
                'div',
                {
                    style: 'padding-left:1.25em'
                },
                ...Object.keys(target).map(key => {
                    return [
                        'div',
                        {},
                        ['span', keywordStyle, key + ': '],
                        formatValue(target[key], false)
                    ];
                })
            ]
        ];
    }
    function formatValue(v, asRaw = true) {
        if (typeof v === 'number') {
            return ['span', numberStyle, v];
        }
        else if (typeof v === 'string') {
            return ['span', stringStyle, JSON.stringify(v)];
        }
        else if (typeof v === 'boolean') {
            return ['span', keywordStyle, v];
        }
        else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(v)) {
            return ['object', { object: asRaw ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(v) : v }];
        }
        else {
            return ['span', stringStyle, String(v)];
        }
    }
    function extractKeys(instance, type) {
        const Comp = instance.type;
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(Comp)) {
            return;
        }
        const extracted = {};
        for (const key in instance.ctx) {
            if (isKeyOfType(Comp, key, type)) {
                extracted[key] = instance.ctx[key];
            }
        }
        return extracted;
    }
    function isKeyOfType(Comp, key, type) {
        const opts = Comp[type];
        if (((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(opts) && opts.includes(key)) ||
            ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(opts) && key in opts)) {
            return true;
        }
        if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
            return true;
        }
        if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
            return true;
        }
    }
    function genRefFlag(v) {
        if (v._shallow) {
            return `ShallowRef`;
        }
        if (v.effect) {
            return `ComputedRef`;
        }
        return `Ref`;
    }
    if (window.devtoolsFormatters) {
        window.devtoolsFormatters.push(formatter);
    }
    else {
        window.devtoolsFormatters = [formatter];
    }
}

/**
 * Actual implementation
 */
function renderList(source, renderItem) {
    let ret;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(source) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(source)) {
        ret = new Array(source.length);
        for (let i = 0, l = source.length; i < l; i++) {
            ret[i] = renderItem(source[i], i);
        }
    }
    else if (typeof source === 'number') {
        if (( true) && !Number.isInteger(source)) {
            warn(`The v-for range expect an integer value but got ${source}.`);
            return [];
        }
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
            ret[i] = renderItem(i + 1, i);
        }
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(source)) {
        if (source[Symbol.iterator]) {
            ret = Array.from(source, renderItem);
        }
        else {
            const keys = Object.keys(source);
            ret = new Array(keys.length);
            for (let i = 0, l = keys.length; i < l; i++) {
                const key = keys[i];
                ret[i] = renderItem(source[key], key, i);
            }
        }
    }
    else {
        ret = [];
    }
    return ret;
}

/**
 * For prefixing keys in v-on="obj" with "on"
 * @private
 */
function toHandlers(obj) {
    const ret = {};
    if (( true) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(obj)) {
        warn(`v-on with no argument expects an object value.`);
        return ret;
    }
    for (const key in obj) {
        ret[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(key)] = obj[key];
    }
    return ret;
}

/**
 * Compiler runtime helper for creating dynamic slots object
 * @private
 */
function createSlots(slots, dynamicSlots) {
    for (let i = 0; i < dynamicSlots.length; i++) {
        const slot = dynamicSlots[i];
        // array of dynamic slot generated by <template v-for="..." #[...]>
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(slot)) {
            for (let j = 0; j < slot.length; j++) {
                slots[slot[j].name] = slot[j].fn;
            }
        }
        else if (slot) {
            // conditional single slot generated by <template v-if="..." #foo>
            slots[slot.name] = slot.fn;
        }
    }
    return slots;
}

// Core API ------------------------------------------------------------------
const version = "3.0.5";
/**
 * SSR utils for \@vue/server-renderer. Only exposed in cjs builds.
 * @internal
 */
const ssrUtils = ( null);




/***/ }),

/***/ "./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransition": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransition),
/* harmony export */   "Comment": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Comment),
/* harmony export */   "Fragment": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "KeepAlive": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.KeepAlive),
/* harmony export */   "Static": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Static),
/* harmony export */   "Suspense": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Suspense),
/* harmony export */   "Teleport": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Teleport),
/* harmony export */   "Text": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Text),
/* harmony export */   "callWithAsyncErrorHandling": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling),
/* harmony export */   "callWithErrorHandling": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.callWithErrorHandling),
/* harmony export */   "camelize": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.camelize),
/* harmony export */   "capitalize": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.capitalize),
/* harmony export */   "cloneVNode": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.cloneVNode),
/* harmony export */   "computed": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.computed),
/* harmony export */   "createBlock": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createBlock),
/* harmony export */   "createCommentVNode": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode),
/* harmony export */   "createHydrationRenderer": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer),
/* harmony export */   "createRenderer": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createRenderer),
/* harmony export */   "createSlots": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createSlots),
/* harmony export */   "createStaticVNode": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode),
/* harmony export */   "createTextVNode": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createTextVNode),
/* harmony export */   "createVNode": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createVNode),
/* harmony export */   "customRef": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.customRef),
/* harmony export */   "defineAsyncComponent": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent),
/* harmony export */   "defineComponent": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineComponent),
/* harmony export */   "defineEmit": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineEmit),
/* harmony export */   "defineProps": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineProps),
/* harmony export */   "devtools": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.devtools),
/* harmony export */   "getCurrentInstance": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance),
/* harmony export */   "getTransitionRawChildren": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren),
/* harmony export */   "h": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   "handleError": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.handleError),
/* harmony export */   "initCustomFormatter": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.initCustomFormatter),
/* harmony export */   "inject": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.inject),
/* harmony export */   "isProxy": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isProxy),
/* harmony export */   "isReactive": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isReactive),
/* harmony export */   "isReadonly": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isReadonly),
/* harmony export */   "isRef": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isRef),
/* harmony export */   "isVNode": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isVNode),
/* harmony export */   "markRaw": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.markRaw),
/* harmony export */   "mergeProps": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.mergeProps),
/* harmony export */   "nextTick": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.nextTick),
/* harmony export */   "onActivated": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onActivated),
/* harmony export */   "onBeforeMount": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount),
/* harmony export */   "onBeforeUnmount": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount),
/* harmony export */   "onBeforeUpdate": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate),
/* harmony export */   "onDeactivated": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onDeactivated),
/* harmony export */   "onErrorCaptured": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured),
/* harmony export */   "onMounted": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onMounted),
/* harmony export */   "onRenderTracked": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked),
/* harmony export */   "onRenderTriggered": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered),
/* harmony export */   "onUnmounted": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUnmounted),
/* harmony export */   "onUpdated": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUpdated),
/* harmony export */   "openBlock": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.openBlock),
/* harmony export */   "popScopeId": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.popScopeId),
/* harmony export */   "provide": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.provide),
/* harmony export */   "proxyRefs": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.proxyRefs),
/* harmony export */   "pushScopeId": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.pushScopeId),
/* harmony export */   "queuePostFlushCb": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.queuePostFlushCb),
/* harmony export */   "reactive": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.reactive),
/* harmony export */   "readonly": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   "ref": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "registerRuntimeCompiler": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.registerRuntimeCompiler),
/* harmony export */   "renderList": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.renderList),
/* harmony export */   "renderSlot": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.renderSlot),
/* harmony export */   "resolveComponent": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveComponent),
/* harmony export */   "resolveDirective": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveDirective),
/* harmony export */   "resolveDynamicComponent": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent),
/* harmony export */   "resolveTransitionHooks": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks),
/* harmony export */   "setBlockTracking": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking),
/* harmony export */   "setDevtoolsHook": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setDevtoolsHook),
/* harmony export */   "setTransitionHooks": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks),
/* harmony export */   "shallowReactive": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.shallowReactive),
/* harmony export */   "shallowReadonly": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly),
/* harmony export */   "shallowRef": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.shallowRef),
/* harmony export */   "ssrContextKey": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ssrContextKey),
/* harmony export */   "ssrUtils": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ssrUtils),
/* harmony export */   "toDisplayString": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toDisplayString),
/* harmony export */   "toHandlerKey": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toHandlerKey),
/* harmony export */   "toHandlers": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toHandlers),
/* harmony export */   "toRaw": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toRaw),
/* harmony export */   "toRef": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   "toRefs": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   "transformVNodeArgs": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.transformVNodeArgs),
/* harmony export */   "triggerRef": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.triggerRef),
/* harmony export */   "unref": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.unref),
/* harmony export */   "useContext": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useContext),
/* harmony export */   "useSSRContext": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useSSRContext),
/* harmony export */   "useTransitionState": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useTransitionState),
/* harmony export */   "version": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "warn": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn),
/* harmony export */   "watch": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watch),
/* harmony export */   "watchEffect": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watchEffect),
/* harmony export */   "withCtx": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withCtx),
/* harmony export */   "withDirectives": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withDirectives),
/* harmony export */   "withScopeId": () => (/* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withScopeId),
/* harmony export */   "Transition": () => (/* binding */ Transition),
/* harmony export */   "TransitionGroup": () => (/* binding */ TransitionGroup),
/* harmony export */   "createApp": () => (/* binding */ createApp),
/* harmony export */   "createSSRApp": () => (/* binding */ createSSRApp),
/* harmony export */   "hydrate": () => (/* binding */ hydrate),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "useCssModule": () => (/* binding */ useCssModule),
/* harmony export */   "useCssVars": () => (/* binding */ useCssVars),
/* harmony export */   "vModelCheckbox": () => (/* binding */ vModelCheckbox),
/* harmony export */   "vModelDynamic": () => (/* binding */ vModelDynamic),
/* harmony export */   "vModelRadio": () => (/* binding */ vModelRadio),
/* harmony export */   "vModelSelect": () => (/* binding */ vModelSelect),
/* harmony export */   "vModelText": () => (/* binding */ vModelText),
/* harmony export */   "vShow": () => (/* binding */ vShow),
/* harmony export */   "withKeys": () => (/* binding */ withKeys),
/* harmony export */   "withModifiers": () => (/* binding */ withModifiers)
/* harmony export */ });
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");
/* harmony import */ var _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/runtime-core */ "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js");
/* harmony import */ var _vue_runtime_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/runtime-core */ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");




const svgNS = 'http://www.w3.org/2000/svg';
const doc = (typeof document !== 'undefined' ? document : null);
let tempContainer;
let tempSVGContainer;
const nodeOps = {
    insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
    },
    remove: child => {
        const parent = child.parentNode;
        if (parent) {
            parent.removeChild(child);
        }
    },
    createElement: (tag, isSVG, is) => isSVG
        ? doc.createElementNS(svgNS, tag)
        : doc.createElement(tag, is ? { is } : undefined),
    createText: text => doc.createTextNode(text),
    createComment: text => doc.createComment(text),
    setText: (node, text) => {
        node.nodeValue = text;
    },
    setElementText: (el, text) => {
        el.textContent = text;
    },
    parentNode: node => node.parentNode,
    nextSibling: node => node.nextSibling,
    querySelector: selector => doc.querySelector(selector),
    setScopeId(el, id) {
        el.setAttribute(id, '');
    },
    cloneNode(el) {
        return el.cloneNode(true);
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent(content, parent, anchor, isSVG) {
        const temp = isSVG
            ? tempSVGContainer ||
                (tempSVGContainer = doc.createElementNS(svgNS, 'svg'))
            : tempContainer || (tempContainer = doc.createElement('div'));
        temp.innerHTML = content;
        const first = temp.firstChild;
        let node = first;
        let last = node;
        while (node) {
            last = node;
            nodeOps.insert(node, parent, anchor);
            node = temp.firstChild;
        }
        return [first, last];
    }
};

// compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]
function patchClass(el, value, isSVG) {
    if (value == null) {
        value = '';
    }
    if (isSVG) {
        el.setAttribute('class', value);
    }
    else {
        // directly setting className should be faster than setAttribute in theory
        // if this is an element during a transition, take the temporary transition
        // classes into account.
        const transitionClasses = el._vtc;
        if (transitionClasses) {
            value = (value
                ? [value, ...transitionClasses]
                : [...transitionClasses]).join(' ');
        }
        el.className = value;
    }
}

function patchStyle(el, prev, next) {
    const style = el.style;
    if (!next) {
        el.removeAttribute('style');
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(next)) {
        if (prev !== next) {
            style.cssText = next;
        }
    }
    else {
        for (const key in next) {
            setStyle(style, key, next[key]);
        }
        if (prev && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(prev)) {
            for (const key in prev) {
                if (next[key] == null) {
                    setStyle(style, key, '');
                }
            }
        }
    }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(val)) {
        val.forEach(v => setStyle(style, name, v));
    }
    else {
        if (name.startsWith('--')) {
            // custom property definition
            style.setProperty(name, val);
        }
        else {
            const prefixed = autoPrefix(style, name);
            if (importantRE.test(val)) {
                // !important
                style.setProperty((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(prefixed), val.replace(importantRE, ''), 'important');
            }
            else {
                style[prefixed] = val;
            }
        }
    }
}
const prefixes = ['Webkit', 'Moz', 'ms'];
const prefixCache = {};
function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
        return cached;
    }
    let name = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(rawName);
    if (name !== 'filter' && name in style) {
        return (prefixCache[rawName] = name);
    }
    name = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)(name);
    for (let i = 0; i < prefixes.length; i++) {
        const prefixed = prefixes[i] + name;
        if (prefixed in style) {
            return (prefixCache[rawName] = prefixed);
        }
    }
    return rawName;
}

const xlinkNS = 'http://www.w3.org/1999/xlink';
function patchAttr(el, key, value, isSVG) {
    if (isSVG && key.startsWith('xlink:')) {
        if (value == null) {
            el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
        }
        else {
            el.setAttributeNS(xlinkNS, key, value);
        }
    }
    else {
        // note we are only checking boolean attributes that don't have a
        // corresponding dom prop of the same name here.
        const isBoolean = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSpecialBooleanAttr)(key);
        if (value == null || (isBoolean && value === false)) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, isBoolean ? '' : value);
        }
    }
}

// __UNSAFE__
// functions. The user is responsible for using them with only trusted content.
function patchDOMProp(el, key, value, 
// the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === 'innerHTML' || key === 'textContent') {
        if (prevChildren) {
            unmountChildren(prevChildren, parentComponent, parentSuspense);
        }
        el[key] = value == null ? '' : value;
        return;
    }
    if (key === 'value' && el.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified.
        el._value = value;
        const newValue = value == null ? '' : value;
        if (el.value !== newValue) {
            el.value = newValue;
        }
        return;
    }
    if (value === '' || value == null) {
        const type = typeof el[key];
        if (value === '' && type === 'boolean') {
            // e.g. <select multiple> compiles to { multiple: '' }
            el[key] = true;
            return;
        }
        else if (value == null && type === 'string') {
            // e.g. <div :id="null">
            el[key] = '';
            el.removeAttribute(key);
            return;
        }
        else if (type === 'number') {
            // e.g. <img :width="null">
            el[key] = 0;
            el.removeAttribute(key);
            return;
        }
    }
    // some properties perform value validation and throw
    try {
        el[key] = value;
    }
    catch (e) {
        if ((true)) {
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`Failed setting prop "${key}" on <${el.tagName.toLowerCase()}>: ` +
                `value ${value} is invalid.`, e);
        }
    }
}

// Async edge case fix requires storing an event listener's attach timestamp.
let _getNow = Date.now;
// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
if (typeof document !== 'undefined' &&
    _getNow() > document.createEvent('Event').timeStamp) {
    // if the low-res timestamp which is bigger than the event timestamp
    // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listeners as well.
    _getNow = () => performance.now();
}
// To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.
let cachedNow = 0;
const p = Promise.resolve();
const reset = () => {
    cachedNow = 0;
};
const getNow = () => cachedNow || (p.then(reset), (cachedNow = _getNow()));
function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    // vei = vue event invokers
    const invokers = el._vei || (el._vei = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
        // patch
        existingInvoker.value = nextValue;
    }
    else {
        const [name, options] = parseName(rawName);
        if (nextValue) {
            // add
            const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
            addEventListener(el, name, invoker, options);
        }
        else if (existingInvoker) {
            // remove
            removeEventListener(el, name, existingInvoker, options);
            invokers[rawName] = undefined;
        }
    }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while ((m = name.match(optionsModifierRE))) {
            name = name.slice(0, name.length - m[0].length);
            options[m[0].toLowerCase()] = true;
        }
    }
    return [name.slice(2).toLowerCase(), options];
}
function createInvoker(initialValue, instance) {
    const invoker = (e) => {
        // async edge case #6566: inner click event triggers patch, event handler
        // attached to outer element during patch, and triggered again. This
        // happens because browsers fire microtask ticks between event propagation.
        // the solution is simple: we save the timestamp when a handler is attached,
        // and the handler would only fire if the event passed to it was fired
        // AFTER it was attached.
        const timeStamp = e.timeStamp || _getNow();
        if (timeStamp >= invoker.attached - 1) {
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling)(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* NATIVE_EVENT_HANDLER */, [e]);
        }
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
}
function patchStopImmediatePropagation(e, value) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
            originalStop.call(e);
            e._stopped = true;
        };
        return value.map(fn => (e) => !e._stopped && fn(e));
    }
    else {
        return value;
    }
}

const nativeOnRE = /^on[a-z]/;
const forcePatchProp = (_, key) => key === 'value';
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
    switch (key) {
        // special
        case 'class':
            patchClass(el, nextValue, isSVG);
            break;
        case 'style':
            patchStyle(el, prevValue, nextValue);
            break;
        default:
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
                // ignore v-model listeners
                if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)(key)) {
                    patchEvent(el, key, prevValue, nextValue, parentComponent);
                }
            }
            else if (shouldSetAsProp(el, key, nextValue, isSVG)) {
                patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
            }
            else {
                // special case for <input v-model type="checkbox"> with
                // :true-value & :false-value
                // store value as dom properties since non-string values will be
                // stringified.
                if (key === 'true-value') {
                    el._trueValue = nextValue;
                }
                else if (key === 'false-value') {
                    el._falseValue = nextValue;
                }
                patchAttr(el, key, nextValue, isSVG);
            }
            break;
    }
};
function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
        // most keys must be set as attribute on svg elements to work
        // ...except innerHTML
        if (key === 'innerHTML') {
            return true;
        }
        // or native onclick with function values
        if (key in el && nativeOnRE.test(key) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
            return true;
        }
        return false;
    }
    // spellcheck and draggable are numerated attrs, however their
    // corresponding DOM properties are actually booleans - this leads to
    // setting it with a string "false" value leading it to be coerced to
    // `true`, so we need to always treat them as attributes.
    // Note that `contentEditable` doesn't have this problem: its DOM
    // property is also enumerated string values.
    if (key === 'spellcheck' || key === 'draggable') {
        return false;
    }
    // #1787 form as an attribute must be a string, while it accepts an Element as
    // a prop
    if (key === 'form' && typeof value === 'string') {
        return false;
    }
    // #1526 <input list> must be set as attribute
    if (key === 'list' && el.tagName === 'INPUT') {
        return false;
    }
    // native onclick with string value, must be set as attribute
    if (nativeOnRE.test(key) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
        return false;
    }
    return key in el;
}

function useCssModule(name = '$style') {
    /* istanbul ignore else */
    {
        const instance = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
        if (!instance) {
            ( true) && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`useCssModule must be called inside setup()`);
            return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
        }
        const modules = instance.type.__cssModules;
        if (!modules) {
            ( true) && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`Current instance does not have CSS modules injected.`);
            return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
        }
        const mod = modules[name];
        if (!mod) {
            ( true) &&
                (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`Current instance does not have CSS module named "${name}".`);
            return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
        }
        return mod;
    }
}

/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */
function useCssVars(getter) {
    const instance = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
    /* istanbul ignore next */
    if (!instance) {
        ( true) &&
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`useCssVars is called without current active component instance.`);
        return;
    }
    const setVars = () => setVarsOnVNode(instance.subTree, getter(instance.proxy));
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watchEffect)(setVars, { flush: 'post' }));
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUpdated)(setVars);
}
function setVarsOnVNode(vnode, vars) {
    if ( vnode.shapeFlag & 128 /* SUSPENSE */) {
        const suspense = vnode.suspense;
        vnode = suspense.activeBranch;
        if (suspense.pendingBranch && !suspense.isHydrating) {
            suspense.effects.push(() => {
                setVarsOnVNode(suspense.activeBranch, vars);
            });
        }
    }
    // drill down HOCs until it's a non-component vnode
    while (vnode.component) {
        vnode = vnode.component.subTree;
    }
    if (vnode.shapeFlag & 1 /* ELEMENT */ && vnode.el) {
        const style = vnode.el.style;
        for (const key in vars) {
            style.setProperty(`--${key}`, vars[key]);
        }
    }
    else if (vnode.type === _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
        vnode.children.forEach(c => setVarsOnVNode(c, vars));
    }
}

const TRANSITION = 'transition';
const ANIMATION = 'animation';
// DOM Transition is a higher-order-component based on the platform-agnostic
// base Transition component, with DOM-specific logic.
const Transition = (props, { slots }) => (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.h)(_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = 'Transition';
const DOMTransitionPropsValidators = {
    name: String,
    type: String,
    css: {
        type: Boolean,
        default: true
    },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String
};
const TransitionPropsValidators = (Transition.props = /*#__PURE__*/ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransition.props, DOMTransitionPropsValidators));
function resolveTransitionProps(rawProps) {
    let { name = 'v', type, css = true, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
    const baseProps = {};
    for (const key in rawProps) {
        if (!(key in DOMTransitionPropsValidators)) {
            baseProps[key] = rawProps[key];
        }
    }
    if (!css) {
        return baseProps;
    }
    const durations = normalizeDuration(duration);
    const enterDuration = durations && durations[0];
    const leaveDuration = durations && durations[1];
    const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
    const finishEnter = (el, isAppear, done) => {
        removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
        removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
        done && done();
    };
    const finishLeave = (el, done) => {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
        done && done();
    };
    const makeEnterHook = (isAppear) => {
        return (el, done) => {
            const hook = isAppear ? onAppear : onEnter;
            const resolve = () => finishEnter(el, isAppear, done);
            hook && hook(el, resolve);
            nextFrame(() => {
                removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
                addTransitionClass(el, isAppear ? appearToClass : enterToClass);
                if (!(hook && hook.length > 1)) {
                    whenTransitionEnds(el, type, enterDuration, resolve);
                }
            });
        };
    };
    return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(baseProps, {
        onBeforeEnter(el) {
            onBeforeEnter && onBeforeEnter(el);
            addTransitionClass(el, enterFromClass);
            addTransitionClass(el, enterActiveClass);
        },
        onBeforeAppear(el) {
            onBeforeAppear && onBeforeAppear(el);
            addTransitionClass(el, appearFromClass);
            addTransitionClass(el, appearActiveClass);
        },
        onEnter: makeEnterHook(false),
        onAppear: makeEnterHook(true),
        onLeave(el, done) {
            const resolve = () => finishLeave(el, done);
            addTransitionClass(el, leaveFromClass);
            // force reflow so *-leave-from classes immediately take effect (#2593)
            forceReflow();
            addTransitionClass(el, leaveActiveClass);
            nextFrame(() => {
                removeTransitionClass(el, leaveFromClass);
                addTransitionClass(el, leaveToClass);
                if (!(onLeave && onLeave.length > 1)) {
                    whenTransitionEnds(el, type, leaveDuration, resolve);
                }
            });
            onLeave && onLeave(el, resolve);
        },
        onEnterCancelled(el) {
            finishEnter(el, false);
            onEnterCancelled && onEnterCancelled(el);
        },
        onAppearCancelled(el) {
            finishEnter(el, true);
            onAppearCancelled && onAppearCancelled(el);
        },
        onLeaveCancelled(el) {
            finishLeave(el);
            onLeaveCancelled && onLeaveCancelled(el);
        }
    });
}
function normalizeDuration(duration) {
    if (duration == null) {
        return null;
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(duration)) {
        return [NumberOf(duration.enter), NumberOf(duration.leave)];
    }
    else {
        const n = NumberOf(duration);
        return [n, n];
    }
}
function NumberOf(val) {
    const res = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(val);
    if ((true))
        validateDuration(res);
    return res;
}
function validateDuration(val) {
    if (typeof val !== 'number') {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`<transition> explicit duration is not a valid number - ` +
            `got ${JSON.stringify(val)}.`);
    }
    else if (isNaN(val)) {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`<transition> explicit duration is NaN - ` +
            'the duration expression might be incorrect.');
    }
}
function addTransitionClass(el, cls) {
    cls.split(/\s+/).forEach(c => c && el.classList.add(c));
    (el._vtc ||
        (el._vtc = new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
    cls.split(/\s+/).forEach(c => c && el.classList.remove(c));
    const { _vtc } = el;
    if (_vtc) {
        _vtc.delete(cls);
        if (!_vtc.size) {
            el._vtc = undefined;
        }
    }
}
function nextFrame(cb) {
    requestAnimationFrame(() => {
        requestAnimationFrame(cb);
    });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
    const id = (el._endId = ++endId);
    const resolveIfNotStale = () => {
        if (id === el._endId) {
            resolve();
        }
    };
    if (explicitTimeout) {
        return setTimeout(resolveIfNotStale, explicitTimeout);
    }
    const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
    if (!type) {
        return resolve();
    }
    const endEvent = type + 'end';
    let ended = 0;
    const end = () => {
        el.removeEventListener(endEvent, onEnd);
        resolveIfNotStale();
    };
    const onEnd = (e) => {
        if (e.target === el && ++ended >= propCount) {
            end();
        }
    };
    setTimeout(() => {
        if (ended < propCount) {
            end();
        }
    }, timeout + 1);
    el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
    const styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    const getStyleProperties = (key) => (styles[key] || '').split(', ');
    const transitionDelays = getStyleProperties(TRANSITION + 'Delay');
    const transitionDurations = getStyleProperties(TRANSITION + 'Duration');
    const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    const animationDelays = getStyleProperties(ANIMATION + 'Delay');
    const animationDurations = getStyleProperties(ANIMATION + 'Duration');
    const animationTimeout = getTimeout(animationDelays, animationDurations);
    let type = null;
    let timeout = 0;
    let propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
            type = TRANSITION;
            timeout = transitionTimeout;
            propCount = transitionDurations.length;
        }
    }
    else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
            type = ANIMATION;
            timeout = animationTimeout;
            propCount = animationDurations.length;
        }
    }
    else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type =
            timeout > 0
                ? transitionTimeout > animationTimeout
                    ? TRANSITION
                    : ANIMATION
                : null;
        propCount = type
            ? type === TRANSITION
                ? transitionDurations.length
                : animationDurations.length
            : 0;
    }
    const hasTransform = type === TRANSITION &&
        /\b(transform|all)(,|$)/.test(styles[TRANSITION + 'Property']);
    return {
        type,
        timeout,
        propCount,
        hasTransform
    };
}
function getTimeout(delays, durations) {
    while (delays.length < durations.length) {
        delays = delays.concat(delays);
    }
    return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
// Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors
function toMs(s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
// synchronously force layout to put elements into a certain state
function forceReflow() {
    return document.body.offsetHeight;
}

const positionMap = new WeakMap();
const newPositionMap = new WeakMap();
const TransitionGroupImpl = {
    name: 'TransitionGroup',
    props: /*#__PURE__*/ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, TransitionPropsValidators, {
        tag: String,
        moveClass: String
    }),
    setup(props, { slots }) {
        const instance = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
        const state = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useTransitionState)();
        let prevChildren;
        let children;
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUpdated)(() => {
            // children is guaranteed to exist after initial render
            if (!prevChildren.length) {
                return;
            }
            const moveClass = props.moveClass || `${props.name || 'v'}-move`;
            if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
                return;
            }
            // we divide the work into three loops to avoid mixing DOM reads and writes
            // in each iteration - which helps prevent layout thrashing.
            prevChildren.forEach(callPendingCbs);
            prevChildren.forEach(recordPosition);
            const movedChildren = prevChildren.filter(applyTranslation);
            // force reflow to put everything in position
            forceReflow();
            movedChildren.forEach(c => {
                const el = c.el;
                const style = el.style;
                addTransitionClass(el, moveClass);
                style.transform = style.webkitTransform = style.transitionDuration = '';
                const cb = (el._moveCb = (e) => {
                    if (e && e.target !== el) {
                        return;
                    }
                    if (!e || /transform$/.test(e.propertyName)) {
                        el.removeEventListener('transitionend', cb);
                        el._moveCb = null;
                        removeTransitionClass(el, moveClass);
                    }
                });
                el.addEventListener('transitionend', cb);
            });
        });
        return () => {
            const rawProps = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_2__.toRaw)(props);
            const cssTransitionProps = resolveTransitionProps(rawProps);
            const tag = rawProps.tag || _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Fragment;
            prevChildren = children;
            children = slots.default ? (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren)(slots.default()) : [];
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child.key != null) {
                    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks)(child, (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks)(child, cssTransitionProps, state, instance));
                }
                else if ((true)) {
                    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`<TransitionGroup> children must be keyed.`);
                }
            }
            if (prevChildren) {
                for (let i = 0; i < prevChildren.length; i++) {
                    const child = prevChildren[i];
                    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks)(child, (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks)(child, cssTransitionProps, state, instance));
                    positionMap.set(child, child.el.getBoundingClientRect());
                }
            }
            return (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createVNode)(tag, null, children);
        };
    }
};
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
    const el = c.el;
    if (el._moveCb) {
        el._moveCb();
    }
    if (el._enterCb) {
        el._enterCb();
    }
}
function recordPosition(c) {
    newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
    const oldPos = positionMap.get(c);
    const newPos = newPositionMap.get(c);
    const dx = oldPos.left - newPos.left;
    const dy = oldPos.top - newPos.top;
    if (dx || dy) {
        const s = c.el.style;
        s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
        s.transitionDuration = '0s';
        return c;
    }
}
function hasCSSTransform(el, root, moveClass) {
    // Detect whether an element with the move class applied has
    // CSS transitions. Since the element may be inside an entering
    // transition at this very moment, we make a clone of it and remove
    // all other transition classes applied to ensure only the move class
    // is applied.
    const clone = el.cloneNode();
    if (el._vtc) {
        el._vtc.forEach(cls => {
            cls.split(/\s+/).forEach(c => c && clone.classList.remove(c));
        });
    }
    moveClass.split(/\s+/).forEach(c => c && clone.classList.add(c));
    clone.style.display = 'none';
    const container = (root.nodeType === 1
        ? root
        : root.parentNode);
    container.appendChild(clone);
    const { hasTransform } = getTransitionInfo(clone);
    container.removeChild(clone);
    return hasTransform;
}

const getModelAssigner = (vnode) => {
    const fn = vnode.props['onUpdate:modelValue'];
    return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(fn) ? value => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(fn, value) : fn;
};
function onCompositionStart(e) {
    e.target.composing = true;
}
function onCompositionEnd(e) {
    const target = e.target;
    if (target.composing) {
        target.composing = false;
        trigger(target, 'input');
    }
}
function trigger(el, type) {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
}
// We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.
const vModelText = {
    created(el, { modifiers: { lazy, trim, number } }, vnode) {
        el._assign = getModelAssigner(vnode);
        const castToNumber = number || el.type === 'number';
        addEventListener(el, lazy ? 'change' : 'input', e => {
            if (e.target.composing)
                return;
            let domValue = el.value;
            if (trim) {
                domValue = domValue.trim();
            }
            else if (castToNumber) {
                domValue = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(domValue);
            }
            el._assign(domValue);
        });
        if (trim) {
            addEventListener(el, 'change', () => {
                el.value = el.value.trim();
            });
        }
        if (!lazy) {
            addEventListener(el, 'compositionstart', onCompositionStart);
            addEventListener(el, 'compositionend', onCompositionEnd);
            // Safari < 10.2 & UIWebView doesn't fire compositionend when
            // switching focus before confirming composition choice
            // this also fixes the issue where some browsers e.g. iOS Chrome
            // fires "change" instead of "input" on autocomplete.
            addEventListener(el, 'change', onCompositionEnd);
        }
    },
    // set value on mounted so it's after min/max for type="range"
    mounted(el, { value }) {
        el.value = value == null ? '' : value;
    },
    beforeUpdate(el, { value, modifiers: { trim, number } }, vnode) {
        el._assign = getModelAssigner(vnode);
        // avoid clearing unresolved text. #2302
        if (el.composing)
            return;
        if (document.activeElement === el) {
            if (trim && el.value.trim() === value) {
                return;
            }
            if ((number || el.type === 'number') && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(el.value) === value) {
                return;
            }
        }
        const newValue = value == null ? '' : value;
        if (el.value !== newValue) {
            el.value = newValue;
        }
    }
};
const vModelCheckbox = {
    created(el, _, vnode) {
        el._assign = getModelAssigner(vnode);
        addEventListener(el, 'change', () => {
            const modelValue = el._modelValue;
            const elementValue = getValue(el);
            const checked = el.checked;
            const assign = el._assign;
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(modelValue)) {
                const index = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(modelValue, elementValue);
                const found = index !== -1;
                if (checked && !found) {
                    assign(modelValue.concat(elementValue));
                }
                else if (!checked && found) {
                    const filtered = [...modelValue];
                    filtered.splice(index, 1);
                    assign(filtered);
                }
            }
            else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(modelValue)) {
                const cloned = new Set(modelValue);
                if (checked) {
                    cloned.add(elementValue);
                }
                else {
                    cloned.delete(elementValue);
                }
                assign(cloned);
            }
            else {
                assign(getCheckboxValue(el, checked));
            }
        });
    },
    // set initial checked on mount to wait for true-value/false-value
    mounted: setChecked,
    beforeUpdate(el, binding, vnode) {
        el._assign = getModelAssigner(vnode);
        setChecked(el, binding, vnode);
    }
};
function setChecked(el, { value, oldValue }, vnode) {
    el._modelValue = value;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
        el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(value, vnode.props.value) > -1;
    }
    else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value)) {
        el.checked = value.has(vnode.props.value);
    }
    else if (value !== oldValue) {
        el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(value, getCheckboxValue(el, true));
    }
}
const vModelRadio = {
    created(el, { value }, vnode) {
        el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(value, vnode.props.value);
        el._assign = getModelAssigner(vnode);
        addEventListener(el, 'change', () => {
            el._assign(getValue(el));
        });
    },
    beforeUpdate(el, { value, oldValue }, vnode) {
        el._assign = getModelAssigner(vnode);
        if (value !== oldValue) {
            el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(value, vnode.props.value);
        }
    }
};
const vModelSelect = {
    created(el, { value, modifiers: { number } }, vnode) {
        const isSetModel = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value);
        addEventListener(el, 'change', () => {
            const selectedVal = Array.prototype.filter
                .call(el.options, (o) => o.selected)
                .map((o) => number ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(getValue(o)) : getValue(o));
            el._assign(el.multiple
                ? isSetModel
                    ? new Set(selectedVal)
                    : selectedVal
                : selectedVal[0]);
        });
        el._assign = getModelAssigner(vnode);
    },
    // set value in mounted & updated because <select> relies on its children
    // <option>s.
    mounted(el, { value }) {
        setSelected(el, value);
    },
    beforeUpdate(el, _binding, vnode) {
        el._assign = getModelAssigner(vnode);
    },
    updated(el, { value }) {
        setSelected(el, value);
    }
};
function setSelected(el, value) {
    const isMultiple = el.multiple;
    if (isMultiple && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value)) {
        ( true) &&
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`<select multiple v-model> expects an Array or Set value for its binding, ` +
                `but got ${Object.prototype.toString.call(value).slice(8, -1)}.`);
        return;
    }
    for (let i = 0, l = el.options.length; i < l; i++) {
        const option = el.options[i];
        const optionValue = getValue(option);
        if (isMultiple) {
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
                option.selected = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(value, optionValue) > -1;
            }
            else {
                option.selected = value.has(optionValue);
            }
        }
        else {
            if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(getValue(option), value)) {
                el.selectedIndex = i;
                return;
            }
        }
    }
    if (!isMultiple) {
        el.selectedIndex = -1;
    }
}
// retrieve raw value set via :value bindings
function getValue(el) {
    return '_value' in el ? el._value : el.value;
}
// retrieve raw value for true-value and false-value set via :true-value or :false-value bindings
function getCheckboxValue(el, checked) {
    const key = checked ? '_trueValue' : '_falseValue';
    return key in el ? el[key] : checked;
}
const vModelDynamic = {
    created(el, binding, vnode) {
        callModelHook(el, binding, vnode, null, 'created');
    },
    mounted(el, binding, vnode) {
        callModelHook(el, binding, vnode, null, 'mounted');
    },
    beforeUpdate(el, binding, vnode, prevVNode) {
        callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
    },
    updated(el, binding, vnode, prevVNode) {
        callModelHook(el, binding, vnode, prevVNode, 'updated');
    }
};
function callModelHook(el, binding, vnode, prevVNode, hook) {
    let modelToUse;
    switch (el.tagName) {
        case 'SELECT':
            modelToUse = vModelSelect;
            break;
        case 'TEXTAREA':
            modelToUse = vModelText;
            break;
        default:
            switch (vnode.props && vnode.props.type) {
                case 'checkbox':
                    modelToUse = vModelCheckbox;
                    break;
                case 'radio':
                    modelToUse = vModelRadio;
                    break;
                default:
                    modelToUse = vModelText;
            }
    }
    const fn = modelToUse[hook];
    fn && fn(el, binding, vnode, prevVNode);
}

const systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
const modifierGuards = {
    stop: e => e.stopPropagation(),
    prevent: e => e.preventDefault(),
    self: e => e.target !== e.currentTarget,
    ctrl: e => !e.ctrlKey,
    shift: e => !e.shiftKey,
    alt: e => !e.altKey,
    meta: e => !e.metaKey,
    left: e => 'button' in e && e.button !== 0,
    middle: e => 'button' in e && e.button !== 1,
    right: e => 'button' in e && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some(m => e[`${m}Key`] && !modifiers.includes(m))
};
/**
 * @private
 */
const withModifiers = (fn, modifiers) => {
    return (event, ...args) => {
        for (let i = 0; i < modifiers.length; i++) {
            const guard = modifierGuards[modifiers[i]];
            if (guard && guard(event, modifiers))
                return;
        }
        return fn(event, ...args);
    };
};
// Kept for 2.x compat.
// Note: IE11 compat for `spacebar` and `del` is removed for now.
const keyNames = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace'
};
/**
 * @private
 */
const withKeys = (fn, modifiers) => {
    return (event) => {
        if (!('key' in event))
            return;
        const eventKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event.key);
        if (
        // None of the provided key modifiers match the current event key
        !modifiers.some(k => k === eventKey || keyNames[k] === eventKey)) {
            return;
        }
        return fn(event);
    };
};

const vShow = {
    beforeMount(el, { value }, { transition }) {
        el._vod = el.style.display === 'none' ? '' : el.style.display;
        if (transition && value) {
            transition.beforeEnter(el);
        }
        else {
            setDisplay(el, value);
        }
    },
    mounted(el, { value }, { transition }) {
        if (transition && value) {
            transition.enter(el);
        }
    },
    updated(el, { value, oldValue }, { transition }) {
        if (transition && value !== oldValue) {
            if (value) {
                transition.beforeEnter(el);
                setDisplay(el, true);
                transition.enter(el);
            }
            else {
                transition.leave(el, () => {
                    setDisplay(el, false);
                });
            }
        }
        else {
            setDisplay(el, value);
        }
    },
    beforeUnmount(el, { value }) {
        setDisplay(el, value);
    }
};
function setDisplay(el, value) {
    el.style.display = value ? el._vod : 'none';
}

const rendererOptions = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({ patchProp, forcePatchProp }, nodeOps);
// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer;
let enabledHydration = false;
function ensureRenderer() {
    return renderer || (renderer = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createRenderer)(rendererOptions));
}
function ensureHydrationRenderer() {
    renderer = enabledHydration
        ? renderer
        : (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer)(rendererOptions);
    enabledHydration = true;
    return renderer;
}
// use explicit type casts here to avoid import() calls in rolled-up d.ts
const render = ((...args) => {
    ensureRenderer().render(...args);
});
const hydrate = ((...args) => {
    ensureHydrationRenderer().hydrate(...args);
});
const createApp = ((...args) => {
    const app = ensureRenderer().createApp(...args);
    if ((true)) {
        injectNativeTagCheck(app);
    }
    const { mount } = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
            return;
        const component = app._component;
        if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(component) && !component.render && !component.template) {
            component.template = container.innerHTML;
        }
        // clear content before mounting
        container.innerHTML = '';
        const proxy = mount(container);
        if (container instanceof Element) {
            container.removeAttribute('v-cloak');
            container.setAttribute('data-v-app', '');
        }
        return proxy;
    };
    return app;
});
const createSSRApp = ((...args) => {
    const app = ensureHydrationRenderer().createApp(...args);
    if ((true)) {
        injectNativeTagCheck(app);
    }
    const { mount } = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (container) {
            return mount(container, true);
        }
    };
    return app;
});
function injectNativeTagCheck(app) {
    // Inject `isNativeTag`
    // this is used for component name validation (dev only)
    Object.defineProperty(app.config, 'isNativeTag', {
        value: (tag) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isHTMLTag)(tag) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSVGTag)(tag),
        writable: false
    });
}
function normalizeContainer(container) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(container)) {
        const res = document.querySelector(container);
        if (( true) && !res) {
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`Failed to mount app: mount target selector "${container}" returned null.`);
        }
        return res;
    }
    if (( true) &&
        container instanceof ShadowRoot &&
        container.mode === 'closed') {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    }
    return container;
}




/***/ }),

/***/ "./node_modules/@vue/shared/dist/shared.esm-bundler.js":
/*!*************************************************************!*\
  !*** ./node_modules/@vue/shared/dist/shared.esm-bundler.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMPTY_ARR": () => (/* binding */ EMPTY_ARR),
/* harmony export */   "EMPTY_OBJ": () => (/* binding */ EMPTY_OBJ),
/* harmony export */   "NO": () => (/* binding */ NO),
/* harmony export */   "NOOP": () => (/* binding */ NOOP),
/* harmony export */   "PatchFlagNames": () => (/* binding */ PatchFlagNames),
/* harmony export */   "babelParserDefaultPlugins": () => (/* binding */ babelParserDefaultPlugins),
/* harmony export */   "camelize": () => (/* binding */ camelize),
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "def": () => (/* binding */ def),
/* harmony export */   "escapeHtml": () => (/* binding */ escapeHtml),
/* harmony export */   "escapeHtmlComment": () => (/* binding */ escapeHtmlComment),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "generateCodeFrame": () => (/* binding */ generateCodeFrame),
/* harmony export */   "getGlobalThis": () => (/* binding */ getGlobalThis),
/* harmony export */   "hasChanged": () => (/* binding */ hasChanged),
/* harmony export */   "hasOwn": () => (/* binding */ hasOwn),
/* harmony export */   "hyphenate": () => (/* binding */ hyphenate),
/* harmony export */   "invokeArrayFns": () => (/* binding */ invokeArrayFns),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isBooleanAttr": () => (/* binding */ isBooleanAttr),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isGloballyWhitelisted": () => (/* binding */ isGloballyWhitelisted),
/* harmony export */   "isHTMLTag": () => (/* binding */ isHTMLTag),
/* harmony export */   "isIntegerKey": () => (/* binding */ isIntegerKey),
/* harmony export */   "isKnownAttr": () => (/* binding */ isKnownAttr),
/* harmony export */   "isMap": () => (/* binding */ isMap),
/* harmony export */   "isModelListener": () => (/* binding */ isModelListener),
/* harmony export */   "isNoUnitNumericStyleProp": () => (/* binding */ isNoUnitNumericStyleProp),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isOn": () => (/* binding */ isOn),
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject),
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "isReservedProp": () => (/* binding */ isReservedProp),
/* harmony export */   "isSSRSafeAttrName": () => (/* binding */ isSSRSafeAttrName),
/* harmony export */   "isSVGTag": () => (/* binding */ isSVGTag),
/* harmony export */   "isSet": () => (/* binding */ isSet),
/* harmony export */   "isSpecialBooleanAttr": () => (/* binding */ isSpecialBooleanAttr),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isSymbol": () => (/* binding */ isSymbol),
/* harmony export */   "isVoidTag": () => (/* binding */ isVoidTag),
/* harmony export */   "looseEqual": () => (/* binding */ looseEqual),
/* harmony export */   "looseIndexOf": () => (/* binding */ looseIndexOf),
/* harmony export */   "makeMap": () => (/* binding */ makeMap),
/* harmony export */   "normalizeClass": () => (/* binding */ normalizeClass),
/* harmony export */   "normalizeStyle": () => (/* binding */ normalizeStyle),
/* harmony export */   "objectToString": () => (/* binding */ objectToString),
/* harmony export */   "parseStringStyle": () => (/* binding */ parseStringStyle),
/* harmony export */   "propsToAttrMap": () => (/* binding */ propsToAttrMap),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "slotFlagsText": () => (/* binding */ slotFlagsText),
/* harmony export */   "stringifyStyle": () => (/* binding */ stringifyStyle),
/* harmony export */   "toDisplayString": () => (/* binding */ toDisplayString),
/* harmony export */   "toHandlerKey": () => (/* binding */ toHandlerKey),
/* harmony export */   "toNumber": () => (/* binding */ toNumber),
/* harmony export */   "toRawType": () => (/* binding */ toRawType),
/* harmony export */   "toTypeString": () => (/* binding */ toTypeString)
/* harmony export */ });
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}

/**
 * dev only flag -> name mapping
 */
const PatchFlagNames = {
    [1 /* TEXT */]: `TEXT`,
    [2 /* CLASS */]: `CLASS`,
    [4 /* STYLE */]: `STYLE`,
    [8 /* PROPS */]: `PROPS`,
    [16 /* FULL_PROPS */]: `FULL_PROPS`,
    [32 /* HYDRATE_EVENTS */]: `HYDRATE_EVENTS`,
    [64 /* STABLE_FRAGMENT */]: `STABLE_FRAGMENT`,
    [128 /* KEYED_FRAGMENT */]: `KEYED_FRAGMENT`,
    [256 /* UNKEYED_FRAGMENT */]: `UNKEYED_FRAGMENT`,
    [512 /* NEED_PATCH */]: `NEED_PATCH`,
    [1024 /* DYNAMIC_SLOTS */]: `DYNAMIC_SLOTS`,
    [2048 /* DEV_ROOT_FRAGMENT */]: `DEV_ROOT_FRAGMENT`,
    [-1 /* HOISTED */]: `HOISTED`,
    [-2 /* BAIL */]: `BAIL`
};

/**
 * Dev only
 */
const slotFlagsText = {
    [1 /* STABLE */]: 'STABLE',
    [2 /* DYNAMIC */]: 'DYNAMIC',
    [3 /* FORWARDED */]: 'FORWARDED'
};

const GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' +
    'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' +
    'Object,Boolean,String,RegExp,Map,Set,JSON,Intl';
const isGloballyWhitelisted = /*#__PURE__*/ makeMap(GLOBALS_WHITE_LISTED);

const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}

/**
 * On the client we only need to offer special cases for boolean attributes that
 * have different names from their corresponding dom properties:
 * - itemscope -> N/A
 * - allowfullscreen -> allowFullscreen
 * - formnovalidate -> formNoValidate
 * - ismap -> isMap
 * - nomodule -> noModule
 * - novalidate -> noValidate
 * - readonly -> readOnly
 */
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs);
/**
 * The full list is needed during SSR to produce the correct initial markup.
 */
const isBooleanAttr = /*#__PURE__*/ makeMap(specialBooleanAttrs +
    `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,` +
    `loop,open,required,reversed,scoped,seamless,` +
    `checked,muted,multiple,selected`);
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
    if (attrValidationCache.hasOwnProperty(name)) {
        return attrValidationCache[name];
    }
    const isUnsafe = unsafeAttrCharRE.test(name);
    if (isUnsafe) {
        console.error(`unsafe attribute name: ${name}`);
    }
    return (attrValidationCache[name] = !isUnsafe);
}
const propsToAttrMap = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
};
/**
 * CSS properties that accept plain numbers
 */
const isNoUnitNumericStyleProp = /*#__PURE__*/ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,` +
    `border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,` +
    `columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,` +
    `grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,` +
    `grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,` +
    `line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,` +
    // SVG
    `fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,` +
    `stroke-miterlimit,stroke-opacity,stroke-width`);
/**
 * Known attributes, this is used for stringification of runtime static nodes
 * so that we don't stringify bindings that cannot be set from HTML.
 * Don't also forget to allow `data-*` and `aria-*`!
 * Generated from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 */
const isKnownAttr = /*#__PURE__*/ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,` +
    `autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,` +
    `border,buffered,capture,challenge,charset,checked,cite,class,code,` +
    `codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,` +
    `coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,` +
    `disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,` +
    `formaction,formenctype,formmethod,formnovalidate,formtarget,headers,` +
    `height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,` +
    `ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,` +
    `manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,` +
    `open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,` +
    `referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,` +
    `selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,` +
    `start,step,style,summary,tabindex,target,title,translate,type,usemap,` +
    `value,width,wrap`);

function normalizeStyle(value) {
    if (isArray(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
            const item = value[i];
            const normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);
            if (normalized) {
                for (const key in normalized) {
                    res[key] = normalized[key];
                }
            }
        }
        return res;
    }
    else if (isObject(value)) {
        return value;
    }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
    const ret = {};
    cssText.split(listDelimiterRE).forEach(item => {
        if (item) {
            const tmp = item.split(propertyDelimiterRE);
            tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
    });
    return ret;
}
function stringifyStyle(styles) {
    let ret = '';
    if (!styles) {
        return ret;
    }
    for (const key in styles) {
        const value = styles[key];
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        if (isString(value) ||
            (typeof value === 'number' && isNoUnitNumericStyleProp(normalizedKey))) {
            // only render valid values
            ret += `${normalizedKey}:${value};`;
        }
    }
    return ret;
}
function normalizeClass(value) {
    let res = '';
    if (isString(value)) {
        res = value;
    }
    else if (isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            res += normalizeClass(value[i]) + ' ';
        }
    }
    else if (isObject(value)) {
        for (const name in value) {
            if (value[name]) {
                res += name + ' ';
            }
        }
    }
    return res.trim();
}

// These tag configs are shared between compiler-dom and runtime-dom, so they
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
const HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' +
    'header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,' +
    'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' +
    'data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,' +
    'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' +
    'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' +
    'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' +
    'option,output,progress,select,textarea,details,dialog,menu,' +
    'summary,template,blockquote,iframe,tfoot';
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element
const SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' +
    'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' +
    'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' +
    'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' +
    'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' +
    'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' +
    'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' +
    'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' +
    'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' +
    'text,textPath,title,tspan,unknown,use,view';
const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';
const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS);
const isSVGTag = /*#__PURE__*/ makeMap(SVG_TAGS);
const isVoidTag = /*#__PURE__*/ makeMap(VOID_TAGS);

const escapeRE = /["'&<>]/;
function escapeHtml(string) {
    const str = '' + string;
    const match = escapeRE.exec(str);
    if (!match) {
        return str;
    }
    let html = '';
    let escaped;
    let index;
    let lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escaped = '&quot;';
                break;
            case 38: // &
                escaped = '&amp;';
                break;
            case 39: // '
                escaped = '&#39;';
                break;
            case 60: // <
                escaped = '&lt;';
                break;
            case 62: // >
                escaped = '&gt;';
                break;
            default:
                continue;
        }
        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// https://www.w3.org/TR/html52/syntax.html#comments
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
    return src.replace(commentStripRE, '');
}

function looseCompareArrays(a, b) {
    if (a.length !== b.length)
        return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
        equal = looseEqual(a[i], b[i]);
    }
    return equal;
}
function looseEqual(a, b) {
    if (a === b)
        return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
        return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
        return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
        /* istanbul ignore if: this if will probably never be called */
        if (!aValidType || !bValidType) {
            return false;
        }
        const aKeysCount = Object.keys(a).length;
        const bKeysCount = Object.keys(b).length;
        if (aKeysCount !== bKeysCount) {
            return false;
        }
        for (const key in a) {
            const aHasKey = a.hasOwnProperty(key);
            const bHasKey = b.hasOwnProperty(key);
            if ((aHasKey && !bHasKey) ||
                (!aHasKey && bHasKey) ||
                !looseEqual(a[key], b[key])) {
                return false;
            }
        }
    }
    return String(a) === String(b);
}
function looseIndexOf(arr, val) {
    return arr.findIndex(item => looseEqual(item, val));
}

/**
 * For converting {{ interpolation }} values to displayed strings.
 * @private
 */
const toDisplayString = (val) => {
    return val == null
        ? ''
        : isObject(val)
            ? JSON.stringify(val, replacer, 2)
            : String(val);
};
const replacer = (_key, val) => {
    if (isMap(val)) {
        return {
            [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val]) => {
                entries[`${key} =>`] = val;
                return entries;
            }, {})
        };
    }
    else if (isSet(val)) {
        return {
            [`Set(${val.size})`]: [...val.values()]
        };
    }
    else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
        return String(val);
    }
    return val;
};

/**
 * List of @babel/parser plugins that are used for template expression
 * transforms and SFC script transforms. By default we enable proposals slated
 * for ES2020. This will need to be updated as the spec moves forward.
 * Full list at https://babeljs.io/docs/en/next/babel-parser#plugins
 */
const babelParserDefaultPlugins = [
    'bigInt',
    'optionalChaining',
    'nullishCoalescingOperator'
];
const EMPTY_OBJ = ( true)
    ? Object.freeze({})
    : 0;
const EMPTY_ARR = ( true) ? Object.freeze([]) : 0;
const NOOP = () => { };
/**
 * Always return false.
 */
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith('onUpdate:');
const extend = Object.assign;
const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === '[object Map]';
const isSet = (val) => toTypeString(val) === '[object Set]';
const isDate = (val) => val instanceof Date;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isSymbol = (val) => typeof val === 'symbol';
const isObject = (val) => val !== null && typeof val === 'object';
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
const isIntegerKey = (key) => isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key;
const isReservedProp = /*#__PURE__*/ makeMap(
// the leading comma is intentional so empty string "" is also included
',key,ref,' +
    'onVnodeBeforeMount,onVnodeMounted,' +
    'onVnodeBeforeUpdate,onVnodeUpdated,' +
    'onVnodeBeforeUnmount,onVnodeUnmounted');
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
const camelizeRE = /-(\w)/g;
/**
 * @private
 */
const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
const hyphenateRE = /\B([A-Z])/g;
/**
 * @private
 */
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, '-$1').toLowerCase());
/**
 * @private
 */
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
/**
 * @private
 */
const toHandlerKey = cacheStringFunction((str) => (str ? `on${capitalize(str)}` : ``));
// compare whether a value has changed, accounting for NaN.
const hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
const invokeArrayFns = (fns, arg) => {
    for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
    }
};
const def = (obj, key, value) => {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
    });
};
const toNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
    return (_globalThis ||
        (_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof __webpack_require__.g !== 'undefined'
                            ? __webpack_require__.g
                            : {}));
};




/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./resources/js/bootstrap.js":
/*!***********************************!*\
  !*** ./resources/js/bootstrap.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/***/ }),

/***/ "./resources/js/feedback.js":
/*!**********************************!*\
  !*** ./resources/js/feedback.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _gripeless_pico__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gripeless/pico */ "./node_modules/@gripeless/pico/dist/index.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

__webpack_require__(/*! ./bootstrap */ "./resources/js/bootstrap.js");



var hostname = 'api.feedback.com';
var feedbackElement = document.createElement('div');
feedbackElement.id = 'feedback';
document.body.appendChild(feedbackElement);
var Form = {
  data: function data() {
    return {
      message: ''
    };
  },
  template: "\n        <form role=\"form\">\n            <textarea v-model=\"message\" placeholder=\"Feedback goes here\"></textarea>\n            <button type=\"submit\">Submit</button>\n            <button type=\"button\">Screenshot</button>\n        </form>\n    "
};
vue__WEBPACK_IMPORTED_MODULE_1__.createApp({
  data: function data() {
    return {
      key: ''
    };
  },
  mounted: function mounted() {
    this.key = this.getKey();
  },
  template: "<Form />",
  methods: {
    getKey: function getKey() {
      var allScripts = document.getElementsByTagName('script');
      var key = '';

      for (var i = 0; i < allScripts.length; i++) {
        if (!allScripts[i].src.includes(hostname)) continue;
        key = allScripts[i].getAttribute('src').match(/\?key=(.*)$/);
      }

      console.log(key);
      return key;
    },
    takeScreenshot: function takeScreenshot() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var screenshot;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _gripeless_pico__WEBPACK_IMPORTED_MODULE_2__.dataURL(window, {});

              case 2:
                screenshot = _context.sent.value;
                console.log(screenshot);
                return _context.abrupt("return", screenshot);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    submit: function submit() {
      var _this = this;

      axios.post("https://".concat(hostname, "/feedback"), this.message).then(function (response) {
        _this.submitted = true;
      })["catch"](function (err) {
        _this.submitted = false;
      });
    }
  }
}).mount('#feedback');

/***/ }),

/***/ "./node_modules/fluture/index.js":
/*!***************************************!*\
  !*** ./node_modules/fluture/index.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.Future),
/* harmony export */   "Future": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.Future),
/* harmony export */   "isFuture": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.isFuture),
/* harmony export */   "isNever": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.isNever),
/* harmony export */   "never": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.never),
/* harmony export */   "reject": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.reject),
/* harmony export */   "resolve": () => (/* reexport safe */ _src_future_js__WEBPACK_IMPORTED_MODULE_0__.resolve),
/* harmony export */   "after": () => (/* reexport safe */ _src_after_js__WEBPACK_IMPORTED_MODULE_1__.after),
/* harmony export */   "alt": () => (/* reexport safe */ _src_alt_js__WEBPACK_IMPORTED_MODULE_2__.alt),
/* harmony export */   "and": () => (/* reexport safe */ _src_and_js__WEBPACK_IMPORTED_MODULE_3__.and),
/* harmony export */   "ap": () => (/* reexport safe */ _src_ap_js__WEBPACK_IMPORTED_MODULE_4__.ap),
/* harmony export */   "attemptP": () => (/* reexport safe */ _src_attempt_p_js__WEBPACK_IMPORTED_MODULE_5__.attemptP),
/* harmony export */   "attempt": () => (/* reexport safe */ _src_attempt_js__WEBPACK_IMPORTED_MODULE_6__.attempt),
/* harmony export */   "bimap": () => (/* reexport safe */ _src_bimap_js__WEBPACK_IMPORTED_MODULE_7__.bimap),
/* harmony export */   "bichain": () => (/* reexport safe */ _src_bichain_js__WEBPACK_IMPORTED_MODULE_8__.bichain),
/* harmony export */   "both": () => (/* reexport safe */ _src_both_js__WEBPACK_IMPORTED_MODULE_9__.both),
/* harmony export */   "cache": () => (/* reexport safe */ _src_cache_js__WEBPACK_IMPORTED_MODULE_10__.cache),
/* harmony export */   "chainRej": () => (/* reexport safe */ _src_chain_rej_js__WEBPACK_IMPORTED_MODULE_11__.chainRej),
/* harmony export */   "chain": () => (/* reexport safe */ _src_chain_js__WEBPACK_IMPORTED_MODULE_12__.chain),
/* harmony export */   "done": () => (/* reexport safe */ _src_done_js__WEBPACK_IMPORTED_MODULE_13__.done),
/* harmony export */   "encaseP": () => (/* reexport safe */ _src_encase_p_js__WEBPACK_IMPORTED_MODULE_14__.encaseP),
/* harmony export */   "encase": () => (/* reexport safe */ _src_encase_js__WEBPACK_IMPORTED_MODULE_15__.encase),
/* harmony export */   "extractLeft": () => (/* reexport safe */ _src_extract_left_js__WEBPACK_IMPORTED_MODULE_16__.extractLeft),
/* harmony export */   "extractRight": () => (/* reexport safe */ _src_extract_right_js__WEBPACK_IMPORTED_MODULE_17__.extractRight),
/* harmony export */   "coalesce": () => (/* reexport safe */ _src_coalesce_js__WEBPACK_IMPORTED_MODULE_18__.coalesce),
/* harmony export */   "forkCatch": () => (/* reexport safe */ _src_fork_catch_js__WEBPACK_IMPORTED_MODULE_19__.forkCatch),
/* harmony export */   "fork": () => (/* reexport safe */ _src_fork_js__WEBPACK_IMPORTED_MODULE_20__.fork),
/* harmony export */   "go": () => (/* reexport safe */ _src_go_js__WEBPACK_IMPORTED_MODULE_21__.go),
/* harmony export */   "hook": () => (/* reexport safe */ _src_hook_js__WEBPACK_IMPORTED_MODULE_22__.hook),
/* harmony export */   "lastly": () => (/* reexport safe */ _src_lastly_js__WEBPACK_IMPORTED_MODULE_23__.lastly),
/* harmony export */   "mapRej": () => (/* reexport safe */ _src_map_rej_js__WEBPACK_IMPORTED_MODULE_24__.mapRej),
/* harmony export */   "map": () => (/* reexport safe */ _src_map_js__WEBPACK_IMPORTED_MODULE_25__.map),
/* harmony export */   "node": () => (/* reexport safe */ _src_node_js__WEBPACK_IMPORTED_MODULE_26__.node),
/* harmony export */   "pap": () => (/* reexport safe */ _src_pap_js__WEBPACK_IMPORTED_MODULE_27__.pap),
/* harmony export */   "parallel": () => (/* reexport safe */ _src_parallel_js__WEBPACK_IMPORTED_MODULE_28__.parallel),
/* harmony export */   "Par": () => (/* reexport safe */ _src_par_js__WEBPACK_IMPORTED_MODULE_29__.Par),
/* harmony export */   "promise": () => (/* reexport safe */ _src_promise_js__WEBPACK_IMPORTED_MODULE_30__.promise),
/* harmony export */   "race": () => (/* reexport safe */ _src_race_js__WEBPACK_IMPORTED_MODULE_31__.race),
/* harmony export */   "rejectAfter": () => (/* reexport safe */ _src_reject_after_js__WEBPACK_IMPORTED_MODULE_32__.rejectAfter),
/* harmony export */   "seq": () => (/* reexport safe */ _src_seq_js__WEBPACK_IMPORTED_MODULE_33__.seq),
/* harmony export */   "swap": () => (/* reexport safe */ _src_swap_js__WEBPACK_IMPORTED_MODULE_34__.swap),
/* harmony export */   "value": () => (/* reexport safe */ _src_value_js__WEBPACK_IMPORTED_MODULE_35__.value),
/* harmony export */   "debugMode": () => (/* reexport safe */ _src_internal_debug_js__WEBPACK_IMPORTED_MODULE_36__.debugMode)
/* harmony export */ });
/* harmony import */ var _src_future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/future.js */ "./node_modules/fluture/src/future.js");
/* harmony import */ var _src_after_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/after.js */ "./node_modules/fluture/src/after.js");
/* harmony import */ var _src_alt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/alt.js */ "./node_modules/fluture/src/alt.js");
/* harmony import */ var _src_and_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/and.js */ "./node_modules/fluture/src/and.js");
/* harmony import */ var _src_ap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/ap.js */ "./node_modules/fluture/src/ap.js");
/* harmony import */ var _src_attempt_p_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/attempt-p.js */ "./node_modules/fluture/src/attempt-p.js");
/* harmony import */ var _src_attempt_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/attempt.js */ "./node_modules/fluture/src/attempt.js");
/* harmony import */ var _src_bimap_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/bimap.js */ "./node_modules/fluture/src/bimap.js");
/* harmony import */ var _src_bichain_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/bichain.js */ "./node_modules/fluture/src/bichain.js");
/* harmony import */ var _src_both_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/both.js */ "./node_modules/fluture/src/both.js");
/* harmony import */ var _src_cache_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/cache.js */ "./node_modules/fluture/src/cache.js");
/* harmony import */ var _src_chain_rej_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/chain-rej.js */ "./node_modules/fluture/src/chain-rej.js");
/* harmony import */ var _src_chain_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/chain.js */ "./node_modules/fluture/src/chain.js");
/* harmony import */ var _src_done_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/done.js */ "./node_modules/fluture/src/done.js");
/* harmony import */ var _src_encase_p_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/encase-p.js */ "./node_modules/fluture/src/encase-p.js");
/* harmony import */ var _src_encase_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./src/encase.js */ "./node_modules/fluture/src/encase.js");
/* harmony import */ var _src_extract_left_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./src/extract-left.js */ "./node_modules/fluture/src/extract-left.js");
/* harmony import */ var _src_extract_right_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./src/extract-right.js */ "./node_modules/fluture/src/extract-right.js");
/* harmony import */ var _src_coalesce_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./src/coalesce.js */ "./node_modules/fluture/src/coalesce.js");
/* harmony import */ var _src_fork_catch_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./src/fork-catch.js */ "./node_modules/fluture/src/fork-catch.js");
/* harmony import */ var _src_fork_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./src/fork.js */ "./node_modules/fluture/src/fork.js");
/* harmony import */ var _src_go_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./src/go.js */ "./node_modules/fluture/src/go.js");
/* harmony import */ var _src_hook_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./src/hook.js */ "./node_modules/fluture/src/hook.js");
/* harmony import */ var _src_lastly_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./src/lastly.js */ "./node_modules/fluture/src/lastly.js");
/* harmony import */ var _src_map_rej_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./src/map-rej.js */ "./node_modules/fluture/src/map-rej.js");
/* harmony import */ var _src_map_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./src/map.js */ "./node_modules/fluture/src/map.js");
/* harmony import */ var _src_node_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./src/node.js */ "./node_modules/fluture/src/node.js");
/* harmony import */ var _src_pap_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./src/pap.js */ "./node_modules/fluture/src/pap.js");
/* harmony import */ var _src_parallel_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./src/parallel.js */ "./node_modules/fluture/src/parallel.js");
/* harmony import */ var _src_par_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./src/par.js */ "./node_modules/fluture/src/par.js");
/* harmony import */ var _src_promise_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./src/promise.js */ "./node_modules/fluture/src/promise.js");
/* harmony import */ var _src_race_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./src/race.js */ "./node_modules/fluture/src/race.js");
/* harmony import */ var _src_reject_after_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./src/reject-after.js */ "./node_modules/fluture/src/reject-after.js");
/* harmony import */ var _src_seq_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./src/seq.js */ "./node_modules/fluture/src/seq.js");
/* harmony import */ var _src_swap_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./src/swap.js */ "./node_modules/fluture/src/swap.js");
/* harmony import */ var _src_value_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./src/value.js */ "./node_modules/fluture/src/value.js");
/* harmony import */ var _src_internal_debug_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./src/internal/debug.js */ "./node_modules/fluture/src/internal/debug.js");









































/***/ }),

/***/ "./node_modules/fluture/src/after.js":
/*!*******************************************!*\
  !*** ./node_modules/fluture/src/after.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "After": () => (/* binding */ After),
/* harmony export */   "after": () => (/* binding */ after)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


var After = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.createInterpreter)(2, 'after', function After$interpret(rec, rej, res){
  var id = setTimeout(res, this.$1, this.$2);
  return function After$cancel(){ clearTimeout(id) };
});

After.prototype.extractRight = function After$extractRight(){
  return [this.$2];
};

function alwaysNever(_){
  return _future_js__WEBPACK_IMPORTED_MODULE_0__.never;
}

function after(time){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(after, _future_js__WEBPACK_IMPORTED_MODULE_0__.positiveInteger, arguments);
  return time === Infinity ? alwaysNever : (function after(value){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(2, after, _future_js__WEBPACK_IMPORTED_MODULE_0__.any, arguments, context1);
    return new After(context2, time, value);
  });
}


/***/ }),

/***/ "./node_modules/fluture/src/alt.js":
/*!*****************************************!*\
  !*** ./node_modules/fluture/src/alt.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alternative": () => (/* binding */ alternative),
/* harmony export */   "alt": () => (/* binding */ alt)
/* harmony export */ });
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





var alternative = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__.isAlt, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidArgumentOf)('have Alt implemented')};

function alt(left){
  if((0,_future_js__WEBPACK_IMPORTED_MODULE_3__.isFuture)(left)){
    var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(alt, _future_js__WEBPACK_IMPORTED_MODULE_3__.future, arguments);
    return function alt(right){
      var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, alt, _future_js__WEBPACK_IMPORTED_MODULE_3__.future, arguments, context1);
      return right._transform(new _future_js__WEBPACK_IMPORTED_MODULE_3__.AltTransformation(context2, left));
    };
  }

  var context = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(alt, alternative, arguments);
  return function alt(right){
    (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, alt, alternative, arguments, context);
    return left[_internal_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.alt](right);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/and.js":
/*!*****************************************!*\
  !*** ./node_modules/fluture/src/and.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AndTransformation": () => (/* binding */ AndTransformation),
/* harmony export */   "and": () => (/* binding */ and)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


var AndTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.createTransformation)(1, 'and', {
  resolved: function AndTransformation$resolved(){ return this.$1 }
});

function and(left){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(and, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments);
  return function and(right){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(2, and, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments, context1);
    return right._transform(new AndTransformation(context2, left));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/ap.js":
/*!****************************************!*\
  !*** ./node_modules/fluture/src/ap.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apply": () => (/* binding */ apply),
/* harmony export */   "ap": () => (/* binding */ ap)
/* harmony export */ });
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





var apply = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__.isApply, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidArgumentOf)('have Apply implemented')};

function ap(mx){
  if((0,_future_js__WEBPACK_IMPORTED_MODULE_3__.isFuture)(mx)){
    var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(ap, _future_js__WEBPACK_IMPORTED_MODULE_3__.future, arguments);
    return function ap(mf){
      var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, ap, _future_js__WEBPACK_IMPORTED_MODULE_3__.future, arguments, context1);
      return mf._transform(new _future_js__WEBPACK_IMPORTED_MODULE_3__.ApTransformation(context2, mx));
    };
  }

  var context = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(ap, apply, arguments);
  return function ap(mf){
    (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, ap, apply, arguments, context);
    return mx[_internal_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.ap](mf);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/attempt-p.js":
/*!***********************************************!*\
  !*** ./node_modules/fluture/src/attempt-p.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attemptP": () => (/* binding */ attemptP)
/* harmony export */ });
/* harmony import */ var _encase_p_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encase-p.js */ "./node_modules/fluture/src/encase-p.js");


function attemptP(_){
  return _encase_p_js__WEBPACK_IMPORTED_MODULE_0__.encaseP.apply(this, arguments)(undefined);
}


/***/ }),

/***/ "./node_modules/fluture/src/attempt.js":
/*!*********************************************!*\
  !*** ./node_modules/fluture/src/attempt.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attempt": () => (/* binding */ attempt)
/* harmony export */ });
/* harmony import */ var _encase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encase.js */ "./node_modules/fluture/src/encase.js");


function attempt(_){
  return _encase_js__WEBPACK_IMPORTED_MODULE_0__.encase.apply(this, arguments)(undefined);
}


/***/ }),

/***/ "./node_modules/fluture/src/bichain.js":
/*!*********************************************!*\
  !*** ./node_modules/fluture/src/bichain.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BichainTransformation": () => (/* binding */ BichainTransformation),
/* harmony export */   "bichain": () => (/* binding */ bichain)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");



var BichainTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.createTransformation)(2, 'bichain', {
  rejected: function BichainTransformation$rejected(x){ return (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.call)(this.$1, x) },
  resolved: function BichainTransformation$resolved(x){ return (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.call)(this.$2, x) }
});

function bichain(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(bichain, _future_js__WEBPACK_IMPORTED_MODULE_0__.func, arguments);
  return function bichain(g){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(2, bichain, _future_js__WEBPACK_IMPORTED_MODULE_0__.func, arguments, context1);
    return function bichain(m){
      var context3 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(3, bichain, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments, context2);
      return m._transform(new BichainTransformation(context3, f, g));
    };
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/bimap.js":
/*!*******************************************!*\
  !*** ./node_modules/fluture/src/bimap.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bifunctor": () => (/* binding */ bifunctor),
/* harmony export */   "bimap": () => (/* binding */ bimap)
/* harmony export */ });
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





var bifunctor = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__.isBifunctor, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidArgumentOf)('have Bifunctor implemented')};

function bimap(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(bimap, _future_js__WEBPACK_IMPORTED_MODULE_3__.func, arguments);
  return function bimap(g){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, bimap, _future_js__WEBPACK_IMPORTED_MODULE_3__.func, arguments, context1);
    return function bimap(m){
      var context3 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(3, bimap, bifunctor, arguments, context2);
      return (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.isFuture)(m) ?
             m._transform(new _future_js__WEBPACK_IMPORTED_MODULE_3__.BimapTransformation(context3, f, g)) :
             m[_internal_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.bimap](f, g);
    };
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/both.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/both.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PairTransformation": () => (/* binding */ PairTransformation),
/* harmony export */   "BothTransformation": () => (/* binding */ BothTransformation),
/* harmony export */   "both": () => (/* binding */ both)
/* harmony export */ });
/* harmony import */ var _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/parallel.js */ "./node_modules/fluture/src/internal/parallel.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");




var PairTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.createTransformation)(1, 'pair', {
  resolved: function PairTransformation$resolved(x){
    return new _future_js__WEBPACK_IMPORTED_MODULE_2__.Resolve(this.context, [x, this.$1]);
  }
});

var BothTransformation =
(0,_internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.createParallelTransformation)('both', _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyCrash, _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyReject, _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop, {
  resolved: function BothTransformation$resolved(x){
    return this.$1._transform(new PairTransformation(this.context, x));
  }
});

function both(left){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application1)(both, _future_js__WEBPACK_IMPORTED_MODULE_2__.future, arguments);
  return function both(right){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application)(2, both, _future_js__WEBPACK_IMPORTED_MODULE_2__.future, arguments, context1);
    return right._transform(new BothTransformation(context2, left));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/cache.js":
/*!*******************************************!*\
  !*** ./node_modules/fluture/src/cache.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cold": () => (/* binding */ Cold),
/* harmony export */   "Pending": () => (/* binding */ Pending),
/* harmony export */   "Crashed": () => (/* binding */ Crashed),
/* harmony export */   "Rejected": () => (/* binding */ Rejected),
/* harmony export */   "Resolved": () => (/* binding */ Resolved),
/* harmony export */   "Queued": () => (/* binding */ Queued),
/* harmony export */   "Cache": () => (/* binding */ Cache),
/* harmony export */   "cache": () => (/* binding */ cache)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var Cold = 0;
var Pending = 1;
var Crashed = 2;
var Rejected = 3;
var Resolved = 4;

function Queued(rec, rej, res){
  this[Crashed] = rec;
  this[Rejected] = rej;
  this[Resolved] = res;
}

var Cache = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createInterpreter)(1, 'cache', function Cache$interpret(rec, rej, res){
  var cancel = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;

  switch(this._state){
    /* c8 ignore next 4 */
    case Pending: cancel = this._addToQueue(rec, rej, res); break;
    case Crashed: rec(this._value); break;
    case Rejected: rej(this._value); break;
    case Resolved: res(this._value); break;
    default:
      this._queue = [];
      cancel = this._addToQueue(rec, rej, res);
      this.run();
  }

  return cancel;
});

Cache.prototype._cancel = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
Cache.prototype._queue = null;
Cache.prototype._queued = 0;
Cache.prototype._value = undefined;
Cache.prototype._state = Cold;

Cache.prototype.extractLeft = function Cache$extractLeft(){
  return this._state === Rejected ? [this._value] : [];
};

Cache.prototype.extractRight = function Cache$extractRight(){
  return this._state === Resolved ? [this._value] : [];
};

Cache.prototype._addToQueue = function Cache$addToQueue(rec, rej, res){
  var _this = this;
  if(_this._state > Pending) return _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  var i = _this._queue.push(new Queued(rec, rej, res)) - 1;
  _this._queued = _this._queued + 1;

  return function Cache$removeFromQueue(){
    if(_this._state > Pending) return;
    _this._queue[i] = undefined;
    _this._queued = _this._queued - 1;
    if(_this._queued === 0) _this.reset();
  };
};

Cache.prototype._drainQueue = function Cache$drainQueue(){
  if(this._state <= Pending) return;
  if(this._queued === 0) return;
  var queue = this._queue;
  var length = queue.length;
  var state = this._state;
  var value = this._value;

  for(var i = 0; i < length; i++){
    queue[i] && queue[i][state](value);
    queue[i] = undefined;
  }

  this._queue = undefined;
  this._queued = 0;
};

Cache.prototype.crash = function Cache$crash(error){
  if(this._state > Pending) return;
  this._value = error;
  this._state = Crashed;
  this._drainQueue();
};

Cache.prototype.reject = function Cache$reject(reason){
  if(this._state > Pending) return;
  this._value = reason;
  this._state = Rejected;
  this._drainQueue();
};

Cache.prototype.resolve = function Cache$resolve(value){
  if(this._state > Pending) return;
  this._value = value;
  this._state = Resolved;
  this._drainQueue();
};

Cache.prototype.run = function Cache$run(){
  var _this = this;
  if(_this._state > Cold) return;
  _this._state = Pending;
  _this._cancel = _this.$1._interpret(
    function Cache$fork$rec(x){ _this.crash(x) },
    function Cache$fork$rej(x){ _this.reject(x) },
    function Cache$fork$res(x){ _this.resolve(x) }
  );
};

Cache.prototype.reset = function Cache$reset(){
  if(this._state === Cold) return;
  if(this._state === Pending) this._cancel();
  this._cancel = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  this._queue = [];
  this._queued = 0;
  this._value = undefined;
  this._state = Cold;
};

function cache(m){
  return new Cache((0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(cache, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments), m);
}


/***/ }),

/***/ "./node_modules/fluture/src/chain-rej.js":
/*!***********************************************!*\
  !*** ./node_modules/fluture/src/chain-rej.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChainRejTransformation": () => (/* binding */ ChainRejTransformation),
/* harmony export */   "chainRej": () => (/* binding */ chainRej)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var ChainRejTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createTransformation)(1, 'chainRej', {
  rejected: function ChainRejTransformation$rejected(x){ return (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.call)(this.$1, x) }
});

function chainRej(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(chainRej, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments);
  return function chainRej(m){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, chainRej, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments, context1);
    return m._transform(new ChainRejTransformation(context2, f));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/chain.js":
/*!*******************************************!*\
  !*** ./node_modules/fluture/src/chain.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "monad": () => (/* binding */ monad),
/* harmony export */   "chain": () => (/* binding */ chain)
/* harmony export */ });
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





var monad = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__.isChain, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidArgumentOf)('have Chain implemented')};

function chain(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(chain, _future_js__WEBPACK_IMPORTED_MODULE_3__.func, arguments);
  return function chain(m){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, chain, monad, arguments, context1);
    return (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.isFuture)(m) ?
           m._transform(new _future_js__WEBPACK_IMPORTED_MODULE_3__.ChainTransformation(context2, f)) :
           m[_internal_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.chain](f);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/coalesce.js":
/*!**********************************************!*\
  !*** ./node_modules/fluture/src/coalesce.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CoalesceTransformation": () => (/* binding */ CoalesceTransformation),
/* harmony export */   "coalesce": () => (/* binding */ coalesce)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var CoalesceTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createTransformation)(2, 'coalesce', {
  rejected: function CoalesceTransformation$rejected(x){
    return new _future_js__WEBPACK_IMPORTED_MODULE_1__.Resolve(this.context, (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.call)(this.$1, x));
  },
  resolved: function CoalesceTransformation$resolved(x){
    return new _future_js__WEBPACK_IMPORTED_MODULE_1__.Resolve(this.context, (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.call)(this.$2, x));
  }
});

function coalesce(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(coalesce, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments);
  return function coalesce(g){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, coalesce, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments, context1);
    return function coalesce(m){
      var context3 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(3, coalesce, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments, context2);
      return m._transform(new CoalesceTransformation(context3, f, g));
    };
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/done.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/done.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "done": () => (/* binding */ done)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");



function done(callback){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(done, _future_js__WEBPACK_IMPORTED_MODULE_0__.func, arguments);
  function done$res(x){
    callback(null, x);
  }
  return function done(m){
    (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(2, done, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments, context1);
    return m._interpret(_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.raise, callback, done$res);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/encase-p.js":
/*!**********************************************!*\
  !*** ./node_modules/fluture/src/encase-p.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EncaseP": () => (/* binding */ EncaseP),
/* harmony export */   "encaseP": () => (/* binding */ encaseP)
/* harmony export */ });
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





function invalidPromise(p, f, a){
  return (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.typeError)(
    'encaseP() expects the function it\'s given to return a Promise/Thenable'
    + '\n  Actual: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.show)(p) + '\n  From calling: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.show)(f)
    + '\n  With: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.show)(a)
  );
}

var EncaseP = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.createInterpreter)(2, 'encaseP', function EncaseP$interpret(rec, rej, res){
  var open = true, fn = this.$1, arg = this.$2, p;
  try{
    p = fn(arg);
  }catch(e){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.wrapException)(e, this));
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
  }
  if(!(0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_1__.isThenable)(p)){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.wrapException)(invalidPromise(p, fn, arg), this));
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
  }
  p.then(function EncaseP$res(x){
    if(open){
      open = false;
      res(x);
    }
  }, function EncaseP$rej(x){
    if(open){
      open = false;
      rej(x);
    }
  });
  return function EncaseP$cancel(){ open = false };
});

function encaseP(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(encaseP, _future_js__WEBPACK_IMPORTED_MODULE_3__.func, arguments);
  return function encaseP(x){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, encaseP, _future_js__WEBPACK_IMPORTED_MODULE_3__.any, arguments, context1);
    return new EncaseP(context2, f, x);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/encase.js":
/*!********************************************!*\
  !*** ./node_modules/fluture/src/encase.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Encase": () => (/* binding */ Encase),
/* harmony export */   "encase": () => (/* binding */ encase)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var Encase = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createInterpreter)(2, 'encase', function Encase$interpret(rec, rej, res){
  var fn = this.$1, r;
  try{ r = fn(this.$2) }catch(e){ rej(e); return _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop }
  res(r);
  return _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
});

function encase(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(encase, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments);
  return function encase(x){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, encase, _future_js__WEBPACK_IMPORTED_MODULE_1__.any, arguments, context1);
    return new Encase(context2, f, x);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/extract-left.js":
/*!**************************************************!*\
  !*** ./node_modules/fluture/src/extract-left.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extractLeft": () => (/* binding */ extractLeft)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


function extractLeft(m){
  (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(extractLeft, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments);
  return m.extractLeft();
}


/***/ }),

/***/ "./node_modules/fluture/src/extract-right.js":
/*!***************************************************!*\
  !*** ./node_modules/fluture/src/extract-right.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extractRight": () => (/* binding */ extractRight)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


function extractRight(m){
  (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(extractRight, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments);
  return m.extractRight();
}


/***/ }),

/***/ "./node_modules/fluture/src/fork-catch.js":
/*!************************************************!*\
  !*** ./node_modules/fluture/src/fork-catch.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "forkCatch": () => (/* binding */ forkCatch)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


function forkCatch(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(forkCatch, _future_js__WEBPACK_IMPORTED_MODULE_0__.func, arguments);
  return function forkCatch(g){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(2, forkCatch, _future_js__WEBPACK_IMPORTED_MODULE_0__.func, arguments, context1);
    return function forkCatch(h){
      var context3 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(3, forkCatch, _future_js__WEBPACK_IMPORTED_MODULE_0__.func, arguments, context2);
      return function forkCatch(m){
        (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(4, forkCatch, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments, context3);
        return m._interpret(f, g, h);
      };
    };
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/fork.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/fork.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fork": () => (/* binding */ fork)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



function fork(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(fork, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments);
  return function fork(g){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, fork, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments, context1);
    return function fork(m){
      (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(3, fork, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments, context2);
      return m._interpret(_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.raise, f, g);
    };
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/future.js":
/*!********************************************!*\
  !*** ./node_modules/fluture/src/future.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "any": () => (/* binding */ any),
/* harmony export */   "func": () => (/* binding */ func),
/* harmony export */   "future": () => (/* binding */ future),
/* harmony export */   "positiveInteger": () => (/* binding */ positiveInteger),
/* harmony export */   "application": () => (/* binding */ application),
/* harmony export */   "application1": () => (/* binding */ application1),
/* harmony export */   "Future": () => (/* binding */ Future),
/* harmony export */   "isFuture": () => (/* binding */ isFuture),
/* harmony export */   "createInterpreter": () => (/* binding */ createInterpreter),
/* harmony export */   "Computation": () => (/* binding */ Computation),
/* harmony export */   "Never": () => (/* binding */ Never),
/* harmony export */   "never": () => (/* binding */ never),
/* harmony export */   "isNever": () => (/* binding */ isNever),
/* harmony export */   "Crash": () => (/* binding */ Crash),
/* harmony export */   "crash": () => (/* binding */ crash),
/* harmony export */   "Reject": () => (/* binding */ Reject),
/* harmony export */   "reject": () => (/* binding */ reject),
/* harmony export */   "Resolve": () => (/* binding */ Resolve),
/* harmony export */   "resolve": () => (/* binding */ resolve),
/* harmony export */   "chainRec": () => (/* binding */ chainRec),
/* harmony export */   "Transformer": () => (/* binding */ Transformer),
/* harmony export */   "BaseTransformation": () => (/* binding */ BaseTransformation),
/* harmony export */   "createTransformation": () => (/* binding */ createTransformation),
/* harmony export */   "ApTransformation": () => (/* binding */ ApTransformation),
/* harmony export */   "AltTransformation": () => (/* binding */ AltTransformation),
/* harmony export */   "MapTransformation": () => (/* binding */ MapTransformation),
/* harmony export */   "BimapTransformation": () => (/* binding */ BimapTransformation),
/* harmony export */   "ChainTransformation": () => (/* binding */ ChainTransformation)
/* harmony export */ });
/* harmony import */ var sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sanctuary-type-identifiers */ "./node_modules/sanctuary-type-identifiers/index.js");
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_debug_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/debug.js */ "./node_modules/fluture/src/internal/debug.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_iteration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/iteration.js */ "./node_modules/fluture/src/internal/iteration.js");
/* harmony import */ var _internal_list_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/list.js */ "./node_modules/fluture/src/internal/list.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/*eslint no-cond-assign:0, no-constant-condition:0 */










function alwaysTrue(){
  return true;
}

function getArgs(it){
  var args = new Array(it.arity);
  for(var i = 1; i <= it.arity; i++){
    args[i - 1] = it['$' + String(i)];
  }
  return args;
}

function showArg(arg){
  return ' (' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.show)(arg) + ')';
}

var any = {pred: alwaysTrue, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidArgumentOf)('be anything')};
var func = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_6__.isFunction, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidArgumentOf)('be a Function')};
var future = {pred: isFuture, error: _internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidFutureArgument};
var positiveInteger = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_6__.isUnsigned, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidArgumentOf)('be a positive Integer')};

function application(n, f, type, args, prev){
  if(args.length < 2 && type.pred(args[0])) return (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureApplicationContext)(prev, n, f);
  var e = args.length > 1 ? (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidArity)(f, args) : type.error(f.name, n - 1, args[0]);
  (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace)(e, f);
  throw (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.withExtraContext)(e, prev);
}

function application1(f, type, args){
  return application(1, f, type, args, _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil);
}

function Future(computation){
  var context = application1(Future, func, arguments);
  return new Computation(context, computation);
}

function isFuture(x){
  return x instanceof Future || sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_0__(x) === _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.$$type;
}

// Compliance with sanctuary-type-identifiers versions 1 and 2.
// To prevent sanctuary-type-identifiers version 3 from identifying 'Future'
// as being of the type denoted by $$type, we ensure that
// Future.constructor.prototype is equal to Future.
Future['@@type'] = _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.$$type;
Future.constructor = {prototype: Future};

Future[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.of] = resolve;
Future[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.chainRec] = chainRec;

Future.prototype['@@type'] = _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.$$type;

Future.prototype['@@show'] = function Future$show(){
  return this.toString();
};

Future.prototype.pipe = function Future$pipe(f){
  if(!(0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_6__.isFunction)(f)) throw (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidArgument)('Future#pipe', 0, 'be a Function', f);
  return f(this);
};

Future.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.ap] = function Future$FL$ap(other){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureContext)(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, 'a Fantasy Land dispatch to ap', Future$FL$ap);
  return other._transform(new ApTransformation(context, this));
};

Future.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.map] = function Future$FL$map(mapper){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureContext)(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, 'a Fantasy Land dispatch to map', Future$FL$map);
  return this._transform(new MapTransformation(context, mapper));
};

Future.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.bimap] = function Future$FL$bimap(lmapper, rmapper){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureContext)(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, 'a Fantasy Land dispatch to bimap', Future$FL$bimap);
  return this._transform(new BimapTransformation(context, lmapper, rmapper));
};

Future.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.chain] = function Future$FL$chain(mapper){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureContext)(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, 'a Fantasy Land dispatch to chain', Future$FL$chain);
  return this._transform(new ChainTransformation(context, mapper));
};

Future.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.alt] = function Future$FL$alt(other){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_2__.captureContext)(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, 'a Fantasy Land dispatch to alt', Future$FL$alt);
  return this._transform(new AltTransformation(context, other));
};

Future.prototype.extractLeft = function Future$extractLeft(){
  return [];
};

Future.prototype.extractRight = function Future$extractRight(){
  return [];
};

Future.prototype._transform = function Future$transform(transformation){
  return new Transformer(transformation.context, this, (0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.cons)(transformation, _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil));
};

Future.prototype.isTransformer = false;
Future.prototype.context = _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil;
Future.prototype.arity = 0;
Future.prototype.name = 'future';

Future.prototype.toString = function Future$toString(){
  return this.name + getArgs(this).map(showArg).join('');
};

Future.prototype.toJSON = function Future$toJSON(){
  return {$: _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.$$type, kind: 'interpreter', type: this.name, args: getArgs(this)};
};

function createInterpreter(arity, name, interpret){
  var Interpreter = function(context, $1, $2, $3){
    this.context = context;
    this.$1 = $1;
    this.$2 = $2;
    this.$3 = $3;
  };

  Interpreter.prototype = Object.create(Future.prototype);
  Interpreter.prototype.arity = arity;
  Interpreter.prototype.name = name;
  Interpreter.prototype._interpret = interpret;

  return Interpreter;
}

var Computation =
createInterpreter(1, 'Future', function Computation$interpret(rec, rej, res){
  var computation = this.$1, open = false, cancel = _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop, cont = function(){ open = true };
  try{
    cancel = computation(function Computation$rej(x){
      cont = function Computation$rej$cont(){
        open = false;
        rej(x);
      };
      if(open){
        cont();
      }
    }, function Computation$res(x){
      cont = function Computation$res$cont(){
        open = false;
        res(x);
      };
      if(open){
        cont();
      }
    });
  }catch(e){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.wrapException)(e, this));
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop;
  }
  if(!((0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_6__.isFunction)(cancel) && cancel.length === 0)){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.wrapException)((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.typeError)(
      'The computation was expected to return a nullary cancellation function\n' +
      '  Actual: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.show)(cancel)
    ), this));
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop;
  }
  cont();
  return function Computation$cancel(){
    if(open){
      open = false;
      cancel && cancel();
    }
  };
});

var Never = createInterpreter(0, 'never', function Never$interpret(){
  return _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop;
});

Never.prototype._isNever = true;

var never = new Never(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil);

function isNever(x){
  return isFuture(x) && x._isNever === true;
}

var Crash = createInterpreter(1, 'crash', function Crash$interpret(rec){
  rec(this.$1);
  return _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop;
});

function crash(x){
  return new Crash(application1(crash, any, arguments), x);
}

var Reject = createInterpreter(1, 'reject', function Reject$interpret(rec, rej){
  rej(this.$1);
  return _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop;
});

Reject.prototype.extractLeft = function Reject$extractLeft(){
  return [this.$1];
};

function reject(x){
  return new Reject(application1(reject, any, arguments), x);
}

var Resolve = createInterpreter(1, 'resolve', function Resolve$interpret(rec, rej, res){
  res(this.$1);
  return _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop;
});

Resolve.prototype.extractRight = function Resolve$extractRight(){
  return [this.$1];
};

function resolve(x){
  return new Resolve(application1(resolve, any, arguments), x);
}

//Note: This function is not curried because it's only used to satisfy the
//      Fantasy Land ChainRec specification.
function chainRec(step, init){
  return resolve((0,_internal_iteration_js__WEBPACK_IMPORTED_MODULE_4__.Next)(init))._transform(new ChainTransformation(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, function chainRec$recur(o){
    return o.done ?
           resolve(o.value) :
           step(_internal_iteration_js__WEBPACK_IMPORTED_MODULE_4__.Next, _internal_iteration_js__WEBPACK_IMPORTED_MODULE_4__.Done, o.value)._transform(new ChainTransformation(_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, chainRec$recur));
  }));
}

var Transformer =
createInterpreter(2, 'transform', function Transformer$interpret(rec, rej, res){

  //These are the cold, and hot, transformation stacks. The cold actions are those that
  //have yet to run parallel computations, and hot are those that have.
  var cold = _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil, hot = _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil;

  //These combined variables define our current state.
  // future         = the future we are currently forking
  // transformation = the transformation to be informed when the future settles
  // cancel         = the cancel function of the current future
  // settled        = a boolean indicating whether a new tick should start
  // async          = a boolean indicating whether we are awaiting a result asynchronously
  var future, transformation, cancel = _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop, settled, async = true, it;

  //Takes a transformation from the top of the hot stack and returns it.
  function nextHot(){
    var x = hot.head;
    hot = hot.tail;
    return x;
  }

  //Takes a transformation from the top of the cold stack and returns it.
  function nextCold(){
    var x = cold.head;
    cold = cold.tail;
    return x;
  }

  //This function is called with a future to use in the next tick.
  //Here we "flatten" the actions of another Sequence into our own actions,
  //this is the magic that allows for infinitely stack safe recursion because
  //actions like ChainAction will return a new Sequence.
  //If we settled asynchronously, we call drain() directly to run the next tick.
  function settle(m){
    settled = true;
    future = m;
    if(future.isTransformer){
      var tail = future.$2;
      while(!(0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.isNil)(tail)){
        cold = (0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.cons)(tail.head, cold);
        tail = tail.tail;
      }
      future = future.$1;
    }
    if(async) drain();
  }

  //This function serves as a rejection handler for our current future.
  //It will tell the current transformation that the future rejected, and it will
  //settle the current tick with the transformation's answer to that.
  function rejected(x){
    settle(transformation.rejected(x));
  }

  //This function serves as a resolution handler for our current future.
  //It will tell the current transformation that the future resolved, and it will
  //settle the current tick with the transformation's answer to that.
  function resolved(x){
    settle(transformation.resolved(x));
  }

  //This function is passed into actions when they are "warmed up".
  //If the transformation decides that it has its result, without the need to await
  //anything else, then it can call this function to force "early termination".
  //When early termination occurs, all actions which were stacked prior to the
  //terminator will be skipped. If they were already hot, they will also be
  //sent a cancel signal so they can cancel their own concurrent computations,
  //as their results are no longer needed.
  function early(m, terminator){
    cancel();
    cold = _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil;
    if(async && transformation !== terminator){
      transformation.cancel();
      while((it = nextHot()) && it !== terminator) it.cancel();
    }
    settle(m);
  }

  //This will cancel the current Future, the current transformation, and all stacked hot actions.
  function Sequence$cancel(){
    cancel();
    transformation && transformation.cancel();
    while(it = nextHot()) it.cancel();
  }

  //This function is called when an exception is caught.
  function exception(e){
    Sequence$cancel();
    settled = true;
    cold = hot = _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil;
    var error = (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.wrapException)(e, future);
    future = never;
    rec(error);
  }

  //This function serves to kickstart concurrent computations.
  //Takes all actions from the cold stack in reverse order, and calls run() on
  //each of them, passing them the "early" function. If any of them settles (by
  //calling early()), we abort. After warming up all actions in the cold queue,
  //we warm up the current transformation as well.
  function warmupActions(){
    cold = (0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.reverse)(cold);
    while(cold !== _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil){
      it = cold.head.run(early);
      if(settled) return;
      hot = (0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.cons)(it, hot);
      cold = cold.tail;
    }
    transformation = transformation.run(early);
  }

  //This function represents our main execution loop. By "tick", we've been
  //referring to the execution of one iteration in the while-loop below.
  function drain(){
    async = false;
    while(true){
      settled = false;
      if(transformation = nextCold()){
        cancel = future._interpret(exception, rejected, resolved);
        if(!settled) warmupActions();
      }else if(transformation = nextHot()){
        cancel = future._interpret(exception, rejected, resolved);
      }else break;
      if(settled) continue;
      async = true;
      return;
    }
    cancel = future._interpret(exception, rej, res);
  }

  //Start the execution loop.
  settle(this);

  //Return the cancellation function.
  return Sequence$cancel;

});

Transformer.prototype.isTransformer = true;

Transformer.prototype._transform = function Transformer$_transform(transformation){
  return new Transformer(transformation.context, this.$1, (0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.cons)(transformation, this.$2));
};

Transformer.prototype.toString = function Transformer$toString(){
  return (0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.toArray)((0,_internal_list_js__WEBPACK_IMPORTED_MODULE_5__.reverse)(this.$2)).reduce(function(str, action){
    return action.name + getArgs(action).map(showArg).join('') + ' (' + str + ')';
  }, this.$1.toString());
};

function BaseTransformation$rejected(x){
  this.cancel();
  return new Reject(this.context, x);
}

function BaseTransformation$resolved(x){
  this.cancel();
  return new Resolve(this.context, x);
}

function BaseTransformation$toJSON(){
  return {$: _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.$$type, kind: 'transformation', type: this.name, args: getArgs(this)};
}

var BaseTransformation = {
  rejected: BaseTransformation$rejected,
  resolved: BaseTransformation$resolved,
  run: _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.moop,
  cancel: _internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.noop,
  context: _internal_list_js__WEBPACK_IMPORTED_MODULE_5__.nil,
  arity: 0,
  name: 'transform',
  toJSON: BaseTransformation$toJSON
};

function wrapHandler(handler){
  return function transformationHandler(x){
    var m;
    try{
      m = handler.call(this, x);
    }catch(e){
      return new Crash(this.context, e);
    }
    if(isFuture(m)){
      return m;
    }
    return new Crash(this.context, (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.invalidFuture)(
      this.name + ' expects the return value from the function it\'s given', m,
      '\n  When called with: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.show)(x)
    ));
  };
}

function createTransformation(arity, name, prototype){
  var Transformation = function(context, $1, $2){
    this.context = context;
    this.$1 = $1;
    this.$2 = $2;
  };

  Transformation.prototype = Object.create(BaseTransformation);
  Transformation.prototype.arity = arity;
  Transformation.prototype.name = name;

  if(typeof prototype.rejected === 'function'){
    Transformation.prototype.rejected = wrapHandler(prototype.rejected);
  }

  if(typeof prototype.resolved === 'function'){
    Transformation.prototype.resolved = wrapHandler(prototype.resolved);
  }

  if(typeof prototype.run === 'function'){
    Transformation.prototype.run = prototype.run;
  }

  return Transformation;
}

var ApTransformation = createTransformation(1, 'ap', {
  resolved: function ApTransformation$resolved(f){
    if((0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_6__.isFunction)(f)) return this.$1._transform(new MapTransformation(this.context, f));
    throw (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_3__.typeError)(
      'ap expects the second Future to resolve to a Function\n' +
      '  Actual: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.show)(f)
    );
  }
});

var AltTransformation = createTransformation(1, 'alt', {
  rejected: function AltTransformation$rejected(){ return this.$1 }
});

var MapTransformation = createTransformation(1, 'map', {
  resolved: function MapTransformation$resolved(x){
    return new Resolve(this.context, (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.call)(this.$1, x));
  }
});

var BimapTransformation = createTransformation(2, 'bimap', {
  rejected: function BimapTransformation$rejected(x){
    return new Reject(this.context, (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.call)(this.$1, x));
  },
  resolved: function BimapTransformation$resolved(x){
    return new Resolve(this.context, (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.call)(this.$2, x));
  }
});

var ChainTransformation = createTransformation(1, 'chain', {
  resolved: function ChainTransformation$resolved(x){ return (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_7__.call)(this.$1, x) }
});


/***/ }),

/***/ "./node_modules/fluture/src/go.js":
/*!****************************************!*\
  !*** ./node_modules/fluture/src/go.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invalidIteration": () => (/* binding */ invalidIteration),
/* harmony export */   "invalidState": () => (/* binding */ invalidState),
/* harmony export */   "Go": () => (/* binding */ Go),
/* harmony export */   "go": () => (/* binding */ go)
/* harmony export */ });
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_iteration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/iteration.js */ "./node_modules/fluture/src/internal/iteration.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/timing.js */ "./node_modules/fluture/src/internal/timing.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");
/*eslint consistent-return: 0 */








function invalidIteration(o){
  return (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.typeError)(
    'The iterator did not return a valid iteration from iterator.next()\n' +
    '  Actual: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_4__.show)(o)
  );
}

function invalidState(x){
  return (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.invalidFuture)(
    'go() expects the value produced by the iterator', x,
    '\n  Tip: If you\'re using a generator, make sure you always yield a Future'
  );
}

var Go = (0,_future_js__WEBPACK_IMPORTED_MODULE_5__.createInterpreter)(1, 'go', function Go$interpret(rec, rej, res){

  var _this = this, timing = _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__.Undetermined, cancel = _internal_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop, state, value, iterator;

  function crash(e){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.wrapException)(e, _this));
  }

  try{
    iterator = _this.$1();
  }catch(e){
    crash(e);
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop;
  }

  if(!(0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__.isIterator)(iterator)){
    crash((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.invalidArgument)('go', 0, 'return an iterator, maybe you forgot the "*"', iterator));
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop;
  }

  function resolved(x){
    value = x;
    if(timing === _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__.Asynchronous) return drain();
    timing = _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__.Synchronous;
  }

  function drain(){
    //eslint-disable-next-line no-constant-condition
    while(true){
      try{
        state = iterator.next(value);
      }catch(e){
        return crash(e);
      }
      if(!(0,_internal_iteration_js__WEBPACK_IMPORTED_MODULE_1__.isIteration)(state)) return crash(invalidIteration(state));
      if(state.done) break;
      if(!(0,_future_js__WEBPACK_IMPORTED_MODULE_5__.isFuture)(state.value)){
        return crash(invalidState(state.value));
      }
      timing = _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__.Undetermined;
      cancel = state.value._interpret(crash, rej, resolved);
      if(timing === _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__.Undetermined) return timing = _internal_timing_js__WEBPACK_IMPORTED_MODULE_3__.Asynchronous;
    }
    res(state.value);
  }

  drain();

  return function Go$cancel(){ cancel() };

});

function go(generator){
  return new Go((0,_future_js__WEBPACK_IMPORTED_MODULE_5__.application1)(go, _future_js__WEBPACK_IMPORTED_MODULE_5__.func, arguments), generator);
}


/***/ }),

/***/ "./node_modules/fluture/src/hook.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/hook.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Hook": () => (/* binding */ Hook),
/* harmony export */   "hook": () => (/* binding */ hook)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");




function invalidDisposal(m, f, x){
  return (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidFuture)(
    'hook() expects the return value from the first function it\'s given', m,
    '\n  From calling: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(f) + '\n  With: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(x)
  );
}

function invalidConsumption(m, f, x){
  return (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidFuture)(
    'hook() expects the return value from the second function it\'s given', m,
    '\n  From calling: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(f) + '\n  With: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(x)
  );
}

var Hook = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.createInterpreter)(3, 'hook', function Hook$interpret(rec, rej, res){

  var _this = this, _acquire = this.$1, _dispose = this.$2, _consume = this.$3;
  var cancel, cancelConsume = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop, resource, value, cont = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;

  function Hook$done(){
    cont(value);
  }

  function Hook$rec(x){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.wrapException)(x, _this));
  }

  function Hook$dispose(){
    var disposal;
    try{
      disposal = _dispose(resource);
    }catch(e){
      return Hook$rec(e);
    }
    if(!(0,_future_js__WEBPACK_IMPORTED_MODULE_2__.isFuture)(disposal)){
      return Hook$rec(invalidDisposal(disposal, _dispose, resource));
    }
    cancel = Hook$cancelDisposal;
    disposal._interpret(Hook$rec, Hook$disposalRejected, Hook$done);
  }

  function Hook$cancelConsumption(){
    cancelConsume();
    Hook$dispose();
    Hook$cancelDisposal();
  }

  function Hook$cancelDisposal(){
    cont = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  }

  function Hook$disposalRejected(x){
    Hook$rec(new Error('The disposal Future rejected with ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(x)));
  }

  function Hook$consumptionException(x){
    cont = Hook$rec;
    value = x;
    Hook$dispose();
  }

  function Hook$consumptionRejected(x){
    cont = rej;
    value = x;
    Hook$dispose();
  }

  function Hook$consumptionResolved(x){
    cont = res;
    value = x;
    Hook$dispose();
  }

  function Hook$consume(x){
    resource = x;
    var consumption;
    try{
      consumption = _consume(resource);
    }catch(e){
      return Hook$consumptionException(e);
    }
    if(!(0,_future_js__WEBPACK_IMPORTED_MODULE_2__.isFuture)(consumption)){
      return Hook$consumptionException(invalidConsumption(consumption, _consume, resource));
    }
    cancel = Hook$cancelConsumption;
    cancelConsume = consumption._interpret(
      Hook$consumptionException,
      Hook$consumptionRejected,
      Hook$consumptionResolved
    );
  }

  var cancelAcquire = _acquire._interpret(Hook$rec, rej, Hook$consume);
  cancel = cancel || cancelAcquire;

  return function Hook$fork$cancel(){
    rec = _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.raise;
    cancel();
  };

});

function hook(acquire){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application1)(hook, _future_js__WEBPACK_IMPORTED_MODULE_2__.future, arguments);
  return function hook(dispose){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application)(2, hook, _future_js__WEBPACK_IMPORTED_MODULE_2__.func, arguments, context1);
    return function hook(consume){
      var context3 = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application)(3, hook, _future_js__WEBPACK_IMPORTED_MODULE_2__.func, arguments, context2);
      return new Hook(context3, acquire, dispose, consume);
    };
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/const.js":
/*!****************************************************!*\
  !*** ./node_modules/fluture/src/internal/const.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FL": () => (/* binding */ FL),
/* harmony export */   "ordinal": () => (/* binding */ ordinal),
/* harmony export */   "namespace": () => (/* binding */ namespace),
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "version": () => (/* binding */ version),
/* harmony export */   "$$type": () => (/* binding */ $$type)
/* harmony export */ });
var FL = {
  alt: 'fantasy-land/alt',
  ap: 'fantasy-land/ap',
  bimap: 'fantasy-land/bimap',
  chain: 'fantasy-land/chain',
  chainRec: 'fantasy-land/chainRec',
  map: 'fantasy-land/map',
  of: 'fantasy-land/of',
  zero: 'fantasy-land/zero'
};

var ordinal = ['first', 'second', 'third', 'fourth', 'fifth'];

var namespace = 'fluture';
var name = 'Future';
var version = 5;

var $$type = namespace + '/' + name + '@' + version;


/***/ }),

/***/ "./node_modules/fluture/src/internal/debug.js":
/*!****************************************************!*\
  !*** ./node_modules/fluture/src/internal/debug.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "captureStackTrace": () => (/* binding */ captureStackTrace),
/* harmony export */   "debugMode": () => (/* binding */ debugMode),
/* harmony export */   "debugHandleNone": () => (/* binding */ debugHandleNone),
/* harmony export */   "debugHandleAll": () => (/* binding */ debugHandleAll),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "captureContext": () => (/* binding */ captureContext),
/* harmony export */   "debugCaptureContext": () => (/* binding */ debugCaptureContext),
/* harmony export */   "captureApplicationContext": () => (/* binding */ captureApplicationContext),
/* harmony export */   "debugCaptureApplicationContext": () => (/* binding */ debugCaptureApplicationContext),
/* harmony export */   "captureStackTraceFallback": () => (/* binding */ captureStackTraceFallback)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.js */ "./node_modules/fluture/src/internal/list.js");



/* c8 ignore next */
var captureStackTrace = Error.captureStackTrace || captureStackTraceFallback;
var _debug = debugHandleNone;



function debugMode(debug){
  _debug = debug ? debugHandleAll : debugHandleNone;
}

function debugHandleNone(x){
  return x;
}

function debugHandleAll(x, fn, a, b, c){
  return fn(a, b, c);
}

function debug(x, fn, a, b, c){
  return _debug(x, fn, a, b, c);
}

function captureContext(previous, tag, fn){
  return debug(previous, debugCaptureContext, previous, tag, fn);
}

function debugCaptureContext(previous, tag, fn){
  var context = {tag: tag, name: ' from ' + tag + ':'};
  captureStackTrace(context, fn);
  return (0,_list_js__WEBPACK_IMPORTED_MODULE_1__.cons)(context, previous);
}

function captureApplicationContext(context, n, f){
  return debug(context, debugCaptureApplicationContext, context, n, f);
}

function debugCaptureApplicationContext(context, n, f){
  return debugCaptureContext(context, _const_js__WEBPACK_IMPORTED_MODULE_0__.ordinal[n - 1] + ' application of ' + f.name, f);
}

function captureStackTraceFallback(x){
  var e = new Error;
  if(typeof e.stack === 'string'){
    x.stack = x.name + '\n' + e.stack.split('\n').slice(1).join('\n');
  /* c8 ignore next 3 */
  }else{
    x.stack = x.name;
  }
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/error.js":
/*!****************************************************!*\
  !*** ./node_modules/fluture/src/internal/error.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "error": () => (/* binding */ error),
/* harmony export */   "typeError": () => (/* binding */ typeError),
/* harmony export */   "invalidArgument": () => (/* binding */ invalidArgument),
/* harmony export */   "invalidArgumentOf": () => (/* binding */ invalidArgumentOf),
/* harmony export */   "invalidContext": () => (/* binding */ invalidContext),
/* harmony export */   "invalidArity": () => (/* binding */ invalidArity),
/* harmony export */   "invalidFuture": () => (/* binding */ invalidFuture),
/* harmony export */   "invalidFutureArgument": () => (/* binding */ invalidFutureArgument),
/* harmony export */   "ensureError": () => (/* binding */ ensureError),
/* harmony export */   "assignUnenumerable": () => (/* binding */ assignUnenumerable),
/* harmony export */   "wrapException": () => (/* binding */ wrapException),
/* harmony export */   "withExtraContext": () => (/* binding */ withExtraContext),
/* harmony export */   "contextToStackTrace": () => (/* binding */ contextToStackTrace)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sanctuary-type-identifiers */ "./node_modules/sanctuary-type-identifiers/index.js");
/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list.js */ "./node_modules/fluture/src/internal/list.js");
/* harmony import */ var _debug_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debug.js */ "./node_modules/fluture/src/internal/debug.js");






function showArg(x){
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(x) + ' :: ' + sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_2__.parse(sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_2__(x)).name;
}

function error(message){
  return new Error(message);
}

function typeError(message){
  return new TypeError(message);
}

function invalidArgument(it, at, expected, actual){
  return typeError(
    it + '() expects its ' + _const_js__WEBPACK_IMPORTED_MODULE_1__.ordinal[at] + ' argument to ' + expected + '.' +
    '\n  Actual: ' + showArg(actual)
  );
}

function invalidArgumentOf(expected){
  return function(it, at, actual){
    return invalidArgument(it, at, expected, actual);
  };
}

function invalidContext(it, actual){
  return typeError(
    it + '() was invoked outside the context of a Future. You might want to use'
  + ' a dispatcher instead\n  Called on: ' + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(actual)
  );
}

function invalidArity(f, args){
  return new TypeError(
    f.name + '() expects to be called with a single argument per invocation\n' +
    '  Saw: ' + args.length + ' arguments' +
    Array.prototype.slice.call(args).map(function(arg, i){
      return '\n  ' + (
        _const_js__WEBPACK_IMPORTED_MODULE_1__.ordinal[i] ?
        _const_js__WEBPACK_IMPORTED_MODULE_1__.ordinal[i].charAt(0).toUpperCase() + _const_js__WEBPACK_IMPORTED_MODULE_1__.ordinal[i].slice(1) :
        'Argument ' + String(i + 1)
      ) + ': ' + showArg(arg);
    }).join('')
  );
}

function invalidNamespace(m, x){
  return (
    'The Future was not created by ' + _const_js__WEBPACK_IMPORTED_MODULE_1__.namespace + '. '
  + 'Make sure you transform other Futures to ' + _const_js__WEBPACK_IMPORTED_MODULE_1__.namespace + ' Futures. '
  + 'Got ' + (x ? ('a Future from ' + x) : 'an unscoped Future') + '.'
  + '\n  See: https://github.com/fluture-js/Fluture#casting-futures'
  );
}

function invalidVersion(m, x){
  return (
    'The Future was created by ' + (x < _const_js__WEBPACK_IMPORTED_MODULE_1__.version ? 'an older' : 'a newer')
  + ' version of ' + _const_js__WEBPACK_IMPORTED_MODULE_1__.namespace + '. '
  + 'This means that one of the sources which creates Futures is outdated. '
  + 'Update this source, or transform its created Futures to be compatible.'
  + '\n  See: https://github.com/fluture-js/Fluture#casting-futures'
  );
}

function invalidFuture(desc, m, s){
  var id = sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_2__.parse(sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_2__(m));
  var info = id.name === _const_js__WEBPACK_IMPORTED_MODULE_1__.name ? '\n' + (
    id.namespace !== _const_js__WEBPACK_IMPORTED_MODULE_1__.namespace ? invalidNamespace(m, id.namespace)
  : id.version !== _const_js__WEBPACK_IMPORTED_MODULE_1__.version ? invalidVersion(m, id.version)
  : 'Nothing seems wrong. Contact the Fluture maintainers.') : '';
  return typeError(
    desc + ' to be a valid Future.' + info + '\n' +
    '  Actual: ' + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(m) + ' :: ' + id.name + (s || '')
  );
}

function invalidFutureArgument(it, at, m, s){
  return invalidFuture(it + '() expects its ' + _const_js__WEBPACK_IMPORTED_MODULE_1__.ordinal[at] + ' argument', m, s);
}

function ensureError(value, fn){
  var message;
  try{
    if(value instanceof Error) return value;
    message = 'A Non-Error was thrown from a Future: ' + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.show)(value);
  }catch (_){
    message = 'Something was thrown from a Future, but it could not be converted to String';
  }
  var e = error(message);
  (0,_debug_js__WEBPACK_IMPORTED_MODULE_4__.captureStackTrace)(e, fn);
  return e;
}

function assignUnenumerable(o, prop, value){
  Object.defineProperty(o, prop, {value: value, writable: true, configurable: true});
}

function wrapException(caught, callingFuture){
  var origin = ensureError(caught, wrapException);
  var context = (0,_list_js__WEBPACK_IMPORTED_MODULE_3__.cat)(origin.context || _list_js__WEBPACK_IMPORTED_MODULE_3__.nil, callingFuture.context);
  var e = error(origin.message);
  assignUnenumerable(e, 'future', origin.future || callingFuture);
  assignUnenumerable(e, 'reason', origin.reason || origin);
  assignUnenumerable(e, 'stack', e.reason.stack);
  return withExtraContext(e, context);
}

function withExtraContext(e, context){
  assignUnenumerable(e, 'context', context);
  assignUnenumerable(e, 'stack', e.stack + contextToStackTrace(context));
  return e;
}

function contextToStackTrace(context){
  var stack = '', tail = context;
  while(tail !== _list_js__WEBPACK_IMPORTED_MODULE_3__.nil){
    stack = stack + '\n' + tail.head.stack;
    tail = tail.tail;
  }
  return stack;
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/iteration.js":
/*!********************************************************!*\
  !*** ./node_modules/fluture/src/internal/iteration.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Next": () => (/* binding */ Next),
/* harmony export */   "Done": () => (/* binding */ Done),
/* harmony export */   "isIteration": () => (/* binding */ isIteration)
/* harmony export */ });
/* harmony import */ var _predicates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./predicates.js */ "./node_modules/fluture/src/internal/predicates.js");


function Next(x){
  return {done: false, value: x};
}

function Done(x){
  return {done: true, value: x};
}

function isIteration(x){
  return (0,_predicates_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(x) && (0,_predicates_js__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(x.done);
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/list.js":
/*!***************************************************!*\
  !*** ./node_modules/fluture/src/internal/list.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "List": () => (/* binding */ List),
/* harmony export */   "nil": () => (/* binding */ nil),
/* harmony export */   "isNil": () => (/* binding */ isNil),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "cat": () => (/* binding */ cat),
/* harmony export */   "toArray": () => (/* binding */ toArray)
/* harmony export */ });
function List(head, tail){
  this.head = head;
  this.tail = tail;
}

List.prototype.toJSON = function(){
  return toArray(this);
};

var nil = new List(null, null);
nil.tail = nil;

function isNil(list){
  return list.tail === list;
}

// cons :: (a, List a) -> List a
//      -- O(1) append operation
function cons(head, tail){
  return new List(head, tail);
}

// reverse :: List a -> List a
//         -- O(n) list reversal
function reverse(xs){
  var ys = nil, tail = xs;
  while(!isNil(tail)){
    ys = cons(tail.head, ys);
    tail = tail.tail;
  }
  return ys;
}

// cat :: (List a, List a) -> List a
//     -- O(n) list concatenation
function cat(xs, ys){
  var zs = ys, tail = reverse(xs);
  while(!isNil(tail)){
    zs = cons(tail.head, zs);
    tail = tail.tail;
  }
  return zs;
}

// toArray :: List a -> Array a
//         -- O(n) list to Array
function toArray(xs){
  var tail = xs, arr = [];
  while(!isNil(tail)){
    arr.push(tail.head);
    tail = tail.tail;
  }
  return arr;
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/parallel.js":
/*!*******************************************************!*\
  !*** ./node_modules/fluture/src/internal/parallel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "earlyCrash": () => (/* binding */ earlyCrash),
/* harmony export */   "earlyReject": () => (/* binding */ earlyReject),
/* harmony export */   "earlyResolve": () => (/* binding */ earlyResolve),
/* harmony export */   "createParallelTransformation": () => (/* binding */ createParallelTransformation)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../future.js */ "./node_modules/fluture/src/future.js");



function Eager(future){
  var _this = this;
  _this.rec = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  _this.rej = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  _this.res = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
  _this.crashed = false;
  _this.rejected = false;
  _this.resolved = false;
  _this.value = null;
  _this.cancel = future._interpret(function Eager$crash(x){
    _this.value = x;
    _this.crashed = true;
    _this.cancel = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
    _this.rec(x);
  }, function Eager$reject(x){
    _this.value = x;
    _this.rejected = true;
    _this.cancel = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
    _this.rej(x);
  }, function Eager$resolve(x){
    _this.value = x;
    _this.resolved = true;
    _this.cancel = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
    _this.res(x);
  });
}

Eager.prototype = Object.create(_future_js__WEBPACK_IMPORTED_MODULE_1__.Future.prototype);

Eager.prototype._interpret = function Eager$interpret(rec, rej, res){
  if(this.crashed) rec(this.value);
  else if(this.rejected) rej(this.value);
  else if(this.resolved) res(this.value);
  else{
    this.rec = rec;
    this.rej = rej;
    this.res = res;
  }
  return this.cancel;
};

function earlyCrash(early, x){
  early((0,_future_js__WEBPACK_IMPORTED_MODULE_1__.crash)(x));
}

function earlyReject(early, x){
  early((0,_future_js__WEBPACK_IMPORTED_MODULE_1__.reject)(x));
}

function earlyResolve(early, x){
  early((0,_future_js__WEBPACK_IMPORTED_MODULE_1__.resolve)(x));
}

function createParallelTransformation(name, rec, rej, res, prototype){
  var ParallelTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createTransformation)(1, name, Object.assign({
    run: function Parallel$run(early){
      var eager = new Eager(this.$1);
      var transformation = new ParallelTransformation(this.context, eager);
      function Parallel$early(m){ early(m, transformation) }
      transformation.cancel = eager._interpret(
        function Parallel$rec(x){ rec(Parallel$early, x) },
        function Parallel$rej(x){ rej(Parallel$early, x) },
        function Parallel$res(x){ res(Parallel$early, x) }
      );
      return transformation;
    }
  }, prototype));
  return ParallelTransformation;
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/predicates.js":
/*!*********************************************************!*\
  !*** ./node_modules/fluture/src/internal/predicates.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isThenable": () => (/* binding */ isThenable),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isUnsigned": () => (/* binding */ isUnsigned),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isIterator": () => (/* binding */ isIterator),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "hasMethod": () => (/* binding */ hasMethod),
/* harmony export */   "isFunctor": () => (/* binding */ isFunctor),
/* harmony export */   "isAlt": () => (/* binding */ isAlt),
/* harmony export */   "isApply": () => (/* binding */ isApply),
/* harmony export */   "isBifunctor": () => (/* binding */ isBifunctor),
/* harmony export */   "isChain": () => (/* binding */ isChain)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./node_modules/fluture/src/internal/const.js");


function isFunction(f){
  return typeof f === 'function';
}

function isThenable(m){
  return m instanceof Promise || m != null && isFunction(m.then);
}

function isBoolean(f){
  return typeof f === 'boolean';
}

function isNumber(f){
  return typeof f === 'number';
}

function isUnsigned(n){
  return (n === Infinity || isNumber(n) && n > 0 && n % 1 === 0);
}

function isObject(o){
  return o !== null && typeof o === 'object';
}

function isIterator(i){
  return isObject(i) && isFunction(i.next);
}

function isArray(x){
  return Array.isArray(x);
}

function hasMethod(method, x){
  return x != null && isFunction(x[method]);
}

function isFunctor(x){
  return hasMethod(_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.map, x);
}

function isAlt(x){
  return isFunctor(x) && hasMethod(_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.alt, x);
}

function isApply(x){
  return isFunctor(x) && hasMethod(_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.ap, x);
}

function isBifunctor(x){
  return isFunctor(x) && hasMethod(_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.bimap, x);
}

function isChain(x){
  return isApply(x) && hasMethod(_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.chain, x);
}


/***/ }),

/***/ "./node_modules/fluture/src/internal/timing.js":
/*!*****************************************************!*\
  !*** ./node_modules/fluture/src/internal/timing.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Undetermined": () => (/* binding */ Undetermined),
/* harmony export */   "Synchronous": () => (/* binding */ Synchronous),
/* harmony export */   "Asynchronous": () => (/* binding */ Asynchronous)
/* harmony export */ });
var Undetermined = 0;
var Synchronous = 1;
var Asynchronous = 2;


/***/ }),

/***/ "./node_modules/fluture/src/internal/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/fluture/src/internal/utils.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "show": () => (/* reexport default export from named module */ sanctuary_show__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "moop": () => (/* binding */ moop),
/* harmony export */   "call": () => (/* binding */ call),
/* harmony export */   "setImmediateFallback": () => (/* binding */ setImmediateFallback),
/* harmony export */   "raise": () => (/* binding */ raise)
/* harmony export */ });
/* harmony import */ var sanctuary_show__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sanctuary-show */ "./node_modules/sanctuary-show/index.js");


/* c8 ignore next */
var setImmediate = typeof setImmediate === 'undefined' ? setImmediateFallback : setImmediate;

function noop(){}
function moop(){ return this }
function call(f, x){ return f(x) }

function setImmediateFallback(f, x){
  return setTimeout(f, 0, x);
}

function raise(x){
  setImmediate(function rethrowErrorDelayedToEscapePromiseCatch(){
    throw x;
  });
}


/***/ }),

/***/ "./node_modules/fluture/src/lastly.js":
/*!********************************************!*\
  !*** ./node_modules/fluture/src/lastly.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LastlyTransformation": () => (/* binding */ LastlyTransformation),
/* harmony export */   "lastly": () => (/* binding */ lastly)
/* harmony export */ });
/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./and.js */ "./node_modules/fluture/src/and.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var LastlyTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createTransformation)(1, 'lastly', {
  rejected: function LastlyAction$rejected(x){
    return this.$1._transform(new _and_js__WEBPACK_IMPORTED_MODULE_0__.AndTransformation(this.context, new _future_js__WEBPACK_IMPORTED_MODULE_1__.Reject(this.context, x)));
  },
  resolved: function LastlyAction$resolved(x){
    return this.$1._transform(new _and_js__WEBPACK_IMPORTED_MODULE_0__.AndTransformation(this.context, new _future_js__WEBPACK_IMPORTED_MODULE_1__.Resolve(this.context, x)));
  }
});

function lastly(cleanup){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(lastly, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments);
  return function lastly(program){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, lastly, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments, context1);
    return program._transform(new LastlyTransformation(context2, cleanup));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/map-rej.js":
/*!*********************************************!*\
  !*** ./node_modules/fluture/src/map-rej.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapRejTransformation": () => (/* binding */ MapRejTransformation),
/* harmony export */   "mapRej": () => (/* binding */ mapRej)
/* harmony export */ });
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var MapRejTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.createTransformation)(1, 'mapRej', {
  rejected: function MapRejTransformation$rejected(x){
    return new _future_js__WEBPACK_IMPORTED_MODULE_1__.Reject(this.context, (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_0__.call)(this.$1, x));
  }
});

function mapRej(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(mapRej, _future_js__WEBPACK_IMPORTED_MODULE_1__.func, arguments);
  return function mapRej(m){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, mapRej, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments, context1);
    return m._transform(new MapRejTransformation(context2, f));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/map.js":
/*!*****************************************!*\
  !*** ./node_modules/fluture/src/map.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "functor": () => (/* binding */ functor),
/* harmony export */   "map": () => (/* binding */ map)
/* harmony export */ });
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





var functor = {pred: _internal_predicates_js__WEBPACK_IMPORTED_MODULE_2__.isFunctor, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_1__.invalidArgumentOf)('have Functor implemented')};

function map(f){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(map, _future_js__WEBPACK_IMPORTED_MODULE_3__.func, arguments);
  return function map(m){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, map, functor, arguments, context1);
    return (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.isFuture)(m) ?
           m._transform(new _future_js__WEBPACK_IMPORTED_MODULE_3__.MapTransformation(context2, f)) :
           m[_internal_const_js__WEBPACK_IMPORTED_MODULE_0__.FL.map](f);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/node.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/node.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* binding */ Node),
/* harmony export */   "node": () => (/* binding */ node)
/* harmony export */ });
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");




var Node = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.createInterpreter)(1, 'node', function Node$interpret(rec, rej, res){
  function Node$done(err, val){
    cont = err ? function EncaseN3$rej(){
      open = false;
      rej(err);
    } : function EncaseN3$res(){
      open = false;
      res(val);
    };
    if(open){
      cont();
    }
  }
  var open = false, cont = function(){ open = true };
  try{
    (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.call)(this.$1, Node$done);
  }catch(e){
    rec((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.wrapException)(e, this));
    open = false;
    return _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop;
  }
  cont();
  return function Node$cancel(){ open = false };
});

function node(f){
  return new Node((0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application1)(node, _future_js__WEBPACK_IMPORTED_MODULE_2__.func, arguments), f);
}


/***/ }),

/***/ "./node_modules/fluture/src/pap.js":
/*!*****************************************!*\
  !*** ./node_modules/fluture/src/pap.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParallelApTransformation": () => (/* binding */ ParallelApTransformation),
/* harmony export */   "pap": () => (/* binding */ pap)
/* harmony export */ });
/* harmony import */ var _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/parallel.js */ "./node_modules/fluture/src/internal/parallel.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");







var ParallelApTransformation =
(0,_internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.createParallelTransformation)('pap', _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyCrash, _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyReject, _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop, {
  resolved: function ParallelApTransformation$resolved(f){
    if((0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_3__.isFunction)(f)) return this.$1._transform(new _future_js__WEBPACK_IMPORTED_MODULE_4__.MapTransformation(this.context, f));
    throw (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_2__.typeError)(
      'pap expects the second Future to resolve to a Function\n' +
      '  Actual: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.show)(f)
    );
  }
});

function pap(mx){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_4__.application1)(pap, _future_js__WEBPACK_IMPORTED_MODULE_4__.future, arguments);
  return function pap(mf){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_4__.application)(2, pap, _future_js__WEBPACK_IMPORTED_MODULE_4__.future, arguments, context1);
    return mf._transform(new ParallelApTransformation(context2, mx));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/par.js":
/*!*****************************************!*\
  !*** ./node_modules/fluture/src/par.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConcurrentFuture": () => (/* binding */ ConcurrentFuture),
/* harmony export */   "Par": () => (/* binding */ Par),
/* harmony export */   "isParallel": () => (/* binding */ isParallel)
/* harmony export */ });
/* harmony import */ var sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sanctuary-type-identifiers */ "./node_modules/sanctuary-type-identifiers/index.js");
/* harmony import */ var _internal_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/const.js */ "./node_modules/fluture/src/internal/const.js");
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_debug_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/debug.js */ "./node_modules/fluture/src/internal/debug.js");
/* harmony import */ var _internal_list_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/list.js */ "./node_modules/fluture/src/internal/list.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");
/* harmony import */ var _pap_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pap.js */ "./node_modules/fluture/src/pap.js");
/* harmony import */ var _race_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./race.js */ "./node_modules/fluture/src/race.js");











function ConcurrentFuture (sequential){
  this.sequential = sequential;
}

ConcurrentFuture.prototype = Object.create(Par.prototype);

function Par (sequential){
  if(!(0,_future_js__WEBPACK_IMPORTED_MODULE_5__.isFuture)(sequential)) throw (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_2__.invalidFutureArgument)(Par.name, 0, sequential);
  return new ConcurrentFuture(sequential);
}

var $$type = _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.namespace + '/ConcurrentFuture@' + _internal_const_js__WEBPACK_IMPORTED_MODULE_1__.version;
var zeroInstance = new ConcurrentFuture(_future_js__WEBPACK_IMPORTED_MODULE_5__.never);

// Compliance with sanctuary-type-identifiers versions 1 and 2.
// To prevent sanctuary-type-identifiers version 3 from identifying
// 'Par' as being of the type denoted by $$type, we ensure that
// Par.constructor.prototype is equal to Par.
Par['@@type'] = $$type;
Par.constructor = {prototype: Par};

Par[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.of] = function Par$of(x){
  return new ConcurrentFuture((0,_future_js__WEBPACK_IMPORTED_MODULE_5__.resolve)(x));
};

Par[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.zero] = function Par$zero(){
  return zeroInstance;
};

Par.prototype['@@type'] = $$type;

Par.prototype['@@show'] = function Par$show(){
  return this.toString();
};

Par.prototype.toString = function Par$toString(){
  return 'Par (' + this.sequential.toString() + ')';
};

Par.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.map] = function Par$FL$map(f){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_3__.captureContext)(
    _internal_list_js__WEBPACK_IMPORTED_MODULE_4__.nil,
    'a Fantasy Land dispatch to map via ConcurrentFuture',
    Par$FL$map
  );
  return new ConcurrentFuture(this.sequential._transform(new _future_js__WEBPACK_IMPORTED_MODULE_5__.MapTransformation(context, f)));
};

Par.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.ap] = function Par$FL$ap(other){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_3__.captureContext)(
    _internal_list_js__WEBPACK_IMPORTED_MODULE_4__.nil,
    'a Fantasy Land dispatch to ap via ConcurrentFuture',
    Par$FL$ap
  );
  return new ConcurrentFuture(other.sequential._transform(
    new _pap_js__WEBPACK_IMPORTED_MODULE_6__.ParallelApTransformation(context, this.sequential)
  ));
};

Par.prototype[_internal_const_js__WEBPACK_IMPORTED_MODULE_1__.FL.alt] = function Par$FL$alt(other){
  var context = (0,_internal_debug_js__WEBPACK_IMPORTED_MODULE_3__.captureContext)(
    _internal_list_js__WEBPACK_IMPORTED_MODULE_4__.nil,
    'a Fantasy Land dispatch to alt via ConcurrentFuture',
    Par$FL$alt
  );
  return new ConcurrentFuture(other.sequential._transform(
    new _race_js__WEBPACK_IMPORTED_MODULE_7__.RaceTransformation(context, this.sequential)
  ));
};

function isParallel(x){
  return x instanceof ConcurrentFuture || sanctuary_type_identifiers__WEBPACK_IMPORTED_MODULE_0__(x) === $$type;
}


/***/ }),

/***/ "./node_modules/fluture/src/parallel.js":
/*!**********************************************!*\
  !*** ./node_modules/fluture/src/parallel.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "futureArray": () => (/* binding */ futureArray),
/* harmony export */   "Parallel": () => (/* binding */ Parallel),
/* harmony export */   "parallel": () => (/* binding */ parallel)
/* harmony export */ });
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_predicates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/predicates.js */ "./node_modules/fluture/src/internal/predicates.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");





function isFutureArray(xs){
  if(!(0,_internal_predicates_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(xs)) return false;
  for(var i = 0; i < xs.length; i++){
    if(!(0,_future_js__WEBPACK_IMPORTED_MODULE_3__.isFuture)(xs[i])) return false;
  }
  return true;
}

var futureArray = {
  pred: isFutureArray,
  error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.invalidArgumentOf)('be an Array of valid Futures')
};

var Parallel = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.createInterpreter)(2, 'parallel', function Parallel$interpret(rec, rej, res){

  var _this = this, futures = this.$2, length = futures.length;
  var max = Math.min(this.$1, length), cancels = new Array(length), out = new Array(length);
  var cursor = 0, running = 0, blocked = false, cont = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;

  function Parallel$cancel(){
    rec = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
    rej = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
    res = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
    cursor = length;
    for(var n = 0; n < length; n++) cancels[n] && cancels[n]();
  }

  function Parallel$run(idx){
    running++;
    cancels[idx] = futures[idx]._interpret(function Parallel$rec(e){
      cont = rec;
      cancels[idx] = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
      Parallel$cancel();
      cont((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.wrapException)(e, _this));
    }, function Parallel$rej(reason){
      cont = rej;
      cancels[idx] = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
      Parallel$cancel();
      cont(reason);
    }, function Parallel$res(value){
      cancels[idx] = _internal_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
      out[idx] = value;
      running--;
      if(cursor === length && running === 0) res(out);
      else if(blocked) Parallel$drain();
    });
  }

  function Parallel$drain(){
    blocked = false;
    while(cursor < length && running < max) Parallel$run(cursor++);
    blocked = true;
  }

  Parallel$drain();

  return Parallel$cancel;

});

var emptyArray = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.resolve)([]);

function parallel(max){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application1)(parallel, _future_js__WEBPACK_IMPORTED_MODULE_3__.positiveInteger, arguments);
  return function parallel(ms){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_3__.application)(2, parallel, futureArray, arguments, context1);
    return ms.length === 0 ? emptyArray : new Parallel(context2, max, ms);
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/promise.js":
/*!*********************************************!*\
  !*** ./node_modules/fluture/src/promise.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "promise": () => (/* binding */ promise)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


function promise(m){
  (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(promise, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments);
  return new Promise(function promise$computation(res, rej){
    m._interpret(rej, rej, res);
  });
}


/***/ }),

/***/ "./node_modules/fluture/src/race.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/race.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RaceTransformation": () => (/* binding */ RaceTransformation),
/* harmony export */   "race": () => (/* binding */ race)
/* harmony export */ });
/* harmony import */ var _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/parallel.js */ "./node_modules/fluture/src/internal/parallel.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");



var RaceTransformation =
(0,_internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.createParallelTransformation)('race', _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyCrash, _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyReject, _internal_parallel_js__WEBPACK_IMPORTED_MODULE_0__.earlyResolve, {});

function race(left){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(race, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments);
  return function race(right){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application)(2, race, _future_js__WEBPACK_IMPORTED_MODULE_1__.future, arguments, context1);
    return right._transform(new RaceTransformation(context2, left));
  };
}


/***/ }),

/***/ "./node_modules/fluture/src/reject-after.js":
/*!**************************************************!*\
  !*** ./node_modules/fluture/src/reject-after.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RejectAfter": () => (/* binding */ RejectAfter),
/* harmony export */   "rejectAfter": () => (/* binding */ rejectAfter)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


var RejectAfter =
(0,_future_js__WEBPACK_IMPORTED_MODULE_0__.createInterpreter)(2, 'rejectAfter', function RejectAfter$interpret(rec, rej){
  var id = setTimeout(rej, this.$1, this.$2);
  return function RejectAfter$cancel(){ clearTimeout(id) };
});

RejectAfter.prototype.extractLeft = function RejectAfter$extractLeft(){
  return [this.$2];
};

function alwaysNever(_){
  return _future_js__WEBPACK_IMPORTED_MODULE_0__.never;
}

function rejectAfter(time){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(rejectAfter, _future_js__WEBPACK_IMPORTED_MODULE_0__.positiveInteger, arguments);
  return time === Infinity ? alwaysNever : (function rejectAfter(value){
    var context2 = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application)(2, rejectAfter, _future_js__WEBPACK_IMPORTED_MODULE_0__.any, arguments, context1);
    return new RejectAfter(context2, time, value);
  });
}


/***/ }),

/***/ "./node_modules/fluture/src/seq.js":
/*!*****************************************!*\
  !*** ./node_modules/fluture/src/seq.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "seq": () => (/* binding */ seq)
/* harmony export */ });
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");
/* harmony import */ var _par_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./par.js */ "./node_modules/fluture/src/par.js");




var parallel = {pred: _par_js__WEBPACK_IMPORTED_MODULE_2__.isParallel, error: (0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.invalidArgumentOf)('be a ConcurrentFuture')};

function seq(par){
  (0,_future_js__WEBPACK_IMPORTED_MODULE_1__.application1)(seq, parallel, arguments);
  return par.sequential;
}


/***/ }),

/***/ "./node_modules/fluture/src/swap.js":
/*!******************************************!*\
  !*** ./node_modules/fluture/src/swap.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwapTransformation": () => (/* binding */ SwapTransformation),
/* harmony export */   "swap": () => (/* binding */ swap)
/* harmony export */ });
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");


var SwapTransformation = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.createTransformation)(0, 'swap', {
  resolved: function SwapTransformation$resolved(x){
    return new _future_js__WEBPACK_IMPORTED_MODULE_0__.Reject(this.context, x);
  },
  rejected: function SwapTransformation$rejected(x){
    return new _future_js__WEBPACK_IMPORTED_MODULE_0__.Resolve(this.context, x);
  }
});

function swap(m){
  var context = (0,_future_js__WEBPACK_IMPORTED_MODULE_0__.application1)(swap, _future_js__WEBPACK_IMPORTED_MODULE_0__.future, arguments);
  return m._transform(new SwapTransformation(context));
}


/***/ }),

/***/ "./node_modules/fluture/src/value.js":
/*!*******************************************!*\
  !*** ./node_modules/fluture/src/value.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "value": () => (/* binding */ value)
/* harmony export */ });
/* harmony import */ var _internal_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/error.js */ "./node_modules/fluture/src/internal/error.js");
/* harmony import */ var _internal_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/utils.js */ "./node_modules/fluture/src/internal/utils.js");
/* harmony import */ var _future_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./future.js */ "./node_modules/fluture/src/future.js");




function value(res){
  var context1 = (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application1)(value, _future_js__WEBPACK_IMPORTED_MODULE_2__.func, arguments);
  return function value(m){
    (0,_future_js__WEBPACK_IMPORTED_MODULE_2__.application)(2, value, _future_js__WEBPACK_IMPORTED_MODULE_2__.future, arguments, context1);
    function value$rej(x){
      (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.raise)((0,_internal_error_js__WEBPACK_IMPORTED_MODULE_0__.error)(
        'Future#value was called on a rejected Future\n' +
        '  Rejection: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.show)(x) + '\n' +
        '  Future: ' + (0,_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.show)(m)
      ));
    }
    return m._interpret(_internal_utils_js__WEBPACK_IMPORTED_MODULE_1__.raise, value$rej, res);
  };
}


/***/ }),

/***/ "./node_modules/fp-ts-fluture/es6/Future.js":
/*!**************************************************!*\
  !*** ./node_modules/fp-ts-fluture/es6/Future.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "leftIO": () => (/* binding */ leftIO),
/* harmony export */   "rightIO": () => (/* binding */ rightIO),
/* harmony export */   "leftTask": () => (/* binding */ leftTask),
/* harmony export */   "rightTask": () => (/* binding */ rightTask),
/* harmony export */   "orElse": () => (/* binding */ orElse),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "swap": () => (/* binding */ swap),
/* harmony export */   "futurify": () => (/* binding */ futurify),
/* harmony export */   "future": () => (/* binding */ future),
/* harmony export */   "delay": () => (/* binding */ delay),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "bimap": () => (/* binding */ bimap),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapLeft": () => (/* binding */ mapLeft),
/* harmony export */   "fromEither": () => (/* binding */ fromEither),
/* harmony export */   "fromOption": () => (/* binding */ fromOption),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate)
/* harmony export */ });
/* harmony import */ var fluture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fluture */ "./node_modules/fluture/index.js");
/* harmony import */ var fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fp-ts/es6/Either */ "./node_modules/fp-ts/es6/Either.js");
/* harmony import */ var fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fp-ts/es6/pipeable */ "./node_modules/fp-ts/es6/pipeable.js");
/**
 * @since 0.5.0
 */



/**
 * @since 0.5.0
 */
var URI = 'Fluture/Future';
/**
 * @since 0.6.4
 */
var left = fluture__WEBPACK_IMPORTED_MODULE_0__.reject;
/**
 * @since 0.6.4
 */
var right = fluture__WEBPACK_IMPORTED_MODULE_0__.resolve;
/**
 * @since 0.6.4
 */
function leftIO(ma) {
    return fluture__WEBPACK_IMPORTED_MODULE_0__.swap(fluture__WEBPACK_IMPORTED_MODULE_0__.attempt(ma));
}
/**
 * @since 0.6.4
 */
var rightIO = fluture__WEBPACK_IMPORTED_MODULE_0__.attempt;
/**
 * @since 0.6.4
 */
function leftTask(ma) {
    return fluture__WEBPACK_IMPORTED_MODULE_0__.swap(fluture__WEBPACK_IMPORTED_MODULE_0__.attemptP(ma));
}
/**
 * @since 0.6.4
 */
var rightTask = fluture__WEBPACK_IMPORTED_MODULE_0__.attemptP;
/**
 * @since 0.6.4
 */
function orElse(onLeft) {
    return fluture__WEBPACK_IMPORTED_MODULE_0__.chainRej(onLeft);
}
/**
 * @since 0.6.4
 */
function fold(onLeft, onRight) {
    return function (ma) { return function () { return fluture__WEBPACK_IMPORTED_MODULE_0__.promise(fluture__WEBPACK_IMPORTED_MODULE_0__.coalesce(onLeft)(onRight)(ma)).then(function (mb) { return mb(); }); }; };
}
/**
 * @since 0.6.4
 */
var swap = fluture__WEBPACK_IMPORTED_MODULE_0__.swap;
function futurify(f) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return fluture__WEBPACK_IMPORTED_MODULE_0__.node(function (done) {
            var cbResolver = function (e, r) { return (e != null ? done(e) : done(null, r)); };
            f.apply(null, args.concat(cbResolver));
        });
    };
}
/**
 * @since 0.5.0
 */
var future = {
    URI: URI,
    map: function (fa, f) { return fluture__WEBPACK_IMPORTED_MODULE_0__.map(f)(fa); },
    of: fluture__WEBPACK_IMPORTED_MODULE_0__.resolve,
    ap: function (fab, fa) { return fluture__WEBPACK_IMPORTED_MODULE_0__.ap(fa)(fab); },
    chain: function (fa, f) { return fluture__WEBPACK_IMPORTED_MODULE_0__.chain(f)(fa); },
    bimap: function (fea, f, g) { return fluture__WEBPACK_IMPORTED_MODULE_0__.bimap(f)(g)(fea); },
    mapLeft: function (fea, f) { return fluture__WEBPACK_IMPORTED_MODULE_0__.mapRej(f)(fea); },
    alt: function (fx, f) { return fluture__WEBPACK_IMPORTED_MODULE_0__.alt(f())(fx); },
    chainRec: function (a, f) {
        return (function recur(a) {
            return future.chain(f(a), fp_ts_es6_Either__WEBPACK_IMPORTED_MODULE_1__.fold(recur, fluture__WEBPACK_IMPORTED_MODULE_0__.resolve));
        })(a);
    },
    throwError: left,
    fromTask: fluture__WEBPACK_IMPORTED_MODULE_0__.attemptP,
    fromIO: fluture__WEBPACK_IMPORTED_MODULE_0__.attempt
};
/**
 * @since 0.6.4
 */
function delay(millis) {
    return chain(fluture__WEBPACK_IMPORTED_MODULE_0__.after(millis));
}
var _a = (0,fp_ts_es6_pipeable__WEBPACK_IMPORTED_MODULE_2__.pipeable)(future), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, bimap = _a.bimap, chain = _a.chain, chainFirst = _a.chainFirst, flatten = _a.flatten, map = _a.map, mapLeft = _a.mapLeft, fromEither = _a.fromEither, fromOption = _a.fromOption, fromPredicate = _a.fromPredicate;



/***/ }),

/***/ "./node_modules/fp-ts/es6/Array.js":
/*!*****************************************!*\
  !*** ./node_modules/fp-ts/es6/Array.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getOrd": () => (/* binding */ getOrd),
/* harmony export */   "makeBy": () => (/* binding */ makeBy),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "foldLeft": () => (/* binding */ foldLeft),
/* harmony export */   "foldRight": () => (/* binding */ foldRight),
/* harmony export */   "scanLeft": () => (/* binding */ scanLeft),
/* harmony export */   "scanRight": () => (/* binding */ scanRight),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isNonEmpty": () => (/* binding */ isNonEmpty),
/* harmony export */   "isOutOfBound": () => (/* binding */ isOutOfBound),
/* harmony export */   "lookup": () => (/* binding */ lookup),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "snoc": () => (/* binding */ snoc),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "takeLeft": () => (/* binding */ takeLeft),
/* harmony export */   "takeRight": () => (/* binding */ takeRight),
/* harmony export */   "takeLeftWhile": () => (/* binding */ takeLeftWhile),
/* harmony export */   "spanLeft": () => (/* binding */ spanLeft),
/* harmony export */   "dropLeft": () => (/* binding */ dropLeft),
/* harmony export */   "dropRight": () => (/* binding */ dropRight),
/* harmony export */   "dropLeftWhile": () => (/* binding */ dropLeftWhile),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findFirst": () => (/* binding */ findFirst),
/* harmony export */   "findFirstMap": () => (/* binding */ findFirstMap),
/* harmony export */   "findLast": () => (/* binding */ findLast),
/* harmony export */   "findLastMap": () => (/* binding */ findLastMap),
/* harmony export */   "findLastIndex": () => (/* binding */ findLastIndex),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "deleteAt": () => (/* binding */ deleteAt),
/* harmony export */   "modifyAt": () => (/* binding */ modifyAt),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "rights": () => (/* binding */ rights),
/* harmony export */   "lefts": () => (/* binding */ lefts),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "zipWith": () => (/* binding */ zipWith),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "prependToAll": () => (/* binding */ prependToAll),
/* harmony export */   "intersperse": () => (/* binding */ intersperse),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "uniq": () => (/* binding */ uniq),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "chop": () => (/* binding */ chop),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "chunksOf": () => (/* binding */ chunksOf),
/* harmony export */   "comprehension": () => (/* binding */ comprehension),
/* harmony export */   "union": () => (/* binding */ union),
/* harmony export */   "intersection": () => (/* binding */ intersection),
/* harmony export */   "difference": () => (/* binding */ difference),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainWithIndex": () => (/* binding */ chainWithIndex),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "mapWithIndex": () => (/* binding */ mapWithIndex),
/* harmony export */   "compact": () => (/* binding */ compact),
/* harmony export */   "separate": () => (/* binding */ separate),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "filterMap": () => (/* binding */ filterMap),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionWithIndex": () => (/* binding */ partitionWithIndex),
/* harmony export */   "partitionMap": () => (/* binding */ partitionMap),
/* harmony export */   "partitionMapWithIndex": () => (/* binding */ partitionMapWithIndex),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "filterMapWithIndex": () => (/* binding */ filterMapWithIndex),
/* harmony export */   "filterWithIndex": () => (/* binding */ filterWithIndex),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "foldMapWithIndex": () => (/* binding */ foldMapWithIndex),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceWithIndex": () => (/* binding */ reduceWithIndex),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "reduceRightWithIndex": () => (/* binding */ reduceRightWithIndex),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "traverseWithIndex": () => (/* binding */ traverseWithIndex),
/* harmony export */   "wither": () => (/* binding */ wither),
/* harmony export */   "wilt": () => (/* binding */ wilt),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "FunctorWithIndex": () => (/* binding */ FunctorWithIndex),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Unfoldable": () => (/* binding */ Unfoldable),
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Alternative": () => (/* binding */ Alternative),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "Compactable": () => (/* binding */ Compactable),
/* harmony export */   "Filterable": () => (/* binding */ Filterable),
/* harmony export */   "FilterableWithIndex": () => (/* binding */ FilterableWithIndex),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "FoldableWithIndex": () => (/* binding */ FoldableWithIndex),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "TraversableWithIndex": () => (/* binding */ TraversableWithIndex),
/* harmony export */   "Witherable": () => (/* binding */ Witherable),
/* harmony export */   "array": () => (/* binding */ array),
/* harmony export */   "unsafeInsertAt": () => (/* binding */ unsafeInsertAt),
/* harmony export */   "unsafeUpdateAt": () => (/* binding */ unsafeUpdateAt),
/* harmony export */   "unsafeDeleteAt": () => (/* binding */ unsafeDeleteAt),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "apS": () => (/* binding */ apS)
/* harmony export */ });
/* harmony import */ var _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReadonlyArray */ "./node_modules/fp-ts/es6/ReadonlyArray.js");

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/* tslint:disable:readonly-array */
/**
 * @category instances
 * @since 2.0.0
 */
var getShow = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.getShow;
/**
 * Returns a `Monoid` for `Array<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.getMonoid;
/**
 * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/Eq'
 * import { getEq } from 'fp-ts/Array'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.0.0
 */
var getEq = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.getEq;
/**
 * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/Array'
 * import { ordString } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 * @category instances
 * @since 2.0.0
 */
var getOrd = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.getOrd;
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/Array'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.0.0
 */
var makeBy = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.makeBy;
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.0.0
 */
var range = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.range;
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.0.0
 */
var replicate = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.replicate;
/**
 * Removes one level of nesting.
 *
 * Derivable from `Monad`.
 *
 * @example
 * import { flatten } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var flatten = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.flatten;
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/Array'
 *
 * const len: <A>(as: Array<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.0.0
 */
var foldLeft = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.foldLeft;
/**
 * Break an array into its initial elements and the last element
 *
 * @category destructors
 * @since 2.0.0
 */
var foldRight = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.foldRight;
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @example
 * import { scanLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 2.0.0
 */
var scanLeft = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.scanLeft;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.0.0
 */
var scanRight = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.scanRight;
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/Array'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.0.0
 */
var isEmpty = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.isEmpty;
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
 *
 * @category guards
 * @since 2.0.0
 */
var isNonEmpty = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.isNonEmpty;
/**
 * Test whether an array contains a particular index
 *
 * @since 2.0.0
 */
var isOutOfBound = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.isOutOfBound;
// TODO: remove non-curried overloading in v3
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 2.0.0
 */
var lookup = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.lookup;
// TODO: remove non-curried overloading in v3
/**
 * Attaches an element to the front of an array, creating a new non empty array
 *
 * @example
 * import { cons } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
 *
 * @category constructors
 * @since 2.0.0
 */
var cons = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.cons;
// TODO: curry in v3
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.0.0
 */
var snoc = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.snoc;
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
var head = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.head;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
var last = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.last;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
var tail = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.tail;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @category destructors
 * @since 2.0.0
 */
var init = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.init;
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
var takeLeft = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.takeLeft;
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @category combinators
 * @since 2.0.0
 */
var takeRight = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.takeRight;
function takeLeftWhile(predicate) {
    return _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.takeLeftWhile(predicate);
}
function spanLeft(predicate) {
    return _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.spanLeft(predicate);
}
/* tslint:enable:readonly-keyword */
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 2.0.0
 */
var dropLeft = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.dropLeft;
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var dropRight = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.dropRight;
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @category combinators
 * @since 2.0.0
 */
var dropLeftWhile = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.dropLeftWhile;
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.0.0
 */
var findIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.findIndex;
function findFirst(predicate) {
    return _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.findFirst(predicate);
}
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @category destructors
 * @since 2.0.0
 */
var findFirstMap = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.findFirstMap;
function findLast(predicate) {
    return _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.findLast(predicate);
}
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @category destructors
 * @since 2.0.0
 */
var findLastMap = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.findLastMap;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.0.0
 */
var findLastIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.findLastIndex;
/**
 * @category combinators
 * @since 2.0.0
 */
var copy = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.toArray;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/Array'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.0.0
 */
var insertAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.insertAt;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.0.0
 */
var updateAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.updateAt;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.0.0
 */
var deleteAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.deleteAt;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/Array'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.0.0
 */
var modifyAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.modifyAt;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.0.0
 */
var reverse = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.reverse;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/Array'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
var rights = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.rights;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/Array'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @category combinators
 * @since 2.0.0
 */
var lefts = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.lefts;
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var sort = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.sort;
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.0.0
 */
var zipWith = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.zipWith;
// TODO: remove non-curried overloading in v3
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @category combinators
 * @since 2.0.0
 */
var zip = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.zip;
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.0.0
 */
var unzip = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.unzip;
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependToAll } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(prependToAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var prependToAll = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.prependToAll;
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var intersperse = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.intersperse;
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var rotate = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.rotate;
// TODO: remove non-curried overloading in v3
/**
 * Test if a value is a member of an array. Takes a `Eq<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 *
 * @example
 * import { elem } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(0)), false)
 *
 * @since 2.0.0
 */
var elem = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.elem;
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.0.0
 */
var uniq = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.uniq;
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/Array'
 * import { ord, ordString, ordNumber } from 'fp-ts/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = ord.contramap(ordString, (p: Person) => p.name)
 * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.0.0
 */
var sortBy = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.sortBy;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/Eq'
 * import { chop, spanLeft } from 'fp-ts/Array'
 *
 * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.0.0
 */
var chop = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.chop;
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.0.0
 */
var splitAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.splitAt;
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/Array'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 2.0.0
 */
var chunksOf = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.chunksOf;
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    return _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.comprehension(input, f, g);
}
// TODO: remove non-curried overloading in v3
/**
 * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(eqNumber)([2, 3])), [1, 2, 3])
 *
 * @category combinators
 * @since 2.0.0
 */
var union = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.union;
// TODO: remove non-curried overloading in v3
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], intersection(eqNumber)([2, 3])), [2])
 *
 * @category combinators
 * @since 2.0.0
 */
var intersection = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.intersection;
// TODO: remove non-curried overloading in v3
/**
 * Creates an array of array values not included in the other given array using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/Array'
 * import { eqNumber } from 'fp-ts/Eq'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], difference(eqNumber)([2, 3])), [1])
 *
 * @category combinators
 * @since 2.0.0
 */
var difference = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.difference;
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.0.0
 */
var of = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.of;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Monad.map;
var ap_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Monad.ap;
var chain_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Monad.chain;
var mapWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FunctorWithIndex.mapWithIndex;
var filter_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Filterable.filter;
var filterMap_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Filterable.filterMap;
var partition_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Filterable.partition;
var partitionMap_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Filterable.partitionMap;
var filterWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FilterableWithIndex.filterWithIndex;
var filterMapWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FilterableWithIndex.filterMapWithIndex;
var partitionWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FilterableWithIndex.partitionWithIndex;
var partitionMapWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FilterableWithIndex.partitionMapWithIndex;
var reduce_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Foldable.reduce;
var foldMap_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Foldable.foldMap;
var reduceRight_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Foldable.reduceRight;
var traverse_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Traversable.traverse;
var alt_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Alternative.alt;
var reduceWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FoldableWithIndex.reduceWithIndex;
var foldMapWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FoldableWithIndex.foldMapWithIndex;
var reduceRightWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.FoldableWithIndex.reduceRightWithIndex;
var traverseWithIndex_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.TraversableWithIndex.traverseWithIndex;
var extend_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Extend.extend;
var wither_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Witherable.wither;
var wilt_ = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Witherable.wilt;
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.map;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.ap;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apFirst = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.apFirst;
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apSecond = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.apSecond;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.chain;
/**
 * @since 2.7.0
 */
var chainWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.chainWithIndex;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var chainFirst = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.chainFirst;
/**
 * @category FunctorWithIndex
 * @since 2.0.0
 */
var mapWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.mapWithIndex;
/**
 * @category Compactable
 * @since 2.0.0
 */
var compact = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.compact;
/**
 * @category Compactable
 * @since 2.0.0
 */
var separate = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.separate;
/**
 * @category Filterable
 * @since 2.0.0
 */
var filter = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.filter;
/**
 * @category Filterable
 * @since 2.0.0
 */
var filterMap = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.filterMap;
/**
 * @category Filterable
 * @since 2.0.0
 */
var partition = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.partition;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var partitionWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.partitionWithIndex;
/**
 * @category Filterable
 * @since 2.0.0
 */
var partitionMap = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.partitionMap;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var partitionMapWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.partitionMapWithIndex;
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.altW;
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
var alt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.alt;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var filterMapWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.filterMapWithIndex;
/**
 * @category FilterableWithIndex
 * @since 2.0.0
 */
var filterWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.filterWithIndex;
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.extend;
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
var duplicate = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.duplicate;
/**
 * @category Foldable
 * @since 2.0.0
 */
var foldMap = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.foldMap;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
var foldMapWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.foldMapWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduce = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.reduce;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
var reduceWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.reduceWithIndex;
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduceRight = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.reduceRight;
/**
 * @category FoldableWithIndex
 * @since 2.0.0
 */
var reduceRightWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.reduceRightWithIndex;
/**
 * **for optimized and stack safe version check the data types `traverseArray` function**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.traverse;
/**
 * **for optimized and stack safe version check the data types `sequenceArray` function**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.sequence;
/**
 * **for optimized and stack safe version check the data types `traverseArrayWithIndex` function**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
var traverseWithIndex = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.traverseWithIndex;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.wither;
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.wilt;
/**
 * @category Unfoldable
 * @since 2.6.6
 */
var unfold = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.unfold;
/**
 * @category Alternative
 * @since 2.7.0
 */
var zero = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.Alternative.zero;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI = 'Array';
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Unfoldable = {
    URI: URI,
    unfold: unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    alt: alt_,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
var FilterableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
var FoldableWithIndex = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
var TraversableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverse: traverse_,
    sequence: sequence,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    wither: wither_,
    wilt: wilt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
var array = {
    URI: URI,
    compact: compact,
    separate: separate,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    mapWithIndex: mapWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    alt: alt_,
    zero: zero,
    unfold: unfold,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    extend: extend_,
    wither: wither_,
    wilt: wilt_
};
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeInsertAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.unsafeInsertAt;
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeUpdateAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.unsafeUpdateAt;
/**
 * @category unsafe
 * @since 2.0.0
 */
var unsafeDeleteAt = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.unsafeDeleteAt;
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty array
 *
 * @since 2.0.0
 */
var empty = [];
/**
 * @since 2.9.0
 */
var every = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.every;
/**
 * @since 2.9.0
 */
var some = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.some;
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
var Do = 
/*#__PURE__*/
of({});
/**
 * @since 2.8.0
 */
var bindTo = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.bindTo;
/**
 * @since 2.8.0
 */
var bind = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.bind;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var apS = _ReadonlyArray__WEBPACK_IMPORTED_MODULE_0__.apS;


/***/ }),

/***/ "./node_modules/fp-ts/es6/ChainRec.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/ChainRec.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tailRec": () => (/* binding */ tailRec)
/* harmony export */ });
/**
 * @since 2.0.0
 */
function tailRec(a, f) {
    var v = f(a);
    while (v._tag === 'Left') {
        v = f(v.left);
    }
    return v.right;
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/Either.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/Either.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isLeft": () => (/* binding */ isLeft),
/* harmony export */   "isRight": () => (/* binding */ isRight),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "fromNullable": () => (/* binding */ fromNullable),
/* harmony export */   "tryCatch": () => (/* binding */ tryCatch),
/* harmony export */   "parseJSON": () => (/* binding */ parseJSON),
/* harmony export */   "stringifyJSON": () => (/* binding */ stringifyJSON),
/* harmony export */   "fromOption": () => (/* binding */ fromOption),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "getOrElseW": () => (/* binding */ getOrElseW),
/* harmony export */   "getOrElse": () => (/* binding */ getOrElse),
/* harmony export */   "fromNullableK": () => (/* binding */ fromNullableK),
/* harmony export */   "chainNullableK": () => (/* binding */ chainNullableK),
/* harmony export */   "swap": () => (/* binding */ swap),
/* harmony export */   "orElse": () => (/* binding */ orElse),
/* harmony export */   "filterOrElseW": () => (/* binding */ filterOrElseW),
/* harmony export */   "filterOrElse": () => (/* binding */ filterOrElse),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "bimap": () => (/* binding */ bimap),
/* harmony export */   "mapLeft": () => (/* binding */ mapLeft),
/* harmony export */   "apW": () => (/* binding */ apW),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "chainW": () => (/* binding */ chainW),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirstW": () => (/* binding */ chainFirstW),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "throwError": () => (/* binding */ throwError),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getApplySemigroup": () => (/* binding */ getApplySemigroup),
/* harmony export */   "getApplyMonoid": () => (/* binding */ getApplyMonoid),
/* harmony export */   "getFilterable": () => (/* binding */ getFilterable),
/* harmony export */   "getWitherable": () => (/* binding */ getWitherable),
/* harmony export */   "getApplicativeValidation": () => (/* binding */ getApplicativeValidation),
/* harmony export */   "getAltValidation": () => (/* binding */ getAltValidation),
/* harmony export */   "getValidation": () => (/* binding */ getValidation),
/* harmony export */   "getValidationSemigroup": () => (/* binding */ getValidationSemigroup),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "Bifunctor": () => (/* binding */ Bifunctor),
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "ChainRec": () => (/* binding */ ChainRec),
/* harmony export */   "MonadThrow": () => (/* binding */ MonadThrow),
/* harmony export */   "getValidationMonoid": () => (/* binding */ getValidationMonoid),
/* harmony export */   "either": () => (/* binding */ either),
/* harmony export */   "toError": () => (/* binding */ toError),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bindW": () => (/* binding */ bindW),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "apSW": () => (/* binding */ apSW),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray)
/* harmony export */ });
/* harmony import */ var _ChainRec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChainRec */ "./node_modules/fp-ts/es6/ChainRec.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");


// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
var isLeft = function (ma) { return ma._tag === 'Left'; };
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise.
 *
 * @category guards
 * @since 2.0.0
 */
var isRight = function (ma) { return ma._tag === 'Right'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var left = function (e) { return ({ _tag: 'Left', left: e }); };
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure.
 *
 * @category constructors
 * @since 2.0.0
 */
var right = function (a) { return ({ _tag: 'Right', right: a }); };
// TODO: make lazy in v3
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`.
 *
 * @example
 * import { fromNullable, left, right } from 'fp-ts/Either'
 *
 * const parse = fromNullable('nully')
 *
 * assert.deepStrictEqual(parse(1), right(1))
 * assert.deepStrictEqual(parse(null), left('nully'))
 *
 * @category constructors
 * @since 2.0.0
 */
function fromNullable(e) {
    return function (a) { return (a == null ? left(e) : right(a)); };
}
// TODO: `onError => Lazy<A> => Either` in v3
/**
 * Constructs a new `Either` from a function that might throw.
 *
 * @example
 * import { Either, left, right, tryCatch } from 'fp-ts/Either'
 *
 * const unsafeHead = <A>(as: Array<A>): A => {
 *   if (as.length > 0) {
 *     return as[0]
 *   } else {
 *     throw new Error('empty array')
 *   }
 * }
 *
 * const head = <A>(as: Array<A>): Either<Error, A> => {
 *   return tryCatch(() => unsafeHead(as), e => (e instanceof Error ? e : new Error('unknown error')))
 * }
 *
 * assert.deepStrictEqual(head([]), left(new Error('empty array')))
 * assert.deepStrictEqual(head([1, 2, 3]), right(1))
 *
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f, onError) {
    try {
        return right(f());
    }
    catch (e) {
        return left(onError(e));
    }
}
// TODO curry in v3
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @example
 * import { parseJSON, toError, right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(parseJSON('{"a":1}', toError), right({ a: 1 }))
 * assert.deepStrictEqual(parseJSON('{"a":}', toError), left(new SyntaxError('Unexpected token } in JSON at position 5')))
 *
 * @category constructors
 * @since 2.0.0
 */
function parseJSON(s, onError) {
    return tryCatch(function () { return JSON.parse(s); }, onError);
}
// TODO curry in v3
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
 * const circular: any = { ref: null }
 * circular.ref = circular
 * assert.deepStrictEqual(
 *   pipe(
 *     E.stringifyJSON(circular, E.toError),
 *     E.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
 *   ),
 *   E.left(true)
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
function stringifyJSON(u, onError) {
    return tryCatch(function () { return JSON.stringify(u); }, onError);
}
/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { fromOption, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import { none, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     some(1),
 *     fromOption(() => 'error')
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     none,
 *     fromOption(() => 'error')
 *   ),
 *   left('error')
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
var fromOption = function (onNone) { return function (ma) {
    return ma._tag === 'None' ? left(onNone()) : right(ma.value);
}; };
/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { fromPredicate, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     -1,
 *     fromPredicate(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 *
 * @category constructors
 * @since 2.0.0
 */
var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); }; };
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @example
 * import { fold, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * function onLeft(errors: Array<string>): string {
 *   return `Errors: ${errors.join(', ')}`
 * }
 *
 * function onRight(value: number): string {
 *   return `Ok: ${value}`
 * }
 *
 * assert.strictEqual(
 *   pipe(
 *     right(1),
 *     fold(onLeft, onRight)
 *   ),
 *   'Ok: 1'
 * )
 * assert.strictEqual(
 *   pipe(
 *     left(['error 1', 'error 2']),
 *     fold(onLeft, onRight)
 *   ),
 *   'Errors: error 1, error 2'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function fold(onLeft, onRight) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : onRight(ma.right)); };
}
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onLeft) { return function (ma) {
    return isLeft(ma) ? onLeft(ma.left) : ma.right;
}; };
/**
 * Returns the wrapped value if it's a `Right` or a default value if is a `Left`.
 *
 * @example
 * import { getOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('error'),
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * @category combinators
 * @since 2.9.0
 */
function fromNullableK(e) {
    var from = fromNullable(e);
    return function (f) { return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return from(f.apply(void 0, a));
    }; };
}
/**
 * @category combinators
 * @since 2.9.0
 */
function chainNullableK(e) {
    var from = fromNullableK(e);
    return function (f) { return chain(from(f)); };
}
/**
 * Returns a `Right` if is a `Left` (and vice versa).
 *
 * @category combinators
 * @since 2.0.0
 */
function swap(ma) {
    return isLeft(ma) ? right(ma.left) : left(ma.right);
}
/**
 * Useful for recovering from errors.
 *
 * @category combinators
 * @since 2.0.0
 */
function orElse(onLeft) {
    return function (ma) { return (isLeft(ma) ? onLeft(ma.left) : ma); };
}
/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @since 2.9.0
 */
var filterOrElseW = function (predicate, onFalse) {
    return chainW(function (a) { return (predicate(a) ? right(a) : left(onFalse(a))); });
};
/**
 * Derivable from `MonadThrow`.
 *
 * @example
 * import { filterOrElse, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     right(1),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   right(1)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     right(-1),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('error')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     left('a'),
 *     filterOrElse(
 *       (n) => n > 0,
 *       () => 'error'
 *     )
 *   ),
 *   left('a')
 * )
 *
 * @category combinators
 * @since 2.0.0
 */
var filterOrElse = filterOrElseW;
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, map(f)); };
var ap_ = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fab, ap(fa)); };
/* istanbul ignore next */
var chain_ = function (ma, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ma, chain(f)); };
/* istanbul ignore next */
var reduce_ = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, reduce(b, f)); };
/* istanbul ignore next */
var foldMap_ = function (M) { return function (fa, f) {
    var foldMapM = foldMap(M);
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, foldMapM(f));
}; };
/* istanbul ignore next */
var reduceRight_ = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, reduceRight(b, f)); };
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ta, traverseF(f)); };
};
var bimap_ = function (fa, f, g) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, bimap(f, g)); };
var mapLeft_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, mapLeft(f)); };
/* istanbul ignore next */
var alt_ = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, alt(that)); };
/* istanbul ignore next */
var extend_ = function (wa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(wa, extend(f)); };
var chainRec_ = function (a, f) {
    return (0,_ChainRec__WEBPACK_IMPORTED_MODULE_1__.tailRec)(f(a), function (e) {
        return isLeft(e) ? right(left(e.left)) : isLeft(e.right) ? left(f(e.right.left)) : right(right(e.right.right));
    });
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isLeft(fa) ? fa : right(f(fa.right));
}; };
/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var bimap = function (f, g) { return function (fa) { return (isLeft(fa) ? left(f(fa.left)) : right(g(fa.right))); }; };
/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.0.0
 */
var mapLeft = function (f) { return function (fa) {
    return isLeft(fa) ? left(f(fa.left)) : fa;
}; };
/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 2.8.0
 */
var apW = function (fa) { return function (fab) {
    return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
}; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = apW;
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apFirst = function (fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(function (a) { return function () { return a; }; }), ap(fb));
};
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apSecond = function (fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(function () { return function (b) { return b; }; }), ap(fb));
};
/**
 * Wrap a value into the type constructor.
 *
 * Equivalent to [`right`](#right).
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.of('a'), E.right('a'))
 *
 * @category Applicative
 * @since 2.7.0
 */
var of = right;
/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Monad
 * @since 2.6.0
 */
var chainW = function (f) { return function (ma) {
    return isLeft(ma) ? ma : f(ma.right);
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = chainW;
/**
 * Less strict version of [`chainFirst`](#chainFirst)
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.8.0
 */
var chainFirstW = function (f) { return function (ma) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ma, chainW(function (a) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(f(a), map(function () { return a; }));
    }));
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var chainFirst = chainFirstW;
/**
 * The `flatten` function is the conventional monad join operator. It is used to remove one level of monadic structure, projecting its bound argument into the outer level.
 *
 * Derivable from `Monad`.
 *
 * @example
 * import * as E from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(E.flatten(E.right(E.right('a'))), E.right('a'))
 * assert.deepStrictEqual(E.flatten(E.right(E.left('e'))), E.left('e'))
 * assert.deepStrictEqual(E.flatten(E.left('e')), E.left('e'))
 *
 * @category combinators
 * @since 2.0.0
 */
var flatten = 
/*#__PURE__*/
chain(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) { return (isLeft(fa) ? that() : fa); }; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.0.0
 */
var alt = altW;
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isLeft(wa) ? wa : right(f(wa));
}; };
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
var duplicate = 
/*#__PURE__*/
extend(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
/**
 * Left-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'prefix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduce(startWith, concat)),
 *   'prefix:a',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduce(startWith, concat)),
 *   'prefix',
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(b, fa.right);
}; };
/**
 * Map each element of the structure to a monoid, and combine the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function';
 * import * as E from 'fp-ts/Either'
 * import { monoidString } from 'fp-ts/Monoid'
 *
 * const yell = (a: string) => `${a}!`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.foldMap(monoidString)(yell)),
 *   'a!',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.foldMap(monoidString)(yell)),
 *   monoidString.empty,
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isLeft(fa) ? M.empty : f(fa.right);
}; }; };
/**
 * Right-associative fold of a structure.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 *
 * const startWith = 'postfix'
 * const concat = (a: string, b: string) => `${a}:${b}`
 *
 * assert.deepStrictEqual(
 *   pipe(E.right('a'), E.reduceRight(startWith, concat)),
 *   'a:postfix',
 * )
 *
 * assert.deepStrictEqual(
 *   pipe(E.left('e'), E.reduceRight(startWith, concat)),
 *   'postfix',
 * )
 *
 * @category Foldable
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isLeft(fa) ? b : f(fa.right, b);
}; };
/**
 * Map each element of a structure to an action, evaluate these actions from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/Array'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(['a']), E.traverse(O.option)(A.head)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right([]), E.traverse(O.option)(A.head)),
 *   O.none,
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) { return function (f) { return function (ta) { return (isLeft(ta) ? F.of(left(ta.left)) : F.map(f(ta.right), right)); }; }; };
/**
 * Evaluate each monadic action in the structure from left to right, and collect the results.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as E from 'fp-ts/Either'
 * import * as O from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.some('a')), E.sequence(O.option)),
 *   O.some(E.right('a')),
 *  )
 *
 * assert.deepStrictEqual(
 *   pipe(E.right(O.none), E.sequence(O.option)),
 *   O.none
 * )
 *
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return function (ma) {
    return isLeft(ma) ? F.of(left(ma.left)) : F.map(ma.right, right);
}; };
/**
 * @category MonadThrow
 * @since 2.6.3
 */
var throwError = left;
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI = 'Either';
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(SE, SA) {
    return {
        show: function (ma) { return (isLeft(ma) ? "left(" + SE.show(ma.left) + ")" : "right(" + SA.show(ma.right) + ")"); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
function getEq(EL, EA) {
    return {
        equals: function (x, y) {
            return x === y || (isLeft(x) ? isLeft(y) && EL.equals(x.left, y.left) : isRight(y) && EA.equals(x.right, y.right));
        }
    };
}
/**
 * Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * @example
 * import { getSemigroup, left, right } from 'fp-ts/Either'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const S = getSemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getSemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(y) ? x : isLeft(x) ? y : right(S.concat(x.right, y.right))); }
    };
}
/**
 * Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
 * are concatenated using the provided `Semigroup`
 *
 * @example
 * import { getApplySemigroup, left, right } from 'fp-ts/Either'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const S = getApplySemigroup<string, number>(semigroupSum)
 * assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
 * assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
 * assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
 * assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isLeft(x) ? x : isLeft(y) ? y : right(S.concat(x.right, y.right))); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: right(M.empty)
    };
}
/**
 * Builds a `Filterable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 3.0.0
 */
function getFilterable(M) {
    var empty = left(M.empty);
    var compact = function (ma) {
        return isLeft(ma) ? ma : ma.right._tag === 'None' ? empty : right(ma.right.value);
    };
    var separate = function (ma) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : isLeft(ma.right)
                ? { left: right(ma.right.left), right: empty }
                : { left: empty, right: right(ma.right.right) };
    };
    var partitionMap = function (ma, f) {
        if (isLeft(ma)) {
            return { left: ma, right: ma };
        }
        var e = f(ma.right);
        return isLeft(e) ? { left: right(e.left), right: empty } : { left: empty, right: right(e.right) };
    };
    var partition = function (ma, p) {
        return isLeft(ma)
            ? { left: ma, right: ma }
            : p(ma.right)
                ? { left: empty, right: right(ma.right) }
                : { left: right(ma.right), right: empty };
    };
    var filterMap = function (ma, f) {
        if (isLeft(ma)) {
            return ma;
        }
        var ob = f(ma.right);
        return ob._tag === 'None' ? empty : right(ob.value);
    };
    var filter = function (ma, predicate) {
        return isLeft(ma) ? ma : predicate(ma.right) ? ma : empty;
    };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap
    };
}
/**
 * Builds `Witherable` instance for `Either` given `Monoid` for the left side
 *
 * @category instances
 * @since 2.0.0
 */
function getWitherable(M) {
    var F_ = getFilterable(M);
    var wither = function (F) {
        var traverseF = traverse_(F);
        return function (ma, f) { return F.map(traverseF(ma, f), F_.compact); };
    };
    var wilt = function (F) {
        var traverseF = traverse_(F);
        return function (ma, f) { return F.map(traverseF(ma, f), F_.separate); };
    };
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        compact: F_.compact,
        separate: F_.separate,
        filter: F_.filter,
        filterMap: F_.filterMap,
        partition: F_.partition,
        partitionMap: F_.partitionMap,
        traverse: traverse_,
        sequence: sequence,
        reduce: reduce_,
        foldMap: foldMap_,
        reduceRight: reduceRight_,
        wither: wither,
        wilt: wilt
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
function getApplicativeValidation(SE) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        ap: function (fab, fa) {
            return isLeft(fab)
                ? isLeft(fa)
                    ? left(SE.concat(fab.left, fa.left))
                    : fab
                : isLeft(fa)
                    ? fa
                    : right(fab.right(fa.right));
        },
        of: of
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
function getAltValidation(SE) {
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        alt: function (me, that) {
            if (isRight(me)) {
                return me;
            }
            var ea = that();
            return isLeft(ea) ? left(SE.concat(me.left, ea.left)) : ea;
        }
    };
}
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
function getValidation(SE) {
    var applicativeValidation = getApplicativeValidation(SE);
    var altValidation = getAltValidation(SE);
    return {
        URI: URI,
        _E: undefined,
        map: map_,
        of: of,
        chain: chain_,
        bimap: bimap_,
        mapLeft: mapLeft_,
        reduce: reduce_,
        foldMap: foldMap_,
        reduceRight: reduceRight_,
        extend: extend_,
        traverse: traverse_,
        sequence: sequence,
        chainRec: chainRec_,
        throwError: throwError,
        ap: applicativeValidation.ap,
        alt: altValidation.alt
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
function getValidationSemigroup(SE, SA) {
    return {
        concat: function (x, y) {
            return isLeft(x) ? (isLeft(y) ? left(SE.concat(x.left, y.left)) : x) : isLeft(y) ? y : right(SA.concat(x.right, y.right));
        }
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
var Bifunctor = {
    URI: URI,
    bimap: bimap_,
    mapLeft: mapLeft_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
var ChainRec = {
    URI: URI,
    map: map_,
    ap: ap_,
    chain: chain_,
    chainRec: chainRec_
};
/**
 * @category instances
 * @since 2.7.0
 */
var MonadThrow = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    throwError: throwError
};
/**
 * @category instances
 * @since 2.0.0
 */
function getValidationMonoid(SE, SA) {
    return {
        concat: getValidationSemigroup(SE, SA).concat,
        empty: right(SA.empty)
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
var either = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    bimap: bimap_,
    mapLeft: mapLeft_,
    alt: alt_,
    extend: extend_,
    chainRec: chainRec_,
    throwError: throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Default value for the `onError` argument of `tryCatch`
 *
 * @since 2.0.0
 */
function toError(e) {
    return e instanceof Error ? e : new Error(String(e));
}
/**
 * @since 2.0.0
 */
function elem(E) {
    return function (a, ma) { return (isLeft(ma) ? false : E.equals(a, ma.right)); };
}
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @example
 * import { exists, left, right } from 'fp-ts/Either'
 *
 * const gt2 = exists((n: number) => n > 2)
 *
 * assert.strictEqual(gt2(left('a')), false)
 * assert.strictEqual(gt2(right(1)), false)
 * assert.strictEqual(gt2(right(3)), true)
 *
 * @since 2.0.0
 */
function exists(predicate) {
    return function (ma) { return (isLeft(ma) ? false : predicate(ma.right)); };
}
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
var Do = 
/*#__PURE__*/
of({});
/**
 * @since 2.8.0
 */
var bindTo = function (name) {
    return map((0,_function__WEBPACK_IMPORTED_MODULE_0__.bindTo_)(name));
};
/**
 * @since 2.8.0
 */
var bindW = function (name, f) {
    return chainW(function (a) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(f(a), map(function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.bind_)(a, name, b); }));
    });
};
/**
 * @since 2.8.0
 */
var bind = bindW;
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var apSW = function (name, fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(function (a) { return function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.bind_)(a, name, b); }; }), apW(fb));
};
/**
 * @since 2.8.0
 */
var apS = apSW;
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 *
 * @since 2.9.0
 */
var traverseArrayWithIndex = function (f) { return function (arr) {
    // tslint:disable-next-line: readonly-array
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var e = f(i, arr[i]);
        if (e._tag === 'Left') {
            return e;
        }
        result.push(e.right);
    }
    return right(result);
}; };
/**
 * map an array using provided function to Either then transform to Either of the array
 * this function has the same behavior of `A.traverse(E.either)` but it's optimized and performs better
 *
 * @example
 *
 *
 * import { traverseArray, left, right, fromPredicate } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/Array'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(
 *   pipe(
 *     arr,
 *     traverseArray((x) => right(x))
 *   ),
 *   right(arr)
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     arr,
 *     traverseArray(
 *       fromPredicate(
 *         (x) => x > 5,
 *         () => 'a'
 *       )
 *     )
 *   ),
 *   left('a')
 * )
 * @since 2.9.0
 */
var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * convert an array of either to an either of array
 * this function has the same behavior of `A.sequence(E.either)` but it's optimized and performs better
 *
 * @example
 *
 * import { sequenceArray, left, right } from 'fp-ts/Either'
 * import { pipe } from 'fp-ts/function'
 * import * as A from 'fp-ts/Array'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, A.map(right), sequenceArray), right(arr))
 * assert.deepStrictEqual(pipe(arr, A.map(right), A.cons(left('Error')), sequenceArray), left('Error'))
 *
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/
traverseArray(_function__WEBPACK_IMPORTED_MODULE_0__.identity);


/***/ }),

/***/ "./node_modules/fp-ts/es6/Option.js":
/*!******************************************!*\
  !*** ./node_modules/fp-ts/es6/Option.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isSome": () => (/* binding */ isSome),
/* harmony export */   "isNone": () => (/* binding */ isNone),
/* harmony export */   "none": () => (/* binding */ none),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "fromNullable": () => (/* binding */ fromNullable),
/* harmony export */   "fromPredicate": () => (/* binding */ fromPredicate),
/* harmony export */   "tryCatch": () => (/* binding */ tryCatch),
/* harmony export */   "getLeft": () => (/* binding */ getLeft),
/* harmony export */   "getRight": () => (/* binding */ getRight),
/* harmony export */   "fromEither": () => (/* binding */ fromEither),
/* harmony export */   "fold": () => (/* binding */ fold),
/* harmony export */   "toNullable": () => (/* binding */ toNullable),
/* harmony export */   "toUndefined": () => (/* binding */ toUndefined),
/* harmony export */   "getOrElseW": () => (/* binding */ getOrElseW),
/* harmony export */   "getOrElse": () => (/* binding */ getOrElse),
/* harmony export */   "fromNullableK": () => (/* binding */ fromNullableK),
/* harmony export */   "mapNullable": () => (/* binding */ mapNullable),
/* harmony export */   "chainNullableK": () => (/* binding */ chainNullableK),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "throwError": () => (/* binding */ throwError),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "compact": () => (/* binding */ compact),
/* harmony export */   "separate": () => (/* binding */ separate),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "filterMap": () => (/* binding */ filterMap),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionMap": () => (/* binding */ partitionMap),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "wither": () => (/* binding */ wither),
/* harmony export */   "wilt": () => (/* binding */ wilt),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getOrd": () => (/* binding */ getOrd),
/* harmony export */   "getApplySemigroup": () => (/* binding */ getApplySemigroup),
/* harmony export */   "getApplyMonoid": () => (/* binding */ getApplyMonoid),
/* harmony export */   "getFirstMonoid": () => (/* binding */ getFirstMonoid),
/* harmony export */   "getLastMonoid": () => (/* binding */ getLastMonoid),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Alternative": () => (/* binding */ Alternative),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "Compactable": () => (/* binding */ Compactable),
/* harmony export */   "Filterable": () => (/* binding */ Filterable),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "Witherable": () => (/* binding */ Witherable),
/* harmony export */   "MonadThrow": () => (/* binding */ MonadThrow),
/* harmony export */   "option": () => (/* binding */ option),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "getRefinement": () => (/* binding */ getRefinement),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "apS": () => (/* binding */ apS),
/* harmony export */   "traverseArrayWithIndex": () => (/* binding */ traverseArrayWithIndex),
/* harmony export */   "traverseArray": () => (/* binding */ traverseArray),
/* harmony export */   "sequenceArray": () => (/* binding */ sequenceArray)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");

// -------------------------------------------------------------------------------------
// guards
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise.
 *
 * @example
 * import { some, none, isSome } from 'fp-ts/Option'
 *
 * assert.strictEqual(isSome(some(1)), true)
 * assert.strictEqual(isSome(none), false)
 *
 * @category guards
 * @since 2.0.0
 */
var isSome = function (fa) { return fa._tag === 'Some'; };
/**
 * Returns `true` if the option is `None`, `false` otherwise.
 *
 * @example
 * import { some, none, isNone } from 'fp-ts/Option'
 *
 * assert.strictEqual(isNone(some(1)), false)
 * assert.strictEqual(isNone(none), true)
 *
 * @category guards
 * @since 2.0.0
 */
var isNone = function (fa) { return fa._tag === 'None'; };
// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------
/**
 * `None` doesn't have a constructor, instead you can use it directly as a value. Represents a missing value.
 *
 * @category constructors
 * @since 2.0.0
 */
var none = { _tag: 'None' };
/**
 * Constructs a `Some`. Represents an optional value that exists.
 *
 * @category constructors
 * @since 2.0.0
 */
var some = function (a) { return ({ _tag: 'Some', value: a }); };
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`.
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
function fromNullable(a) {
    return a == null ? none : some(a);
}
function fromPredicate(predicate) {
    return function (a) { return (predicate(a) ? some(a) : none); };
}
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
 * `Some`.
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @category constructors
 * @since 2.0.0
 */
function tryCatch(f) {
    try {
        return some(f());
    }
    catch (e) {
        return none;
    }
}
/**
 * Returns the `Left` value of an `Either` if possible.
 *
 * @example
 * import { getLeft, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getLeft(right(1)), none)
 * assert.deepStrictEqual(getLeft(left('a')), some('a'))
 *
 * @category constructors
 * @since 2.0.0
 */
function getLeft(ma) {
    return ma._tag === 'Right' ? none : some(ma.left);
}
/**
 * Returns the `Right` value of an `Either` if possible.
 *
 * @example
 * import { getRight, none, some } from 'fp-ts/Option'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(getRight(right(1)), some(1))
 * assert.deepStrictEqual(getRight(left('a')), none)
 *
 * @category constructors
 * @since 2.0.0
 */
function getRight(ma) {
    return ma._tag === 'Left' ? none : some(ma.right);
}
/**
 * Transforms an `Either` to an `Option` discarding the error.
 *
 * Alias of [getRight](#getRight)
 *
 * Derivable from `MonadThrow`.
 *
 * @category constructors
 * @since 2.0.0
 */
var fromEither = getRight;
// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------
/**
 * Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @example
 * import { some, none, fold } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a some containing 1'
 * )
 *
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     fold(() => 'a none', a => `a some containing ${a}`)
 *   ),
 *   'a none'
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function fold(onNone, onSome) {
    return function (ma) { return (isNone(ma) ? onNone() : onSome(ma.value)); };
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 *
 * @example
 * import { some, none, toNullable } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toNullable
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toNullable
 *   ),
 *   null
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function toNullable(ma) {
    return isNone(ma) ? null : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 *
 * @example
 * import { some, none, toUndefined } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     toUndefined
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     toUndefined
 *   ),
 *   undefined
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
function toUndefined(ma) {
    return isNone(ma) ? undefined : ma.value;
}
/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.6.0
 */
var getOrElseW = function (onNone) { return function (ma) { return (isNone(ma) ? onNone() : ma.value); }; };
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @example
 * import { some, none, getOrElse } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     getOrElse(() => 0)
 *   ),
 *   1
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     getOrElse(() => 0)
 *   ),
 *   0
 * )
 *
 * @category destructors
 * @since 2.0.0
 */
var getOrElse = getOrElseW;
// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------
/**
 * Returns a *smart constructor* from a function that returns a nullable value.
 *
 * @example
 * import { fromNullableK, none, some } from 'fp-ts/Option'
 *
 * const f = (s: string): number | undefined => {
 *   const n = parseFloat(s)
 *   return isNaN(n) ? undefined : n
 * }
 *
 * const g = fromNullableK(f)
 *
 * assert.deepStrictEqual(g('1'), some(1))
 * assert.deepStrictEqual(g('a'), none)
 *
 * @category combinators
 * @since 2.9.0
 */
function fromNullableK(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return fromNullable(f.apply(void 0, a));
    };
}
/**
 * @category combinators
 * @since 2.0.0
 * @deprecated
 */
var mapNullable = chainNullableK;
/**
 * This is `chain` + `fromNullable`, useful when working with optional values.
 *
 * @example
 * import { some, none, fromNullable, chainNullableK } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Employee {
 *   company?: {
 *     address?: {
 *       street?: {
 *         name?: string
 *       }
 *     }
 *   }
 * }
 *
 * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee1.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   some('high street')
 * )
 *
 * const employee2: Employee = { company: { address: { street: {} } } }
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     fromNullable(employee2.company),
 *     chainNullableK(company => company.address),
 *     chainNullableK(address => address.street),
 *     chainNullableK(street => street.name)
 *   ),
 *   none
 * )
 *
 * @category combinators
 * @since 2.9.0
 */
function chainNullableK(f) {
    return function (ma) { return (isNone(ma) ? none : fromNullable(f(ma.value))); };
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, map(f)); };
var ap_ = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fab, ap(fa)); };
var chain_ = function (ma, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ma, chain(f)); };
var reduce_ = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, reduce(b, f)); };
var foldMap_ = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, foldMapM(f)); };
};
var reduceRight_ = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, reduceRight(b, f)); };
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var alt_ = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, alt(that)); };
var filter_ = function (fa, predicate) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, filter(predicate));
};
/* istanbul ignore next */
var filterMap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, filterMap(f)); };
/* istanbul ignore next */
var extend_ = function (wa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(wa, extend(f)); };
/* istanbul ignore next */
var partition_ = function (fa, predicate) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, partition(predicate)); };
/* istanbul ignore next */
var partitionMap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, partitionMap(f)); };
/* istanbul ignore next */
var wither_ = function (F) {
    var witherF = wither(F);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, witherF(f)); };
};
/* istanbul ignore next */
var wilt_ = function (F) {
    var wiltF = wilt(F);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(fa, wiltF(f)); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
var map = function (f) { return function (fa) {
    return isNone(fa) ? none : some(f(fa.value));
}; };
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
var ap = function (fa) { return function (fab) {
    return isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value));
}; };
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apFirst = function (fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(function (a) { return function () { return a; }; }), ap(fb));
};
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.0.0
 */
var apSecond = function (fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(function () { return function (b) { return b; }; }), ap(fb));
};
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.7.0
 */
var of = some;
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
var chain = function (f) { return function (ma) {
    return isNone(ma) ? none : f(ma.value);
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var chainFirst = function (f) {
    return chain(function (a) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(f(a), map(function () { return a; }));
    });
};
/**
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.0.0
 */
var flatten = 
/*#__PURE__*/
chain(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) {
    return isNone(fa) ? that() : fa;
}; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `Option` returns the left-most non-`None` value.
 *
 * @example
 * import * as O from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     O.some('a'),
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('a')
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     O.none,
 *     O.alt(() => O.some('b'))
 *   ),
 *   O.some('b')
 * )
 *
 * @category Alt
 * @since 2.0.0
 */
var alt = altW;
/**
 * @category Alternative
 * @since 2.7.0
 */
var zero = function () { return none; };
/**
 * @category MonadThrow
 * @since 2.7.0
 */
var throwError = function () { return none; };
/**
 * @category Extend
 * @since 2.0.0
 */
var extend = function (f) { return function (wa) {
    return isNone(wa) ? none : some(f(wa));
}; };
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.0.0
 */
var duplicate = 
/*#__PURE__*/
extend(_function__WEBPACK_IMPORTED_MODULE_0__.identity);
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduce = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(b, fa.value);
}; };
/**
 * @category Foldable
 * @since 2.0.0
 */
var foldMap = function (M) { return function (f) { return function (fa) {
    return isNone(fa) ? M.empty : f(fa.value);
}; }; };
/**
 * @category Foldable
 * @since 2.0.0
 */
var reduceRight = function (b, f) { return function (fa) {
    return isNone(fa) ? b : f(fa.value, b);
}; };
/**
 * @category Compactable
 * @since 2.0.0
 */
var compact = flatten;
var defaultSeparate = { left: none, right: none };
/**
 * @category Compactable
 * @since 2.0.0
 */
var separate = function (ma) {
    var o = (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(ma, map(function (e) { return ({
        left: getLeft(e),
        right: getRight(e)
    }); }));
    return isNone(o) ? defaultSeparate : o.value;
};
/**
 * @category Filterable
 * @since 2.0.0
 */
var filter = function (predicate) { return function (fa) { return (isNone(fa) ? none : predicate(fa.value) ? fa : none); }; };
/**
 * @category Filterable
 * @since 2.0.0
 */
var filterMap = function (f) { return function (fa) {
    return isNone(fa) ? none : f(fa.value);
}; };
/**
 * @category Filterable
 * @since 2.0.0
 */
var partition = function (predicate) { return function (fa) {
    return {
        left: filter_(fa, function (a) { return !predicate(a); }),
        right: filter_(fa, predicate)
    };
}; };
/**
 * @category Filterable
 * @since 2.0.0
 */
var partitionMap = function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(f), separate); };
/**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) { return function (f) { return function (ta) { return (isNone(ta) ? F.of(none) : F.map(f(ta.value), some)); }; }; };
/**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) { return (isNone(ta) ? F.of(none) : F.map(ta.value, some)); }; };
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) { return function (f) { return function (fa) { return (isNone(fa) ? F.of(none) : f(fa.value)); }; }; };
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) { return function (f) { return function (fa) {
    return isNone(fa)
        ? F.of({
            left: none,
            right: none
        })
        : F.map(f(fa.value), function (e) { return ({
            left: getLeft(e),
            right: getRight(e)
        }); });
}; }; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI = 'Option';
/**
 * @category instances
 * @since 2.0.0
 */
function getShow(S) {
    return {
        show: function (ma) { return (isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")"); }
    };
}
/**
 * @example
 * import { none, some, getEq } from 'fp-ts/Option'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * const E = getEq(eqNumber)
 * assert.strictEqual(E.equals(none, none), true)
 * assert.strictEqual(E.equals(none, some(1)), false)
 * assert.strictEqual(E.equals(some(1), none), false)
 * assert.strictEqual(E.equals(some(1), some(2)), false)
 * assert.strictEqual(E.equals(some(1), some(1)), true)
 *
 * @category instances
 * @since 2.0.0
 */
function getEq(E) {
    return {
        equals: function (x, y) { return x === y || (isNone(x) ? isNone(y) : isNone(y) ? false : E.equals(x.value, y.value)); }
    };
}
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/Option'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @category instances
 * @since 2.0.0
 */
function getOrd(O) {
    return {
        equals: getEq(O).equals,
        compare: function (x, y) { return (x === y ? 0 : isSome(x) ? (isSome(y) ? O.compare(x.value, y.value) : 1) : -1); }
    };
}
/**
 * `Apply` semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/Option'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getApplySemigroup(S) {
    return {
        concat: function (x, y) { return (isSome(x) && isSome(y) ? some(S.concat(x.value, y.value)) : none); }
    };
}
/**
 * @category instances
 * @since 2.0.0
 */
function getApplyMonoid(M) {
    return {
        concat: getApplySemigroup(M).concat,
        empty: some(M.empty)
    };
}
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @category instances
 * @since 2.0.0
 */
function getFirstMonoid() {
    return {
        concat: function (x, y) { return (isNone(x) ? y : x); },
        empty: none
    };
}
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @category instances
 * @since 2.0.0
 */
function getLastMonoid() {
    return {
        concat: function (x, y) { return (isNone(y) ? x : y); },
        empty: none
    };
}
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * concatenated using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/Option'
 * import { semigroupSum } from 'fp-ts/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @category instances
 * @since 2.0.0
 */
function getMonoid(S) {
    return {
        concat: function (x, y) { return (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value))); },
        empty: none
    };
}
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    alt: alt_,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_
};
/**
 * @category instances
 * @since 2.7.0
 */
var MonadThrow = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    throwError: throwError
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
var option = {
    URI: URI,
    map: map_,
    of: of,
    ap: ap_,
    chain: chain_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    zero: zero,
    alt: alt_,
    extend: extend_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    wither: wither_,
    wilt: wilt_,
    throwError: throwError
};
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * Returns `true` if `ma` contains `a`
 *
 * @example
 * import { some, none, elem } from 'fp-ts/Option'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
 * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
 * assert.strictEqual(elem(eqNumber)(1, none), false)
 *
 * @since 2.0.0
 */
function elem(E) {
    return function (a, ma) { return (isNone(ma) ? false : E.equals(a, ma.value)); };
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @example
 * import { some, none, exists } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 0)
 *   ),
 *   true
 * )
 * assert.strictEqual(
 *   pipe(
 *     some(1),
 *     exists(n => n > 1)
 *   ),
 *   false
 * )
 * assert.strictEqual(
 *   pipe(
 *     none,
 *     exists(n => n > 0)
 *   ),
 *   false
 * )
 *
 * @since 2.0.0
 */
function exists(predicate) {
    return function (ma) { return (isNone(ma) ? false : predicate(ma.value)); };
}
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 2.0.0
 */
function getRefinement(getOption) {
    return function (a) { return isSome(getOption(a)); };
}
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
var Do = 
/*#__PURE__*/
of({});
/**
 * @since 2.8.0
 */
var bindTo = function (name) { return map((0,_function__WEBPACK_IMPORTED_MODULE_0__.bindTo_)(name)); };
/**
 * @since 2.8.0
 */
var bind = function (name, f) {
    return chain(function (a) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_0__.pipe)(f(a), map(function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.bind_)(a, name, b); }));
    });
};
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var apS = function (name, fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_0__.flow)(map(function (a) { return function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_0__.bind_)(a, name, b); }; }), ap(fb));
};
// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------
/**
 *
 * @since 2.9.0
 */
var traverseArrayWithIndex = function (f) { return function (arr) {
    // tslint:disable-next-line: readonly-array
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var b = f(i, arr[i]);
        if (isNone(b)) {
            return none;
        }
        result.push(b.value);
    }
    return some(result);
}; };
/**
 * Runs an action for every element in array and accumulates the results in option
 *
 * this function has the same behavior of `A.sequence(O.option)` but it's optimized and performs better
 *
 * @example
 *
 * import * as A from 'fp-ts/Array'
 * import { traverseArray, some, fromPredicate, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, traverseArray(some)), some(arr))
 * assert.deepStrictEqual(pipe(arr, traverseArray(fromPredicate((x) => x > 5))), none)
 *
 * @since 2.9.0
 */
var traverseArray = function (f) { return traverseArrayWithIndex(function (_, a) { return f(a); }); };
/**
 * get an array of option and convert it to option of array
 *
 * this function has the same behavior of `A.sequence(O.option)` but it's optimized and performs better
 *
 * @example
 *
 * import * as A from 'fp-ts/Array'
 * import { sequenceArray, some, none, fromPredicate } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * const arr = A.range(0, 10)
 * assert.deepStrictEqual(pipe(arr, A.map(some), sequenceArray), some(arr))
 * assert.deepStrictEqual(pipe(arr, A.map(fromPredicate(x => x > 8)), sequenceArray), none)
 *
 * @since 2.9.0
 */
var sequenceArray = 
/*#__PURE__*/
traverseArray(_function__WEBPACK_IMPORTED_MODULE_0__.identity);


/***/ }),

/***/ "./node_modules/fp-ts/es6/Ord.js":
/*!***************************************!*\
  !*** ./node_modules/fp-ts/es6/Ord.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ordString": () => (/* binding */ ordString),
/* harmony export */   "ordNumber": () => (/* binding */ ordNumber),
/* harmony export */   "ordBoolean": () => (/* binding */ ordBoolean),
/* harmony export */   "lt": () => (/* binding */ lt),
/* harmony export */   "gt": () => (/* binding */ gt),
/* harmony export */   "leq": () => (/* binding */ leq),
/* harmony export */   "geq": () => (/* binding */ geq),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "between": () => (/* binding */ between),
/* harmony export */   "fromCompare": () => (/* binding */ fromCompare),
/* harmony export */   "getSemigroup": () => (/* binding */ getSemigroup),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getTupleOrd": () => (/* binding */ getTupleOrd),
/* harmony export */   "getDualOrd": () => (/* binding */ getDualOrd),
/* harmony export */   "contramap": () => (/* binding */ contramap),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "ordDate": () => (/* binding */ ordDate),
/* harmony export */   "Contravariant": () => (/* binding */ Contravariant),
/* harmony export */   "ord": () => (/* binding */ ord)
/* harmony export */ });
/* harmony import */ var _Ordering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ordering */ "./node_modules/fp-ts/es6/Ordering.js");
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");


// default compare for primitive types
function compare(x, y) {
    return x < y ? -1 : x > y ? 1 : 0;
}
function strictEqual(a, b) {
    return a === b;
}
/**
 * @category instances
 * @since 2.0.0
 */
var ordString = {
    equals: strictEqual,
    compare: compare
};
/**
 * @category instances
 * @since 2.0.0
 */
var ordNumber = {
    equals: strictEqual,
    compare: compare
};
/**
 * @category instances
 * @since 2.0.0
 */
var ordBoolean = {
    equals: strictEqual,
    compare: compare
};
// TODO: curry in v3
/**
 * Test whether one value is _strictly less than_ another
 *
 * @since 2.0.0
 */
function lt(O) {
    return function (x, y) { return O.compare(x, y) === -1; };
}
// TODO: curry in v3
/**
 * Test whether one value is _strictly greater than_ another
 *
 * @since 2.0.0
 */
function gt(O) {
    return function (x, y) { return O.compare(x, y) === 1; };
}
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly less than_ another
 *
 * @since 2.0.0
 */
function leq(O) {
    return function (x, y) { return O.compare(x, y) !== 1; };
}
// TODO: curry in v3
/**
 * Test whether one value is _non-strictly greater than_ another
 *
 * @since 2.0.0
 */
function geq(O) {
    return function (x, y) { return O.compare(x, y) !== -1; };
}
// TODO: curry in v3
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
function min(O) {
    return function (x, y) { return (O.compare(x, y) === 1 ? y : x); };
}
// TODO: curry in v3
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 *
 * @since 2.0.0
 */
function max(O) {
    return function (x, y) { return (O.compare(x, y) === -1 ? y : x); };
}
/**
 * Clamp a value between a minimum and a maximum
 *
 * @since 2.0.0
 */
function clamp(O) {
    var minO = min(O);
    var maxO = max(O);
    return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
}
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 *
 * @since 2.0.0
 */
function between(O) {
    var lessThanO = lt(O);
    var greaterThanO = gt(O);
    return function (low, hi) { return function (x) { return (lessThanO(x, low) || greaterThanO(x, hi) ? false : true); }; };
}
/**
 * @category constructors
 * @since 2.0.0
 */
function fromCompare(compare) {
    var optimizedCompare = function (x, y) { return (x === y ? 0 : compare(x, y)); };
    return {
        equals: function (x, y) { return optimizedCompare(x, y) === 0; },
        compare: optimizedCompare
    };
}
/**
 * Use `getMonoid` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
function getSemigroup() {
    return {
        concat: function (x, y) { return fromCompare(function (a, b) { return _Ordering__WEBPACK_IMPORTED_MODULE_0__.monoidOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
    };
}
/**
 * Returns a `Monoid` such that:
 *
 * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
 * - its `empty` value is an `Ord` that always considers compared elements equal
 *
 * @example
 * import { sort } from 'fp-ts/Array'
 * import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
 * import { pipe } from 'fp-ts/function'
 * import { fold } from 'fp-ts/Monoid'
 *
 * interface User {
 *   id: number
 *   name: string
 *   age: number
 *   rememberMe: boolean
 * }
 *
 * const byName = pipe(
 *   ordString,
 *   contramap((p: User) => p.name)
 * )
 *
 * const byAge = pipe(
 *   ordNumber,
 *   contramap((p: User) => p.age)
 * )
 *
 * const byRememberMe = pipe(
 *   ordBoolean,
 *   contramap((p: User) => p.rememberMe)
 * )
 *
 * const M = getMonoid<User>()
 *
 * const users: Array<User> = [
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
 * ]
 *
 * // sort by name, then by age, then by `rememberMe`
 * const O1 = fold(M)([byName, byAge, byRememberMe])
 * assert.deepStrictEqual(sort(O1)(users), [
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * // now `rememberMe = true` first, then by name, then by age
 * const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
 * assert.deepStrictEqual(sort(O2)(users), [
 *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
 *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
 *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
 *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
 * ])
 *
 * @category instances
 * @since 2.4.0
 */
function getMonoid() {
    return {
        // tslint:disable-next-line: deprecation
        concat: getSemigroup().concat,
        empty: fromCompare(function () { return 0; })
    };
}
/**
 * Given a tuple of `Ord`s returns an `Ord` for the tuple
 *
 * @example
 * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/Ord'
 *
 * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
 * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
 * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
 *
 * @category instances
 * @since 2.0.0
 */
function getTupleOrd() {
    var ords = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ords[_i] = arguments[_i];
    }
    var len = ords.length;
    return fromCompare(function (x, y) {
        var i = 0;
        for (; i < len - 1; i++) {
            var r = ords[i].compare(x[i], y[i]);
            if (r !== 0) {
                return r;
            }
        }
        return ords[i].compare(x[i], y[i]);
    });
}
/**
 * @category combinators
 * @since 2.0.0
 */
function getDualOrd(O) {
    return fromCompare(function (x, y) { return O.compare(y, x); });
}
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
/* istanbul ignore next */
var contramap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(fa, contramap(f)); };
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * @category Contravariant
 * @since 2.0.0
 */
var contramap = function (f) { return function (fa) {
    return fromCompare(function (x, y) { return fa.compare(f(x), f(y)); });
}; };
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.0.0
 */
var URI = 'Ord';
/**
 * @category instances
 * @since 2.0.0
 */
var ordDate = 
/*#__PURE__*/
(0,_function__WEBPACK_IMPORTED_MODULE_1__.pipe)(ordNumber, 
/*#__PURE__*/
contramap(function (date) { return date.valueOf(); }));
/**
 * @category instances
 * @since 2.7.0
 */
var Contravariant = {
    URI: URI,
    contramap: contramap_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.0.0
 */
var ord = Contravariant;


/***/ }),

/***/ "./node_modules/fp-ts/es6/Ordering.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/Ordering.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sign": () => (/* binding */ sign),
/* harmony export */   "eqOrdering": () => (/* binding */ eqOrdering),
/* harmony export */   "semigroupOrdering": () => (/* binding */ semigroupOrdering),
/* harmony export */   "monoidOrdering": () => (/* binding */ monoidOrdering),
/* harmony export */   "invert": () => (/* binding */ invert)
/* harmony export */ });
/**
 * @since 2.0.0
 */
function sign(n) {
    return n <= -1 ? -1 : n >= 1 ? 1 : 0;
}
/**
 * @category instances
 * @since 2.0.0
 */
var eqOrdering = {
    equals: function (x, y) { return x === y; }
};
/**
 * Use `monoidOrdering` instead
 *
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
var semigroupOrdering = {
    concat: function (x, y) { return (x !== 0 ? x : y); }
};
/**
 * @category instances
 * @since 2.4.0
 */
var monoidOrdering = {
    // tslint:disable-next-line: deprecation
    concat: semigroupOrdering.concat,
    empty: 0
};
/**
 * @since 2.0.0
 */
function invert(O) {
    switch (O) {
        case -1:
            return 1;
        case 1:
            return -1;
        default:
            return 0;
    }
}


/***/ }),

/***/ "./node_modules/fp-ts/es6/ReadonlyArray.js":
/*!*************************************************!*\
  !*** ./node_modules/fp-ts/es6/ReadonlyArray.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "getShow": () => (/* binding */ getShow),
/* harmony export */   "getMonoid": () => (/* binding */ getMonoid),
/* harmony export */   "getEq": () => (/* binding */ getEq),
/* harmony export */   "getOrd": () => (/* binding */ getOrd),
/* harmony export */   "makeBy": () => (/* binding */ makeBy),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "replicate": () => (/* binding */ replicate),
/* harmony export */   "flatten": () => (/* binding */ flatten),
/* harmony export */   "foldLeft": () => (/* binding */ foldLeft),
/* harmony export */   "foldRight": () => (/* binding */ foldRight),
/* harmony export */   "scanLeft": () => (/* binding */ scanLeft),
/* harmony export */   "scanRight": () => (/* binding */ scanRight),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isNonEmpty": () => (/* binding */ isNonEmpty),
/* harmony export */   "isOutOfBound": () => (/* binding */ isOutOfBound),
/* harmony export */   "lookup": () => (/* binding */ lookup),
/* harmony export */   "cons": () => (/* binding */ cons),
/* harmony export */   "snoc": () => (/* binding */ snoc),
/* harmony export */   "head": () => (/* binding */ head),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "tail": () => (/* binding */ tail),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "takeLeft": () => (/* binding */ takeLeft),
/* harmony export */   "takeRight": () => (/* binding */ takeRight),
/* harmony export */   "takeLeftWhile": () => (/* binding */ takeLeftWhile),
/* harmony export */   "spanLeft": () => (/* binding */ spanLeft),
/* harmony export */   "dropLeft": () => (/* binding */ dropLeft),
/* harmony export */   "dropRight": () => (/* binding */ dropRight),
/* harmony export */   "dropLeftWhile": () => (/* binding */ dropLeftWhile),
/* harmony export */   "findIndex": () => (/* binding */ findIndex),
/* harmony export */   "findFirst": () => (/* binding */ findFirst),
/* harmony export */   "findFirstMap": () => (/* binding */ findFirstMap),
/* harmony export */   "findLast": () => (/* binding */ findLast),
/* harmony export */   "findLastMap": () => (/* binding */ findLastMap),
/* harmony export */   "findLastIndex": () => (/* binding */ findLastIndex),
/* harmony export */   "insertAt": () => (/* binding */ insertAt),
/* harmony export */   "updateAt": () => (/* binding */ updateAt),
/* harmony export */   "deleteAt": () => (/* binding */ deleteAt),
/* harmony export */   "modifyAt": () => (/* binding */ modifyAt),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "rights": () => (/* binding */ rights),
/* harmony export */   "lefts": () => (/* binding */ lefts),
/* harmony export */   "sort": () => (/* binding */ sort),
/* harmony export */   "zipWith": () => (/* binding */ zipWith),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "prependToAll": () => (/* binding */ prependToAll),
/* harmony export */   "intersperse": () => (/* binding */ intersperse),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "elem": () => (/* binding */ elem),
/* harmony export */   "uniq": () => (/* binding */ uniq),
/* harmony export */   "sortBy": () => (/* binding */ sortBy),
/* harmony export */   "chop": () => (/* binding */ chop),
/* harmony export */   "splitAt": () => (/* binding */ splitAt),
/* harmony export */   "chunksOf": () => (/* binding */ chunksOf),
/* harmony export */   "comprehension": () => (/* binding */ comprehension),
/* harmony export */   "union": () => (/* binding */ union),
/* harmony export */   "intersection": () => (/* binding */ intersection),
/* harmony export */   "difference": () => (/* binding */ difference),
/* harmony export */   "of": () => (/* binding */ of),
/* harmony export */   "zero": () => (/* binding */ zero),
/* harmony export */   "altW": () => (/* binding */ altW),
/* harmony export */   "alt": () => (/* binding */ alt),
/* harmony export */   "ap": () => (/* binding */ ap),
/* harmony export */   "apFirst": () => (/* binding */ apFirst),
/* harmony export */   "apSecond": () => (/* binding */ apSecond),
/* harmony export */   "chain": () => (/* binding */ chain),
/* harmony export */   "chainWithIndex": () => (/* binding */ chainWithIndex),
/* harmony export */   "chainFirst": () => (/* binding */ chainFirst),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapWithIndex": () => (/* binding */ mapWithIndex),
/* harmony export */   "separate": () => (/* binding */ separate),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "filterMapWithIndex": () => (/* binding */ filterMapWithIndex),
/* harmony export */   "filterMap": () => (/* binding */ filterMap),
/* harmony export */   "compact": () => (/* binding */ compact),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionWithIndex": () => (/* binding */ partitionWithIndex),
/* harmony export */   "partitionMap": () => (/* binding */ partitionMap),
/* harmony export */   "partitionMapWithIndex": () => (/* binding */ partitionMapWithIndex),
/* harmony export */   "filterWithIndex": () => (/* binding */ filterWithIndex),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "duplicate": () => (/* binding */ duplicate),
/* harmony export */   "foldMapWithIndex": () => (/* binding */ foldMapWithIndex),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "foldMap": () => (/* binding */ foldMap),
/* harmony export */   "reduceWithIndex": () => (/* binding */ reduceWithIndex),
/* harmony export */   "reduceRight": () => (/* binding */ reduceRight),
/* harmony export */   "reduceRightWithIndex": () => (/* binding */ reduceRightWithIndex),
/* harmony export */   "traverse": () => (/* binding */ traverse),
/* harmony export */   "sequence": () => (/* binding */ sequence),
/* harmony export */   "traverseWithIndex": () => (/* binding */ traverseWithIndex),
/* harmony export */   "wither": () => (/* binding */ wither),
/* harmony export */   "wilt": () => (/* binding */ wilt),
/* harmony export */   "unfold": () => (/* binding */ unfold),
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "Functor": () => (/* binding */ Functor),
/* harmony export */   "FunctorWithIndex": () => (/* binding */ FunctorWithIndex),
/* harmony export */   "Applicative": () => (/* binding */ Applicative),
/* harmony export */   "Monad": () => (/* binding */ Monad),
/* harmony export */   "Unfoldable": () => (/* binding */ Unfoldable),
/* harmony export */   "Alt": () => (/* binding */ Alt),
/* harmony export */   "Alternative": () => (/* binding */ Alternative),
/* harmony export */   "Extend": () => (/* binding */ Extend),
/* harmony export */   "Compactable": () => (/* binding */ Compactable),
/* harmony export */   "Filterable": () => (/* binding */ Filterable),
/* harmony export */   "FilterableWithIndex": () => (/* binding */ FilterableWithIndex),
/* harmony export */   "Foldable": () => (/* binding */ Foldable),
/* harmony export */   "FoldableWithIndex": () => (/* binding */ FoldableWithIndex),
/* harmony export */   "Traversable": () => (/* binding */ Traversable),
/* harmony export */   "TraversableWithIndex": () => (/* binding */ TraversableWithIndex),
/* harmony export */   "Witherable": () => (/* binding */ Witherable),
/* harmony export */   "readonlyArray": () => (/* binding */ readonlyArray),
/* harmony export */   "unsafeInsertAt": () => (/* binding */ unsafeInsertAt),
/* harmony export */   "unsafeUpdateAt": () => (/* binding */ unsafeUpdateAt),
/* harmony export */   "unsafeDeleteAt": () => (/* binding */ unsafeDeleteAt),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "Do": () => (/* binding */ Do),
/* harmony export */   "bindTo": () => (/* binding */ bindTo),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "apS": () => (/* binding */ apS)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option */ "./node_modules/fp-ts/es6/Option.js");
/* harmony import */ var _Ord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ord */ "./node_modules/fp-ts/es6/Ord.js");



// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * @category constructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function fromArray(as) {
    var l = as.length;
    if (l === 0) {
        return empty;
    }
    var ras = Array(l);
    for (var i = 0; i < l; i++) {
        ras[i] = as[i];
    }
    return ras;
}
/**
 * @category destructors
 * @since 2.5.0
 */
// tslint:disable-next-line: readonly-array
function toArray(ras) {
    var l = ras.length;
    var as = Array(l);
    for (var i = 0; i < l; i++) {
        as[i] = ras[i];
    }
    return as;
}
/**
 * @category instances
 * @since 2.5.0
 */
function getShow(S) {
    return {
        show: function (as) { return "[" + as.map(S.show).join(', ') + "]"; }
    };
}
var concat = function (x, y) {
    var lenx = x.length;
    if (lenx === 0) {
        return y;
    }
    var leny = y.length;
    if (leny === 0) {
        return x;
    }
    var r = Array(lenx + leny);
    for (var i = 0; i < lenx; i++) {
        r[i] = x[i];
    }
    for (var i = 0; i < leny; i++) {
        r[i + lenx] = y[i];
    }
    return r;
};
/**
 * Returns a `Monoid` for `ReadonlyArray<A>`
 *
 * @example
 * import { getMonoid } from 'fp-ts/ReadonlyArray'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @category instances
 * @since 2.5.0
 */
function getMonoid() {
    return {
        concat: concat,
        empty: empty
    };
}
/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 *
 * @example
 * import { eqString } from 'fp-ts/Eq'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(eqString)
 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'], []), false)
 *
 * @category instances
 * @since 2.5.0
 */
function getEq(E) {
    return {
        equals: function (xs, ys) { return xs === ys || (xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); })); }
    };
}
/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import { ordString } from 'fp-ts/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @category instances
 * @since 2.5.0
 */
function getOrd(O) {
    return (0,_Ord__WEBPACK_IMPORTED_MODULE_0__.fromCompare)(function (a, b) {
        var aLen = a.length;
        var bLen = b.length;
        var len = Math.min(aLen, bLen);
        for (var i = 0; i < len; i++) {
            var ordering = O.compare(a[i], b[i]);
            if (ordering !== 0) {
                return ordering;
            }
        }
        return _Ord__WEBPACK_IMPORTED_MODULE_0__.ordNumber.compare(aLen, bLen);
    });
}
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 2.5.0
 */
function makeBy(n, f) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    for (var i = 0; i < n; i++) {
        r.push(f(i));
    }
    return r;
}
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 * @category constructors
 * @since 2.5.0
 */
function range(start, end) {
    return makeBy(end - start + 1, function (i) { return start + i; });
}
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 2.5.0
 */
function replicate(n, a) {
    return makeBy(n, function () { return a; });
}
/**
 * Removes one level of nesting
 *
 * Derivable from `Monad`.
 *
 * @example
 * import { flatten } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
function flatten(mma) {
    var rLen = 0;
    var len = mma.length;
    for (var i = 0; i < len; i++) {
        rLen += mma[i].length;
    }
    var r = Array(rLen);
    var start = 0;
    for (var i = 0; i < len; i++) {
        var arr = mma[i];
        var l = arr.length;
        for (var j = 0; j < l; j++) {
            r[j + start] = arr[j];
        }
        start += l;
    }
    return r;
}
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { foldLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 2.5.0
 */
function foldLeft(onEmpty, onCons) {
    return function (as) { return (isEmpty(as) ? onEmpty() : onCons(as[0], as.slice(1))); };
}
/**
 * Break an array into its initial elements and the last element
 *
 * @category destructors
 * @since 2.5.0
 */
function foldRight(onEmpty, onCons) {
    return function (as) { return (isEmpty(as) ? onEmpty() : onCons(as.slice(0, as.length - 1), as[as.length - 1])); };
}
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * @example
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 2.5.0
 */
function scanLeft(b, f) {
    return function (as) {
        var l = as.length;
        var r = new Array(l + 1);
        r[0] = b;
        for (var i = 0; i < l; i++) {
            r[i + 1] = f(r[i], as[i]);
        }
        return r;
    };
}
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 2.5.0
 */
function scanRight(b, f) {
    return function (as) {
        var l = as.length;
        var r = new Array(l + 1);
        r[l] = b;
        for (var i = l - 1; i >= 0; i--) {
            r[i] = f(as[i], r[i + 1]);
        }
        return r;
    };
}
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 2.5.0
 */
function isEmpty(as) {
    return as.length === 0;
}
/**
 * Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @category guards
 * @since 2.5.0
 */
function isNonEmpty(as) {
    return as.length > 0;
}
/**
 * Test whether an array contains a particular index
 *
 * @since 2.5.0
 */
function isOutOfBound(i, as) {
    return i < 0 || i >= as.length;
}
function lookup(i, as) {
    return as === undefined ? function (as) { return lookup(i, as); } : isOutOfBound(i, as) ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(as[i]);
}
function cons(head, tail) {
    if (tail === undefined) {
        return function (tail) { return cons(head, tail); };
    }
    var len = tail.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i + 1] = tail[i];
    }
    r[0] = head;
    return r;
}
// TODO: curry and make data-last in v3
/**
 * Append an element to the end of an array, creating a new non empty array
 *
 * @example
 * import { snoc } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 2.5.0
 */
function snoc(init, end) {
    var len = init.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i] = init[i];
    }
    r[len] = end;
    return r;
}
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 2.5.0
 */
function head(as) {
    return isEmpty(as) ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(as[0]);
}
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 2.5.0
 */
function last(as) {
    return lookup(as.length - 1, as);
}
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 2.5.0
 */
function tail(as) {
    return isEmpty(as) ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(as.slice(1));
}
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 2.5.0
 */
function init(as) {
    var len = as.length;
    return len === 0 ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(as.slice(0, len - 1));
}
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
function takeLeft(n) {
    return function (as) { return as.slice(0, n); };
}
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
 *
 * @since 2.5.0
 */
function takeRight(n) {
    return function (as) { return (n === 0 ? empty : as.slice(-n)); };
}
function takeLeftWhile(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var init = Array(i);
        for (var j = 0; j < i; j++) {
            init[j] = as[j];
        }
        return init;
    };
}
var spanIndexUncurry = function (as, predicate) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
function spanLeft(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var init = Array(i);
        for (var j = 0; j < i; j++) {
            init[j] = as[j];
        }
        var l = as.length;
        var rest = Array(l - i);
        for (var j = i; j < l; j++) {
            rest[j - i] = as[j];
        }
        return { init: init, rest: rest };
    };
}
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { dropLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 2.5.0
 */
function dropLeft(n) {
    return function (as) { return as.slice(n, as.length); };
}
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
function dropRight(n) {
    return function (as) { return as.slice(0, as.length - n); };
}
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @category combinators
 * @since 2.5.0
 */
function dropLeftWhile(predicate) {
    return function (as) {
        var i = spanIndexUncurry(as, predicate);
        var l = as.length;
        var rest = Array(l - i);
        for (var j = i; j < l; j++) {
            rest[j - i] = as[j];
        }
        return rest;
    };
}
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 2.5.0
 */
function findIndex(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            if (predicate(as[i])) {
                return _Option__WEBPACK_IMPORTED_MODULE_1__.some(i);
            }
        }
        return _Option__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
function findFirst(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            if (predicate(as[i])) {
                return _Option__WEBPACK_IMPORTED_MODULE_1__.some(as[i]);
            }
        }
        return _Option__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 2.5.0
 */
function findFirstMap(f) {
    return function (as) {
        var len = as.length;
        for (var i = 0; i < len; i++) {
            var v = f(as[i]);
            if (_Option__WEBPACK_IMPORTED_MODULE_1__.isSome(v)) {
                return v;
            }
        }
        return _Option__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
function findLast(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _Option__WEBPACK_IMPORTED_MODULE_1__.some(as[i]);
            }
        }
        return _Option__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 2.5.0
 */
function findLastMap(f) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            var v = f(as[i]);
            if (_Option__WEBPACK_IMPORTED_MODULE_1__.isSome(v)) {
                return v;
            }
        }
        return _Option__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 2.5.0
 */
function findLastIndex(predicate) {
    return function (as) {
        var len = as.length;
        for (var i = len - 1; i >= 0; i--) {
            if (predicate(as[i])) {
                return _Option__WEBPACK_IMPORTED_MODULE_1__.some(i);
            }
        }
        return _Option__WEBPACK_IMPORTED_MODULE_1__.none;
    };
}
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 2.5.0
 */
function insertAt(i, a) {
    return function (as) { return (i < 0 || i > as.length ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(unsafeInsertAt(i, a, as))); };
}
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 2.5.0
 */
function updateAt(i, a) {
    return function (as) { return (isOutOfBound(i, as) ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(unsafeUpdateAt(i, a, as))); };
}
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 2.5.0
 */
function deleteAt(i) {
    return function (as) { return (isOutOfBound(i, as) ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(unsafeDeleteAt(i, as))); };
}
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 2.5.0
 */
function modifyAt(i, f) {
    return function (as) { return (isOutOfBound(i, as) ? _Option__WEBPACK_IMPORTED_MODULE_1__.none : _Option__WEBPACK_IMPORTED_MODULE_1__.some(unsafeUpdateAt(i, f(as[i]), as))); };
}
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 2.5.0
 */
function reverse(as) {
    if (isEmpty(as)) {
        return as;
    }
    return as.slice().reverse();
}
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
function rights(as) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    var len = as.length;
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (a._tag === 'Right') {
            r.push(a.right);
        }
    }
    return r;
}
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 2.5.0
 */
function lefts(as) {
    // tslint:disable-next-line: readonly-array
    var r = [];
    var len = as.length;
    for (var i = 0; i < len; i++) {
        var a = as[i];
        if (a._tag === 'Left') {
            r.push(a.left);
        }
    }
    return r;
}
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import { ordNumber } from 'fp-ts/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
var sort = function (O) { return function (as) {
    return as.length <= 1 ? as : as.slice().sort(O.compare);
}; };
// TODO: curry and make data-last in v3
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 2.5.0
 */
function zipWith(fa, fb, f) {
    // tslint:disable-next-line: readonly-array
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
}
function zip(as, bs) {
    if (bs === undefined) {
        return function (bs) { return zip(bs, as); };
    }
    return zipWith(as, bs, function (a, b) { return [a, b]; });
}
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 2.5.0
 */
function unzip(as) {
    // tslint:disable-next-line: readonly-array
    var fa = [];
    // tslint:disable-next-line: readonly-array
    var fb = [];
    for (var i = 0; i < as.length; i++) {
        fa[i] = as[i][0];
        fb[i] = as[i][1];
    }
    return [fa, fb];
}
/**
 * Prepend an element to every member of an array
 *
 * @example
 * import { prependToAll } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(prependToAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
var prependToAll = function (e) { return function (xs) {
    // tslint:disable-next-line: readonly-array
    var ys = [];
    for (var _i = 0, xs_1 = xs; _i < xs_1.length; _i++) {
        var x = xs_1[_i];
        ys.push(e, x);
    }
    return ys;
}; };
/**
 * Places an element in between members of an array
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 2.9.0
 */
function intersperse(e) {
    return function (as) {
        var length = as.length;
        if (length === 0) {
            return as;
        }
        return cons(as[0], prependToAll(e)(as.slice(1, as.length)));
    };
}
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 2.5.0
 */
function rotate(n) {
    return function (as) {
        var len = as.length;
        if (n === 0 || len <= 1 || len === Math.abs(n)) {
            return as;
        }
        else if (n < 0) {
            return rotate(len + n)(as);
        }
        else {
            return as.slice(-n).concat(as.slice(0, len - n));
        }
    };
}
function elem(E) {
    return function (a, as) {
        if (as === undefined) {
            var elemE_1 = elem(E);
            return function (as) { return elemE_1(a, as); };
        }
        var predicate = function (element) { return E.equals(element, a); };
        var i = 0;
        var len = as.length;
        for (; i < len; i++) {
            if (predicate(as[i])) {
                return true;
            }
        }
        return false;
    };
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import { eqNumber } from 'fp-ts/Eq'
 *
 * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 2.5.0
 */
function uniq(E) {
    var elemS = elem(E);
    return function (as) {
        var len = as.length;
        if (len <= 1) {
            return as;
        }
        // tslint:disable-next-line: readonly-array
        var r = [];
        var i = 0;
        for (; i < len; i++) {
            var a = as[i];
            if (!elemS(a, r)) {
                r.push(a);
            }
        }
        return len === r.length ? as : r;
    };
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
 * import { ord, ordString, ordNumber } from 'fp-ts/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = ord.contramap(ordString, (p: Person) => p.name)
 * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 2.5.0
 */
function sortBy(ords) {
    var M = (0,_Ord__WEBPACK_IMPORTED_MODULE_0__.getMonoid)();
    return sort(ords.reduce(M.concat, M.empty));
}
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Eq, eqNumber } from 'fp-ts/Eq'
 * import { chop, spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return chop(as => {
 *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 2.5.0
 */
var chop = function (f) { return function (as) {
    // tslint:disable-next-line: readonly-array
    var result = [];
    var cs = as;
    while (isNonEmpty(cs)) {
        var _a = f(cs), b = _a[0], c = _a[1];
        result.push(b);
        cs = c;
    }
    return result;
}; };
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 2.5.0
 */
function splitAt(n) {
    return function (as) { return [as.slice(0, n), as.slice(n)]; };
}
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 2.5.0
 */
function chunksOf(n) {
    var f = chop(splitAt(n));
    return function (as) { return (as.length === 0 ? empty : isOutOfBound(n - 1, as) ? [as] : f(as)); };
}
function comprehension(input, f, g) {
    if (g === void 0) { g = function () { return true; }; }
    var go = function (scope, input) {
        if (input.length === 0) {
            return g.apply(void 0, scope) ? [f.apply(void 0, scope)] : empty;
        }
        else {
            return chain_(input[0], function (x) { return go(snoc(scope, x), input.slice(1)); });
        }
    };
    return go(empty, input);
}
function union(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var unionE_1 = union(E);
            return function (ys) { return unionE_1(ys, xs); };
        }
        return concat(xs, ys.filter(function (a) { return !elemE(a, xs); }));
    };
}
function intersection(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var intersectionE_1 = intersection(E);
            return function (ys) { return intersectionE_1(ys, xs); };
        }
        return xs.filter(function (a) { return elemE(a, ys); });
    };
}
function difference(E) {
    var elemE = elem(E);
    return function (xs, ys) {
        if (ys === undefined) {
            var differenceE_1 = difference(E);
            return function (ys) { return differenceE_1(ys, xs); };
        }
        return xs.filter(function (a) { return !elemE(a, ys); });
    };
}
/**
 * Wrap a value into the type constructor.
 *
 * @category Applicative
 * @since 2.5.0
 */
var of = function (a) { return [a]; };
/**
 * @category Alternative
 * @since 2.7.0
 */
var zero = function () { return empty; };
// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------
var map_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, map(f)); };
var mapWithIndex_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, mapWithIndex(f)); };
var ap_ = function (fab, fa) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fab, ap(fa)); };
var chain_ = function (ma, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ma, chain(f));
};
var filter_ = function (fa, predicate) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filter(predicate)); };
var filterMap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filterMap(f)); };
var partitionWithIndex_ = function (fa, predicateWithIndex) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partitionWithIndex(predicateWithIndex)); };
var partition_ = function (fa, predicate) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partition(predicate)); };
var partitionMap_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partitionMap(f)); };
var partitionMapWithIndex_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, partitionMapWithIndex(f)); };
var alt_ = function (fa, that) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, alt(that)); };
var reduce_ = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduce(b, f)); };
var foldMap_ = function (M) {
    var foldMapM = foldMap(M);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, foldMapM(f)); };
};
var reduceRight_ = function (fa, b, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceRight(b, f)); };
var reduceWithIndex_ = function (fa, b, f) {
    var l = fa.length;
    var r = b;
    for (var i = 0; i < l; i++) {
        r = f(i, r, fa[i]);
    }
    return r;
};
var foldMapWithIndex_ = function (M) { return function (fa, f) {
    return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty);
}; };
var reduceRightWithIndex_ = function (fa, b, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, reduceRightWithIndex(b, f));
};
var filterMapWithIndex_ = function (fa, f) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filterMapWithIndex(f));
};
var filterWithIndex_ = function (fa, predicateWithIndex) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, filterWithIndex(predicateWithIndex)); };
var extend_ = function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, extend(f)); };
var traverse_ = function (F) {
    var traverseF = traverse(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ta, traverseF(f)); };
};
/* istanbul ignore next */
var traverseWithIndex_ = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (ta, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ta, traverseWithIndexF(f)); };
};
/* istanbul ignore next */
var wither_ = function (F) {
    var witherF = wither(F);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, witherF(f)); };
};
/* istanbul ignore next */
var wilt_ = function (F) {
    var wiltF = wilt(F);
    return function (fa, f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, wiltF(f)); };
};
// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------
/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.9.0
 */
var altW = function (that) { return function (fa) { return concat(fa, that()); }; };
/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 2.5.0
 */
var alt = altW;
/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.5.0
 */
var ap = function (fa) {
    return chain(function (f) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, map(f)); });
};
/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
var apFirst = function (fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.flow)(map(function (a) { return function () { return a; }; }), ap(fb));
};
/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 2.5.0
 */
var apSecond = function (fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.flow)(map(function () { return function (b) { return b; }; }), ap(fb));
};
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.5.0
 */
var chain = function (f) { return function (ma) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(ma, chainWithIndex(function (_, a) { return f(a); }));
}; };
/**
 * @since 2.7.0
 */
var chainWithIndex = function (f) { return function (ma) {
    var outLen = 0;
    var l = ma.length;
    var temp = new Array(l);
    for (var i = 0; i < l; i++) {
        var e = ma[i];
        var arr = f(i, e);
        outLen += arr.length;
        temp[i] = arr;
    }
    var out = Array(outLen);
    var start = 0;
    for (var i = 0; i < l; i++) {
        var arr = temp[i];
        var l_1 = arr.length;
        for (var j = 0; j < l_1; j++) {
            out[j + start] = arr[j];
        }
        start += l_1;
    }
    return out;
}; };
/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category combinators
 * @since 2.5.0
 */
var chainFirst = function (f) {
    return chain(function (a) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(f(a), map(function () { return a; }));
    });
};
/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.5.0
 */
var map = function (f) { return function (fa) {
    return fa.map(function (a) { return f(a); });
}; };
/**
 * @category FunctorWithIndex
 * @since 2.5.0
 */
var mapWithIndex = function (f) { return function (fa) { return fa.map(function (a, i) { return f(i, a); }); }; };
/**
 * @category Compactable
 * @since 2.5.0
 */
var separate = function (fa) {
    // tslint:disable-next-line: readonly-array
    var left = [];
    // tslint:disable-next-line: readonly-array
    var right = [];
    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
        var e = fa_1[_i];
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return {
        left: left,
        right: right
    };
};
/**
 * @category Filterable
 * @since 2.5.0
 */
var filter = function (predicate) { return function (fa) { return fa.filter(predicate); }; };
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var filterMapWithIndex = function (f) { return function (fa) {
    // tslint:disable-next-line: readonly-array
    var result = [];
    for (var i = 0; i < fa.length; i++) {
        var optionB = f(i, fa[i]);
        if (_Option__WEBPACK_IMPORTED_MODULE_1__.isSome(optionB)) {
            result.push(optionB.value);
        }
    }
    return result;
}; };
/**
 * @category Filterable
 * @since 2.5.0
 */
var filterMap = function (f) {
    return filterMapWithIndex(function (_, a) { return f(a); });
};
/**
 * @category Compactable
 * @since 2.5.0
 */
var compact = 
/*#__PURE__*/
filterMap(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * @category Filterable
 * @since 2.5.0
 */
var partition = function (predicate) {
    return partitionWithIndex(function (_, a) { return predicate(a); });
};
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var partitionWithIndex = function (predicateWithIndex) { return function (fa) {
    // tslint:disable-next-line: readonly-array
    var left = [];
    // tslint:disable-next-line: readonly-array
    var right = [];
    for (var i = 0; i < fa.length; i++) {
        var a = fa[i];
        if (predicateWithIndex(i, a)) {
            right.push(a);
        }
        else {
            left.push(a);
        }
    }
    return {
        left: left,
        right: right
    };
}; };
/**
 * @category Filterable
 * @since 2.5.0
 */
var partitionMap = function (f) {
    return partitionMapWithIndex(function (_, a) { return f(a); });
};
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var partitionMapWithIndex = function (f) { return function (fa) {
    // tslint:disable-next-line: readonly-array
    var left = [];
    // tslint:disable-next-line: readonly-array
    var right = [];
    for (var i = 0; i < fa.length; i++) {
        var e = f(i, fa[i]);
        if (e._tag === 'Left') {
            left.push(e.left);
        }
        else {
            right.push(e.right);
        }
    }
    return {
        left: left,
        right: right
    };
}; };
/**
 * @category FilterableWithIndex
 * @since 2.5.0
 */
var filterWithIndex = function (predicateWithIndex) { return function (fa) {
    return fa.filter(function (a, i) { return predicateWithIndex(i, a); });
}; };
/**
 * @category Extend
 * @since 2.5.0
 */
var extend = function (f) { return function (wa) { return wa.map(function (_, i, as) { return f(as.slice(i)); }); }; };
/**
 * Derivable from `Extend`.
 *
 * @category combinators
 * @since 2.5.0
 */
var duplicate = 
/*#__PURE__*/
extend(_function__WEBPACK_IMPORTED_MODULE_2__.identity);
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var foldMapWithIndex = function (M) {
    var foldMapWithIndexM = foldMapWithIndex_(M);
    return function (f) { return function (fa) { return foldMapWithIndexM(fa, f); }; };
};
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduce = function (b, f) {
    return reduceWithIndex(b, function (_, b, a) { return f(b, a); });
};
/**
 * @category Foldable
 * @since 2.5.0
 */
var foldMap = function (M) {
    var foldMapWithIndexM = foldMapWithIndex(M);
    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
};
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceWithIndex = function (b, f) { return function (fa) { return reduceWithIndex_(fa, b, f); }; };
/**
 * @category Foldable
 * @since 2.5.0
 */
var reduceRight = function (b, f) {
    return reduceRightWithIndex(b, function (_, a, b) { return f(a, b); });
};
/**
 * @category FoldableWithIndex
 * @since 2.5.0
 */
var reduceRightWithIndex = function (b, f) { return function (fa) { return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b); }; };
/**
 * **for optimized and stack safe version check the data types `traverseArray` function**
 * @category Traversable
 * @since 2.6.3
 */
var traverse = function (F) {
    var traverseWithIndexF = traverseWithIndex(F);
    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
};
/**
 * **for optimized and stack safe version check the data types `sequenceArray` function**
 * @category Traversable
 * @since 2.6.3
 */
var sequence = function (F) { return function (ta) {
    return reduce_(ta, F.of(zero()), function (fas, fa) {
        return F.ap(F.map(fas, function (as) { return function (a) { return snoc(as, a); }; }), fa);
    });
}; };
/**
 * **for optimized and stack safe version check the data types `traverseArrayWithIndex` function**
 * @category TraversableWithIndex
 * @since 2.6.3
 */
var traverseWithIndex = function (F) { return function (f) {
    return reduceWithIndex(F.of(zero()), function (i, fbs, a) {
        return F.ap(F.map(fbs, function (bs) { return function (b) { return snoc(bs, b); }; }), f(i, a));
    });
}; };
/**
 * @category Witherable
 * @since 2.6.5
 */
var wither = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map((0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, traverseF(f)), compact); }; };
};
/**
 * @category Witherable
 * @since 2.6.5
 */
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map((0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(fa, traverseF(f)), separate); }; };
};
/**
 * @category Unfoldable
 * @since 2.6.6
 */
var unfold = function (b, f) {
    // tslint:disable-next-line: readonly-array
    var ret = [];
    var bb = b;
    while (true) {
        var mt = f(bb);
        if (_Option__WEBPACK_IMPORTED_MODULE_1__.isSome(mt)) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            ret.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return ret;
};
// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------
/**
 * @category instances
 * @since 2.5.0
 */
var URI = 'ReadonlyArray';
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: map_
};
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Applicative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of
};
/**
 * @category instances
 * @since 2.7.0
 */
var Monad = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Unfoldable = {
    URI: URI,
    unfold: unfold
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alt = {
    URI: URI,
    map: map_,
    alt: alt_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Alternative = {
    URI: URI,
    map: map_,
    ap: ap_,
    of: of,
    alt: alt_,
    zero: zero
};
/**
 * @category instances
 * @since 2.7.0
 */
var Extend = {
    URI: URI,
    map: map_,
    extend: extend_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI,
    compact: compact,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_
};
/**
 * @category instances
 * @since 2.7.0
 */
var FilterableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Foldable = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_
};
/**
 * @category instances
 * @since 2.7.0
 */
var FoldableWithIndex = {
    URI: URI,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Traversable = {
    URI: URI,
    map: map_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence
};
/**
 * @category instances
 * @since 2.7.0
 */
var TraversableWithIndex = {
    URI: URI,
    map: map_,
    mapWithIndex: mapWithIndex_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverse: traverse_,
    sequence: sequence,
    traverseWithIndex: traverseWithIndex_
};
/**
 * @category instances
 * @since 2.7.0
 */
var Witherable = {
    URI: URI,
    map: map_,
    compact: compact,
    separate: separate,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    wither: wither_,
    wilt: wilt_
};
// TODO: remove in v3
/**
 * @category instances
 * @since 2.5.0
 */
var readonlyArray = {
    URI: URI,
    compact: compact,
    separate: separate,
    map: map_,
    ap: ap_,
    of: of,
    chain: chain_,
    filter: filter_,
    filterMap: filterMap_,
    partition: partition_,
    partitionMap: partitionMap_,
    mapWithIndex: mapWithIndex_,
    partitionMapWithIndex: partitionMapWithIndex_,
    partitionWithIndex: partitionWithIndex_,
    filterMapWithIndex: filterMapWithIndex_,
    filterWithIndex: filterWithIndex_,
    alt: alt_,
    zero: zero,
    unfold: unfold,
    reduce: reduce_,
    foldMap: foldMap_,
    reduceRight: reduceRight_,
    traverse: traverse_,
    sequence: sequence,
    reduceWithIndex: reduceWithIndex_,
    foldMapWithIndex: foldMapWithIndex_,
    reduceRightWithIndex: reduceRightWithIndex_,
    traverseWithIndex: traverseWithIndex_,
    extend: extend_,
    wither: wither_,
    wilt: wilt_
};
// -------------------------------------------------------------------------------------
// unsafe
// -------------------------------------------------------------------------------------
/**
 * @category unsafe
 * @since 2.5.0
 */
function unsafeInsertAt(i, a, as) {
    var xs = as.slice();
    xs.splice(i, 0, a);
    return xs;
}
/**
 * @category unsafe
 * @since 2.5.0
 */
function unsafeUpdateAt(i, a, as) {
    if (as[i] === a) {
        return as;
    }
    else {
        var xs = as.slice();
        xs[i] = a;
        return xs;
    }
}
/**
 * @category unsafe
 * @since 2.5.0
 */
function unsafeDeleteAt(i, as) {
    var xs = as.slice();
    xs.splice(i, 1);
    return xs;
}
// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------
/**
 * An empty array
 *
 * @since 2.5.0
 */
var empty = [];
/**
 * Check if a predicate holds true for every array member.
 *
 * @example
 * import { every } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], every(isPositive)), true)
 * assert.deepStrictEqual(pipe([1, 2, -3], every(isPositive)), false)
 *
 * @since 2.9.0
 */
var every = function (predicate) { return function (as) { return as.every(predicate); }; };
/**
 * Check if a predicate holds true for any array member.
 *
 * @example
 * import { some } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 2.9.0
 */
var some = function (predicate) { return function (as) { return as.some(predicate); }; };
// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------
/**
 * @since 2.9.0
 */
var Do = 
/*#__PURE__*/
of({});
/**
 * @since 2.8.0
 */
var bindTo = function (name) {
    return map((0,_function__WEBPACK_IMPORTED_MODULE_2__.bindTo_)(name));
};
/**
 * @since 2.8.0
 */
var bind = function (name, f) {
    return chain(function (a) {
        return (0,_function__WEBPACK_IMPORTED_MODULE_2__.pipe)(f(a), map(function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.bind_)(a, name, b); }));
    });
};
// -------------------------------------------------------------------------------------
// pipeable sequence S
// -------------------------------------------------------------------------------------
/**
 * @since 2.8.0
 */
var apS = function (name, fb) {
    return (0,_function__WEBPACK_IMPORTED_MODULE_2__.flow)(map(function (a) { return function (b) { return (0,_function__WEBPACK_IMPORTED_MODULE_2__.bind_)(a, name, b); }; }), ap(fb));
};


/***/ }),

/***/ "./node_modules/fp-ts/es6/function.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/function.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "unsafeCoerce": () => (/* binding */ unsafeCoerce),
/* harmony export */   "not": () => (/* binding */ not),
/* harmony export */   "constant": () => (/* binding */ constant),
/* harmony export */   "constTrue": () => (/* binding */ constTrue),
/* harmony export */   "constFalse": () => (/* binding */ constFalse),
/* harmony export */   "constNull": () => (/* binding */ constNull),
/* harmony export */   "constUndefined": () => (/* binding */ constUndefined),
/* harmony export */   "constVoid": () => (/* binding */ constVoid),
/* harmony export */   "flip": () => (/* binding */ flip),
/* harmony export */   "flow": () => (/* binding */ flow),
/* harmony export */   "tuple": () => (/* binding */ tuple),
/* harmony export */   "increment": () => (/* binding */ increment),
/* harmony export */   "decrement": () => (/* binding */ decrement),
/* harmony export */   "absurd": () => (/* binding */ absurd),
/* harmony export */   "tupled": () => (/* binding */ tupled),
/* harmony export */   "untupled": () => (/* binding */ untupled),
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "hole": () => (/* binding */ hole),
/* harmony export */   "bind_": () => (/* binding */ bind_),
/* harmony export */   "bindTo_": () => (/* binding */ bindTo_)
/* harmony export */ });
/**
 * @since 2.0.0
 */
/**
 * @since 2.0.0
 */
function identity(a) {
    return a;
}
/**
 * @since 2.0.0
 */
var unsafeCoerce = identity;
/**
 * @since 2.0.0
 */
function not(predicate) {
    return function (a) { return !predicate(a); };
}
/**
 * @since 2.0.0
 */
function constant(a) {
    return function () { return a; };
}
/**
 * A thunk that returns always `true`.
 *
 * @since 2.0.0
 */
var constTrue = 
/*#__PURE__*/
constant(true);
/**
 * A thunk that returns always `false`.
 *
 * @since 2.0.0
 */
var constFalse = 
/*#__PURE__*/
constant(false);
/**
 * A thunk that returns always `null`.
 *
 * @since 2.0.0
 */
var constNull = 
/*#__PURE__*/
constant(null);
/**
 * A thunk that returns always `undefined`.
 *
 * @since 2.0.0
 */
var constUndefined = 
/*#__PURE__*/
constant(undefined);
/**
 * A thunk that returns always `void`.
 *
 * @since 2.0.0
 */
var constVoid = constUndefined;
// TODO: remove in v3
/**
 * Flips the order of the arguments of a function of two arguments.
 *
 * @since 2.0.0
 */
function flip(f) {
    return function (b, a) { return f(a, b); };
}
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
        case 1:
            return ab;
        case 2:
            return function () {
                return bc(ab.apply(this, arguments));
            };
        case 3:
            return function () {
                return cd(bc(ab.apply(this, arguments)));
            };
        case 4:
            return function () {
                return de(cd(bc(ab.apply(this, arguments))));
            };
        case 5:
            return function () {
                return ef(de(cd(bc(ab.apply(this, arguments)))));
            };
        case 6:
            return function () {
                return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
            };
        case 7:
            return function () {
                return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
            };
        case 8:
            return function () {
                return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
            };
        case 9:
            return function () {
                return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
            };
    }
    return;
}
/**
 * @since 2.0.0
 */
function tuple() {
    var t = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        t[_i] = arguments[_i];
    }
    return t;
}
/**
 * @since 2.0.0
 */
function increment(n) {
    return n + 1;
}
/**
 * @since 2.0.0
 */
function decrement(n) {
    return n - 1;
}
/**
 * @since 2.0.0
 */
function absurd(_) {
    throw new Error('Called `absurd` function which should be uncallable');
}
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * import { tupled } from 'fp-ts/function'
 *
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 *
 * @since 2.4.0
 */
function tupled(f) {
    return function (a) { return f.apply(void 0, a); };
}
/**
 * Inverse function of `tupled`
 *
 * @since 2.4.0
 */
function untupled(f) {
    return function () {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        return f(a);
    };
}
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st) {
    switch (arguments.length) {
        case 1:
            return a;
        case 2:
            return ab(a);
        case 3:
            return bc(ab(a));
        case 4:
            return cd(bc(ab(a)));
        case 5:
            return de(cd(bc(ab(a))));
        case 6:
            return ef(de(cd(bc(ab(a)))));
        case 7:
            return fg(ef(de(cd(bc(ab(a))))));
        case 8:
            return gh(fg(ef(de(cd(bc(ab(a)))))));
        case 9:
            return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
        case 10:
            return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
        case 11:
            return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
        case 12:
            return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
        case 13:
            return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
        case 14:
            return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));
        case 15:
            return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));
        case 16:
            return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));
        case 17:
            return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));
        case 18:
            return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));
        case 19:
            return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));
        case 20:
            return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
    }
    return;
}
/**
 * Type hole simulation
 *
 * @since 2.7.0
 */
var hole = absurd;
/**
 * @internal
 */
var bind_ = function (a, name, b) {
    var _a;
    return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
};
/**
 * @internal
 */
var bindTo_ = function (name) { return function (b) {
    var _a;
    return (_a = {}, _a[name] = b, _a);
}; };


/***/ }),

/***/ "./node_modules/fp-ts/es6/pipeable.js":
/*!********************************************!*\
  !*** ./node_modules/fp-ts/es6/pipeable.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeable": () => (/* binding */ pipeable)
/* harmony export */ });
/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function */ "./node_modules/fp-ts/es6/function.js");

// TODO: remove module in v3
/**
 * Use [`pipe`](https://gcanti.github.io/fp-ts/modules/function.ts.html#flow) from `function` module instead.
 *
 * @since 2.0.0
 */
var pipe = _function__WEBPACK_IMPORTED_MODULE_0__.pipe;
var isFunctor = function (I) { return typeof I.map === 'function'; };
var isContravariant = function (I) { return typeof I.contramap === 'function'; };
var isFunctorWithIndex = function (I) { return typeof I.mapWithIndex === 'function'; };
var isApply = function (I) { return typeof I.ap === 'function'; };
var isChain = function (I) { return typeof I.chain === 'function'; };
var isBifunctor = function (I) { return typeof I.bimap === 'function'; };
var isExtend = function (I) { return typeof I.extend === 'function'; };
var isFoldable = function (I) { return typeof I.reduce === 'function'; };
var isFoldableWithIndex = function (I) { return typeof I.reduceWithIndex === 'function'; };
var isAlt = function (I) { return typeof I.alt === 'function'; };
var isCompactable = function (I) { return typeof I.compact === 'function'; };
var isFilterable = function (I) { return typeof I.filter === 'function'; };
var isFilterableWithIndex = function (I) {
    return typeof I.filterWithIndex === 'function';
};
var isProfunctor = function (I) { return typeof I.promap === 'function'; };
var isSemigroupoid = function (I) { return typeof I.compose === 'function'; };
var isMonadThrow = function (I) { return typeof I.throwError === 'function'; };
function pipeable(I) {
    var r = {};
    if (isFunctor(I)) {
        var map = function (f) { return function (fa) { return I.map(fa, f); }; };
        r.map = map;
    }
    if (isContravariant(I)) {
        var contramap = function (f) { return function (fa) { return I.contramap(fa, f); }; };
        r.contramap = contramap;
    }
    if (isFunctorWithIndex(I)) {
        var mapWithIndex = function (f) { return function (fa) { return I.mapWithIndex(fa, f); }; };
        r.mapWithIndex = mapWithIndex;
    }
    if (isApply(I)) {
        var ap = function (fa) { return function (fab) { return I.ap(fab, fa); }; };
        var apFirst = function (fb) { return function (fa) {
            return I.ap(I.map(fa, function (a) { return function () { return a; }; }), fb);
        }; };
        r.ap = ap;
        r.apFirst = apFirst;
        r.apSecond = function (fb) { return function (fa) {
            return I.ap(I.map(fa, function () { return function (b) { return b; }; }), fb);
        }; };
    }
    if (isChain(I)) {
        var chain = function (f) { return function (ma) { return I.chain(ma, f); }; };
        var chainFirst = function (f) { return function (ma) { return I.chain(ma, function (a) { return I.map(f(a), function () { return a; }); }); }; };
        var flatten = function (mma) { return I.chain(mma, _function__WEBPACK_IMPORTED_MODULE_0__.identity); };
        r.chain = chain;
        r.chainFirst = chainFirst;
        r.flatten = flatten;
    }
    if (isBifunctor(I)) {
        var bimap = function (f, g) { return function (fa) { return I.bimap(fa, f, g); }; };
        var mapLeft = function (f) { return function (fa) { return I.mapLeft(fa, f); }; };
        r.bimap = bimap;
        r.mapLeft = mapLeft;
    }
    if (isExtend(I)) {
        var extend = function (f) { return function (wa) { return I.extend(wa, f); }; };
        var duplicate = function (wa) { return I.extend(wa, _function__WEBPACK_IMPORTED_MODULE_0__.identity); };
        r.extend = extend;
        r.duplicate = duplicate;
    }
    if (isFoldable(I)) {
        var reduce = function (b, f) { return function (fa) { return I.reduce(fa, b, f); }; };
        var foldMap = function (M) {
            var foldMapM = I.foldMap(M);
            return function (f) { return function (fa) { return foldMapM(fa, f); }; };
        };
        var reduceRight = function (b, f) { return function (fa) { return I.reduceRight(fa, b, f); }; };
        r.reduce = reduce;
        r.foldMap = foldMap;
        r.reduceRight = reduceRight;
    }
    if (isFoldableWithIndex(I)) {
        var reduceWithIndex = function (b, f) { return function (fa) {
            return I.reduceWithIndex(fa, b, f);
        }; };
        var foldMapWithIndex = function (M) {
            var foldMapM = I.foldMapWithIndex(M);
            return function (f) { return function (fa) { return foldMapM(fa, f); }; };
        };
        var reduceRightWithIndex = function (b, f) { return function (fa) {
            return I.reduceRightWithIndex(fa, b, f);
        }; };
        r.reduceWithIndex = reduceWithIndex;
        r.foldMapWithIndex = foldMapWithIndex;
        r.reduceRightWithIndex = reduceRightWithIndex;
    }
    if (isAlt(I)) {
        var alt = function (that) { return function (fa) { return I.alt(fa, that); }; };
        r.alt = alt;
    }
    if (isCompactable(I)) {
        r.compact = I.compact;
        r.separate = I.separate;
    }
    if (isFilterable(I)) {
        var filter = function (predicate) { return function (fa) {
            return I.filter(fa, predicate);
        }; };
        var filterMap = function (f) { return function (fa) { return I.filterMap(fa, f); }; };
        var partition = function (predicate) { return function (fa) {
            return I.partition(fa, predicate);
        }; };
        var partitionMap = function (f) { return function (fa) { return I.partitionMap(fa, f); }; };
        r.filter = filter;
        r.filterMap = filterMap;
        r.partition = partition;
        r.partitionMap = partitionMap;
    }
    if (isFilterableWithIndex(I)) {
        var filterWithIndex = function (predicateWithIndex) { return function (fa) { return I.filterWithIndex(fa, predicateWithIndex); }; };
        var filterMapWithIndex = function (f) { return function (fa) {
            return I.filterMapWithIndex(fa, f);
        }; };
        var partitionWithIndex = function (predicateWithIndex) { return function (fa) { return I.partitionWithIndex(fa, predicateWithIndex); }; };
        var partitionMapWithIndex = function (f) { return function (fa) {
            return I.partitionMapWithIndex(fa, f);
        }; };
        r.filterWithIndex = filterWithIndex;
        r.filterMapWithIndex = filterMapWithIndex;
        r.partitionWithIndex = partitionWithIndex;
        r.partitionMapWithIndex = partitionMapWithIndex;
    }
    if (isProfunctor(I)) {
        var promap = function (f, g) { return function (fa) { return I.promap(fa, f, g); }; };
        r.promap = promap;
    }
    if (isSemigroupoid(I)) {
        var compose = function (that) { return function (fa) { return I.compose(fa, that); }; };
        r.compose = compose;
    }
    if (isMonadThrow(I)) {
        var fromOption = function (onNone) { return function (ma) {
            return ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value);
        }; };
        var fromEither = function (ma) {
            return ma._tag === 'Left' ? I.throwError(ma.left) : I.of(ma.right);
        };
        var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }; };
        var filterOrElse = function (predicate, onFalse) { return function (ma) { return I.chain(ma, function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }); }; };
        r.fromOption = fromOption;
        r.fromEither = fromEither;
        r.fromPredicate = fromPredicate;
        r.filterOrElse = filterOrElse;
    }
    return r;
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/sanctuary-show/index.js":
/*!**********************************************!*\
  !*** ./node_modules/sanctuary-show/index.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//. # sanctuary-show
//.
//. Haskell has a `show` function which can be applied to a compatible value to
//. produce a descriptive string representation of that value. The idea is that
//. the string representation should, if possible, be an expression which would
//. produce the original value if evaluated.
//.
//. This library provides a similar [`show`](#show) function.
//.
//. In general, this property should hold: `eval (show (x)) = x`. In some cases
//. parens are necessary to ensure correct interpretation (`{}`, for example,
//. is an empty block rather than an empty object in some contexts). Thus the
//. property is more accurately stated `eval ('(' + show (x) + ')') = x`.
//.
//. One can make values of a custom type compatible with [`show`](#show) by
//. defining a `@@show` method. For example:
//.
//. ```javascript
//. //# Maybe#@@show :: Maybe a ~> () -> String
//. //.
//. //. ```javascript
//. //. > show (Nothing)
//. //. 'Nothing'
//. //.
//. //. > show (Just (['foo', 'bar', 'baz']))
//. //. 'Just (["foo", "bar", "baz"])'
//. //. ```
//. Maybe.prototype['@@show'] = function() {
//.   return this.isNothing ? 'Nothing' : 'Just (' + show (this.value) + ')';
//. };
//. ```

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if ( true && typeof module.exports === 'object') {
    module.exports = f ();
  } else if ( true && __webpack_require__.amdO != null) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    self.sanctuaryShow = f ();
  }

} (function() {

  'use strict';

  //  $$show :: String
  var $$show = '@@show';

  //  seen :: Array Any
  var seen = [];

  //  entry :: Object -> String -> String
  function entry(o) {
    return function(k) {
      return show (k) + ': ' + show (o[k]);
    };
  }

  //  sortedKeys :: Object -> Array String
  function sortedKeys(o) {
    return (Object.keys (o)).sort ();
  }

  //# show :: Showable a => a -> String
  //.
  //. Returns a useful string representation of the given value.
  //.
  //. Dispatches to the value's `@@show` method if present.
  //.
  //. Where practical, `show (eval ('(' + show (x) + ')')) = show (x)`.
  //.
  //. ```javascript
  //. > show (null)
  //. 'null'
  //.
  //. > show (undefined)
  //. 'undefined'
  //.
  //. > show (true)
  //. 'true'
  //.
  //. > show (new Boolean (false))
  //. 'new Boolean (false)'
  //.
  //. > show (-0)
  //. '-0'
  //.
  //. > show (NaN)
  //. 'NaN'
  //.
  //. > show (new Number (Infinity))
  //. 'new Number (Infinity)'
  //.
  //. > show ('foo\n"bar"\nbaz\n')
  //. '"foo\\n\\"bar\\"\\nbaz\\n"'
  //.
  //. > show (new String (''))
  //. 'new String ("")'
  //.
  //. > show (['foo', 'bar', 'baz'])
  //. '["foo", "bar", "baz"]'
  //.
  //. > show ([[[[[0]]]]])
  //. '[[[[[0]]]]]'
  //.
  //. > show ({x: [1, 2], y: [3, 4], z: [5, 6]})
  //. '{"x": [1, 2], "y": [3, 4], "z": [5, 6]}'
  //. ```
  function show(x) {
    if (seen.indexOf (x) >= 0) return '<Circular>';

    switch (Object.prototype.toString.call (x)) {

      case '[object Boolean]':
        return typeof x === 'object' ?
          'new Boolean (' + show (x.valueOf ()) + ')' :
          x.toString ();

      case '[object Number]':
        return typeof x === 'object' ?
          'new Number (' + show (x.valueOf ()) + ')' :
          1 / x === -Infinity ? '-0' : x.toString (10);

      case '[object String]':
        return typeof x === 'object' ?
          'new String (' + show (x.valueOf ()) + ')' :
          JSON.stringify (x);

      case '[object Date]':
        return 'new Date (' +
               show (isNaN (x.valueOf ()) ? NaN : x.toISOString ()) +
               ')';

      case '[object Error]':
        return 'new ' + x.name + ' (' + show (x.message) + ')';

      case '[object Arguments]':
        return 'function () { return arguments; } (' +
               (Array.prototype.map.call (x, show)).join (', ') +
               ')';

      case '[object Array]':
        seen.push (x);
        try {
          return '[' + ((x.map (show)).concat (
            sortedKeys (x)
            .filter (function(k) { return !(/^\d+$/.test (k)); })
            .map (entry (x))
          )).join (', ') + ']';
        } finally {
          seen.pop ();
        }

      case '[object Object]':
        seen.push (x);
        try {
          return (
            $$show in x &&
            (x.constructor == null || x.constructor.prototype !== x) ?
              x[$$show] () :
              '{' + ((sortedKeys (x)).map (entry (x))).join (', ') + '}'
          );
        } finally {
          seen.pop ();
        }

      case '[object Set]':
        seen.push (x);
        try {
          return 'new Set (' + show (Array.from (x.values ())) + ')';
        } finally {
          seen.pop ();
        }

      case '[object Map]':
        seen.push (x);
        try {
          return 'new Map (' + show (Array.from (x.entries ())) + ')';
        } finally {
          seen.pop ();
        }

      default:
        return String (x);

    }
  }

  return show;

}));


/***/ }),

/***/ "./node_modules/sanctuary-type-identifiers/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sanctuary-type-identifiers/index.js ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
        @@@@@@@            @@@@@@@         @@
      @@       @@        @@       @@      @@@
    @@   @@@ @@  @@    @@   @@@ @@  @@   @@@@@@ @@   @@@  @@ @@@      @@@@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@   @@
   @@  @@   @@@   @@  @@  @@   @@@   @@   @@@   @@   @@@  @@@   @@  @@@@@@@@
   @@  @@   @@@  @@   @@  @@   @@@  @@    @@@   @@   @@@  @@@   @@  @@@
    @@   @@@ @@@@@     @@   @@@ @@@@@      @@@    @@@ @@  @@@@@@      @@@@@
      @@                 @@                           @@  @@
        @@@@@@@            @@@@@@@               @@@@@    @@
                                                          */
//. # sanctuary-type-identifiers
//.
//. A type is a set of values. Boolean, for example, is the type comprising
//. `true` and `false`. A value may be a member of multiple types (`42` is a
//. member of Number, PositiveNumber, Integer, and many other types).
//.
//. In certain situations it is useful to divide JavaScript values into
//. non-overlapping types. The language provides two constructs for this
//. purpose: the [`typeof`][1] operator and [`Object.prototype.toString`][2].
//. Each has pros and cons, but neither supports user-defined types.
//.
//. sanctuary-type-identifiers comprises:
//.
//.   - an npm and browser -compatible package for deriving the
//.     _type identifier_ of a JavaScript value; and
//.   - a specification which authors may follow to specify type
//.     identifiers for their types.
//.
//. ### Specification
//.
//. For a type to be compatible with the algorithm:
//.
//.   - every member of the type MUST have a `@@type` property
//.     (the _type identifier_); and
//.
//.   - the type identifier MUST be a string primitive and SHOULD have
//.     format `'<namespace>/<name>[@<version>]'`, where:
//.
//.       - `<namespace>` MUST consist of one or more characters, and
//.         SHOULD equal the name of the npm package which defines the
//.         type (including [scope][3] where appropriate);
//.
//.       - `<name>` MUST consist of one or more characters, and SHOULD
//.         be the unique name of the type; and
//.
//.       - `<version>` MUST consist of one or more digits, and SHOULD
//.         represent the version of the type.
//.
//. If the type identifier does not conform to the format specified above,
//. it is assumed that the entire string represents the _name_ of the type;
//. _namespace_ will be `null` and _version_ will be `0`.
//.
//. If the _version_ is not given, it is assumed to be `0`.

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if ( true && typeof module.exports === 'object') {
    module.exports = f ();
  } else if ( true && __webpack_require__.amdO != null) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    self.sanctuaryTypeIdentifiers = f ();
  }

} (function() {

  'use strict';

  //  $$type :: String
  var $$type = '@@type';

  //  pattern :: RegExp
  var pattern = new RegExp (
    '^'
  + '([\\s\\S]+)'   //  <namespace>
  + '/'             //  SOLIDUS (U+002F)
  + '([\\s\\S]+?)'  //  <name>
  + '(?:'           //  optional non-capturing group {
  +   '@'           //    COMMERCIAL AT (U+0040)
  +   '([0-9]+)'    //    <version>
  + ')?'            //  }
  + '$'
  );

  //. ### Usage
  //.
  //. ```javascript
  //. const type = require ('sanctuary-type-identifiers');
  //. ```
  //.
  //. ```javascript
  //. > const Identity$prototype = {
  //. .   '@@type': 'my-package/Identity@1',
  //. .   '@@show': function() {
  //. .     return 'Identity (' + show (this.value) + ')';
  //. .   }
  //. . }
  //.
  //. > const Identity = value =>
  //. .   Object.assign (Object.create (Identity$prototype), {value})
  //.
  //. > type (Identity (0))
  //. 'my-package/Identity@1'
  //.
  //. > type.parse (type (Identity (0)))
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  //.
  //. ### API
  //.
  //# type :: Any -> String
  //.
  //. Takes any value and returns a string which identifies its type. If the
  //. value conforms to the [specification][4], the custom type identifier is
  //. returned.
  //.
  //. ```javascript
  //. > type (null)
  //. 'Null'
  //.
  //. > type (true)
  //. 'Boolean'
  //.
  //. > type (Identity (0))
  //. 'my-package/Identity@1'
  //. ```
  function type(x) {
    return x != null &&
           x.constructor != null &&
           x.constructor.prototype !== x &&
           typeof x[$$type] === 'string' ?
      x[$$type] :
      (Object.prototype.toString.call (x)).slice ('[object '.length,
                                                  -']'.length);
  }

  //# type.parse :: String -> { namespace :: Nullable String, name :: String, version :: Number }
  //.
  //. Takes any string and parses it according to the [specification][4],
  //. returning an object with `namespace`, `name`, and `version` fields.
  //.
  //. ```javascript
  //. > type.parse ('my-package/List@2')
  //. {namespace: 'my-package', name: 'List', version: 2}
  //.
  //. > type.parse ('nonsense!')
  //. {namespace: null, name: 'nonsense!', version: 0}
  //.
  //. > type.parse (type (Identity (0)))
  //. {namespace: 'my-package', name: 'Identity', version: 1}
  //. ```
  type.parse = function parse(s) {
    var namespace = null;
    var name = s;
    var version = 0;
    var groups = pattern.exec (s);
    if (groups != null) {
      namespace = groups[1];
      name = groups[2];
      if (groups[3] != null) version = Number (groups[3]);
    }
    return {namespace: namespace, name: name, version: version};
  };

  return type;

}));

//. [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//. [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
//. [3]: https://docs.npmjs.com/misc/scope
//. [4]: #specification


/***/ }),

/***/ "./node_modules/vue/dist/vue.runtime.esm-bundler.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue/dist/vue.runtime.esm-bundler.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseTransition": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.BaseTransition),
/* harmony export */   "Comment": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Comment),
/* harmony export */   "Fragment": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   "KeepAlive": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.KeepAlive),
/* harmony export */   "Static": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Static),
/* harmony export */   "Suspense": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Suspense),
/* harmony export */   "Teleport": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Teleport),
/* harmony export */   "Text": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Text),
/* harmony export */   "Transition": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Transition),
/* harmony export */   "TransitionGroup": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup),
/* harmony export */   "callWithAsyncErrorHandling": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling),
/* harmony export */   "callWithErrorHandling": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.callWithErrorHandling),
/* harmony export */   "camelize": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.camelize),
/* harmony export */   "capitalize": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.capitalize),
/* harmony export */   "cloneVNode": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.cloneVNode),
/* harmony export */   "computed": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.computed),
/* harmony export */   "createApp": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createApp),
/* harmony export */   "createBlock": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createBlock),
/* harmony export */   "createCommentVNode": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode),
/* harmony export */   "createHydrationRenderer": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer),
/* harmony export */   "createRenderer": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createRenderer),
/* harmony export */   "createSSRApp": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createSSRApp),
/* harmony export */   "createSlots": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createSlots),
/* harmony export */   "createStaticVNode": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode),
/* harmony export */   "createTextVNode": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createTextVNode),
/* harmony export */   "createVNode": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createVNode),
/* harmony export */   "customRef": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.customRef),
/* harmony export */   "defineAsyncComponent": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent),
/* harmony export */   "defineComponent": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineComponent),
/* harmony export */   "defineEmit": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineEmit),
/* harmony export */   "defineProps": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineProps),
/* harmony export */   "devtools": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.devtools),
/* harmony export */   "getCurrentInstance": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance),
/* harmony export */   "getTransitionRawChildren": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren),
/* harmony export */   "h": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.h),
/* harmony export */   "handleError": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.handleError),
/* harmony export */   "hydrate": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.hydrate),
/* harmony export */   "initCustomFormatter": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.initCustomFormatter),
/* harmony export */   "inject": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.inject),
/* harmony export */   "isProxy": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isProxy),
/* harmony export */   "isReactive": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isReactive),
/* harmony export */   "isReadonly": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isReadonly),
/* harmony export */   "isRef": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isRef),
/* harmony export */   "isVNode": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isVNode),
/* harmony export */   "markRaw": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.markRaw),
/* harmony export */   "mergeProps": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.mergeProps),
/* harmony export */   "nextTick": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.nextTick),
/* harmony export */   "onActivated": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onActivated),
/* harmony export */   "onBeforeMount": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount),
/* harmony export */   "onBeforeUnmount": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount),
/* harmony export */   "onBeforeUpdate": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate),
/* harmony export */   "onDeactivated": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onDeactivated),
/* harmony export */   "onErrorCaptured": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured),
/* harmony export */   "onMounted": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onMounted),
/* harmony export */   "onRenderTracked": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked),
/* harmony export */   "onRenderTriggered": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered),
/* harmony export */   "onUnmounted": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onUnmounted),
/* harmony export */   "onUpdated": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onUpdated),
/* harmony export */   "openBlock": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.openBlock),
/* harmony export */   "popScopeId": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.popScopeId),
/* harmony export */   "provide": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.provide),
/* harmony export */   "proxyRefs": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.proxyRefs),
/* harmony export */   "pushScopeId": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.pushScopeId),
/* harmony export */   "queuePostFlushCb": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.queuePostFlushCb),
/* harmony export */   "reactive": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.reactive),
/* harmony export */   "readonly": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.readonly),
/* harmony export */   "ref": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ref),
/* harmony export */   "registerRuntimeCompiler": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.registerRuntimeCompiler),
/* harmony export */   "render": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "renderList": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.renderList),
/* harmony export */   "renderSlot": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.renderSlot),
/* harmony export */   "resolveComponent": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveComponent),
/* harmony export */   "resolveDirective": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveDirective),
/* harmony export */   "resolveDynamicComponent": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent),
/* harmony export */   "resolveTransitionHooks": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks),
/* harmony export */   "setBlockTracking": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking),
/* harmony export */   "setDevtoolsHook": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.setDevtoolsHook),
/* harmony export */   "setTransitionHooks": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks),
/* harmony export */   "shallowReactive": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.shallowReactive),
/* harmony export */   "shallowReadonly": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly),
/* harmony export */   "shallowRef": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.shallowRef),
/* harmony export */   "ssrContextKey": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ssrContextKey),
/* harmony export */   "ssrUtils": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ssrUtils),
/* harmony export */   "toDisplayString": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toDisplayString),
/* harmony export */   "toHandlerKey": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toHandlerKey),
/* harmony export */   "toHandlers": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toHandlers),
/* harmony export */   "toRaw": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toRaw),
/* harmony export */   "toRef": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toRef),
/* harmony export */   "toRefs": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toRefs),
/* harmony export */   "transformVNodeArgs": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.transformVNodeArgs),
/* harmony export */   "triggerRef": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.triggerRef),
/* harmony export */   "unref": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.unref),
/* harmony export */   "useContext": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useContext),
/* harmony export */   "useCssModule": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useCssModule),
/* harmony export */   "useCssVars": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useCssVars),
/* harmony export */   "useSSRContext": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useSSRContext),
/* harmony export */   "useTransitionState": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useTransitionState),
/* harmony export */   "vModelCheckbox": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox),
/* harmony export */   "vModelDynamic": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic),
/* harmony export */   "vModelRadio": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelRadio),
/* harmony export */   "vModelSelect": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelSelect),
/* harmony export */   "vModelText": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelText),
/* harmony export */   "vShow": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vShow),
/* harmony export */   "version": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "warn": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.warn),
/* harmony export */   "watch": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.watch),
/* harmony export */   "watchEffect": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.watchEffect),
/* harmony export */   "withCtx": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withCtx),
/* harmony export */   "withDirectives": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withDirectives),
/* harmony export */   "withKeys": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withKeys),
/* harmony export */   "withModifiers": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withModifiers),
/* harmony export */   "withScopeId": () => (/* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withScopeId),
/* harmony export */   "compile": () => (/* binding */ compile)
/* harmony export */ });
/* harmony import */ var _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/runtime-dom */ "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js");
/* harmony import */ var _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/runtime-dom */ "./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js");
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");




function initDev() {
    const target = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)();
    target.__VUE__ = true;
    (0,_vue_runtime_dom__WEBPACK_IMPORTED_MODULE_2__.setDevtoolsHook)(target.__VUE_DEVTOOLS_GLOBAL_HOOK__);
    {
        (0,_vue_runtime_dom__WEBPACK_IMPORTED_MODULE_2__.initCustomFormatter)();
    }
}

// This entry exports the runtime only, and is built as
( true) && initDev();
const compile = () => {
    if ((true)) {
        (0,_vue_runtime_dom__WEBPACK_IMPORTED_MODULE_2__.warn)(`Runtime compilation is not supported in this build of Vue.` +
            ( ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
                ) /* should not happen */);
    }
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./resources/js/feedback.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;