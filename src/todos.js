export let projects = [];

export class task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

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
    let newProject = new project(name)
    projects.push(newProject);
    return newProject;
}

let task1 = new task("Clean the house", "Vaccum, sweep the floors, make bed, wash dishes", "2024-07-05", "medium");
let task2 = new task("Cut the grass", "Use lawnmower", "2024-07-02", "low");
let task3 = new task("Call friend", "Make plans for the weekend", "2024-07-05", "low");
let task4 = new task("Call best friend", "Make plans for tommorow", "2024-07-02", "high");

let defaultProject = createProject("Default project");
projects[0].addTask(task1);
defaultProject.addTask(task2);

let socialize = createProject("Socialize");
socialize.addTask(task3);
socialize.addTask(task4);

//console.log(defaultProject);
//console.log(defaultProject.name);