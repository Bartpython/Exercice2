const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const taskList = document.querySelector('.task-list');

if (!projectId) {
    window.location.href = 'dashboard.html';
}
fetch(`http://localhost:3000/projects/` + projectId, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(project => {
    console.log(project);
    if (project.error) {
        console.error(project.error);
    } else {
        title.textContent = project.title;
        description.textContent = project.description;
    }
});

fetch(`http://localhost:3000/tasks?projectId=` + projectId, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(tasks => {
        console.log(tasks);
        tasks.forEach(task => {

            const taskItem = document.createElement('div');
            taskItem.classList.add('task');

            const taskTitle = document.createElement('div');
            taskTitle.classList.add('task-title');
            taskTitle.textContent = task.title;
            taskItem.appendChild(taskTitle);

            const taskStatus = document.createElement('span');
            taskStatus.classList.add('chip');
            taskStatus.classList.add('doing');
            taskStatus.textContent = task.status;
            taskItem.appendChild(taskStatus);

            const taskAction = document.createElement('div');
            taskAction.classList.add('task-action');
            taskItem.appendChild(taskAction);

            const editButton = document.createElement('button');
            editButton.classList.add('edit-button');
            editButton.textContent = 'Modifier';
            taskAction.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Supprimer';
            taskAction.appendChild(deleteButton);
            
            taskList.appendChild(taskItem);
        });
    });
