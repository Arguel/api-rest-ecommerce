"use strict";
// @ts-nocheck
// import {IMessage, INormaMsgs} from "../../utils/socketIoInterfaces";
document.addEventListener("DOMContentLoaded", function () {
    // ------------------ Web Chat ------------------
    const socket = io();
    const norma = normalizr;
    const fragment = document.createDocumentFragment();
    // Selectors
    const formMessages = document.getElementById("formMessages");
    const msgContainer = document.getElementById("msgContainer");
    const templateMessage = document.getElementById("templateMessage").content;
    socket.on("messages", function (messages) {
        const authorSchema = new norma.schema.Entity("authors");
        const messageSchema = new norma.schema.Entity("messages", {
            author: authorSchema,
        });
        const messagesSchema = new norma.schema.Array(messageSchema);
        const denormalizedData = norma.denormalize(messages.result, messagesSchema, messages.entities);
        msgContainer.innerHTML = "";
        denormalizedData.forEach(function (message) {
            templateMessage.querySelector(".text-primary").textContent = message.author.id + " ";
            templateMessage.querySelector(".text-danger").textContent = "[" + message.date + "] ";
            templateMessage.querySelector(".text-success").textContent = ": " + message.text;
            const clone = templateMessage.cloneNode(true);
            fragment.appendChild(clone);
        });
        msgContainer.appendChild(fragment);
    });
    formMessages.addEventListener("submit", function (e) {
        e.preventDefault();
        // Selectors
        const userEmail = document.getElementById("userEmail")
            .value;
        const userMessage = document.getElementById("userMessage");
        const newMessage = {
            author: {
                id: userEmail,
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
