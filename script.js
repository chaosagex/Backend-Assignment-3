"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const cancelTask = function () {
  renderTable();
};
const saveTask = function (i) {
  let taskName = document.querySelector(`#nameM${i}`).value;
  let priority = document.querySelector(`#priorityM${i}`).value;
  if (taskName !== "" && priority > 0) {
    tasks[i].name=taskName;
    tasks[i].priority=priority
  }
  renderTable();
};
const editTask = function (i) {
  let task = document.querySelector(`#name${i}`);
  let priority = document.querySelector(`#priority${i}`);
  let save=document.querySelector(`#save${i}`)
  let cancel =document.querySelector(`#cancel${i}`)
  let edit =document.querySelector(`#edit${i}`)
  let name=task.innerHTML;
  task.innerHTML=`<input type="text" id="nameM${i}" class="form-control" value="${name}" />`;
  priority.innerHTML=`
    <select id="priorityM${i}" class="form-control">
    <option value="1">High</option>
    <option value="2">Medium</option>
    <option value="3">Low</option>
  </select>
`
 save.setAttribute("style","");
 cancel.setAttribute("style","");
 edit.setAttribute("style","display:none;");
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td id=name${i}>${t.name}</td>
        <td id=priority${i}>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" id=edit${i} onclick="editTask(${i})">Edit</button>
        <button class="btn btn-success btn-sm" id=save${i} onclick="saveTask(${i})" style="display:none;">Save</button>
        <button class="btn btn-danger btn-sm" id=cancel${i} onclick="cancelTask()" style="display:none;">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};
const addTask = function () {
  console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);

