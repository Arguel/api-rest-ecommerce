"use strict";
document.addEventListener("DOMContentLoaded", function () {
    var socket = io();
    var fragment = document.createDocumentFragment();
    // Selectors
    var formMessages = document.getElementById("formMessages");
    var messagesContainer = document.getElementById("messagesContainer");
    var templateMessage = document.getElementById("templateMessage").content;
    socket.on("messages", function (messages) {
        messagesContainer.innerHTML = "";
        messages.forEach(function (message) {
            templateMessage.querySelector(".text-primary").textContent = message.userEmail + " ";
            templateMessage.querySelector(".text-danger").textContent = "[" + message.messageDate + "] ";
            templateMessage.querySelector(".text-success").textContent = ": " + message.userMessage;
            formMessages;
            var clone = templateMessage.cloneNode(true);
            fragment.appendChild(clone);
        });
        messagesContainer.appendChild(fragment);
    });
    formMessages.addEventListener("submit", function (e) {
        e.preventDefault();
        var userEmail = document.getElementById("userEmail")
            .value;
        var userMessage = document.getElementById("userMessage");
        var newMessage = {
            userEmail: userEmail,
            messageDate: new Date().toLocaleString(),
            userMessage: userMessage.value,
        };
        userMessage.value = "";
        socket.emit("newMessage", newMessage);
    });
});
