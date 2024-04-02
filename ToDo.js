function getAPI(){
    return fetch('https://kodiraonica-todos.herokuapp.com/api//todos').then(data => data.json());
}

async function getTasks(){
    const data = await getAPI();
    console.log(data);
    const tasks = document.getElementById("FlexContainer")
    for(const item of data){
        const d = document.createElement("div");
        const addp = document.createElement("p");
        addp.innerText= item.title;
        addp.classList.add("taskEdit");
        const b = document.createElement("button")
        b.innerText="remove";
        d.setAttribute("id", item._id);
        b.classList.add("buttonRemove");
        d.appendChild(addp);
        d.appendChild(b);
        tasks.appendChild(d);
 }
}
getTasks();

async function saveToDo(newTaskTitle){
    let response = await fetch('https://kodiraonica-todos.herokuapp.com/api/todo',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTaskTitle })
        });
    let data = await response.json();
    console.log(data);
    return data;
    }

const addTaskButton = document.querySelector('.addNewTaskButton');
const addTaskInput = document.querySelector('.addNewTaskInput');
const notificationAdded = document.querySelector('.ItemAdded');

addTaskButton.addEventListener('click', async() =>{
    const newTaskTitle = addTaskInput.value;
    if (newTaskTitle !== '') {
        const data = await saveToDo(newTaskTitle);
        addTaskInput.value = ''; // Clear input field after adding task
        const title = data["title"];
        const tasks = document.getElementById("FlexContainer")
        const d = document.createElement("div");
        const addp = document.createElement("p");
        addp.innerText = title;
        addp.classList.add("taskEdit");
        const b = document.createElement("button")
        b.innerText="remove";
        b.classList.add("buttonRemove");
        d.appendChild(addp);
        d.appendChild(b);
        tasks.appendChild(d); 

     notificationAdded.style.display = 'block';
     setTimeout(() => {
         notificationAdded.style.display = 'none';
     }, 5000);
    }
});

async function deleteTaskfromAPI(taskId){
    console.log(taskId);
    let response = await fetch('https://kodiraonica-todos.herokuapp.com/api/delete/' + taskId,{
        method: 'DELETE',
        });
    let data = await response;
    }

    const notificationRemoved = document.querySelector('.ItemRemoved');

    async function handleRemoveTask(event) {
        const taskElement = event.target.parentElement;
        const taskId = taskElement.getAttribute("id");
        console.log(taskId);
        await deleteTaskfromAPI(taskId);
        taskElement.remove();
        notificationRemoved.style.display = 'block';
        setTimeout(() => {
            notificationRemoved.style.display = 'none';
        }, 5000);
    }

    document.getElementById("FlexContainer").addEventListener('click', async (event) => {
        if (event.target.classList.contains('buttonRemove')) {
            await handleRemoveTask(event);
        }
    });
