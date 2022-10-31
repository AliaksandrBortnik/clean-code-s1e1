var taskInput = document.getElementById("new-task");//Add a new task.
var addButton = document.querySelector(".btn.add");
const incompleteTasksList = document.getElementById("incomplete-tasks");
const completedTasksList = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.classList.add("task-row");

  var checkBox = document.createElement("input");
  checkBox.type="checkbox";
  checkBox.classList.add("task-state");

  var label = document.createElement("label");
  label.innerText = taskString;
  label.classList.add("task", "task-row-label");

  var editInput = document.createElement("input");
  editInput.type="text";
  editInput.classList.add("task", "task-row-input", "text-input");

  var editButton = document.createElement("button");
  editButton.innerText="Edit";
  editButton.classList.add("btn", "edit");

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.classList.add("btn-icon");
  deleteButtonImg.alt = "Remove task icon";

  var deleteButton = document.createElement("button");
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

var addTask = function() {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  taskInput.value="";
}

var editTask = function() {
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("edit-mode");

  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

var markTaskCompleted = function(){
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskIncomplete);
}

var markTaskIncomplete = function() {
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem = this.parentNode;
  incompleteTasksList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);
}

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  taskListItem
    .querySelector("input[type=checkbox]")
    .addEventListener('change', checkBoxEventHandler);

  taskListItem
    .querySelector("button.edit")
    .addEventListener('click', editTask);

  taskListItem
    .querySelector("button.delete")
    .addEventListener('click', deleteTask);
}

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i], markTaskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], markTaskIncomplete);
}