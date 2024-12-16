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

/***/ "./src/client/games.ts":
/*!*****************************!*\
  !*** ./src/client/games.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst card_click_handler_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './games/card-click-handler'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst update_game_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './games/update-game'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nconst gameId = window.location.pathname.split(\"/\").pop();\nwindow.socket.on(`game:${gameId}:updated`, (game) => {\n    (0, update_game_1.updateGame)(game);\n});\nsetTimeout(() => {\n    fetch(`/games/${gameId}/update`);\n}, 1000);\ndocument.querySelector(\"#draw-pile\")\n    .addEventListener(\"click\", (event) => {\n    const gameId = event.target.dataset.gameId;\n    if (gameId === undefined) {\n        console.log(\"gameid undefined\");\n        return;\n    }\n    console.log('Card drawn for', gameId);\n    fetch(`/games/${gameId}/draw`, { method: \"POST\" });\n});\n//\ndocument\n    .querySelector(\"#playing-table\")\n    .addEventListener(\"click\", card_click_handler_1.cardClickHandler);\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/games.ts?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/games.ts");
/******/ 	
/******/ })()
;