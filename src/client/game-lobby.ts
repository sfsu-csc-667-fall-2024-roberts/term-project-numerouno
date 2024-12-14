const Players = document.querySelector<HTMLTableSectionElement>("#player-list")!;

const playerTemplate =
    document.querySelector<HTMLTemplateElement>("#player-row-template")!;

window.socket.on("game-starting", () => {

    window.location.href = `/games/${window.roomId}`;
    console.log("Starting game!");
});

window.socket.on("player-joined", ({ username, email, gravatar }) => {
    console.log("Player joined!", { username, email, gravatar });
    const player = playerTemplate.content.cloneNode(true) as HTMLTableRowElement;

    player.querySelector("td:nth-child(1)")!.textContent = `${username}`;
    Players.appendChild(player);


});