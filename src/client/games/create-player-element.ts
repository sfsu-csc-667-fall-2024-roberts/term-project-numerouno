import { Card, Player } from "../types";
import { getCardValue } from "./get-card-value";


const playerTemplate =
    document.querySelector<HTMLTemplateElement>("#player-template")!;
const cardTemplate =
    document.querySelector<HTMLTemplateElement>("#card-template")!;

export const createPlayerElement = ({
    gravatar,
    hand,
    is_current,
    num_cards,
    top_card,
    username,
}: Omit<Player, "hand"> & { hand?: Card[] }) => {
    const playerElement = playerTemplate.content.cloneNode(
        true,
    ) as HTMLDivElement;

    if (is_current) {
        playerElement.firstElementChild?.classList.add("current-player");
    }

    // Update gravatar
    const gravatarElement =
        playerElement.querySelector<HTMLImageElement>("h4 img")!;
    gravatarElement.src = `https://www.gravatar.com/avatar/${gravatar}`;
    gravatarElement.alt = username;

    // Update username
    playerElement.querySelector("h4 span.username")!.textContent = username;
    playerElement.querySelector("h4 span.card-count")!.textContent =
        `${num_cards} cards`;


    // Update hand
    const handElement = playerElement.querySelector<HTMLDivElement>(".hand")!;
    hand?.forEach((card) => {
        const cardElement = cardTemplate.content.cloneNode(true) as HTMLDivElement;

        const cardDiv = cardElement.querySelector<HTMLDivElement>("div.card")!;
        cardDiv.classList.add(`value-${card.value}`, "source-card");
        cardDiv.dataset.cardId = card.id.toString();

        cardElement.querySelector("span")!.textContent = getCardValue(card.value);

        handElement.appendChild(cardElement);
    });


    // Update top card
    // ADJUST THESE FOR ACTUAL STUFF
    const topCard = cardTemplate.content.cloneNode(true) as HTMLDivElement;

    topCard.querySelector("span")!.textContent = getCardValue(top_card.value);

    // update top card color 
    // topCard.querySelector("class")!.textContent = getCardValue(top_card.color);

    return playerElement;
}