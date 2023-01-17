/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkmeriton_website"] = self["webpackChunkmeriton_website"] || []).push([["commons"],{

/***/ "./src/js/pages/app.js":
/*!*****************************!*\
  !*** ./src/js/pages/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ app)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ \"./src/js/utils/fetch/index.js\");\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_fetch__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nfunction app() {\r\n    return new Promise( async ( resolve, reject ) => {\r\n        resolve();\r\n    } );\r\n};\n\n//# sourceURL=webpack://meriton-website/./src/js/pages/app.js?");

/***/ }),

/***/ "./src/js/utils/$/index.js":
/*!*********************************!*\
  !*** ./src/js/utils/$/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"$\": () => (/* binding */ $),\n/* harmony export */   \"$$\": () => (/* binding */ $$)\n/* harmony export */ });\n/**\r\n * @param {any} expr\r\n * @param {any} context?\r\n * @returns {HTMLElement} DOM Element matched by expr selector in context\r\n */\r\nconst $ = ( expr, context = document ) => typeof expr === 'string' ? ( context || document ).querySelector( expr ) : expr || null;\r\n\r\n/**\r\n * @param {string} expr\r\n * @param {any} context?\r\n * @returns {array} Array of DOM Elements from a DOM Nodelist selected by expr selector in context\r\n */\r\nconst $$ = ( expr, context = document ) => {\r\n    return [...typeof expr === 'string' ? ( context || document ).querySelectorAll( expr ) : expr || null];\r\n};\n\n//# sourceURL=webpack://meriton-website/./src/js/utils/$/index.js?");

/***/ }),

/***/ "./src/js/utils/fetch/index.js":
/*!*************************************!*\
  !*** ./src/js/utils/fetch/index.js ***!
  \*************************************/
/***/ (() => {

eval("/**\r\n* Copyright 2022 Select Interactive, LLC. All rights reserved.\r\n* @author: The Select Interactive dev team (www.select-interactive.com)\r\n*/\r\nconst STATUS_CODES = {\r\n    OK: 200\r\n};\r\n\r\n( () => {\r\n    const doFetch = self.fetch;\r\n\r\n    self.fetch = ( url, options ) => {\r\n        // @ts-ignore\r\n        if ( typeof url !== 'string' ) {\r\n            return doFetch( url, options );\r\n        }\r\n\r\n        return new Promise( async ( resolve, reject ) => {\r\n            try {\r\n                const rsp = await doFetch( url, options );\r\n\r\n                if ( rsp.status === STATUS_CODES.OK ) {\r\n                    const result = await parseJSON( rsp );\r\n\r\n                    if ( result.ok ) {\r\n                        return resolve( result.data );\r\n                    }\r\n                    else {\r\n                        return reject( result );\r\n                    }\r\n                }\r\n                else {\r\n                    return reject( {\r\n                        message: await rsp.text(),\r\n                        status: rsp.status\r\n                    } );\r\n                }\r\n            }\r\n            catch ( e ) {\r\n                return reject( e );\r\n            }\r\n        } );\r\n    };\r\n} )();\r\n\r\nfunction parseJSON( rsp ) {\r\n    return new Promise( async ( resolve, reject ) => {\r\n        try {\r\n            const result = await rsp.json();\r\n\r\n            resolve( {\r\n                status: result.status,\r\n                ok: rsp.ok,\r\n                data: result.data,\r\n                message: result.message || ''\r\n            } );\r\n        }\r\n        catch ( e ) {\r\n            reject( e );\r\n        }\r\n    } );\r\n}\n\n//# sourceURL=webpack://meriton-website/./src/js/utils/fetch/index.js?");

/***/ })

}]);