class task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export class project {
  tasks = [];

  constructor(name) {
    this.name = name;
  }

  addTask(title, desc, date, prio) {
    this.tasks.push(new task(title, desc, date, prio));
    saveProjects();
  }
}

//Init
export let projects = [];
loadProjects();

//localStorage.clear();

//Functions
export function createProject(name) {
  const newProject = new project(name);
  projects.push(newProject);

  saveProjects();

  return newProject;
}

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  if ("projects" in localStorage) {
    const p = JSON.parse(localStorage.getItem("projects"));
    projects.length = 0;

    p.forEach((element) => {
      const pp = new project(element.name);
      for (let i = 0; i < element.tasks.length; i++) {
        const t = element.tasks[i];
        pp.tasks.push(new task(t.title, t.description, t.dueDate, t.priority));
      }
      projects.push(pp);
    });
  } else {
    const defaultProject = createProject("Default project");
    projects[0].addTask(
      "Clean the house",
      "Vaccum, sweep the floors, make bed, wash dishes",
      new Date("2024-07-05"),
      "medium"
    );
    defaultProject.addTask(
      "Cut the grass",
      "Use lawnmower",
      new Date("2024-07-02"),
      "low"
    );

    const socialize = createProject("Socialize");
    socialize.addTask(
      "Call friend",
      "Make plans for the weekend",
      new Date("2024-07-05"),
      "low"
    );
    socialize.addTask(
      "Call best friend",
      "Make plans for tommorow",
      new Date("2024-07-02"),
      "high"
    );
  }
}
