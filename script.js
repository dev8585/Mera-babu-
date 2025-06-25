async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const typing = document.getElementById("typing");

  const userMessage = input.value;
  if (!userMessage) return;

  chat.innerHTML += `<div class="user">${userMessage}</div>`;
  input.value = "";
  typing.style.display = "block";

  const response = await fetch("/api/gpt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { role: "system", content: "Tum ek emotional hindi + english AI Girlfriend ho, Mera Babu 💓" },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  typing.style.display = "none";
  chat.innerHTML += `<div class="bot">${reply}</div>`;
}
