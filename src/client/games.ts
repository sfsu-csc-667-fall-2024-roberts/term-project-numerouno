import { cardClickHandler } from "./games/card-click-handler";
import { updateGame } from "./games/update-game";


const gameId = window.location.pathname.split("/").pop();

window.socket.on(`game:${gameId}:updated`, (game) => {
    window.roomId = gameId as any;
    updateGame(game);
});

setTimeout(() => {
    fetch(`/games/${gameId}/update`);
}, 1000);

document.querySelector<HTMLFormElement>("#draw-pile")!
    .addEventListener("click", (event) => {
        const gameId = (event.target as HTMLDivElement).dataset.gameId;
        if (gameId === undefined) {
            console.log("gameid undefined");
            return;
        }
        console.log('Card drawn for', gameId);
        fetch(`/games/${gameId}/draw`, { method: "POST" });
    }
    );



document
    .querySelector<HTMLFormElement>("#player-area")!
    .addEventListener("click", cardClickHandler);