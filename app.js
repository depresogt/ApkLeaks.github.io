const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

// Replace this with your actual API key (or better, use a secure method)
const OPENAI_API_KEY = "YOUR_API_KEY";

async function getChatGPTResponse(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  addMessage(userMessage, "user");
  input.value = "";
  const reply = await getChatGPTResponse(userMessage);
  addMessage(reply, "assistant");
});

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
