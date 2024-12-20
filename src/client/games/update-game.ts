import { Card, GameState, Player } from "../types";
import { createPlayerElement } from "./create-player-element";
import { getCardValue } from "./get-card-value";

const playerArea = document.querySelector<HTMLDivElement>("#player-area")!;
const opponentArea = document.querySelector<HTMLDivElement>("#opponent-area")!;

const playPile = document.querySelector<HTMLDivElement>("#play-pile")!;

const cardTemplate =
    document.querySelector<HTMLTemplateElement>("#card-template")!;

export const updateGame = (game: GameState) => {

    playerArea.replaceChildren(createPlayerElement(game.player));
    playPile.replaceChildren(createPlayPile(game.player))

    opponentArea.replaceChildren(
        ...game.players.map((player) => {
            return createPlayerElement(player);
        }),
    );
};

const createPlayPile = ({
    topCard
}: Player) => {
    const topElement = cardTemplate.content.cloneNode(true) as HTMLDivElement;
    const cardDiv = topElement.querySelector<HTMLDivElement>("div.card")!;
    cardDiv.querySelector("span")!.textContent = getCardValue(topCard.value);
    cardDiv.classList.add(`color-${topCard.color}`, "source-card");

    return topElement;
}
