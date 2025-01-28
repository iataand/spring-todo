async function fetchTasks() {
  const res = await fetch("http://localhost:8080/tasks");
  const tasks = await res.json();

  return tasks._embedded.tasks;
}

async function postTask(title, description) {
  await fetch("http://localhost:8080/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
}

async function deleteTask(id) {
  await fetch(id, { method: "DELETE" });
}

function paintTasks(tasks, taskList) {
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.id = task._links.self.href;
    deleteButton.addEventListener("click", async function () {
      await deleteTask(this.id);
    });
    deleteButton.innerHTML = "X";

    li.innerHTML = `${task.title}: ${task.description}`;
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

(async (document) => {
  const taskList = document.getElementById("task");
  const tasks = await fetchTasks();

  paintTasks(tasks, taskList);

  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", async () => {
    await postTask(titleInput.value, descriptionInput.value);
  });
})(document);
