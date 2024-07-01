import { projects, project, createProject} from "./todos.js";
import { format } from "date-fns";
import plusIcon from './icons/plus.svg';
import {userCreateTask} from "./logic.js";

let content = document.querySelector("#content");

export function projectsLoad(){
    content.innerHTML = "";
    for(let i = 0; i < projects.length; i++){
        let projectDiv = createProjectDiv(projects[i], i);
        projectDiv.setAttribute("data-num", i);
        content.appendChild(projectDiv);
    }
    

}

function createProjectDiv(project, i){
    let div = document.createElement("div");
    div.classList.add("project");

    let headline = document.createElement("h2");
    headline.textContent = project.name;
    div.appendChild(headline);

    project.tasks.forEach(element => {
        let taskDiv = document.createElement("div");

        let h3 = document.createElement("h3");
        h3.textContent = element.title;
        taskDiv.appendChild(h3);

        let dueDate = document.createElement("p");
        dueDate.textContent = "Due: " + format(element.dueDate, "do MMMM yyyy");
        taskDiv.appendChild(dueDate);

        /*let desc = document.createElement("p");
        desc.textContent = element.description;
        taskDiv.appendChild(desc);*/

        taskDiv.classList.add(element.priority);
        div.appendChild(taskDiv);
    });

    let plusIconElem = new Image();
    plusIconElem.src = plusIcon;
    plusIconElem.classList.add("plus");
    plusIconElem.addEventListener("click", () => modalPrompt(i));
    div.appendChild(plusIconElem);
    

    return div;
}

//Click events
document.querySelector("button.add-project").addEventListener("click", () => {
    let name = prompt("Enter project name: ");
    createProject(name);
    projectsLoad();
});


//Add task
export function modalPrompt(id){
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    

    //let closeBtn = document.createElement("span");
    //closeBtn.classList.add("close");

    let form = document.createElement("form");

    let inputDiv1 = createInputDiv("Title of task:", "modal-title", "text", true);
    let inputDiv2 = createInputDiv("Description:", "modal-desc", "text", false);
    let inputDiv3 = createInputDiv("Due date:", "modal-date", "date", true);

    let label4 = document.createElement("label");
    label4.textContent = "Priority:";
    label4.setAttribute("for", "modal-prio");
    
    //Select
    let selectDiv = document.createElement("div");

    let select = document.createElement("select");
    select.setAttribute("name", "prio");
    select.id = "modal-prio";

    let option1 = document.createElement("option");
    option1.setAttribute("value", "high");
    option1.textContent = "High";
    let option2 = document.createElement("option");
    option2.setAttribute("value", "medium");
    option2.textContent = "Medium";
    let option3 = document.createElement("option");
    option3.setAttribute("value", "low");
    option3.textContent = "Low";
    
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    selectDiv.appendChild(label4);
    selectDiv.appendChild(select);

    //Submit
    let submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Add task");


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

function createInputDiv(labelText, id, inputType, isRequired){
    let inputDiv = document.createElement("div");
    
    let label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", id);

    let input = document.createElement("input");
    input.id = id;
    input.setAttribute("type", inputType);
    input.required = isRequired;

    inputDiv.appendChild(label);
    inputDiv.appendChild(input);
       
    return inputDiv;
}