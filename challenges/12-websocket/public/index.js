document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const tableBody = document.getElementById("tableBody");
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
});
