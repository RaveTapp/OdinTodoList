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
let task2 = new task("Cut the grass", "Use lawnmower", "2024-07-02", "low");
let task3 = new task("Call friend", "Make plans for the weekend", "2024-07-05", "low");
let task4 = new task("Call best friend", "Make plans for tommorow", "2024-07-02", "high");

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
defaultProject.addTask(task2);

let socialize = createProject("Socialize");
socialize.addTask(task3);
socialize.addTask(task4);


projects.push(defaultProject);
projects.push(socialize);

//console.log(defaultProject);
//console.log(defaultProject.name);