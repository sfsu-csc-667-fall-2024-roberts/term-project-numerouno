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

/***/ "./src/client/main-lobby.ts":
/*!**********************************!*\
  !*** ./src/client/main-lobby.ts ***!
  \**********************************/
/***/ (() => {

eval("\nconst list = document.querySelector(\"#available-games-list\");\nconst rowTemplate = document.querySelector(\"#game-row-template\");\nwindow.socket.on(\"game-created\", (game) => {\n    console.log(\"Game created\", game);\n    const row = rowTemplate.content.cloneNode(true);\n    row.querySelector(\"tr\").id = `game-row-${game.id}`;\n    row.querySelector(\"td:nth-child(1)\").textContent = `Game ${game.id}`;\n    row.querySelector(\"td:nth-child(2)\").textContent =\n        `${game.players} / ${game.player_count}`;\n    row.querySelector(\"td:nth-child(3) form\").action =\n        `/game/${game.id}`;\n    list.appendChild(row);\n});\nwindow.socket.on(\"game-updated\", (game) => {\n    const row = list.querySelector(`#game-row-${game.id}`);\n    if (row) {\n        if (parseInt(game.players) === game.player_count) {\n            row.remove();\n        }\n        else {\n            row.querySelector(\"td:nth-child(2)\").textContent =\n                `${game.players} / ${game.player_count}`;\n        }\n    }\n});\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/main-lobby.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/main-lobby.ts"]();
/******/ 	
/******/ })()
;