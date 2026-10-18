const projectForm = document.querySelector('#project-form');
const projectnameInput = document.querySelector('#project-name');
const projectdescriptionInput = document.querySelector('#project-description');
const error = document.querySelector('#error');

projectForm.addEventListener('submit', function(event) {
    event.preventDefault();

    fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
            title: projectnameInput.value, 
            description: projectdescriptionInput.value
        })
    })
    .then(response => response.json())
    .then(project => {
        if (project.error) {
            error.textContent = project.error;
        } else {
            console.log(project);
            window.location.href = 'project.html?id=' + project.id;
        }
    });
});
