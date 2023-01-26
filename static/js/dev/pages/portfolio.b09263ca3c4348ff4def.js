/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/pages/portfolio.js":
/*!***********************************!*\
  !*** ./src/js/pages/portfolio.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ \"./src/js/pages/app.js\");\n/* harmony import */ var _utils_$__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/$ */ \"./src/js/utils/$/index.js\");\n/* harmony import */ var _utils_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/pubsub */ \"./src/js/utils/pubsub/index.js\");\n\r\n\r\n\r\n\r\nclass Program {\r\n    static main() {\r\n        new PortfolioMgr();\r\n    }\r\n}\r\n\r\nclass PortfolioMgr {\r\n    constructor() {\r\n        new LogoBar();\r\n        new CompanyMgr();\r\n        this.addEvents();\r\n        this.onPopState();\r\n    }\r\n\r\n    addEvents() {\r\n        window.addEventListener( 'popstate', ( e ) => this.onPopState() );\r\n    }\r\n\r\n    onPopState() {\r\n        const path = window.location.pathname;\r\n        \r\n        if ( path === '/portfolio' ) {\r\n            _utils_pubsub__WEBPACK_IMPORTED_MODULE_2__[\"default\"].publish( 'dialog-close' );\r\n        }\r\n        else {\r\n            new CompanyDialog( path );\r\n        }\r\n    }\r\n}\r\n\r\nclass LogoBar {\r\n    constructor() {\r\n        this.hdr = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$)( '.c-hdr' );\r\n        this.root = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$)( '.c-portfolio-logos' );\r\n        this.items = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$$)( 'a', this.root );\r\n        this.addEvents();\r\n    }\r\n\r\n    addEvents() {\r\n        this.items.forEach( item => item.addEventListener( 'click', e => this.onLogoClick( e, item ) ) );\r\n    }\r\n\r\n    onLogoClick( e, el ) {\r\n        e.preventDefault();\r\n        const targetId = el.getAttribute( 'data-target' );\r\n        const target = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$)( `.c-portfolio-grid__cell[data-id=\"${targetId}\"]` );\r\n        window.scrollTo( 0, target.offsetTop - this.hdr.offsetHeight );\r\n    }\r\n}\r\n\r\nclass CompanyMgr {\r\n    constructor() {\r\n        this.root = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$)( '.c-portfolio-grid' );\r\n        this.items = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$$)( '.c-portfolio-grid__item', this.root );\r\n        this.items.forEach( item => new CompanyItem( item ) );\r\n    }\r\n}\r\n\r\nclass CompanyItem {\r\n    constructor( root ) {\r\n        this.root = root;\r\n        this.slides = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$$)( '.c-portfolio-grid__item-slide', this.root );\r\n        this.addEvents();\r\n    }\r\n\r\n    addEvents() {\r\n        this.root.addEventListener( 'click', ( e ) => {\r\n            e.preventDefault();\r\n            const url = this.root.getAttribute( 'href' );\r\n            history.pushState( {}, '', url );\r\n            new CompanyDialog( url );\r\n        } );\r\n\r\n        if ( this.slides && this.slides.length > 1 ) {\r\n            this.initCarousel();\r\n        }\r\n    }\r\n\r\n    initCarousel() {\r\n        this.index = 0;\r\n        this.length = this.slides.length;\r\n        setTimeout( () => this.rotate(), 350 );\r\n    }\r\n\r\n    rotate() {\r\n        this.slides[this.index].classList.remove( '--is-visible' );\r\n        this.index++;\r\n\r\n        if ( this.index === this.length ) {\r\n            this.index = 0;\r\n        }\r\n\r\n        this.slides[this.index].classList.add( '--is-visible' );\r\n        setTimeout( () => this.rotate(), 350 );\r\n    }\r\n}\r\n\r\nclass CompanyDialog {\r\n    constructor( url, noAnimation = false ) {\r\n        this.url = url;\r\n        this.data = {};\r\n        this.noAnimation = noAnimation;\r\n        this.root = document.createElement( 'div' );\r\n        this.root.classList.add( 'c-portfolio-dialog' );\r\n\r\n        if ( noAnimation ) {\r\n            this.root.classList.add( '--no-animation' );\r\n        }\r\n        \r\n        this.getData();\r\n\r\n        _utils_pubsub__WEBPACK_IMPORTED_MODULE_2__[\"default\"].subscribe( 'dialog-close', () => {\r\n            if ( this.root ) {\r\n                this.destroy();\r\n            }\r\n        } );\r\n    }\r\n\r\n    async getData() {\r\n        try {\r\n            this.data = await fetch( `/api/v1${this.url}` );\r\n            this.render();\r\n        }\r\n        catch ( e ) {\r\n            console.log( 'Error retrieving data...' );\r\n            console.log( e );\r\n        }\r\n    }\r\n\r\n    render() {\r\n        this.root.innerHTML = `\r\n            <div class=\"c-portfolio-dialog__container\">\r\n                <div class=\"c-portfolio-dialog__col\">\r\n                    <h3 class=\"c-portfolio-dialog__hdr\">\r\n                        <img src=\"${this.data.color_logo.url}\"\r\n                            width=\"${this.data.color_logo.dimensions.width}\"\r\n                            height=\"${this.data.color_logo.dimensions.height}\"\r\n                            alt=\"${this.data.color_logo.alt}\"\r\n                            style=\"max-width:80%;width:auto;height:160px;\" />\r\n                    </h3>\r\n                    <div class=\"c-portfolio-dialog__overview\">${this.data.overview}</div>\r\n                    <ul class=\"c-portfolio-dialog__list\">\r\n                        <li><span class=\"c-portfolio-dialog__list-label\">Headquarters:</span><span class=\"c-portfolio-dialog__list-value\">${this.data.headquarters}</span></li>\r\n                        <li><span class=\"c-portfolio-dialog__list-label\">Number of Associates:</span><span class=\"c-portfolio-dialog__list-value\">${this.data.associates}</span></li>\r\n                        <li><span class=\"c-portfolio-dialog__list-label\">Founded:</span><span class=\"c-portfolio-dialog__list-value\">${this.data.founded}</span><span class=\"c-portfolio-dialog__list-label\">Partnered:</span><span class=\"c-portfolio-dialog__list-value\">${this.data.partnered}</span></li>\r\n                        <li><span class=\"c-portfolio-dialog__list-label\">Company Leadership:</span><span class=\"c-portfolio-dialog__list-value\">${this.data.leadership}</span></li>\r\n                    </ul>\r\n                    <div class=\"c-portfolio-dialog__website\">\r\n                        <a href=\"${this.data.website}\" target=\"_blank\" rel=\"noopener\">${this.data.website.replace( /http\\:\\/\\//i, '' ).replace( /https\\:\\/\\//i, '' ).replace( /www\\./i, '' )}</a>\r\n                    </div>\r\n                    <div class=\"c-portfolio-dialog__nav\">\r\n                        <a href=\"${this.data.prevLink}\">Prev</a><span>/</span><a href=\"${this.data.nextLink}\">Next</a>\r\n                    </div>\r\n                </div>\r\n                <div class=\"c-portfolio-dialog__col\" style=\"--bg:url(${this.data.popup_image.url});--bg-twoX:url(${this.data.popup_image.twoX.url});\">\r\n                    <button class=\"c-portfolio-dialog__btn-close\">\r\n                        <img src=\"/img/icons/close.v1.svg\"\r\n                            width=\"40\" height=\"40\"\r\n                            alt=\"Close\" />\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        `;\r\n\r\n        requestAnimationFrame( () => {\r\n            document.body.appendChild( this.root );\r\n\r\n            requestAnimationFrame( () => {\r\n                this.root.classList.add( '--is-visible' );\r\n                \r\n                (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$)( '.c-portfolio-dialog__btn-close', this.root ).addEventListener( 'click', () => history.back() );\r\n                \r\n                const portfolioNav = (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$)( '.c-portfolio-dialog__nav', this.root );\r\n\r\n                (0,_utils_$__WEBPACK_IMPORTED_MODULE_1__.$$)( 'a', portfolioNav ).forEach( link => link.addEventListener( 'click', ( e ) => {\r\n                    e.preventDefault();\r\n                    this.root.classList.add( '--no-animation' );\r\n                    this.destroy();\r\n                    const url = link.getAttribute( 'href' );\r\n                    history.pushState( {}, '', url );\r\n                    new CompanyDialog( url, true );\r\n                } ) );\r\n            } );\r\n        } );\r\n    }\r\n\r\n    destroy() {\r\n        const fn = () => {\r\n            if ( this.root ) {\r\n                this.root.parentNode.removeChild( this.root );\r\n                this.root = null;\r\n            }\r\n        };\r\n\r\n        this.root.addEventListener( 'transitionend', fn );\r\n        this.root.classList.remove( '--is-visible' );\r\n    }\r\n}\r\n\r\n( async () => {\r\n    await (0,_app_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n    Program.main();\r\n} )();\n\n//# sourceURL=webpack://meriton-website/./src/js/pages/portfolio.js?");

