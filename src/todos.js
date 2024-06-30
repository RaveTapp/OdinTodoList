class task {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

let task1 = new task("Clean the house", "Vaccum, sweep the floors, make bed, wash dishes", "2024-07-05", "medium");

let projects = [];

projects.push(task1);

console.log(projects);