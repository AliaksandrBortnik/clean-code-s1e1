const newTaskInput = document.querySelector(".new-task-wrapper__input");
const addButton = document.querySelector(".btn_add");
const incompleteTasksList = document.querySelector(".task-section__list_incomplete");
const completedTasksList = document.querySelector(".task-section__list_completed");

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-item");

  const checkBox = document.createElement("input");
  checkBox.type="checkbox";
  checkBox.classList.add("task-item__flag");

  const label = document.createElement("label");
  label.innerText = taskText;
  label.classList.add("task-item__label");

  const editInput = document.createElement("input");
  editInput.type="text";
  editInput.classList.add("task-item__input", "text-input");

  const editButton = document.createElement("button");
  editButton.innerText="Edit";
  editButton.classList.add("btn", "btn_edit");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("btn__icon");
  deleteButtonImg.alt = "Remove task icon";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn_delete");
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
  const editInput = listItem.querySelector(".task-item__input");
  const label = listItem.querySelector(".task-item__label");
  const editBtn = listItem.querySelector(".btn_edit");
  const isEditMode = listItem.classList.contains("task-item_edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task-item_edit-mode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
}

const markTaskCompleted = function () {
  //Append the task list item to the .task-section__list_completed
  const listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

const markTaskIncomplete = function () {
  //Append the task list item to the .task-section__list_incomplete
  const listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  taskListItem
    .querySelector(".task-item__flag")
    .addEventListener("change", checkBoxEventHandler);

  taskListItem
    .querySelector(".btn_edit")
    .addEventListener("click", editTask);

  taskListItem
    .querySelector(".btn_delete")
    .addEventListener("click", deleteTask);
}

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], markTaskIncomplete);
}