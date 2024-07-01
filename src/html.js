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

    project.tasks.forEach(element => {
        let taskDiv = document.createElement("div");

        let h3 = document.createElement("h3");
        h3.textContent = element.title;
        taskDiv.appendChild(h3);

        let desc = document.createElement("p");
        desc.textContent = element.description;
        taskDiv.appendChild(desc);

        taskDiv.classList.add(element.priority);
        div.appendChild(taskDiv);
    });

    return div;
}