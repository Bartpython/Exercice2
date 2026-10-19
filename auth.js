const token = localStorage.getItem('accessToken');
if (!token) {
    window.location.href = 'index.html';
}


// Pour éviter des répétitions dans le code , comme avec la fonction Fetch
//function secureFetch(url, options = {}) {
//    options.headers = {
//        ...options.headers,
//        'Authorization': `Bearer ${token}`
//    };
//    return fetch(url, options);
//}