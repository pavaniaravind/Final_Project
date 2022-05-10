const createTaskHtml = (id,name,description,assignedTo,dueDate,status)=>
`<li data-task-id=${id} class="list-group-item">
   <div class="card border-success mb-3" style="max-width: 18rem;">
   <div class="card-header bg-transparent border-success font-weight-bold">${status}</div>
   <div class="card-body text-success">
       <h5 class="card-title">Task Name: ${name}</h5>
        <p class="card-text">Assigned to: ${assignedTo} <br>Due Date: ${dueDate}<br></p>
   </div>
   <div class="card-footer bg-transparent border-success"><button type="button" class="btn btn-success done-button">Mark as Done</button>
   <button type="button" class="btn btn-danger delete-button">Delete</button></div>
</li>`;

class TaskManager {

    constructor(currentId = 0){
        this.tasks = [];
        this.currentId = currentId;
    }
    // Adding tasks method
    addTask(name,description,assignedTo,dueDate,status){
        let task_object = {
            id: ++this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        }
        this.tasks.push(task_object);
    }
    //Render method to render the html with info into index.html
    render(){
       let tasksHtmlList = [];
       for(let i=0; i<this.tasks.length;i++){
           let currentTask = this.tasks[i];
           const date = new Date(currentTask.dueDate)
           let formattedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
           let taskHtml = createTaskHtml(currentTask.id,currentTask.name ,currentTask.description ,currentTask.assignedTo , formattedDate ,currentTask.status)

           tasksHtmlList.push(taskHtml)
       }
       
       let tasksHtml = tasksHtmlList.join("\n ") 
       document.getElementById("taskslist").innerHTML=tasksHtml
    }
    // Find the task by the id
    getTaskById(taskId) {
        
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++) {
            //  current task in the loop
            const task = this.tasks[i];

            if (task.id === taskId) {
        
                foundTask = task;
        
            }
        }

        // Return the found task
        return foundTask;
    }
    // delete method to delete the tasks
    deleteTask(taskId){
        let newTasks = [];
        for(let i = 0;i<this.tasks.length;i++){
            let task = this.tasks[i]
            if(task.id !== taskId){
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }
    // save method to save the data into local storage
    save(){
        let tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem("tasks",tasksJson);
        let currentId = this.currentId.toString();
        localStorage.setItem("currentId", currentId);
    }

    load(){
        let tasksJson = localStorage.getItem("Tasks");
        this.tasks = JSON.parse(tasksJson);
        let currentId = localStorage.getItem("currentId")
        this.currentId = parseInt(currentId);

    }
}