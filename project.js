const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

// On va structurer le code avec des fonctions pour mieux s'organiser.

function getData() {  // Crée une fonction getData qui récupère et affiche les données du projet et des tâches associées

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
                if (task.status === 'à faire') {
                    taskStatus.classList.add('todo');
                } else if (task.status === 'en cours') {
                    taskStatus.classList.add('doing');
                } else if (task.status === 'terminée') {
                    taskStatus.classList.add('done');
                }
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
    }


    function createTask(task) { // fonction pour répurérer les données d'une tâche
        const taskform = document.getElementById('task-form');
        const taskTitle = document.getElementById('task-title');
        const taskDescription = document.getElementById('task-description');
        const taskStatus = document.getElementById('task-status');
        taskform.addEventListener('submit', function(event) {
            event.preventDefault();
            fetch(`http://localhost:3000/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: taskTitle.value,
                    description: taskDescription.value,
                    status: taskStatus.value,
                    projectId: projectId,  // Sert à lier la tâche au projet correspondant ( la tache 1 au projet 1, la tache 2 au projet 2, etc.)
                })
            })
            .then(response => response.json())
            .then(createdTask => {
                console.log('Task created:', createdTask);
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
        });
    }

    getData(); // Appel de la fonction getData pour récupérer les données du projet et des tâches
    createTask(); // Appel de la fonction createTask pour gérer la création des tâches