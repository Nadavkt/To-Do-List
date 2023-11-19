

document.querySelectorAll(".edit").forEach((editButton, index) => {
  editButton.addEventListener("click", async (event) => {
    const button = event.target;
    const task = button.closest(".task");
    const input = task.querySelector("input");
    if (button.textContent === "Save") {
      const updatedTask = input.value;

      // send to server
      const response = await fetch(`http://localhost:3000/posts/${index}`, {
        method: "PUT",
        body: JSON.stringify({ content: updatedTask }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // update ui
      input.setAttribute("readonly", true);
      button.textContent = "Edit";

      return;
    }
    input.removeAttribute("readonly");
    button.textContent = "Save";
    // console.log(button);
  });
});
