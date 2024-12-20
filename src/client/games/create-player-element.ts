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
    topCard,
    username,
}: Omit<Player, "hand"> & { hand?: Card[] }) => {
    const playerElement = playerTemplate.content.cloneNode(
        true,
    ) as HTMLDivElement;
    //console.log("in create player element with ", username);

    if (is_current) {
        playerElement.firstElementChild?.classList.add("current-player");
    }

    // Update num cards
    playerElement.querySelector("h4 span.card-count")!.textContent =
        ` ${num_cards} cards`;

    // Update username
    playerElement.querySelector("h4 span.username")!.textContent = username;
    // playerElement.querySelector("h4 span.card-count")!.textContent =
    //     `${num_cards} cards`;


    // Update hand
    const handElement = playerElement.querySelector<HTMLDivElement>(".hand")!;
    hand?.forEach((card) => {
        const cardElement = cardTemplate.content.cloneNode(true) as HTMLDivElement;

        const cardDiv = cardElement.querySelector<HTMLDivElement>("div.card")!;
        cardDiv.classList.add(`color-${card.color}`, "source-card");
        cardDiv.dataset.cardId = card.id.toString();

        cardElement.querySelector("span")!.textContent = getCardValue(card.value);

        handElement.appendChild(cardElement);
    });

    return playerElement;
}