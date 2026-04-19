const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.getElementById("addTask").onclick = () => {
    if (!taskInput.value.trim()) return;

    const li = document.createElement("li");
    li.textContent = taskInput.value;
    taskList.appendChild(li);

    li.onclick = () => li.remove();

    taskInput.value = "";
};
