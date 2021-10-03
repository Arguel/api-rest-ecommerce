document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const fragment: DocumentFragment = document.createDocumentFragment();

  // Selectors
  const formMessages = document.getElementById("formMessages") as HTMLElement;
  const messagesContainer = document.getElementById(
    "messagesContainer",
  ) as HTMLElement;
  const templateMessage = (
    document.getElementById("templateMessage") as HTMLTemplateElement
  ).content;

  socket.on("messages", (messages) => {
    messagesContainer.innerHTML = "";

    messages.forEach((message: object) => {
      templateMessage.querySelector(
        ".text-primary",
      )!.textContent = `${message.userEmail} `;
      templateMessage.querySelector(
        ".text-danger",
      )!.textContent = `[${message.messageDate}] `;
      templateMessage.querySelector(
        ".text-success",
      )!.textContent = `: ${message.userMessage}`;
      formMessages;

      const clone = templateMessage.cloneNode(true);
      fragment.appendChild(clone);
    });

    messagesContainer.appendChild(fragment);
  });

  formMessages.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const userMessage = document.getElementById(
      "userMessage",
    ) as HTMLInputElement;
    const newMessage = {
      userEmail,
      messageDate: new Date().toLocaleString(),
      userMessage: userMessage.value,
    };
    userMessage.value = "";
    socket.emit("newMessage", newMessage);
  });
});
