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

/***/ "./src/client/game-lobby.ts":
/*!**********************************!*\
  !*** ./src/client/game-lobby.ts ***!
  \**********************************/
/***/ (() => {

eval("\nconst Players = document.querySelector(\"#player-list\");\nconst playerTemplate = document.querySelector(\"#player-row-template\");\nwindow.socket.on(\"game-starting\", () => {\n    window.location.href = `/games/${window.roomId}`;\n    console.log(\"Starting game!\");\n});\nwindow.socket.on(\"player-joined\", ({ username, email, gravatar }) => {\n    console.log(\"Player joined!\", { username, email, gravatar });\n    const player = playerTemplate.content.cloneNode(true);\n    player.querySelector(\"td:nth-child(1)\").textContent = `${username}`;\n    Players.appendChild(player);\n});\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/game-lobby.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/game-lobby.ts"]();
/******/ 	
/******/ })()
;