import { projects, task, project, createProject} from"./todos.js";

let content = document.querySelector("#content");

export function projectsLoad(){
    content.appendChild(createProjectDiv(projects[0]));

}

function createProjectDiv(project){
    let div = document.createElement("div");
    div.classList.add("project");

    let headline = document.createElement("h2");
    headline.textContent = project.name;
    
    div.appendChild(headline);

    return div;
}