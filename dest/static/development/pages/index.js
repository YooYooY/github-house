((window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/index.js"],{

/***/ "./node_modules/_react@16.8.3@react/index.js":
/*!*********************************************************************************************************!*\
  !*** delegated ./node_modules/_react@16.8.3@react/index.js from dll-reference dll_633ce60f0ba0b0c152c0 ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_633ce60f0ba0b0c152c0 */ "dll-reference dll_633ce60f0ba0b0c152c0"))("./node_modules/_react@16.8.3@react/index.js");

/***/ }),

/***/ "./node_modules/next-server/config.js":
/*!********************************************!*\
  !*** ./node_modules/next-server/config.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/lib/runtime-config */ "./node_modules/next-server/dist/lib/runtime-config.js")


/***/ }),

/***/ "./node_modules/next-server/dist/lib/runtime-config.js":
/*!*************************************************************!*\
  !*** ./node_modules/next-server/dist/lib/runtime-config.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var runtimeConfig;

exports.default = function () {
  return runtimeConfig;
};

function setConfig(configValue) {
  runtimeConfig = configValue;
}

exports.setConfig = setConfig;

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2FUsers%2Fweilongchen%2FDocuments%2Freact-practice%2Fnext_github%2Fdemo_next%2Fpages%2Findex.jsx!./":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2FUsers%2Fweilongchen%2FDocuments%2Freact-practice%2Fnext_github%2Fdemo_next%2Fpages%2Findex.jsx ***!
  \**************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/", function() {
      var page = __webpack_require__(/*! ./pages/index.jsx */ "./pages/index.jsx")
      if(true) {
        module.hot.accept(/*! ./pages/index.jsx */ "./pages/index.jsx", function() {
          if(!next.router.components["/"]) return
          var updatedPage = __webpack_require__(/*! ./pages/index.jsx */ "./pages/index.jsx")
          next.router.update("/", updatedPage.default || updatedPage)
        })
      }
      return { page: page.default || page }
    }]);
  

/***/ }),

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/_react@16.8.3@react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_server_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-server/config */ "./node_modules/next-server/config.js");
/* harmony import */ var next_server_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_server_config__WEBPACK_IMPORTED_MODULE_1__);



var _getConfig = next_server_config__WEBPACK_IMPORTED_MODULE_1___default()(),
    publicRuntimeConfig = _getConfig.publicRuntimeConfig;

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: publicRuntimeConfig.OAUTH_URL
  }, "login"));
});

/***/ }),

/***/ 5:
/*!******************************************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F&absolutePagePath=%2FUsers%2Fweilongchen%2FDocuments%2Freact-practice%2Fnext_github%2Fdemo_next%2Fpages%2Findex.jsx ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F&absolutePagePath=%2FUsers%2Fweilongchen%2FDocuments%2Freact-practice%2Fnext_github%2Fdemo_next%2Fpages%2Findex.jsx! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2FUsers%2Fweilongchen%2FDocuments%2Freact-practice%2Fnext_github%2Fdemo_next%2Fpages%2Findex.jsx!./");


/***/ }),

/***/ "dll-reference dll_633ce60f0ba0b0c152c0":
/*!*******************************************!*\
  !*** external "dll_633ce60f0ba0b0c152c0" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_633ce60f0ba0b0c152c0;

/***/ })

},[[5,"static/runtime/webpack.js"]]]));;
//# sourceMappingURL=index.js.map