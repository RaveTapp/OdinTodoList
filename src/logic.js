import { projects, project, createProject} from "./todos.js";

export function userCreateTask(id, title, desc, date, prio){
    //console.log(`${id} ${title} ${desc} ${date} ${prio}`);
    projects[id].addTask(title, desc, date, prio);
}

