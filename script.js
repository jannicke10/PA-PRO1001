const chatForm = document.getElementById("chat-form");
const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-message");
const chatSendButton = document.getElementById("chat-send");
const chatStatus = document.getElementById("chat-status");
const apiForm = document.getElementById("chat-api-form");
const apiKeyInput = document.getElementById("api-key");
const apiKeySubmitButton = document.getElementById("api-key-submit");
const apiStatus = document.getElementById("chat-api-status");
const chatSpacer = document.querySelector(".chat-spacer");
const chatStorageKey = "fram-chat-state";
let activeApiKey = "";
let apiStatusTimeoutId;

if (
  chatForm &&
  chatWindow &&
  chatInput &&
  chatSendButton &&
  chatStatus &&
  apiForm &&
  apiKeyInput &&
  apiKeySubmitButton &&
  apiStatus &&
  chatSpacer
) {
  restoreChatState();

  apiKeyInput.addEventListener("input", () => {
    saveChatState();
  });

  chatInput.addEventListener("input", () => {
    saveChatState();
  });

  apiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const key = apiKeyInput.value.trim();

    if (!key) {
      showApiStatus("Please enter your OpenAI API key.", "error");
      activeApiKey = "";
      return;
    }

    activeApiKey = key;
    apiKeyInput.value = "";
    showApiStatus("OpenAI key added. Fram is ready to chat.", "success", false, true);
    showStatus("", "default", true);
    saveChatState();
    chatInput.focus();
  });

  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = chatInput.value.trim();

    if (!activeApiKey) {
      showStatus("Please enter your OpenAI API key.", "error");
      showApiStatus("Add your API key above before starting the chat.", "error");
      return;
    }

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
      const reply = await getOpenAIReply(activeApiKey, message);
      typingRow.remove();
      addMessage("bot", reply);
      saveChatState();
    } catch (error) {
      typingRow.remove();
      handleChatError(error);
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
  saveChatState();
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
  apiKeyInput.disabled = isLoading;
  apiKeySubmitButton.disabled = isLoading;
}

function showStatus(message, type, hide = false) {
  if (hide) {
    chatStatus.hidden = true;
    chatStatus.textContent = "";
    chatStatus.className = "chat-status";
    scrollChatToBottom();
    return;
  }

  chatStatus.hidden = false;
  chatStatus.textContent = message;
  chatStatus.className = `chat-status chat-status--${type}`;
  scrollChatToBottom();
  saveChatState();
}

function showApiStatus(message, type, hide = false, autoHide = false) {
  clearApiStatusTimer();

  if (hide) {
    apiStatus.hidden = true;
    apiStatus.textContent = "";
    apiStatus.className = "chat-api-box__status";
    scrollChatToBottom();
    saveChatState();
    return;
  }

  apiStatus.hidden = false;
  apiStatus.textContent = message;
  apiStatus.className = `chat-api-box__status chat-api-box__status--${type}`;
  scrollChatToBottom();
  saveChatState();

  if (autoHide) {
    apiStatusTimeoutId = window.setTimeout(() => {
      showApiStatus("", "success", true);
    }, 3200);
  }
}

async function getOpenAIReply(apiKey, message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Fram's helpful webshop assistant. Only answer questions about local farms, produce, sustainability, deliveries, reusable packaging, and ordering. Keep answers short, clear, and friendly. If the question is outside Fram's service, politely say you can only help with Fram-related topics."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data.choices?.[0]?.message?.content ?? "No response received.";
}

function scrollChatToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;

  window.requestAnimationFrame(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;

    window.requestAnimationFrame(() => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });
  });
}

function handleChatError(error) {
  if (error.status === 401) {
    clearApiStatusTimer();
    activeApiKey = "";
    showApiStatus("This API key is invalid. Please paste a valid key and click Use key again.", "error");
    showStatus("Your API key was rejected. Please check it and try again.", "error");
    saveChatState();
    apiKeyInput.focus();
    return;
  }

  if (error.status === 429) {
    showStatus("Too many requests or no quota is available right now. Please try again later.", "error");
    return;
  }

  if (error.status === 500 || error.status === 502 || error.status === 503) {
    showStatus("OpenAI is temporarily unavailable. Please try again later.", "error");
    return;
  }

  showStatus("Failed to connect. Wait and try again later.", "error");
}

function clearApiStatusTimer() {
  if (apiStatusTimeoutId) {
    window.clearTimeout(apiStatusTimeoutId);
    apiStatusTimeoutId = undefined;
  }
}

function saveChatState() {
  const state = {
    activeApiKey,
    apiKeyValue: apiKeyInput.value,
    draftMessage: chatInput.value,
    apiStatus: {
      hidden: apiStatus.hidden,
      text: apiStatus.textContent,
      className: apiStatus.className
    },
    chatStatus: {
      hidden: chatStatus.hidden,
      text: chatStatus.textContent,
      className: chatStatus.className
    },
    messages: getStoredMessages()
  };

  window.sessionStorage.setItem(chatStorageKey, JSON.stringify(state));
}

function restoreChatState() {
  const savedState = window.sessionStorage.getItem(chatStorageKey);

  if (!savedState) {
    saveChatState();
    return;
  }

  try {
    const state = JSON.parse(savedState);

    activeApiKey = state.activeApiKey ?? "";
    apiKeyInput.value = state.apiKeyValue ?? "";
    chatInput.value = state.draftMessage ?? "";

    restoreStatus(apiStatus, state.apiStatus, "chat-api-box__status");
    restoreStatus(chatStatus, state.chatStatus, "chat-status");
    restoreMessages(state.messages);
  } catch (error) {
    window.sessionStorage.removeItem(chatStorageKey);
  }
}

function restoreStatus(element, savedStatus, fallbackClassName) {
  if (!savedStatus) {
    element.hidden = true;
    element.textContent = "";
    element.className = fallbackClassName;
    return;
  }

  element.hidden = savedStatus.hidden;
  element.textContent = savedStatus.text;
  element.className = savedStatus.className || fallbackClassName;
}

function restoreMessages(savedMessages) {
  if (!Array.isArray(savedMessages) || savedMessages.length === 0) {
    return;
  }

  const messageRows = chatWindow.querySelectorAll(".chat-row");
  messageRows.forEach((row) => row.remove());

  savedMessages.forEach((message) => {
    addMessage(message.role, message.text);
  });
}

function getStoredMessages() {
  const rows = [...chatWindow.querySelectorAll(".chat-row")];

  return rows
    .filter((row) => !row.querySelector(".chat-bubble--typing"))
    .map((row) => {
      const bubble = row.querySelector(".chat-bubble");
    const role = row.classList.contains("chat-row--user") ? "user" : "bot";

      return {
        role,
        text: bubble ? bubble.textContent : ""
      };
    });
}
