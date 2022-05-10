let task1 = new TaskManager();
// task.addTask('a','b','c','d','e')
// console.log(task);



let  submitForm= document.getElementById('taskform')

submitForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    let  taskname =document.getElementById('task-name').value;
    let  description=document.getElementById('description').value;
    let  assignedTo=document.getElementById('assign-to').value;
    let  date=document.getElementById('date').value;
    let  status=document.getElementById('status').value;

    task1.addTask(taskname,description,assignedTo,date,status);
    // console.log(task)
    // let example = createTaskHtml(taskname,description,assignedTo,date,status)
    // console.log(example)
    task1.render();
})

let taskList = document.getElementById("taskslist");

taskList.addEventListener('click', (event) => { 
       
    if(event.target.classList.contains("done-button")){
        
        const parentTask = event.target.parentElement.parentElement.parentElement;
        
         const taskId = Number(parentTask.dataset.taskId)
         const task = task1.getTaskById(taskId);
           task.status = 'Done'
           
    }
        task1.render();
        task1.save();

    if(event.target.classList.contains('delete-button')){

            const parentTask = event.target.parentElement.parentElement.parentElement;
            const taskId = Number(parentTask.dataset.taskId)
            task1.deleteTask(taskId)
            task1.save()
        }  
            task1.render();  
    

})


function validFormFieldInput(data){

}