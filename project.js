const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

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