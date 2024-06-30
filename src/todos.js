export let projects = [];

export class task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

let task1 = new task("Clean the house", "Vaccum, sweep the floors, make bed, wash dishes", "2024-07-05", "medium");


export class project {
    tasks = [];
    
    constructor(name){
        this.name = name;
    }

    addTask(task){
        this.tasks.push(task);
    }
}

export function createProject(name) {
    return new project(name);
}

let defaultProject = createProject("Default project");

defaultProject.addTask(task1);
projects.push(defaultProject);

//console.log(defaultProject);
//console.log(defaultProject.name);