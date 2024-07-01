import { projects, project, createProject} from "./todos.js";
import { modalPrompt } from "./html.js";

export function userCreateTask(id){
    console.log("Create" + id);
    modalPrompt();
}

