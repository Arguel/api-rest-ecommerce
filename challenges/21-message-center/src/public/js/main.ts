// import {IMessage} from "../../utils/socketIoInterfaces";

document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const fragment: DocumentFragment = document.createDocumentFragment();

  // Selectors
  const formMessages = document.getElementById(
    "formMessages",
  ) as HTMLFormElement;
  const msgContainer = document.getElementById(
    "msgContainer",
  ) as HTMLUListElement;
  const templateMessage = (
    document.getElementById("templateMessage") as HTMLTemplateElement
  ).content;

  socket.on("messages", (messages: IMessage[]) => {
    msgContainer.innerHTML = "";

    messages.forEach((message: IMessage) => {
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

    msgContainer.appendChild(fragment);
  });

  formMessages.addEventListener("submit", (e) => {
    e.preventDefault();

    // Selectors
    const userEmail = (document.getElementById("userEmail") as HTMLInputElement)
      .value;
    const userMessage = document.getElementById(
      "userMessage",
    ) as HTMLInputElement;
    const newMessage: IMessage = {
      userEmail,
      messageDate: new Date().toLocaleString(),
      userMessage: userMessage.value,
    };

    socket.emit("newMessage", newMessage);
    userMessage.value = "";
  });
});
