document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  // Selectors
  const tableBody = document.getElementById("tableBody");
  const formMessages = document.getElementById("formMessages");

  // Socket events
  socket.on("newProduct", (productObj) => {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <th scope="row">${productObj.title}</th>
        <td>${productObj.price}</td>
        <td class="text-center">
          <img src=${productObj.thumbnail} alt=${productObj.title} height="80px">
        </td>
      </tr>
`,
    );
  });
  socket.on("messages", (messages) => {
    const messagesList = document.querySelector("ul.list-unstyled.my-4");
    messagesList.innerHTML = messages
      .map(
        (message) =>
          `<li>
      <span class="text-primary fw-bold">${message.userEmail} </span>
      <span class="text-danger">[${message.messageDate}] </span>
      <span class="text-success">: ${message.userMessage}</span>
    </li>`,
      )
      .join("");
  });
  // Dom events
  formMessages.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmail = document.getElementById("userEmail").value;
    const userMessage = document.getElementById("userMessage").value;
    const newMessage = {
      userEmail,
      messageDate: new Date().toString(),
      userMessage,
    };
    socket.emit("newMessage", newMessage);
  });
});
