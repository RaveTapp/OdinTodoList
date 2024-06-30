import { projects, task, project, createProject} from"./todos.js";

let content = document.querySelector("#content");

export function projectsLoad(){
    
    for(let i = 0; i < projects.length; i++){
        content.appendChild(createProjectDiv(projects[i]));
    }
    

}

function createProjectDiv(project){
    let div = document.createElement("div");
    div.classList.add("project");

    let headline = document.createElement("h2");
    headline.textContent = project.name;
    
    div.appendChild(headline);

    return div;
}