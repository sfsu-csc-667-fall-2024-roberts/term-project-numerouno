const form = document.querySelector<HTMLFormElement>("#chat-section form")!;
const input = document.querySelector<HTMLInputElement>("input#chat-message")!;
const messageArea =
    document.querySelector<HTMLUListElement>("#chat-section ul")!;
const messageTemplate = document.querySelector(
    "#chat-message-template",
)! as HTMLTemplateElement;

input.addEventListener('keydown', keyDownEvent => {
    if (keyDownEvent.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = input.value;
    input.value = '';

    if (message === '') {
        return; // Prevent further execution if empty
    }

    fetch(`/chat/${window.roomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
    }).then((response) => {
        if (response.status !== 200) {
            console.error("Error:", response);
        }
    });

});

// IIFE
(() => {
    window.socket.on(
        `message:${window.roomId}`,
        ({
            message,
            sender,
            gravatar,
        }: {
            message: string;
            sender: string;
            timestamp: string;
            gravatar: string;
        }) => {
            const messageElement = messageTemplate.content.cloneNode(
                true,
            ) as HTMLElement;

            // change to username
            messageElement.querySelector("img")!.src =
                `https://www.gravitar.com/avatar/${gravatar}`;
            messageElement.querySelector("img")!.alt = sender;
            messageElement.querySelector("span")!.textContent = message;


            messageArea.appendChild(messageElement);
            messageArea.scrollTo(0, messageArea.scrollHeight);
        },
    );
})();
