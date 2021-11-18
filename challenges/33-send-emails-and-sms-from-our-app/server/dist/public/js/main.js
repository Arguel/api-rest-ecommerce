"use strict";
// @ts-nocheck
// import {IMessage, INormaMsgs} from "../../utils/socketIoInterfaces";
document.addEventListener("DOMContentLoaded", function () {
    // ------------------ Web Chat ------------------
    var socket = io();
    var norma = normalizr;
    var fragment = document.createDocumentFragment();
    // Selectors
    var formMessages = document.getElementById("formMessages");
    var msgContainer = document.getElementById("msgContainer");
    var templateMessage = document.getElementById("templateMessage").content;
    socket.on("messages", function (messages) {
        var authorSchema = new norma.schema.Entity("authors");
        var messageSchema = new norma.schema.Entity("messages", {
            author: authorSchema,
        });
        var messagesSchema = new norma.schema.Array(messageSchema);
        var denormalizedData = norma.denormalize(messages.result, messagesSchema, messages.entities);
        msgContainer.innerHTML = "";
        denormalizedData.forEach(function (message) {
            templateMessage.querySelector(".text-primary").textContent = message.author.id + " ";
            templateMessage.querySelector(".text-danger").textContent = "[" + message.date + "] ";
            templateMessage.querySelector(".text-success").textContent = ": " + message.text;
            var clone = templateMessage.cloneNode(true);
            fragment.appendChild(clone);
        });
        msgContainer.appendChild(fragment);
    });
    formMessages.addEventListener("submit", function (e) {
        e.preventDefault();
        // Selectors
        var userEmail = document.getElementById("userEmail")
            .value;
        var userMessage = document.getElementById("userMessage");
        var newMessage = {
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
