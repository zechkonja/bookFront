class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.nameInput = document.querySelector('#genre-name');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.genres = document.querySelector('#genreOptions');
    this.forState = 'add';

    this.author = document.querySelector('#author');
    this.publisher = document.querySelector('#publisher');
    this.pages = document.querySelector('#pages');
    this.imageUrl = document.querySelector('#image_url');
    this.buyUrl = document.querySelector('#buy_url');
  }

  showGenres(genres) {
    let output = '<option value="">Choose genre</option>';
    genres.forEach((genre, index) => {
      output += `
        <option value="${genre.name}">${genre.name}</option>
      `;
    });

    this.genres.innerHTML = output;
  }

  // Show all posts
  showPosts(books) {
    let output = '';
    books.reverse().forEach((book) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-4">
              <h4 class="card-title">${book.title}</h4>
              <p class="card-title"><b>Genre</b>: ${book.genre}</p>
              <p class="card-title"><b>Author</b>: ${book.author}</p>
              <p class="card-text"><b>Publisher</b>: ${book.publisher}</p>
              <p class="card-text"><b>Pages</b>: ${book.pages}</p>
              <p class="card-text"><b>Description</b>: ${book.description}</p>
              <b>Link to buy</b>: <a href="${book.buy_url}" target="_blank">link to buy book</a>
              <br>
              </div>
              <div class="col-md-6 text-right">
                <img alt="Book image" class="img-fluid mx-auto d-block image-size" src="${book.image_url}" />
              </div>
            </div>
            <div class="actions mt-3">
              <button class="btn btn-primary mr-3">View details</button>
              <div class="pull-right">
                <a href="#" class="edit card-link" data-id="${book._id}">
                  <i class="fa fa-pencil"></i>
                </a>
                <a href="#" class="delete card-link" data-id="${book._id}">
                  <i class="fa fa-remove"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  // Show alert
  showAlert(msg, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    const span = document.createElement('span');
    span.className = 'pull-right';
    span.innerHTML = '<i class="remove-alert fa fa-remove"></i>';
    div.appendChild(span);
    const container = document.querySelector('.postsContainer');
    container.insertBefore(div, this.post);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }

  }

  // Clear all fileds
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
    this.nameInput.value = '';
    this.author.value = '';
    this.publisher.value = '';
    this.pages.value = '';
    this.imageUrl.value = '';
    this.buyUrl.value = '';
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = '';
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Change form state
  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'post-cancel btn btn-light btn-block';
      cancelBtn.appendChild(document.createTextNode('Cancel edit'));

      const cardForm = document.querySelector('.card-form');
      const fromEnd = document.querySelector('.form-end');

      cardForm.insertBefore(cancelBtn, fromEnd);
    } else {
      this.postSubmit.textContent = 'Add book';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // Remove cancle button if is there
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      this.clearIdInput();

      this.clearFields();

    }
  }

}

export const ui = new UI();
