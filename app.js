const newTaskInput = document.getElementById("new-task");
const addButton = document.querySelector(".btn.add");
const incompleteTasksList = document.getElementById("incomplete-tasks");
const completedTasksList = document.getElementById("completed-tasks");

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-row");

  const checkBox = document.createElement("input");
  checkBox.type="checkbox";
  checkBox.classList.add("task-state");

  const label = document.createElement("label");
  label.innerText = taskText;
  label.classList.add("task", "task-row-label");

  const editInput = document.createElement("input");
  editInput.type="text";
  editInput.classList.add("task", "task-row-input", "text-input");

  const editButton = document.createElement("button");
  editButton.innerText="Edit";
  editButton.classList.add("btn", "edit");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("btn-icon");
  deleteButtonImg.alt = "Remove task icon";

  const deleteButton = document.createElement("button");
  deleteButton.className="delete";
  deleteButton.classList.add("btn");
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  newTaskInput.value="";
}

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task-row-input");
  const label = listItem.querySelector(".task-row-label");
  const editBtn = listItem.querySelector(".btn.edit");
  const isEditMode = listItem.classList.contains("edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
}

const markTaskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

const markTaskIncomplete = function () {
  //Append the task list item to the #incomplete-tasks.
  const listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  taskListItem
    .querySelector(".task-state")
    .addEventListener('change', checkBoxEventHandler);

  taskListItem
    .querySelector(".btn.edit")
    .addEventListener('click', editTask);

  taskListItem
    .querySelector(".btn.delete")
    .addEventListener('click', deleteTask);
}

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], markTaskIncomplete);
}