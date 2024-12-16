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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst update_game_1 = __webpack_require__(/*! ./games/update-game */ \"./src/client/games/update-game.ts\");\nconst gameId = window.location.pathname.split(\"/\").pop();\nwindow.socket.on(`game:${gameId}:updated`, (game) => {\n    (0, update_game_1.updateGame)(game);\n});\nsetTimeout(() => {\n    fetch(`/games/${gameId}/update`);\n}, 1000);\ndocument.querySelector(\"#draw-pile\")\n    .addEventListener(\"click\", (event) => {\n    const gameId = event.target.dataset.gameId;\n    if (gameId === undefined) {\n        console.log(\"gameid undefined\");\n        return;\n    }\n    console.log('Card drawn for', gameId);\n    fetch(`/games/${gameId}/draw`, { method: \"POST\" });\n});\n//\n// document\n//     .querySelector<HTMLDivElement>(\"#playing-table\")!\n//     .addEventListener(\"click\", cardClickHandler);\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/games.ts?");

/***/ }),

/***/ "./src/client/games/create-player-element.ts":
/*!***************************************************!*\
  !*** ./src/client/games/create-player-element.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createPlayerElement = void 0;\nconst get_card_value_1 = __webpack_require__(/*! ./get-card-value */ \"./src/client/games/get-card-value.ts\");\nconst playerTemplate = document.querySelector(\"#player-template\");\nconst cardTemplate = document.querySelector(\"#card-template\");\nconst createPlayerElement = ({ gravatar, hand, is_current, num_cards, top_card, username, }) => {\n    var _a;\n    const playerElement = playerTemplate.content.cloneNode(true);\n    if (is_current) {\n        (_a = playerElement.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.add(\"current-player\");\n    }\n    // Update gravatar\n    const gravatarElement = playerElement.querySelector(\"h4 img\");\n    gravatarElement.src = `https://www.gravatar.com/avatar/${gravatar}`;\n    gravatarElement.alt = username;\n    // Update username\n    playerElement.querySelector(\"h4 span.username\").textContent = username;\n    playerElement.querySelector(\"h4 span.card-count\").textContent =\n        `${num_cards} cards`;\n    // Update hand\n    const handElement = playerElement.querySelector(\".hand\");\n    hand === null || hand === void 0 ? void 0 : hand.forEach((card) => {\n        const cardElement = cardTemplate.content.cloneNode(true);\n        const cardDiv = cardElement.querySelector(\"div.card\");\n        cardDiv.classList.add(`value-${card.value}`, \"source-card\");\n        cardDiv.dataset.cardId = card.id.toString();\n        cardElement.querySelector(\"span\").textContent = (0, get_card_value_1.getCardValue)(card.value);\n        handElement.appendChild(cardElement);\n    });\n    // Update top card\n    // ADJUST THESE FOR ACTUAL STUFF\n    const topCard = cardTemplate.content.cloneNode(true);\n    topCard.querySelector(\"span\").textContent = (0, get_card_value_1.getCardValue)(top_card.value);\n    // update top card color \n    // topCard.querySelector(\"class\")!.textContent = getCardValue(top_card.color);\n    return playerElement;\n};\nexports.createPlayerElement = createPlayerElement;\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/games/create-player-element.ts?");

/***/ }),

/***/ "./src/client/games/get-card-value.ts":
/*!********************************************!*\
  !*** ./src/client/games/get-card-value.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getCardValue = void 0;\nconst getCardValue = (value) => {\n    // add rest of card values\n    switch (value) {\n        case 0:\n            return \"Skip-Bo\";\n        case 10:\n            return \"reverse\";\n        default:\n            return value.toString();\n    }\n};\nexports.getCardValue = getCardValue;\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/games/get-card-value.ts?");

/***/ }),

/***/ "./src/client/games/update-game.ts":
/*!*****************************************!*\
  !*** ./src/client/games/update-game.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updateGame = void 0;\nconst create_player_element_1 = __webpack_require__(/*! ./create-player-element */ \"./src/client/games/create-player-element.ts\");\nconst playerArea = document.querySelector(\"#player-area\");\nconst opponentArea = document.querySelector(\"#opponent-area\");\nconst updateGame = (game) => {\n    console.log(game);\n    playerArea.replaceChildren((0, create_player_element_1.createPlayerElement)(game.player));\n    opponentArea.replaceChildren(...game.players.map((player) => {\n        return (0, create_player_element_1.createPlayerElement)(player);\n    }));\n};\nexports.updateGame = updateGame;\n\n\n//# sourceURL=webpack://team-alpha-uno/./src/client/games/update-game.ts?");

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