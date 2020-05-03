"use strict";var listsContainer=document.querySelector("[data-lists]"),newListForm=document.querySelector("[data-new-list-form]"),newListInput=document.querySelector("[data-new-list-input]"),deleteListButton=document.querySelector("[data-delete-list-button]"),listDisplayContainer=document.querySelector("[data-list-display-container]"),listTitleElement=document.querySelector("[data-list-title]"),listCountElement=document.querySelector("[data-list-count]"),tasksContainer=document.querySelector("[data-tasks]"),taskTemplate=document.getElementById("task-template"),newTaskForm=document.querySelector("[data-new-task-form]"),newTaskInput=document.querySelector("[data-new-task-input]"),clearCompleteTasksButton=document.querySelector("[data-clear-complete-tasks-button]"),LOCAL_STORAGE_LIST_KEY="task.lists",LOCAL_STORAGE_SELECTED_LIST_ID_KEY="task.selectedListId",lists=JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))||[],selectedListId=localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);function createList(e){return{id:Date.now().toString(),name:e,tasks:[]}}function createTask(e){return{id:Date.now().toString(),name:e,complete:!1}}function saveAndRender(){save(),render()}function save(){localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists)),localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId)}function render(){clearElement(listsContainer),renderLists();var e=lists.find(function(e){return e.id===selectedListId});null==selectedListId?listDisplayContainer.style.display="none":(listDisplayContainer.style.display="",listTitleElement.innerText=e.name,renderTaskCount(e),clearElement(tasksContainer),renderTasks(e))}function renderTasks(e){e.tasks.forEach(function(e){var t=document.importNode(taskTemplate.content,!0),n=t.querySelector("input");n.id=e.id,n.checked=e.complete;var s=t.querySelector("label");s.htmlFor=e.id,s.append(e.name),tasksContainer.appendChild(t)})}function renderTaskCount(e){var t=e.tasks.filter(function(e){return!e.complete}).length,n=1===t?"task":"tasks";listCountElement.innerText="".concat(t," ").concat(n," remaining")}function renderLists(){lists.forEach(function(e){var t=document.createElement("li");t.dataset.listId=e.id,t.classList.add("list-name"),t.innerText=e.name,e.id===selectedListId&&t.classList.add("active-list"),listsContainer.appendChild(t)})}function clearElement(e){for(;e.firstChild;)e.removeChild(e.firstChild)}listsContainer.addEventListener("click",function(e){"li"===e.target.tagName.toLowerCase()&&(selectedListId=e.target.dataset.listId,saveAndRender())}),tasksContainer.addEventListener("click",function(t){if("input"===t.target.tagName.toLowerCase()){var e=lists.find(function(e){return e.id===selectedListId});e.tasks.find(function(e){return e.id===t.target.id}).complete=t.target.checked,save(),renderTaskCount(e)}}),clearCompleteTasksButton.addEventListener("click",function(e){var t=lists.find(function(e){return e.id===selectedListId});t.tasks=t.tasks.filter(function(e){return!e.complete}),saveAndRender()}),deleteListButton.addEventListener("click",function(e){lists=lists.filter(function(e){return e.id!==selectedListId}),selectedListId=null,saveAndRender()}),newListForm.addEventListener("submit",function(e){e.preventDefault();var t=newListInput.value;if(null!=t&&""!==t){var n=createList(t);newListInput.value=null,lists.push(n),saveAndRender()}}),newTaskForm.addEventListener("submit",function(e){e.preventDefault();var t=newTaskInput.value;if(null!=t&&""!==t){var n=createTask(t);newTaskInput.value=null,lists.find(function(e){return e.id===selectedListId}).tasks.push(n),saveAndRender()}}),render();