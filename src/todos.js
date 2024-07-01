class task {
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
        saveProjects();
    }
}

//Init
export let projects = [];
loadProjects();

//localStorage.clear();



//Functions
export function createProject(name) {
    let newProject = new project(name);
    projects.push(newProject);

    saveProjects();

    return newProject;
}

function saveProjects(){
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects(){
    if("projects" in localStorage){
        let p = JSON.parse(localStorage.getItem("projects"));
        projects.length = 0;
        
        p.forEach(element => {
            let pp = new project(element.name);
            for(let i = 0; i < element.tasks.length; i++){
                let t = element.tasks[i];
                pp.tasks.push(new task(t.title, t.description, t.dueDate, t.priority));
    
            }
            projects.push(pp);
        
        });
    } else {
        let task1 = new task("Clean the house", "Vaccum, sweep the floors, make bed, wash dishes", new Date("2024-07-05"), "medium");
        let task2 = new task("Cut the grass", "Use lawnmower", new Date("2024-07-02"), "low");
        let task3 = new task("Call friend", "Make plans for the weekend", new Date("2024-07-05"), "low");
        let task4 = new task("Call best friend", "Make plans for tommorow", new Date("2024-07-02"), "high");
    
        let defaultProject = createProject("Default project");
        projects[0].addTask(task1);
        defaultProject.addTask(task2);
    
        let socialize = createProject("Socialize");
        socialize.addTask(task3);
        socialize.addTask(task4);
    }
}