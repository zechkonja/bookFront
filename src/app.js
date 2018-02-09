import {http} from './http';
import {ui} from './ui';

const apiName = 'http://localhost:3000/api';
// Get posts on dom load
document.addEventListener('DOMContentLoaded', getBooks);
document.addEventListener('DOMContentLoaded', getGenres);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for new genre
document.querySelector('.post-genre-submit').addEventListener('click', submitNewGenre);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Remove alert on click
document.querySelector('.postsContainer').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('remove-alert')) {
    ui.clearAlert();
  }
});

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get posts
function getBooks() {
  http.get(`${apiName}/books`).then(data => ui.showPosts(data)).catch(err => console.log(err));
}

function getGenres() {
  http.get(`${apiName}/genres`).then(data => ui.showGenres(data)).catch(err => console.log(err));
}

// Submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const genre = document.querySelector('#genreOptions').value;
  const author = document.querySelector('#author').value;
  const publisher = document.querySelector('#publisher').value;
  const pages = parseInt(document.querySelector('#pages').value);
  const imageUrl = document.querySelector('#image_url').value;
  const buyUrl = document.querySelector('#buy_url').value;
  const description = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  if (title === '' || body === '' || genre === '' || author === '' ||
      publisher === '' || pages === '' || imageUrl === '' || buyUrl === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
    return false;
  }

  const data = {
    title,
    genre,
    description,
    author,
    publisher,
    pages,
    image_url: imageUrl,
    buy_url: buyUrl,
  };

  // Check for ID
  if (id === '') {
    // Create post
    http.post(`${apiName}/books`, data).then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getBooks();
    }).catch(err => console.log(err));
  } else {
    // Update post
    http.put(`${apiName}/books/${id}`, data).then(data => {
      ui.showAlert('Post updated', 'alert alert-success');
      ui.changeFormState('add');
      ui.clearFields();
      getBooks();
    }).catch(err => console.log(err));
  }
}

// Add new genre
function submitNewGenre() {
  const name = document.querySelector('#genre-name').value;
  const id = document.querySelector('#idGenre').value;

  if (name === '') {
    ui.showAlert('Please fill in name field', 'alert alert-danger');
    return false;
  }

  const data = {
    name
  };

  // Check for ID
  if (id === '') {
    // Create post
    http.post(`${apiName}/genres`, data).then(data => {
      ui.showAlert('Genre added', 'alert alert-success');
      ui.clearFields();
      getGenres();
    }).catch(err => console.log(err));
  } else {
    // Update post
    http.put(`${apiName}/posts/${id}`, data).then(data => {
      ui.showAlert('Genre updated', 'alert alert-success');
      ui.changeFormState('add');
      ui.clearFields();
      getGenres();
    }).catch(err => console.log(err));
  }
}

// Enable edit state
function enableEdit(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    ui.fillForm(data);
  }
}

// Cancel edit state
function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

}
