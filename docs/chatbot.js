document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "YOUR_OPENAI_API_KEY"; // Replace this with your actual key
  const API_URL = "https://api.openai.com/v1/chat/completions";

  let chatContainer = document.createElement("div");
  chatContainer.id = "chat-container";
  chatContainer.style.width = "100%";
  chatContainer.style.maxWidth = "400px";
  chatContainer.style.height = "500px";
  chatContainer.style.border = "1px solid #ccc";
  chatContainer.style.padding = "10px";
  chatContainer.style.overflowY = "scroll";
  chatContainer.style.background = "#f9f9f9";
  document.body.appendChild(chatContainer);

  let inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.marginTop = "10px";
  document.body.appendChild(inputContainer);

  let userInput = document.createElement("input");
  userInput.type = "text";
  userInput.placeholder = "Type a message...";
  userInput.style.flex = "1";
  userInput.style.padding = "8px";
  inputContainer.appendChild(userInput);

  let sendButton = document.createElement("button");
  sendButton.innerText = "Send";
  sendButton.style.padding = "8px";
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

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: userText }]
      })
    })
    .then(response => response.json())
    .then(data => {
      let botMessage = data.choices[0].message.content;
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