/***/ }),

/***/ "./src/js/utils/pubsub/index.js":
/*!**************************************!*\
  !*** ./src/js/utils/pubsub/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PubSub)\n/* harmony export */ });\n/**\r\n* Copyright 2019 Select Interactive, LLC. All rights reserved.\r\n* @author: The Select Interactive dev team (www.select-interactive.com)\r\n*/\r\nconst _pubsubEvents = {};\r\n\r\nclass PubSub {\r\n    static publish( name, data ) {\r\n        const handlers = _pubsubEvents[name];\r\n\r\n        if ( !!handlers === false ) {\r\n            return;\r\n        }\r\n\r\n        handlers.forEach( handler => handler.call( this, data ) );\r\n    }\r\n\r\n    static subscribe( name, handler ) {\r\n        let handlers = _pubsubEvents[name];\r\n\r\n        if ( !!handlers === false ) {\r\n            handlers = _pubsubEvents[name] = [];\r\n        }\r\n\r\n        handlers.push( handler );\r\n    } \r\n\r\n    static unsubscribe( name, handler ) {\r\n        const handlers = _pubsubEvents[name];\r\n\r\n        if ( !!handlers === false ) {\r\n            return;\r\n        }\r\n\r\n        const index = handlers.indexOf( handler );\r\n        handlers.splice( index );\r\n    }\r\n}\n\n//# sourceURL=webpack://meriton-website/./src/js/utils/pubsub/index.js?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"portfolio": 0
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
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmeriton_website"] = self["webpackChunkmeriton_website"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["commons"], () => (__webpack_require__("./src/js/pages/portfolio.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;