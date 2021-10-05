// import {IMessage, INormaMsgs} from "../../utils/socketIoInterfaces";

document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const norma = normalizr;

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

  socket.on("messages", (messages: INormaMsgs) => {
    const authorSchema = new norma.schema.Entity("authors");
    const messageSchema = new norma.schema.Entity("messages", {
      author: authorSchema,
    });
    const messagesSchema = new norma.schema.Array(messageSchema);

    const denormalizedData = norma.denormalize(
      messages.result,
      messagesSchema,
      messages.entities,
    );

    msgContainer.innerHTML = "";

    denormalizedData.forEach((message: IMessage) => {
      templateMessage.querySelector(
        ".text-primary",
      )!.textContent = `${message.author.id} `;
      templateMessage.querySelector(
        ".text-danger",
      )!.textContent = `[${message.date}] `;
      templateMessage.querySelector(
        ".text-success",
      )!.textContent = `: ${message.text}`;
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
      author: {
        id: userEmail, // Email
        name: "test",
        surname: "test",
        age: 7327,
        alias: "test",
        avatar: "test",
      },
      date: new Date().toLocaleString(),
      text: userMessage.value,
    };

    socket.emit("newMessage", newMessage);
    userMessage.value = "";
  });
});
