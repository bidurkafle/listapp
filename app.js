// define Var from UI

 const form= document.querySelector('#task-form'); 
 const taskList= document.querySelector('.collection');
 const cleatTask = document.querySelector('.clear-tasks'); 
 const filter = document.querySelector('#filter'); 
 const taskInput= document.querySelector('#task'); 

// call Load all event listners 
loadEventListners(); 

// declear function Load all event listners 
function loadEventListners(){
    // dom load event 
    document.addEventListener('DOMContentLoaded', getTask); 
    // adding submit event on form 
    form.addEventListener('submit', addTask); 
    //adding remove event on ul 
    taskList.addEventListener('click', removeTask); 
    // adding cleartask event on ul 
    cleatTask.addEventListener('click' , clearTasks); 
    // adding filter event on card 
    filter.addEventListener('keydown', filterTask); 
}
// get task function 
function getTask(){
    let tasks; 
    if(localStorage.getItem('tasks')=== null){
        tasks=[]; 
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks')); 
    }
    
    // creating LI element for each element in the array 
    tasks.forEach(function(task){ 
        const li= document.createElement('li'); 
        // add class to li 
        li.className='collection-item'; 
        // create text node 
        let liTextNode = document.createTextNode(task); 
        //append to li 
        li.appendChild(liTextNode); 
        // create new link element 
        const link = document.createElement('a'); 
        // adding class to link 
        link.className='delete-item secondary-content';
        // adding the icon html 
        link.innerHTML='<i class=" fa fa-remove"> </i>'; 
        // appending link to li 
        li.appendChild(link); 
        // appending li to ul 
        taskList.appendChild(li); 
    });
}

// declear addTask function 
function addTask(e) {
    if(taskInput.value==='') {
        alert("Please Enter Task...");  
    } else {
        // create Li Item 
        const li= document.createElement('li'); 
        // add class to li 
        li.className='collection-item'; 
        // create text node 
        let liTextNode = document.createTextNode(taskInput.value); 
        //append to li 
        li.appendChild(liTextNode); 
        // create new link element 
        const link = document.createElement('a'); 
        // adding class to link 
        link.className='delete-item secondary-content';
        // adding the icon html 
        link.innerHTML='<i class=" fa fa-remove"> </i>'; 
        // appending link to li 
        li.appendChild(link); 

        // appending li to ul 
        taskList.appendChild(li); 

        // store data in local storage 
        storeTask(taskInput.value);  

        // clearing input 
        taskInput.value=''; 
        // addind to local storage 

        e.preventDefault(); 
    } 
}

// declearing local storage 
function storeTask(task){
    let tasks; 
    if(localStorage.getItem('tasks')=== null){
        tasks=[]; 
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks')); 
    }
    // pushing item into local storage 
    tasks.push(task); 
    // setting items to local storage 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}


// removeTask function 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm ('Are You Sure ?')){
            e.target.parentElement.parentElement.remove(); 
            // remove task from local storage 
            removeTaskFromLS( e.target.parentElement.parentElement); 
        }
    }
}

// declearing function remove task  from ls 
function removeTaskFromLS(taskItem) {
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    
      tasks.forEach(function (t, index) {
        if (taskItem.textContent.trim() === t.trim()) {
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
// declearing clear task function 
function clearTasks(){
    while( taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
}

// declearing filter task function 
function filterTask(e){
    const text = e.target.value.toLowerCase(); 

    document.querySelectorAll('.collection-item').forEach(function(task){
        const search = task.firstChild.textContent; 
        if(search.toLowerCase().indexOf(text) != -1){
            task.style.display='block'; 
        }else{
            task.style.display='none';
        }

    }); 

}