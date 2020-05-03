"use strict";

var listsContainer = document.querySelector('[data-lists]');
var newListForm = document.querySelector('[data-new-list-form]');
var newListInput = document.querySelector('[data-new-list-input]');
var deleteListButton = document.querySelector('[data-delete-list-button]');
var listDisplayContainer = document.querySelector('[data-list-display-container]');
var listTitleElement = document.querySelector('[data-list-title]');
var listCountElement = document.querySelector('[data-list-count]');
var tasksContainer = document.querySelector('[data-tasks]');
var taskTemplate = document.getElementById('task-template');
var newTaskForm = document.querySelector('[data-new-task-form]');
var newTaskInput = document.querySelector('[data-new-task-input]');
var clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]');
var LOCAL_STORAGE_LIST_KEY = 'task.lists';
var LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
var lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
var selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
listsContainer.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});
tasksContainer.addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'input') {
    var selectedList = lists.find(function (list) {
      return list.id === selectedListId;
    });
    var selectedTask = selectedList.tasks.find(function (task) {
      return task.id === e.target.id;
    });
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedList);
  }
});
clearCompleteTasksButton.addEventListener('click', function (e) {
  var selectedList = lists.find(function (list) {
    return list.id === selectedListId;
  });
  selectedList.tasks = selectedList.tasks.filter(function (task) {
    return !task.complete;
  });
  saveAndRender();
});
deleteListButton.addEventListener('click', function (e) {
  lists = lists.filter(function (list) {
    return list.id !== selectedListId;
  });
  selectedListId = null;
  saveAndRender();
});
newListForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var listName = newListInput.value;
  if (listName == null || listName === '') return;
  var list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});
newTaskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var taskName = newTaskInput.value;
  if (taskName == null || taskName === '') return;
  var task = createTask(taskName);
  newTaskInput.value = null;
  var selectedList = lists.find(function (list) {
    return list.id === selectedListId;
  });
  selectedList.tasks.push(task);
  saveAndRender();
});

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: []
  };
}

function createTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false
  };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
  clearElement(listsContainer);
  renderLists();
  var selectedList = lists.find(function (list) {
    return list.id === selectedListId;
  });

  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none';
  } else {
    listDisplayContainer.style.display = '';
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(tasksContainer);
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(function (task) {
    var taskElement = document.importNode(taskTemplate.content, true);
    var checkbox = taskElement.querySelector('input');
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    var label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  var incompleteTaskCount = selectedList.tasks.filter(function (task) {
    return !task.complete;
  }).length;
  var taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = "".concat(incompleteTaskCount, " ").concat(taskString, " remaining");
}

function renderLists() {
  lists.forEach(function (list) {
    var listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;

    if (list.id === selectedListId) {
      listElement.classList.add('active-list');
    }

    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();