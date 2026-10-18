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
    .then(data => {
        if (data.error) {
            error.textContent = data.error;
        } else {
            console.log(data);
            window.location.href = 'project.html';
        }
    });
});
