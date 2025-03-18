document.addEventListener("DOMContentLoaded", function () {
    const BACKEND_URL = "https://your-backend.com/chat"; // Replace with your actual backend URL

    let chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.style.width = "100%";
    chatContainer.style.maxWidth = "600px";
    chatContainer.style.height = "400px";
    chatContainer.style.border = "1px solid #ccc";
    chatContainer.style.padding = "10px";
    chatContainer.style.overflowY = "scroll";
    chatContainer.style.background = "#fff";
    chatContainer.style.margin = "auto";
    chatContainer.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.1)";
    document.body.appendChild(chatContainer);

    let inputContainer = document.createElement("div");
    inputContainer.style.display = "flex";
    inputContainer.style.marginTop = "10px";
    inputContainer.style.maxWidth = "600px";
    inputContainer.style.margin = "auto";
    document.body.appendChild(inputContainer);

    let userInput = document.createElement("input");
    userInput.type = "text";
    userInput.placeholder = "Type a message...";
    userInput.style.flex = "1";
    userInput.style.padding = "8px";
    userInput.style.border = "1px solid #ccc";
    inputContainer.appendChild(userInput);

    let sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    sendButton.style.padding = "8px";
    sendButton.style.cursor = "pointer";
    sendButton.style.border = "1px solid #ccc";
    sendButton.style.marginLeft = "5px";
    inputContainer.appendChild(sendButton);

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });

    function sendMessage() {
        let userText = userInput.value;
        if (!userText) return;

        addMessage(userText, "user");
        userInput.value = "";

        fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userText })
        })
        .then(response => response.json())
        .then(data => {
            let botMessage = data.reply;
            addMessage(botMessage, "bot");
        })
        .catch(error => {
            console.error("Error:", error);
            addMessage("Error reaching AI service.", "bot");
        });
    }

    function addMessage(text, sender) {
        let messageDiv = document.createElement("div");
        messageDiv.innerText = text;
        messageDiv.style.padding = "8px";
        messageDiv.style.margin = "5px 0";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.background = sender === "user" ? "#d1e7fd" : "#e2e2e2";
        messageDiv.style.textAlign = sender === "user" ? "right" : "left";
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
