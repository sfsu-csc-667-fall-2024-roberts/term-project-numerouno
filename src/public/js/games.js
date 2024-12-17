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
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst gameId = window.location.pathname.split(\"/\").pop();\n// window.socket.on(`game:${gameId}:updated`, (game) => {\n//     updateGame(game);\n// });\n// setTimeout(() => {\n//     fetch(`/games/${gameId}/update`);\n// }, 1000);\ndocument.querySelector(\"#draw-pile\")\n    .addEventListener(\"click\", (event) => {\n    const gameId = event.target.dataset.gameId;\n    if (gameId === undefined) {\n        console.log(\"gameid undefined\");\n        return;\n    }\n    console.log('Card drawn for', gameId);\n    fetch(`/games/${gameId}/draw`, { method: \"POST\" });\n});\n//\n// document\n//     .querySelector<HTMLDivElement>(\"#playing-table\")!\n//     .addEventListener(\"click\", cardClickHandler);\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/games.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/games.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;