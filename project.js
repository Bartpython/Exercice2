const params = new URLSearchParams(window.location.search); // Récupère les paramètres de l'URL, par exemple ?id=123
const description = document.querySelector('#description'); // Sélection de l'élément d'affichage de la description du projet par son ID
const title = document.querySelector('#title'); // Sélection de l'élément d'affichage du titre du projet par son ID
const tasklist = document.querySelector('#task-list'); // Sélection de l'élément d'affichage de la liste des tâches par son ID

const id = params.get('id'); // Récupère la valeur du paramètre 'id' de l'URL
if (!id) {
    window.location.href = '/dashboard.html'; // Redirige vers la page dashboard si l'ID n'est pas présent
}
fetch(`http://localhost:3000/Documents/Projet/routes.json?id=${id}`, { // Effectue une requête GET pour récupérer les données du projet avec l'ID spécifié
    headers: {
        'authorization': 'Bearer + token' // Remplacez '+ token' par votre jeton d'authentification réel
    }
})

    .then(response => response.json()) // Convertit la réponse en JSON
    .then(project => {  // Traite les données récupérées du projet avec l'ID spécifié
        // Traitez les données récupérées ici
        tasks.forEach(task => {
            // Traitez chaque tâche ici
        });
    });
    const taskItems = document.querySelector('#task-items'); // Sélection de l'élément d'affichage des tâches par son ID
    taskItems.classList.add('task-items'); // Ajoute une classe CSS à l'élément d'affichage des tâches

    const taskTitle = document.querySelector('#task-title'); // Sélection de l'élément d'affichage du titre des tâches par son ID
    taskTitle.classList.add('task-title'); // Ajoute une classe CSS à l'élément d'affichage du titre des tâches
    taskTitle.textContent = 'task.title'; // Définit le texte de l'élément d'affichage du titre des tâches
    taskActions.appendChild(taskTitle); // Ajoute le titre de la tâche aux actions des tâche

    const taskStatus = document.querySelector('#task-status'); // Sélection de l'élément d'affichage du statut des tâches par son ID
    taskStatus.classList.add('chip'); // Ajoute une classe CSS à l'élément d'affichage du statut des tâches
    let statusClass = ''; // Variable pour stocker la classe CSS correspondant au statut des tâches
    if (task.status === 'à faire') {
        statusClass = 'doing'; // Définit la classe CSS spécifique au statut des tâches
    } else if (task.status === 'en cours') {
        statusClass = 'in-progress'; // Définit la classe CSS spécifique au statut des tâches
    } else if (task.status === 'terminée') {
        statusClass = 'done'; // Définit la classe CSS spécifique au statut des tâches
    }
    taskStatus.classList.add(statusClass); // Ajoute la classe CSS correspondant au statut des tâches
    taskStatus.textContent = 'task.status'; // Définit le texte de l'élément d'affichage du statut des tâches
    taskActions.appendChild(taskStatus); // Ajoute le statut de la tâche aux actions des tâche

    const taskActions = document.querySelector('#task-actions'); // Sélection de l'élément d'affichage des actions des tâches par son ID
    taskActions.classList.add('task-actions'); // Ajoute une classe CSS à l'élément d'affichage des actions des tâches
    taskActions.appendChild(taskActions); // Ajoute le titre de la tâche aux actions des tâche

    const editButton = document.createElement('button'); // Crée un bouton pour l'édition de la tâche
    editButton.textContent = 'Modifier'; // Définit le texte du bouton
    taskActions.appendChild(editButton); // Ajoute le bouton aux actions des tâche
    taskActions.appendChild(editButton); // Ajoute le bouton aux actions des tâche

    const deleteButton = document.createElement('button'); // Crée un bouton pour la suppression de la tâche
    deleteButton.textContent = 'Supprimer'; // Définit le texte du bouton
    taskActions.appendChild(deleteButton); // Ajoute le bouton aux actions des tâche

    tasklist.appendChild(taskActions); // Ajoute les actions de la tâche à la liste des tâches
    tasklist.appendChild(taskTitle); // Ajoute le titre de la tâche à la liste des tâches
    tasklist.appendChild(taskStatus); // Ajoute le statut de la tâche à la liste des tâches 
    tasklist.appendChild(editButton); // Ajoute le bouton de modification à la liste des tâches
    tasklist.appendChild(deleteButton); // Ajoute le bouton de suppression à la liste des tâches