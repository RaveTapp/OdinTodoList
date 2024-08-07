import { projects, createProject, userCreateTask } from "./todos.js";
import { format } from "date-fns";
import plusIcon from "./icons/plus.svg";
import checkIcon from "./icons/check.svg";
import closeIcon from "./icons/close.svg";

const content = document.querySelector("#content");

export function projectsLoadHTML() {
  content.innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    const projectDiv = createProjectDiv(projects[i], i);
    projectDiv.setAttribute("data-num", i);
    content.appendChild(projectDiv);
  }
}

function createProjectDiv(project, i) {
  const div = document.createElement("div");
  div.classList.add("project");

  const headline = document.createElement("h2");
  headline.textContent = project.name;
  div.appendChild(headline);

  project.tasks.forEach((element) => {
    const taskDiv = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = element.title;
    taskDiv.appendChild(h3);

    const dueDate = document.createElement("p");
    dueDate.textContent = "Due: " + format(element.dueDate, "do MMMM yyyy");
    taskDiv.appendChild(dueDate);

    taskDiv.classList.add(element.priority);

    taskDiv.addEventListener("click", (event) => {
      if (taskDiv.classList.contains("expanded")) {
        if (
          event.target == div.querySelector("img.check") ||
          event.target == div.querySelector("img.close")
        ) {
          project.removeTask(element.title);
          projectsLoadHTML();
        } else {
          removeExpanded(taskDiv);
        }
      } else {
        document.querySelectorAll(".project > div.expanded").forEach((currentValue) => removeExpanded(currentValue));

        const desc = document.createElement("p");
        desc.textContent = element.description;
        desc.classList.add("desc");
        taskDiv.appendChild(desc);

        const checkIconElem = new Image();
        checkIconElem.src = checkIcon;
        checkIconElem.classList.add("check");

        taskDiv.appendChild(checkIconElem);

        const closeIconElem = new Image();
        closeIconElem.src = closeIcon;
        closeIconElem.classList.add("close");

        taskDiv.classList.add("expanded");
        taskDiv.appendChild(closeIconElem);
      }
      
    });

    div.appendChild(taskDiv);
  });

  const plusIconElem = new Image();
  plusIconElem.src = plusIcon;
  plusIconElem.classList.add("plus");
  plusIconElem.addEventListener("click", () => modalPrompt(i));
  div.appendChild(plusIconElem);

  return div;
}

function removeExpanded(div) {
  div.querySelector("p.desc").remove();
  div.querySelector("img.check").remove();
  div.querySelector("img.close").remove();
  div.classList.remove("expanded");
}

//Click events
document.querySelector("button.add-project").addEventListener("click", () => {
  const name = prompt("Enter project name: ").trim();
  if (name && name !== "") {
    createProject(name);
    projectsLoadHTML();
  }
});

//Add task
export function modalPrompt(id) {
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  //let closeBtn = document.createElement("span");
  //closeBtn.classList.add("close");

  const form = document.createElement("form");

  const inputDiv1 = createInputDiv(
    "Title of task:",
    "modal-title",
    "text",
    true
  );
  const inputDiv2 = createInputDiv("Description:", "modal-desc", "text", false);
  const inputDiv3 = createInputDiv("Due date:", "modal-date", "date", true);

  //Select
  const selectDiv = document.createElement("div");

  const label4 = document.createElement("label");
  label4.textContent = "Priority:";
  label4.setAttribute("for", "modal-prio");

  const select = document.createElement("select");
  select.setAttribute("name", "prio");
  select.id = "modal-prio";

  const option1 = document.createElement("option");
  option1.setAttribute("value", "high");
  option1.textContent = "High";
  const option2 = document.createElement("option");
  option2.setAttribute("value", "medium");
  option2.textContent = "Medium";
  const option3 = document.createElement("option");
  option3.setAttribute("value", "low");
  option3.textContent = "Low";

  //Submit
  const submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Add task");

  //Events
  modalDiv.addEventListener("click", (event) => {
    if (event.target == modalDiv) {
      document.querySelector("div.modal").remove();
    } else if (event.target == submit && form.checkValidity()) {
      event.preventDefault();
      const input1 = inputDiv1.querySelector("input").value;
      const input2 = inputDiv2.querySelector("input").value;
      const input3 = inputDiv3.querySelector("input").value;
      

      if(projects[id].tasks.find((item) => item.title == input1)){
        alert("Task with this name already exists.");
      } else {
        userCreateTask(id, input1, input2, input3, select.value);
        document.querySelector("div.modal").remove();
        projectsLoadHTML();
      }
    }
  });

  //Append
  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);

  selectDiv.appendChild(label4);
  selectDiv.appendChild(select);

  form.appendChild(inputDiv1);
  form.appendChild(inputDiv2);
  form.appendChild(inputDiv3);
  form.appendChild(selectDiv);
  form.appendChild(submit);

  //modalContent.appendChild(closeBtn);
  modalContent.appendChild(form);

  modalDiv.appendChild(modalContent);

  document.querySelector("body").appendChild(modalDiv);
}

function createInputDiv(labelText, id, inputType, isRequired) {
  const inputDiv = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = labelText;
  label.setAttribute("for", id);

  const input = document.createElement("input");
  input.id = id;
  input.setAttribute("type", inputType);
  input.required = isRequired;

  inputDiv.appendChild(label);
  inputDiv.appendChild(input);

  return inputDiv;
}
