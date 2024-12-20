export const cardClickHandler = (event: MouseEvent) => {
    const card = event.target as HTMLElement;
    if (
        card.classList.contains("card") &&
        card.classList.contains("source-card")
    ) {
        const gameId = window.roomId;
        event.preventDefault();
        const classList = card.classList.value as string;
        const match = classList.match(/cardId-(\d+)/);
        const cardId = match?.[1] ? parseInt(match[1], 10) : null;
        console.log(cardId);
        fetch(`/games/${gameId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cardId: cardId })
        });
    } else if (
        card.classList.contains("card") &&
        card.classList.contains("destination-card")
    ) {
        event.preventDefault();
    }
};