const chatReplies = [
  "We partner with farms that share our focus on seasonal produce, careful growing methods, and shorter transport distances.",
  "Fram works closely with local farms so we can offer fresher produce and support more sustainable food choices in Norway.",
  "We build partnerships over time and choose farms that can deliver high-quality produce while using reusable packaging where possible."
];

const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-message");
const chatSendButton = document.getElementById("chat-send");
const chatStatus = document.getElementById("chat-status");

if (chatForm && chatWindow && chatInput && chatSendButton && chatStatus) {
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
      showStatus("Please write a message before sending.", "error");
      return;
    }

    showStatus("", "default", true);
    addMessage("user", message);
    chatInput.value = "";
    setLoadingState(true);

    const typingRow = addTypingMessage();

    try {
      const reply = await getLocalReply();
      typingRow.remove();
      addMessage("bot", reply);
    } catch (error) {
      typingRow.remove();
      showStatus("Failed to connect. Wait and try again later.", "error");
    } finally {
      setLoadingState(false);
      chatInput.focus();
    }
  });
}

function addMessage(role, text) {
  const row = document.createElement("div");
  row.className = role === "bot" ? "chat-row chat-row--bot" : "chat-row chat-row--user";

  if (role === "bot") {
    const speaker = document.createElement("span");
    speaker.className = "chat-speaker";
    speaker.textContent = "FRAM";
    row.append(speaker);
  }

  const bubble = document.createElement("p");
  bubble.className =
    role === "bot" ? "chat-bubble chat-bubble--bot" : "chat-bubble chat-bubble--user";
  bubble.textContent = text;
  row.append(bubble);

  chatWindow.append(row);
  scrollChatToBottom();
  return row;
}

function addTypingMessage() {
  const row = document.createElement("div");
  row.className = "chat-row chat-row--bot";

  const speaker = document.createElement("span");
  speaker.className = "chat-speaker";
  speaker.textContent = "FRAM";

  const bubble = document.createElement("p");
  bubble.className = "chat-bubble chat-bubble--bot chat-bubble--typing";
  bubble.setAttribute("aria-label", "Fram is typing");
  bubble.innerHTML = "<span></span><span></span><span></span>";

  row.append(speaker, bubble);
  chatWindow.append(row);
  scrollChatToBottom();
  return row;
}

function setLoadingState(isLoading) {
  chatSendButton.disabled = isLoading;
  chatInput.disabled = isLoading;
}

function showStatus(message, type, hide = false) {
  if (hide) {
    chatStatus.hidden = true;
    chatStatus.textContent = "";
    chatStatus.className = "chat-status";
    return;
  }

  chatStatus.hidden = false;
  chatStatus.textContent = message;
  chatStatus.className = `chat-status chat-status--${type}`;
}

function getLocalReply() {
  return new Promise((resolve) => {
    const randomReply = chatReplies[Math.floor(Math.random() * chatReplies.length)];

    window.setTimeout(() => {
      resolve(randomReply);
    }, 1200);
  });
}

function scrollChatToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
