const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const taskform = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskStatus = document.getElementById('task-status');
const taskFormTitle = document.getElementById('task-form-title');
const taskFormButton = document.getElementById('task-form-button');

let editTaskId = null; // ce qui signifie qu'aucune tâche n'est en cours de modification . On est en mode création par défaut.
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
        taskList.innerHTML = ''; // Vide la liste des tâches avant de les recharger
        console.log(project);
        

        if (project.error) {
            console.error(project.error);
        } else {
            title.textContent = project.title;
            description.textContent = project.description;
        }
    });

    fetch(`http://localhost:3000/tasks?projectId=` + projectId + (editTaskId ? `/` + editTaskId : ''), {  // Récupère les tâches du projet, 
                //et met à jour une tâche dans l'api si editTaskId est défini

                method: editTaskId ? 'PUT' : 'GET',  // Si editTaskId est défini, on utilise PUT pour mettre à jour la tâche, 
        // sinon GET pour récupérer les tâches

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

                const taskTitleCreated = document.createElement('div');
                taskTitleCreated.classList.add('task-title');
                taskTitleCreated.textContent = task.title;
                taskItem.appendChild(taskTitleCreated);

                const taskStatusCreat = document.createElement('span');
                taskStatusCreat.classList.add('chip');
                if (task.status === 'à faire') {
                    taskStatusCreat.classList.add('todo');
                } else if (task.status === 'en cours') {
                    taskStatusCreat.classList.add('doing');
                } else if (task.status === 'terminée') {
                    taskStatusCreat.classList.add('done');
                }
                taskStatusCreat.textContent = task.status;
                taskItem.appendChild(taskStatusCreat);

                const taskAction = document.createElement('div');
                taskAction.classList.add('task-action');
                taskItem.appendChild(taskAction);

                const editButton = document.createElement('button');
                editButton.classList.add('edit-button');
                editButton.textContent = 'Modifier';
                taskAction.appendChild(editButton);
                editButton.addEventListener('click', function() {  // Événement pour modifier la tâche
                    console.log('Edit task:', task);
                    taskFormTitle.textContent = 'Modifier la tâche';
                    taskFormButton.textContent = 'Modifier';
                    editTaskId = task.id;  // Mode édition activé, stocke l'id de la tâche
                    taskTitle.value = task.title;
                    taskDescription.value = task.description;
                    taskStatus.value = task.status;
                });

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                deleteButton.textContent = 'Supprimer';
                taskAction.appendChild(deleteButton);
                deleteButton.addEventListener('click', function() {  // Événement pour supprimer la tâche
                    console.log('Delete task:', task);
                });

                taskList.appendChild(taskItem);
            });
        });
    }


    function createTask(task) { // fonction pour répurérer les données d'une tâche

        taskform.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log(editTaskId);
             
                fetch(`http://localhost:3000/tasks/${editTaskId ? editTaskId : ''}`, {
                    method: editTaskId ? 'PUT' : 'POST',
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
                .then(updatedTask => {
                    console.log('Task created:', updatedTask);

                    taskTitle.value = '';
                    taskDescription.value = '';  // Réinitialise les champs du formulaire
                    taskStatus.value = 'à faire';
                    editTaskId = null;  // Réinitialise l'ID de la tâche après crétion ou modification de la tâche
                    taskFormTitle.textContent = 'Ajouter une tâche';
                    taskFormButton.textContent = 'Ajouter la tâche';
                    getData(); // Met à jour l'affichage des tâches après la création d'une nouvelle tâche
                })
                .catch(error => {
                    console.error('Error creating task:', error)
                });
            });
        }


    getData(); // Appel de la fonction getData pour récupérer les données du projet et des tâches

    createTask(); // Appel de la fonction createTask pour gérer la création des tâches