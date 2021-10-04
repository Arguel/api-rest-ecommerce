"use strict";
// import {IMessage} from "../../utils/socketIoInterfaces";
document.addEventListener("DOMContentLoaded", function () {
    var socket = io();
    var fragment = document.createDocumentFragment();
    // Selectors
    var formMessages = document.getElementById("formMessages");
    var msgContainer = document.getElementById("msgContainer");
    var templateMessage = document.getElementById("templateMessage").content;
    socket.on("messages", function (messages) {
        msgContainer.innerHTML = "";
        messages.forEach(function (message) {
            templateMessage.querySelector(".text-primary").textContent = message.userEmail + " ";
            templateMessage.querySelector(".text-danger").textContent = "[" + message.messageDate + "] ";
            templateMessage.querySelector(".text-success").textContent = ": " + message.userMessage;
            formMessages;
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
            userEmail: userEmail,
            messageDate: new Date().toLocaleString(),
            userMessage: userMessage.value,
        };
        socket.emit("newMessage", newMessage);
        userMessage.value = "";
    });
});
